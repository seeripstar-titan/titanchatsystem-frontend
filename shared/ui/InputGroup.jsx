import React from "react";
import { motion } from "framer-motion";

export const InputGroup = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  className = "",
  containerClassName = "",
}) => {
  return (
    <motion.div
      className={`group ${containerClassName}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-[var(--titan-primary)] mb-1.5 tracking-[-0.01em] transition-colors"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          required={required}
          placeholder={placeholder}
          className={`appearance-none block w-full px-4 py-2.5 border border-[var(--titan-input-border)] bg-[var(--titan-input-bg)] text-[var(--titan-primary)] placeholder-[var(--titan-text-muted)] rounded-full focus:outline-none focus:ring-2 focus:ring-[var(--titan-primary)]/20 focus:border-[var(--titan-primary)]/30 text-sm transition-[border-color,background-color,box-shadow] duration-200 ${className}`}
          style={{
            WebkitBackdropFilter: "blur(22px) saturate(170%)",
            backdropFilter: "blur(22px) saturate(170%)",
            boxShadow: "var(--titan-neo-inset)",
          }}
        />
      </div>
    </motion.div>
  );
};
