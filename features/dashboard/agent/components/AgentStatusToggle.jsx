import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Headphones, PhoneOff } from "lucide-react";
import { useAgentStatus } from "../../../../context/AgentStatusContext";

const AgentStatusToggle = () => {
  const {
    isAcceptingChats,
    startAccepting,
    stopAccepting,
    activeChats,
    maxChats,
  } = useAgentStatus();

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.4 }}
      className="fixed top-3 right-4 md:top-4 md:right-6 z-[998] flex items-center gap-2.5"
    >
      {/* Active chat count badge */}
      {isAcceptingChats && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)] text-[11px] font-medium text-[var(--titan-text-muted)]"
          style={{
            backdropFilter: "blur(20px) saturate(185%)",
            WebkitBackdropFilter: "blur(20px) saturate(185%)",
          }}
        >
          <span className="text-[var(--titan-primary)] font-semibold">
            {activeChats.length}
          </span>
          <span>/</span>
          <span>{maxChats}</span>
          <span className="ml-0.5">chats</span>
        </motion.div>
      )}

      {/* Toggle button */}
      <motion.button
        onClick={isAcceptingChats ? stopAccepting : startAccepting}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-full border font-semibold text-[12px] transition-colors cursor-pointer ${
          isAcceptingChats
            ? "bg-[#6BAF8D]/15 border-[#6BAF8D]/30 text-[#6BAF8D]"
            : "bg-[var(--titan-glass-bg)] border-[var(--titan-card-border)] text-[var(--titan-text-muted)] hover:text-[var(--titan-primary)]"
        }`}
        style={{
          backdropFilter: "blur(20px) saturate(185%)",
          WebkitBackdropFilter: "blur(20px) saturate(185%)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isAcceptingChats ? "on" : "off"}
            initial={{ rotate: -90, opacity: 0, scale: 0 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0 }}
            transition={{ duration: 0.15 }}
          >
            {isAcceptingChats ? (
              <Headphones size={14} strokeWidth={2} />
            ) : (
              <PhoneOff size={14} strokeWidth={2} />
            )}
          </motion.div>
        </AnimatePresence>

        <span className="hidden sm:inline">
          {isAcceptingChats ? "Accepting Chats" : "Not Accepting"}
        </span>

        {/* Status dot */}
        <div className="relative">
          <div
            className={`w-2 h-2 rounded-full ${isAcceptingChats ? "bg-[#6BAF8D]" : "bg-[var(--titan-text-muted)]"}`}
          />
          {isAcceptingChats && (
            <div className="absolute inset-0 w-2 h-2 rounded-full bg-[#6BAF8D] animate-ping opacity-60" />
          )}
        </div>
      </motion.button>
    </motion.div>
  );
};

export default AgentStatusToggle;
