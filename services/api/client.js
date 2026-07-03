import { traceOp } from "services/telemetry";
import Logger from "services/logger/Logger";

const decode = (b64) => atob(b64);

const API_BASE = decode(import.meta.env.VITE_API_HOST_B64 || "");

async function request(path, { method = "POST", body, token } = {}) {
  const fullUrl = `${API_BASE}${path}`;
  const startTime = performance.now();

  Logger.info("API", `→ ${method} ${fullUrl}`, body ? { body } : undefined);

  return traceOp(
    `http.${method.toLowerCase()} ${path}`,
    {
      "http.method": method,
      "http.url": path,
    },
    async (span) => {
      const headers = { "Content-Type": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      let res;
      try {
        res = await fetch(fullUrl, {
          method,
          headers,
          body: body ? JSON.stringify(body) : undefined,
        });
      } catch (networkErr) {
        const duration = Math.round(performance.now() - startTime);
        Logger.api({
          method,
          url: fullUrl,
          status: null,
          duration,
          requestBody: body,
          error: networkErr.message,
        });
        throw networkErr;
      }

      span.setAttribute("http.status_code", res.status);

      const data = await res.json().catch(() => null);
      const duration = Math.round(performance.now() - startTime);

      if (!res.ok) {
        const message =
          data?.detail || data?.message || `Request failed (${res.status})`;
        Logger.api({
          method,
          url: fullUrl,
          status: res.status,
          duration,
          requestBody: body,
          responseBody: data,
          error: message,
        });
        throw new Error(message);
      }

      Logger.api({
        method,
        url: fullUrl,
        status: res.status,
        duration,
        requestBody: body,
        responseBody: data,
      });
      return data;
    },
  );
}

export default request;
