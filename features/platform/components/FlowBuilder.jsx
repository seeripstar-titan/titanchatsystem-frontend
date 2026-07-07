import React, { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, Reorder } from "framer-motion";
import {
  GripVertical,
  X,
  ArrowDown,
  Workflow,
  Plus,
  Trash2,
} from "lucide-react";

const methodColors = {
  GET: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
  POST: "text-blue-500 bg-blue-500/10 border-blue-500/20",
  PUT: "text-amber-500 bg-amber-500/10 border-amber-500/20",
  PATCH: "text-orange-500 bg-orange-500/10 border-orange-500/20",
  DELETE: "text-rose-500 bg-rose-500/10 border-rose-500/20",
};

const FlowBuilder = ({ endpoints, flow, onFlowChange }) => {
  const [dragOverIdx, setDragOverIdx] = useState(null);

  // Add endpoint to flow
  const addToFlow = (ep) => {
    if (flow.some((f) => f.id === ep.id)) return; // prevent duplicates
    onFlowChange([...flow, { ...ep }]);
  };

  // Remove from flow
  const removeFromFlow = (id) => {
    onFlowChange(flow.filter((f) => f.id !== id));
  };

  // Handle native drag from source list
  const handleDragStart = (e, ep) => {
    e.dataTransfer.setData("application/json", JSON.stringify(ep));
    e.dataTransfer.effectAllowed = "copy";
  };

  const handleDragOver = (e, idx) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
    setDragOverIdx(idx);
  };

  const handleDropOnZone = (e) => {
    e.preventDefault();
    setDragOverIdx(null);
    try {
      const ep = JSON.parse(e.dataTransfer.getData("application/json"));
      if (ep?.id && !flow.some((f) => f.id === ep.id)) {
        onFlowChange([...flow, { ...ep }]);
      }
    } catch {}
  };

  const handleDropBetween = (e, idx) => {
    e.preventDefault();
    setDragOverIdx(null);
    try {
      const ep = JSON.parse(e.dataTransfer.getData("application/json"));
      if (ep?.id && !flow.some((f) => f.id === ep.id)) {
        const next = [...flow];
        next.splice(idx, 0, { ...ep });
        onFlowChange(next);
      }
    } catch {}
  };

  // Move within flow
  const moveItem = (fromIdx, toIdx) => {
    if (fromIdx === toIdx) return;
    const next = [...flow];
    const [item] = next.splice(fromIdx, 1);
    next.splice(toIdx, 0, item);
    onFlowChange(next);
  };

  const availableEndpoints = endpoints.filter(
    (ep) => !flow.some((f) => f.id === ep.id),
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center gap-2 px-1">
        <Workflow size={13} className="text-[var(--titan-text-muted)]" />
        <span className="text-[11px] text-[var(--titan-text-muted)]">
          Drag APIs from the pool into the flow to define the execution order
          for your bot.
        </span>
      </div>

      <div className="flex gap-4 min-h-[200px]">
        {/* Source pool */}
        <div className="w-[180px] shrink-0 flex flex-col gap-1.5">
          <p className="text-[10px] font-semibold text-[var(--titan-text-muted)] uppercase tracking-wider mb-1 px-1">
            Available APIs
          </p>
          {availableEndpoints.length === 0 && (
            <p className="text-[11px] text-[var(--titan-text-muted)] italic px-1">
              {endpoints.length === 0
                ? "No APIs added yet."
                : "All APIs are in the flow."}
            </p>
          )}
          {availableEndpoints.map((ep) => (
            <div
              key={ep.id}
              draggable
              onDragStart={(e) => handleDragStart(e, ep)}
              onClick={() => addToFlow(ep)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)] cursor-grab active:cursor-grabbing hover:border-[var(--titan-border-hover)] transition-colors select-none"
            >
              <span
                className={`px-1.5 py-0.5 rounded text-[9px] font-bold leading-none ${methodColors[ep.method] || "text-gray-500 bg-gray-500/10"}`}
              >
                {ep.method}
              </span>
              <span className="text-[12px] text-[var(--titan-primary)] truncate flex-1">
                {ep.name}
              </span>
              <Plus
                size={12}
                className="text-[var(--titan-text-muted)] shrink-0"
              />
            </div>
          ))}
        </div>

        {/* Flow canvas */}
        <div
          className={`flex-1 rounded-xl border-2 border-dashed transition-colors duration-200 p-3 flex flex-col items-center gap-0 min-h-[200px] ${
            dragOverIdx === "zone"
              ? "border-[var(--titan-primary)] bg-[var(--titan-primary)]/5"
              : "border-[var(--titan-card-border)]"
          }`}
          onDragOver={(e) => handleDragOver(e, "zone")}
          onDragLeave={() => setDragOverIdx(null)}
          onDrop={handleDropOnZone}
        >
          {flow.length === 0 && (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center animate-pulse">
              <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-[var(--titan-card-border)] flex items-center justify-center">
                <Workflow
                  size={28}
                  className="text-[var(--titan-text-muted)]"
                  strokeWidth={1}
                />
              </div>
              <p className="text-[13px] font-medium text-[var(--titan-text-muted)]">
                Drop APIs here to build the flow
              </p>
              <p className="text-[11px] text-[var(--titan-text-muted)]">
                or click an API from the pool on the left
              </p>
            </div>
          )}

          {flow.map((item, idx) => (
            <React.Fragment key={item.id}>
              {/* Drop target between items */}
              {idx > 0 && (
                <div
                  className={`w-full flex justify-center py-0.5 transition-all ${
                    dragOverIdx === idx ? "py-2" : ""
                  }`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setDragOverIdx(idx);
                  }}
                  onDragLeave={(e) => {
                    e.stopPropagation();
                    setDragOverIdx(null);
                  }}
                  onDrop={(e) => {
                    e.stopPropagation();
                    handleDropBetween(e, idx);
                  }}
                >
                  <ArrowDown
                    size={14}
                    className={`transition-colors ${dragOverIdx === idx ? "text-[var(--titan-primary)]" : "text-[var(--titan-card-border)]"}`}
                  />
                </div>
              )}

              {/* Flow node */}
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData("text/plain", String(idx));
                  e.dataTransfer.effectAllowed = "move";
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                onDrop={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  const fromIdx = parseInt(
                    e.dataTransfer.getData("text/plain"),
                    10,
                  );
                  if (!isNaN(fromIdx)) moveItem(fromIdx, idx);
                }}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)] backdrop-blur-sm cursor-grab active:cursor-grabbing group"
              >
                <GripVertical
                  size={14}
                  className="text-[var(--titan-card-border)] group-hover:text-[var(--titan-text-muted)] shrink-0 transition-colors"
                />
                <span className="text-[10px] font-bold text-[var(--titan-text-muted)] w-12 text-center shrink-0">
                  Step {idx + 1}
                </span>
                <span
                  className={`px-1.5 py-0.5 rounded text-[9px] font-bold leading-none shrink-0 ${methodColors[item.method] || "text-gray-500 bg-gray-500/10"}`}
                >
                  {item.method}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[12px] font-medium text-[var(--titan-primary)] truncate">
                    {item.name}
                  </p>
                  <p className="text-[10px] text-[var(--titan-text-muted)] truncate font-mono">
                    {item.url}
                  </p>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => removeFromFlow(item.id)}
                  className="w-5 h-5 flex items-center justify-center rounded hover:bg-[var(--titan-hover)] text-[var(--titan-text-muted)] hover:text-[var(--titan-danger)] opacity-0 group-hover:opacity-100 transition-all cursor-pointer shrink-0"
                >
                  <X size={11} />
                </motion.button>
              </motion.div>
            </React.Fragment>
          ))}

          {flow.length > 0 && (
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => onFlowChange([])}
              className="mt-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium text-[var(--titan-text-muted)] hover:text-[var(--titan-danger)] hover:bg-[var(--titan-hover)] transition-colors cursor-pointer"
            >
              <Trash2 size={11} /> Clear Flow
            </motion.button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlowBuilder;
