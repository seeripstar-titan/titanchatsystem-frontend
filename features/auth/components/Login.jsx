import React, { useState, useContext, useEffect, useRef } from "react";
import { flushSync } from "react-dom";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../../context/AuthContext";
import { useTheme } from "../../../context/ThemeContext";
import gsap from "gsap";
import Logger from "../../../services/logger/Logger";
import { Sun, Moon } from "lucide-react";

import { CardHeader } from "../../../shared/ui";
import logoLight from "../../../assets/titan2.png";
import logoDark from "../../../assets/logo.png";
import GradientBackground from "../../../shared/components/GradientBackground";

// Password strength bar component
const PasswordStrengthBar = ({ password, isDark }) => {
  const checks = [
    password.length >= 8,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /[0-9]/.test(password),
    /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password),
  ];
  const strength = checks.filter(Boolean).length;
  const colors = isDark
    ? [
        "rgba(255,255,255,0.2)",
        "rgba(255,255,255,0.35)",
        "rgba(255,255,255,0.5)",
        "rgba(255,255,255,0.7)",
        "#FFFFFF",
      ]
    : [
        "rgba(0,0,0,0.15)",
        "rgba(0,0,0,0.3)",
        "rgba(0,0,0,0.45)",
        "rgba(0,0,0,0.65)",
        "#0a0a0a",
      ];
  const emptyColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const labels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="h-1 flex-1 rounded-full"
            initial={{ scaleX: 0 }}
            animate={{
              scaleX: i < strength ? 1 : 0,
              backgroundColor: i < strength ? colors[strength - 1] : emptyColor,
            }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            style={{ originX: 0 }}
          />
        ))}
      </div>
      <AnimatePresence mode="wait">
        {password.length > 0 && (
          <motion.p
            key={strength}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-[10px] font-medium"
            style={{ color: colors[Math.max(0, strength - 1)] }}
          >
            {labels[Math.max(0, strength - 1)]}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

const Login = () => {
  const { login, signupRequest, user } = useContext(AuthContext);
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [view, setView] = useState("initial");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const splashRef = useRef(null);
  const splashLogoRef = useRef(null);
  const formCardRef = useRef(null);
  const viewContainerRef = useRef(null);
  const formElementsRef = useRef([]);

  // Reset form element refs on view change so GSAP targets are clean
  useEffect(() => {
    formElementsRef.current = [];
  }, [view]);

  const [splashDone, setSplashDone] = useState(false);

  // Splash screen and entry animation GSAP sequence
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Ensure splash always plays on a fresh page load by avoiding sessionStorage
      const hasPlayedSplash = window.__titanSplashPlayed;

      if (!hasPlayedSplash) {
        // Advanced cinematic logo reveal
        tl.fromTo(
          splashLogoRef.current,
          { scale: 2, filter: "blur(30px) brightness(2)", opacity: 0 },
          {
            scale: 1,
            filter: "blur(0px) brightness(1)",
            opacity: 1,
            duration: 1.5,
            ease: "power4.out",
          },
        )
          .to(splashLogoRef.current, {
            scale: 0.8,
            opacity: 0,
            filter: "blur(20px)",
            duration: 0.6,
            ease: "power2.in",
            delay: 0.3,
          })
          // Fade out splash overlay
          .to(
            splashRef.current,
            {
              opacity: 0,
              duration: 0.6,
              ease: "power2.inOut",
              onComplete: () => {
                if (splashRef.current) splashRef.current.style.display = "none";
                window.__titanSplashPlayed = true;
                setSplashDone(true);
              },
            },
            "-=0.2",
          );

        // Fade in form card
        tl.fromTo(
          formCardRef.current,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          "<0.3",
        );
      } else {
        // If already played, immediately hide splash and fade in form instantly
        if (splashRef.current) splashRef.current.style.display = "none";
        tl.fromTo(
          formCardRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: "power3.out" },
        );
        setSplashDone(true);
      }

      // Stagger in the form elements
      const validRefs = formElementsRef.current.filter(Boolean);
      if (validRefs.length) {
        tl.fromTo(
          validRefs,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
          },
          !hasPlayedSplash ? "-=0.5" : "-=0.2",
        );
      }

      // Ambient floating background elements (only if present in DOM)
      if (document.querySelector(".ambient-orb-1")) {
        gsap.to(".ambient-orb-1", {
          x: "random(-100, 100)",
          y: "random(-100, 100)",
          duration: "random(5, 10)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      if (document.querySelector(".ambient-orb-2")) {
        gsap.to(".ambient-orb-2", {
          x: "random(-100, 100)",
          y: "random(-100, 100)",
          duration: "random(6, 12)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const handleViewChange = (newView) => {
    Logger.interaction({
      action: "click",
      target: `view-${newView}`,
      component: "Login",
    });
    Logger.info("Login", `View changed: ${view} → ${newView}`);
    const isToForm = newView !== "initial";

    if (isToForm) {
      // Fade out current view
      gsap.to(viewContainerRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          flushSync(() => {
            setView(newView);
            setError(null);
            setSuccess(null);
            setEmail("");
            setPassword("");
            setName("");
          });

          // Fade in new view
          gsap.fromTo(
            viewContainerRef.current,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.4,
              ease: "power3.out",
            },
          );

          // Stagger in form children
          if (viewContainerRef.current && viewContainerRef.current.children) {
            gsap.fromTo(
              viewContainerRef.current.children,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.4,
                stagger: 0.06,
                delay: 0.1,
                ease: "power3.out",
                clearProps: "all",
              },
            );
          }
        },
      });
    } else {
      // Fade out form
      gsap.to(viewContainerRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          flushSync(() => {
            setView(newView);
          });

          // Fade in welcome view
          gsap.fromTo(
            viewContainerRef.current,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.4,
              ease: "power3.out",
            },
          );

          // Stagger in children
          if (viewContainerRef.current && viewContainerRef.current.children) {
            gsap.fromTo(
              viewContainerRef.current.children,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.4,
                stagger: 0.06,
                delay: 0.1,
                ease: "power3.out",
                clearProps: "all",
              },
            );
          }
        },
      });
    }
  };

  useEffect(() => {
    if (user) {
      if (user.role === "admin") navigate("/admin-dashboard");
      else navigate("/agent-dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    Logger.interaction({
      action: "submit",
      target: `${view}-form`,
      component: "Login",
    });
    Logger.info("Login", `Form submitted: ${view}`, { email });
    setError(null);
    setSuccess(null);

    const playErrorAnim = () => {
      gsap.fromTo(
        formCardRef.current,
        { x: -5 },
        {
          x: 5,
          duration: 0.1,
          repeat: 3,
          yoyo: true,
          onComplete: () => gsap.to(formCardRef.current, { x: 0 }),
        },
      );
    };

    if (view === "login") {
      if (!email || !password) {
        playErrorAnim();
        setError({ message: "Email and password are required." });
        return;
      }

      setLoading(true);
      const result = await login(email, password);
      setLoading(false);
      if (!result.success) {
        Logger.warn("Login", "Login failed", {
          error: result.error,
          message: result.message,
        });
        playErrorAnim();
        setError({ message: result.message, code: result.error });
      }
    } else {
      if (!name || !email || !password) {
        playErrorAnim();
        setError({ message: "Name, email, and password are required." });
        return;
      }

      setLoading(true);
      const result = await signupRequest(name, email, password);
      setLoading(false);
      if (!result.success) {
        Logger.warn("Login", "Signup failed", {
          error: result.error,
          message: result.message,
        });
        playErrorAnim();
        setError({ message: result.message, code: result.error });
      } else {
        setSuccess(result.message);
        setName("");
        setEmail("");
        setPassword("");
      }
    }
  };

  return (
    <div className="min-h-[100dvh] w-full overflow-hidden flex flex-col justify-center py-8 sm:py-12 sm:px-6 lg:px-8 relative bg-transparent transition-colors">
      {/* Splash Screen */}
      <div
        ref={splashRef}
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center no-theme-transition ${isDark ? "bg-black" : "bg-white"}`}
      >
        <img
          ref={splashLogoRef}
          src={isDark ? logoDark : logoLight}
          alt="Titan Logo"
          className="h-32 w-auto opacity-0"
        />
      </div>

      {/* ShaderGradient Background */}
      <div className="fixed inset-0 z-0">
        <GradientBackground opacity={1} variant="login" />
      </div>

      {/* Theme Toggle — liquid glass pill */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={toggleTheme}
        className="fixed top-6 right-6 z-30 w-10 h-10 rounded-full flex items-center justify-center text-[var(--titan-liquid-text)] transition-all cursor-pointer liquid-glass"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isDark ? "moon" : "sun"}
            initial={{ rotate: -90, opacity: 0, scale: 0 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0 }}
            transition={{ duration: 0.2 }}
          >
            {isDark ? (
              <Sun className="w-4 h-4" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </motion.div>
        </AnimatePresence>
      </motion.button>

      <div className="mt-8 sm:mt-0 sm:mx-auto sm:w-full sm:max-w-md relative z-20 w-full px-4 sm:px-0 perspective-1000">
        <div ref={formCardRef} className="opacity-0 transform-gpu w-full">
          <div ref={viewContainerRef} className="w-full">
            {view === "initial" ? (
              <div
                className="relative w-full rounded-[28px] px-6 sm:px-8 py-10 isolate transform-gpu overflow-visible liquid-glass"
                ref={(el) => (formElementsRef.current[1] = el)}
              >
                {/* Top specular highlight */}
                <div className="absolute top-0 left-[10%] right-[10%] h-px rounded-full pointer-events-none bg-[var(--titan-liquid-highlight)]" />

                <div
                  ref={(el) => (formElementsRef.current[0] = el)}
                  className="flex flex-col items-center justify-center mb-10"
                >
                  <motion.img
                    src={isDark ? logoDark : logoLight}
                    alt="Titan Logo"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="h-20 w-auto mb-6 cursor-pointer drop-shadow-sm"
                  />
                  <motion.h1
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="text-2xl sm:text-3xl font-extrabold text-[var(--titan-liquid-text)] tracking-[-0.04em] text-center leading-[1.1]"
                  >
                    Titan Chat System
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-[var(--titan-liquid-text-muted)] text-sm mt-2 tracking-[-0.01em]"
                  >
                    Please select an option to continue
                  </motion.p>
                </div>

                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.button
                    onClick={() => handleViewChange("login")}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3.5 rounded-2xl text-base font-semibold transition-all duration-300 cursor-pointer liquid-glass-btn-primary"
                  >
                    Log In
                  </motion.button>

                  <motion.button
                    onClick={() => handleViewChange("signup")}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3.5 rounded-2xl text-base font-semibold text-[var(--titan-liquid-text)] transition-all duration-300 cursor-pointer liquid-glass-btn"
                  >
                    Sign Up
                  </motion.button>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-[var(--titan-liquid-text-muted)] text-xs text-center mt-6 tracking-[-0.01em]"
                ></motion.p>
              </div>
            ) : (
              <div>
                {/* Liquid Glass Card */}
                <div className="relative w-full rounded-[28px] px-6 sm:px-8 py-8 isolate transform-gpu overflow-visible liquid-glass">
                  {/* Top specular highlight */}
                  <div className="absolute top-0 left-[10%] right-[10%] h-px rounded-full pointer-events-none bg-[var(--titan-liquid-highlight)]" />

                  <div className="flex items-center justify-center w-full mb-6 relative z-50 min-h-[32px]">
                    <motion.button
                      type="button"
                      onClick={() => handleViewChange("initial")}
                      whileTap={{ scale: 0.95 }}
                      className="absolute left-0 text-[var(--titan-liquid-text-muted)] font-medium transition-all focus:outline-none flex items-center group text-sm pointer-events-auto cursor-pointer"
                    >
                      <svg
                        className="w-4 h-4 mr-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                      Back
                    </motion.button>
                    <motion.img
                      src={isDark ? logoDark : logoLight}
                      alt="Titan Logo"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                        delay: 0.2,
                      }}
                      className="h-9 w-auto mx-auto"
                    />
                  </div>

                  <div className="text-center">
                    <CardHeader
                      ref={(el) => (formElementsRef.current[0] = el)}
                      title={view === "login" ? "Sign in" : "Create an account"}
                    />
                    <form
                      className="space-y-5 mt-4 text-left"
                      onSubmit={handleSubmit}
                    >
                      <AnimatePresence>
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, y: -10 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-l-4 border-[var(--titan-danger)] p-4 mb-4 rounded-xl overflow-hidden liquid-glass"
                          >
                            <p className="text-sm text-[var(--titan-danger)] font-medium">
                              {error.message}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <AnimatePresence>
                        {success && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, y: -10 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0 }}
                            className="border-l-4 border-[var(--titan-primary)]/30 p-4 mb-4 rounded-xl overflow-hidden liquid-glass"
                          >
                            <p className="text-sm text-[var(--titan-primary)] font-medium">
                              {success}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {view === "signup" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.3 }}
                        >
                          <label
                            htmlFor="fullName"
                            className="block text-sm font-medium text-[var(--titan-liquid-text)] mb-1.5 tracking-[-0.01em]"
                          >
                            Full Name
                          </label>
                          <input
                            id="fullName"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your full name"
                            className="appearance-none block w-full px-4 py-2.5 rounded-xl text-sm text-[var(--titan-liquid-text)] placeholder-[var(--titan-liquid-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--titan-liquid-text)]/20 transition-all duration-200 liquid-glass-input"
                          />
                        </motion.div>
                      )}

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-[var(--titan-liquid-text)] mb-1.5 tracking-[-0.01em]"
                        >
                          Email address
                        </label>
                        <input
                          id="email"
                          type="text"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder={
                            view === "signup"
                              ? "email@titan.co.in"
                              : "Enter your email"
                          }
                          className="appearance-none block w-full px-4 py-2.5 rounded-xl text-sm text-[var(--titan-liquid-text)] placeholder-[var(--titan-liquid-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--titan-liquid-text)]/20 transition-all duration-200 liquid-glass-input"
                        />
                        <AnimatePresence>
                          {view === "signup" &&
                            email &&
                            !email.toLowerCase().endsWith("@titan.co.in") && (
                              <motion.p
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="text-xs text-[var(--titan-liquid-text-muted)] mt-1"
                              >
                                Email must use @titan.co.in domain
                              </motion.p>
                            )}
                        </AnimatePresence>
                      </div>

                      <div>
                        <label
                          htmlFor="password"
                          className="block text-sm font-medium text-[var(--titan-liquid-text)] mb-1.5 tracking-[-0.01em]"
                        >
                          Password
                        </label>
                        <input
                          id="password"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          className="appearance-none block w-full px-4 py-2.5 rounded-xl text-sm text-[var(--titan-liquid-text)] placeholder-[var(--titan-liquid-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--titan-liquid-text)]/20 transition-all duration-200 liquid-glass-input"
                        />
                        {view === "signup" && (
                          <>
                            <PasswordStrengthBar
                              password={password}
                              isDark={isDark}
                            />
                            <ul className="text-xs mt-2 space-y-1 pl-1">
                              {[
                                {
                                  met: password.length >= 8,
                                  label: "At least 8 characters",
                                },
                                {
                                  met: /[A-Z]/.test(password),
                                  label: "One uppercase letter (A–Z)",
                                },
                                {
                                  met: /[a-z]/.test(password),
                                  label: "One lowercase letter (a–z)",
                                },
                                {
                                  met: /[0-9]/.test(password),
                                  label: "One number (0–9)",
                                },
                                {
                                  met: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(
                                    password,
                                  ),
                                  label: "One special character (!@#$…)",
                                },
                              ].map(({ met, label }) => (
                                <motion.li
                                  key={label}
                                  animate={{
                                    color: met
                                      ? "var(--titan-liquid-text)"
                                      : "var(--titan-liquid-text-muted)",
                                  }}
                                  transition={{ duration: 0.2 }}
                                  className="flex items-center gap-1.5"
                                >
                                  <motion.span
                                    animate={{ scale: met ? [1, 1.3, 1] : 1 }}
                                    className="inline-flex items-center justify-center w-4 h-4 text-[10px]"
                                  >
                                    {met ? "✓" : "○"}
                                  </motion.span>
                                  {label}
                                </motion.li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>

                      <div className="pt-4 pb-2">
                        <motion.button
                          type="submit"
                          disabled={loading}
                          whileTap={loading ? {} : { scale: 0.97 }}
                          className="w-full py-3 rounded-2xl text-base font-semibold transition-all duration-300 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed liquid-glass-btn-primary"
                        >
                          {loading ? (
                            <motion.span
                              animate={{ opacity: [1, 0.5, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              Please wait…
                            </motion.span>
                          ) : view === "login" ? (
                            "Sign in"
                          ) : (
                            "Request account"
                          )}
                        </motion.button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
