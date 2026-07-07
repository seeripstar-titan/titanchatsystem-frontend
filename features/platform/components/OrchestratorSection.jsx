import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { InputGroup, TextArea } from "../../../shared/ui";
import { modelProviders, availableModels } from "../data/developMockData";
import { ChevronDown, Check, GripVertical } from "lucide-react";

const methodColors = {
  GET: "text-emerald-500 bg-emerald-500/10",
  POST: "text-blue-500 bg-blue-500/10",
  PUT: "text-amber-500 bg-amber-500/10",
  PATCH: "text-orange-500 bg-orange-500/10",
  DELETE: "text-rose-500 bg-rose-500/10",
};

const OrchestratorSection = ({
  selectedModel,
  onModelChange,
  gateway,
  onGatewayChange,
  prompt,
  onPromptChange,
  apiEndpoints = [],
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const promptRef = useRef(null);

  const updateGateway = (field, value) => {
    onGatewayChange({ ...gateway, [field]: value });
  };

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selectedInfo = availableModels.find((m) => m.id === selectedModel);
  const selectedProvider = selectedInfo
    ? modelProviders.find((p) => p.provider === selectedInfo.provider)
    : null;

  // Insert API reference into prompt
  const insertApiRef = (ep) => {
    const ref = `{{api:${ep.name}}}`;
    const textarea = promptRef.current?.querySelector("textarea");
    if (textarea) {
      const start = textarea.selectionStart;
      const before = prompt.slice(0, start);
      const after = prompt.slice(textarea.selectionEnd);
      onPromptChange(before + ref + after);
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + ref.length, start + ref.length);
      }, 0);
    } else {
      onPromptChange(prompt + ref);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Model Selection — Grouped Dropdown */}
      <div>
        <label className="block text-[12px] font-medium text-[var(--titan-primary)] mb-1.5">
          Select Model
        </label>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl border border-[var(--titan-input-border)] bg-[var(--titan-input-bg)] text-sm text-[var(--titan-primary)] outline-none cursor-pointer transition-all duration-200 hover:border-[var(--titan-border-hover)] focus:ring-2 focus:ring-[var(--titan-primary)]/20"
            style={{ boxShadow: "var(--titan-neo-inset)" }}
          >
            {selectedInfo ? (
              <div className="flex items-center gap-2.5">
                {selectedProvider && (
                  <img
                    src={selectedProvider.logo}
                    alt={selectedProvider.provider}
                    className="w-4 h-4 object-contain rounded-sm"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                )}
                <span className="font-medium">{selectedInfo.label}</span>
              </div>
            ) : (
              <span className="text-[var(--titan-text-muted)]">
                Choose a model...
              </span>
            )}
            <motion.div
              animate={{ rotate: dropdownOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown
                size={16}
                className="text-[var(--titan-text-muted)]"
              />
            </motion.div>
          </button>

          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.98 }}
                transition={{ duration: 0.15 }}
                className="absolute z-50 w-full mt-1 rounded-lg border border-[var(--titan-card-border)] bg-[var(--titan-bg)] py-1"
                style={{
                  boxShadow:
                    "0 6px 20px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)",
                }}
              >
                {modelProviders.map((group, gi) => (
                  <div key={group.provider}>
                    {gi > 0 && (
                      <div className="h-px mx-2 my-1 bg-[var(--titan-card-border)]" />
                    )}
                    {/* Provider header */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 sticky top-0 bg-[var(--titan-bg)] z-10">
                      <img
                        src={group.logo}
                        alt={group.provider}
                        className="w-3.5 h-3.5 object-contain rounded-sm"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                      <span className="text-[10px] font-semibold text-[var(--titan-text-muted)]">
                        {group.provider}
                      </span>
                    </div>
                    {/* Models */}
                    {group.models.map((model) => {
                      const isSelected = selectedModel === model.id;
                      return (
                        <button
                          key={model.id}
                          onClick={() => {
                            onModelChange(model.id);
                            setDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-[5px] mx-1 rounded-md text-left text-[12px] transition-colors cursor-pointer ${
                            isSelected
                              ? "bg-[var(--titan-primary)] text-[var(--titan-bg)] font-medium"
                              : "text-[var(--titan-primary)] hover:bg-[var(--titan-hover)]"
                          }`}
                          style={{ width: "calc(100% - 8px)" }}
                        >
                          <span>{model.label}</span>
                          {isSelected && <Check size={12} />}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* System Prompt */}
      <div ref={promptRef}>
        <label
          htmlFor="system-prompt"
          className="block text-[12px] font-medium text-[var(--titan-primary)] mb-1"
        >
          System Prompt
        </label>
        <p className="text-[11px] text-[var(--titan-text-muted)] mb-1.5">
          Define the bot&apos;s personality and behaviour. Click an API below to
          insert it as a reference.
        </p>

        {/* Draggable API tags */}
        {apiEndpoints.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-2">
            {apiEndpoints.map((ep) => (
              <button
                key={ep.id}
                onClick={() => insertApiRef(ep)}
                className="flex items-center gap-1 px-2 py-0.5 rounded-md border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)] text-[10px] font-medium text-[var(--titan-primary)] hover:border-[var(--titan-border-hover)] hover:bg-[var(--titan-hover)] transition-colors cursor-pointer"
              >
                <GripVertical
                  size={9}
                  className="text-[var(--titan-text-muted)]"
                />
                <span className={`font-bold ${methodColors[ep.method] || ""}`}>
                  {ep.method}
                </span>
                <span className="truncate max-w-[80px]">{ep.name}</span>
              </button>
            ))}
          </div>
        )}

        <TextArea
          id="system-prompt"
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          placeholder="You are a helpful customer support assistant..."
          rows={3}
        />
      </div>

      {/* AI Gateway Credentials */}
      <div>
        <label className="block text-[12px] font-medium text-[var(--titan-primary)] mb-1.5">
          AI Gateway Credentials
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <InputGroup
            label="Client ID"
            id="gateway-client-id"
            value={gateway.clientId}
            onChange={(e) => updateGateway("clientId", e.target.value)}
            placeholder="Enter client ID"
          />
          <InputGroup
            label="Client Secret"
            id="gateway-client-secret"
            type="password"
            value={gateway.clientSecret}
            onChange={(e) => updateGateway("clientSecret", e.target.value)}
            placeholder="Enter client secret"
          />
          <InputGroup
            label="Tenant ID"
            id="gateway-tenant-id"
            value={gateway.tenantId}
            onChange={(e) => updateGateway("tenantId", e.target.value)}
            placeholder="Enter tenant ID"
          />
        </div>
      </div>
    </div>
  );
};

export default OrchestratorSection;
