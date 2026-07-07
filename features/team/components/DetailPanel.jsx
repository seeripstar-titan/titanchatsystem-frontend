import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Users,
  MessageSquare,
  Clock,
  Shield,
  Mail,
  BarChart3,
  Circle,
  UserPlus,
  UserMinus,
  RotateCcw,
  Trash2,
} from "lucide-react";

const statusConfig = {
  active: { color: "bg-emerald-500", label: "Active" },
  offline: { color: "bg-gray-500", label: "Offline" },
  "accepting-chats": { color: "bg-blue-500", label: "Accepting Chats" },
  suspended: { color: "bg-red-500", label: "Suspended" },
  enabled: { color: "bg-emerald-500", label: "Enabled" },
  disabled: { color: "bg-gray-500", label: "Disabled" },
};

const DetailPanel = ({
  item,
  type,
  onClose,
  onEditMembers,
  onUnsuspend,
  onDeleteAgent,
}) => {
  if (!item) return null;

  const renderAgentDetails = () => (
    <>
      <DetailSection title="Agent Info">
        <DetailRow label="Name" value={item.name} />
        <DetailRow label="Email" value={item.email} />
        <DetailRow label="Role" value={item.role} />
        <DetailRow
          label="Status"
          value={<StatusBadge status={item.status} />}
        />
        <DetailRow label="Last Seen" value={item.lastSeen} />
      </DetailSection>

      <DetailSection title="Groups">
        <div className="flex flex-wrap gap-2">
          {item.groups?.length > 0 ? (
            item.groups.map((group, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-xs rounded-lg bg-[var(--titan-glass-bg)] border border-[var(--titan-card-border)] text-[var(--titan-text-secondary)]"
              >
                {group}
              </span>
            ))
          ) : (
            <span className="text-xs text-[var(--titan-text-muted)]">
              No groups assigned
            </span>
          )}
        </div>
      </DetailSection>

      <DetailSection title="Performance">
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={MessageSquare}
            label="Accepted Chats"
            value={item.performance?.acceptedChats ?? 0}
          />
          <StatCard
            icon={BarChart3}
            label="Resolved"
            value={item.performance?.resolvedChats ?? 0}
          />
          <StatCard
            icon={Clock}
            label="Avg Response"
            value={item.performance?.avgResponseTime ?? "—"}
          />
          <StatCard
            icon={Users}
            label="Chat Limit"
            value={item.chatLimit ?? "—"}
          />
        </div>
      </DetailSection>
    </>
  );

  const renderChatbotDetails = () => (
    <>
      <DetailSection title="Chatbot Info">
        <DetailRow label="Name" value={item.name} />
        <DetailRow label="Type" value={item.type} />
        <DetailRow
          label="Status"
          value={<StatusBadge status={item.status} />}
        />
        <DetailRow label="Created" value={item.createdAt} />
      </DetailSection>

      <DetailSection title="Assigned Groups">
        <div className="flex flex-wrap gap-2">
          {item.groups?.length > 0 ? (
            item.groups.map((group, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-xs rounded-lg bg-[var(--titan-glass-bg)] border border-[var(--titan-card-border)] text-[var(--titan-text-secondary)]"
              >
                {group}
              </span>
            ))
          ) : (
            <span className="text-xs text-[var(--titan-text-muted)]">
              No groups assigned
            </span>
          )}
        </div>
      </DetailSection>

      <DetailSection title="Performance">
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={MessageSquare}
            label="Total Chats"
            value={item.performance?.totalChats ?? 0}
          />
          <StatCard
            icon={BarChart3}
            label="Resolved"
            value={item.performance?.resolvedChats ?? 0}
          />
          <StatCard
            icon={Clock}
            label="Avg Response"
            value={item.performance?.avgResponseTime ?? "—"}
          />
          <StatCard
            icon={Users}
            label="Handoffs"
            value={item.performance?.handoffs ?? 0}
          />
        </div>
      </DetailSection>
    </>
  );

  const renderGroupDetails = () => (
    <>
      <DetailSection title="Group Info">
        <DetailRow label="Name" value={item.name} />
        <DetailRow label="Description" value={item.description} />
        <DetailRow label="Created" value={item.createdAt} />
      </DetailSection>

      <DetailSection
        title="Members"
        action={
          <button
            onClick={() => onEditMembers?.(item)}
            className="flex items-center gap-1 px-2 py-1 text-[10px] font-medium rounded-lg bg-[var(--titan-primary)]/10 text-[var(--titan-primary)] hover:bg-[var(--titan-primary)]/20 transition-colors"
          >
            <UserPlus className="w-3 h-3" />
            Edit
          </button>
        }
      >
        <div className="space-y-2">
          {item.members?.length > 0 ? (
            item.members.map((member, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-3 py-2 rounded-xl bg-[var(--titan-glass-bg)] border border-[var(--titan-card-border)] group hover:border-[var(--titan-border-hover)] transition-colors"
              >
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[var(--titan-primary)] flex items-center justify-center text-xs font-medium text-[var(--titan-bg)]">
                    {member.name?.[0]}
                  </div>
                  <span className="text-sm text-[var(--titan-text-secondary)]">
                    {member.name}
                  </span>
                </div>
                <span className="text-xs text-[var(--titan-text-muted)]">
                  {member.role}
                </span>
              </div>
            ))
          ) : (
            <span className="text-xs text-[var(--titan-text-muted)]">
              No members
            </span>
          )}
        </div>
      </DetailSection>

      <DetailSection title="Stats">
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={Users}
            label="Members"
            value={item.members?.length ?? 0}
          />
          <StatCard
            icon={MessageSquare}
            label="Active Chats"
            value={item.activeChats ?? 0}
          />
        </div>
      </DetailSection>
    </>
  );

  const renderSuspendedDetails = () => (
    <>
      <DetailSection title="Agent Info">
        <DetailRow label="Name" value={item.name} />
        <DetailRow label="Email" value={item.email} />
        <DetailRow label="Role" value={item.role} />
        <DetailRow label="Status" value={<StatusBadge status="suspended" />} />
        <DetailRow label="Suspended On" value={item.suspendedAt} />
        <DetailRow label="Reason" value={item.suspendReason} />
      </DetailSection>

      <DetailSection title="Last Performance">
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            icon={MessageSquare}
            label="Total Chats"
            value={item.performance?.acceptedChats ?? 0}
          />
          <StatCard
            icon={BarChart3}
            label="Resolved"
            value={item.performance?.resolvedChats ?? 0}
          />
        </div>
      </DetailSection>

      <DetailSection title="Actions">
        <div className="flex gap-2">
          <button
            onClick={() => onUnsuspend?.(item)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-sm font-medium rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/20 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Unsuspend
          </button>
          <button
            onClick={() => onDeleteAgent?.(item)}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 text-sm font-medium rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500/20 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </button>
        </div>
      </DetailSection>
    </>
  );

  const detailRenderers = {
    agents: renderAgentDetails,
    chatbots: renderChatbotDetails,
    groups: renderGroupDetails,
    suspended: renderSuspendedDetails,
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={item.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="h-full flex flex-col"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between mb-5 shrink-0 px-4 py-3 -mx-5 -mt-5 rounded-t-2xl border-b border-[var(--titan-card-border)]"
          style={{
            background: "var(--titan-glass-bg)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
          }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--titan-primary)] border border-[var(--titan-card-border)] flex items-center justify-center text-base font-semibold text-[var(--titan-bg)]">
              {item.name?.[0]}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[var(--titan-primary)]">
                {item.name}
              </h3>
              <p className="text-xs text-[var(--titan-text-muted)]">
                {item.role || item.type || "Group"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border border-[var(--titan-card-border)] hover:bg-[var(--titan-hover)] transition-colors"
          >
            <X className="w-4 h-4 text-[var(--titan-text-muted)]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto space-y-5 pr-1 custom-scrollbar">
          {detailRenderers[type]?.()}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

const DetailSection = ({ title, children, action }) => (
  <div>
    <div
      className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[var(--titan-text-muted)] mb-3 pb-1.5 px-2 py-1 -mx-1 rounded-lg border-b border-[var(--titan-card-border)]"
      style={{
        background: "var(--titan-glass-bg)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <span>{title}</span>
      {action && action}
    </div>
    {children}
  </div>
);

const DetailRow = ({ label, value }) => (
  <div className="flex items-center justify-between py-2 border-b border-[var(--titan-card-border)]/30 last:border-b-0">
    <span className="text-xs text-[var(--titan-text-muted)]">{label}</span>
    <span className="text-sm text-[var(--titan-text-secondary)]">
      {typeof value === "string" || typeof value === "number" ? value : value}
    </span>
  </div>
);

const StatusBadge = ({ status }) => {
  const config = statusConfig[status] || statusConfig.offline;
  return (
    <span className="inline-flex items-center gap-1.5 text-xs">
      <span className={`w-2 h-2 rounded-full ${config.color}`} />
      {config.label}
    </span>
  );
};

const StatCard = ({ icon: Icon, label, value }) => (
  <motion.div
    whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
    className="flex flex-col gap-1 p-3 rounded-xl border border-[var(--titan-card-border)] backdrop-blur-md"
    style={{
      background: "var(--titan-glass-bg)",
      boxShadow: "var(--titan-neo-raised-sm)",
    }}
  >
    <div className="flex items-center gap-1.5">
      <Icon className="w-3.5 h-3.5 text-[var(--titan-text-muted)]" />
      <span className="text-[10px] text-[var(--titan-text-muted)] uppercase tracking-wider">
        {label}
      </span>
    </div>
    <span className="text-lg font-semibold text-[var(--titan-primary)]">
      {value}
    </span>
  </motion.div>
);

export default DetailPanel;
