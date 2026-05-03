import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Globe, Menu, X, ArrowRight } from "lucide-react";
import { KasajiLogo } from "./KasajiLogo";
import { useLang } from "../contexts/LanguageContext";

const NAV_ITEMS = [
  { label: "Kasaji AI",      href: "#kasaji-ai",       id: "kasaji-ai" },
  { label: "Kasaji XM",      href: "#kasaji-xm",       id: "kasaji-xm" },
  { label: "Kasaji Academy", href: "#kasaji-academy",  id: "kasaji-academy" },
];

export function Header() {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [activeId, setActiveId]       = useState<string | null>(null);
  const { toggleLang, isAr, T }       = useLang();

  // ── Scroll detection ──────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Close mobile on resize ─────────────────────────
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNavClick = (id: string, href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveId(id);
    setMobileOpen(false);
    // Smooth scroll to section
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const isScrolledOrOpen = scrolled || mobileOpen;

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: isScrolledOrOpen
            ? "rgba(255,255,255,0.97)"
            : "transparent",
          backdropFilter: isScrolledOrOpen ? "blur(20px) saturate(180%)" : "none",
          borderBottom: isScrolledOrOpen
            ? "1px solid rgba(226,232,240,0.8)"
            : "1px solid transparent",
          boxShadow: isScrolledOrOpen
            ? "0 1px 20px rgba(0,0,0,0.07)"
            : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-6">

          {/* ── Logo ── */}
          <a href="#" className="flex items-center gap-2.5 shrink-0 group">
            <KasajiLogo size={32} variant="color" />
            <span
              className="text-lg tracking-tight whitespace-nowrap"
              style={{
                background: "linear-gradient(90deg,#7C3AED,#0EA5E9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 700,
              }}
            >
              Kasaji &amp; Company
            </span>
          </a>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-1" style={{ fontFamily: "'Plus Jakarta Sans', 'Cairo', sans-serif" }}>
            {NAV_ITEMS.map((item, i) => {
              const isActive = activeId === item.id;
              return (
                <motion.a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(item.id, item.href, e)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                  className="relative px-4 py-2 rounded-lg whitespace-nowrap select-none cursor-pointer"
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? "#7C3AED" : "#475569",
                    background: isActive ? "rgba(124,58,237,0.07)" : "transparent",
                    transition: "color 0.2s, background 0.2s, font-weight 0.1s",
                  }}
                  onMouseEnter={e => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.background = "rgba(241,245,249,0.9)";
                  }}
                  onMouseLeave={e => {
                    if (!isActive) (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  {/* Active indicator dot */}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavDot"
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: "#7C3AED" }}
                      transition={{ type: "spring", bounce: 0.4, duration: 0.35 }}
                    />
                  )}
                  {item.label}
                </motion.a>
              );
            })}
          </nav>

          {/* ── Actions ── */}
          <motion.div
            initial={{ opacity: 0, x: isAr ? -16 : 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="hidden md:flex items-center gap-3"
          >
            {/* Language toggle */}
            <motion.button
              onClick={toggleLang}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm"
              style={{
                color: "#7C3AED",
                border: "1.5px solid rgba(124,58,237,0.28)",
                background: "rgba(124,58,237,0.05)",
                fontWeight: 600,
                transition: "all 0.2s",
              }}
            >
              <Globe className="w-3.5 h-3.5" />
              {isAr ? "English" : "عربي"}
            </motion.button>

            {/* Sign in */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-1.5 text-sm rounded-lg"
              style={{
                color: "#475569",
                fontWeight: 500,
                transition: "background 0.2s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#f8fafc")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              {T.nav.signIn}
            </motion.button>

            {/* Get started */}
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              className="relative flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm text-white overflow-hidden"
              style={{
                background: "linear-gradient(135deg,#7C3AED,#0EA5E9)",
                fontWeight: 600,
                boxShadow: "0 2px 12px rgba(124,58,237,0.35)",
              }}
            >
              <motion.span
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)" }}
                initial={{ x: "-100%" }}
                whileHover={{ x: "200%" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              <span className="relative">{T.nav.getStarted}</span>
              <ArrowRight className="relative w-3.5 h-3.5" />
            </motion.button>
          </motion.div>

          {/* ── Mobile controls ── */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggleLang}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs"
              style={{
                color: "#7C3AED",
                border: "1.5px solid rgba(124,58,237,0.28)",
                background: "rgba(124,58,237,0.05)",
                fontWeight: 600,
              }}
            >
              <Globe className="w-3 h-3" />
              {isAr ? "EN" : "عر"}
            </button>
            <button
              onClick={() => setMobileOpen(o => !o)}
              className="p-2 rounded-lg"
              style={{ color: "#475569" }}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-16 left-3 right-3 z-40 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.98)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(226,232,240,0.9)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
            }}
          >
            <div className="p-4">
              <nav className="flex flex-col gap-1 mb-4">
                {NAV_ITEMS.map((item, i) => {
                  const isActive = activeId === item.id;
                  return (
                    <motion.a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => handleNavClick(item.id, item.href, e)}
                      initial={{ opacity: 0, x: isAr ? 12 : -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      className="flex items-center justify-between px-4 py-3 rounded-xl"
                      style={{
                        color: isActive ? "#7C3AED" : "#374151",
                        background: isActive ? "rgba(124,58,237,0.07)" : "transparent",
                        fontWeight: isActive ? 700 : 500,
                        fontSize: "0.9rem",
                      }}
                    >
                      {item.label}
                      {isActive && <span className="w-1.5 h-1.5 rounded-full" style={{ background: "#7C3AED" }} />}
                    </motion.a>
                  );
                })}
              </nav>
              <div
                className="flex flex-col gap-2 pt-3"
                style={{ borderTop: "1px solid rgba(226,232,240,0.6)" }}
              >
                <button
                  className="py-2.5 text-sm rounded-xl"
                  style={{ color: "#374151", fontWeight: 500 }}
                >
                  {T.nav.signIn}
                </button>
                <button
                  className="py-2.5 text-sm text-white rounded-xl"
                  style={{
                    background: "linear-gradient(135deg,#7C3AED,#0EA5E9)",
                    fontWeight: 600,
                    boxShadow: "0 2px 12px rgba(124,58,237,0.3)",
                  }}
                >
                  {T.nav.getStarted}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}