import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Brain, HeartHandshake, GraduationCap, ArrowUpRight } from "lucide-react";
import { KasajiLogo } from "./KasajiLogo";
import { useLang } from "../contexts/LanguageContext";

export function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const { T, isAr } = useLang();
  const TF = T.footer;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    const el = document.getElementById("footer");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const productLinks = [
    { label: "Kasaji AI",      icon: Brain,         href: "#kasaji-ai" },
    { label: "Kasaji XM",      icon: HeartHandshake, href: "#kasaji-xm" },
    { label: "Kasaji Academy", icon: GraduationCap,  href: "#kasaji-academy" },
    { label: TF.links.pricing, icon: null,           href: "#" },
  ];

  const companyLinks = [
    { label: TF.links.aboutUs,  href: "#" },
    { label: TF.links.careers,  href: "#" },
    { label: TF.links.blog,     href: "#" },
    { label: TF.links.contact,  href: "#" },
  ];

  const resourceLinks = [
    { label: TF.links.docs,    href: "#" },
    { label: TF.links.api,     href: "#" },
    { label: TF.links.support, href: "#" },
    { label: TF.links.status,  href: "#" },
  ];

  return (
    <footer id="footer" className="relative overflow-hidden" style={{ background: "#0a0a14" }}>
      {/* Background glows */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(124,58,237,0.1) 0%,transparent 70%)", filter: "blur(60px)" }} />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle,rgba(14,165,233,0.08) 0%,transparent 70%)", filter: "blur(50px)" }} />

      {/* Top gradient line */}
      <div className="h-px w-full" style={{ background: "linear-gradient(90deg,transparent,rgba(124,58,237,0.5),rgba(14,165,233,0.5),transparent)" }} />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">

          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="md:col-span-1"
          >
            {/* Static logo */}
            <div className="flex items-center gap-2.5 mb-5">
              <KasajiLogo size={32} variant="white" />
              <span
                style={{
                  background: "linear-gradient(90deg,#A78BFA,#38BDF8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 700,
                  fontSize: "1.05rem",
                }}
              >
                Kasaji &amp; Company
              </span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.8)" }}>
              {TF.desc}
            </p>

            {/* Social-like badges */}
            <div className="flex gap-2 mt-6">
              {["AI", "XM", "Edu"].map((tag, i) => (
                <span key={i} className="px-2.5 py-1 rounded-lg text-xs"
                  style={{
                    background: "rgba(124,58,237,0.12)",
                    border: "1px solid rgba(124,58,237,0.22)",
                    color: "#A78BFA",
                    fontWeight: 600,
                  }}>
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Products */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.85)", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", fontSize: "0.72rem" }}>
              {TF.cols.products}
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link, i) => (
                <motion.li key={i}>
                  <motion.a
                    href={link.href}
                    className="group flex items-center gap-2 text-sm transition-colors duration-200"
                    style={{ color: "rgba(148,163,184,0.75)", fontWeight: 450 }}
                    whileHover={{ x: isAr ? -4 : 4 }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "white"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(148,163,184,0.75)"; }}
                  >
                    {link.icon && <link.icon className="w-3.5 h-3.5 opacity-60" strokeWidth={2} />}
                    {link.label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.85)", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", fontSize: "0.72rem" }}>
              {TF.cols.company}
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link, i) => (
                <motion.li key={i}>
                  <motion.a
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "rgba(148,163,184,0.75)", fontWeight: 450 }}
                    whileHover={{ x: isAr ? -4 : 4 }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "white"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(148,163,184,0.75)"; }}
                  >
                    {link.label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-sm mb-5" style={{ color: "rgba(255,255,255,0.85)", fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", fontSize: "0.72rem" }}>
              {TF.cols.resources}
            </h4>
            <ul className="space-y-3">
              {resourceLinks.map((link, i) => (
                <motion.li key={i}>
                  <motion.a
                    href={link.href}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "rgba(148,163,184,0.75)", fontWeight: 450 }}
                    whileHover={{ x: isAr ? -4 : 4 }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "white"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(148,163,184,0.75)"; }}
                  >
                    {link.label}
                  </motion.a>
                </motion.li>
              ))}
            </ul>

            {/* CTA mini */}
            <motion.a
              href="#"
              whileHover={{ scale: 1.04 }}
              className="group inline-flex items-center gap-1.5 mt-6 px-4 py-2 rounded-xl text-xs"
              style={{
                background: "linear-gradient(135deg,rgba(124,58,237,0.2),rgba(14,165,233,0.2))",
                border: "1px solid rgba(124,58,237,0.3)",
                color: "#A78BFA",
                fontWeight: 600,
              }}
            >
              {T.nav.getStarted}
              <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </motion.a>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          <span className="text-sm" style={{ color: "rgba(100,116,139,0.7)", fontWeight: 400 }}>
            {TF.copyright}
          </span>
          <div className="flex items-center gap-6">
            {[TF.privacy, TF.terms, TF.cookies].map((label, i) => (
              <motion.a
                key={i}
                href="#"
                className="text-xs transition-colors duration-200"
                style={{ color: "rgba(100,116,139,0.6)", fontWeight: 400 }}
                whileHover={{ y: -2 }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "rgba(148,163,184,0.9)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "rgba(100,116,139,0.6)"; }}
              >
                {label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}