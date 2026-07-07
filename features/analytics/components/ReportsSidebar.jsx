import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bookmark,
  LayoutDashboard,
  MessageSquare,
  Users,
  UserCheck,
  ShoppingCart,
  FileDown,
  HelpCircle,
  Star,
  ChevronDown,
  BarChart3,
  TrendingUp,
  MessageCircleX,
  Megaphone,
  Tags,
  ThumbsUp,
  Clock,
  FileInput,
  Timer,
  Activity,
  Gauge,
  CalendarClock,
  UserMinus,
  LogOut,
  Target,
  DollarSign,
  FileSpreadsheet,
  CalendarCheck,
} from "lucide-react";

const navSections = [
  {
    id: "saved-views",
    label: "My saved views",
    icon: Bookmark,
    route: "saved-views",
  },
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
    id: "chats",
    label: "Chats",
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
        id: "missed-chats",
        label: "Missed chats",
        icon: MessageCircleX,
        route: "missed-chats",
      },
      {
        id: "campaigns",
        label: "Campaigns conversion",
        icon: Megaphone,
        route: "campaigns",
      },
      {
        id: "tags-usage",
        label: "Tags usage",
        icon: Tags,
        route: "tags-usage",
      },
      {
        id: "chat-satisfaction",
        label: "Chat satisfaction",
        icon: ThumbsUp,
        route: "chat-satisfaction",
      },
      {
        id: "availability",
        label: "Chat availability",
        icon: Clock,
        route: "availability",
      },
      {
        id: "chat-forms",
        label: "Chat forms",
        icon: FileInput,
        route: "chat-forms",
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
    id: "agents",
    label: "Agents",
    icon: Users,
    children: [
      {
        id: "agent-performance",
        label: "Agent performance",
        icon: Activity,
        route: "agent-performance",
      },
      {
        id: "response-times",
        label: "Chat response times",
        icon: Gauge,
        route: "response-times",
      },
      {
        id: "staffing-prediction",
        label: "Staffing prediction",
        icon: CalendarCheck,
        route: "staffing-prediction",
      },
      {
        id: "agent-activity",
        label: "Agent activity",
        icon: UserCheck,
        route: "agent-activity",
      },
    ],
  },
  {
    id: "customers",
    label: "Customers",
    icon: UserCheck,
    children: [
      {
        id: "queued-customers",
        label: "Queued customers",
        icon: UserMinus,
        route: "queued-customers",
      },
      {
        id: "queue-abandonment",
        label: "Queue abandonment",
        icon: LogOut,
        route: "queue-abandonment",
      },
    ],
  },
  {
    id: "ecommerce",
    label: "Ecommerce",
    icon: ShoppingCart,
    children: [
      {
        id: "achieved-goals",
        label: "Achieved goals",
        icon: Target,
        route: "achieved-goals",
      },
      {
        id: "tracked-sales",
        label: "Tracked sales",
        icon: DollarSign,
        route: "tracked-sales",
      },
    ],
  },
  {
    id: "export",
    label: "Export raw data",
    icon: FileDown,
    children: [
      {
        id: "generate-report",
        label: "Generate report",
        icon: FileSpreadsheet,
        route: "generate-report",
      },
      {
        id: "scheduled-reports",
        label: "Scheduled reports",
        icon: CalendarCheck,
        route: "scheduled-reports",
      },
    ],
  },
  {
    id: "helpdesk",
    label: "HelpDesk tickets",
    icon: HelpCircle,
    route: "helpdesk-tickets",
  },
  {
    id: "reviews",
    label: "Reviews",
    icon: Star,
    route: "reviews",
  },
];

const ReportsSidebar = ({ activeRoute, onNavigate }) => {
  const [expanded, setExpanded] = useState(() => {
    // Find which section contains the active route and expand only that one
    const activeSection = navSections.find(
      (s) => s.children && s.children.some((c) => c.route === activeRoute),
    );
    return activeSection ? activeSection.id : "summary";
  });

  const toggleSection = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  const isActive = (route) => activeRoute === route;

  return (
    <div className="w-[220px] min-w-[220px] h-full overflow-y-auto custom-scrollbar pr-2">
      <nav className="flex flex-col gap-0.5 py-2">
        {navSections.map((section) => {
          if (section.children) {
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
                  <span className="flex-1 text-left">{section.label}</span>
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
                            onClick={() => onNavigate(child.route)}
                            className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[12.5px] font-medium transition-all duration-200 cursor-pointer relative ${
                              isActive(child.route)
                                ? "text-[var(--titan-primary)]"
                                : "text-[var(--titan-text-muted)] hover:text-[var(--titan-primary)] hover:bg-[var(--titan-hover)]"
                            }`}
                          >
                            {isActive(child.route) && (
                              <motion.div
                                layoutId="reports-nav-active"
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
                            <span className="relative z-10">{child.label}</span>
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          }

          // Top-level items without children
          return (
            <button
              key={section.id}
              onClick={() => onNavigate(section.route)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] font-semibold transition-all duration-200 cursor-pointer relative ${
                isActive(section.route)
                  ? "text-[var(--titan-primary)]"
                  : "text-[var(--titan-text-muted)] hover:text-[var(--titan-primary)] hover:bg-[var(--titan-hover)]"
              }`}
            >
              {isActive(section.route) && (
                <motion.div
                  layoutId="reports-nav-active"
                  className="absolute inset-0 rounded-xl bg-[var(--titan-hover)] border border-[var(--titan-card-border)]"
                  style={{
                    boxShadow:
                      "0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <section.icon
                size={15}
                strokeWidth={1.8}
                className="relative z-10 shrink-0"
              />
              <span className="relative z-10">{section.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default ReportsSidebar;
