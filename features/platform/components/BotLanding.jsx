import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Pencil,
  Activity,
  Bot,
  ArrowRight,
  Sparkles,
  Zap,
} from "lucide-react";

const options = [
  {
    key: "create",
    label: "New Bot",
    desc: "Configure MCP, APIs, RAG and deploy a new bot from scratch",
    icon: Plus,
    accent: "#7C8FD4",
  },
  {
    key: "edit",
    label: "Edit Bot",
    desc: "Modify an existing bot's configuration and pipeline settings",
    icon: Pencil,
    accent: "#6BAF8D",
  },
  {
    key: "status",
    label: "Bot Status",
    desc: "Monitor active deployments, health checks and uptime",
    icon: Activity,
    accent: "#D4A574",
  },
];

/* Floating orb decoration */
const Orb = ({ size, color, x, y, delay }) => (
  <motion.div
    className="absolute rounded-full pointer-events-none"
    style={{
      width: size,
      height: size,
      left: x,
      top: y,
      background: `radial-gradient(circle, ${color}20 0%, ${color}05 60%, transparent 100%)`,
      filter: "blur(1px)",
    }}
    animate={{
      y: [0, -12, 0, 8, 0],
      x: [0, 6, 0, -6, 0],
      scale: [1, 1.08, 1, 0.95, 1],
    }}
    transition={{
      duration: 8 + delay,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  />
);

const BotLanding = ({ onSelect }) => {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <div className="flex-1 flex flex-col items-center justify-center relative overflow-hidden min-h-0 py-8 px-4">
      {/* Background orbs */}
      <Orb size={180} color="#7C8FD4" x="10%" y="15%" delay={0} />
      <Orb size={120} color="#6BAF8D" x="75%" y="20%" delay={1.5} />
      <Orb size={140} color="#D4A574" x="60%" y="70%" delay={3} />
      <Orb size={90} color="#A07CC8" x="20%" y="75%" delay={2} />

      {/* Hero section */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="text-center max-w-lg relative z-10 mb-14"
      >
        {/* Animated icon cluster */}
        <div className="relative w-20 h-20 mx-auto mb-8">
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 200,
              damping: 16,
              delay: 0.15,
            }}
            className="absolute inset-0 rounded-2xl border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)] backdrop-blur-xl flex items-center justify-center"
            style={{ boxShadow: "0 8px 32px rgba(0,0,0,0.08)" }}
          >
            <Bot
              className="w-9 h-9 text-[var(--titan-primary)]"
              strokeWidth={1.3}
            />
          </motion.div>
          <motion.div
            animate={{ y: [-3, 3, -3], rotate: [0, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#7C8FD4]/12 border border-[#7C8FD4]/20 flex items-center justify-center"
          >
            <Sparkles size={11} className="text-[#7C8FD4]" />
          </motion.div>
          <motion.div
            animate={{ y: [2, -3, 2], rotate: [0, -6, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
            className="absolute -bottom-1.5 -left-2 w-6 h-6 rounded-full bg-[#6BAF8D]/12 border border-[#6BAF8D]/20 flex items-center justify-center"
          >
            <Zap size={10} className="text-[#6BAF8D]" />
          </motion.div>
        </div>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
          className="text-4xl font-bold text-[var(--titan-primary)] tracking-tight mb-3"
        >
          Bot Studio
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="text-[15px] text-[var(--titan-text-muted)] leading-relaxed"
        >
          Build intelligent conversational bots with database connections, API
          integrations, and human-in-the-loop agents.
        </motion.p>
      </motion.div>

      {/* Action options — flat, no container */}
      <div className="flex flex-col sm:flex-row items-stretch gap-8 w-full max-w-3xl relative z-10">
        {options.map((opt, idx) => {
          const isHovered = hoveredIdx === idx;
          return (
            <motion.button
              key={opt.key}
              onClick={() => onSelect(opt.key)}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.35 + idx * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.97 }}
              className="group relative flex-1 flex flex-col items-center text-center gap-4 py-8 px-5 cursor-pointer rounded-2xl transition-colors duration-300"
              style={{
                background: isHovered
                  ? `radial-gradient(circle at 50% 30%, ${opt.accent}22 0%, transparent 70%)`
                  : "transparent",
              }}
            >
              {/* Icon circle with accent glow */}
              <motion.div
                animate={
                  isHovered
                    ? {
                        scale: 1.1,
                        boxShadow: `0 0 32px ${opt.accent}35, 0 0 12px ${opt.accent}20`,
                      }
                    : {
                        scale: 1,
                        boxShadow: `0 0 0px transparent`,
                      }
                }
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: `${opt.accent}15`,
                  border: `2px solid ${opt.accent}30`,
                }}
              >
                <opt.icon
                  className="w-7 h-7"
                  style={{ color: opt.accent }}
                  strokeWidth={1.8}
                />
              </motion.div>

              {/* Text */}
              <div className="flex flex-col gap-1">
                <p className="text-lg font-bold text-[var(--titan-primary)] tracking-tight">
                  {opt.label}
                </p>
                <p className="text-[13px] text-[var(--titan-text-muted)] leading-relaxed max-w-[200px] mx-auto">
                  {opt.desc}
                </p>
              </div>

              {/* CTA */}
              <motion.div
                className="flex items-center gap-1.5 mt-auto"
                animate={
                  isHovered ? { opacity: 1, y: 0 } : { opacity: 0.4, y: 4 }
                }
                transition={{ duration: 0.2 }}
              >
                <span
                  className="text-[13px] font-semibold"
                  style={{ color: opt.accent }}
                >
                  Open
                </span>
                <motion.div
                  animate={isHovered ? { x: 4 } : { x: 0 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <ArrowRight size={14} style={{ color: opt.accent }} />
                </motion.div>
              </motion.div>

              {/* Bottom accent line */}
              <motion.div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full"
                animate={isHovered ? { width: "60%" } : { width: "0%" }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{ backgroundColor: opt.accent }}
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default BotLanding;
