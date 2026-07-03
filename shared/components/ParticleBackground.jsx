import React, { useCallback, useMemo } from "react";
import Particles from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useTheme } from "../../context/ThemeContext";

const ParticleBackground = ({ className = "" }) => {
  const { isDark } = useTheme();

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const options = useMemo(
    () => ({
      fullScreen: false,
      fpsLimit: 60,
      particles: {
        number: {
          value: 50,
          density: { enable: true, width: 1920, height: 1080 },
        },
        color: { value: isDark ? "#BDD9D7" : "#03363D" },
        shape: { type: "circle" },
        opacity: {
          value: { min: 0.1, max: isDark ? 0.3 : 0.15 },
          animation: { enable: true, speed: 0.5, sync: false },
        },
        size: {
          value: { min: 1, max: 3 },
          animation: { enable: true, speed: 1, sync: false },
        },
        links: {
          enable: true,
          distance: 150,
          color: isDark ? "#BDD9D7" : "#03363D",
          opacity: isDark ? 0.12 : 0.08,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.6,
          direction: "none",
          random: true,
          straight: false,
          outModes: { default: "bounce" },
        },
      },
      interactivity: {
        events: {
          onHover: { enable: false, mode: "grab" },
          resize: { enable: true },
        },
        modes: {
          grab: {
            distance: 140,
            links: {
              opacity: isDark ? 0.4 : 0.25,
              color: isDark ? "#BDD9D7" : "#03363D",
            },
          },
        },
      },
      detectRetina: true,
    }),
    [isDark],
  );

  return (
    <Particles
      className={`absolute inset-0 z-0 ${className}`}
      init={particlesInit}
      options={options}
    />
  );
};

export default ParticleBackground;
