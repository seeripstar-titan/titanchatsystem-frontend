import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Database,
  FileText,
  Cpu,
  Users,
  Globe,
  CheckCircle2,
  Clock,
  MinusCircle,
  Zap,
  Code,
  Copy,
  Check,
  Pencil,
  Shield,
  Loader2,
  Wifi,
} from "lucide-react";

const cardShadow = "0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03)";

const statusConfig = {
  active: {
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    icon: CheckCircle2,
    label: "Active",
  },
  pending: {
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    icon: Clock,
    label: "Pending",
  },
  inactive: {
    color: "text-gray-400",
    bg: "bg-gray-400/10",
    icon: MinusCircle,
    label: "Inactive",
  },
};

const computeChecklist = (form) => {
  const mcp = !form.mcpEnabled
    ? "inactive"
    : form.mcpConnections.length >= 1
      ? "active"
      : "pending";
  const api = !form.apiEnabled
    ? "inactive"
    : form.apiEndpoints?.length >= 1
      ? "active"
      : "pending";
  const rag = !form.ragEnabled
    ? "inactive"
    : form.ragFiles.length >= 1
      ? "active"
      : "pending";
  const orchestrator =
    form.model &&
    form.gateway.clientId &&
    form.gateway.clientSecret &&
    form.gateway.tenantId
      ? "active"
      : "pending";
  const agents = !form.agentsEnabled
    ? "inactive"
    : form.agents.length > 0 &&
        form.agents.every((a) => a.status === "accepted")
      ? "active"
      : "pending";

  const applicableItems = [orchestrator];
  if (form.mcpEnabled) applicableItems.push(mcp);
  if (form.apiEnabled) applicableItems.push(api);
  if (form.ragEnabled) applicableItems.push(rag);
  if (form.agentsEnabled) applicableItems.push(agents);
  const overall = applicableItems.every((s) => s === "active")
    ? "active"
    : "pending";

  return { mcp, api, rag, orchestrator, agents, overall };
};

const checklistItems = [
  {
    key: "mcp",
    label: "MCP Connections",
    description: "At least one database connection configured",
    icon: Database,
  },
  {
    key: "api",
    label: "API Connections",
    description: "At least one API endpoint configured",
    icon: Globe,
  },
  {
    key: "rag",
    label: "RAG Documents",
    description: "Document files uploaded and within size limits",
    icon: FileText,
  },
  {
    key: "orchestrator",
    label: "Orchestrator",
    description: "Model selected and AI gateway credentials provided",
    icon: Cpu,
  },
  {
    key: "agents",
    label: "Human Agents",
    description: "All invited agents have accepted their invites",
    icon: Users,
  },
  {
    key: "overall",
    label: "Overall Status",
    description: "All systems operational — ready for deployment",
    icon: Zap,
  },
];

