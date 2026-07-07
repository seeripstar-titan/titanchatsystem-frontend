import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "../../../shared/components/PageWrapper";
import {
  Globe,
  Megaphone,
  Target,
  Monitor,
  Smartphone,
  Tablet,
  MapPin,
  Clock,
  Eye,
  MessageCircle,
  ExternalLink,
  Users,
  Tag,
  Hash,
  ArrowUpRight,
} from "lucide-react";
import Logger from "../../../services/logger/Logger";

const tabs = [
  { key: "traffic", label: "Traffic", icon: Globe },
  { key: "campaigns", label: "Campaigns", icon: Megaphone },
  { key: "goals", label: "Goals", icon: Target },
];

// ── Placeholder data — will be replaced with live DB feeds ──
const mockTraffic = [
  {
    ip: "192.168.1.42",
    location: "San Francisco, US",
    activity: "Browsing",
    totalTime: "4m 32s",
    cameFrom: "google.com",
    device: "Desktop",
    lastSeen: "Just now",
    visits: 3,
    groups: "New Visitor",
    campaign: "—",
    currentPage: "/pricing",
  },
  {
    ip: "10.0.0.87",
    location: "London, UK",
    activity: "Chatting",
    totalTime: "12m 08s",
    cameFrom: "twitter.com",
    device: "Mobile",
    lastSeen: "2m ago",
    visits: 7,
    groups: "Returning",
    campaign: "summer-launch",
    currentPage: "/features",
  },
  {
    ip: "172.16.5.19",
    location: "Berlin, DE",
    activity: "Browsing",
    totalTime: "1m 45s",
    cameFrom: "Direct",
    device: "Tablet",
    lastSeen: "5m ago",
    visits: 1,
    groups: "New Visitor",
    campaign: "—",
    currentPage: "/docs/setup",
  },
  {
    ip: "203.0.113.22",
    location: "Tokyo, JP",
    activity: "Browsing",
    totalTime: "8m 11s",
    cameFrom: "linkedin.com",
    device: "Desktop",
    lastSeen: "1m ago",
    visits: 12,
    groups: "Power User",
    campaign: "enterprise-q3",
    currentPage: "/dashboard",
  },
  {
    ip: "198.51.100.4",
    location: "Mumbai, IN",
    activity: "Chatting",
    totalTime: "3m 20s",
    cameFrom: "producthunt.com",
    device: "Mobile",
    lastSeen: "Just now",
    visits: 2,
    groups: "New Visitor",
    campaign: "ph-launch",
    currentPage: "/",
  },
];

const mockCampaigns = [
  {
    name: "Summer Launch",
    tag: "summer-launch",
    visitors: 1842,
    conversions: 124,
    conversionRate: "6.7%",
    source: "Google Ads",
    status: "Active",
    startDate: "2026-06-01",
  },
  {
    name: "Enterprise Q3",
    tag: "enterprise-q3",
    visitors: 563,
    conversions: 41,
    conversionRate: "7.3%",
    source: "LinkedIn",
    status: "Active",
    startDate: "2026-07-01",
  },
  {
    name: "PH Launch",
    tag: "ph-launch",
    visitors: 3210,
    conversions: 287,
    conversionRate: "8.9%",
    source: "Product Hunt",
    status: "Ended",
    startDate: "2026-05-15",
  },
];

const mockGoals = [
  {
    name: "Sign Up Completion",
    target: 500,
    current: 342,
    percentage: 68,
    timeframe: "This Month",
    category: "Conversion",
  },
  {
    name: "Chat Engagement",
    target: 1000,
    current: 871,
    percentage: 87,
    timeframe: "This Month",
    category: "Engagement",
  },
  {
    name: "Page Views > 3",
    target: 2000,
    current: 1456,
    percentage: 73,
    timeframe: "This Month",
    category: "Traffic",
  },
  {
    name: "Demo Requests",
    target: 100,
    current: 23,
    percentage: 23,
    timeframe: "This Month",
    category: "Conversion",
  },
];

const deviceIcon = (device) => {
  if (device === "Mobile") return Smartphone;
  if (device === "Tablet") return Tablet;
  return Monitor;
};

const activityColor = (activity) =>
  activity === "Chatting"
    ? "text-emerald-500 bg-emerald-500/15"
    : "text-sky-500 bg-sky-500/15";

const statusColor = (status) =>
  status === "Active"
    ? "text-emerald-500 bg-emerald-500/15"
    : "text-[var(--titan-text-muted)] bg-[var(--titan-hover)]";

