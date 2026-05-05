import {
  motion,
  useInView,
} from "motion/react";
import { useRef, useEffect, useState } from "react";
import {
  Check, ArrowUpRight, Sparkles,
  Brain, HeartHandshake, GraduationCap,
  Cpu, Zap, TrendingUp, Activity,
  Heart, MessageSquare, Star,
  BookOpen, BarChart3, Target, Users, Stethoscope,
} from "lucide-react";
import { useLang } from "../contexts/LanguageContext";

// ─────────────────────────────────────────────────────────────────
//  Detect mobile
// ─────────────────────────────────────────────────────────────────
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 1024 : false
  );
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

// ────────────────────────────────────────────────────────────────
//  AI Animation
// ─────────────────────────────────────────────────────────────────
function AIAnimation({ isActive }: { isActive: boolean }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (!isActive) { setStep(0); return; }
    const ts = [
      setTimeout(() => setStep(1), 500),
      setTimeout(() => setStep(2), 1900),
      setTimeout(() => setStep(3), 3200),
      setTimeout(() => setStep(4), 4500),
    ];
    return () => ts.forEach(clearTimeout);
  }, [isActive]);

  const metrics = [
    { icon: TrendingUp, label: "94%",  sub: "Satisfaction", color: "#7C3AED" },
    { icon: Zap,        label: "2.4s", sub: "Response",     color: "#6366f1" },
    { icon: Activity,   label: "Live", sub: "Analytics",    color: "#0EA5E9" },
  ];

  return (
    <div className="select-none space-y-3">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
        transition={{ duration: 0.45 }}
        className="flex items-center gap-2.5 px-1"
      >
        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg,#5B21B6,#7C3AED)" }}>
          <Cpu className="w-4 h-4 text-white" strokeWidth={1.8} />
        </div>
        <span className="text-slate-700 text-sm" style={{ fontWeight: 700 }}>AI Analysis Engine</span>
        <div className="ml-auto flex items-center gap-1.5">
          <motion.div className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            animate={isActive ? { opacity: [1, 0.3, 1] } : { opacity: 0.3 }}
            transition={{ duration: 1.5, repeat: Infinity }} />
          <span className="text-xs text-emerald-500" style={{ fontWeight: 600 }}>Live</span>
        </div>
      </motion.div>

      <div className="space-y-2">
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={step >= 1 ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
          transition={{ duration: 0.4 }}
          className="flex justify-end"
        >
          <div className="text-xs px-3 py-2 rounded-2xl rounded-tr-sm max-w-[85%]"
            style={{ background: "linear-gradient(135deg,#5B21B6,#7C3AED)", color: "white", fontWeight: 500 }}>
            Analyze patient satisfaction trends for Q1
          </div>
        </motion.div>

        {step >= 1 && (
          <motion.div
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }} className="flex items-end gap-2"
          >
            <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
              style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.2)" }}>
              <Brain className="w-3.5 h-3.5" style={{ color: "#7C3AED" }} strokeWidth={1.8} />
            </div>
            <div className="text-xs px-3 py-2 rounded-2xl rounded-tl-sm max-w-[85%]"
              style={{ background: "white", border: "1px solid rgba(124,58,237,0.12)", color: "#475569" }}>
              {step < 2 ? (
                <span className="flex gap-1 items-center">
                  {[0, 1, 2].map(i => (
                    <motion.span key={i} className="w-1.5 h-1.5 rounded-full inline-block"
                      style={{ background: "#7C3AED" }}
                      animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.2 }} />
                  ))}
                </span>
              ) : "Analysis complete. Patient satisfaction rose +12% driven by faster response times."}
            </div>
          </motion.div>
        )}
      </div>

      <motion.div
        animate={step >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: 0.5 }} className="grid grid-cols-3 gap-2 pt-1"
      >
        {metrics.map((m, i) => (
          <motion.div key={i}
            animate={step >= 3 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="flex flex-col items-center gap-1 py-2.5 rounded-xl"
            style={{
              background: `rgba(${m.color === "#7C3AED" ? "124,58,237" : m.color === "#6366f1" ? "99,102,241" : "14,165,233"},0.07)`,
              border: `1px solid rgba(${m.color === "#7C3AED" ? "124,58,237" : m.color === "#6366f1" ? "99,102,241" : "14,165,233"},0.15)`,
            }}>
            <m.icon className="w-3.5 h-3.5" style={{ color: m.color }} strokeWidth={2} />
            <span className="text-slate-800 tabular-nums" style={{ fontWeight: 800, fontSize: "0.8rem" }}>{m.label}</span>
            <span className="text-slate-400" style={{ fontSize: "0.6rem", fontWeight: 500 }}>{m.sub}</span>
          </motion.div>
        ))}
      </motion.div>

      {step >= 4 && (
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="flex items-center gap-2 px-3 py-2.5 rounded-xl"
          style={{ background: "rgba(124,58,237,0.06)", border: "1px solid rgba(124,58,237,0.14)" }}>
          <Zap className="w-3.5 h-3.5 shrink-0" style={{ color: "#7C3AED" }} strokeWidth={2} />
          <span className="text-xs" style={{ color: "#5B21B6", fontWeight: 600 }}>28 actionable insights generated</span>
          <motion.span className="ml-auto text-xs px-2 py-0.5 rounded-full"
            style={{ background: "rgba(124,58,237,0.12)", color: "#7C3AED", fontWeight: 700 }}
            animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }}>
            New
          </motion.span>
        </motion.div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  XM Animation
// ─────────────────────────────────────────────────────────────────
function XMAnimation({ isActive }: { isActive: boolean }) {
  const metrics = [
    { icon: Heart,         label: "Patient Satisfaction", value: 94, color: "#0EA5E9", delay: 0.3  },
    { icon: Users,         label: "Staff Experience",     value: 88, color: "#7C3AED", delay: 0.55 },
    { icon: MessageSquare, label: "Response Quality",     value: 97, color: "#06B6D4", delay: 0.8  },
  ];
  const reviews = [
    { text: "Exceptional care experience",    delay: 1.2 },
    { text: "Staff was incredibly attentive", delay: 1.6 },
    { text: "Highly recommend this service",  delay: 2.0 },
  ];

  return (
    <div className="select-none space-y-3">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
        transition={{ duration: 0.45 }}
        className="flex items-center gap-2.5 px-1 mb-1"
      >
        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg,#0369A1,#0EA5E9)" }}>
          <HeartHandshake className="w-4 h-4 text-white" strokeWidth={1.8} />
        </div>
        <span className="text-slate-700 text-sm" style={{ fontWeight: 700 }}>Experience Dashboard</span>
        <motion.div className="ml-auto text-xs px-2 py-0.5 rounded-full"
          style={{ background: "rgba(14,165,233,0.1)", color: "#0EA5E9", fontWeight: 600 }}
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.3 }}>
          Q1 2026
        </motion.div>
      </motion.div>

      {metrics.map((m, i) => (
        <motion.div key={i} className="space-y-1"
          initial={{ opacity: 0, x: 20 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.5, delay: m.delay }}>
          <div className="flex items-center gap-2">
            <m.icon className="w-3 h-3 shrink-0" style={{ color: m.color }} strokeWidth={2} />
            <span className="text-xs text-slate-500 flex-1" style={{ fontWeight: 500, fontSize: "0.68rem" }}>{m.label}</span>
            <motion.span className="text-xs tabular-nums"
              style={{ color: m.color, fontWeight: 700, fontSize: "0.7rem" }}
              animate={isActive ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: m.delay + 0.8 }}>
              {m.value}%
            </motion.span>
          </div>
          <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
            <motion.div className="h-full rounded-full"
              style={{ background: `linear-gradient(90deg,${m.color}77,${m.color})` }}
              initial={{ width: 0 }}
              animate={isActive ? { width: `${m.value}%` } : { width: 0 }}
              transition={{ duration: 1.3, delay: m.delay + 0.25, ease: [0.22, 1, 0.36, 1] }} />
          </div>
        </motion.div>
      ))}

      <div className="space-y-1.5 pt-1">
        {reviews.map((r, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.4, delay: r.delay }}
            className="flex items-center gap-2.5 px-3 py-2 rounded-xl"
            style={{ background: "white", border: "1px solid rgba(14,165,233,0.1)", boxShadow: "0 1px 4px rgba(14,165,233,0.06)" }}>
            <div className="flex gap-0.5 shrink-0">
              {Array.from({ length: 5 }).map((_, si) => (
                <Star key={si} className="w-2.5 h-2.5" style={{ color: "#F59E0B", fill: "#F59E0B" }} strokeWidth={0} />
              ))}
            </div>
            <span className="text-slate-500" style={{ fontSize: "0.68rem" }}>{r.text}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  Academy Animation
// ─────────────────────────────────────────────────────────────────
function AcademyAnimation({ isActive }: { isActive: boolean }) {
  const courses = [
    { Icon: Users,       title: "Customer & Patient Experience", progress: 85, color: "#8B5CF6", delay: 0.3  },
    { Icon: Cpu,         title: "AI & Data Analytics",           progress: 62, color: "#7C3AED", delay: 0.5  },
    { Icon: BarChart3,   title: "Business Consulting",           progress: 91, color: "#A78BFA", delay: 0.7  },
    { Icon: Stethoscope, title: "Healthcare Design",             progress: 48, color: "#6D28D9", delay: 0.9  },
  ];

  return (
    <div className="select-none space-y-3">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
        transition={{ duration: 0.45 }}
        className="flex items-center gap-2.5 px-1"
      >
        <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg,#6D28D9,#A78BFA)" }}>
          <GraduationCap className="w-4 h-4 text-white" strokeWidth={1.8} />
        </div>
        <span className="text-slate-700 text-sm" style={{ fontWeight: 700 }}>Learning Dashboard</span>
        <motion.div className="ml-auto flex items-center gap-1.5"
          initial={{ opacity: 0 }}
          animate={isActive ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: 0.3 }}>
          <motion.div className="w-1.5 h-1.5 rounded-full" style={{ background: "#8B5CF6" }}
            animate={isActive ? { opacity: [1, 0.3, 1], scale: [1, 1.5, 1] } : {}}
            transition={{ duration: 2, repeat: Infinity }} />
          <span className="text-xs" style={{ color: "#8B5CF6", fontWeight: 600 }}>4 Active</span>
        </motion.div>
      </motion.div>

      <motion.div className="grid grid-cols-3 gap-2"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}>
        {[
          { icon: BookOpen,   label: "12 Courses",  color: "#8B5CF6" },
          { icon: Target,     label: "3 Certif.",   color: "#7C3AED" },
          { icon: TrendingUp, label: "+28% Growth", color: "#A78BFA" },
        ].map((c, i) => (
          <div key={i} className="flex flex-col items-center gap-1 py-2 rounded-xl"
            style={{ background: "rgba(139,92,246,0.07)", border: "1px solid rgba(139,92,246,0.15)" }}>
            <c.icon className="w-3.5 h-3.5" style={{ color: c.color }} strokeWidth={2} />
            <span className="text-slate-600" style={{ fontSize: "0.6rem", fontWeight: 600, textAlign: "center" }}>{c.label}</span>
          </div>
        ))}
      </motion.div>

      {courses.map((c, i) => (
        <motion.div key={i}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl"
          style={{ background: "white", border: "1px solid rgba(139,92,246,0.1)", boxShadow: "0 1px 4px rgba(109,40,217,0.04)" }}
          initial={{ opacity: 0, x: -16 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
          transition={{ duration: 0.45, delay: c.delay, ease: [0.22, 1, 0.36, 1] }}>
          <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "rgba(139,92,246,0.12)" }}>
            <c.Icon className="w-3.5 h-3.5" style={{ color: c.color }} strokeWidth={1.8} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-slate-700 mb-1 truncate" style={{ fontWeight: 600, fontSize: "0.67rem" }}>{c.title}</div>
            <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <motion.div className="h-full rounded-full"
                style={{ background: `linear-gradient(90deg,${c.color}66,${c.color})` }}
                initial={{ width: 0 }}
                animate={isActive ? { width: `${c.progress}%` } : { width: 0 }}
                transition={{ duration: 1.1, delay: c.delay + 0.35, ease: [0.22, 1, 0.36, 1] }} />
            </div>
          </div>
          <motion.span className="tabular-nums shrink-0"
            style={{ color: c.color, fontWeight: 700, fontSize: "0.65rem" }}
            animate={isActive ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: c.delay + 0.9 }}>
            {c.progress}%
          </motion.span>
        </motion.div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  Static config
// ─────────────────────────────────────────────────────────────────
const CONFIGS = [
  {
    id: "kasaji-ai",      name: "Kasaji AI",
    Icon: Brain,
    accent: "#7C3AED",
    gradFrom: "#5B21B6", gradTo: "#7C3AED",
    mesh1: "#9333EA", mesh2: "#7C3AED", mesh3: "#C084FC",
  },
  {
    id: "kasaji-xm",      name: "Kasaji XM",
    Icon: HeartHandshake,
    accent: "#0EA5E9",
    gradFrom: "#0369A1", gradTo: "#0EA5E9",
    mesh1: "#06B6D4", mesh2: "#0EA5E9", mesh3: "#38BDF8",
  },
  {
    id: "kasaji-academy", name: "Kasaji Academy",
    Icon: GraduationCap,
    accent: "#8B5CF6",
    gradFrom: "#6D28D9", gradTo: "#A78BFA",
    mesh1: "#7C3AED", mesh2: "#8B5CF6", mesh3: "#C084FC",
  },
] as const;

type CfgIdx = 0 | 1 | 2;
const ANIMATIONS: Array<(active: boolean) => React.ReactNode> = [
  (a) => <AIAnimation      isActive={a} />,
  (a) => <XMAnimation      isActive={a} />,
  (a) => <AcademyAnimation isActive={a} />,
];

// ─────────────────────────────────────────────────────────────────
//  Animated Gradient Orbs Background
// ─────────────────────────────────────────────────────────────────
function AnimatedGradientOrbs({ colors, isMobile }: { colors: { mesh1: string; mesh2: string; mesh3: string }; isMobile: boolean }) {
  if (isMobile) {
    // Static gradients for mobile (no animation to improve performance)
    return (
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute rounded-full blur-2xl opacity-30"
          style={{
            width: '400px',
            height: '400px',
            top: '10%',
            left: '-10%',
            background: `radial-gradient(circle, ${colors.mesh1}, transparent 70%)`,
          }}
        />
        <div
          className="absolute rounded-full blur-2xl opacity-25"
          style={{
            width: '350px',
            height: '350px',
            bottom: '20%',
            right: '-10%',
            background: `radial-gradient(circle, ${colors.mesh2}, transparent 70%)`,
          }}
        />
      </div>
    );
  }

  // Animated gradients for desktop
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Orb 1 */}
      <motion.div
        className="absolute rounded-full blur-3xl opacity-40"
        style={{
          width: '600px',
          height: '600px',
          background: `radial-gradient(circle, ${colors.mesh1}, transparent 70%)`,
          willChange: 'transform',
        }}
        animate={{
          x: ['-10%', '10%', '-10%'],
          y: ['20%', '40%', '20%'],
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orb 2 */}
      <motion.div
        className="absolute rounded-full blur-3xl opacity-30"
        style={{
          width: '500px',
          height: '500px',
          background: `radial-gradient(circle, ${colors.mesh2}, transparent 70%)`,
          right: 0,
          willChange: 'transform',
        }}
        animate={{
          x: ['10%', '-5%', '10%'],
          y: ['30%', '10%', '30%'],
          scale: [1.1, 1, 1.1],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
//  Product Section - Glassmorphism
// ─────────────────────────────────────────────────────────────────
function ProductSection({
  idx,
  item,
  learnMore,
  isAr,
  isMobile,
}: {
  idx: CfgIdx;
  item: { tagline: string; description: string; features: string[] };
  learnMore: string;
  isAr: boolean;
  isMobile: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-150px" });
  const cfg = CONFIGS[idx];

  return (
    <section
      id={cfg.id}
      ref={ref}
      className="relative min-h-screen flex items-center justify-center py-16 lg:py-24 px-5 lg:px-12 overflow-hidden"
      style={{ position: 'relative' }}
    >
      {/* Animated Mesh Gradient Background */}
      <AnimatedGradientOrbs colors={{ mesh1: cfg.mesh1, mesh2: cfg.mesh2, mesh3: cfg.mesh3 }} isMobile={isMobile} />

      {/* Noise texture overlay - desktop only for better performance */}
      {!isMobile && (
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
          }} />
      )}

      {/* Content */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              whileHover={isMobile ? undefined : { y: -16, scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              {/* Outer glow - desktop only */}
              {!isMobile && (
                <motion.div
                  className="absolute -inset-1 rounded-[32px] blur-xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  style={{ background: `linear-gradient(135deg, ${cfg.gradFrom}, ${cfg.gradTo})` }}
                />
              )}

              {/* Glass card */}
              <div
                className="relative rounded-3xl p-6 lg:p-10 overflow-hidden"
                style={{
                  background: isMobile ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.08)',
                  backdropFilter: isMobile ? 'blur(20px) saturate(150%)' : 'blur(40px) saturate(180%)',
                  WebkitBackdropFilter: isMobile ? 'blur(20px) saturate(150%)' : 'blur(40px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.18)',
                  boxShadow: isMobile
                    ? `0 8px 24px 0 rgba(0, 0, 0, 0.08), inset 0 1px 0 0 rgba(255, 255, 255, 0.5)`
                    : `0 8px 32px 0 rgba(0, 0, 0, 0.12), 0 30px 60px -12px rgba(0, 0, 0, 0.25), inset 0 1px 0 0 rgba(255, 255, 255, 0.3), inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)`,
                }}
              >
                {/* Top light reflection */}
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                  }} />

                {/* Corner reflection - desktop only */}
                {!isMobile && (
                  <motion.div
                    className="absolute top-0 left-0 w-32 h-32 rounded-full blur-2xl pointer-events-none"
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: 0.3 }}
                    style={{ background: 'rgba(255, 255, 255, 0.3)' }}
                  />
                )}

                {/* Content */}
                <div className="relative z-10">
                  {ANIMATIONS[idx](inView)}
                </div>

                {/* Bottom reflection - desktop only */}
                {!isMobile && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    style={{
                      background: 'linear-gradient(to top, rgba(255,255,255,0.05), transparent)',
                    }}
                  />
                )}
              </div>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Number Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-3 lg:gap-4 mb-6 lg:mb-8"
            >
              <div className="relative">
                {!isMobile && (
                  <motion.div
                    className="absolute inset-0 blur-xl"
                    initial={{ opacity: 0.6 }}
                    animate={{ opacity: 0.6 }}
                    style={{ background: `linear-gradient(135deg, ${cfg.gradFrom}, ${cfg.gradTo})` }}
                  />
                )}
                <div className="relative w-14 h-14 lg:w-20 lg:h-20 rounded-xl lg:rounded-2xl flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${cfg.gradFrom}, ${cfg.gradTo})`,
                    boxShadow: `0 8px 24px -8px ${cfg.accent}60`,
                  }}>
                  <cfg.Icon className="w-7 h-7 lg:w-10 lg:h-10 text-white" strokeWidth={2} />
                </div>
              </div>
              {!isMobile && (
                <div>
                  <div className="text-6xl lg:text-8xl font-black text-white/10 leading-none" style={{ fontFamily: 'system-ui' }}>
                    0{idx + 1}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Product name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="inline-flex items-center gap-2 lg:gap-3 px-3 lg:px-4 py-1.5 lg:py-2 rounded-full mb-5 lg:mb-6"
              style={{
                background: isMobile ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.1)',
                backdropFilter: isMobile ? 'blur(10px)' : 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <Sparkles className="w-3.5 h-3.5 lg:w-4 lg:h-4" style={{ color: cfg.accent }} strokeWidth={2.5} />
              <span className="text-xs lg:text-sm font-bold tracking-wide" style={{ color: cfg.accent }}>
                {cfg.name}
              </span>
            </motion.div>

            {/* Tagline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-black tracking-tight mb-4 lg:mb-6 leading-[1.15] lg:leading-[1.1]"
              style={{
                background: `linear-gradient(135deg, #1e293b 0%, #475569 100%)`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {item.tagline}
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
              className="text-slate-700 text-base lg:text-xl leading-relaxed mb-8 lg:mb-10"
              style={{ fontWeight: 500 }}
            >
              {item.description}
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="space-y-3 lg:space-y-4 mb-8 lg:mb-12"
            >
              {item.features.map((feat, fi) => (
                <motion.div
                  key={fi}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.8 + fi * 0.1 }}
                  className="flex items-start gap-3 lg:gap-4"
                >
                  <div className="relative mt-0.5 lg:mt-1">
                    {!isMobile && (
                      <motion.div
                        className="absolute inset-0 rounded-full blur-md"
                        initial={{ opacity: 0.4 }}
                        animate={{ opacity: 0.4 }}
                        style={{ background: cfg.accent }}
                      />
                    )}
                    <div className="relative w-5 h-5 lg:w-6 lg:h-6 rounded-full flex items-center justify-center"
                      style={{
                        background: isMobile ? `${cfg.accent}20` : 'rgba(255, 255, 255, 0.15)',
                        backdropFilter: isMobile ? 'none' : 'blur(10px)',
                        border: `1.5px solid ${cfg.accent}${isMobile ? '' : '80'}`,
                      }}>
                      <Check className="w-3 h-3 lg:w-3.5 lg:h-3.5" style={{ color: cfg.accent }} strokeWidth={3} />
                    </div>
                  </div>
                  <span className="text-slate-700 text-base lg:text-lg font-medium flex-1">
                    {feat}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 1.1 }}
            >
              <motion.button
                whileHover={isMobile ? undefined : { scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center gap-2.5 lg:gap-3 px-7 py-3.5 lg:px-10 lg:py-5 rounded-xl lg:rounded-2xl text-white font-semibold text-base lg:text-lg overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${cfg.gradFrom}, ${cfg.gradTo})`,
                  boxShadow: `0 12px 32px -12px ${cfg.accent}60, 0 4px 12px -4px rgba(0,0,0,0.2)`,
                }}
              >
                {/* Shine effect - desktop only */}
                {!isMobile && (
                  <motion.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 1 }}
                    />
                  </motion.div>
                )}

                <span className="relative">{learnMore}</span>
                <ArrowUpRight className="relative w-5 h-5 lg:w-6 lg:h-6 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" strokeWidth={2.5} />
              </motion.button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────
//  Main export
// ─────────────────────────────────────────────────────────────────
export function Products() {
  const { T, isAr } = useLang();
  const isMobile = useIsMobile();

  return (
    <div className="relative" style={{ background: '#f8fafc' }}>
      {CONFIGS.map((cfg, i) => (
        <ProductSection
          key={cfg.id}
          idx={i as CfgIdx}
          item={T.products.items[i]}
          learnMore={T.products.learnMore}
          isAr={isAr}
          isMobile={isMobile}
        />
      ))}
    </div>
  );
}
