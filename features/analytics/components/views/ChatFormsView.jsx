import React from "react";
import { motion } from "framer-motion";
import { ReportCard, KpiCard } from "../ReportCharts";
import { chatFormsData } from "../../data/reportsMockData";
import { FileInput, FileCheck, Mail } from "lucide-react";

const ProgressBar = ({ label, filled, total }) => {
  const pct = ((filled / total) * 100).toFixed(1);
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between text-[12px]">
        <span className="text-[var(--titan-text-muted)]">{label}</span>
        <span className="font-medium text-[var(--titan-primary)]">
          {pct}% filled
        </span>
      </div>
      <div className="h-2 rounded-full bg-[var(--titan-hover)] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-full rounded-full bg-[#6366f1]"
        />
      </div>
      <div className="flex justify-between text-[11px] text-[var(--titan-text-muted)]">
        <span>{filled.toLocaleString()} filled</span>
        <span>{(total - filled).toLocaleString()} skipped</span>
      </div>
    </div>
  );
};

const ChatFormsView = () => (
  <div className="flex flex-col gap-4">
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <KpiCard
        label="Pre-chat forms"
        value={chatFormsData.preChatForms.total.toLocaleString()}
        change={`${((chatFormsData.preChatForms.filled / chatFormsData.preChatForms.total) * 100).toFixed(0)}% filled`}
        trend="up"
        icon={FileInput}
      />
      <KpiCard
        label="Post-chat forms"
        value={chatFormsData.postChatForms.total.toLocaleString()}
        change={`${((chatFormsData.postChatForms.filled / chatFormsData.postChatForms.total) * 100).toFixed(0)}% filled`}
        trend="up"
        icon={FileCheck}
      />
      <KpiCard
        label="Offline messages"
        value={chatFormsData.offlineMessages.received.toLocaleString()}
        change={`${chatFormsData.offlineMessages.pending} pending`}
        trend="down"
        icon={Mail}
      />
    </div>

    <ReportCard
      title="Form Completion Rates"
      subtitle="How often customers fill out chat forms"
    >
      <div className="flex flex-col gap-6">
        <ProgressBar
          label="Pre-chat survey"
          filled={chatFormsData.preChatForms.filled}
          total={chatFormsData.preChatForms.total}
        />
        <ProgressBar
          label="Post-chat survey"
          filled={chatFormsData.postChatForms.filled}
          total={chatFormsData.postChatForms.total}
        />
        <ProgressBar
          label="Offline messages responded"
          filled={chatFormsData.offlineMessages.responded}
          total={chatFormsData.offlineMessages.received}
        />
      </div>
    </ReportCard>
  </div>
);

export default ChatFormsView;
