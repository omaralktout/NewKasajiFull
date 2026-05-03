import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Brain, Target, BookOpen } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";

// ═══════════════════════════════════════════════════════════════
//  GEOMETRY HELPERS
// ═══════════════════════════════════════════════════════════════

type Pt = [number, number];
interface LinPath { lin: true;  pts: [Pt, Pt]; }
interface CubPath { lin: false; pts: [Pt, Pt, Pt, Pt]; }
type PathDef = LinPath | CubPath;

const PATHS: Record<string, PathDef> = {
  aiHub: { lin: true,  pts: [[400, 108], [400, 222]] },
  xmHub: { lin: false, pts: [[265, 415], [290, 395], [315, 345], [340, 282]] },
  acHub: { lin: false, pts: [[535, 415], [510, 395], [485, 345], [460, 282]] },
  aiXm:  { lin: false, pts: [[320,  75], [240, 165], [185, 270], [185, 382]] },
  aiAc:  { lin: false, pts: [[480,  75], [560, 165], [615, 270], [615, 382]] },
  xmAc:  { lin: false, pts: [[265, 425], [350, 455], [450, 455], [535, 425]] },
};

function svgPathStr(key: string): string {
  const p = PATHS[key];
  const p0 = p.pts[0];
  if (p.lin) {
    const p1 = (p as LinPath).pts[1];
    return `M${p0[0]} ${p0[1]} L${p1[0]} ${p1[1]}`;
  }
  const [, p1, p2, p3] = (p as CubPath).pts;
  return `M${p0[0]} ${p0[1]} C${p1[0]} ${p1[1]} ${p2[0]} ${p2[1]} ${p3[0]} ${p3[1]}`;
}

function computeKF(key: string, rev = false, n = 22) {
  const p = PATHS[key];
  const xs: number[] = [], ys: number[] = [];
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    let x: number, y: number;
    if (p.lin) {
      const [[x0, y0], [x1, y1]] = (p as LinPath).pts;
      x = x0 + (x1 - x0) * t;
      y = y0 + (y1 - y0) * t;
    } else {
      const [[x0,y0],[x1,y1],[x2,y2],[x3,y3]] = (p as CubPath).pts;
      const m = 1 - t;
      x = m**3*x0 + 3*m**2*t*x1 + 3*m*t**2*x2 + t**3*x3;
      y = m**3*y0 + 3*m**2*t*y1 + 3*m*t**2*y2 + t**3*y3;
    }
    xs.push(Math.round(x));
    ys.push(Math.round(y));
  }
  if (rev) { xs.reverse(); ys.reverse(); }
  const times = xs.map((_, i) => i / n);
  const opacity = times.map(t => Math.min(t / 0.11, (1 - t) / 0.11, 1));
  return { cx: xs, cy: ys, times, opacity };
}

function orbitKF(cx: number, cy: number, r: number, startDeg: number, n = 14) {
  const ax: number[] = [], ay: number[] = [];
  for (let i = 0; i <= n; i++) {
    const a = (startDeg + (i / n) * 360) * (Math.PI / 180);
    ax.push(Math.round((cx + r * Math.cos(a)) * 10) / 10);
    ay.push(Math.round((cy + r * Math.sin(a)) * 10) / 10);
  }
  return { cx: ax, cy: ay, times: ax.map((_, i) => i / n) };
}

const FWD = Object.fromEntries(Object.keys(PATHS).map(k => [k, computeKF(k, false)]));
const REV = Object.fromEntries(Object.keys(PATHS).map(k => [k, computeKF(k, true)]));
const ORB = [
  orbitKF(400, 252, 82, -90),
  orbitKF(400, 252, 82, 30),
  orbitKF(400, 252, 82, 150),
];

