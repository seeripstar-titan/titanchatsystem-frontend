import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logoLight from "../../assets/titan2.png";
import logoDark from "../../assets/logo.png";
import {
  Home,
  MessageSquare,
  BarChart2,
  Code,
  Archive,
  Users,
  FileText,
  Puzzle,
  Settings,
  LogOut,
  Sun,
  Moon,
  Menu,
  X,
  ChevronsRight,
  ChevronsLeft,
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import Logger from "../../services/logger/Logger";
import { Download } from "lucide-react";

const iconMap = {
  Home: Home,
  Chats: MessageSquare,
  Insights: BarChart2,
  Develop: Code,
  Archives: Archive,
  Team: Users,
  Reports: FileText,
  Extensions: Puzzle,
  Settings: Settings,
};

const SidebarNav = ({ user, logout, navItems }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  const [expanded, setExpanded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hoveredNavIndex, setHoveredNavIndex] = useState(null);
  const navItemRefs = useRef([]);
  const dropdownRef = useRef(null);

  const getDockScale = (index) => {
    if (hoveredNavIndex === null) return 1;
    const distance = Math.abs(hoveredNavIndex - index);
    if (expanded) return distance === 0 ? 1.22 : distance === 1 ? 1.1 : 1;
    if (distance === 0) return 2.1;
    if (distance === 1) return 1.6;
    if (distance === 2) return 1.28;
    return 1;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* ── Desktop Sidebar — fixed icon dock (macOS style) ── */}
      <motion.aside
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`hidden md:flex fixed top-0 left-0 z-[999] h-screen flex-col items-center bg-[var(--titan-sidebar-bg)] backdrop-blur-xl border-r border-[var(--titan-card-border)] transition-[width] duration-300 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] overflow-visible ${expanded ? "w-[200px]" : "w-[80px]"}`}
        style={{ boxShadow: "var(--titan-neo-raised)" }}
      >
        {/* Logo */}
        <div className="flex items-center justify-center h-16 w-full shrink-0">
          <motion.div
            className="cursor-pointer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => navigate(navItems[0]?.path || "/")}
          >
            <img
              className="h-7 w-auto"
              src={isDark ? logoDark : logoLight}
              alt="Titan Logo"
            />
          </motion.div>
        </div>

        {/* Expand Toggle */}
        <motion.button
          onClick={() => setExpanded(!expanded)}
          whileHover={{ scale: 1.28 }}
          whileTap={{ scale: 0.9 }}
          className="w-8 h-8 flex items-center justify-center text-[var(--titan-primary)]/70 hover:text-[var(--titan-primary)] cursor-pointer mt-1 mb-1 transition-colors"
          title={expanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronsRight className="w-4 h-4" strokeWidth={2} />
          </motion.div>
        </motion.button>

        {/* Divider */}
        <div className="w-10 h-px bg-[var(--titan-card-border)]" />

        {/* Nav Items */}
        <nav className="flex-1 overflow-y-auto overflow-x-visible py-4 w-full flex flex-col items-center gap-4">
          {navItems.map((item, i) => {
            const isActive =
              location.pathname === item.path ||
              (item.path !== "/admin-dashboard" &&
                location.pathname.startsWith(item.path));
            const IconComponent = iconMap[item.label] || Settings;

            return (
              <motion.button
                key={item.label}
                ref={(el) => (navItemRefs.current[i] = el)}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0, scale: getDockScale(i) }}
                transition={{ type: "spring", stiffness: 420, damping: 26 }}
                onClick={() => {
                  Logger.nav({ from: location.pathname, to: item.path });
                  Logger.interaction({
                    action: "click",
                    target: item.label,
                    component: "TopNavBar",
                  });
                  navigate(item.path);
                }}
                whileTap={{ scale: 0.92 }}
                className={`relative flex items-center cursor-pointer outline-none transition-[transform,color] duration-200 ${
                  expanded
                    ? "w-[calc(100%-20px)] h-10 gap-3 px-3"
                    : "w-10 h-10 justify-center"
                } ${
                  isActive
                    ? "text-[var(--titan-primary)]"
                    : "text-[var(--titan-primary)]/55 hover:text-[var(--titan-primary)]"
                }`}
                style={{
                  zIndex: hoveredNavIndex === i ? 10 : 1,
                  filter:
                    hoveredNavIndex === i
                      ? "drop-shadow(0 10px 18px var(--titan-glow))"
                      : "none",
                }}
                onMouseEnter={() => {
                  setHoveredNavIndex(i);
                }}
                onMouseLeave={() => {
                  setHoveredNavIndex(null);
                }}
              >
                <IconComponent
                  className="w-5 h-5 relative z-10 shrink-0"
                  strokeWidth={isActive ? 2.2 : 1.8}
                />
                {expanded && (
                  <span className="relative z-10 text-sm font-medium whitespace-nowrap overflow-hidden">
                    {item.label}
                  </span>
                )}
              </motion.button>
            );
          })}
        </nav>

        {/* Dock-style tooltip — rendered via portal to avoid clipping */}
        {!expanded &&
          hoveredNavIndex !== null &&
          navItemRefs.current[hoveredNavIndex] &&
          createPortal(
            (() => {
              const rect =
                navItemRefs.current[hoveredNavIndex].getBoundingClientRect();
              return (
                <div
                  className="fixed pointer-events-none"
                  style={{
                    top: rect.top + rect.height / 2,
                    left: rect.right + 12,
                    transform: "translateY(-50%)",
                    zIndex: 99999,
                  }}
                >
                  <div
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap border text-[var(--titan-primary)] bg-[var(--titan-glass-bg)] border-[var(--titan-glass-border)]"
                    style={{
                      backdropFilter: "blur(30px) saturate(190%)",
                      WebkitBackdropFilter: "blur(30px) saturate(190%)",
                      boxShadow: "var(--titan-glass-shadow)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {navItems[hoveredNavIndex].label}
                  </div>
                </div>
              );
            })(),
            document.body,
          )}

        {/* Divider */}
        <div className="w-10 h-px bg-[var(--titan-card-border)]" />

        {/* Bottom Controls */}
        <div className="shrink-0 py-4 w-full flex flex-col items-center gap-3">
          {/* Theme Toggle */}
          <motion.button
            onClick={() => {
              Logger.interaction({
                action: "click",
                target: "theme-toggle",
                component: "TopNavBar",
                meta: { from: isDark ? "dark" : "light" },
              });
              toggleTheme();
            }}
            whileHover={{
              scale: 1.34,
              transition: { type: "spring", stiffness: 400, damping: 20 },
            }}
            whileTap={{ scale: 0.92 }}
            className="w-10 h-10 flex items-center justify-center text-[var(--titan-primary)]/60 hover:text-[var(--titan-primary)] transition-colors duration-200 cursor-pointer"
            title={isDark ? "Light Mode" : "Dark Mode"}
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
                  <Sun className="w-[18px] h-[18px]" />
                ) : (
                  <Moon className="w-[18px] h-[18px]" />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          {/* User / Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <motion.button
              whileHover={{
                scale: 1.28,
                transition: { type: "spring", stiffness: 400, damping: 20 },
              }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="w-10 h-10 flex items-center justify-center cursor-pointer transition-transform duration-200"
              title={user?.name || "User"}
            >
              <div className="w-6 h-6 rounded-full bg-[var(--titan-primary)] border border-[var(--titan-border-hover)] flex items-center justify-center text-[var(--titan-bg)] text-[11px] font-bold shadow-sm">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            </motion.button>

            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, x: -8, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -8, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="absolute left-full bottom-0 ml-3 w-52 rounded-2xl bg-[var(--titan-card-bg)] backdrop-blur-xl border border-[var(--titan-card-border)] z-[999] overflow-hidden"
                  style={{ boxShadow: "var(--titan-neo-raised)" }}
                >
                  <div className="px-3.5 py-2.5 border-b border-[var(--titan-card-border)]">
                    <p className="text-[10px] text-[var(--titan-text-muted)] uppercase tracking-wider">
                      Signed in as
                    </p>
                    <p className="text-xs font-medium text-[var(--titan-primary)] truncate mt-0.5">
                      {user?.email}
                    </p>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={() => {
                        Logger.interaction({
                          action: "click",
                          target: "export-logs",
                          component: "TopNavBar",
                        });
                        Logger.download("titan-logs.log");
                        setDropdownOpen(false);
                      }}
                      className="w-full text-left flex items-center px-3.5 py-2 text-xs text-[var(--titan-text-muted)] hover:bg-[var(--titan-hover)] hover:text-[var(--titan-primary)] transition-colors rounded-lg"
                    >
                      <Download
                        className="w-3.5 h-3.5 mr-2"
                        strokeWidth={1.5}
                      />
                      Export Logs
                    </button>
                    <button
                      onClick={() => {
                        Logger.interaction({
                          action: "click",
                          target: "logout",
                          component: "TopNavBar",
                        });
                        logout();
                      }}
                      className="w-full text-left flex items-center px-3.5 py-2 text-xs text-[var(--titan-danger)] transition-colors rounded-lg"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background =
                          "rgba(var(--titan-danger-rgb), 0.12)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "transparent";
                      }}
                    >
                      <LogOut className="w-3.5 h-3.5 mr-2" strokeWidth={1.5} />
                      Sign out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>

      {/* ── Mobile Header + Drawer ── */}
      <nav
        className="md:hidden fixed top-0 left-0 right-0 z-50 bg-[var(--titan-sidebar-bg)] backdrop-blur-xl border-b border-[var(--titan-card-border)] transition-colors"
        style={{ boxShadow: "var(--titan-neo-raised-sm)" }}
      >
        <div className="px-4 h-14 flex justify-between items-center w-full">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[var(--titan-text-muted)] hover:text-[var(--titan-primary)] bg-[var(--titan-button-bg)] border border-[var(--titan-card-border)] hover:border-[var(--titan-border-hover)] focus:outline-none p-2 rounded-xl transition-[border-color,box-shadow,color]"
            style={{ boxShadow: "var(--titan-neo-raised-sm)" }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mobileMenuOpen ? "close" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" strokeWidth={1.5} />
                ) : (
                  <Menu className="w-5 h-5" strokeWidth={1.5} />
                )}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          <img
            className="h-7 w-auto cursor-pointer"
            src={isDark ? logoDark : logoLight}
            alt="Titan Logo"
            onClick={() => navigate(navItems[0]?.path || "/")}
          />

          <div className="flex items-center gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="w-8 h-8 rounded-xl flex items-center justify-center text-[var(--titan-text-muted)] hover:text-[var(--titan-primary)] bg-[var(--titan-button-bg)] border border-[var(--titan-card-border)] hover:border-[var(--titan-border-hover)] transition-[border-color,color,box-shadow]"
              style={{ boxShadow: "var(--titan-neo-raised-sm)" }}
            >
              {isDark ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </motion.button>
            <div
              className="w-8 h-8 rounded-full bg-[var(--titan-primary)] border border-[var(--titan-border-hover)] flex items-center justify-center text-[var(--titan-bg)] text-xs font-semibold cursor-pointer shadow-sm"
              style={{ boxShadow: "var(--titan-neo-raised-sm)" }}
              onClick={() => {
                Logger.interaction({
                  action: "click",
                  target: "logout-mobile",
                  component: "TopNavBar",
                });
                logout();
              }}
            >
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 35 }}
            className="md:hidden fixed top-14 left-0 bottom-0 z-50 w-64 bg-[var(--titan-sidebar-bg)] backdrop-blur-xl border-r border-[var(--titan-card-border)] overflow-y-auto"
            style={{ boxShadow: "var(--titan-neo-raised)" }}
          >
            <div className="px-3 py-4 space-y-1.5">
              {navItems.map((item) => {
                const isActive =
                  location.pathname === item.path ||
                  (item.path !== "/admin-dashboard" &&
                    location.pathname.startsWith(item.path));
                const IconComponent = iconMap[item.label] || Settings;
                return (
                  <motion.button
                    key={item.label}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => {
                      Logger.nav({ from: location.pathname, to: item.path });
                      Logger.interaction({
                        action: "click",
                        target: item.label,
                        component: "TopNavBar-Mobile",
                      });
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    }}
                    className={`flex items-center w-full text-left px-4 py-2.5 rounded-2xl border font-medium text-sm transition-[border-color,background-color,box-shadow,color,transform] duration-200 ${
                      isActive
                        ? "text-[var(--titan-primary)] border-[var(--titan-border-hover)]"
                        : "text-[var(--titan-text-muted)] border-[var(--titan-card-border)] hover:text-[var(--titan-primary)] hover:border-[var(--titan-border-hover)]"
                    }`}
                    style={{
                      boxShadow: isActive
                        ? "var(--titan-neo-inset)"
                        : "var(--titan-neo-raised-sm)",
                      background: isActive
                        ? "var(--titan-neo-bg)"
                        : "var(--titan-button-bg)",
                    }}
                  >
                    <IconComponent
                      className="w-4 h-4 mr-3"
                      strokeWidth={isActive ? 2 : 1.5}
                    />
                    {item.label}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SidebarNav;
