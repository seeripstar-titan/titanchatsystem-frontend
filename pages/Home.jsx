import React from "react";
import { motion } from "framer-motion";
import PageWrapper from "../shared/components/PageWrapper";
import { Card } from "../shared/ui";
import {
  Home as HomeIcon,
  MessageSquare,
  BarChart2,
  Users,
  Activity,
} from "lucide-react";

const stats = [
  {
    icon: MessageSquare,
    label: "Active Chats",
    value: "—",
  },
  {
    icon: Users,
    label: "Team Members",
    value: "—",
  },
  {
    icon: BarChart2,
    label: "Conversations Today",
    value: "—",
  },
  {
    icon: Activity,
    label: "Response Time",
    value: "—",
  },
];

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

const Home = () => {
  return (
    <PageWrapper
      title="Dashboard"
      description="Welcome back. Here's your overview."
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="h-full w-full flex flex-col gap-5"
      >
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {stats.map(({ icon: Icon, label, value }) => (
            <motion.div key={label} variants={cardVariants}>
              <Card hover3d className="!p-5 flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--titan-hover)] border border-[var(--titan-card-border)] flex items-center justify-center text-[var(--titan-text-muted)]">
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
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

        {/* Main content area */}
        <motion.div
          variants={cardVariants}
          className="flex-1 flex flex-col items-center justify-center text-center px-4"
        >
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <HomeIcon
              className="w-14 h-14 text-[var(--titan-text-muted)] mb-4"
              strokeWidth={1}
            />
          </motion.div>
          <h3 className="text-lg font-semibold text-[var(--titan-primary)] mb-2 tracking-[-0.02em]">
            Quick Actions & Overview
          </h3>
          <p className="text-[var(--titan-text-muted)] text-sm text-center max-w-md">
            Select an option from the navigation bar to manage chats, view
            analytics, or configure your system.
          </p>
        </motion.div>
      </motion.div>
    </PageWrapper>
  );
};

export default Home;
