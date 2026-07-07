// Mock data for the Team page — replace with API calls later

export const mockAgents = [
  {
    id: "a1",
    name: "Sarah Chen",
    email: "sarah.chen@titan.io",
    role: "Senior Agent",
    status: "active",
    lastSeen: "Just now",
    chatLimit: 5,
    groups: ["Sales", "VIP Support"],
    performance: {
      acceptedChats: 342,
      resolvedChats: 318,
      avgResponseTime: "1.2m",
    },
  },
  {
    id: "a2",
    name: "Marcus Johnson",
    email: "marcus.j@titan.io",
    role: "Agent",
    status: "accepting-chats",
    lastSeen: "Just now",
    chatLimit: 4,
    groups: ["General Support"],
    performance: {
      acceptedChats: 189,
      resolvedChats: 172,
      avgResponseTime: "2.4m",
    },
  },
  {
    id: "a3",
    name: "Priya Sharma",
    email: "priya.s@titan.io",
    role: "Lead Agent",
    status: "active",
    lastSeen: "2 min ago",
    chatLimit: 6,
    groups: ["Technical", "Billing"],
    performance: {
      acceptedChats: 521,
      resolvedChats: 498,
      avgResponseTime: "0.8m",
    },
  },
  {
    id: "a4",
    name: "Alex Rivera",
    email: "alex.r@titan.io",
    role: "Agent",
    status: "offline",
    lastSeen: "3 hours ago",
    chatLimit: 4,
    groups: ["General Support", "Sales"],
    performance: {
      acceptedChats: 95,
      resolvedChats: 88,
      avgResponseTime: "3.1m",
    },
  },
  {
    id: "a5",
    name: "Jordan Lee",
    email: "jordan.l@titan.io",
    role: "Agent",
    status: "accepting-chats",
    lastSeen: "Just now",
    chatLimit: 3,
    groups: ["Onboarding"],
    performance: {
      acceptedChats: 67,
      resolvedChats: 61,
      avgResponseTime: "2.0m",
    },
  },
];

export const mockChatbots = [
  {
    id: "b1",
    name: "TitanBot",
    type: "AI Assistant",
    status: "enabled",
    createdAt: "Jan 15, 2026",
    groups: ["General Support", "Sales"],
    performance: {
      totalChats: 1240,
      resolvedChats: 1105,
      avgResponseTime: "0.3s",
      handoffs: 135,
    },
  },
  {
    id: "b2",
    name: "SalesHelper",
    type: "Lead Qualifier",
    status: "enabled",
    createdAt: "Mar 8, 2026",
    groups: ["Sales"],
    performance: {
      totalChats: 430,
      resolvedChats: 380,
      avgResponseTime: "0.5s",
      handoffs: 50,
    },
  },
  {
    id: "b3",
    name: "TechSupport AI",
    type: "Technical Support",
    status: "disabled",
    createdAt: "May 20, 2026",
    groups: ["Technical"],
    performance: {
      totalChats: 89,
      resolvedChats: 72,
      avgResponseTime: "0.4s",
      handoffs: 17,
    },
  },
];

export const mockGroups = [
  {
    id: "g1",
    name: "General Support",
    description: "Handle general customer inquiries and issues",
    createdAt: "Dec 1, 2025",
    activeChats: 12,
    members: [
      { name: "Marcus Johnson", role: "Agent" },
      { name: "Alex Rivera", role: "Agent" },
      { name: "TitanBot", role: "Chatbot" },
    ],
  },
  {
    id: "g2",
    name: "Sales",
    description: "Sales inquiries and lead management",
    createdAt: "Dec 1, 2025",
    activeChats: 8,
    members: [
      { name: "Sarah Chen", role: "Senior Agent" },
      { name: "Alex Rivera", role: "Agent" },
      { name: "SalesHelper", role: "Chatbot" },
    ],
  },
  {
    id: "g3",
    name: "Technical",
    description: "Technical support and troubleshooting",
    createdAt: "Jan 10, 2026",
    activeChats: 5,
    members: [
      { name: "Priya Sharma", role: "Lead Agent" },
      { name: "TechSupport AI", role: "Chatbot" },
    ],
  },
  {
    id: "g4",
    name: "VIP Support",
    description: "Premium support for VIP customers",
    createdAt: "Feb 15, 2026",
    activeChats: 3,
    members: [{ name: "Sarah Chen", role: "Senior Agent" }],
  },
];

export const mockSuspendedAgents = [
  {
    id: "s1",
    name: "Tom Baker",
    email: "tom.b@titan.io",
    role: "Agent",
    status: "suspended",
    suspendedAt: "Jun 20, 2026",
    suspendReason: "Policy violation",
    performance: {
      acceptedChats: 45,
      resolvedChats: 30,
    },
  },
  {
    id: "s2",
    name: "Nina Patel",
    email: "nina.p@titan.io",
    role: "Agent",
    status: "suspended",
    suspendedAt: "Jun 28, 2026",
    suspendReason: "Inactive for 30+ days",
    performance: {
      acceptedChats: 112,
      resolvedChats: 98,
    },
  },
];
