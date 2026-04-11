"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";

interface FloatingCard {
  company: string;
  logo: string;
  gradient: string;
  metric: string;
  label: string;
  tag: string;
}

const STATS = [
  { value: "500+", label: "Businesses",    icon: "🏢" },
  { value: "10M+", label: "Messages / mo", icon: "💬" },
  { value: "98%",  label: "Satisfaction",  icon: "⭐" },
  { value: "4.8×", label: "Avg ROI",       icon: "📈" },
];

const CARDS: FloatingCard[] = [
  { company: "NoBroker.com",     logo: "NB", gradient: "linear-gradient(135deg,#E53E3E,#FC8181)", metric: "4×",  label: "Clickthrough Rate", tag: "Real Estate" },
  { company: "Apollo Hospitals", logo: "AH", gradient: "linear-gradient(135deg,#2B6CB0,#63B3ED)", metric: "60%", label: "Wait Time Reduced",  tag: "Healthcare"  },
  { company: "Meesho",           logo: "ME", gradient: "linear-gradient(135deg,#805AD5,#B794F4)", metric: "5×",  label: "Lead Conversion",    tag: "E-commerce"  },
  { company: "HDFC Bank",        logo: "HB", gradient: "linear-gradient(135deg,#DD6B20,#F6AD55)", metric: "97%", label: "Query Accuracy",     tag: "Finance"     },
];

const TRUST_LOGOS = [
  { name: "NoBroker",  logo: "NB", gradient: "linear-gradient(135deg,#E53E3E,#FC8181)" },
  { name: "Apollo",    logo: "AH", gradient: "linear-gradient(135deg,#2B6CB0,#63B3ED)" },
  { name: "Meesho",    logo: "ME", gradient: "linear-gradient(135deg,#805AD5,#B794F4)" },
  { name: "HDFC",      logo: "HB", gradient: "linear-gradient(135deg,#DD6B20,#F6AD55)" },
  { name: "Zomato",    logo: "ZO", gradient: "linear-gradient(135deg,#C53030,#FC8181)" },
  { name: "Delhivery", logo: "DL", gradient: "linear-gradient(135deg,#276749,#68D391)" },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

const cardVariants = {
  hidden:  { opacity: 0, y: 20, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] },
  }),
};

