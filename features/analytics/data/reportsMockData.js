/**
 * Mock data for Reports feature
 * Provides realistic data for all report categories
 */

// Helper to generate date labels for last N days
const generateDateLabels = (days) => {
  const labels = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    labels.push(
      d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    );
  }
  return labels;
};

const last7Days = generateDateLabels(7);
const last14Days = generateDateLabels(14);
const last30Days = generateDateLabels(30);

// ── Summary / Dashboard ──
export const summaryData = {
  kpis: [
    { label: "Total Chats", value: "12,847", change: "+12.4%", trend: "up" },
    {
      label: "Avg Response Time",
      value: "1m 23s",
      change: "-8.2%",
      trend: "down",
    },
    { label: "Satisfaction", value: "94.2%", change: "+2.1%", trend: "up" },
    { label: "Missed Chats", value: "342", change: "-15.7%", trend: "down" },
    { label: "Active Agents", value: "28", change: "+3", trend: "up" },
    {
      label: "Avg Chat Duration",
      value: "8m 42s",
      change: "-1.3%",
      trend: "down",
    },
  ],
  weeklyTrend: last7Days.map((day, i) => ({
    date: day,
    chats: Math.floor(1600 + Math.random() * 600),
    resolved: Math.floor(1400 + Math.random() * 500),
    missed: Math.floor(30 + Math.random() * 50),
  })),
};

// ── Chats ──
export const totalChatsData = last30Days.map((day, i) => ({
  date: day,
  total: Math.floor(400 + Math.sin(i * 0.5) * 150 + Math.random() * 100),
  unique: Math.floor(300 + Math.sin(i * 0.5) * 100 + Math.random() * 80),
}));

export const chatEngagementData = last14Days.map((day, i) => ({
  date: day,
  engaged: Math.floor(70 + Math.random() * 20),
  notEngaged: Math.floor(10 + Math.random() * 15),
  proactive: Math.floor(20 + Math.random() * 30),
}));

export const missedChatsData = last14Days.map((day, i) => ({
  date: day,
  missed: Math.floor(15 + Math.random() * 35),
  total: Math.floor(300 + Math.random() * 200),
}));

export const campaignsData = [
  {
    name: "Welcome Popup",
    impressions: 4520,
    clicks: 892,
    conversions: 234,
    rate: "5.2%",
  },
  {
    name: "Exit Intent",
    impressions: 3100,
    clicks: 620,
    conversions: 186,
    rate: "6.0%",
  },
  {
    name: "Product Page",
    impressions: 2800,
    clicks: 560,
    conversions: 168,
    rate: "6.0%",
  },
  {
    name: "Cart Reminder",
    impressions: 1950,
    clicks: 488,
    conversions: 195,
    rate: "10.0%",
  },
  {
    name: "Holiday Promo",
    impressions: 5200,
    clicks: 1040,
    conversions: 312,
    rate: "6.0%",
  },
];

export const tagsUsageData = [
  { tag: "Billing", count: 1245, percentage: 22 },
  { tag: "Technical", count: 980, percentage: 17 },
  { tag: "Sales", count: 876, percentage: 15 },
  { tag: "Feature Request", count: 654, percentage: 11 },
  { tag: "Bug Report", count: 543, percentage: 9 },
  { tag: "Account", count: 432, percentage: 8 },
  { tag: "Onboarding", count: 387, percentage: 7 },
  { tag: "Refund", count: 321, percentage: 6 },
  { tag: "Other", count: 298, percentage: 5 },
];

export const chatSatisfactionData = last14Days.map((day, i) => ({
  date: day,
  good: Math.floor(75 + Math.random() * 15),
  bad: Math.floor(5 + Math.random() * 10),
  neutral: Math.floor(10 + Math.random() * 10),
}));

export const chatAvailabilityData = last7Days.map((day, i) => ({
  date: day,
  online: Math.floor(18 + Math.random() * 6),
  offline: 24 - Math.floor(18 + Math.random() * 6),
}));

export const chatFormsData = {
  preChatForms: { filled: 3420, skipped: 890, total: 4310 },
  postChatForms: { filled: 2180, skipped: 1540, total: 3720 },
  offlineMessages: { received: 456, responded: 412, pending: 44 },
};

