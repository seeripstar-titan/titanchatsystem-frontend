import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Bot,
  ChevronRight,
  Play,
  Loader2,
  CheckCircle2,
  XCircle,
  Power,
} from "lucide-react";
import { botTypes } from "../data/developMockData";

const statusColors = {
  active: "bg-emerald-500",
  pending: "bg-amber-500",
  inactive: "bg-gray-400",
};

const statusLabels = {
  active: "Active",
  pending: "Pending",
  inactive: "Inactive",
};

const statusBadgeStyles = {
  active: "bg-emerald-500/15 text-emerald-500 border-emerald-500/25",
  pending: "bg-amber-500/15 text-amber-500 border-amber-500/25",
  inactive: "bg-gray-500/10 text-gray-400 border-gray-500/20",
};

const BotList = ({ bots, onSelect, onBack, statusMode }) => {
  const activeCount = bots.filter((b) => b.status === "active").length;
  const pendingCount = bots.filter((b) => b.status === "pending").length;
  const inactiveCount = bots.filter((b) => b.status === "inactive").length;
  const [testingId, setTestingId] = useState(null);
  const [testResults, setTestResults] = useState({});

  const [toggleState, setToggleState] = useState({});

  const handleToggle = (e, botId) => {
    e.stopPropagation();
    setToggleState((prev) => ({
      ...prev,
      [botId]: prev[botId] === undefined ? false : !prev[botId],
    }));
  };

  const runTest = (e, bot) => {
    e.stopPropagation();
    setTestingId(bot.id);
    setTestResults((prev) => ({ ...prev, [bot.id]: undefined }));
    // Simulate test — replace with real API call later
    setTimeout(
      () => {
        const passed = Math.random() > 0.3;
        setTestResults((prev) => ({
          ...prev,
          [bot.id]: passed ? "active" : "inactive",
        }));
        setTestingId(null);
      },
      1500 + Math.random() * 1000,
    );
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <motion.button
        onClick={onBack}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: -3, scale: 1.02 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium text-[var(--titan-text-muted)] hover:text-[var(--titan-primary)] border border-transparent hover:border-[var(--titan-card-border)] hover:bg-[var(--titan-hover)] transition-all cursor-pointer w-fit"
      >
        <ArrowLeft size={15} /> Back to Studio
      </motion.button>

      {/* Status summary header */}
      {statusMode && bots.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 px-4 py-3 rounded-xl border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)]"
        >
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-medium text-emerald-500">
              {activeCount} Active
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="text-xs font-medium text-amber-500">
              {pendingCount} Pending
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-gray-400" />
            <span className="text-xs font-medium text-gray-400">
              {inactiveCount} Inactive
            </span>
          </div>
        </motion.div>
      )}

      <div className="flex flex-col gap-3">
        {bots.map((bot, idx) => {
          const typeInfo = botTypes.find((t) => t.id === bot.type) || {
            label: bot.type,
            color: "#64748b",
          };
          const isTesting = testingId === bot.id;
          const testResult = testResults[bot.id];
          const displayStatus = testResult || bot.status;

          return (
            <motion.div
              key={bot.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: idx * 0.06,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="rounded-2xl border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)] backdrop-blur-xl overflow-hidden hover:border-[var(--titan-border-hover)] transition-all duration-200"
              style={{
                boxShadow:
                  "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)",
              }}
            >
              <motion.button
                onClick={() => onSelect(bot)}
                whileHover={{ backgroundColor: "var(--titan-hover)" }}
                className="w-full flex items-center gap-4 px-5 py-4 text-left cursor-pointer transition-colors"
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: `${typeInfo.color}22`,
                    border: `1.5px solid ${typeInfo.color}25`,
                  }}
                >
                  <Bot size={18} style={{ color: typeInfo.color }} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-semibold text-[var(--titan-primary)] truncate">
                      {bot.name}
                    </span>
                    <span
                      className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                      style={{
                        backgroundColor: `${typeInfo.color}22`,
                        color: typeInfo.color,
                      }}
                    >
                      {typeInfo.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-[var(--titan-text-muted)]">
                    <span>Model: {bot.model}</span>
                    <span>·</span>
                    <span>Created: {bot.createdAt}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  {/* Enable/disable toggle for edit mode */}
                  {!statusMode && (
                    <motion.button
                      onClick={(e) => handleToggle(e, bot.id)}
                      whileTap={{ scale: 0.9 }}
                      className={`relative w-9 h-5 rounded-full transition-colors duration-200 cursor-pointer shrink-0 ${
                        (toggleState[bot.id] ?? true)
                          ? "bg-emerald-500/25"
                          : "bg-gray-500/20"
                      }`}
                      title={
                        (toggleState[bot.id] ?? true) ? "Enabled" : "Disabled"
                      }
                    >
                      <motion.div
                        animate={{ x: (toggleState[bot.id] ?? true) ? 16 : 3 }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                        className={`absolute top-[3.5px] w-3.5 h-3.5 rounded-full ${
                          (toggleState[bot.id] ?? true)
                            ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                            : "bg-gray-400"
                        }`}
                      />
                    </motion.button>
                  )}
                  <motion.span
                    key={displayStatus}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${statusBadgeStyles[displayStatus] || statusBadgeStyles.inactive}`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${statusColors[displayStatus] || "bg-gray-400"} ${displayStatus === "active" ? "animate-pulse" : ""}`}
                    />
                    {statusLabels[displayStatus] || displayStatus}
                  </motion.span>
                  <ChevronRight
                    size={16}
                    className="text-[var(--titan-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </motion.button>

              {/* Test button row for status mode */}
              {statusMode && (
                <div className="flex items-center justify-between px-5 py-2.5 border-t border-[var(--titan-card-border)]/50 bg-[var(--titan-glass-bg)]">
                  <div className="flex items-center gap-2">
                    {testResult === "active" && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center gap-1 text-[11px] font-medium text-emerald-500"
                      >
                        <CheckCircle2 size={12} /> Test passed
                      </motion.span>
                    )}
                    {testResult === "inactive" && (
                      <motion.span
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex items-center gap-1 text-[11px] font-medium text-red-400"
                      >
                        <XCircle size={12} /> Test failed
                      </motion.span>
                    )}
                    {!testResult && !isTesting && (
                      <span className="text-[11px] text-[var(--titan-text-muted)]">
                        Run a connectivity test
                      </span>
                    )}
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => runTest(e, bot)}
                    disabled={isTesting}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold border border-[var(--titan-card-border)] text-[var(--titan-text-muted)] hover:text-[var(--titan-primary)] hover:border-[var(--titan-border-hover)] disabled:opacity-50 cursor-pointer transition-colors"
                  >
                    {isTesting ? (
                      <>
                        <Loader2 size={11} className="animate-spin" />{" "}
                        Testing...
                      </>
                    ) : (
                      <>
                        <Play size={11} /> Run Test
                      </>
                    )}
                  </motion.button>
                </div>
              )}
            </motion.div>
          );
        })}

        {bots.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-16 text-center"
          >
            <Bot
              size={40}
              className="text-[var(--titan-text-muted)] mb-3"
              strokeWidth={1}
            />
            <p className="text-sm text-[var(--titan-text-muted)]">
              No bots configured yet.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BotList;
