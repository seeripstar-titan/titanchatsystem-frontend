import React from "react";
import { motion } from "framer-motion";
import PageWrapper from "../../../shared/components/PageWrapper";
import { Card } from "../../../shared/ui";
import { Users, UserPlus, Shield } from "lucide-react";

const Team = () => {
  return (
    <PageWrapper
      title="Team"
      description="Manage your AI agents and human staff."
    >
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="h-full w-full"
      >
        <Card
          hover3d
          className="!p-8 h-full flex flex-col items-center justify-center"
        >
          <div className="flex gap-6 mb-6">
            {[Users, UserPlus, Shield].map((Icon, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 2.5,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Icon
                  className="w-10 h-10 text-[var(--titan-text-muted)]"
                  strokeWidth={1.2}
                />
              </motion.div>
            ))}
          </div>
          <h3 className="text-lg font-semibold text-[var(--titan-primary)] mb-2">
            Team Management
          </h3>
          <p className="text-[var(--titan-text-muted)] text-sm text-center max-w-sm">
            Manage team members, roles, and agent assignments.
          </p>
          <motion.div
            className="mt-6 px-4 py-2 rounded-full border border-[var(--titan-glass-border)] text-xs font-medium text-[var(--titan-text-muted)]"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Coming Soon
          </motion.div>
        </Card>
      </motion.div>
    </PageWrapper>
  );
};

export default Team;