export const chatDurationData = last14Days.map((day, i) => ({
  date: day,
  avgMinutes: +(6 + Math.random() * 6).toFixed(1),
  medianMinutes: +(5 + Math.random() * 4).toFixed(1),
}));

// ── Agents ──
export const agentPerformanceData = [
  {
    name: "Sarah Chen",
    chats: 342,
    avgResponse: "45s",
    satisfaction: 97,
    resolved: 98,
  },
  {
    name: "Mike Johnson",
    chats: 298,
    avgResponse: "1m 12s",
    satisfaction: 94,
    resolved: 95,
  },
  {
    name: "Ana Garcia",
    chats: 276,
    avgResponse: "52s",
    satisfaction: 96,
    resolved: 97,
  },
  {
    name: "James Wilson",
    chats: 234,
    avgResponse: "1m 30s",
    satisfaction: 91,
    resolved: 93,
  },
  {
    name: "Priya Patel",
    chats: 312,
    avgResponse: "38s",
    satisfaction: 98,
    resolved: 99,
  },
  {
    name: "Tom Brown",
    chats: 189,
    avgResponse: "2m 05s",
    satisfaction: 88,
    resolved: 90,
  },
  {
    name: "Lisa Wang",
    chats: 267,
    avgResponse: "55s",
    satisfaction: 95,
    resolved: 96,
  },
  {
    name: "David Kim",
    chats: 223,
    avgResponse: "1m 18s",
    satisfaction: 92,
    resolved: 94,
  },
];

export const chatResponseTimesData = last14Days.map((day, i) => ({
  date: day,
  firstResponse: +(30 + Math.random() * 60).toFixed(0),
  avgResponse: +(45 + Math.random() * 45).toFixed(0),
}));

export const staffingPredictionData = [
  { hour: "6 AM", current: 2, predicted: 3, chatsExpected: 15 },
  { hour: "7 AM", current: 3, predicted: 4, chatsExpected: 28 },
  { hour: "8 AM", current: 5, predicted: 6, chatsExpected: 45 },
  { hour: "9 AM", current: 8, predicted: 8, chatsExpected: 72 },
  { hour: "10 AM", current: 10, predicted: 10, chatsExpected: 95 },
  { hour: "11 AM", current: 10, predicted: 12, chatsExpected: 110 },
  { hour: "12 PM", current: 8, predicted: 9, chatsExpected: 85 },
  { hour: "1 PM", current: 10, predicted: 11, chatsExpected: 98 },
  { hour: "2 PM", current: 10, predicted: 12, chatsExpected: 115 },
  { hour: "3 PM", current: 10, predicted: 11, chatsExpected: 105 },
  { hour: "4 PM", current: 8, predicted: 9, chatsExpected: 78 },
  { hour: "5 PM", current: 6, predicted: 7, chatsExpected: 55 },
  { hour: "6 PM", current: 4, predicted: 5, chatsExpected: 35 },
  { hour: "7 PM", current: 3, predicted: 3, chatsExpected: 20 },
  { hour: "8 PM", current: 2, predicted: 2, chatsExpected: 12 },
];

export const agentActivityData = [
  { name: "Sarah Chen", online: 7.5, chatting: 5.2, idle: 2.3, offline: 0.5 },
  { name: "Mike Johnson", online: 8.0, chatting: 4.8, idle: 3.2, offline: 0 },
  { name: "Ana Garcia", online: 7.0, chatting: 5.5, idle: 1.5, offline: 1.0 },
  { name: "James Wilson", online: 6.5, chatting: 3.8, idle: 2.7, offline: 1.5 },
  { name: "Priya Patel", online: 8.0, chatting: 6.2, idle: 1.8, offline: 0 },
  { name: "Tom Brown", online: 5.5, chatting: 3.0, idle: 2.5, offline: 2.5 },
  { name: "Lisa Wang", online: 7.5, chatting: 5.0, idle: 2.5, offline: 0.5 },
  { name: "David Kim", online: 7.0, chatting: 4.5, idle: 2.5, offline: 1.0 },
];

