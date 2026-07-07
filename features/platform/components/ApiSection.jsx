import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  X,
  Globe,
  Shield,
  Terminal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

// ── cURL parser — extracts method, url, headers, body from a pasted cURL ──
const parseCurl = (raw) => {
  const result = { method: "GET", url: "", headers: {}, body: "", name: "" };
  if (!raw || !raw.trim()) return null;

  const str = raw
    .replace(/\\\n/g, " ")
    .replace(/\\\r\n/g, " ")
    .trim();

  // URL — first bare argument or after curl
  const urlMatch =
    str.match(/curl\s+(?:--\S+\s+)*['"]?(https?:\/\/[^\s'"]+)['"]?/) ||
    str.match(/['"]?(https?:\/\/[^\s'"]+)['"]?/);
  if (urlMatch) result.url = urlMatch[1];

  // Method
  const methodMatch = str.match(/-X\s+['"]?(\w+)['"]?/i);
  if (methodMatch) {
    result.method = methodMatch[1].toUpperCase();
  } else if (/-d\s/i.test(str) || /--data/i.test(str)) {
    result.method = "POST";
  }

  // Headers
  const headerRegex = /-H\s+['"]([^'"]+)['"]/gi;
  let hm;
  while ((hm = headerRegex.exec(str)) !== null) {
    const idx = hm[1].indexOf(":");
    if (idx > 0) {
      const key = hm[1].slice(0, idx).trim();
      const val = hm[1].slice(idx + 1).trim();
      result.headers[key] = val;
    }
  }

  // Body — -d or --data
  const bodyMatch =
    str.match(
      /(?:-d|--data|--data-raw|--data-binary)\s+['"](.+?)['"]\s*(?:-|$)/s,
    ) ||
    str.match(/(?:-d|--data|--data-raw|--data-binary)\s+'([^']+)'/s) ||
    str.match(/(?:-d|--data|--data-raw|--data-binary)\s+"([^"]+)"/s) ||
    str.match(/(?:-d|--data|--data-raw|--data-binary)\s+(\S+)/);
  if (bodyMatch) result.body = bodyMatch[1];

  // Derive name from URL path
  try {
    const u = new URL(result.url);
    const segments = u.pathname.split("/").filter(Boolean);
    result.name = segments[segments.length - 1] || u.hostname;
  } catch {
    result.name = result.url ? "API Endpoint" : "";
  }

  return result.url ? result : null;
};

const methodColors = {
  GET: "text-emerald-500 bg-emerald-500/10",
  POST: "text-blue-500 bg-blue-500/10",
  PUT: "text-amber-500 bg-amber-500/10",
  PATCH: "text-orange-500 bg-orange-500/10",
  DELETE: "text-rose-500 bg-rose-500/10",
};

const ApiSection = ({ endpoints, onChange }) => {
  const [curlInput, setCurlInput] = useState("");
  const [parseError, setParseError] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const handlePaste = (value) => {
    setCurlInput(value);
    setParseError(null);
  };

  const addFromCurl = () => {
    const parsed = parseCurl(curlInput);
    if (!parsed) {
      setParseError(
        "Could not parse cURL. Make sure it starts with 'curl' and contains a valid URL.",
      );
      return;
    }
    const endpoint = {
      id: `api-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name: parsed.name,
      url: parsed.url,
      method: parsed.method,
      headers: parsed.headers,
      body: parsed.body,
      status: "pending",
    };
    onChange([...endpoints, endpoint]);
    setCurlInput("");
    setParseError(null);
  };

  const removeEndpoint = (id) => {
    onChange(endpoints.filter((e) => e.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 px-1">
        <Shield size={13} className="text-[var(--titan-text-muted)]" />
        <span className="text-[11px] text-[var(--titan-text-muted)]">
          Paste a cURL command to auto-detect method, URL, headers and body —
          just like Postman.
        </span>
      </div>

      {/* cURL paste area */}
      <div className="flex flex-col gap-2">
        <div className="relative">
          <Terminal
            size={15}
            className="absolute left-3 top-3 text-[var(--titan-text-muted)]"
          />
          <textarea
            value={curlInput}
            onChange={(e) => handlePaste(e.target.value)}
            placeholder={
              'Paste your cURL command here...\ne.g. curl -X POST https://api.example.com/v1/data -H "Authorization: Bearer token" -d \'{"key":"value"}\''
            }
            rows={3}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[var(--titan-input-border)] bg-[var(--titan-input-bg)] text-[var(--titan-primary)] placeholder-[var(--titan-text-muted)] text-xs font-mono outline-none focus:ring-2 focus:ring-[var(--titan-primary)]/20 resize-y transition-all duration-200"
            style={{ boxShadow: "var(--titan-neo-inset)" }}
          />
        </div>

        <AnimatePresence>
          {parseError && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-xs font-medium text-[var(--titan-danger)] px-1"
            >
              {parseError}
            </motion.p>
          )}
        </AnimatePresence>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={addFromCurl}
          disabled={!curlInput.trim()}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-[var(--titan-primary)] text-[var(--titan-bg)] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed w-fit self-end"
        >
          <Plus size={13} /> Parse & Add
        </motion.button>
      </div>

      {/* Parsed endpoints */}
      <div className="flex flex-col gap-2">
        {endpoints.map((ep) => {
          const isOpen = expandedId === ep.id;
          const headerEntries = ep.headers ? Object.entries(ep.headers) : [];

          return (
            <motion.div
              key={ep.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="rounded-xl border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)] overflow-hidden"
            >
              {/* Summary row */}
              <div className="flex items-center gap-3 px-4 py-3">
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${methodColors[ep.method] || "text-gray-500 bg-gray-500/10"}`}
                >
                  {ep.method}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-medium text-[var(--titan-primary)] truncate">
                    {ep.name}
                  </p>
                  <p className="text-[11px] text-[var(--titan-text-muted)] truncate font-mono">
                    {ep.url}
                  </p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setExpandedId(isOpen ? null : ep.id)}
                  className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-[var(--titan-hover)] text-[var(--titan-text-muted)] transition-colors cursor-pointer"
                >
                  {isOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeEndpoint(ep.id)}
                  className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-[var(--titan-hover)] text-[var(--titan-text-muted)] hover:text-[var(--titan-danger)] transition-colors cursor-pointer"
                >
                  <X size={13} />
                </motion.button>
              </div>

              {/* Expanded details */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-3 pt-1 border-t border-[var(--titan-card-border)] flex flex-col gap-2.5">
                      {/* Headers */}
                      {headerEntries.length > 0 && (
                        <div>
                          <p className="text-[10px] font-semibold text-[var(--titan-text-muted)] uppercase tracking-wider mb-1">
                            Headers
                          </p>
                          <div className="bg-[var(--titan-hover)] rounded-lg p-2 text-[11px] font-mono text-[var(--titan-primary)] space-y-0.5 max-h-28 overflow-y-auto custom-scrollbar">
                            {headerEntries.map(([k, v]) => (
                              <div key={k} className="flex gap-1">
                                <span className="text-[var(--titan-text-muted)] shrink-0">
                                  {k}:
                                </span>
                                <span className="truncate">{v}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {/* Body */}
                      {ep.body && (
                        <div>
                          <p className="text-[10px] font-semibold text-[var(--titan-text-muted)] uppercase tracking-wider mb-1">
                            Body
                          </p>
                          <pre className="bg-[var(--titan-hover)] rounded-lg p-2 text-[11px] font-mono text-[var(--titan-primary)] whitespace-pre-wrap break-all max-h-32 overflow-y-auto custom-scrollbar">
                            {(() => {
                              try {
                                return JSON.stringify(
                                  JSON.parse(ep.body),
                                  null,
                                  2,
                                );
                              } catch {
                                return ep.body;
                              }
                            })()}
                          </pre>
                        </div>
                      )}
                      {!headerEntries.length && !ep.body && (
                        <p className="text-[11px] text-[var(--titan-text-muted)] italic">
                          No headers or body detected.
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ApiSection;
