import React, {
  useContext,
  Suspense,
  lazy,
  useEffect,
  useRef,
  useState,
} from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { AuthContext } from "../../../../context/AuthContext";
import { useTheme } from "../../../../context/ThemeContext";
import { AgentStatusProvider } from "../../../../context/AgentStatusContext";
import TopNavBar from "../../../../shared/components/TopNavBar";
import GradientBackground from "../../../../shared/components/GradientBackground";
import AnimatedPage from "../../../../shared/components/AnimatedPage";
import SkeletonLoader from "../../../../shared/components/SkeletonLoader";
import ChatNotificationPopup from "../../../chat/components/ChatNotificationPopup";
import AgentStatusToggle from "./AgentStatusToggle";
import logoLight from "../../../../assets/titan2.png";
import logoDark from "../../../../assets/logo.png";

// Lazy-loaded pages — agent has access to Home, Chats, Archives, Reports, and Account Settings only
const AgentHome = lazy(() => import("../pages/AgentHome"));
const Chats = lazy(() => import("../../../chat/pages/Chats"));
const Archives = lazy(() => import("../../../chat/pages/Archives"));
const AgentReports = lazy(
  () => import("../../../analytics/pages/AgentReports"),
);
const AgentSettings = lazy(
  () => import("../../../settings/pages/AgentSettings"),
);

// Determine animation variant based on route index for mixed transitions
const routeVariants = [
  "fadeUp",
  "slideLeft",
  "slideLeft",
  "slideLeft",
  "fadeUp",
];

const AgentDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const { isDark } = useTheme();
  const location = useLocation();

  const [showSplash, setShowSplash] = useState(true);
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const splashRef = useRef(null);
  const splashLogoRef = useRef(null);
  const contentRef = useRef(null);

  // Splash screen and entry animation GSAP sequence
  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(splashLogoRef.current, {
      scale: 1.05,
      opacity: 1,
      duration: 0.8,
      yoyo: true,
      repeat: 1,
      ease: "power1.inOut",
    })
      .to(splashLogoRef.current, {
        scale: 0.5,
        opacity: 0,
        duration: 0.4,
        ease: "back.in(1.5)",
      })
      .to(
        splashRef.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: () => {
            if (splashRef.current) splashRef.current.style.display = "none";
            setShowSplash(false);
          },
        },
        "-=0.2",
      )
      .fromTo(
        contentRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.2",
      );
  }, []);

  // Get current route index for determining animation variant
  const getRouteVariant = () => {
    const paths = ["/", "/chats", "/archives", "/reports", "/settings"];
    const currentSub = location.pathname.replace("/agent-dashboard", "") || "/";
    const idx = paths.indexOf(currentSub);
    return routeVariants[idx >= 0 ? idx : 0];
  };

  const agentNavItems = [
    { label: "Home", path: "/agent-dashboard" },
    { label: "Chats", path: "/agent-dashboard/chats" },
    { label: "Archives", path: "/agent-dashboard/archives" },
    { label: "Reports", path: "/agent-dashboard/reports" },
  ];

  return (
    <AgentStatusProvider>
      <div className="min-h-screen relative w-full flex font-sans bg-[var(--titan-bg)] transition-colors">
        {/* Splash Screen */}
        <div
          ref={splashRef}
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center no-theme-transition ${isDark ? "bg-black" : "bg-white"}`}
        >
          <img
            ref={splashLogoRef}
            src={isDark ? logoDark : logoLight}
            alt="Titan Logo"
            className="h-32 w-auto opacity-0"
          />
        </div>

        {/* Background */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <GradientBackground opacity={0.92} variant="dashboard" />
        </div>

        {/* Sidebar Nav */}
        <TopNavBar
          user={user}
          logout={logout}
          navItems={agentNavItems}
          onExpandChange={setSidebarExpanded}
        />

        {/* Agent Status Toggle — fixed top-right */}
        <AgentStatusToggle />

        {/* Chat Notification Popups */}
        <ChatNotificationPopup />

        {/* Content Area — offset by sidebar width */}
        <main
          ref={contentRef}
          data-main-content
          className={`relative z-10 flex-grow h-screen overflow-y-auto pt-14 md:pt-0 pr-4 sm:pr-6 lg:pr-8 opacity-0 transition-[padding] duration-300 ${sidebarExpanded ? "pl-0 md:pl-[216px]" : "pl-0 md:pl-[96px]"}`}
        >
          <div className="max-w-[1600px] mx-auto h-[calc(100vh-3.5rem)] md:h-screen py-4 md:py-6 2xl:py-8">
            <Suspense fallback={<SkeletonLoader type="page" />}>
              <AnimatePresence mode="wait">
                <AnimatedPage
                  key={location.pathname}
                  variant={getRouteVariant()}
                >
                  <Routes location={location}>
                    <Route path="/" element={<AgentHome />} />
                    <Route path="/chats" element={<Chats />} />
                    <Route path="/archives" element={<Archives />} />
                    <Route path="/reports" element={<AgentReports />} />
                    <Route path="/settings" element={<AgentSettings />} />
                  </Routes>
                </AnimatedPage>
              </AnimatePresence>
            </Suspense>
          </div>
        </main>
      </div>
    </AgentStatusProvider>
  );
};

export default AgentDashboard;
