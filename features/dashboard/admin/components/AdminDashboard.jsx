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
import TopNavBar from "../../../../shared/components/TopNavBar";
import GradientBackground from "../../../../shared/components/GradientBackground";
import AnimatedPage from "../../../../shared/components/AnimatedPage";
import SkeletonLoader from "../../../../shared/components/SkeletonLoader";
import logoLight from "../../../../assets/titan2.png";
import logoDark from "../../../../assets/logo.png";

// Lazy-loaded Component Pages for better performance and smaller initial bundle sizing
const Home = lazy(() => import("../../../../pages/Home"));
const Chats = lazy(() => import("../../../chat/pages/Chats"));
const Insights = lazy(() => import("../../../analytics/pages/Insights"));
const Develop = lazy(() => import("../../../platform/pages/Develop"));
const Archives = lazy(() => import("../../../chat/pages/Archives"));
const Team = lazy(() => import("../../../team/pages/Team"));
const Reports = lazy(() => import("../../../analytics/pages/Reports"));
const Extensions = lazy(() => import("../../../platform/pages/Extensions"));
const Settings = lazy(() => import("../../../settings/pages/Settings"));

// Determine animation variant based on route index for mixed transitions
const routeVariants = [
  "fadeUp",
  "slideLeft",
  "morphScale",
  "slideLeft",
  "fadeUp",
  "slideLeft",
  "morphScale",
  "slideLeft",
  "fadeUp",
];

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const { isDark } = useTheme();
  const location = useLocation();

  const [showSplash, setShowSplash] = useState(true);
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
    const paths = [
      "/",
      "/chats",
      "/insights",
      "/develop",
      "/archives",
      "/team",
      "/reports",
      "/extensions",
      "/settings",
    ];
    const currentSub = location.pathname.replace("/admin-dashboard", "") || "/";
    const idx = paths.indexOf(currentSub);
    return routeVariants[idx >= 0 ? idx : 0];
  };

  const adminNavItems = [
    { label: "Home", path: "/admin-dashboard" },
    { label: "Chats", path: "/admin-dashboard/chats" },
    { label: "Insights", path: "/admin-dashboard/insights" },
    { label: "Develop", path: "/admin-dashboard/develop" },
    { label: "Archives", path: "/admin-dashboard/archives" },
    { label: "Team", path: "/admin-dashboard/team" },
    { label: "Reports", path: "/admin-dashboard/reports" },
    { label: "Extensions", path: "/admin-dashboard/extensions" },
  ];

  return (
    <div className="min-h-screen relative w-full flex font-sans bg-[var(--titan-bg)] transition-colors">
      {/* Splash Screen */}
      <div
        ref={splashRef}
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center no-theme-transition ${isDark ? "bg-black" : "bg-white"}`}
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
      <TopNavBar user={user} logout={logout} navItems={adminNavItems} />

      {/* Content Area — offset by sidebar width */}
      <main
        ref={contentRef}
        data-main-content
        className="relative z-10 flex-grow h-screen overflow-y-auto pl-0 md:pl-[96px] pt-14 md:pt-0 pr-4 sm:pr-6 lg:pr-8 opacity-0 transition-[padding] duration-300"
      >
        <div className="max-w-[1600px] mx-auto h-[calc(100vh-3.5rem)] md:h-screen py-4 md:py-6 2xl:py-8">
          <Suspense fallback={<SkeletonLoader type="page" />}>
            <AnimatePresence mode="wait">
              <AnimatedPage key={location.pathname} variant={getRouteVariant()}>
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/chats" element={<Chats />} />
                  <Route path="/insights" element={<Insights />} />
                  <Route path="/develop" element={<Develop />} />
                  <Route path="/archives" element={<Archives />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/reports" element={<Reports />} />
                  <Route path="/extensions" element={<Extensions />} />
                  <Route path="/settings" element={<Settings />} />
                </Routes>
              </AnimatedPage>
            </AnimatePresence>
          </Suspense>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
