import React from "react";
import { motion } from "framer-motion";

const statusConfig = {
  active: {
    dot: "bg-emerald-500",
    label: "Active",
    badge: "bg-emerald-500/15 text-emerald-500 border-emerald-500/25",
    pulse: true,
    glowColor: "rgba(16,185,129,0.45)",
  },
  offline: {
    dot: "bg-gray-400",
    label: "Offline",
    badge: "bg-gray-500/10 text-gray-400 border-gray-500/20",
    pulse: false,
    glowColor: null,
  },
  "accepting-chats": {
    dot: "bg-blue-500",
    label: "Accepting",
    badge: "bg-blue-500/15 text-blue-500 border-blue-500/25",
    pulse: true,
    glowColor: "rgba(59,130,246,0.45)",
  },
  suspended: {
    dot: "bg-red-500",
    label: "Suspended",
    badge: "bg-red-500/15 text-red-500 border-red-500/25",
    pulse: false,
    glowColor: null,
  },
  enabled: {
    dot: "bg-emerald-500",
    label: "Enabled",
    badge: "bg-emerald-500/15 text-emerald-500 border-emerald-500/25",
    toggle: true,
    pulse: false,
    glowColor: null,
  },
  disabled: {
    dot: "bg-gray-400",
    label: "Disabled",
    badge: "bg-gray-500/10 text-gray-400 border-gray-500/20",
    toggle: true,
    pulse: false,
    glowColor: null,
  },
};

const TogglePill = ({ enabled, onToggle }) => (
  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      onToggle?.();
    }}
    className={`relative w-9 h-5 rounded-full transition-colors duration-200 cursor-pointer shrink-0 ${
      enabled ? "bg-emerald-500/25" : "bg-gray-500/20"
    }`}
  >
    <motion.div
      animate={{ x: enabled ? 16 : 3 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={`absolute top-[3.5px] w-3.5 h-3.5 rounded-full ${
        enabled
          ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
          : "bg-gray-400"
      }`}
    />
  </button>
);

const StatusDot = ({ config }) => {
  if (config.pulse && config.glowColor) {
    return (
      <motion.span
        className={`w-2 h-2 rounded-full ${config.dot}`}
        animate={{
          boxShadow: [`0 0 0 0 ${config.glowColor}`, `0 0 0 4px transparent`],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    );
  }
  return <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />;
};

const TeamListItem = ({ item, isSelected, onClick, type, onToggleStatus }) => {
  const config = statusConfig[item.status] || statusConfig.offline;

  const renderSubtext = () => {
    switch (type) {
      case "agents":
        return item.role;
      case "chatbots":
        return item.type;
      case "groups":
        return `${item.members?.length ?? 0} members`;
      case "suspended":
        return item.suspendReason;
      default:
        return "";
    }
  };

  const renderRight = () => {
    switch (type) {
      case "groups":
        return (
          <span className="text-xs text-[var(--titan-text-muted)] whitespace-nowrap">
            {item.activeChats ?? 0} active chats
          </span>
        );
      default:
        return config.toggle ? (
          <div className="flex items-center gap-1.5 shrink-0">
            <TogglePill
              enabled={item.status === "enabled"}
              onToggle={() => onToggleStatus?.(item)}
            />
            <span
              className="text-[11px] font-medium hidden sm:inline"
              style={{
                color:
                  item.status === "enabled"
                    ? "rgb(16,185,129)"
                    : "rgb(156,163,175)",
              }}
            >
              {config.label}
            </span>
          </div>
        ) : (
          <motion.span
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full border shrink-0 ${config.badge}`}
          >
            <StatusDot config={config} />
            <span className="hidden sm:inline">{config.label}</span>
          </motion.span>
        );
    }
  };

  return (
    <motion.button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors duration-100 overflow-hidden ${
        isSelected
          ? "bg-[var(--titan-primary)]/8 border border-[var(--titan-card-border)] shadow-[var(--titan-neo-raised-sm)]"
          : "hover:bg-[var(--titan-hover)] border border-transparent hover:border-[var(--titan-card-border)]"
      }`}
      style={{ willChange: "background-color, border-color" }}
    >
      <div className="w-9 h-9 rounded-full bg-[var(--titan-primary)] border border-[var(--titan-card-border)] flex items-center justify-center text-sm font-semibold text-[var(--titan-bg)] shrink-0">
        {item.name?.[0]}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--titan-primary)] truncate">
          {item.name}
        </p>
        <p className="text-xs text-[var(--titan-text-muted)] truncate">
          {renderSubtext()}
        </p>
      </div>
      <div className="shrink-0">{renderRight()}</div>
    </motion.button>
  );
};

export default TeamListItem;
