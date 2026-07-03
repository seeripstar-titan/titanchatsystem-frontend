import React from "react";
import { motion } from "framer-motion";

const shimmer = {
  initial: { x: "-100%" },
  animate: { x: "100%" },
};

const SkeletonBlock = ({ className = "", rounded = "rounded-2xl" }) => (
  <div
    className={`relative overflow-hidden bg-[var(--titan-hover)] ${rounded} ${className}`}
  >
    <motion.div
      variants={shimmer}
      initial="initial"
      animate="animate"
      transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
      className="absolute inset-0 bg-gradient-to-r from-transparent via-[var(--titan-primary)]/5 to-transparent"
    />
  </div>
);

const SkeletonLoader = ({ type = "page" }) => {
  if (type === "page") {
    return (
      <div className="w-full h-full flex flex-col gap-6 p-8">
        <SkeletonBlock className="h-10 w-1/3" rounded="rounded-xl" />
        <SkeletonBlock className="h-5 w-1/2" rounded="rounded-lg" />
        <div className="flex-1 grid grid-cols-3 gap-4 mt-4">
          <SkeletonBlock className="h-40" />
          <SkeletonBlock className="h-40" />
          <SkeletonBlock className="h-40" />
        </div>
        <div className="flex gap-4">
          <SkeletonBlock className="h-32 flex-1" />
          <SkeletonBlock className="h-32 flex-1" />
        </div>
      </div>
    );
  }

  if (type === "card") {
    return (
      <div className="flex flex-col gap-3 p-5">
        <SkeletonBlock className="h-6 w-2/3" rounded="rounded-lg" />
        <SkeletonBlock className="h-4 w-full" rounded="rounded-lg" />
        <SkeletonBlock className="h-4 w-4/5" rounded="rounded-lg" />
      </div>
    );
  }

  return <SkeletonBlock className="h-12 w-full" rounded="rounded-xl" />;
};

export { SkeletonBlock };
export default SkeletonLoader;
