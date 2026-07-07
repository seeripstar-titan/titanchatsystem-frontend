import React, { Suspense, useMemo } from "react";
import { ShaderGradientCanvas, ShaderGradient } from "@shadergradient/react";
import { useTheme } from "../../context/ThemeContext";
import { useReducedMotion } from "../hooks/useReducedMotion";

const baseGradientProps = {
  control: "props",
  shader: "defaults",
  wireframe: false,
  grain: "off",
  lightType: "3d",
  envPreset: "city",
  reflection: 0.1,
  enableTransition: true,
  enableCameraUpdate: false,
};

const darkGradientProps = {
  animate: "on",
  axesHelper: "off",
  brightness: 1.2,
  cAzimuthAngle: 180,
  cDistance: 3.6,
  cPolarAngle: 90,
  cameraZoom: 1,
  color1: "#3b3b3b",
  color2: "#222222",
  color3: "#141414",
  destination: "onCanvas",
  embedMode: "off",
  envPreset: "city",
  format: "gif",
  fov: 45,
  frameRate: 10,
  gizmoHelper: "hide",
  grain: "off",
  lightType: "3d",
  pixelDensity: 1,
  positionX: -1.4,
  positionY: 0,
  positionZ: 0,
  range: "disabled",
  rangeEnd: 40,
  rangeStart: 0,
  reflection: 0.1,
  rotationX: 0,
  rotationY: 10,
  rotationZ: 50,
  shader: "defaults",
  type: "plane",
  uAmplitude: 1,
  uDensity: 1.3,
  uFrequency: 5.5,
  uSpeed: 0.1,
  uStrength: 4,
  uTime: 0,
  wireframe: false,
};

const lightGradientProps = {
  animate: "on",
  axesHelper: "off",
  bgColor1: "#000000",
  bgColor2: "#000000",
  brightness: 1.2,
  cAzimuthAngle: 180,
  cDistance: 2.9,
  cPolarAngle: 120,
  cameraZoom: 1,
  color1: "#ebedff",
  color2: "#f3f2f8",
  color3: "#dbf8ff",
  destination: "onCanvas",
  embedMode: "off",
  envPreset: "city",
  format: "gif",
  fov: 45,
  frameRate: 10,
  gizmoHelper: "hide",
  grain: "off",
  lightType: "3d",
  pixelDensity: 1,
  positionX: 0,
  positionY: 1.8,
  positionZ: 0,
  range: "disabled",
  rangeEnd: 40,
  rangeStart: 0,
  reflection: 0.1,
  rotationX: 0,
  rotationY: 0,
  rotationZ: -90,
  shader: "defaults",
  type: "waterPlane",
  uAmplitude: 0,
  uDensity: 1,
  uFrequency: 5.5,
  uSpeed: 0.3,
  uStrength: 3,
  uTime: 0.2,
  wireframe: false,
};

const fallbackGradientLight =
  "radial-gradient(ellipse at 18% 28%, rgba(235,237,255,0.72) 0%, rgba(235,237,255,0.34) 36%, transparent 68%), radial-gradient(ellipse at 72% 42%, rgba(243,242,248,0.7) 0%, rgba(243,242,248,0.36) 44%, transparent 74%), radial-gradient(ellipse at 48% 86%, rgba(219,248,255,0.76) 0%, rgba(219,248,255,0.38) 48%, transparent 78%)";

const fallbackGradientDark =
  "radial-gradient(ellipse at 18% 28%, rgba(59,59,59,0.18) 0%, rgba(59,59,59,0.07) 36%, transparent 68%), radial-gradient(ellipse at 72% 42%, rgba(34,34,34,0.16) 0%, rgba(34,34,34,0.06) 44%, transparent 74%), radial-gradient(ellipse at 48% 86%, rgba(20,20,20,0.2) 0%, rgba(20,20,20,0.08) 48%, transparent 78%)";

const GradientBackground = ({
  className = "",
  opacity = 0.6,
  variant = "dashboard",
}) => {
  const { isDark } = useTheme();
  const prefersReduced = useReducedMotion();

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const gradientProps = useMemo(() => {
    return {
      ...baseGradientProps,
      ...(isDark ? darkGradientProps : lightGradientProps),
      animate: prefersReduced ? "off" : "on",
    };
  }, [isDark, prefersReduced]);

  const fallbackStyle = {
    background: isDark ? fallbackGradientDark : fallbackGradientLight,
    backgroundSize: "180% 180%",
    animation: prefersReduced
      ? undefined
      : "titan-gradient-drift 18s ease-in-out infinite alternate",
  };

  if (isMobile) {
    return (
      <div
        className={`absolute inset-0 z-0 ${className}`}
        style={{ ...fallbackStyle, opacity }}
      />
    );
  }

  return (
    <div
      className={`absolute inset-0 z-0 pointer-events-none ${className}`}
      style={{ opacity }}
    >
      <Suspense
        fallback={<div className="w-full h-full" style={fallbackStyle} />}
      >
        <ShaderGradientCanvas
          style={{ position: "absolute", inset: 0 }}
          pixelDensity={1}
          fov={45}
          pointerEvents="none"
          powerPreference="high-performance"
        >
          <ShaderGradient {...gradientProps} />
        </ShaderGradientCanvas>
      </Suspense>
    </div>
  );
};

export default GradientBackground;
