import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Radio,
  Code2,
  Mail,
  MessageCircle,
  Apple,
  Globe,
  Palette,
  Languages,
  Clock,
  MonitorSmartphone,
  FileInput,
  AtSign,
  FileOutput,
  Ticket,
  Eye,
  MousePointerClick,
  Award,
  Tags,
  DollarSign,
  UserCog,
  Forward,
  Paperclip,
  Timer,
  Shield,
  GlobeLock,
  Ban,
  KeyRound,
  CreditCard,
  LogIn,
  ChevronDown,
  MessageSquare,
  Layout,
  Megaphone,
  Settings,
  Lock,
} from "lucide-react";

const navSections = [
  {
    id: "channels",
    label: "Channels",
    icon: Radio,
    children: [
      {
        id: "install-livechat",
        label: "Install LiveChat",
        icon: Code2,
        route: "install-livechat",
        badge: "ON",
        badgeColor: "#6BAF8D",
      },
      {
        id: "email-helpdesk",
        label: "Email by HelpDesk",
        icon: Mail,
        route: "email-helpdesk",
        badge: "OFF",
        badgeColor: "#94a3b8",
      },
      {
        id: "facebook-messenger",
        label: "Facebook Messenger",
        icon: MessageCircle,
        route: "facebook-messenger",
        badge: "ON",
        badgeColor: "#6BAF8D",
      },
      {
        id: "apple-messages",
        label: "Apple Messages",
        icon: Apple,
        route: "apple-messages",
        badge: "OFF",
        badgeColor: "#94a3b8",
      },
    ],
  },
  {
    id: "chat-page",
    label: "Chat page",
    icon: Globe,
    route: "chat-page",
  },
  {
    id: "website-widget",
    label: "Website widget",
    icon: MonitorSmartphone,
    children: [
      {
        id: "customization",
        label: "Customization",
        icon: Palette,
        route: "customization",
      },
      {
        id: "language",
        label: "Language",
        icon: Languages,
        route: "language",
      },
      {
        id: "widget-availability",
        label: "Availability",
        icon: Clock,
        route: "widget-availability",
      },
      {
        id: "welcome-screen",
        label: "Welcome screen",
        icon: Layout,
        route: "welcome-screen",
      },
    ],
  },
  {
    id: "forms",
    label: "Forms",
    icon: FileInput,
    children: [
      {
        id: "pre-chat-form",
        label: "Pre-chat form",
        icon: FileInput,
        route: "pre-chat-form",
      },
      {
        id: "ask-for-email",
        label: "Ask for email",
        icon: AtSign,
        route: "ask-for-email",
      },
      {
        id: "post-chat-form",
        label: "Post-chat form",
        icon: FileOutput,
        route: "post-chat-form",
      },
      {
        id: "ticket-form",
        label: "Ticket form",
        icon: Ticket,
        route: "ticket-form",
      },
    ],
  },
  {
    id: "engagement",
    label: "Engagement",
    icon: Megaphone,
    children: [
      {
        id: "eye-catcher",
        label: "Eye-catcher",
        icon: Eye,
        route: "eye-catcher",
      },
      {
        id: "chat-buttons",
        label: "Chat buttons",
        icon: MousePointerClick,
        route: "chat-buttons",
      },
      {
        id: "quality-showcase",
        label: "Quality showcase",
        icon: Award,
        route: "quality-showcase",
      },
    ],
  },
  {
    id: "tags",
    label: "Tags",
    icon: Tags,
    route: "tags",
  },
  {
    id: "sales-tracker",
    label: "Sales tracker",
    icon: DollarSign,
    route: "sales-tracker",
  },
  {
    id: "chat-settings",
    label: "Chat settings",
    icon: MessageSquare,
    children: [
      {
        id: "chat-assignment",
        label: "Chat assignment",
        icon: UserCog,
        route: "chat-assignment",
      },
      {
        id: "transcript-forwarding",
        label: "Transcript forwarding",
        icon: Forward,
        route: "transcript-forwarding",
      },
      {
        id: "file-sharing",
        label: "File sharing",
        icon: Paperclip,
        route: "file-sharing",
      },
      {
        id: "inactivity-timeouts",
        label: "Inactivity timeouts",
        icon: Timer,
        route: "inactivity-timeouts",
      },
    ],
  },
  {
    id: "security",
    label: "Security",
    icon: Shield,
    children: [
      {
        id: "trusted-domains",
        label: "Trusted domains",
        icon: GlobeLock,
        route: "trusted-domains",
      },
      {
        id: "banned-customers",
        label: "Banned customers",
        icon: Ban,
        route: "banned-customers",
      },
      {
        id: "access-restrictions",
        label: "Access restrictions",
        icon: KeyRound,
        route: "access-restrictions",
      },
      {
        id: "credit-card-masking",
        label: "Credit card masking",
        icon: CreditCard,
        route: "credit-card-masking",
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

const SettingsSidebar = ({ activeRoute, onNavigate }) => {
  const [expanded, setExpanded] = useState(() => {
    const activeSection = navSections.find(
      (s) => s.children && s.children.some((c) => c.route === activeRoute),
    );
    return activeSection ? activeSection.id : "channels";
  });

  const toggleSection = (id) => {
    setExpanded((prev) => (prev === id ? null : id));
  };

  const isActive = (route) => activeRoute === route;

  return (
    <div className="w-[230px] min-w-[230px] h-full overflow-y-auto custom-scrollbar pr-2">
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
                                layoutId="settings-nav-active"
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
                            {child.badge && (
                              <span
                                className="relative z-10 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full"
                                style={{
                                  color: child.badgeColor,
                                  backgroundColor: `${child.badgeColor}18`,
                                }}
                              >
                                {child.badge}
                              </span>
                            )}
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
                  layoutId="settings-nav-active"
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

export default SettingsSidebar;
