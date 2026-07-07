import React from "react";
import { motion } from "framer-motion";
import { Bookmark, Plus, FolderOpen } from "lucide-react";
import { ReportCard } from "../ReportCharts";

const SavedViews = () => (
  <div className="flex flex-col gap-4">
    <ReportCard
      title="Saved Views"
      subtitle="Access your saved report configurations"
    >
      <div className="flex flex-col items-center justify-center py-12 gap-4">
        <div className="w-16 h-16 rounded-2xl border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)] flex items-center justify-center">
          <Bookmark
            className="w-8 h-8 text-[var(--titan-text-muted)]"
            strokeWidth={1.2}
          />
        </div>
        <h3 className="text-base font-semibold text-[var(--titan-primary)]">
          No saved views yet
        </h3>
        <p className="text-[var(--titan-text-muted)] text-sm text-center max-w-sm">
          Save your favourite report configurations for quick access. Customize
          filters and date ranges, then click save.
        </p>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-2 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border border-[var(--titan-card-border)] bg-[var(--titan-glass-bg)] text-[var(--titan-primary)] cursor-pointer hover:bg-[var(--titan-hover)] transition-colors"
        >
          <Plus size={14} /> Create saved view
        </motion.button>
      </div>
    </ReportCard>
  </div>
);

export default SavedViews;