// ── Customers ──
export const queuedCustomersData = last14Days.map((day, i) => ({
  date: day,
  queued: Math.floor(20 + Math.random() * 40),
  served: Math.floor(15 + Math.random() * 35),
  avgWait: +(1 + Math.random() * 4).toFixed(1),
}));

export const queueAbandonmentData = last14Days.map((day, i) => ({
  date: day,
  abandoned: Math.floor(5 + Math.random() * 20),
  total: Math.floor(40 + Math.random() * 60),
  rate: +(8 + Math.random() * 15).toFixed(1),
}));

// ── Ecommerce ──
export const achievedGoalsData = last14Days.map((day, i) => ({
  date: day,
  achieved: Math.floor(10 + Math.random() * 30),
  target: 35,
}));

export const trackedSalesData = last14Days.map((day, i) => ({
  date: day,
  revenue: Math.floor(2000 + Math.random() * 5000),
  transactions: Math.floor(15 + Math.random() * 30),
  avgOrder: +(80 + Math.random() * 120).toFixed(0),
}));

// ── 24-Hour Timeline Data ──
const hours24 = [
  "12 AM",
  "1 AM",
  "2 AM",
  "3 AM",
  "4 AM",
  "5 AM",
  "6 AM",
  "7 AM",
  "8 AM",
  "9 AM",
  "10 AM",
  "11 AM",
  "12 PM",
  "1 PM",
  "2 PM",
  "3 PM",
  "4 PM",
  "5 PM",
  "6 PM",
  "7 PM",
  "8 PM",
  "9 PM",
  "10 PM",
  "11 PM",
];

export const hourlyChatsData = hours24.map((hour, i) => {
  // Simulate realistic chat volume — low at night, peak during business hours
  const base =
    i < 6
      ? 2
      : i < 9
        ? 15 + (i - 6) * 12
        : i < 12
          ? 45 + Math.random() * 20
          : i < 14
            ? 40 + Math.random() * 15
            : i < 18
              ? 50 + Math.random() * 25
              : i < 21
                ? 25 + (21 - i) * 5
                : 5 + Math.random() * 5;
  return {
    hour,
    chats: Math.floor(base + Math.random() * 8),
    resolved: Math.floor(base * 0.85 + Math.random() * 5),
  };
});

export const hourlyResponseTimeData = hours24.map((hour, i) => {
  const base =
    i < 6
      ? 20
      : i < 9
        ? 35 + (i - 6) * 10
        : i < 12
          ? 55 + Math.random() * 20
          : i < 14
            ? 50 + Math.random() * 15
            : i < 18
              ? 65 + Math.random() * 25
              : i < 21
                ? 40 + (21 - i) * 5
                : 25 + Math.random() * 10;
  return {
    hour,
    avgResponse: Math.floor(base + Math.random() * 10),
    firstResponse: Math.floor(base * 0.6 + Math.random() * 8),
  };
});

export const hourlyAgentActivityData = hours24.map((hour, i) => {
  const online =
    i < 6
      ? 1
      : i < 9
        ? 2 + (i - 6) * 2
        : i < 12
          ? 8 + Math.floor(Math.random() * 3)
          : i < 14
            ? 7 + Math.floor(Math.random() * 3)
            : i < 18
              ? 9 + Math.floor(Math.random() * 3)
              : i < 21
                ? 5 + Math.floor(21 - i)
                : 2 + Math.floor(Math.random() * 2);
  return {
    hour,
    online,
    chatting: Math.floor(online * (0.5 + Math.random() * 0.3)),
    idle: Math.max(
      0,
      online - Math.floor(online * (0.5 + Math.random() * 0.3)),
    ),
  };
});

// Agent login/accepting-chats activity segments (24 booleans — true = was accepting chats)
// Simulates a typical 9 AM to 6 PM shift with a lunch break
export const agentLoginActivity = {
  today: [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    true,
    true,
    false,
    true,
    true,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
  yesterday: [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    true,
    true,
    true,
    false,
    true,
    true,
    true,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
  ],
  twoDaysAgo: [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    true,
    true,
    true,
    false,
    false,
    true,
    true,
    true,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ],
};