const LINE_DELAYS: Record<string, number> = {
  aiHub: 1.0, xmHub: 1.2, acHub: 1.4,
  aiXm:  1.6, aiAc:  1.8, xmAc:  2.0,
};
const LINE_COLORS: Record<string, string> = {
  aiHub: "rgba(124,58,237,0.4)",
  xmHub: "rgba(14,165,233,0.38)",
  acHub: "rgba(139,92,246,0.38)",
  aiXm:  "rgba(124,58,237,0.22)",
  aiAc:  "rgba(124,58,237,0.22)",
  xmAc:  "rgba(14,165,233,0.22)",
};

function hex2rgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

// ═══════════════════════════════════════════════════════════════
//  SUB-COMPONENTS
// ═══════════════════════════════════════════════════════════════

interface DotProps {
  pKey: string; color: string; delay: number; dur: number;
  rev?: boolean; show: boolean; r?: number;
}
function Dot({ pKey, color, delay, dur, rev = false, show, r = 3 }: DotProps) {
  const kf = rev ? REV[pKey] : FWD[pKey];
  return (
    <motion.circle
      r={r} fill={color}
      initial={{ cx: kf.cx[0], cy: kf.cy[0], opacity: 0 }}
      animate={show ? { cx: kf.cx, cy: kf.cy, opacity: kf.opacity } : { opacity: 0 }}
      transition={{
        duration: dur, delay: show ? delay : 0, repeat: Infinity, ease: "linear", times: kf.times,
        opacity: { duration: dur, delay: show ? delay : 0, repeat: Infinity, ease: "linear", times: kf.times },
      }}
    />
  );
}

interface LabelProps { x: number; y: number; text: string; show: boolean; delay: number; }
function ConnLabel({ x, y, text, show, delay }: LabelProps) {
  const w = Math.max(text.length * 5.8 + 14, 50);
  return (
    <motion.g
      initial={{ opacity: 0 }}
      animate={show ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.7, delay: show ? delay : 0 }}
    >
      <rect x={x - w / 2} y={y - 9} width={w} height={17} rx={8.5}
        fill="rgba(10,5,25,0.88)" stroke="rgba(124,58,237,0.35)" strokeWidth={0.6} />
      <text x={x} y={y + 3} textAnchor="middle" fill="rgba(196,181,253,0.8)"
        fontSize={7.8} fontFamily="system-ui,-apple-system,sans-serif" fontWeight="500">
        {text}
      </text>
    </motion.g>
  );
}

// ═══════════════════════════════════════════════════════════════
//  MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════

