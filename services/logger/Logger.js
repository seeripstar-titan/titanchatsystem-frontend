/**
 * Titan Logger — centralised logging with file export.
 *
 * Levels: DEBUG, INFO, WARN, ERROR
 * Every entry is stored in-memory (ring buffer) and written to the console.
 * Logs can be exported as a .log text file or JSON via Logger.download().
 * Auto-flush: if configured, periodically pushes to localStorage so logs
 * survive a hard refresh.
 */

const MAX_ENTRIES = 10_000;
const STORAGE_KEY = "titan_logs";
const AUTO_FLUSH_MS = 30_000; // flush to localStorage every 30s

const LEVELS = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 };

let _minLevel = LEVELS.DEBUG;
let _buffer = [];
let _flushTimer = null;

// ── helpers ────────────────────────────────────────────────────────────
function ts() {
  return new Date().toISOString();
}

function serialize(args) {
  return args
    .map((a) => {
      if (a instanceof Error) return `${a.message}\n${a.stack}`;
      if (typeof a === "object") {
        try {
          return JSON.stringify(a);
        } catch {
          return String(a);
        }
      }
      return String(a);
    })
    .join(" ");
}

function push(level, category, args) {
  const entry = {
    t: ts(),
    level,
    cat: category,
    msg: serialize(args),
  };

  _buffer.push(entry);
  if (_buffer.length > MAX_ENTRIES) _buffer.shift();

  // Mirror to browser console with styled labels
  const style = {
    DEBUG: "color:#888;font-weight:bold",
    INFO: "color:#2563eb;font-weight:bold",
    WARN: "color:#d97706;font-weight:bold",
    ERROR: "color:#dc2626;font-weight:bold",
  };
  const consoleFn =
    level === "ERROR"
      ? console.error
      : level === "WARN"
        ? console.warn
        : level === "DEBUG"
          ? console.debug
          : console.log;
  consoleFn(
    `%c[${level}]%c[${category}]`,
    style[level],
    "color:inherit;font-weight:bold",
    ...args,
  );

  return entry;
}

// ── public API ─────────────────────────────────────────────────────────
const Logger = {
  // ---------- core log methods ----------
  debug(category, ...args) {
    if (_minLevel <= LEVELS.DEBUG) push("DEBUG", category, args);
  },
  info(category, ...args) {
    if (_minLevel <= LEVELS.INFO) push("INFO", category, args);
  },
  warn(category, ...args) {
    if (_minLevel <= LEVELS.WARN) push("WARN", category, args);
  },
  error(category, ...args) {
    if (_minLevel <= LEVELS.ERROR) push("ERROR", category, args);
  },

  // ---------- structured log for API calls ----------
  api({ method, url, status, duration, requestBody, responseBody, error }) {
    const level = error ? "ERROR" : status >= 400 ? "WARN" : "INFO";
    const entry = {
      t: ts(),
      level,
      cat: "API",
      method,
      url,
      status,
      duration_ms: duration,
      requestBody: requestBody || undefined,
      responseBody: responseBody || undefined,
      error: error || undefined,
    };
    _buffer.push(entry);
    if (_buffer.length > MAX_ENTRIES) _buffer.shift();

    const consoleFn =
      level === "ERROR"
        ? console.error
        : level === "WARN"
          ? console.warn
          : console.log;
    const statusColor = error
      ? "#dc2626"
      : status >= 400
        ? "#d97706"
        : "#16a34a";
    consoleFn(
      `%c[API]%c ${method} %c${url}%c → %c${status ?? "ERR"}%c (${duration ?? "?"}ms)`,
      "color:#2563eb;font-weight:bold",
      "color:inherit;font-weight:bold",
      "color:#888",
      "color:inherit",
      `color:${statusColor};font-weight:bold`,
      "color:inherit",
      error || "",
    );
  },

  // ---------- structured log for user interactions ----------
  interaction({ action, target, component, meta }) {
    push("INFO", "UI", [{ action, target, component, ...meta }]);
  },

  // ---------- structured log for WebSocket events ----------
  ws({ event, url, data }) {
    push("INFO", "WS", [{ event, url, data }]);
  },

  // ---------- structured log for navigation ----------
  nav({ from, to }) {
    push("INFO", "NAV", [{ from, to }]);
  },

  // ---------- configuration ----------
  setLevel(level) {
    _minLevel = LEVELS[level] ?? LEVELS.DEBUG;
  },

  // ---------- retrieval ----------
  getAll() {
    return [..._buffer];
  },
  getLast(n = 100) {
    return _buffer.slice(-n);
  },
  clear() {
    _buffer = [];
    localStorage.removeItem(STORAGE_KEY);
  },

  // ---------- export ----------
  download(filename = "titan-logs.log") {
    const isJson = filename.endsWith(".json");
    let content;
    if (isJson) {
      content = JSON.stringify(_buffer, null, 2);
    } else {
      content = _buffer
        .map((e) => {
          const base = `${e.t} [${e.level}][${e.cat}]`;
          if (e.cat === "API") {
            return `${base} ${e.method} ${e.url} → ${e.status ?? "ERR"} (${e.duration_ms ?? "?"}ms)${e.error ? " ERR: " + e.error : ""}`;
          }
          return `${base} ${e.msg || JSON.stringify(e)}`;
        })
        .join("\n");
    }
    const blob = new Blob([content], {
      type: isJson ? "application/json" : "text/plain",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  },

  // ---------- persistence ----------
  flush() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(_buffer.slice(-2000)));
    } catch {
      /* storage full – ignore */
    }
  },

  restore() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const prev = JSON.parse(raw);
        if (Array.isArray(prev)) _buffer = [...prev, ..._buffer];
      }
    } catch {
      /* corrupt – ignore */
    }
  },

  startAutoFlush() {
    if (_flushTimer) return;
    _flushTimer = setInterval(() => Logger.flush(), AUTO_FLUSH_MS);
  },

  stopAutoFlush() {
    clearInterval(_flushTimer);
    _flushTimer = null;
  },
};

// Boot: restore previous session logs & start auto-flush
Logger.restore();
Logger.startAutoFlush();
Logger.info("SYSTEM", "Logger initialised", {
  maxEntries: MAX_ENTRIES,
  autoFlush: AUTO_FLUSH_MS,
});

// Expose globally for console access: __titanLogger.download()
if (typeof window !== "undefined") {
  window.__titanLogger = Logger;
}

export default Logger;
