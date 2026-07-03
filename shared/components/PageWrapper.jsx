import React from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const PageWrapper = ({ title, description, children }) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex h-full flex-col px-1 sm:px-2 lg:px-4 2xl:px-6"
    >
      <motion.div
        variants={itemVariants}
        className="mb-4 sm:mb-5 lg:mb-6 shrink-0"
      >
        <h1 className="text-xl sm:text-2xl lg:text-3xl 2xl:text-4xl font-bold text-[var(--titan-primary)] mb-1.5 tracking-[-0.03em] drop-shadow-[0_12px_30px_var(--titan-glow)]">
          {title}
        </h1>
        {description && (
          <p className="text-[var(--titan-text-muted)] text-sm sm:text-base drop-shadow-[0_10px_26px_var(--titan-glow)]">
            {description}
          </p>
        )}
      </motion.div>
      <motion.div
        variants={itemVariants}
        className="flex-grow overflow-visible relative flex flex-col"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default PageWrapper;