export function Integration() {
  const [show, setShow] = useState(false);
  const { T } = useLang();
  const TI = T.integration;

  useEffect(() => {
    const el = document.getElementById("integration");
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setShow(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="integration"
      className="py-24 px-4 sm:px-6 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #0c0718 0%, #160a30 45%, #0a1828 100%)" }}
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute rounded-full" style={{ top:"20%",left:"20%",width:480,height:480,background:"radial-gradient(circle,rgba(124,58,237,0.18) 0%,transparent 70%)",filter:"blur(60px)" }} />
        <div className="absolute rounded-full" style={{ bottom:"20%",right:"18%",width:380,height:380,background:"radial-gradient(circle,rgba(14,165,233,0.16) 0%,transparent 70%)",filter:"blur(55px)" }} />
        <div className="absolute rounded-full" style={{ top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:300,height:300,background:"radial-gradient(circle,rgba(139,92,246,0.12) 0%,transparent 70%)",filter:"blur(50px)" }} />
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:`linear-gradient(rgba(124,58,237,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(124,58,237,0.04) 1px,transparent 1px)`,backgroundSize:"50px 50px" }} />

      <div className="max-w-6xl mx-auto relative">

        {/* Header */}
        <motion.div initial={{ opacity:0, y:32 }} animate={show ? { opacity:1, y:0 } : {}} transition={{ duration:0.85 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full mb-6 text-sm" style={{ background:"rgba(124,58,237,0.1)",border:"1px solid rgba(124,58,237,0.3)",color:"#C4B5FD" }}>
            <motion.span className="w-2 h-2 rounded-full" style={{ background:"#9F5CF6" }} animate={{ scale:[1,1.7,1],opacity:[1,0.45,1] }} transition={{ duration:2, repeat:Infinity }} />
            {TI.badge}
          </div>
          <h2 className="text-4xl md:text-5xl mb-4 text-white tracking-tight">
            {TI.titleMain}{" "}
            <span style={{ background:"linear-gradient(90deg,#A78BFA 0%,#38BDF8 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>
              {TI.titleHighlight}
            </span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color:"rgba(196,181,253,0.65)" }}>{TI.subtitle}</p>
        </motion.div>

        {/* SVG Diagram */}
        <div className="relative mx-auto" style={{ maxWidth:820 }}>
          <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" style={{ overflow:"visible" }}>
            <defs>
              <filter id="sg" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="2.8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              <filter id="mg" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              <filter id="bg2" x="-80%" y="-80%" width="260%" height="260%"><feGaussianBlur stdDeviation="10" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              <linearGradient id="hubH" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#7C3AED"/><stop offset="100%" stopColor="#0EA5E9"/></linearGradient>
              <linearGradient id="aiG2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#5B21B6"/><stop offset="100%" stopColor="#7C3AED"/></linearGradient>
              <linearGradient id="xmG2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#0369A1"/><stop offset="100%" stopColor="#0EA5E9"/></linearGradient>
              <linearGradient id="acG2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#5B21B6"/><stop offset="100%" stopColor="#8B5CF6"/></linearGradient>
              <radialGradient id="aiRad2" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#7C3AED" stopOpacity="0.25"/><stop offset="100%" stopColor="#7C3AED" stopOpacity="0"/></radialGradient>
              <radialGradient id="xmRad2" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.25"/><stop offset="100%" stopColor="#0EA5E9" stopOpacity="0"/></radialGradient>
              <radialGradient id="acRad2" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.25"/><stop offset="100%" stopColor="#8B5CF6" stopOpacity="0"/></radialGradient>
            </defs>

            {/* Background halos */}
            <ellipse cx={400} cy={75}  rx={110} ry={52} fill="url(#aiRad2)" filter="url(#bg2)"/>
            <ellipse cx={185} cy={415} rx={110} ry={52} fill="url(#xmRad2)" filter="url(#bg2)"/>
            <ellipse cx={615} cy={415} rx={110} ry={52} fill="url(#acRad2)" filter="url(#bg2)"/>
            <ellipse cx={400} cy={252} rx={130} ry={60} fill="rgba(124,58,237,0.08)" filter="url(#bg2)"/>

            {/* Connection lines */}
            {Object.keys(PATHS).map(key => (
              <motion.path key={key} d={svgPathStr(key)} stroke={LINE_COLORS[key]} strokeWidth={key.includes("Hub") ? 1.6 : 1.1} fill="none" strokeDasharray="5.5 4" filter={key.includes("Hub") ? "url(#sg)" : undefined}
                initial={{ pathLength:0, opacity:0 }} animate={show ? { pathLength:1, opacity:1 } : {}} transition={{ duration:1.4, delay:show ? LINE_DELAYS[key] : 0, ease:"easeInOut" }} />
            ))}

            {/* Connection labels */}
            <ConnLabel x={378} y={167} text={TI.labels[0]} show={show} delay={2.5} />
            <ConnLabel x={278} y={348} text={TI.labels[1]} show={show} delay={2.7} />
            <ConnLabel x={522} y={348} text={TI.labels[2]} show={show} delay={2.9} />
            <ConnLabel x={220} y={228} text={TI.labels[3]} show={show} delay={3.1} />
            <ConnLabel x={580} y={228} text={TI.labels[4]} show={show} delay={3.1} />
            <ConnLabel x={400} y={453} text={TI.labels[5]} show={show} delay={3.3} />

            {/* Particles */}
            <Dot pKey="aiHub" color="#A78BFA" delay={2.5}  dur={1.55} show={show} r={3.8} />
            <Dot pKey="aiHub" color="#A78BFA" delay={3.07} dur={1.55} show={show} r={3.0} />
            <Dot pKey="aiHub" color="#A78BFA" delay={3.62} dur={1.55} show={show} r={2.4} />
            <Dot pKey="aiHub" color="#38BDF8" delay={2.78} dur={1.55} show={show} rev r={3.8} />
            <Dot pKey="aiHub" color="#38BDF8" delay={3.33} dur={1.55} show={show} rev r={3.0} />
            <Dot pKey="aiHub" color="#38BDF8" delay={3.88} dur={1.55} show={show} rev r={2.4} />
            <Dot pKey="xmHub" color="#38BDF8" delay={2.65} dur={2.1} show={show} r={3.8} />
            <Dot pKey="xmHub" color="#38BDF8" delay={3.35} dur={2.1} show={show} r={3.0} />
            <Dot pKey="xmHub" color="#38BDF8" delay={4.05} dur={2.1} show={show} r={2.4} />
            <Dot pKey="xmHub" color="#9F5CF6" delay={2.95} dur={2.1} show={show} rev r={3.5} />
            <Dot pKey="xmHub" color="#9F5CF6" delay={3.65} dur={2.1} show={show} rev r={2.8} />
            <Dot pKey="acHub" color="#C4B5FD" delay={2.75} dur={2.1} show={show} r={3.8} />
            <Dot pKey="acHub" color="#C4B5FD" delay={3.45} dur={2.1} show={show} r={3.0} />
            <Dot pKey="acHub" color="#C4B5FD" delay={4.15} dur={2.1} show={show} r={2.4} />
            <Dot pKey="acHub" color="#38BDF8" delay={3.1}  dur={2.1} show={show} rev r={3.5} />
            <Dot pKey="acHub" color="#38BDF8" delay={3.8}  dur={2.1} show={show} rev r={2.8} />
            <Dot pKey="aiXm"  color="#7C3AED" delay={3.1}  dur={3.1} show={show} r={3.2} />
            <Dot pKey="aiXm"  color="#7C3AED" delay={4.3}  dur={3.1} show={show} r={2.5} />
            <Dot pKey="aiXm"  color="#0EA5E9" delay={3.7}  dur={3.1} show={show} rev r={3.0} />
            <Dot pKey="aiXm"  color="#0EA5E9" delay={4.9}  dur={3.1} show={show} rev r={2.3} />
            <Dot pKey="aiAc"  color="#7C3AED" delay={3.3}  dur={3.1} show={show} r={3.2} />
            <Dot pKey="aiAc"  color="#7C3AED" delay={4.5}  dur={3.1} show={show} r={2.5} />
            <Dot pKey="aiAc"  color="#8B5CF6" delay={3.9}  dur={3.1} show={show} rev r={3.0} />
            <Dot pKey="aiAc"  color="#8B5CF6" delay={5.1}  dur={3.1} show={show} rev r={2.3} />
            <Dot pKey="xmAc"  color="#0EA5E9" delay={3.2}  dur={2.6} show={show} r={3.2} />
            <Dot pKey="xmAc"  color="#0EA5E9" delay={4.2}  dur={2.6} show={show} r={2.5} />
            <Dot pKey="xmAc"  color="#8B5CF6" delay={3.75} dur={2.6} show={show} rev r={3.0} />
            <Dot pKey="xmAc"  color="#8B5CF6" delay={4.75} dur={2.6} show={show} rev r={2.3} />

            {/* Orbital particles */}
            {ORB.map((o, i) => (
              <motion.circle key={`orb-${i}`} r={2.6} fill={i===0?"#A78BFA":i===1?"#38BDF8":"#C4B5FD"} filter="url(#sg)"
                initial={{ cx:o.cx[0], cy:o.cy[0], opacity:0 }}
                animate={show ? { cx:o.cx, cy:o.cy, opacity:0.85 } : { opacity:0 }}
                transition={{ duration:7+i*2.5, delay:show?1.4+i*0.6:0, repeat:Infinity, ease:"linear", times:o.times, opacity:{ duration:0.6, delay:show?1.4+i*0.6:0 } }} />
            ))}
            {[{ start:60,r2:95 },{ start:180,r2:95 },{ start:300,r2:95 }].map(({ start, r2 }, i) => {
              const o2 = orbitKF(400,252,r2,start,14);
              return (
                <motion.circle key={`orb2-${i}`} r={1.6} fill={i===0?"rgba(167,139,250,0.6)":i===1?"rgba(56,189,248,0.6)":"rgba(196,181,253,0.6)"}
                  initial={{ cx:o2.cx[0], cy:o2.cy[0], opacity:0 }}
                  animate={show ? { cx:o2.cx, cy:o2.cy, opacity:0.6 } : { opacity:0 }}
                  transition={{ duration:12+i*3, delay:show?2.0+i*0.5:0, repeat:Infinity, ease:"linear", times:o2.times, opacity:{ duration:0.6, delay:show?2.0:0 } }} />
              );
            })}

            {/* Center hub rings */}
            {[0,1,2].map(i => (
              <motion.circle key={`pulse-${i}`} cx={400} cy={252} r={58+i*24} fill="none" stroke="url(#hubH)" strokeWidth={0.8} filter="url(#sg)"
                animate={show ? { r:[58+i*24,72+i*24,58+i*24], opacity:[0.45,0.08,0.45] } : { opacity:0 }}
                transition={{ duration:3.5+i*0.8, delay:0.3+i*0.9, repeat:Infinity, ease:"easeInOut" }} />
            ))}
            <motion.circle cx={400} cy={252} r={64} fill="none" stroke="rgba(124,58,237,0.45)" strokeWidth={1.0} strokeDasharray="7 3.5"
              style={{ transformOrigin:"400px 252px" }} animate={show ? { rotate:[0,360] } : {}} transition={{ duration:16, repeat:Infinity, ease:"linear" }} />
            <motion.circle cx={400} cy={252} r={76} fill="none" stroke="rgba(14,165,233,0.25)" strokeWidth={0.8} strokeDasharray="4 6"
              style={{ transformOrigin:"400px 252px" }} animate={show ? { rotate:[360,0] } : {}} transition={{ duration:22, repeat:Infinity, ease:"linear" }} />
            <ellipse cx={400} cy={252} rx={108} ry={52} fill="url(#hubH)" opacity={0.07} filter="url(#bg2)" />

            {/* Hub rect */}
            <motion.rect x={316} y={221} width={168} height={62} rx={14} fill="url(#hubH)" filter="url(#mg)"
              initial={{ opacity:0, scale:0.55 }} animate={show ? { opacity:1, scale:1 } : {}}
              transition={{ duration:0.8, delay:0.18, type:"spring", bounce:0.38 }} style={{ transformOrigin:"400px 252px" }} />
            <motion.rect x={316} y={221} width={168} height={62} rx={14} fill="none" stroke="rgba(255,255,255,0.28)" strokeWidth={1.5}
              initial={{ opacity:0 }} animate={show ? { opacity:1 } : {}} transition={{ duration:0.6, delay:0.45 }} />
            <motion.rect x={316} y={221} width={168} height={62} rx={14} fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth={1.5}
              animate={show ? { opacity:[0,0.7,0] } : { opacity:0 }} transition={{ duration:2.2, delay:1.8, repeat:Infinity, repeatDelay:5.5 }} />
            <motion.text x={400} y={245} textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize={8.5} fontFamily="system-ui,-apple-system,sans-serif" fontWeight="700" letterSpacing="2.2"
              initial={{ opacity:0 }} animate={show ? { opacity:1 } : {}} transition={{ duration:0.5, delay:0.65 }}>
              KASAJI PLATFORM
            </motion.text>
            <motion.text x={400} y={268} textAnchor="middle" fill="white" fontSize={15} fontFamily="system-ui,-apple-system,sans-serif" fontWeight="800"
              initial={{ opacity:0 }} animate={show ? { opacity:1 } : {}} transition={{ duration:0.5, delay:0.75 }}>
              {TI.hubSubtitle}
            </motion.text>
            <motion.circle cx={330} cy={235} r={3.2} fill="#A78BFA"
              animate={show ? { opacity:[1,0.3,1], scale:[1,1.5,1] } : { opacity:0 }} transition={{ duration:2, repeat:Infinity }} />

            {/* Kasaji AI — top */}
            <motion.g initial={{ opacity:0, y:-30 }} animate={show ? { opacity:1, y:0 } : {}} transition={{ duration:0.75, delay:0.5, type:"spring", bounce:0.32 }}>
              <ellipse cx={400} cy={75} rx={105} ry={50} fill="url(#aiRad2)" filter="url(#bg2)" />
              <rect x={316} y={41} width={168} height={68} rx={13} fill="url(#aiG2)" />
              <rect x={316} y={41} width={168} height={68} rx={13} fill="none" stroke="rgba(167,139,250,0.55)" strokeWidth={1.5} />
              <motion.circle cx={331} cy={55} r={3.2} fill="#A78BFA" animate={{ opacity:[1,0.25,1], scale:[1,1.6,1] }} transition={{ duration:2.1, repeat:Infinity }} />
              <text x={400} y={65} textAnchor="middle" fill="rgba(196,181,253,0.6)" fontSize={8.5} fontFamily="system-ui,-apple-system,sans-serif" fontWeight="700" letterSpacing="1.8">KASAJI</text>
              <text x={400} y={86} textAnchor="middle" fill="white" fontSize={19} fontFamily="system-ui,-apple-system,sans-serif" fontWeight="800">AI</text>
              <text x={400} y={102} textAnchor="middle" fill="rgba(196,181,253,0.5)" fontSize={7.8} fontFamily="system-ui,-apple-system,sans-serif">{TI.aiSub}</text>
            </motion.g>

            {/* Kasaji XM — bottom-left */}
            <motion.g initial={{ opacity:0, x:-28, y:18 }} animate={show ? { opacity:1, x:0, y:0 } : {}} transition={{ duration:0.75, delay:0.75, type:"spring", bounce:0.32 }}>
              <ellipse cx={185} cy={415} rx={105} ry={50} fill="url(#xmRad2)" filter="url(#bg2)" />
              <rect x={101} y={381} width={168} height={68} rx={13} fill="url(#xmG2)" />
              <rect x={101} y={381} width={168} height={68} rx={13} fill="none" stroke="rgba(56,189,248,0.55)" strokeWidth={1.5} />
              <motion.circle cx={116} cy={395} r={3.2} fill="#38BDF8" animate={{ opacity:[1,0.25,1], scale:[1,1.6,1] }} transition={{ duration:2.1, delay:0.75, repeat:Infinity }} />
              <text x={185} y={405} textAnchor="middle" fill="rgba(125,211,252,0.6)" fontSize={8.5} fontFamily="system-ui,-apple-system,sans-serif" fontWeight="700" letterSpacing="1.8">KASAJI</text>
              <text x={185} y={426} textAnchor="middle" fill="white" fontSize={19} fontFamily="system-ui,-apple-system,sans-serif" fontWeight="800">XM</text>
              <text x={185} y={442} textAnchor="middle" fill="rgba(125,211,252,0.5)" fontSize={7.8} fontFamily="system-ui,-apple-system,sans-serif">{TI.xmSub}</text>
            </motion.g>

            {/* Kasaji Academy — bottom-right */}
            <motion.g initial={{ opacity:0, x:28, y:18 }} animate={show ? { opacity:1, x:0, y:0 } : {}} transition={{ duration:0.75, delay:1.0, type:"spring", bounce:0.32 }}>
              <ellipse cx={615} cy={415} rx={105} ry={50} fill="url(#acRad2)" filter="url(#bg2)" />
              <rect x={531} y={381} width={168} height={68} rx={13} fill="url(#acG2)" />
              <rect x={531} y={381} width={168} height={68} rx={13} fill="none" stroke="rgba(167,139,250,0.55)" strokeWidth={1.5} />
              <motion.circle cx={546} cy={395} r={3.2} fill="#C4B5FD" animate={{ opacity:[1,0.25,1], scale:[1,1.6,1] }} transition={{ duration:2.1, delay:1.5, repeat:Infinity }} />
              <text x={615} y={405} textAnchor="middle" fill="rgba(196,181,253,0.6)" fontSize={8.5} fontFamily="system-ui,-apple-system,sans-serif" fontWeight="700" letterSpacing="1.8">KASAJI</text>
              <text x={615} y={424} textAnchor="middle" fill="white" fontSize={15} fontFamily="system-ui,-apple-system,sans-serif" fontWeight="800">ACADEMY</text>
              <text x={615} y={442} textAnchor="middle" fill="rgba(196,181,253,0.5)" fontSize={7.8} fontFamily="system-ui,-apple-system,sans-serif">{TI.acSub}</text>
            </motion.g>
          </svg>
        </div>

        {/* Bottom cards */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { Ic: Brain,    name: "Kasaji AI",      color: "#7C3AED", light: "#A78BFA", idx: 0 },
            { Ic: Target,   name: "Kasaji XM",      color: "#0EA5E9", light: "#38BDF8", idx: 1 },
            { Ic: BookOpen, name: "Kasaji Academy", color: "#8B5CF6", light: "#C4B5FD", idx: 2 },
          ].map((item, i) => {
            const card = TI.cards[item.idx];
            return (
              <motion.div key={i} initial={{ opacity:0, y:28 }} animate={show ? { opacity:1, y:0 } : {}} transition={{ duration:0.65, delay:show?3.1+i*0.2:0 }}
                whileHover={{ y:-7, scale:1.025 }} className="relative rounded-2xl p-6 overflow-hidden cursor-default"
                style={{ background:`linear-gradient(140deg,rgba(${hex2rgb(item.color)},0.14) 0%,rgba(10,7,22,0.82) 100%)`, border:`1px solid rgba(${hex2rgb(item.color)},0.28)`, backdropFilter:"blur(12px)" }}>
                <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full pointer-events-none" style={{ background:`radial-gradient(circle,rgba(${hex2rgb(item.color)},0.18) 0%,transparent 70%)`,filter:"blur(8px)" }} />
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background:`rgba(${hex2rgb(item.color)},0.15)`, border:`1px solid rgba(${hex2rgb(item.color)},0.32)` }}>
                  <item.Ic className="w-5 h-5" style={{ color:item.light }} strokeWidth={1.8} />
                </div>
                <div className="mb-0.5 text-white" style={{ fontWeight:700, fontSize:"0.95rem" }}>{item.name}</div>
                <div className="text-xs mb-3" style={{ color:item.light, fontWeight:500 }}>{card.sub}</div>
                <p className="text-sm leading-relaxed" style={{ color:"rgba(196,181,253,0.6)" }}>{card.desc}</p>
                <div className="mt-5 flex items-center gap-2">
                  <motion.div className="w-1.5 h-1.5 rounded-full" style={{ background:item.color }}
                    animate={{ scale:[1,1.7,1], opacity:[1,0.4,1] }} transition={{ duration:2.2, repeat:Infinity, delay:i*0.4 }} />
                  <span className="text-xs" style={{ color:`rgba(${hex2rgb(item.color)},0.65)`, fontWeight:500 }}>{card.badge}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tagline */}
        <motion.div initial={{ opacity:0 }} animate={show ? { opacity:1 } : {}} transition={{ duration:0.8, delay:show?4.0:0 }} className="mt-12 text-center">
          <p className="text-sm" style={{ color:"rgba(196,181,253,0.4)" }}>{TI.tagline}</p>
        </motion.div>
      </div>
    </section>
  );
}