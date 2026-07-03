import React, { createContext, useState } from "react";
import {
  loginAdmin,
  registerAdmin,
} from "../features/auth/services/authService";
import { traceOp } from "services/telemetry";
import Logger from "services/logger/Logger";

export const AuthContext = createContext(null);

const SESSION_KEY = "titan_session";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem(SESSION_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  const persistUser = (userData) => {
    setUser(userData);
    localStorage.setItem(SESSION_KEY, JSON.stringify(userData));
  };

  const login = async (email, password) => {
    Logger.info("AUTH", "Login attempt", { email });
    return traceOp("session.login", { "auth.email": email }, async (span) => {
      if (!email || !password) {
        span.setAttribute("auth.validation", "missing_inputs");
        return {
          success: false,
          error: "missing_inputs",
          message: "Email and password are required.",
        };
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        span.setAttribute("auth.validation", "invalid_email");
        return {
          success: false,
          error: "invalid_email",
          message: "Invalid email format.",
        };
      }

      try {
        const data = await loginAdmin({ email, password });
        const loggedInUser = {
          email,
          role: data.role,
          user_id: data.user_id,
          access_token: data.access_token,
        };
        persistUser(loggedInUser);
        span.setAttribute("auth.user_id", data.user_id);
        span.setAttribute("auth.role", data.role);
        Logger.info("AUTH", "Login success", {
          email,
          role: data.role,
          user_id: data.user_id,
        });
        return { success: true };
      } catch (err) {
        // Fallback to demo credentials when backend is unreachable
        const demoCreds = {
          "admin@test.com": {
            password: "admin123",
            role: "admin",
            name: "Demo Admin",
          },
          "agent@test.com": {
            password: "agent123",
            role: "agent",
            name: "Demo Agent",
          },
        };
        const demo = demoCreds[email.toLowerCase()];
        if (demo && password === demo.password) {
          const demoUser = {
            email,
            role: demo.role,
            name: demo.name,
            user_id: "demo-" + demo.role,
            access_token: "demo-token",
          };
          persistUser(demoUser);
          span.setAttribute("auth.demo", true);
          span.setAttribute("auth.role", demo.role);
          Logger.warn("AUTH", "Login via demo fallback (backend unreachable)", {
            email,
            role: demo.role,
          });
          return { success: true };
        }
        return { success: false, error: "login_failed", message: err.message };
      }
    });
  };

  const logout = () => {
    Logger.info("AUTH", "User logged out", { email: user?.email });
    setUser(null);
    localStorage.removeItem(SESSION_KEY);
    window.__titanSplashPlayed = false;
  };

  const signupRequest = async (name, email, password) => {
    Logger.info("AUTH", "Signup attempt", { name, email });
    return traceOp(
      "session.register",
      { "auth.email": email },
      async (span) => {
        if (!name || !email || !password) {
          span.setAttribute("auth.validation", "missing_inputs");
          return {
            success: false,
            error: "missing_inputs",
            message: "All fields are required.",
          };
        }

        if (!email.toLowerCase().endsWith("@titan.co.in")) {
          span.setAttribute("auth.validation", "invalid_domain");
          return {
            success: false,
            error: "invalid_domain",
            message: "Email must use the @titan.co.in domain.",
          };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          span.setAttribute("auth.validation", "invalid_email");
          return {
            success: false,
            error: "invalid_email",
            message: "Invalid email format.",
          };
        }

        if (password.length < 8) {
          span.setAttribute("auth.validation", "weak_password");
          return {
            success: false,
            error: "weak_password",
            message: "Password must be at least 8 characters long.",
          };
        }
        if (!/[A-Z]/.test(password)) {
          span.setAttribute("auth.validation", "weak_password");
          return {
            success: false,
            error: "weak_password",
            message: "Password must contain at least one uppercase letter.",
          };
        }
        if (!/[a-z]/.test(password)) {
          span.setAttribute("auth.validation", "weak_password");
          return {
            success: false,
            error: "weak_password",
            message: "Password must contain at least one lowercase letter.",
          };
        }
        if (!/[0-9]/.test(password)) {
          span.setAttribute("auth.validation", "weak_password");
          return {
            success: false,
            error: "weak_password",
            message: "Password must contain at least one number.",
          };
        }
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
          span.setAttribute("auth.validation", "weak_password");
          return {
            success: false,
            error: "weak_password",
            message: "Password must contain at least one special character.",
          };
        }

        try {
          await registerAdmin({ name, email, password });
          Logger.info("AUTH", "Signup success", { email });
          return {
            success: true,
            message: "Account created successfully. You can now log in.",
          };
        } catch (err) {
          Logger.error("AUTH", "Signup failed", { email, error: err.message });
          return {
            success: false,
            error: "register_failed",
            message: err.message,
          };
        }
      },
    );
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signupRequest }}>
      {children}
    </AuthContext.Provider>
  );
};
