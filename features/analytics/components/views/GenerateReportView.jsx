import React from "react";
import { motion } from "framer-motion";
import { ReportCard } from "../ReportCharts";
import { FileSpreadsheet, Download, Calendar, Clock } from "lucide-react";

const exportOptions = [
  { label: "Chats", description: "Export all chat transcripts and metadata" },
  { label: "Agents", description: "Export agent performance data" },
  {
    label: "Customer Data",
    description: "Export customer interaction history",
  },
  { label: "Satisfaction", description: "Export chat ratings and feedback" },
  { label: "Sales & Goals", description: "Export ecommerce data" },
];

const GenerateReportView = () => (
  <div className="flex flex-col gap-4">
    <ReportCard
      title="Generate Report"
      subtitle="Export raw data for custom analysis"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-[var(--titan-text-muted)] uppercase tracking-wider">
            Date Range
          </label>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)] text-sm text-[var(--titan-primary)]">
            <Calendar size={14} className="text-[var(--titan-text-muted)]" />
            <span>Last 30 days</span>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-[var(--titan-text-muted)] uppercase tracking-wider">
            Format
          </label>
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)] text-sm text-[var(--titan-primary)]">
            <FileSpreadsheet
              size={14}
              className="text-[var(--titan-text-muted)]"
            />
            <span>CSV</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {exportOptions.map((opt) => (
          <motion.div
            key={opt.label}
            whileHover={{ x: 2 }}
            className="flex items-center justify-between px-4 py-3 rounded-xl border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)] hover:bg-[var(--titan-hover)] transition-colors cursor-pointer group"
          >
            <div>
              <p className="text-[13px] font-medium text-[var(--titan-primary)]">
                {opt.label}
              </p>
              <p className="text-[11px] text-[var(--titan-text-muted)]">
                {opt.description}
              </p>
            </div>
            <Download
              size={14}
              className="text-[var(--titan-text-muted)] opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </motion.div>
        ))}
      </div>
    </ReportCard>
  </div>
);

export default GenerateReportView;
