import React from "react";
import { motion } from "framer-motion";

const SettingsViewPlaceholder = ({
  icon: Icon,
  title,
  description,
  children,
}) => (
  <div className="flex flex-col gap-5">
    <div className="flex items-center gap-3">
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)]"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
      >
        <Icon
          size={18}
          className="text-[var(--titan-primary)]"
          strokeWidth={1.6}
        />
      </div>
      <div>
        <h2 className="text-lg font-bold text-[var(--titan-primary)] tracking-tight">
          {title}
        </h2>
        {description && (
          <p className="text-[13px] text-[var(--titan-text-muted)]">
            {description}
          </p>
        )}
      </div>
    </div>
    {children}
  </div>
);

export default SettingsViewPlaceholder;
