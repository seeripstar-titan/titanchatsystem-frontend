/**
 * Titan Chat System — Design Tokens
 * Centralized design system for the premium monochrome UI.
 */

// ── Color Palette ──
export const colors = {
  dark: {
    bg: "#050505",
    bgSecondary: "#0d0d0d",
    card: "#111111",
    border: "rgba(255, 255, 255, 0.08)",
    borderHover: "rgba(255, 255, 255, 0.14)",
    text: "#FFFFFF",
    textSecondary: "rgba(255, 255, 255, 0.65)",
    muted: "rgba(255, 255, 255, 0.35)",
    hover: "rgba(255, 255, 255, 0.06)",
    danger: "#FF4444",
    dangerLight: "#FF6666",
    inputBg: "#0d0d0d",
    inputBorder: "rgba(255, 255, 255, 0.10)",
    glassBg: "rgba(255, 255, 255, 0.03)",
    glassBorder: "rgba(255, 255, 255, 0.06)",
    navBg: "rgba(10, 10, 10, 0.80)",
    glow: "rgba(255, 255, 255, 0.06)",
  },
  light: {
    bg: "#FAFAFA",
    bgSecondary: "#F5F5F5",
    card: "#FFFFFF",
    border: "rgba(0, 0, 0, 0.08)",
    borderHover: "rgba(0, 0, 0, 0.14)",
    text: "#0A0A0A",
    textSecondary: "rgba(0, 0, 0, 0.65)",
    muted: "rgba(0, 0, 0, 0.35)",
    hover: "rgba(0, 0, 0, 0.04)",
    danger: "#DC2626",
    dangerLight: "#EF4444",
    inputBg: "#F5F5F5",
    inputBorder: "rgba(0, 0, 0, 0.10)",
    glassBg: "rgba(255, 255, 255, 0.70)",
    glassBorder: "rgba(0, 0, 0, 0.06)",
    navBg: "rgba(250, 250, 250, 0.80)",
    glow: "rgba(0, 0, 0, 0.04)",
  },
};

// ── Shadows ──
export const shadows = {
  card: "0 10px 40px rgba(0, 0, 0, 0.35)",
  cardHover: "0 20px 60px rgba(0, 0, 0, 0.50)",
  cardLight: "0 10px 40px rgba(0, 0, 0, 0.06)",
  cardHoverLight: "0 20px 60px rgba(0, 0, 0, 0.10)",
  glass: "0 16px 40px rgba(0, 0, 0, 0.25)",
  nav: "0 4px 30px rgba(0, 0, 0, 0.20)",
  // Neomorphism
  neoRaisedDark:
    "6px 6px 14px rgba(0, 0, 0, 0.6), -6px -6px 14px rgba(255, 255, 255, 0.04)",
  neoRaisedLight:
    "6px 6px 14px rgba(0, 0, 0, 0.12), -6px -6px 14px rgba(255, 255, 255, 0.9)",
  neoInsetDark:
    "inset 3px 3px 8px rgba(0, 0, 0, 0.5), inset -3px -3px 8px rgba(255, 255, 255, 0.03)",
  neoInsetLight:
    "inset 3px 3px 8px rgba(0, 0, 0, 0.12), inset -3px -3px 8px rgba(255, 255, 255, 0.7)",
};

// ── Border Radii ──
export const radii = {
  sm: "12px",
  md: "16px",
  lg: "20px",
  xl: "24px",
  pill: "9999px",
};

// ── Typography ──
export const typography = {
  fontFamily:
    "'SF Pro Display', 'SF Pro Text', -apple-system, system-ui, BlinkMacSystemFont, 'Inter', sans-serif",
  hero: {
    size: "72px",
    weight: 800,
    lineHeight: 1.05,
    letterSpacing: "-0.03em",
  },
  sectionTitle: {
    size: "44px",
    weight: 700,
    lineHeight: 1.15,
    letterSpacing: "-0.02em",
  },
  heading: {
    size: "32px",
    weight: 700,
    lineHeight: 1.2,
    letterSpacing: "-0.02em",
  },
  subheading: {
    size: "20px",
    weight: 600,
    lineHeight: 1.4,
    letterSpacing: "-0.01em",
  },
  body: { size: "16px", weight: 400, lineHeight: 1.6 },
  small: { size: "14px", weight: 400, lineHeight: 1.5 },
  caption: {
    size: "12px",
    weight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.02em",
  },
};

// ── Spacing ──
export const spacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  "2xl": "48px",
  "3xl": "64px",
  "4xl": "96px",
  section: "120px",
  maxWidth: "1360px",
};

// ── Animation Presets (Framer Motion) ──
export const spring = {
  gentle: { type: "spring", stiffness: 200, damping: 24 },
  snappy: { type: "spring", stiffness: 400, damping: 30 },
  bouncy: { type: "spring", stiffness: 300, damping: 15 },
};

export const transitions = {
  fast: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
  smooth: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  slow: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  spring: spring.gentle,
};

export const fadeUp = {
  initial: { opacity: 0, y: 24, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -12, filter: "blur(4px)" },
  transition: transitions.smooth,
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ── ShaderGradient Presets ──
export const gradientPresets = {
  dark: {
    color1: "#e9e9e9",
    color2: "#9a9a9a",
    color3: "#454545",
  },
  light: {
    color1: "#ebedff",
    color2: "#f3f2f8",
    color3: "#dbf8ff",
  },
};
