import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, X, UserCheck, Clock, AlertCircle } from "lucide-react";

const AgentsSection = ({ agents, onChange }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const sendInvite = () => {
    const trimmed = email.trim();
    if (!trimmed) return;
    if (!isValidEmail(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (agents.some((a) => a.email.toLowerCase() === trimmed.toLowerCase())) {
      setError("This agent has already been invited.");
      return;
    }
    setError(null);
    onChange([
      ...agents,
      {
        id: `agent-${Date.now()}`,
        name: trimmed.split("@")[0],
        email: trimmed,
        status: "pending",
      },
    ]);
    setEmail("");
  };

  const removeAgent = (id) => {
    onChange(agents.filter((a) => a.id !== id));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendInvite();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start gap-2 px-1">
        <AlertCircle
          size={13}
          className="text-[var(--titan-text-muted)] mt-0.5 shrink-0"
        />
        <span className="text-[13px] text-[var(--titan-text-muted)] leading-relaxed">
          Agents must accept their invites to be onboarded. The bot will become
          fully active once all invited agents have accepted.
        </span>
      </div>

      {/* Invite input */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Mail
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--titan-text-muted)]"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
            onKeyDown={handleKeyDown}
            placeholder="agent@company.com"
            className="w-full pl-9 pr-4 py-2.5 rounded-full border border-[var(--titan-input-border)] bg-[var(--titan-input-bg)] text-[var(--titan-primary)] placeholder-[var(--titan-text-muted)] text-sm outline-none focus:ring-2 focus:ring-[var(--titan-primary)]/20 transition-all duration-200"
            style={{ boxShadow: "var(--titan-neo-inset)" }}
          />
        </div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={sendInvite}
          disabled={!email.trim()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-[var(--titan-primary)] text-[var(--titan-bg)] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
        >
          <Send size={14} /> Invite
        </motion.button>
      </div>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="text-xs font-medium text-[var(--titan-danger)] px-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Agent list */}
      <div className="flex flex-col gap-1.5">
        {agents.map((agent, idx) => {
          const isPending = agent.status === "pending";
          return (
            <motion.div
              key={agent.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.25, delay: idx * 0.04 }}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)]"
            >
              <div className="w-8 h-8 rounded-full bg-[var(--titan-primary)]/10 flex items-center justify-center text-[12px] font-bold text-[var(--titan-primary)] shrink-0">
                {agent.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium text-[var(--titan-primary)] truncate">
                  {agent.name}
                </p>
                <p className="text-[12px] text-[var(--titan-text-muted)] truncate">
                  {agent.email}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                    isPending
                      ? "bg-amber-500/10 text-amber-500"
                      : "bg-emerald-500/10 text-emerald-500"
                  }`}
                >
                  {isPending ? <Clock size={11} /> : <UserCheck size={11} />}
                  {isPending ? "Pending" : "Accepted"}
                </div>
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeAgent(agent.id)}
                  className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-[var(--titan-hover)] text-[var(--titan-text-muted)] hover:text-[var(--titan-danger)] transition-colors cursor-pointer"
                  title={isPending ? "Cancel invite" : "Remove agent"}
                >
                  <X size={13} />
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default AgentsSection;
