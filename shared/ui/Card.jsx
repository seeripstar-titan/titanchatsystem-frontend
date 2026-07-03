import React, { forwardRef } from "react";
import { motion } from "framer-motion";

export const Card = forwardRef(
  ({ children, className = "", hover3d = false, style, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`relative bg-[var(--titan-card-bg)] backdrop-blur-xl border border-[var(--titan-card-border)] py-6 px-5 rounded-2xl sm:px-8 transition-[border-color,background-color,box-shadow,transform] duration-300 ${className}`}
        style={{
          perspective: 1200,
          transformStyle: "preserve-3d",
          WebkitBackdropFilter: "blur(28px) saturate(185%)",
          backdropFilter: "blur(28px) saturate(185%)",
          boxShadow: "var(--titan-neo-raised-sm)",
          ...style,
        }}
        {...props}
      >
        {children}
      </motion.div>
    );
  },
);

export const CardHeader = forwardRef(
  ({ title, img, imgAlt = "Logo", isLoginMode, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className="mb-6 mt-2 flex items-center justify-between"
        {...props}
      >
        {img && (
          <div className="flex-shrink-0">
            <motion.img
              src={img}
              alt={imgAlt}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="h-10 w-auto drop-shadow-md cursor-pointer"
            />
          </div>
        )}
        <div className={`flex-grow text-center ${img ? "pr-10" : ""}`}>
          <h2 className="text-xl font-semibold text-[var(--titan-primary)] tracking-[-0.02em]">
            {title}
          </h2>
        </div>
      </div>
    );
  },
);
