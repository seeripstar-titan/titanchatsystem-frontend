import React, { useContext, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { AuthContext } from "../../../../context/AuthContext";
import { Card, Button } from "../../../../shared/ui";
import GradientBackground from "../../../../shared/components/GradientBackground";
import { useTheme } from "../../../../context/ThemeContext";
import { Sun, Moon, LogOut, MessageSquare, Headphones } from "lucide-react";
import logoLight from "../../../../assets/titan2.png";
import logoDark from "../../../../assets/logo.png";
import Logger from "../../../../services/logger/Logger";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const AgentDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const { isDark, toggleTheme } = useTheme();
  const splashRef = useRef(null);
  const splashLogoRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(splashLogoRef.current, {
      scale: 1.05,
      opacity: 1,
      duration: 0.6,
      yoyo: true,
      repeat: 1,
      ease: "power1.inOut",
    })
      .to(splashLogoRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 0.3,
        ease: "back.in(1.5)",
      })
      .to(
        splashRef.current,
        {
          opacity: 0,
          duration: 0.4,
          ease: "power2.inOut",
          onComplete: () => {
            if (splashRef.current) splashRef.current.style.display = "none";
          },
        },
        "-=0.1",
      );
  }, []);

  return (
    <div className="min-h-screen bg-[var(--titan-bg)] flex flex-col items-center justify-start relative transition-colors">
      {/* Splash */}
      <div
        ref={splashRef}
        className={`fixed inset-0 z-[100] flex items-center justify-center no-theme-transition ${isDark ? "bg-black" : "bg-white"}`}
      >
        <img
          ref={splashLogoRef}
          src={isDark ? logoDark : logoLight}
          alt="Titan Logo"
          className="h-32 w-auto opacity-0"
        />
      </div>

      {/* Background */}
      <div className="fixed inset-0 z-0">
        <GradientBackground opacity={0.92} variant="agent" />
      </div>

      {/* Top bar */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="w-full px-6 py-4 flex justify-between items-center relative z-10"
      >
        <div className="flex items-center gap-3">
          <img
            src={isDark ? logoDark : logoLight}
            alt="Titan Logo"
            className="h-7 w-auto"
          />
          <span className="text-[var(--titan-primary)] font-semibold text-base tracking-[-0.02em]">
            Titan Agent
          </span>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              Logger.interaction({
                action: "click",
                target: "theme-toggle",
                component: "AgentDashboard",
              });
              toggleTheme();
            }}
            className="p-2 rounded-full transition-colors text-[var(--titan-text-muted)]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={isDark ? "moon" : "sun"}
                initial={{ rotate: -90, opacity: 0, scale: 0 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0 }}
                transition={{ duration: 0.2 }}
              >
                {isDark ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>
          <span className="text-[var(--titan-text-muted)] text-sm hidden sm:block">
            {user?.email}
          </span>
          <Button
            onClick={() => {
              Logger.interaction({
                action: "click",
                target: "logout",
                component: "AgentDashboard",
              });
              logout();
            }}
            variant="danger"
            logLabel="Sign out"
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" /> Sign out
          </Button>
        </div>
      </motion.div>

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl relative z-10 px-6 mt-8 flex flex-col gap-6"
      >
        <motion.div variants={itemVariants}>
          <Card hover3d className="p-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-14 h-14 rounded-2xl bg-[var(--titan-primary)]/5 flex items-center justify-center">
                <Headphones className="w-7 h-7 text-[var(--titan-primary)]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[var(--titan-primary)]">
                  Welcome back, {user?.name || "Agent"}
                </h1>
                <p className="text-[var(--titan-text-muted)]">
                  Your agent workspace is ready
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card hover3d className="p-8 text-center">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-[var(--titan-text-muted)]" />
            <h3 className="text-lg font-semibold text-[var(--titan-primary)] mb-2">
              Ready for Chats
            </h3>
            <p className="text-[var(--titan-text-muted)] text-sm">
              Chat sessions will appear here when assigned to you.
            </p>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AgentDashboard;
