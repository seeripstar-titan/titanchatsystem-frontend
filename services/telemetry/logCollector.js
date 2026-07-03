const MAX_ENTRIES = 5000;

const logs = [];

export const logCollector = {
  push(entry) {
    logs.push(entry);
    if (logs.length > MAX_ENTRIES) logs.shift();
  },

  getAll() {
    return [...logs];
  },

  clear() {
    logs.length = 0;
  },

  download(filename = 'titan-traces.json') {
    const blob = new Blob([JSON.stringify(logs, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  },
};

// Expose globally for quick console access: __titanLogs.download()
if (typeof window !== 'undefined') {
  window.__titanLogs = logCollector;
}
