import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Bot,
  Database,
  FileText,
  Cpu,
  Users,
  Globe,
  Send,
  ChevronLeft,
  ChevronRight,
  Shield,
  Check,
  Headphones,
  Landmark,
  TrendingUp,
  UserCheck,
  Monitor,
  ShoppingCart,
  Heart,
  GraduationCap,
  Settings,
  Code,
} from "lucide-react";
import { InputGroup } from "../../../shared/ui";
import { botTypes } from "../data/developMockData";
import McpSection from "./McpSection";
import RagSection from "./RagSection";
import OrchestratorSection from "./OrchestratorSection";
import AgentsSection from "./AgentsSection";
import ApiSection from "./ApiSection";
import LivePreviewPanel from "./LivePreviewPanel";

const sectionDefs = [
  { id: "identity", label: "Bot Identity", icon: Bot, alwaysOn: true },
  { id: "mcp", label: "MCP", icon: Database, toggleable: true },
  { id: "api", label: "API", icon: Globe, toggleable: true },
  { id: "rag", label: "RAG", icon: FileText, toggleable: true },
  { id: "orchestrator", label: "Orchestrator", icon: Cpu, alwaysOn: true },
  { id: "agents", label: "Agents", icon: Users, toggleable: true },
];

// Pastel accent for each step
const stepAccents = {
  identity: "#7C8FD4",
  mcp: "#6BAF8D",
  api: "#7EAED4",
  rag: "#D4A574",
  orchestrator: "#A07CC8",
  agents: "#D47C94",
};

const deploymentPlatforms = [
  {
    id: "website",
    label: "Website",
    color: "#7C8FD4",
    icon: Globe,
    logo: null,
  },
  {
    id: "teams",
    label: "Teams",
    color: "#6BAF8D",
    icon: null,
    logo: "/assets/teams.webp",
  },
  { id: "api", label: "API", color: "#7EAED4", icon: Code, logo: null },
];

const botTypeIcons = {
  "customer-support": Headphones,
  finance: Landmark,
  sales: TrendingUp,
  hr: UserCheck,
  "it-helpdesk": Monitor,
  ecommerce: ShoppingCart,
  healthcare: Heart,
  education: GraduationCap,
  custom: Settings,
};

const defaultState = () => ({
  name: "",
  type: "",
  customType: "",
  deploymentPlatform: "",
  dataRetention: 90,
  mcpEnabled: false,
  mcpConnections: [],
  apiEnabled: false,
  apiEndpoints: [],
  ragEnabled: false,
  ragFiles: [],
  model: "",
  prompt: "",
  gateway: { clientId: "", clientSecret: "", tenantId: "" },
  agentsEnabled: false,
  agents: [],
});

const fromBot = (bot) => ({
  name: bot.name || "",
  type: bot.type || "",
  customType: bot.customType || "",
  deploymentPlatform: bot.deploymentPlatform || "",
  dataRetention: bot.dataRetention || 90,
  mcpEnabled: bot.mcpConnections?.length > 0 || false,
  mcpConnections: bot.mcpConnections || [],
  apiEnabled: bot.apiEndpoints?.length > 0 || false,
  apiEndpoints: bot.apiEndpoints || [],
  ragEnabled: bot.ragEnabled || false,
  ragFiles: bot.ragFiles || [],
  model: bot.model || "",
  prompt: bot.prompt || "",
  gateway: bot.gateway || { clientId: "", clientSecret: "", tenantId: "" },
  agentsEnabled: bot.agents?.length > 0 || false,
  agents: bot.agents || [],
});

