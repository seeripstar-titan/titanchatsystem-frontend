import React from "react";
import { motion } from "framer-motion";
import Logger from "../../services/logger/Logger";

export const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  fullWidth = false,
  className = "",
  disabled = false,
  logLabel,
  style,
  ...props
}) => {
  const baseStyles =
    "relative overflow-hidden inline-flex justify-center items-center py-2.5 px-6 rounded-2xl text-sm font-semibold tracking-[-0.01em] border backdrop-blur-2xl transition-[border-color,background-color,box-shadow,transform,color] duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--titan-primary)]/25 focus-visible:ring-offset-[var(--titan-bg)] disabled:opacity-40 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[var(--titan-primary)] text-[var(--titan-bg)] border-[var(--titan-primary)] shadow-[var(--titan-neo-raised-sm)]",
    secondary:
      "bg-[var(--titan-button-bg)] border-[var(--titan-card-border)] text-[var(--titan-primary)] shadow-[var(--titan-neo-raised-sm)]",
    danger:
      "bg-[var(--titan-danger)] text-[var(--titan-bg)] border-[var(--titan-danger)] shadow-[var(--titan-neo-raised-sm)]",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  const handleClick = (e) => {
    const label = logLabel || (typeof children === "string" ? children : type);
    Logger.interaction({
      action: "click",
      target: label,
      component: "Button",
      meta: { variant },
    });
    onClick?.(e);
  };

  return (
    <motion.button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      whileTap={disabled ? {} : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`}
      style={{
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        backdropFilter: "blur(24px) saturate(180%)",
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
};