// ── Traffic Table ──
const TrafficView = () => (
  <div className="overflow-x-auto">
    <table className="w-full text-left text-sm">
      <thead>
        <tr
          className="text-[var(--titan-text-muted)] text-xs uppercase tracking-wider border-b border-[var(--titan-card-border)]"
          style={{
            background: "var(--titan-glass-bg)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          {[
            "Visitor",
            "Activity",
            "Page",
            "Time on Site",
            "Source",
            "Device",
            "Last Seen",
            "Visits",
            "Group",
            "Campaign",
          ].map((h) => (
            <th key={h} className="px-4 py-3 font-medium whitespace-nowrap">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {mockTraffic.map((row, idx) => {
          const DeviceIcon = deviceIcon(row.device);
          return (
            <motion.tr
              key={row.ip}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: idx * 0.04, duration: 0.3 }}
              className="border-b border-[var(--titan-card-border)]/50 hover:bg-[var(--titan-hover)] transition-colors"
            >
              <td className="px-4 py-3.5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 animate-pulse" />
                  <div>
                    <span className="text-[var(--titan-primary)] font-medium text-xs font-mono">
                      {row.ip}
                    </span>
                    <div className="flex items-center gap-1 text-[var(--titan-text-muted)] text-[11px] mt-0.5">
                      <MapPin size={10} />
                      {row.location}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3.5">
                <span
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${activityColor(row.activity)}`}
                >
                  {row.activity === "Chatting" ? (
                    <MessageCircle size={11} />
                  ) : (
                    <Eye size={11} />
                  )}
                  {row.activity}
                </span>
              </td>
              <td className="px-4 py-3.5">
                <span className="text-[var(--titan-primary)] text-xs font-mono flex items-center gap-1">
                  {row.currentPage}
                  <ExternalLink
                    size={10}
                    className="text-[var(--titan-text-muted)]"
                  />
                </span>
              </td>
              <td className="px-4 py-3.5">
                <span className="text-[var(--titan-primary)] text-xs flex items-center gap-1">
                  <Clock size={11} className="text-[var(--titan-text-muted)]" />
                  {row.totalTime}
                </span>
              </td>
              <td className="px-4 py-3.5">
                <span className="text-[var(--titan-text-muted)] text-xs flex items-center gap-1">
                  <ArrowUpRight size={11} />
                  {row.cameFrom}
                </span>
              </td>
              <td className="px-4 py-3.5">
                <DeviceIcon
                  size={15}
                  className="text-[var(--titan-text-muted)]"
                />
              </td>
              <td className="px-4 py-3.5 text-[var(--titan-text-muted)] text-xs whitespace-nowrap">
                {row.lastSeen}
              </td>
              <td className="px-4 py-3.5 text-[var(--titan-primary)] text-xs font-medium text-center">
                {row.visits}
              </td>
              <td className="px-4 py-3.5">
                <span className="text-xs text-[var(--titan-text-muted)] bg-[var(--titan-hover)] px-2 py-0.5 rounded-full whitespace-nowrap">
                  {row.groups}
                </span>
              </td>
              <td className="px-4 py-3.5">
                {row.campaign !== "—" ? (
                  <span className="text-xs text-[var(--titan-primary)] bg-[var(--titan-primary)]/5 border border-[var(--titan-card-border)] px-2 py-0.5 rounded-full font-mono flex items-center gap-1 w-fit">
                    <Tag size={10} />
                    {row.campaign}
                  </span>
                ) : (
                  <span className="text-xs text-[var(--titan-text-muted)]">
                    —
                  </span>
                )}
              </td>
            </motion.tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

// ── Campaigns Table ──
const CampaignsView = () => (
  <div className="overflow-x-auto">
    <table className="w-full text-left text-sm">
      <thead>
        <tr
          className="text-[var(--titan-text-muted)] text-xs uppercase tracking-wider border-b border-[var(--titan-card-border)]"
          style={{
            background: "var(--titan-glass-bg)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
          }}
        >
          {[
            "Campaign",
            "Tag",
            "Source",
            "Visitors",
            "Conversions",
            "Rate",
            "Status",
            "Start Date",
          ].map((h) => (
            <th key={h} className="px-4 py-3 font-medium whitespace-nowrap">
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {mockCampaigns.map((row, idx) => (
          <motion.tr
            key={row.tag}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: idx * 0.05, duration: 0.3 }}
            className="border-b border-[var(--titan-card-border)]/50 hover:bg-[var(--titan-hover)] transition-colors"
          >
            <td className="px-4 py-3.5">
              <span className="text-[var(--titan-primary)] font-medium text-sm flex items-center gap-2">
                <Megaphone
                  size={14}
                  className="text-[var(--titan-text-muted)]"
                />
                {row.name}
              </span>
            </td>
            <td className="px-4 py-3.5">
              <span className="text-xs font-mono text-[var(--titan-text-muted)] bg-[var(--titan-hover)] px-2 py-0.5 rounded-full flex items-center gap-1 w-fit">
                <Hash size={10} />
                {row.tag}
              </span>
            </td>
            <td className="px-4 py-3.5 text-[var(--titan-text-muted)] text-xs">
              {row.source}
            </td>
            <td className="px-4 py-3.5 text-[var(--titan-primary)] text-sm font-medium flex items-center gap-1">
              <Users size={13} className="text-[var(--titan-text-muted)]" />
              {row.visitors.toLocaleString()}
            </td>
            <td className="px-4 py-3.5 text-[var(--titan-primary)] text-sm">
              {row.conversions}
            </td>
            <td className="px-4 py-3.5 text-emerald-500 text-sm font-medium">
              {row.conversionRate}
            </td>
            <td className="px-4 py-3.5">
              <span
                className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColor(row.status)}`}
              >
                {row.status}
              </span>
            </td>
            <td className="px-4 py-3.5 text-[var(--titan-text-muted)] text-xs">
              {row.startDate}
            </td>
          </motion.tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ── Goals View ──
const GoalsView = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-5">
    {mockGoals.map((goal, idx) => (
      <motion.div
        key={goal.name}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.06, duration: 0.3 }}
        className="rounded-xl border border-[var(--titan-card-border)] bg-[var(--titan-card-bg)] p-5 flex flex-col gap-3"
      >
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-sm font-semibold text-[var(--titan-primary)]">
              {goal.name}
            </h4>
            <span className="text-[11px] text-[var(--titan-text-muted)] mt-0.5 flex items-center gap-1">
              <Tag size={10} />
              {goal.category} · {goal.timeframe}
            </span>
          </div>
          <span className="text-lg font-bold text-[var(--titan-primary)] tabular-nums">
            {goal.percentage}%
          </span>
        </div>
        {/* Progress bar */}
        <div className="w-full h-2 rounded-full bg-[var(--titan-hover)] overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${goal.percentage}%` }}
            transition={{
              delay: 0.3 + idx * 0.1,
              duration: 0.6,
              ease: "easeOut",
            }}
            className={`h-full rounded-full ${goal.percentage >= 80 ? "bg-emerald-500" : goal.percentage >= 50 ? "bg-sky-500" : "bg-amber-500"}`}
          />
        </div>
        <div className="flex justify-between text-[11px] text-[var(--titan-text-muted)]">
          <span>
            {goal.current.toLocaleString()} / {goal.target.toLocaleString()}
          </span>
          <span>{goal.target - goal.current} remaining</span>
        </div>
      </motion.div>
    ))}
  </div>
);

const viewComponents = {
  traffic: TrafficView,
  campaigns: CampaignsView,
  goals: GoalsView,
};

const Engage = () => {
  const [activeTab, setActiveTab] = useState("traffic");
  const containerRef = useRef(null);
  const tabRefs = useRef({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const el = tabRefs.current[activeTab];
    if (el && containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const tabRect = el.getBoundingClientRect();
      setIndicator({
        left: tabRect.left - containerRect.left,
        width: tabRect.width,
      });
    }
  }, [activeTab]);

  return (
    <PageWrapper title="Engage">
      <div className="flex flex-col gap-4 h-full">
        {/* Tab Switch */}
        <div
          ref={containerRef}
          className="relative flex items-center gap-0.5 p-1 rounded-full bg-[var(--titan-glass-bg)] backdrop-blur-xl border border-[var(--titan-card-border)] w-fit"
        >
          {/* Sliding pill */}
          <motion.div
            className="absolute top-1 bottom-1 rounded-full"
            animate={{
              left: indicator.left,
              width: indicator.width,
            }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 35,
              mass: 0.6,
            }}
            style={{
              background: "var(--titan-card-bg)",
              border: "1px solid var(--titan-card-border)",
              boxShadow: "var(--titan-neo-raised-sm)",
              willChange: "left, width",
            }}
          />
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                ref={(el) => (tabRefs.current[tab.key] = el)}
                onClick={() => {
                  Logger.interaction({
                    action: "click",
                    target: `engage-tab-${tab.key}`,
                    component: "Engage",
                  });
                  setActiveTab(tab.key);
                }}
                className={`relative z-10 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium cursor-pointer select-none transition-colors duration-150 ${
                  isActive
                    ? "text-[var(--titan-primary)]"
                    : "text-[var(--titan-text-muted)] hover:text-[var(--titan-primary)]"
                }`}
              >
                <Icon size={15} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Container */}
        <div
          className="flex-1 rounded-xl overflow-hidden text-[var(--titan-primary)] transition-colors bg-[var(--titan-glass-bg)] backdrop-blur-xl border border-[var(--titan-card-border)]"
          style={{ boxShadow: "var(--titan-glass-shadow)" }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="h-full overflow-y-auto"
            >
              {React.createElement(viewComponents[activeTab])}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Engage;
