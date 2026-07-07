import React, { useEffect, useRef } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Login } from "../features/auth";
import { AdminDashboard, AgentDashboard } from "../features/dashboard";
import { ProtectedRoute } from "../shared";
import AnimatedPage from "../shared/components/AnimatedPage";
import Logger from "../services/logger/Logger";

const App = () => {
  const location = useLocation();
  const prevPath = useRef(location.pathname);

  // Log every route change
  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      Logger.nav({ from: prevPath.current, to: location.pathname });
      prevPath.current = location.pathname;
    }
  }, [location.pathname]);

  // Use the first path segment to determine top-level route key
  const routeKey = location.pathname.split("/")[1] || "login";

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={routeKey}>
        <Route
          path="/login"
          element={
            <AnimatedPage variant="morphScale" duration={0.6}>
              <Login />
            </AnimatedPage>
          }
        />
        <Route
          path="/admin-dashboard/*"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/agent-dashboard/*"
          element={
            <ProtectedRoute allowedRoles={["agent"]}>
              <AgentDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
