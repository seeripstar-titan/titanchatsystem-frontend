import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, FileJson, X, AlertCircle } from "lucide-react";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

const formatSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const RagSection = ({ enabled, onToggle, files, onFilesChange }) => {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState(null);

  const validateAndAdd = (fileList) => {
    const newFiles = [];
    for (const file of fileList) {
      const ext = file.name.split(".").pop().toLowerCase();
      if (ext !== "pdf" && ext !== "json") {
        setError(`"${file.name}" — only PDF and JSON files are accepted.`);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setError(
          `"${file.name}" exceeds the 10 MB limit (${formatSize(file.size)}).`,
        );
        return;
      }
      newFiles.push({ name: file.name, size: file.size, status: "uploaded" });
    }
    setError(null);
    onFilesChange([...files, ...newFiles]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) validateAndAdd(e.dataTransfer.files);
  };

  const handleSelect = (e) => {
    if (e.target.files.length) validateAndAdd(e.target.files);
    e.target.value = "";
  };

  const removeFile = (idx) => {
    onFilesChange(files.filter((_, i) => i !== idx));
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Toggle */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-[var(--titan-primary)]">
          Enable RAG
        </span>
        <button
          onClick={() => onToggle(!enabled)}
          className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer ${enabled ? "bg-[var(--titan-primary)]" : "bg-[var(--titan-card-border)]"}`}
        >
          <motion.div
            animate={{ x: enabled ? 20 : 2 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="absolute top-1 w-4 h-4 rounded-full bg-[var(--titan-bg)]"
          />
        </button>
      </div>

      <AnimatePresence>
        {enabled && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden flex flex-col gap-3"
          >
            {/* Drop zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={`flex flex-col items-center justify-center gap-2 py-8 px-4 rounded-xl border-2 border-dashed transition-colors duration-200 cursor-pointer ${
                dragOver
                  ? "border-[var(--titan-primary)] bg-[var(--titan-hover)]"
                  : "border-[var(--titan-card-border)] hover:border-[var(--titan-border-hover)] hover:bg-[var(--titan-hover)]"
              }`}
            >
              <Upload
                size={24}
                className="text-[var(--titan-text-muted)]"
                strokeWidth={1.5}
              />
              <p className="text-sm text-[var(--titan-text-muted)]">
                <span className="font-medium text-[var(--titan-primary)]">
                  Click to upload
                </span>{" "}
                or drag & drop
              </p>
              <p className="text-[11px] text-[var(--titan-text-muted)]">
                PDF, JSON · Max 10 MB per file
              </p>
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.json"
                multiple
                onChange={handleSelect}
                className="hidden"
              />
            </div>

            {/* Error */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[var(--titan-danger)]/10 text-[var(--titan-danger)] text-xs font-medium"
                >
                  <AlertCircle size={14} />
                  {error}
                  <button
                    onClick={() => setError(null)}
                    className="ml-auto cursor-pointer"
                  >
                    <X size={12} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* File list */}
            <div className="flex flex-col gap-1.5">
              {files.map((file, idx) => {
                const isJson = file.name.endsWith(".json");
                const Icon = isJson ? FileJson : FileText;
                return (
                  <motion.div
                    key={`${file.name}-${idx}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)]"
                  >
                    <Icon
                      size={16}
                      className="text-[var(--titan-text-muted)] shrink-0"
                    />
                    <span className="flex-1 text-[13px] text-[var(--titan-primary)] truncate">
                      {file.name}
                    </span>
                    <span className="text-[11px] text-[var(--titan-text-muted)] shrink-0">
                      {formatSize(file.size)}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeFile(idx)}
                      className="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-[var(--titan-hover)] text-[var(--titan-text-muted)] hover:text-[var(--titan-danger)] transition-colors cursor-pointer"
                    >
                      <X size={12} />
                    </motion.button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RagSection;
