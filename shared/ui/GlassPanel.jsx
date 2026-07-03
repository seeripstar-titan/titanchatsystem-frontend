import React, { forwardRef } from "react";
import { motion } from "framer-motion";

export const GlassPanel = forwardRef(
  (
    { children, className = "", padding = "p-4", animate = true, ...props },
    ref,
  ) => {
    const Component = animate ? motion.div : "div";
    const motionProps = animate
      ? {
          initial: { opacity: 0, y: 12, filter: "blur(4px)" },
          animate: { opacity: 1, y: 0, filter: "blur(0px)" },
          transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
        }
      : {};

    return (
      <Component
        ref={ref}
        className={`relative bg-[var(--titan-glass-bg)] backdrop-blur-xl border border-[var(--titan-glass-border)] rounded-2xl overflow-visible transition-[border-color,background-color,box-shadow] duration-300 ${padding} ${className}`}
        style={{
          WebkitBackdropFilter: "blur(30px) saturate(190%)",
          backdropFilter: "blur(30px) saturate(190%)",
          transform: "translateZ(0)",
          boxShadow: "var(--titan-glass-shadow)",
        }}
        {...motionProps}
        {...props}
      >
        {children}
      </Component>
    );
  },
);
