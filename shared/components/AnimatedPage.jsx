import React from "react";
import { motion } from "framer-motion";

const presets = {
  fadeUp: {
    initial: { opacity: 0, filter: "blur(4px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(4px)" },
  },
  slideLeft: {
    initial: { opacity: 0, filter: "blur(4px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(4px)" },
  },
  slideRight: {
    initial: { opacity: 0, filter: "blur(4px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(4px)" },
  },
  morphScale: {
    initial: { opacity: 0, filter: "blur(6px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(6px)" },
  },
  flip3D: {
    initial: { opacity: 0, filter: "blur(4px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(4px)" },
  },
  blurUp: {
    initial: { opacity: 0, filter: "blur(8px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(8px)" },
  },
};

const AnimatedPage = ({
  children,
  variant = "fadeUp",
  duration = 0.5,
  delay = 0,
  className = "",
  style = {},
}) => {
  const preset = presets[variant] || presets.fadeUp;

  return (
    <motion.div
      initial={preset.initial}
      animate={preset.animate}
      exit={preset.exit}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={`w-full h-full ${className}`}
      style={{ perspective: 1200, ...style }}
    >
      {children}
    </motion.div>
  );
};

export { presets };
export default AnimatedPage;
