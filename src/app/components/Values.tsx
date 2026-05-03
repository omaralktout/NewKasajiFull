import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Users2, Lightbulb, BarChart3, Award, Leaf, ArrowRight, ChevronRight } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";

const VALUE_ICONS = [Users2, Lightbulb, BarChart3, Award, Leaf];
const VALUE_COLORS = [
  { color: "#7C3AED", bg: "rgba(124,58,237,0.1)", border: "rgba(124,58,237,0.2)" },
  { color: "#0EA5E9", bg: "rgba(14,165,233,0.1)",  border: "rgba(14,165,233,0.2)" },
  { color: "#8B5CF6", bg: "rgba(139,92,246,0.1)",  border: "rgba(139,92,246,0.2)" },
  { color: "#6366F1", bg: "rgba(99,102,241,0.1)",  border: "rgba(99,102,241,0.2)" },
  { color: "#0EA5E9", bg: "rgba(14,165,233,0.1)",  border: "rgba(14,165,233,0.2)" },
];

export function Values() {
  const [isVisible, setIsVisible] = useState(false);
  const { T } = useLang();
  const TV = T.values;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.08 }
    );
    const el = document.getElementById("values");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="values" className="py-24 px-5 sm:px-8 bg-white relative overflow-hidden">
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg,transparent,rgba(124,58,237,0.2),rgba(14,165,233,0.2),transparent)" }} />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs mb-5"
            style={{
              background: "rgba(124,58,237,0.07)",
              border: "1px solid rgba(124,58,237,0.18)",
              color: "#7C3AED",
              fontWeight: 600,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            {TV.badge}
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 text-slate-900 tracking-tight">
            <span
              style={{
                background: "linear-gradient(135deg,#7C3AED,#0EA5E9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {TV.title}
            </span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {TV.subtitle}
          </p>
        </motion.div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-20">
          {TV.items.map((value, index) => {
            const Icon = VALUE_ICONS[index];
            const c = VALUE_COLORS[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 32 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, transition: { duration: 0.22 } }}
                className="group relative rounded-2xl p-6 text-center cursor-default"
                style={{
                  background: "white",
                  border: "1px solid #eeeff4",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  transition: "box-shadow 0.3s, border-color 0.3s",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 32px rgba(${c.color.replace('#','').match(/.{2}/g)?.map(x=>parseInt(x,16)).join(',')},0.15)`;
                  (e.currentTarget as HTMLElement).style.borderColor = c.border;
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)";
                  (e.currentTarget as HTMLElement).style.borderColor = "#eeeff4";
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-6 right-6 h-0.5 rounded-b-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: `linear-gradient(90deg,transparent,${c.color},transparent)` }}
                />

                {/* Icon */}
                <motion.div
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 0.25 }}
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
                  style={{ background: c.bg, border: `1px solid ${c.border}` }}
                >
                  <Icon className="w-6 h-6" style={{ color: c.color }} strokeWidth={1.8} />
                </motion.div>

                <h3
                  className="text-sm mb-2 text-slate-800 leading-snug"
                  style={{ fontWeight: 700 }}
                >
                  {value.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed" style={{ fontWeight: 400 }}>
                  {value.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Block */}
        <motion.div
          initial={{ opacity: 0, y: 48 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="relative rounded-3xl overflow-hidden p-12 text-center text-white"
          style={{ background: "linear-gradient(135deg, #5B21B6 0%, #7C3AED 35%, #2563EB 70%, #0EA5E9 100%)" }}
        >
          {/* Mesh overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.08) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255,255,255,0.06) 0%, transparent 50%)`,
            }}
          />
          {/* Glowing orbs */}
          <motion.div
            className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: "rgba(255,255,255,0.07)", filter: "blur(40px)" }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 5, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 left-0 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: "rgba(255,255,255,0.06)", filter: "blur(35px)" }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 6, repeat: Infinity }}
          />

          <div className="relative">
            <h3 className="text-3xl md:text-4xl mb-4 tracking-tight" style={{ fontWeight: 800 }}>
              {TV.cta.title}
            </h3>
            <p className="text-lg mb-10 max-w-2xl mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.78)" }}>
              {TV.cta.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="group flex items-center gap-2 px-7 py-3.5 rounded-xl text-purple-700 bg-white hover:bg-purple-50 transition-colors shadow-lg"
                style={{ fontWeight: 700, fontSize: "0.95rem" }}
              >
                {TV.cta.btn1}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                className="group flex items-center gap-2 px-7 py-3.5 rounded-xl text-white border-2 border-white/30 hover:border-white/60 hover:bg-white/10 transition-all"
                style={{ fontWeight: 600, fontSize: "0.95rem" }}
              >
                {TV.cta.btn2}
                <ChevronRight className="w-4 h-4 text-white/70 transition-transform group-hover:translate-x-0.5" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
