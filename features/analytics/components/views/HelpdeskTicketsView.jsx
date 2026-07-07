import React from "react";
import { motion } from "framer-motion";
import { ReportCard } from "../ReportCharts";
import { HelpCircle, ExternalLink } from "lucide-react";

const HelpdeskTicketsView = () => (
  <div className="flex flex-col gap-4">
    <ReportCard
      title="HelpDesk Tickets"
      subtitle="Ticket reports from the HelpDesk integration"
    >
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <div className="w-16 h-16 rounded-2xl border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)] flex items-center justify-center">
          <HelpCircle
            className="w-8 h-8 text-[var(--titan-text-muted)]"
            strokeWidth={1.2}
          />
        </div>
        <h3 className="text-base font-semibold text-[var(--titan-primary)]">
          HelpDesk Integration
        </h3>
        <p className="text-[var(--titan-text-muted)] text-sm text-center max-w-sm">
          View your HelpDesk ticket reports and analytics. Connect your HelpDesk
          account to see reports here.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-2 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)] text-[var(--titan-primary)] cursor-pointer hover:bg-[var(--titan-hover)] transition-colors"
        >
          <ExternalLink size={14} /> Open HelpDesk
        </motion.button>
      </div>
    </ReportCard>
  </div>
);

export default HelpdeskTicketsView;