const BotChecklist = ({ form, onBack, onEdit }) => {
  const checklist = useMemo(() => computeChecklist(form), [form]);
  const [copied, setCopied] = useState(false);
  const [showScript, setShowScript] = useState(false);

  // Whitelist check state
  const [whitelistStatus, setWhitelistStatus] = useState("idle"); // idle | checking | ok | failed
  const [whitelistResults, setWhitelistResults] = useState([]);

  const botId = `bot-${form.name?.toLowerCase().replace(/\s+/g, "-")}-${Date.now().toString(36).slice(-4)}`;

  const integrationScript = `<!-- Titan Chat Widget -->
<script>
  (function(w,d,s,o){
    var j=d.createElement(s);j.async=1;
    j.src='https://cdn.titanchat.io/widget.js';
    j.dataset.botId='${botId}';
    j.dataset.tenant='${form.gateway.tenantId || "YOUR_TENANT_ID"}';
    d.head.appendChild(j);
  })(window,document,'script');
</script>`;

  const copyScript = () => {
    navigator.clipboard.writeText(integrationScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Simulate whitelist ping check
  const runWhitelistCheck = () => {
    setWhitelistStatus("checking");
    setWhitelistResults([]);

    const targets = [];
    if (form.mcpEnabled) {
      form.mcpConnections.forEach((c) =>
        targets.push({
          type: "MCP",
          name: c.name,
          host: `${c.host}:${c.port}`,
        }),
      );
    }
    if (form.apiEnabled) {
      form.apiEndpoints.forEach((ep) =>
        targets.push({ type: "API", name: ep.name, host: ep.url }),
      );
    }
    if (form.gateway.tenantId) {
      targets.push({
        type: "Gateway",
        name: "AI Gateway",
        host: `gateway.titanchat.io/${form.gateway.tenantId}`,
      });
    }

    if (targets.length === 0) {
      setWhitelistStatus("ok");
      setWhitelistResults([
        {
          type: "System",
          name: "No external connections",
          host: "—",
          status: "ok",
        },
      ]);
      return;
    }

    // Simulate async pings with staggered results
    const results = [];
    let completed = 0;
    targets.forEach((target, i) => {
      setTimeout(
        () => {
          const isOk = Math.random() > 0.15; // 85% success rate simulation
          results.push({ ...target, status: isOk ? "ok" : "failed" });
          setWhitelistResults([...results]);
          completed++;
          if (completed === targets.length) {
            setWhitelistStatus(
              results.every((r) => r.status === "ok") ? "ok" : "failed",
            );
          }
        },
        600 + i * 400,
      );
    });
  };

  const allWhitelistOk = whitelistStatus === "ok";
  const canGenerateScript = checklist.overall === "active" && allWhitelistOk;

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.button
            onClick={onBack}
            whileHover={{ x: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 text-sm font-medium text-[var(--titan-text-muted)] hover:text-[var(--titan-primary)] transition-colors cursor-pointer"
          >
            <ArrowLeft size={16} /> Back
          </motion.button>
          <span className="text-sm font-semibold text-[var(--titan-primary)]">
            Deployment Checklist — {form.name || "New Bot"}
          </span>
        </div>
        <motion.button
          onClick={onEdit}
          whileTap={{ scale: 0.97 }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border border-[var(--titan-card-border)] text-[var(--titan-text-muted)] hover:text-[var(--titan-primary)] hover:border-[var(--titan-border-hover)] transition-colors cursor-pointer"
        >
          <Pencil size={12} /> Edit Configuration
        </motion.button>
      </div>

      {/* Checklist Items */}
      <div className="flex flex-col gap-2">
        {checklistItems.map((item, idx) => {
          const status = checklist[item.key];
          const cfg = statusConfig[status];
          const StatusIcon = cfg.icon;
          const ItemIcon = item.icon;
          const isOverall = item.key === "overall";

          return (
            <motion.div
              key={item.key}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.07 }}
              className={`flex items-center gap-4 px-5 py-4 rounded-2xl border backdrop-blur-xl ${
                isOverall
                  ? "border-[var(--titan-primary)]/20 bg-[var(--titan-primary)]/5"
                  : "border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)]"
              }`}
              style={{
                boxShadow: cardShadow,
                WebkitBackdropFilter: "blur(28px) saturate(185%)",
                backdropFilter: "blur(28px) saturate(185%)",
              }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)]">
                <ItemIcon
                  size={17}
                  className="text-[var(--titan-text-muted)]"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-semibold text-[var(--titan-primary)]">
                  {item.label}
                </p>
                <p className="text-[11px] text-[var(--titan-text-muted)]">
                  {item.description}
                </p>
              </div>
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${cfg.color} ${cfg.bg}`}
              >
                <StatusIcon size={12} />
                {cfg.label}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Whitelist Check */}
      {checklist.overall === "active" && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-3"
        >
          <div
            className="rounded-2xl border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)] backdrop-blur-xl p-4"
            style={{ boxShadow: cardShadow }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Shield size={15} className="text-[var(--titan-text-muted)]" />
                <span className="text-[13px] font-semibold text-[var(--titan-primary)]">
                  Whitelist & Connectivity Check
                </span>
              </div>
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={runWhitelistCheck}
                disabled={whitelistStatus === "checking"}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[var(--titan-primary)] text-[var(--titan-bg)] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {whitelistStatus === "checking" ? (
                  <>
                    <Loader2 size={12} className="animate-spin" /> Checking...
                  </>
                ) : (
                  <>
                    <Wifi size={12} /> Check Whitelist
                  </>
                )}
              </motion.button>
            </div>

            <p className="text-[11px] text-[var(--titan-text-muted)] mb-3">
              Pings all configured databases, APIs, and gateway endpoints to
              verify network accessibility.
            </p>

            {/* Ping results */}
            {whitelistResults.length > 0 && (
              <div className="flex flex-col gap-1.5">
                {whitelistResults.map((r, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)]"
                  >
                    {r.status === "ok" ? (
                      <CheckCircle2
                        size={14}
                        className="text-emerald-500 shrink-0"
                      />
                    ) : (
                      <MinusCircle
                        size={14}
                        className="text-rose-500 shrink-0"
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-[12px] font-medium text-[var(--titan-primary)]">
                        <span className="text-[var(--titan-text-muted)] text-[10px] font-semibold mr-1.5">
                          {r.type}
                        </span>
                        {r.name}
                      </p>
                      <p className="text-[10px] text-[var(--titan-text-muted)] font-mono truncate">
                        {r.host}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] font-semibold ${r.status === "ok" ? "text-emerald-500" : "text-rose-500"}`}
                    >
                      {r.status === "ok" ? "Reachable" : "Unreachable"}
                    </span>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Status summary */}
            {whitelistStatus !== "idle" && whitelistStatus !== "checking" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`mt-3 px-3 py-2 rounded-xl text-xs font-semibold ${
                  whitelistStatus === "ok"
                    ? "bg-emerald-500/10 text-emerald-500"
                    : "bg-rose-500/10 text-rose-500"
                }`}
              >
                {whitelistStatus === "ok"
                  ? "✓ All endpoints are reachable. Ready to generate integration script."
                  : "✗ Some endpoints are unreachable. Please check your network whitelist."}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* Generate Integration Script — only after whitelist passes */}
      <AnimatePresence>
        {canGenerateScript && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="flex flex-col gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowScript(!showScript)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl text-sm font-semibold bg-[var(--titan-primary)] text-[var(--titan-bg)] cursor-pointer"
              style={{ boxShadow: cardShadow }}
            >
              <Code size={16} />
              {showScript
                ? "Hide Integration Script"
                : "Generate Integration Script"}
            </motion.button>

            <AnimatePresence>
              {showScript && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="relative rounded-2xl border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)] backdrop-blur-xl p-4">
                    {/* Platform selector */}
                    <div className="flex items-center gap-2 mb-4">
                      {["website", "teams", "api"].map((p) => (
                        <button
                          key={p}
                          onClick={() => {
                            setDeployPlatform(p);
                            setCopied(false);
                          }}
                          className={`px-3 py-1.5 rounded-full text-[12px] font-semibold border transition-all cursor-pointer ${
                            deployPlatform === p
                              ? "bg-[var(--titan-primary)] text-[var(--titan-bg)] border-[var(--titan-primary)]"
                              : "border-[var(--titan-card-border)] text-[var(--titan-text-muted)] hover:border-[var(--titan-border-hover)]"
                          }`}
                        >
                          {p === "website"
                            ? "Website"
                            : p === "teams"
                              ? "Teams"
                              : "API"}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-[var(--titan-text-muted)] uppercase tracking-wider">
                        {platformLabels[deployPlatform]}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={copyScript}
                        className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium border border-[var(--titan-card-border)] text-[var(--titan-text-muted)] hover:text-[var(--titan-primary)] hover:bg-[var(--titan-hover)] transition-colors cursor-pointer"
                      >
                        {copied ? <Check size={12} /> : <Copy size={12} />}
                        {copied ? "Copied!" : "Copy"}
                      </motion.button>
                    </div>
                    <pre className="text-[12px] leading-relaxed text-[var(--titan-primary)] overflow-x-auto custom-scrollbar whitespace-pre font-mono bg-[var(--titan-hover)] rounded-xl p-3">
                      {integrationScript}
                    </pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BotChecklist;
