import React from "react";
import { motion } from "framer-motion";

export const SettingsCard = ({ children, className = "" }) => (
  <div
    className={`rounded-2xl border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)] backdrop-blur-xl p-5 ${className}`}
    style={{
      boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)",
      WebkitBackdropFilter: "blur(28px) saturate(185%)",
      backdropFilter: "blur(28px) saturate(185%)",
    }}
  >
    {children}
  </div>
);

export const SettingsRow = ({
  icon: Icon,
  label,
  description,
  children,
  accent,
}) => (
  <div className="flex items-center justify-between py-3 border-b border-[var(--titan-card-border)]/40 last:border-b-0">
    <div className="flex items-center gap-3">
      {Icon && (
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{
            backgroundColor: accent ? `${accent}22` : "var(--titan-hover)",
            border: accent
              ? `1px solid ${accent}22`
              : "1px solid var(--titan-card-border)",
          }}
        >
          <Icon
            size={14}
            style={accent ? { color: accent } : {}}
            className={accent ? "" : "text-[var(--titan-text-muted)]"}
          />
        </div>
      )}
      <div>
        <p className="text-[14px] font-medium text-[var(--titan-primary)]">
          {label}
        </p>
        {description && (
          <p className="text-[12px] text-[var(--titan-text-muted)] mt-0.5">
            {description}
          </p>
        )}
      </div>
    </div>
    <div className="shrink-0 ml-4">{children}</div>
  </div>
);

export const SettingsToggle = ({ enabled, onChange, accent = "#6BAF8D" }) => (
  <button
    onClick={() => onChange(!enabled)}
    className={`relative w-10 h-[22px] rounded-full transition-colors duration-200 cursor-pointer shrink-0`}
    style={{ backgroundColor: enabled ? accent : "var(--titan-card-border)" }}
  >
    <motion.div
      animate={{ x: enabled ? 20 : 3 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="absolute top-[3px] w-4 h-4 rounded-full bg-[var(--titan-bg)]"
    />
  </button>
);

export const SettingsSelect = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="px-3 py-1.5 rounded-full border border-[var(--titan-input-border)] bg-[var(--titan-input-bg)] text-[var(--titan-primary)] text-[13px] outline-none cursor-pointer appearance-none pr-8"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "right 10px center",
    }}
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);
