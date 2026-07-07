import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  TrendingUp,
  ThumbsUp,
  Timer,
  Activity,
  Gauge,
  CalendarClock,
  ChevronDown,
} from "lucide-react";
import PageWrapper from "../../../shared/components/PageWrapper";

// Import only agent-relevant report views
import Last7DaysView from "../components/views/Last7DaysView";
import DashboardView from "../components/views/DashboardView";
import TotalChatsView from "../components/views/TotalChatsView";
import ChatEngagementView from "../components/views/ChatEngagementView";
import ChatSatisfactionView from "../components/views/ChatSatisfactionView";
import ChatDurationView from "../components/views/ChatDurationView";
import AgentPerformanceView from "../components/views/AgentPerformanceView";
import ChatResponseTimesView from "../components/views/ChatResponseTimesView";
import AgentActivityView from "../components/views/AgentActivityView";

const viewMap = {
  "last-7-days": Last7DaysView,
  dashboard: DashboardView,
  "total-chats": TotalChatsView,
  "chat-engagement": ChatEngagementView,
  "chat-satisfaction": ChatSatisfactionView,
  "chat-duration": ChatDurationView,
  "my-performance": AgentPerformanceView,
  "response-times": ChatResponseTimesView,
  "my-activity": AgentActivityView,
};

const agentReportSections = [
  {
    id: "summary",
    label: "Summary",
    icon: LayoutDashboard,
    children: [
      {
        id: "last-7-days",
        label: "Last 7 days",
        icon: CalendarClock,
        route: "last-7-days",
      },
      {
        id: "dashboard",
        label: "Dashboard",
        icon: LayoutDashboard,
        route: "dashboard",
      },
    ],
  },
  {
    id: "my-chats",
    label: "My Chats",
    icon: MessageSquare,
    children: [
      {
        id: "total-chats",
        label: "Total chats",
        icon: BarChart3,
        route: "total-chats",
      },
      {
        id: "chat-engagement",
        label: "Chat engagement",
        icon: TrendingUp,
        route: "chat-engagement",
      },
      {
        id: "chat-satisfaction",
        label: "Chat satisfaction",
        icon: ThumbsUp,
        route: "chat-satisfaction",
      },
      {
        id: "chat-duration",
        label: "Chat duration",
        icon: Timer,
        route: "chat-duration",
      },
    ],
  },
  {
    id: "my-performance",
    label: "My Performance",
    icon: Activity,
    children: [
      {
        id: "my-performance",
        label: "Performance",
        icon: Activity,
        route: "my-performance",
      },
      {
        id: "response-times",
        label: "Response times",
        icon: Gauge,
        route: "response-times",
      },
      {
        id: "my-activity",
        label: "Activity",
        icon: TrendingUp,
        route: "my-activity",
      },
    ],
  },
];

const AgentReports = () => {
  const [activeRoute, setActiveRoute] = useState("dashboard");
  const [expanded, setExpanded] = useState(() => {
    const activeSection = agentReportSections.find(
      (s) => s.children && s.children.some((c) => c.route === activeRoute),
    );
    return activeSection ? activeSection.id : "summary";
  });

  const ActiveView = viewMap[activeRoute] || DashboardView;

  const toggleSection = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  const isActive = (route) => activeRoute === route;

  return (
    <PageWrapper title="My Reports">
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
            <div className="w-[220px] min-w-[220px] h-full overflow-y-auto custom-scrollbar pr-2">
              <nav className="flex flex-col gap-0.5 py-2">
                {agentReportSections.map((section) => {
                  const isExpanded = expanded === section.id;
                  const hasActiveChild = section.children.some((c) =>
                    isActive(c.route),
                  );

                  return (
                    <div key={section.id}>
                      <button
                        onClick={() => toggleSection(section.id)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-semibold transition-colors duration-200 cursor-pointer group ${
                          hasActiveChild
                            ? "text-[var(--titan-primary)]"
                            : "text-[var(--titan-text-muted)] hover:text-[var(--titan-primary)]"
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
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown
                            size={13}
                            strokeWidth={2}
                            className="opacity-50"
                          />
                        </motion.div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: 0.2,
                              ease: [0.25, 0.46, 0.45, 0.94],
                            }}
                            className="overflow-hidden"
                          >
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
                                      layoutId="agent-reports-nav-active"
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
                                  <span className="relative z-10">
                                    {child.label}
                                  </span>
                                </button>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
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
            <optgroup label="Summary">
              <option value="last-7-days">Last 7 days</option>
              <option value="dashboard">Dashboard</option>
            </optgroup>
            <optgroup label="My Chats">
              <option value="total-chats">Total chats</option>
              <option value="chat-engagement">Chat engagement</option>
              <option value="chat-satisfaction">Chat satisfaction</option>
              <option value="chat-duration">Chat duration</option>
            </optgroup>
            <optgroup label="My Performance">
              <option value="my-performance">Performance</option>
              <option value="response-times">Response times</option>
              <option value="my-activity">Activity</option>
            </optgroup>
          </select>
        </div>

        {/* Content area */}
        <div className="flex-1 min-w-0 overflow-y-auto custom-scrollbar pr-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeRoute}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="h-full"
            >
              <ActiveView />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AgentReports;