function FloatingResultCard({ card, index, offsetY }: { card: FloatingCard; index: number; offsetY: number }) {
  const [barFill, setBarFill] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBarFill(true), 700 + index * 150);
    return () => clearTimeout(t);
  }, [index]);

  const pct = ["82%", "74%", "90%", "70%"][index];

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      style={{ translateY: offsetY }}
    >
      <div style={{
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(37,99,235,0.13)", borderRadius: "18px",
        padding: "16px 18px",
        boxShadow: "0 12px 40px rgba(37,99,235,0.08), 0 2px 6px rgba(0,0,0,0.04)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: card.gradient, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: "10px", flexShrink: 0 }}>
            {card.logo}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 800, fontSize: "12px", color: "#0f172a", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{card.company}</div>
            <div style={{ fontSize: "10px", color: "#94a3b8" }}>{card.tag}</div>
          </div>
          <span style={{ fontSize: "9px", fontWeight: 700, color: "#16a34a", background: "rgba(22,163,74,0.09)", border: "1px solid rgba(22,163,74,0.2)", borderRadius: "100px", padding: "2px 7px", flexShrink: 0 }}>✓ Verified</span>
        </div>
        <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "10px" }}>
          <span style={{ fontSize: "36px", fontWeight: 900, color: "#2563eb", letterSpacing: "-0.04em", lineHeight: 1 }}>{card.metric}</span>
          <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600, lineHeight: 1.3 }}>{card.label}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <div style={{ flex: 1, height: "4px", background: "rgba(37,99,235,0.1)", borderRadius: "100px", overflow: "hidden" }}>
            <div style={{ height: "100%", width: barFill ? pct : "0%", background: "linear-gradient(90deg,#1d4ed8,#3b82f6,#0891b2)", borderRadius: "100px", transition: "width 1.4s cubic-bezier(0.16,1,0.3,1)" }} />
          </div>
          <span style={{ fontSize: "10px", fontWeight: 800, color: "#2563eb" }}>{pct}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function CustomerStoriesHero() {
  const [mounted, setMounted] = useState(false);
  const t = useMotionValue(0);
  const [floatY, setFloatY] = useState([0, 0, 0, 0]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useAnimationFrame((time) => {
    t.set(time);
    setFloatY([
      Math.sin(time / 1800) * 5,
      Math.sin(time / 2100 + 1) * 6,
      Math.sin(time / 1600 + 2) * 5,
      Math.sin(time / 2400 + 0.5) * 7,
    ]);
  });

  if (!mounted) {
    return (
      <div style={{
        width: "100%",
        minHeight: "600px",
        background: "linear-gradient(150deg,#eef4ff 0%,#f5f8ff 40%,#edf3ff 70%,#f0f4ff 100%)",
      }} />
    );
  }

  return (
    <section style={{
      position: "relative",
      width: "100%",
      overflow: "hidden",
      background: "linear-gradient(150deg,#eef4ff 0%,#f5f8ff 40%,#edf3ff 70%,#f0f4ff 100%)",
    }}>
      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `
          radial-gradient(ellipse 80% 60% at 8% 50%, rgba(219,234,254,0.95) 0%, transparent 55%),
          radial-gradient(ellipse 60% 50% at 90% 10%, rgba(186,230,253,0.7) 0%, transparent 55%),
          radial-gradient(ellipse 50% 50% at 60% 90%, rgba(224,231,255,0.6) 0%, transparent 50%)
        `,
      }} />

      <div aria-hidden="true" style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(37,99,235,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.03) 1px,transparent 1px)",
        backgroundSize: "56px 56px",
        maskImage: "radial-gradient(ellipse 90% 90% at 50% 50%,black 20%,transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 90% 90% at 50% 50%,black 20%,transparent 100%)",
      }} />

      <div
        style={{
          position: "relative", zIndex: 10,
          maxWidth: "1200px", margin: "0 auto",
          padding: "80px 20px 60px",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "48px",
        }}
        className="hero-outer-grid"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: "600px", width: "100%" }}>

          <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible" style={{ width: "fit-content" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              background: "rgba(255,255,255,0.85)", border: "1px solid rgba(37,99,235,0.2)",
              padding: "6px 14px 6px 8px", borderRadius: "100px",
              fontSize: "12px", fontWeight: 700, color: "#334155",
              backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
              flexWrap: "wrap",
            }}>
              <span style={{ position: "relative", width: "14px", height: "14px", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <span style={{ position: "absolute", inset: "-3px", borderRadius: "50%", border: "1.5px solid rgba(22,163,74,0.45)", animation: "liveRing 2s ease infinite" }} />
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#16a34a" }} />
              </span>
              Customer Success Stories
              <span style={{ background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)", color: "#2563eb", fontSize: "10px", fontWeight: 800, padding: "2px 8px", borderRadius: "100px" }}>
                500+ Businesses
              </span>
            </div>
          </motion.div>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            style={{ margin: 0, fontSize: "clamp(32px,5vw,62px)", fontWeight: 900, lineHeight: 1.06, letterSpacing: "-0.03em", color: "#0f172a" }}
          >
            <span style={{ display: "block" }}>Real Businesses.</span>
            <span style={{
              display: "block",
              background: "linear-gradient(100deg,#1d4ed8 0%,#7c3aed 50%,#0891b2 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              backgroundClip: "text", backgroundSize: "200%",
              animation: "gShift 5s ease infinite",
            }}>Real Results.</span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            style={{ margin: 0, fontSize: "clamp(14px,1.6vw,16px)", lineHeight: 1.8, color: "#475569", maxWidth: "480px" }}
          >
            Discover how industry leaders across India automate operations, capture 10× more leads, and deliver exceptional customer experiences with PixoraNest AI.
          </motion.p>

          <motion.div custom={3} variants={fadeUp} initial="hidden" animate="visible">
            <div style={{ fontSize: "10px", fontWeight: 700, color: "#94a3b8", marginBottom: "8px", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Trusted by India's top brands
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}>
              {TRUST_LOGOS.map((b) => (
                <div key={b.name} style={{
                  display: "flex", alignItems: "center", gap: "5px",
                  background: "rgba(255,255,255,0.75)", border: "1px solid rgba(37,99,235,0.1)",
                  borderRadius: "100px", padding: "4px 10px 4px 5px",
                  backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                }}>
                  <div style={{ width: "18px", height: "18px", borderRadius: "5px", background: b.gradient, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 900, fontSize: "7px" }}>
                    {b.logo}
                  </div>
                  <span style={{ fontSize: "11px", fontWeight: 700, color: "#334155" }}>{b.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible">
            <div className="stats-grid" style={{
              background: "rgba(255,255,255,0.82)",
              border: "1px solid rgba(37,99,235,0.12)",
              borderRadius: "16px",
              overflow: "hidden",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              width: "100%",
            }}>
              {STATS.map((s) => (
                <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "14px 8px", gap: "3px", position: "relative" }}>
                  <span style={{ fontSize: "14px" }}>{s.icon}</span>
                  <strong style={{ fontSize: "18px", fontWeight: 900, color: "#2563eb", lineHeight: 1, letterSpacing: "-0.02em" }}>
                    {s.value}
                  </strong>
                  <span style={{ fontSize: "10px", color: "#94a3b8", fontWeight: 600, textAlign: "center" }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible" style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link
              href="#stories"
              prefetch={false}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "linear-gradient(135deg,#1d4ed8,#3b82f6)", color: "#fff",
                padding: "12px 24px", borderRadius: "12px", fontWeight: 800, fontSize: "14px",
                textDecoration: "none", boxShadow: "0 8px 24px rgba(37,99,235,0.32)",
                transition: "all 0.25s", fontFamily: "inherit",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 14px 36px rgba(37,99,235,0.42)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(37,99,235,0.32)";
              }}
            >
              Explore Stories
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/contact"
              prefetch={false}
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "rgba(255,255,255,0.8)", color: "#334155",
                padding: "12px 22px", borderRadius: "12px", fontWeight: 800, fontSize: "14px",
                textDecoration: "none", border: "1.5px solid rgba(37,99,235,0.2)",
                backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                transition: "all 0.25s", fontFamily: "inherit",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,99,235,0.5)";
                (e.currentTarget as HTMLElement).style.color = "#2563eb";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,99,235,0.2)";
                (e.currentTarget as HTMLElement).style.color = "#334155";
              }}
            >
              Book a Free Demo
            </Link>
          </motion.div>
        </div>

        <div style={{ position: "relative", width: "100%" }} className="cards-col" aria-hidden="true">
          <div style={{
            position: "absolute", width: "380px", height: "380px", borderRadius: "50%",
            border: "1px solid rgba(37,99,235,0.07)",
            top: "50%", left: "50%", transform: "translate(-50%,-50%)",
            animation: "gRing 10s ease-in-out infinite", pointerEvents: "none",
            display: "none",
          }} className="glow-ring-bg" />

          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px",
            width: "100%", maxWidth: "520px", margin: "0 auto",
            position: "relative", zIndex: 2,
          }}>
            {CARDS.map((card, i) => (
              <FloatingResultCard key={card.company} card={card} index={i} offsetY={floatY[i]} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "flex", alignItems: "center", gap: "9px",
              background: "rgba(255,255,255,0.9)", backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(37,99,235,0.12)",
              borderRadius: "12px", padding: "9px 14px",
              boxShadow: "0 8px 24px rgba(37,99,235,0.1)",
              marginTop: "12px", maxWidth: "280px",
            }}
          >
            <span style={{ fontSize: "18px" }}>🚀</span>
            <div>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>Lead Converted</div>
              <div style={{ fontSize: "10px", color: "#94a3b8", marginTop: "1px" }}>2 seconds after inquiry</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "flex", alignItems: "center", gap: "9px",
              background: "rgba(255,255,255,0.9)", backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)", border: "1px solid rgba(37,99,235,0.12)",
              borderRadius: "12px", padding: "9px 14px",
              boxShadow: "0 8px 24px rgba(37,99,235,0.1)",
              marginTop: "10px", maxWidth: "280px",
            }}
          >
            <span style={{ fontSize: "18px" }}>💰</span>
            <div>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>Deal Closed — ₹2.4L</div>
              <div style={{ fontSize: "10px", color: "#94a3b8", marginTop: "1px" }}>MagicBricks · WhatsApp Bot</div>
            </div>
          </motion.div>
        </div>
      </div>

      <div aria-hidden="true" style={{ position: "relative", height: "60px", zIndex: 10, pointerEvents: "none", marginTop: "-20px" }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", display: "block" }}>
          <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,60 L0,60 Z" fill="rgba(219,234,254,0.4)" />
        </svg>
      </div>

      <style>{`
        @keyframes liveRing {
          0%,100% { transform:scale(1); opacity:0.8; }
          50%      { transform:scale(1.9); opacity:0; }
        }
        @keyframes gShift {
          0%,100% { background-position:0%; }
          50%      { background-position:100%; }
        }
        @keyframes gRing {
          0%,100% { transform:translate(-50%,-50%) scale(1) rotate(0deg); }
          50%      { transform:translate(-50%,-50%) scale(1.06) rotate(180deg); }
        }
        .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); }
        .stats-grid > div { border-right: 1px solid rgba(37,99,235,0.08); border-bottom: 1px solid rgba(37,99,235,0.08); }
        .stats-grid > div:nth-child(2n) { border-right: none; }
        .stats-grid > div:nth-child(3), .stats-grid > div:nth-child(4) { border-bottom: none; }
        @media (min-width: 640px) {
          .stats-grid { grid-template-columns: repeat(4, 1fr); }
          .stats-grid > div { border-bottom: none !important; }
          .stats-grid > div:nth-child(4) { border-right: none; }
          .stats-grid > div:nth-child(2) { border-right: 1px solid rgba(37,99,235,0.08); }
          .stats-grid > div:nth-child(3) { border-right: 1px solid rgba(37,99,235,0.08); }
        }
        @media (min-width: 900px) {
          .hero-outer-grid { grid-template-columns: minmax(0,1fr) minmax(0,1fr) !important; align-items: center; padding-top: 100px !important; padding-bottom: 100px !important; gap: 64px !important; }
          .glow-ring-bg { display: block !important; }
          .cards-col { display: flex !important; flex-direction: column !important; }
        }
        @media (max-width: 899px) {
          .hero-outer-grid { padding-top: 72px !important; padding-bottom: 48px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </section>
  );
}