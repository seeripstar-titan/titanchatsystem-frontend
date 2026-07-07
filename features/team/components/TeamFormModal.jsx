import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { opacity: 0, scale: 0.92, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 30, mass: 0.8 },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: 24,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const TeamFormModal = ({
  isOpen,
  onClose,
  title,
  children,
  onSubmit,
  loading,
}) => {
  const panelRef = useRef(null);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.2 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal panel */}
          <motion.div
            ref={panelRef}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-md rounded-2xl border border-[var(--titan-card-border)] overflow-hidden"
            style={{
              background: "var(--titan-bg)",
              boxShadow:
                "0 24px 48px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.04)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--titan-card-border)]">
              <h2 className="text-base font-semibold text-[var(--titan-primary)]">
                {title}
              </h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-[var(--titan-hover)] transition-colors"
              >
                <X className="w-4 h-4 text-[var(--titan-text-muted)]" />
              </motion.button>
            </div>

            {/* Body */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
            >
              <div className="px-6 py-5 space-y-4">{children}</div>

              {/* Footer */}
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-[var(--titan-card-border)]">
                <motion.button
                  type="button"
                  whileTap={{ scale: 0.95 }}
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium rounded-xl border border-[var(--titan-card-border)] text-[var(--titan-text-secondary)] hover:bg-[var(--titan-hover)] transition-all"
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.02 }}
                  disabled={loading}
                  className="px-5 py-2 text-sm font-medium rounded-xl bg-[var(--titan-primary)] text-[var(--titan-bg)] hover:opacity-90 transition-all disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const FormField = ({ label, children }) => (
  <div className="space-y-1.5">
    <label className="block text-xs font-medium text-[var(--titan-text-muted)] uppercase tracking-wider">
      {label}
    </label>
    {children}
  </div>
);

export const FormInput = ({ ...props }) => (
  <input
    {...props}
    className="w-full px-3 py-2.5 text-sm rounded-xl bg-[var(--titan-input-bg)] border border-[var(--titan-input-border)] text-[var(--titan-primary)] placeholder:text-[var(--titan-text-muted)] outline-none focus:border-[var(--titan-border-hover)] transition-all"
  />
);

export const FormSelect = ({ options, ...props }) => (
  <select
    {...props}
    className="w-full px-3 py-2.5 text-sm rounded-xl bg-[var(--titan-input-bg)] border border-[var(--titan-input-border)] text-[var(--titan-primary)] outline-none focus:border-[var(--titan-border-hover)] transition-all appearance-none"
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

export const FormTextArea = ({ ...props }) => (
  <textarea
    {...props}
    rows={3}
    className="w-full px-3 py-2.5 text-sm rounded-xl bg-[var(--titan-input-bg)] border border-[var(--titan-input-border)] text-[var(--titan-primary)] placeholder:text-[var(--titan-text-muted)] outline-none focus:border-[var(--titan-border-hover)] transition-all resize-none"
  />
);

export const FormCheckboxGroup = ({ options, selected, onChange }) => (
  <div className="flex flex-wrap gap-2">
    {options.map((opt) => {
      const isChecked = selected.includes(opt.value);
      return (
        <button
          key={opt.value}
          type="button"
          onClick={() =>
            onChange(
              isChecked
                ? selected.filter((v) => v !== opt.value)
                : [...selected, opt.value],
            )
          }
          className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-colors duration-100 ${
            isChecked
              ? "bg-[var(--titan-primary)]/12 text-[var(--titan-primary)] border-[var(--titan-primary)]/30"
              : "bg-[var(--titan-input-bg)] text-[var(--titan-text-muted)] border-[var(--titan-card-border)] hover:border-[var(--titan-border-hover)]"
          }`}
        >
          {opt.label}
        </button>
      );
    })}
  </div>
);

export default TeamFormModal;
