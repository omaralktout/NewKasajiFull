import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";

export function Hero() {
  const { T, isAr } = useLang();
  const ref = useRef<HTMLElement>(null);

  // Parallax scroll transforms
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY      = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const orb1Y    = useTransform(scrollYProgress, [0, 1], ["0px", "120px"]);
  const orb2Y    = useTransform(scrollYProgress, [0, 1], ["0px", "80px"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0px", "60px"]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-white min-h-screen flex items-center">

      {/* ── Parallax background layer ──────────────────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        {/* Grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(124,58,237,0.035) 1px, transparent 1px),
              linear-gradient(90deg, rgba(124,58,237,0.035) 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />

        {/* Orb 1 — top left */}
        <motion.div
          className="absolute"
          style={{
            top: "-10%", left: "-8%",
            width: "55vw", height: "55vw", maxWidth: 700,
            background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 65%)",
            y: orb1Y,
          }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Orb 2 — top right */}
        <motion.div
          className="absolute"
          style={{
            top: "5%", right: "-5%",
            width: "45vw", height: "45vw", maxWidth: 580,
            background: "radial-gradient(circle, rgba(14,165,233,0.08) 0%, transparent 65%)",
            y: orb2Y,
          }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Radial spotlight at top center */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[60vh]"
          style={{
            background: "radial-gradient(ellipse 55% 50% at 50% 0%, rgba(124,58,237,0.06) 0%, transparent 100%)",
          }}
        />

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48"
          style={{ background: "linear-gradient(0deg, white 0%, transparent 100%)" }}
        />
      </motion.div>

      {/* ── Content ────────────────────────────────────── */}
      <motion.div
        className="relative w-full max-w-5xl mx-auto px-5 sm:px-8 pt-32 pb-20"
        style={{ y: contentY }}
      >
        <div className="text-center">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8"
            style={{
              background: "linear-gradient(135deg,rgba(124,58,237,0.08),rgba(14,165,233,0.08))",
              border: "1px solid rgba(124,58,237,0.18)",
            }}
          >
            <motion.span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: "linear-gradient(135deg,#7C3AED,#0EA5E9)" }}
              animate={{ scale: [1, 1.8, 1], opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-sm" style={{ color: "#7C3AED", fontWeight: 500 }}>
              {T.hero.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <div className="overflow-hidden mb-2 -mx-2 px-2 pb-3">
            <motion.h1
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl md:text-7xl leading-[1.06] tracking-tight"
            >
              <span className="text-slate-900">{T.hero.titleLine1}</span>
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-8 -mx-2 px-2 pb-3">
            <motion.h1
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl md:text-7xl leading-[1.06] tracking-tight"
              style={{
                background: "linear-gradient(135deg,#7C3AED 0%,#6366f1 45%,#0EA5E9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {T.hero.titleLine2}
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28 }}
            className="text-lg sm:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {T.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`flex flex-col sm:flex-row items-center justify-center gap-3 ${isAr ? "sm:flex-row-reverse" : ""}`}
          >
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="group relative flex items-center gap-2 px-7 py-3.5 rounded-xl text-white overflow-hidden"
              style={{
                background: "linear-gradient(135deg,#7C3AED,#0EA5E9)",
                fontWeight: 600,
                fontSize: "0.95rem",
                boxShadow: "0 4px 20px rgba(124,58,237,0.35)",
              }}
            >
              <motion.span
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)" }}
                initial={{ x: "-100%" }}
                whileHover={{ x: "200%" }}
                transition={{ duration: 0.65, ease: "easeOut" }}
              />
              <span className="relative">{T.hero.cta1}</span>
              <ArrowRight className="relative w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-white transition-all hover:bg-slate-50"
              style={{
                border: "1.5px solid #e2e8f0",
                color: "#1e293b",
                fontWeight: 600,
                fontSize: "0.95rem",
              }}
            >
              {T.hero.cta2}
              <ChevronRight className="w-4 h-4 text-slate-400 transition-transform group-hover:translate-x-0.5" />
            </motion.button>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}