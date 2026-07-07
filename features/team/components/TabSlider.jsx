import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TabSlider = ({ tabs, activeTab, onTabChange }) => {
  const containerRef = useRef(null);
  const tabRefs = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const el = tabRefs.current[activeTab];
    if (el && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const tabRect = el.getBoundingClientRect();
      setIndicator({
        left: tabRect.left - containerRect.left,
        width: tabRect.width,
      });
    }
  }, [activeTab, tabs]);

  return (
    <div
      ref={containerRef}
      className="relative flex items-center gap-0.5 p-1 rounded-full bg-[var(--titan-glass-bg)] backdrop-blur-xl border border-[var(--titan-card-border)] w-fit"
      style={{
        boxShadow:
          "inset 0 1px 2px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
      }}
    >
      {/* Animated sliding pill */}
      <motion.div
        className="absolute top-1 bottom-1 rounded-full"
        animate={{
          left: indicator.left,
          width: indicator.width,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 35,
          mass: 0.6,
        }}
        style={{
          background: "var(--titan-card-bg)",
          border: "1px solid var(--titan-card-border)",
          boxShadow: "var(--titan-neo-raised-sm)",
          willChange: "left, width",
        }}
      />

      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            ref={(el) => (tabRefs.current[tab.id] = el)}
            onClick={() => onTabChange(tab.id)}
            className={`relative z-10 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium cursor-pointer select-none transition-colors duration-150 ${
              isActive
                ? "text-[var(--titan-primary)]"
                : "text-[var(--titan-text-muted)] hover:text-[var(--titan-primary)]"
            }`}
          >
            <tab.icon size={15} />
            <span className="hidden sm:inline">{tab.label}</span>
            {tab.count !== undefined && (
              <span
                className={`text-[11px] font-semibold min-w-[20px] text-center px-1.5 py-0.5 rounded-full transition-colors duration-150 ${
                  isActive
                    ? "bg-[var(--titan-primary)]/12 text-[var(--titan-primary)]"
                    : "bg-[var(--titan-hover)] text-[var(--titan-text-muted)]"
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default TabSlider;
