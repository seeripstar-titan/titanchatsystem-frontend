import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Database, Shield } from "lucide-react";
import { InputGroup } from "../../../shared/ui";
import { availableDatabases } from "../data/developMockData";

const emptyConnection = () => ({
  id: `db-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
  type: "postgres",
  name: "",
  host: "",
  port: "",
  database: "",
});

const McpSection = ({ connections, onChange }) => {
  const [draft, setDraft] = useState(null);

  const addConnection = () => {
    if (draft) {
      if (!draft.name || !draft.host || !draft.port || !draft.database) return;
      onChange([...connections, { ...draft, status: "pending" }]);
      setDraft(null);
    } else {
      setDraft(emptyConnection());
    }
  };

  const removeConnection = (id) => {
    onChange(connections.filter((c) => c.id !== id));
  };

  const updateDraft = (field, value) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2 px-1">
        <Shield size={13} className="text-[var(--titan-text-muted)]" />
        <span className="text-[11px] text-[var(--titan-text-muted)]">
          Available connections are based on your role permissions (RBAC).
        </span>
      </div>

      {/* Existing connections */}
      <div className="flex flex-col gap-2">
        {connections.map((conn, idx) => {
          const dbInfo = availableDatabases.find((d) => d.id === conn.type) || {
            label: conn.type,
            icon: "📦",
          };
          return (
            <motion.div
              key={conn.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)]"
            >
              <span className="text-lg">{dbInfo.icon}</span>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium text-[var(--titan-primary)] truncate">
                  {conn.name}
                </p>
                <p className="text-[11px] text-[var(--titan-text-muted)]">
                  {dbInfo.label} · {conn.host}:{conn.port}/{conn.database}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeConnection(conn.id)}
                className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[var(--titan-hover)] text-[var(--titan-text-muted)] hover:text-[var(--titan-danger)] transition-colors cursor-pointer"
              >
                <X size={14} />
              </motion.button>
            </motion.div>
          );
        })}
      </div>

      {/* Draft connection form */}
      <AnimatePresence>
        {draft && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="p-3 rounded-lg border border-dashed border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)] flex flex-col gap-2.5">
              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-medium text-[var(--titan-primary)] mb-1">
                    Database Type
                  </label>
                  <select
                    value={draft.type}
                    onChange={(e) => updateDraft("type", e.target.value)}
                    className="w-full px-3 py-[7px] rounded-lg border border-[var(--titan-input-border)] bg-[var(--titan-input-bg)] text-[var(--titan-primary)] text-[12px] outline-none focus:ring-2 focus:ring-[var(--titan-primary)]/20 cursor-pointer appearance-none"
                    style={{ boxShadow: "var(--titan-neo-inset)" }}
                  >
                    {availableDatabases.map((db) => (
                      <option key={db.id} value={db.id}>
                        {db.icon} {db.label}
                      </option>
                    ))}
                  </select>
                </div>
                <InputGroup
                  label="Connection Name"
                  id="mcp-name"
                  value={draft.name}
                  onChange={(e) => updateDraft("name", e.target.value)}
                  placeholder="e.g. Main DB"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <InputGroup
                  label="Host"
                  id="mcp-host"
                  value={draft.host}
                  onChange={(e) => updateDraft("host", e.target.value)}
                  placeholder="db.example.com"
                />
                <InputGroup
                  label="Port"
                  id="mcp-port"
                  value={draft.port}
                  onChange={(e) => updateDraft("port", e.target.value)}
                  placeholder="5432"
                />
                <InputGroup
                  label="Database"
                  id="mcp-database"
                  value={draft.database}
                  onChange={(e) => updateDraft("database", e.target.value)}
                  placeholder="my_database"
                />
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setDraft(null)}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium text-[var(--titan-text-muted)] hover:text-[var(--titan-primary)] hover:bg-[var(--titan-hover)] transition-colors cursor-pointer"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={addConnection}
                  disabled={
                    !draft.name || !draft.host || !draft.port || !draft.database
                  }
                  className="px-4 py-1.5 rounded-xl text-xs font-semibold bg-[var(--titan-primary)] text-[var(--titan-bg)] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Add
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!draft && (
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={addConnection}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-[var(--titan-card-border)] text-sm font-medium text-[var(--titan-text-muted)] hover:text-[var(--titan-primary)] hover:border-[var(--titan-border-hover)] hover:bg-[var(--titan-hover)] transition-colors cursor-pointer"
        >
          <Plus size={15} /> Add Database Connection
        </motion.button>
      )}
    </div>
  );
};

export default McpSection;
