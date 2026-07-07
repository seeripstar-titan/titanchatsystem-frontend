import React, { useContext } from "react";
import { motion } from "framer-motion";
import PageWrapper from "../../../../shared/components/PageWrapper";
import { Card } from "../../../../shared/ui";
import { AuthContext } from "../../../../context/AuthContext";
import {
  MessageSquare,
  Clock,
  CheckCircle2,
  Star,
  Headphones,
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const stats = [
  {
    icon: MessageSquare,
    label: "Active Chats",
    value: "3",
    accent: "#2d8a5e",
  },
  {
    icon: CheckCircle2,
    label: "Resolved Today",
    value: "12",
    accent: "#2d8a5e",
  },
  {
    icon: Clock,
    label: "Avg. Response Time",
    value: "1.2m",
    accent: "#c07c1e",
  },
  {
    icon: Star,
    label: "Satisfaction Score",
    value: "4.8",
    accent: "#c07c1e",
  },
];

const AgentHome = () => {
  const { user } = useContext(AuthContext);

  return (
    <PageWrapper
      title="Dashboard"
      description={`Welcome back, ${user?.name || "Agent"}. Here's your overview.`}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="h-full w-full flex flex-col gap-5"
      >
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {stats.map(({ icon: Icon, label, value, accent }) => (
            <motion.div key={label} variants={cardVariants}>
              <Card hover3d className="!p-5 flex flex-col gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center border border-[var(--titan-card-border)]"
                  style={{ backgroundColor: `${accent}22` }}
                >
                  <Icon
                    className="w-5 h-5"
                    strokeWidth={1.5}
                    style={{ color: accent }}
                  />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[var(--titan-primary)] tracking-[-0.02em]">
                    {value}
                  </p>
                  <p className="text-xs text-[var(--titan-text-muted)] mt-0.5">
                    {label}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Today's Activity Timeline */}
        <motion.div variants={cardVariants}>
          <Card className="!p-6">
            <h3 className="text-[15px] font-semibold text-[var(--titan-primary)] mb-4 tracking-[-0.01em]">
              Today's Activity
            </h3>
            <div className="space-y-3">
              {[
                {
                  time: "10:32 AM",
                  text: "Resolved chat with customer #1042",
                  icon: CheckCircle2,
                  color: "#2d8a5e",
                },
                {
                  time: "09:45 AM",
                  text: "Accepted new chat request",
                  icon: MessageSquare,
                  color: "#2d8a5e",
                },
                {
                  time: "09:15 AM",
                  text: "Average response time: 48s",
                  icon: Clock,
                  color: "#c07c1e",
                },
                {
                  time: "09:00 AM",
                  text: "Shift started",
                  icon: Headphones,
                  color: "#2d8a5e",
                },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${item.color}22` }}
                  >
                    <item.icon
                      size={13}
                      strokeWidth={1.6}
                      style={{ color: item.color }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-[var(--titan-primary)]">
                      {item.text}
                    </p>
                  </div>
                  <span className="text-[11px] text-[var(--titan-text-muted)] shrink-0">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </PageWrapper>
  );
};

export default AgentHome;
