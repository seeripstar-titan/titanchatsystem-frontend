import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, LogIn } from "lucide-react";
import PageWrapper from "../../../shared/components/PageWrapper";
import AccountProfileView from "../components/views/AccountProfileView";
import { LoginSettingsView } from "../components/views/SettingsViews";

const agentSettingsNav = [
  {
    id: "account",
    label: "Account",
    icon: User,
    children: [
      {
        id: "profile",
        label: "Profile",
        icon: User,
        route: "profile",
      },
      {
        id: "login-settings",
        label: "Login settings",
        icon: LogIn,
        route: "login-settings",
      },
    ],
  },
];

const viewMap = {
  profile: AccountProfileView,
  "login-settings": LoginSettingsView,
};

const AgentSettings = () => {
  const [activeRoute, setActiveRoute] = useState("profile");

  const ActiveView = viewMap[activeRoute] || AccountProfileView;

  const isActive = (route) => activeRoute === route;

  return (
    <PageWrapper title="Settings">
      <div className="flex gap-4 h-full min-h-0">
        {/* Sidebar */}
        <div className="hidden lg:block shrink-0">
          <div
            className="h-full rounded-2xl border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)] backdrop-blur-xl overflow-hidden"
            style={{
              boxShadow:
                "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)",
              WebkitBackdropFilter: "blur(28px) saturate(185%)",
              backdropFilter: "blur(28px) saturate(185%)",
            }}
          >
            <div className="w-[230px] min-w-[230px] h-full overflow-y-auto custom-scrollbar pr-2">
              <nav className="flex flex-col gap-0.5 py-2">
                {agentSettingsNav.map((section) => {
                  const hasActiveChild = section.children.some((c) =>
                    isActive(c.route),
                  );

                  return (
                    <div key={section.id}>
                      <div
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-semibold ${
                          hasActiveChild
                            ? "text-[var(--titan-primary)]"
                            : "text-[var(--titan-text-muted)]"
                        }`}
                      >
                        <section.icon
                          size={15}
                          strokeWidth={1.8}
                          className="shrink-0"
                        />
                        <span className="flex-1 text-left">
                          {section.label}
                        </span>
                      </div>

                      <div className="ml-3 pl-3 border-l border-[var(--titan-card-border)]">
                        {section.children.map((child) => (
                          <button
                            key={child.id}
                            onClick={() => setActiveRoute(child.route)}
                            className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[12.5px] font-medium transition-all duration-200 cursor-pointer relative ${
                              isActive(child.route)
                                ? "text-[var(--titan-primary)]"
                                : "text-[var(--titan-text-muted)] hover:text-[var(--titan-primary)] hover:bg-[var(--titan-hover)]"
                            }`}
                          >
                            {isActive(child.route) && (
                              <motion.div
                                layoutId="agent-settings-nav-active"
                                className="absolute inset-0 rounded-lg bg-[var(--titan-hover)] border border-[var(--titan-card-border)]"
                                style={{
                                  boxShadow:
                                    "0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
                                }}
                                transition={{
                                  type: "spring",
                                  stiffness: 400,
                                  damping: 30,
                                }}
                              />
                            )}
                            <child.icon
                              size={13}
                              strokeWidth={1.6}
                              className="relative z-10 shrink-0"
                            />
                            <span className="relative z-10 flex-1 text-left">
                              {child.label}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Mobile dropdown */}
        <div className="lg:hidden w-full mb-2">
          <select
            value={activeRoute}
            onChange={(e) => setActiveRoute(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)] backdrop-blur-xl text-sm text-[var(--titan-primary)] outline-none cursor-pointer"
            style={{
              WebkitBackdropFilter: "blur(20px)",
              backdropFilter: "blur(20px)",
            }}
          >
            <optgroup label="Account">
              <option value="profile">Profile</option>
              <option value="login-settings">Login settings</option>
            </optgroup>
          </select>
        </div>

        {/* Content area */}
        <div className="flex-1 min-w-0 overflow-y-auto custom-scrollbar pr-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRoute}
              initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <ActiveView />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AgentSettings;