const BotConfigWizard = ({ mode, initialData, onBack, onSubmit }) => {
  const [form, setForm] = useState(
    initialData ? fromBot(initialData) : defaultState(),
  );
  const [activeStep, setActiveStep] = useState(0);

  const update = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const toggleKeys = {
    mcp: "mcpEnabled",
    api: "apiEnabled",
    rag: "ragEnabled",
    agents: "agentsEnabled",
  };

  const isSectionEnabled = (id) => {
    const key = toggleKeys[id];
    return key ? form[key] : true;
  };

  const handleToggle = (id, e) => {
    e.stopPropagation();
    const key = toggleKeys[id];
    if (key) update(key, !form[key]);
  };

  const currentSection = sectionDefs[activeStep];
  const accent = stepAccents[currentSection.id];

  const isStepConfigured = (id) => {
    switch (id) {
      case "identity":
        return !!(form.name && form.type);
      case "mcp":
        return !form.mcpEnabled || form.mcpConnections.length > 0;
      case "api":
        return !form.apiEnabled || form.apiEndpoints.length > 0;
      case "rag":
        return !form.ragEnabled || form.ragFiles.length > 0;
      case "orchestrator":
        return !!(form.model && form.gateway.clientId);
      case "agents":
        return !form.agentsEnabled || form.agents.length > 0;
      default:
        return false;
    }
  };

  const renderSectionContent = (id) => {
    switch (id) {
      case "identity":
        return (
          <div className="flex flex-col gap-5">
            <InputGroup
              label="Bot Name"
              id="bot-name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              placeholder="e.g. Support Bot Alpha"
              required
            />
            <div>
              <label className="block text-[13px] font-medium text-[var(--titan-primary)] mb-2.5">
                Bot Type
              </label>
              <div className="flex flex-wrap gap-2">
                {botTypes.map((bt) => {
                  const isSelected = form.type === bt.id;
                  const BtIcon = botTypeIcons[bt.id];
                  return (
                    <motion.button
                      key={bt.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        update("type", bt.id);
                        if (bt.id !== "custom") update("customType", "");
                      }}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-semibold border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "border-transparent"
                          : "border-[var(--titan-card-border)] text-[var(--titan-primary)] hover:border-[var(--titan-border-hover)]"
                      }`}
                      style={
                        isSelected
                          ? {
                              backgroundColor: `${bt.color}20`,
                              color: bt.color,
                              borderColor: `${bt.color}40`,
                            }
                          : {}
                      }
                    >
                      {BtIcon && <BtIcon size={13} />}
                      {bt.label}
                    </motion.button>
                  );
                })}
              </div>
              <AnimatePresence>
                {form.type === "custom" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3">
                      <InputGroup
                        label="Custom Type"
                        id="custom-type"
                        value={form.customType}
                        onChange={(e) => update("customType", e.target.value)}
                        placeholder="e.g. Legal, Travel"
                        required
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Deployment Platform */}
            <div>
              <label className="block text-[13px] font-medium text-[var(--titan-primary)] mb-2.5">
                Deployment Platform
              </label>
              <div className="flex flex-wrap gap-2">
                {deploymentPlatforms.map((dp) => {
                  const isSelected = form.deploymentPlatform === dp.id;
                  const DpIcon = dp.icon;
                  return (
                    <motion.button
                      key={dp.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => update("deploymentPlatform", dp.id)}
                      className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[13px] font-semibold border transition-all duration-200 cursor-pointer ${
                        isSelected
                          ? "border-transparent"
                          : "border-[var(--titan-card-border)] text-[var(--titan-primary)] hover:border-[var(--titan-border-hover)]"
                      }`}
                      style={
                        isSelected
                          ? {
                              backgroundColor: `${dp.color}20`,
                              color: dp.color,
                              borderColor: `${dp.color}40`,
                            }
                          : {}
                      }
                    >
                      {dp.logo ? (
                        <img
                          src={dp.logo}
                          alt={dp.label}
                          className="w-4 h-4 object-contain rounded-sm"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      ) : DpIcon ? (
                        <DpIcon size={13} />
                      ) : null}
                      {dp.label}
                    </motion.button>
                  );
                })}
              </div>
              <p className="text-[11px] text-[var(--titan-text-muted)] mt-1.5 px-1">
                Choose where this bot will be deployed. You can change this
                later to generate different integration code.
              </p>
            </div>
            {/* Data Retention Policy */}
            <div>
              <label className="flex items-center gap-2 text-[13px] font-medium text-[var(--titan-primary)] mb-2.5">
                <Shield size={14} className="text-[var(--titan-text-muted)]" />
                Data Retention Policy
              </label>
              <select
                value={form.dataRetention}
                onChange={(e) =>
                  update("dataRetention", Number(e.target.value))
                }
                className="w-full px-4 py-2.5 rounded-full border border-[var(--titan-input-border)] bg-[var(--titan-input-bg)] text-[var(--titan-primary)] text-[13px] outline-none focus:ring-2 focus:ring-[var(--titan-primary)]/20 transition-all duration-200 cursor-pointer appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 14px center",
                }}
              >
                {[30, 60, 90, 120, 150, 180].map((d) => (
                  <option key={d} value={d}>
                    {d} days{d === 90 ? " (default)" : ""}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-[var(--titan-text-muted)] mt-1.5 px-1">
                Chat logs and session data will be automatically purged after
                this period.
              </p>
            </div>
          </div>
        );
      case "mcp":
        return (
          <McpSection
            connections={form.mcpConnections}
            onChange={(v) => update("mcpConnections", v)}
          />
        );
      case "api":
        return (
          <ApiSection
            endpoints={form.apiEndpoints}
            onChange={(v) => update("apiEndpoints", v)}
          />
        );
      case "rag":
        return (
          <RagSection
            enabled={form.ragEnabled}
            onToggle={(v) => update("ragEnabled", v)}
            files={form.ragFiles}
            onFilesChange={(v) => update("ragFiles", v)}
          />
        );
      case "orchestrator":
        return (
          <OrchestratorSection
            selectedModel={form.model}
            onModelChange={(v) => update("model", v)}
            gateway={form.gateway}
            onGatewayChange={(v) => update("gateway", v)}
            prompt={form.prompt}
            onPromptChange={(v) => update("prompt", v)}
            apiEndpoints={form.apiEnabled ? form.apiEndpoints : []}
          />
        );
      case "agents":
        return (
          <AgentsSection
            agents={form.agents}
            onChange={(v) => update("agents", v)}
          />
        );
      default:
        return null;
    }
  };

  const isFormValid =
    form.name && form.type && (form.type !== "custom" || form.customType);

  return (
    <div className="flex flex-col gap-3 h-full min-h-0">
      {/* Header */}
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <motion.button
            onClick={onBack}
            whileHover={{ x: -3, scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-transparent hover:border-[var(--titan-card-border)] hover:bg-[var(--titan-hover)] text-[var(--titan-text-muted)] hover:text-[var(--titan-primary)] transition-all cursor-pointer"
          >
            <ArrowLeft size={15} />
            <span className="text-sm font-medium">Back</span>
          </motion.button>
          <div>
            <h2 className="text-xl font-bold text-[var(--titan-primary)] tracking-tight">
              {mode === "create" ? "New Bot" : initialData?.name || "Edit Bot"}
            </h2>
            <p className="text-[13px] text-[var(--titan-text-muted)]">
              {mode === "create"
                ? "Configure your bot pipeline"
                : "Modify configuration"}
            </p>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onSubmit(form)}
          disabled={!isFormValid}
          className="flex items-center gap-1.5 px-5 py-2 rounded-full text-[14px] font-semibold bg-[var(--titan-primary)] text-[var(--titan-bg)] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send size={13} />
          {mode === "create" ? "Create" : "Save"}
        </motion.button>
      </div>

      {/* Step indicators */}
      <div className="flex items-center shrink-0 px-1 relative">
        {/* Progress track behind tabs */}
        <div className="absolute inset-x-1 top-1/2 h-px bg-[var(--titan-card-border)] -translate-y-1/2 z-0 opacity-30" />
        <div className="flex items-center gap-0.5 w-full relative z-10">
          {sectionDefs.map((section, idx) => {
            const SIcon = section.icon;
            const isActive = idx === activeStep;
            const stepColor = stepAccents[section.id];
            const configured = isStepConfigured(section.id);
            const enabled = isSectionEnabled(section.id);
            return (
              <React.Fragment key={section.id}>
                {idx > 0 && (
                  <div
                    className="flex-1 h-px min-w-[8px] opacity-30"
                    style={{
                      background: isStepConfigured(sectionDefs[idx - 1].id)
                        ? stepAccents[sectionDefs[idx - 1].id]
                        : "var(--titan-card-border)",
                      opacity: isStepConfigured(sectionDefs[idx - 1].id)
                        ? 0.5
                        : 1,
                    }}
                  />
                )}
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setActiveStep(idx)}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 text-[12px] font-semibold transition-all duration-200 cursor-pointer border rounded-lg ${
                    isActive
                      ? "shadow-sm"
                      : enabled
                        ? "hover:bg-[var(--titan-hover)] opacity-70 hover:opacity-100"
                        : "opacity-35 hover:opacity-50"
                  }`}
                  style={
                    isActive
                      ? {
                          backgroundColor: stepColor,
                          color: "#fff",
                          borderColor: stepColor,
                          boxShadow: `0 2px 8px ${stepColor}40`,
                        }
                      : {
                          borderColor: configured
                            ? `${stepColor}40`
                            : "var(--titan-card-border)",
                          backgroundColor: configured
                            ? `${stepColor}08`
                            : "var(--titan-glass-bg)",
                        }
                  }
                >
                  {configured && !isActive ? (
                    <Check
                      size={11}
                      style={{ color: stepColor }}
                      strokeWidth={3}
                    />
                  ) : (
                    <SIcon size={12} />
                  )}
                  <span className="hidden sm:inline">{section.label}</span>
                  <span className="sm:hidden">{idx + 1}</span>
                </motion.button>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Main: step content left + preview right */}
      <div className="flex-1 min-h-0 flex gap-4">
        {/* Left — single step container */}
        <div className="flex-1 min-w-0 overflow-y-auto custom-scrollbar pr-1 pb-2 flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSection.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex-1 flex flex-col"
            >
              <div
                className="rounded-2xl border bg-[var(--titan-glass-bg)] backdrop-blur-xl overflow-hidden flex flex-col flex-1"
                style={{
                  boxShadow:
                    "0 2px 8px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.04)",
                  borderColor: `${accent}30`,
                  WebkitBackdropFilter: "blur(28px) saturate(185%)",
                  backdropFilter: "blur(28px) saturate(185%)",
                }}
              >
                {/* Section header */}
                <div
                  className="flex items-center justify-between px-5 py-3.5 border-b"
                  style={{ borderColor: `${accent}15` }}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: `${accent}15`,
                        border: `1px solid ${accent}25`,
                      }}
                    >
                      <currentSection.icon
                        size={15}
                        style={{ color: accent }}
                      />
                    </div>
                    <div>
                      <span className="text-[14px] font-bold text-[var(--titan-primary)]">
                        {currentSection.label}
                      </span>
                      <span className="text-[12px] text-[var(--titan-text-muted)] ml-2">
                        Step {activeStep + 1} of {sectionDefs.length}
                      </span>
                    </div>
                  </div>
                  {currentSection.toggleable && (
                    <button
                      onClick={(e) => handleToggle(currentSection.id, e)}
                      className={`relative w-9 h-5 rounded-full transition-colors duration-200 cursor-pointer shrink-0 ${
                        isSectionEnabled(currentSection.id)
                          ? ""
                          : "bg-[var(--titan-card-border)]"
                      }`}
                      style={
                        isSectionEnabled(currentSection.id)
                          ? { backgroundColor: accent }
                          : {}
                      }
                    >
                      <motion.div
                        animate={{
                          x: isSectionEnabled(currentSection.id) ? 16 : 2,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                        className="absolute top-[3px] w-[14px] h-[14px] rounded-full bg-[var(--titan-bg)]"
                      />
                    </button>
                  )}
                </div>

                {/* Section content */}
                <div className="flex-1 overflow-y-auto custom-scrollbar px-5 py-4">
                  {isSectionEnabled(currentSection.id) ? (
                    renderSectionContent(currentSection.id)
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-[13px] text-[var(--titan-text-muted)]">
                        {currentSection.label} is disabled. Toggle it on to
                        configure.
                      </p>
                    </div>
                  )}
                </div>

                {/* Navigation footer */}
                <div className="flex items-center justify-between px-5 py-3 border-t border-[var(--titan-card-border)] shrink-0">
                  <motion.button
                    onClick={() => setActiveStep((s) => Math.max(0, s - 1))}
                    disabled={activeStep === 0}
                    whileHover={
                      activeStep > 0
                        ? {
                            scale: 1.05,
                            backgroundColor: "rgba(248,113,113,0.12)",
                          }
                        : {}
                    }
                    whileTap={activeStep > 0 ? { scale: 0.95 } : {}}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold border border-[var(--titan-card-border)] text-[var(--titan-text-muted)] hover:text-red-400 hover:border-red-400/40 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    <ChevronLeft size={13} />
                    Previous
                  </motion.button>
                  <div className="flex gap-1.5">
                    {sectionDefs.map((_, idx) => (
                      <div
                        key={idx}
                        className="w-2 h-2 rounded-full transition-colors duration-200"
                        style={{
                          backgroundColor:
                            idx === activeStep
                              ? accent
                              : "var(--titan-card-border)",
                        }}
                      />
                    ))}
                  </div>
                  <motion.button
                    onClick={() =>
                      setActiveStep((s) =>
                        Math.min(sectionDefs.length - 1, s + 1),
                      )
                    }
                    disabled={activeStep === sectionDefs.length - 1}
                    whileHover={
                      activeStep < sectionDefs.length - 1
                        ? {
                            scale: 1.05,
                            backgroundColor: "rgba(52,211,153,0.12)",
                          }
                        : {}
                    }
                    whileTap={
                      activeStep < sectionDefs.length - 1 ? { scale: 0.95 } : {}
                    }
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold border border-[var(--titan-card-border)] text-[var(--titan-text-muted)] hover:text-emerald-400 hover:border-emerald-400/40 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
                  >
                    Next
                    <ChevronRight size={13} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right — larger live preview / flow chart */}
        <div className="hidden lg:block w-[440px] shrink-0">
          <div
            className="sticky top-0 rounded-2xl border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)] backdrop-blur-xl p-5 overflow-y-auto custom-scrollbar"
            style={{
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.04)",
              maxHeight: "calc(100vh - 12rem)",
              WebkitBackdropFilter: "blur(28px) saturate(185%)",
              backdropFilter: "blur(28px) saturate(185%)",
            }}
          >
            <LivePreviewPanel form={form} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BotConfigWizard;
