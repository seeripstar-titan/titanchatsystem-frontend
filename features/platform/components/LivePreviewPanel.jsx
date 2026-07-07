import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bot,
  Database,
  Globe,
  FileText,
  Cpu,
  Users,
  CheckCircle2,
  AlertCircle,
  Settings2,
  Zap,
} from "lucide-react";
import { botTypes, availableModels } from "../data/developMockData";

const ok = "#34d399";
const err = "#f87171";
const muted = "#64748b";

/* ── Icon accent colors (only for icon containers, not node border/glow) ── */
const iconAccents = {
  bot: "#7C8FD4",
  mcp: "#6BAF8D",
  api: "#7EAED4",
  rag: "#D4A574",
  model: "#A07CC8",
  prompt: "#8B9BB5",
  agents: "#D47C94",
};

/* ── FlowNode — green/red only for border + glow ── */
const FlowNode = ({
  icon: Icon,
  label,
  active,
  detail,
  iconAccent,
  compact = false,
}) => {
  const statusColor = active ? ok : err;
  const iconColor = iconAccent || statusColor;
  return (
    <div
      className={`relative flex items-start gap-3 ${compact ? "px-3 py-2" : "px-4 py-3"} rounded-xl transition-all duration-200`}
      style={{
        backgroundColor: `${statusColor}30`,
        border: `1px solid ${statusColor}60`,
        boxShadow: `0 0 20px ${statusColor}40, 0 0 6px ${statusColor}25`,
      }}
    >
      <div
        className={`${compact ? "w-7 h-7" : "w-9 h-9"} rounded-lg flex items-center justify-center shrink-0 mt-0.5`}
        style={{
          backgroundColor: `${iconColor}20`,
          border: `1px solid ${iconColor}25`,
        }}
      >
        <Icon
          size={compact ? 13 : 16}
          style={{ color: iconColor }}
          strokeWidth={2}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span
            className={`${compact ? "text-[11px]" : "text-[12px]"} font-bold text-[var(--titan-primary)] uppercase tracking-wider`}
          >
            {label}
          </span>
          {active ? (
            <CheckCircle2 size={11} style={{ color: ok }} />
          ) : (
            <AlertCircle size={11} style={{ color: err }} />
          )}
        </div>
        <p
          className={`${compact ? "text-[10px]" : "text-[11px]"} text-[var(--titan-text-muted)] leading-snug mt-0.5 line-clamp-2`}
        >
          {detail}
        </p>
      </div>
    </div>
  );
};

/* ── Arrow connector with visible arrowhead ── */
const Arrow = ({ color: c = muted, short = false }) => (
  <div className="flex justify-center" style={{ padding: "1px 0" }}>
    <svg
      width="12"
      height={short ? 18 : 24}
      viewBox={`0 0 12 ${short ? 18 : 24}`}
      fill="none"
    >
      <line
        x1="6"
        y1="0"
        x2="6"
        y2={short ? 12 : 18}
        stroke={c}
        strokeWidth="2"
        strokeOpacity="1"
      />
      <polygon
        points={short ? "2,12 6,18 10,12" : "2,18 6,24 10,18"}
        fill={c}
        fillOpacity="1"
      />
    </svg>
  </div>
);

/* ── Render individual sub-nodes for a data source category ── */
const SubNodes = ({ items, icon: Icon, iconAccent }) =>
  items.map((item, idx) => (
    <React.Fragment key={item.id || idx}>
      {idx > 0 && <Arrow color={ok} short />}
      <FlowNode
        icon={Icon}
        label={item.label}
        active
        detail={item.detail}
        iconAccent={iconAccent}
        compact
      />
    </React.Fragment>
  ));

/* ── Build sub-node list from form data ── */
const getMcpSubNodes = (connections) =>
  connections.map((c) => ({
    id: c.id,
    label: c.name || "Connection",
    detail: `${c.type} · ${c.host}:${c.port}/${c.database}`,
  }));

const getApiSubNodes = (endpoints) =>
  endpoints.map((e) => ({
    id: e.id,
    label: `${e.method} ${e.name}`,
    detail: e.url || e.name,
  }));

const getAgentSubNodes = (agents) =>
  agents.map((a) => ({
    id: a.id || a.name,
    label: a.name || "Agent",
    detail: a.status || "pending",
  }));

