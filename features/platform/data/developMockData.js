// Mock data for the Develop page — replace with API calls later

export const botTypes = [
  {
    id: "customer-support",
    label: "Customer Support",
    color: "#7C8FD4",
    icon: "Headphones",
  },
  { id: "finance", label: "Finance", color: "#6BAF8D", icon: "Landmark" },
  { id: "sales", label: "Sales", color: "#D4A574", icon: "TrendingUp" },
  { id: "hr", label: "HR & Recruitment", color: "#D47C94", icon: "UserCheck" },
  {
    id: "it-helpdesk",
    label: "IT Helpdesk",
    color: "#7EAED4",
    icon: "Monitor",
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    color: "#A07CC8",
    icon: "ShoppingCart",
  },
  { id: "healthcare", label: "Healthcare", color: "#6BAFAA", icon: "Heart" },
  {
    id: "education",
    label: "Education",
    color: "#D49E74",
    icon: "GraduationCap",
  },
  { id: "custom", label: "Custom", color: "#8B9BB5", icon: "Settings" },
];

// Models grouped by provider with local asset logos
export const modelProviders = [
  {
    provider: "OpenAI",
    logo: "/assets/openai.webp",
    models: [
      { id: "gpt-4o", label: "GPT-4o" },
      { id: "gpt-4o-mini", label: "GPT-4o Mini" },
      { id: "gpt-4-turbo", label: "GPT-4 Turbo" },
      { id: "o3", label: "o3" },
      { id: "o3-mini", label: "o3 Mini" },
      { id: "o4-mini", label: "o4 Mini" },
    ],
  },
  {
    provider: "Anthropic",
    logo: "/assets/anthropic.svg",
    models: [
      { id: "claude-4-opus", label: "Claude 4 Opus" },
      { id: "claude-4-sonnet", label: "Claude 4 Sonnet" },
      { id: "claude-3.5-sonnet", label: "Claude 3.5 Sonnet" },
      { id: "claude-3.5-haiku", label: "Claude 3.5 Haiku" },
    ],
  },
  {
    provider: "Google",
    logo: "/assets/geminii.webp",
    models: [
      { id: "gemini-2.5-pro", label: "Gemini 2.5 Pro" },
      { id: "gemini-2.5-flash", label: "Gemini 2.5 Flash" },
      { id: "gemini-2.0-flash", label: "Gemini 2.0 Flash" },
    ],
  },
];

// Flat list for backward compat
export const availableModels = modelProviders.flatMap((p) =>
  p.models.map((m) => ({ ...m, provider: p.provider })),
);

export const availableDatabases = [
  { id: "postgres", label: "PostgreSQL", icon: "🐘" },
  { id: "mysql", label: "MySQL", icon: "🐬" },
  { id: "mongodb", label: "MongoDB", icon: "🍃" },
  { id: "redis", label: "Redis", icon: "🔴" },
  { id: "sqlite", label: "SQLite", icon: "📦" },
  { id: "mssql", label: "SQL Server", icon: "🏢" },
  { id: "snowflake", label: "Snowflake", icon: "❄️" },
];

export const mockExistingBots = [
  {
    id: "bot-1",
    name: "Support Bot Alpha",
    type: "customer-support",
    status: "active",
    createdAt: "2026-06-15",
    model: "gpt-4o",
    mcpConnections: [
      {
        id: "db-1",
        type: "postgres",
        name: "Main DB",
        host: "db.titan.io",
        port: "5432",
        database: "titan_prod",
        status: "active",
      },
    ],
    ragEnabled: true,
    ragFiles: [
      { name: "product-docs.pdf", size: 2400000, status: "processed" },
      { name: "faq.json", size: 180000, status: "processed" },
    ],
    gateway: {
      clientId: "tc-alpha-001",
      clientSecret: "sk-alpha-secret",
      tenantId: "tenant-001",
    },
    agents: [
      {
        id: "a1",
        name: "Sarah Chen",
        email: "sarah.chen@titan.io",
        status: "accepted",
      },
      {
        id: "a2",
        name: "Marcus Johnson",
        email: "marcus.j@titan.io",
        status: "accepted",
      },
      {
        id: "a3",
        name: "Priya Sharma",
        email: "priya.s@titan.io",
        status: "pending",
      },
    ],
  },
  {
    id: "bot-2",
    name: "Finance Assistant",
    type: "finance",
    status: "pending",
    createdAt: "2026-06-28",
    model: "claude-4-sonnet",
    mcpConnections: [
      {
        id: "db-2",
        type: "snowflake",
        name: "Analytics DW",
        host: "sf.titan.io",
        port: "443",
        database: "fin_analytics",
        status: "pending",
      },
    ],
    ragEnabled: false,
    ragFiles: [],
    gateway: { clientId: "", clientSecret: "", tenantId: "" },
    agents: [],
  },
  {
    id: "bot-3",
    name: "Sales Copilot",
    type: "sales",
    status: "active",
    createdAt: "2026-05-10",
    model: "gpt-4o-mini",
    mcpConnections: [
      {
        id: "db-3",
        type: "postgres",
        name: "CRM DB",
        host: "crm.titan.io",
        port: "5432",
        database: "crm",
        status: "active",
      },
      {
        id: "db-4",
        type: "redis",
        name: "Cache",
        host: "cache.titan.io",
        port: "6379",
        database: "0",
        status: "active",
      },
    ],
    ragEnabled: true,
    ragFiles: [
      { name: "sales-playbook.pdf", size: 5200000, status: "processed" },
    ],
    gateway: {
      clientId: "tc-sales-003",
      clientSecret: "sk-sales-secret",
      tenantId: "tenant-001",
    },
    agents: [
      {
        id: "a4",
        name: "Alex Rivera",
        email: "alex.r@titan.io",
        status: "accepted",
      },
      {
        id: "a5",
        name: "Jordan Lee",
        email: "jordan.l@titan.io",
        status: "accepted",
      },
    ],
  },
];
