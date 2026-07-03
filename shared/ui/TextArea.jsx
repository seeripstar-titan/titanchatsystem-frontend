import React from "react";
import { motion } from "framer-motion";

export const TextArea = ({
  id,
  value,
  onChange,
  placeholder = "",
  rows = 4,
  required = false,
  className = "",
}) => {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        rows={rows}
        className={`appearance-none block w-full px-4 py-2.5 border border-[var(--titan-input-border)] bg-[var(--titan-input-bg)] text-[var(--titan-primary)] placeholder-[var(--titan-text-muted)] rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--titan-primary)]/20 focus:border-[var(--titan-primary)]/30 text-sm transition-[border-color,background-color,box-shadow] duration-200 resize-y ${className}`}
        style={{
          WebkitBackdropFilter: "blur(22px) saturate(170%)",
          backdropFilter: "blur(22px) saturate(170%)",
          boxShadow: "var(--titan-neo-inset)",
        }}
      />
    </motion.div>
  );
};