const LivePreviewPanel = ({ form }) => {
  const typeInfo = botTypes.find((t) => t.id === form.type);
  const modelInfo = availableModels.find((m) => m.id === form.model);

  const hasIdentity = !!(form.name && form.type);
  const hasMcp = form.mcpEnabled && form.mcpConnections.length > 0;
  const hasApi = form.apiEnabled && form.apiEndpoints.length > 0;
  const hasRag = form.ragEnabled && form.ragFiles.length > 0;
  const hasModel = !!form.model;
  const hasGateway = !!(
    form.gateway.clientId &&
    form.gateway.clientSecret &&
    form.gateway.tenantId
  );
  const hasAgents = form.agentsEnabled && form.agents.length > 0;

  const typeName =
    form.type === "custom"
      ? form.customType || "Custom"
      : typeInfo?.label || "—";

  const enabledSources = [];
  if (form.mcpEnabled)
    enabledSources.push({
      key: "mcp",
      icon: Database,
      label: "MCP",
      active: hasMcp,
      iconAccent: iconAccents.mcp,
      detail: hasMcp
        ? `${form.mcpConnections.length} connection${form.mcpConnections.length > 1 ? "s" : ""}`
        : "Add connection",
      subNodes: hasMcp ? getMcpSubNodes(form.mcpConnections) : [],
    });
  if (form.apiEnabled)
    enabledSources.push({
      key: "api",
      icon: Globe,
      label: "API",
      active: hasApi,
      iconAccent: iconAccents.api,
      detail: hasApi
        ? `${form.apiEndpoints.length} endpoint${form.apiEndpoints.length > 1 ? "s" : ""}`
        : "Add endpoint",
      subNodes: hasApi ? getApiSubNodes(form.apiEndpoints) : [],
    });
  if (form.ragEnabled)
    enabledSources.push({
      key: "rag",
      icon: FileText,
      label: "RAG",
      active: hasRag,
      iconAccent: iconAccents.rag,
      detail: hasRag
        ? `${form.ragFiles.length} file${form.ragFiles.length > 1 ? "s" : ""}`
        : "Upload docs",
      subNodes: [],
    });

  const orchestratorDetail = [];
  if (hasModel) orchestratorDetail.push(modelInfo?.label || form.model);
  if (hasGateway) orchestratorDetail.push("Gateway ✓");
  else if (hasModel) orchestratorDetail.push("Gateway missing");
  if (form.prompt) orchestratorDetail.push("Prompt ✓");

  const renderSourceWithSubNodes = (src) => (
    <>
      <FlowNode
        icon={src.icon}
        label={src.label}
        active={src.active}
        detail={src.detail}
        iconAccent={src.iconAccent}
      />
      {src.subNodes.length > 0 && (
        <div className="ml-6 pl-3 border-l border-[var(--titan-card-border)] flex flex-col gap-1 mt-1 mb-1">
          <SubNodes
            items={src.subNodes}
            icon={src.icon}
            iconAccent={src.iconAccent}
          />
        </div>
      )}
    </>
  );

  return (
    <div className="flex flex-col gap-0 w-full">
      <div className="flex items-center justify-between mb-4 px-0.5">
        <div className="flex items-center gap-1.5">
          <Zap size={13} className="text-[var(--titan-text-muted)]" />
          <span className="text-[11px] font-bold text-[var(--titan-text-muted)] uppercase tracking-widest">
            Pipeline
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className={`w-2 h-2 rounded-full ${hasIdentity && hasModel ? "bg-emerald-500" : "bg-amber-500"} animate-pulse`}
          />
          <span className="text-[11px] text-[var(--titan-text-muted)]">
            {hasIdentity && hasModel ? "Ready" : "Configuring"}
          </span>
        </div>
      </div>

      {/* Bot Identity */}
      <FlowNode
        icon={Bot}
        label="Bot"
        active={hasIdentity}
        iconAccent={iconAccents.bot}
        detail={hasIdentity ? `${form.name} · ${typeName}` : "Set name & type"}
      />
      <Arrow color={hasIdentity ? ok : err} />

      {/* Data Sources */}
      {(form.mcpEnabled || form.apiEnabled || form.ragEnabled) && (
        <>
          <div className="flex items-center px-1 py-1.5">
            <div className="flex items-center gap-1.5">
              <Settings2 size={11} className="text-[var(--titan-text-muted)]" />
              <span className="text-[10px] font-bold text-[var(--titan-text-muted)] uppercase tracking-widest">
                Data Sources
              </span>
            </div>
          </div>

          {enabledSources.map((src) => (
            <div key={src.key} className="mb-1">
              {renderSourceWithSubNodes(src)}
              <Arrow color={src.active ? ok : err} />
            </div>
          ))}
        </>
      )}

      {/* Orchestrator (Model + Prompt) */}
      <FlowNode
        icon={Cpu}
        label="Orchestrator"
        active={hasModel && hasGateway}
        iconAccent={iconAccents.model}
        detail={
          orchestratorDetail.length > 0
            ? orchestratorDetail.join(" · ")
            : "Select model & gateway"
        }
      />

      <Arrow color={hasAgents || !form.agentsEnabled ? ok : err} />

      {/* Agents */}
      <AnimatePresence>
        {form.agentsEnabled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FlowNode
              icon={Users}
              label="Agents"
              active={hasAgents}
              iconAccent={iconAccents.agents}
              detail={
                hasAgents
                  ? `${form.agents.length} agent${form.agents.length > 1 ? "s" : ""} (${form.agents.filter((a) => a.status === "accepted").length} accepted)`
                  : "Invite agents"
              }
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Summary */}
      <div className="mt-4 pt-3 border-t border-[var(--titan-card-border)]">
        <div className="grid grid-cols-3 gap-2">
          {[
            {
              label: "Sources",
              val: [
                form.mcpEnabled && form.mcpConnections.length,
                form.apiEnabled && form.apiEndpoints.length,
                form.ragEnabled && form.ragFiles.length,
              ]
                .filter(Boolean)
                .reduce((a, b) => a + b, 0),
            },
            { label: "Model", val: hasModel ? "Set" : "—" },
            {
              label: "Agents",
              val: form.agentsEnabled ? form.agents.length : "Off",
            },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-[14px] font-bold text-[var(--titan-primary)]">
                {s.val}
              </p>
              <p className="text-[10px] text-[var(--titan-text-muted)] uppercase tracking-wider">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LivePreviewPanel;
