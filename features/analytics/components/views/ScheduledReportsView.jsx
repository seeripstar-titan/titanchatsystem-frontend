import React from "react";
import { motion } from "framer-motion";
import { ReportCard } from "../ReportCharts";
import { CalendarCheck, Plus, Clock, Mail } from "lucide-react";

const ScheduledReportsView = () => (
  <div className="flex flex-col gap-4">
    <ReportCard
      title="Scheduled Reports"
      subtitle="Automatically generated and emailed reports"
    >
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <div className="w-16 h-16 rounded-2xl border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)] flex items-center justify-center">
          <CalendarCheck
            className="w-8 h-8 text-[var(--titan-text-muted)]"
            strokeWidth={1.2}
          />
        </div>
        <h3 className="text-base font-semibold text-[var(--titan-primary)]">
          No scheduled reports
        </h3>
        <p className="text-[var(--titan-text-muted)] text-sm text-center max-w-sm">
          Set up automated reports to be generated and sent to your inbox on a
          regular schedule.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-2 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)] text-[var(--titan-primary)] cursor-pointer hover:bg-[var(--titan-hover)] transition-colors"
        >
          <Plus size={14} /> Schedule a report
        </motion.button>
      </div>
    </ReportCard>
  </div>
);

export default ScheduledReportsView;
