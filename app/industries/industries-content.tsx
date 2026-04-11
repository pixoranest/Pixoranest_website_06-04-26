"use client"

import Link from "next/link"
import { motion, useMotionValue, useSpring, useTransform, useScroll, useTransform as useScrollTransform } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { SectionWrapper } from "@/components/section-wrapper"
import { industries } from "@/lib/data"
import {
  Heart, ShoppingCart, Factory, Truck, DollarSign,
  GraduationCap, Hotel, Building, Monitor, Rocket,
  ArrowUpRight, Bot, Zap, TrendingUp, Clock,
  CheckCircle2, Sparkles, Globe, Users, ChevronRight,
  Activity, BarChart3, Shield, Star, Layers,
} from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  Heart, ShoppingCart, Factory, Truck, DollarSign,
  GraduationCap, Hotel, Building, Monitor, Rocket,
}

type Industry = typeof industries[0]

const meta: Record<string, {
  color: string; gradient: string; darkBg: string
  stat1: string; stat1Label: string
  stat2: string; stat2Label: string
  stat3: string; stat3Label: string
  caption: string; tags: string[]; bullets: string[]
  accentLight: string; emoji: string
}> = {
  Heart: {
    color: "#ff6b9d", gradient: "linear-gradient(135deg, #0d0015 0%, #2d0035 50%, #0d0015 100%)",
    darkBg: "#0d0015", accentLight: "#fff0f7", emoji: "🏥",
    stat1: "60%", stat1Label: "Cost Reduced", stat2: "3x", stat2Label: "Faster Response", stat3: "24/7", stat3Label: "AI Support",
    caption: "Intelligent patient communication at scale",
    tags: ["Appointments", "Prescriptions", "Triage", "Follow-ups"],
    bullets: ["24/7 virtual AI receptionist for patient calls", "Automated appointment scheduling & reminders", "Prescription follow-up & compliance tracking"],
  },
  ShoppingCart: {
    color: "#00e5a0", gradient: "linear-gradient(135deg, #001a0f 0%, #003d24 50%, #001a0f 100%)",
    darkBg: "#001a0f", accentLight: "#f0fff8", emoji: "🛒",
    stat1: "5x", stat1Label: "Conversion Rate", stat2: "40%", stat2Label: "Cart Recovery", stat3: "98%", stat3Label: "Uptime",
    caption: "Convert every visitor into a paying customer",
    tags: ["Cart Recovery", "Order Tracking", "Returns", "Support"],
    bullets: ["Recover abandoned carts via WhatsApp & SMS", "Real-time order status automation", "24/7 customer support AI"],
  },
  Factory: {
    color: "#ffb547", gradient: "linear-gradient(135deg, #150a00 0%, #3d2200 50%, #150a00 100%)",
    darkBg: "#150a00", accentLight: "#fffbf0", emoji: "🏭",
    stat1: "55%", stat1Label: "Downtime Cut", stat2: "3x", stat2Label: "Output Boost", stat3: "100%", stat3Label: "QA Tracked",
    caption: "Smart automation for the modern factory floor",
    tags: ["Scheduling", "QA Reports", "Maintenance", "Shifts"],
    bullets: ["Predictive equipment maintenance AI", "Automated QA reporting & alerts", "Intelligent shift scheduling system"],
  },
  Truck: {
    color: "#4db8ff", gradient: "linear-gradient(135deg, #000d1a 0%, #002d4d 50%, #000d1a 100%)",
    darkBg: "#000d1a", accentLight: "#f0f8ff", emoji: "🚚",
    stat1: "35%", stat1Label: "Fuel Saved", stat2: "2x", stat2Label: "Delivery Speed", stat3: "24/7", stat3Label: "Fleet Live",
    caption: "End-to-end logistics intelligence",
    tags: ["Route AI", "Fleet Tracking", "Dispatch", "ETA Updates"],
    bullets: ["AI-powered route optimisation", "Real-time fleet monitoring & alerts", "Automated dispatch & customer ETA updates"],
  },
  DollarSign: {
    color: "#50fa7b", gradient: "linear-gradient(135deg, #001a0e 0%, #003d22 50%, #001a0e 100%)",
    darkBg: "#001a0e", accentLight: "#f0fff5", emoji: "💰",
    stat1: "80%", stat1Label: "Fraud Detected", stat2: "4x", stat2Label: "Faster KYC", stat3: "100%", stat3Label: "Compliant",
    caption: "Compliance and security, automated",
    tags: ["KYC", "Fraud Detection", "Loans", "Compliance"],
    bullets: ["Real-time transaction fraud detection AI", "Automated KYC & document verification", "Regulatory compliance reporting system"],
  },
  GraduationCap: {
    color: "#bd93f9", gradient: "linear-gradient(135deg, #0d0020 0%, #2d0060 50%, #0d0020 100%)",
    darkBg: "#0d0020", accentLight: "#f8f0ff", emoji: "🎓",
    stat1: "70%", stat1Label: "Admin Saved", stat2: "3x", stat2Label: "Enrolment Rate", stat3: "24/7", stat3Label: "AI Tutor",
    caption: "AI that teaches institutions how to scale",
    tags: ["Enrolment", "Fee Reminders", "Attendance", "Queries"],
    bullets: ["Student inquiry & enrolment automation", "AI-driven fee collection reminders", "Attendance tracking & parent notifications"],
  },
  Hotel: {
    color: "#ff79c6", gradient: "linear-gradient(135deg, #1a0010 0%, #4d0030 50%, #1a0010 100%)",
    darkBg: "#1a0010", accentLight: "#fff0f8", emoji: "🏨",
    stat1: "4x", stat1Label: "Booking Rate", stat2: "98%", stat2Label: "Guest Satisfaction", stat3: "0s", stat3Label: "Wait Time",
    caption: "Five-star guest experience, automated",
    tags: ["Reservations", "Concierge AI", "Reviews", "Check-in"],
    bullets: ["Instant booking & reservation automation", "24/7 AI concierge for guest queries", "Automated review response & reputation management"],
  },
  Building: {
    color: "#ffb86c", gradient: "linear-gradient(135deg, #1a0800 0%, #4d2000 50%, #1a0800 100%)",
    darkBg: "#1a0800", accentLight: "#fff8f0", emoji: "🏢",
    stat1: "3x", stat1Label: "Deals Closed", stat2: "60%", stat2Label: "Faster Leads", stat3: "24/7", stat3Label: "WhatsApp AI",
    caption: "Close more deals with less manual work",
    tags: ["Lead Capture", "Site Visits", "WhatsApp AI", "Contracts"],
    bullets: ["WhatsApp-first lead qualification AI", "Automated site visit scheduling", "Follow-up & contract management AI"],
  },
  Monitor: {
    color: "#8be9fd", gradient: "linear-gradient(135deg, #001520 0%, #003d55 50%, #001520 100%)",
    darkBg: "#001520", accentLight: "#f0fdff", emoji: "💻",
    stat1: "65%", stat1Label: "Support Costs Cut", stat2: "5x", stat2Label: "Trial Conversion", stat3: "10ms", stat3Label: "Response",
    caption: "Scale your SaaS without scaling your team",
    tags: ["Onboarding", "Churn Prevention", "Support AI", "Upsell"],
    bullets: ["Automated new user onboarding sequences", "Churn prediction & prevention campaigns", "Intelligent tiered support routing AI"],
  },
  Rocket: {
    color: "#c084fc", gradient: "linear-gradient(135deg, #120020 0%, #3d0060 50%, #120020 100%)",
    darkBg: "#120020", accentLight: "#fdf0ff", emoji: "🚀",
    stat1: "4x", stat1Label: "Growth Velocity", stat2: "70%", stat2Label: "Ops Automated", stat3: "∞", stat3Label: "Scalable",
    caption: "Move fast, automate everything, scale infinitely",
    tags: ["Lead Gen", "Investor Updates", "Scaling", "Comms"],
    bullets: ["AI-powered lead generation & qualification", "Automated investor update distribution", "End-to-end sales pipeline automation"],
  },
}

const fallback = meta.Monitor

// ── Particle Field ──────────────────────────────────────────────────────────
function ParticleField({ color }: { color: string }) {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 4 + 3,
    delay: Math.random() * 3,
  }))

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: color,
            filter: `blur(1px)`,
          }}
        />
      ))}
    </div>
  )
}

// ── Magnetic Button Effect ───────────────────────────────────────────────────
function MagneticArrow({ color }: { color: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left - rect.width / 2) * 0.4)
    y.set((e.clientY - rect.top - rect.height / 2) * 0.4)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{
        x: springX, y: springY,
        width: 36, height: 36, borderRadius: "50%",
        background: `${color}20`, border: `1px solid ${color}50`,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <ArrowUpRight size={15} color={color} />
    </motion.div>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// CARD STYLE 1 — Obsidian Dark with Holographic Shimmer
// ══════════════════════════════════════════════════════════════════════════
function GlassCard({ industry }: { industry: Industry }) {
  const Icon = iconMap[industry.icon] || Monitor
  const m = meta[industry.icon] || fallback
  const ref = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 400, damping: 30 })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 400, damping: 30 })

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const nx = (e.clientX - rect.left) / rect.width
    const ny = (e.clientY - rect.top) / rect.height
    x.set(nx - 0.5)
    y.set(ny - 0.5)
    setMousePos({ x: nx * 100, y: ny * 100 })
  }

  return (
    <Link href={`/industries/${industry.slug}`} className="group block h-full" style={{ textDecoration: "none" }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={() => { x.set(0); y.set(0); setIsHovered(false) }}
        onMouseEnter={() => setIsHovered(true)}
        style={{
          rotateX, rotateY,
          transformStyle: "preserve-3d",
          background: m.gradient,
          borderRadius: 28,
          padding: "40px 36px",
          height: "100%", minHeight: 420,
          display: "flex", flexDirection: "column",
          position: "relative", overflow: "hidden",
          border: `1px solid ${m.color}15`,
          boxShadow: `0 0 0 1px rgba(255,255,255,0.04), 0 20px 60px rgba(0,0,0,0.6)`,
          cursor: "pointer",
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        {/* Holographic spotlight */}
        {isHovered && (
          <div style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle 200px at ${mousePos.x}% ${mousePos.y}%, ${m.color}12, transparent 60%)`,
            pointerEvents: "none",
            transition: "all 0.1s",
          }} />
        )}

        {/* Particles */}
        <ParticleField color={m.color} />

        {/* Animated grid lines */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04, pointerEvents: "none" }}>
          {[0, 1, 2, 3, 4].map(i => (
            <line key={`h${i}`} x1="0" y1={`${i * 25}%`} x2="100%" y2={`${i * 25}%`} stroke={m.color} strokeWidth="1" />
          ))}
          {[0, 1, 2, 3, 4].map(i => (
            <line key={`v${i}`} x1={`${i * 25}%`} y1="0" x2={`${i * 25}%`} y2="100%" stroke={m.color} strokeWidth="1" />
          ))}
        </svg>

        {/* Top shimmer */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 1,
          background: `linear-gradient(90deg, transparent 0%, ${m.color}80 50%, transparent 100%)`,
        }} />

        {/* Glow orb */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute", width: 250, height: 250, borderRadius: "50%",
            background: m.color, filter: "blur(80px)",
            top: -100, right: -80, pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Header row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
            <motion.div
              whileHover={{ rotate: 20, scale: 1.15 }}
              transition={{ type: "spring", stiffness: 300 }}
              style={{
                width: 58, height: 58, borderRadius: 18,
                background: `linear-gradient(135deg, ${m.color}25, ${m.color}08)`,
                border: `1px solid ${m.color}40`,
                backdropFilter: "blur(10px)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `0 0 20px ${m.color}30`,
              }}
            >
              <Icon size={26} color={m.color} />
            </motion.div>

            {/* Emoji */}
            <motion.span
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ fontSize: 28 }}
            >
              {m.emoji}
            </motion.span>
          </div>

          {/* Stats */}
          <div style={{ display: "flex", gap: 0, marginBottom: 32 }}>
            {[
              { v: m.stat1, l: m.stat1Label },
              { v: m.stat2, l: m.stat2Label },
              { v: m.stat3, l: m.stat3Label },
            ].map((s, i) => (
              <div key={i} style={{
                flex: 1,
                paddingRight: i < 2 ? 18 : 0,
                paddingLeft: i > 0 ? 18 : 0,
                borderRight: i < 2 ? `1px solid rgba(255,255,255,0.06)` : "none",
              }}>
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    fontSize: 32, fontWeight: 900, color: "#fff",
                    lineHeight: 1, letterSpacing: "-0.03em",
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  {s.v}
                </motion.div>
                <div style={{
                  fontSize: 10, color: m.color, fontWeight: 700,
                  marginTop: 5, letterSpacing: "0.06em", textTransform: "uppercase",
                }}>
                  {s.l}
                </div>
              </div>
            ))}
          </div>

          <div style={{ flex: 1 }} />

          <h3 style={{
            fontSize: 26, fontWeight: 900, color: "#fff",
            marginBottom: 10, letterSpacing: "-0.03em", lineHeight: 1.2,
          }}>
            {industry.title}
          </h3>

          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, marginBottom: 24 }}>
            {m.caption}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 24 }}>
            {m.tags.map(t => (
              <motion.span
                key={t}
                whileHover={{ scale: 1.05, background: `${m.color}25` }}
                style={{
                  fontSize: 10, fontWeight: 700, color: m.color,
                  background: `${m.color}12`,
                  border: `1px solid ${m.color}30`,
                  borderRadius: 20, padding: "5px 13px",
                  letterSpacing: "0.04em", cursor: "default",
                  transition: "background 0.2s",
                }}
              >
                {t}
              </motion.span>
            ))}
          </div>

          {/* CTA */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <motion.span
              whileHover={{ x: 4 }}
              style={{ fontSize: 13, fontWeight: 700, color: m.color }}
            >
              Explore Solutions
            </motion.span>
            <MagneticArrow color={m.color} />
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// CARD STYLE 2 — Light with Liquid Gradient Border
// ══════════════════════════════════════════════════════════════════════════
function MinimalCard({ industry }: { industry: Industry }) {
  const Icon = iconMap[industry.icon] || Monitor
  const m = meta[industry.icon] || fallback
  const [hovered, setHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)

  const handleMouse = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setMousePos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 })
  }

  return (
    <Link href={`/industries/${industry.slug}`} className="group block h-full" style={{ textDecoration: "none" }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          background: "#ffffff",
          border: `1.5px solid ${hovered ? m.color + "50" : "#eaeef2"}`,
          borderRadius: 24, padding: "30px",
          height: "100%", minHeight: 320,
          display: "flex", flexDirection: "column",
          position: "relative", overflow: "hidden",
          boxShadow: hovered
            ? `0 24px 60px -12px ${m.color}25, 0 0 0 1px ${m.color}15`
            : "0 2px 12px rgba(0,0,0,0.06)",
          transition: "box-shadow 0.35s, border-color 0.35s",
          cursor: "pointer",
        }}
      >
        {/* Spotlight effect */}
        {hovered && (
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: `radial-gradient(circle 180px at ${mousePos.x}% ${mousePos.y}%, ${m.color}08, transparent 70%)`,
          }} />
        )}

        {/* Top color bar */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0.2, opacity: hovered ? 1 : 0.5 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 4,
            background: `linear-gradient(90deg, ${m.color}, ${m.color}70, transparent)`,
            borderRadius: "24px 24px 0 0",
            transformOrigin: "left",
          }}
        />

        {/* Subtle dot pattern */}
        <div style={{
          position: "absolute", top: 0, right: 0, width: 120, height: 120,
          backgroundImage: `radial-gradient(${m.color}15 1px, transparent 1px)`,
          backgroundSize: "12px 12px",
          borderRadius: "0 24px 0 0",
          pointerEvents: "none",
        }} />

        {/* Icon + badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
          <motion.div
            whileHover={{ rotate: 12, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{
              width: 50, height: 50, borderRadius: 14,
              background: `${m.color}10`, border: `1.5px solid ${m.color}25`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            <Icon size={22} color={m.color} />
          </motion.div>
          <motion.span
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{ fontSize: 22 }}
          >
            {m.emoji}
          </motion.span>
        </div>

        <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0a0f1e", marginBottom: 8, letterSpacing: "-0.025em" }}>
          {industry.title}
        </h3>

        <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.75, marginBottom: 20, flex: 1 }}>
          {m.caption}
        </p>

        {/* Animated progress bars */}
        <div style={{ marginBottom: 20 }}>
          {[
            { label: m.stat1Label, value: m.stat1, pct: 65 },
            { label: m.stat2Label, value: m.stat2, pct: 78 },
          ].map((s, i) => (
            <div key={i} style={{ marginBottom: i === 0 ? 12 : 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>{s.label}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: m.color }}>{s.value}</span>
              </div>
              <div style={{ height: 6, background: "#f1f5f9", borderRadius: 4, overflow: "hidden" }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    height: "100%",
                    background: `linear-gradient(90deg, ${m.color}, ${m.color}70)`,
                    borderRadius: 4,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
          {m.tags.slice(0, 3).map(t => (
            <span key={t} style={{
              fontSize: 10, fontWeight: 700, color: m.color,
              background: `${m.color}08`, border: `1px solid ${m.color}20`,
              borderRadius: 20, padding: "4px 10px",
            }}>
              {t}
            </span>
          ))}
        </div>

        <div style={{
          display: "flex", alignItems: "center", gap: 6,
          paddingTop: 16, borderTop: `1px solid ${m.color}12`,
        }}>
          <motion.span
            animate={{ x: hovered ? 3 : 0 }}
            style={{ fontSize: 13, fontWeight: 700, color: m.color }}
          >
            Explore Solutions
          </motion.span>
          <motion.div animate={{ x: hovered ? 5 : 0 }}>
            <ArrowUpRight size={14} color={m.color} />
          </motion.div>
        </div>
      </motion.div>
    </Link>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// CARD STYLE 3 — Dark Neon with Circuit Board Aesthetic
// ══════════════════════════════════════════════════════════════════════════
function NeonCard({ industry }: { industry: Industry }) {
  const Icon = iconMap[industry.icon] || Monitor
  const m = meta[industry.icon] || fallback
  const [hovered, setHovered] = useState(false)

  return (
    <Link href={`/industries/${industry.slug}`} className="group block h-full" style={{ textDecoration: "none" }}>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
        style={{
          background: m.gradient,
          borderRadius: 24, padding: "30px",
          height: "100%", minHeight: 320,
          display: "flex", flexDirection: "column",
          position: "relative", overflow: "hidden",
          border: `1px solid ${m.color}20`,
          boxShadow: hovered
            ? `0 0 0 1px ${m.color}40, 0 20px 60px rgba(0,0,0,0.5), 0 0 80px ${m.color}15`
            : `0 0 0 1px ${m.color}10, 0 8px 32px rgba(0,0,0,0.4)`,
          transition: "box-shadow 0.4s",
          cursor: "pointer",
        }}
      >
        {/* Circuit lines */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.08, pointerEvents: "none" }} viewBox="0 0 300 300">
          <motion.path
            d="M 20 150 L 80 150 L 80 80 L 200 80 L 200 150 L 280 150"
            stroke={m.color} strokeWidth="1.5" fill="none" strokeDasharray="6 4"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
          <motion.path
            d="M 20 200 L 60 200 L 60 240 L 180 240 L 180 200 L 280 200"
            stroke={m.color} strokeWidth="1" fill="none" strokeDasharray="3 6"
            animate={{ pathLength: [0, 1] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 1 }}
          />
          {[80, 200].map((x, i) => (
            <motion.circle key={i} cx={x} cy={80} r={4} fill={m.color}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            />
          ))}
        </svg>

        {/* Neon glow pulse */}
        <motion.div
          animate={{ opacity: hovered ? [0.4, 0.8, 0.4] : [0.1, 0.25, 0.1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          style={{
            position: "absolute", inset: 0, borderRadius: 24,
            boxShadow: `inset 0 0 40px ${m.color}20`,
            pointerEvents: "none",
          }}
        />

        <ParticleField color={m.color} />

        <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column" }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
            <motion.div
              whileHover={{ rotate: 15 }}
              style={{
                width: 46, height: 46, borderRadius: 14,
                background: `${m.color}15`, border: `1px solid ${m.color}40`,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: `0 0 16px ${m.color}30`,
              }}
            >
              <Icon size={20} color={m.color} />
            </motion.div>
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>
                {industry.title}
              </h3>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                <motion.div
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80" }}
                />
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>ACTIVE</span>
              </div>
            </div>
            <motion.span
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
              style={{ fontSize: 20, marginLeft: "auto" }}
            >
              {m.emoji}
            </motion.span>
          </div>

          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, marginBottom: 20, flex: 1 }}>
            {m.caption}
          </p>

          {/* Stat pills */}
          <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
            {[{ v: m.stat1, l: m.stat1Label }, { v: m.stat2, l: m.stat2Label }].map((s, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05, boxShadow: `0 0 16px ${m.color}30` }}
                style={{
                  background: `${m.color}10`, border: `1px solid ${m.color}25`,
                  borderRadius: 14, padding: "10px 14px",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: 10, color: m.color, fontWeight: 700, marginTop: 3 }}>{s.l}</div>
              </motion.div>
            ))}
          </div>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
            {m.tags.slice(0, 3).map(t => (
              <span key={t} style={{
                fontSize: 10, fontWeight: 700, color: m.color,
                background: `${m.color}10`, border: `1px solid ${m.color}25`,
                borderRadius: 20, padding: "4px 11px",
                boxShadow: `0 0 8px ${m.color}15`,
              }}>
                {t}
              </span>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <motion.span
              animate={{ x: hovered ? 4 : 0 }}
              style={{ fontSize: 13, fontWeight: 700, color: m.color, textShadow: `0 0 12px ${m.color}50` }}
            >
              Explore Solutions
            </motion.span>
            <motion.div animate={{ x: hovered ? 4 : 0 }}>
              <ArrowUpRight size={14} color={m.color} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

// ══════════════════════════════════════════════════════════════════════════
// CARD STYLE 4 — Wide Hero Card (Startups)
// ══════════════════════════════════════════════════════════════════════════
function WideCard({ industry }: { industry: Industry }) {
  const Icon = iconMap[industry.icon] || Monitor
  const m = meta[industry.icon] || fallback
  const [hovered, setHovered] = useState(false)

  return (
    <Link href={`/industries/${industry.slug}`} className="group block" style={{ textDecoration: "none" }}>
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ scale: 1.008 }}
        transition={{ duration: 0.3 }}
        style={{
          background: m.gradient,
          borderRadius: 28, overflow: "hidden",
          position: "relative",
          display: "grid",
          gridTemplateColumns: "1.2fr 1fr 1fr",
          minHeight: 240,
          border: `1px solid ${m.color}20`,
          boxShadow: hovered
            ? `0 0 0 1px ${m.color}30, 0 24px 60px rgba(0,0,0,0.5), 0 0 100px ${m.color}12`
            : `0 0 0 1px rgba(255,255,255,0.04), 0 16px 48px rgba(0,0,0,0.4)`,
          transition: "box-shadow 0.4s",
          cursor: "pointer",
        }}
      >
        <ParticleField color={m.color} />

        {/* Diagonal separator lines */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.05, pointerEvents: "none" }} viewBox="0 0 900 240" preserveAspectRatio="none">
          {[0, 1, 2, 3, 4, 5].map(i => (
            <motion.line key={i}
              x1={120 * i} y1="0" x2={120 * i + 180} y2="240"
              stroke={m.color} strokeWidth="1"
              animate={{ opacity: [0.3, 0.9, 0.3] }}
              transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.4 }}
            />
          ))}
        </svg>

        {/* Left panel */}
        <div style={{ padding: "40px 36px", position: "relative", borderRight: "1px solid rgba(255,255,255,0.06)" }}>
          <motion.div
            whileHover={{ rotate: 12, scale: 1.1 }}
            style={{
              width: 52, height: 52, borderRadius: 16,
              background: `${m.color}20`, border: `1px solid ${m.color}40`,
              display: "flex", alignItems: "center", justifyContent: "center",
              marginBottom: 22,
              boxShadow: `0 0 20px ${m.color}25`,
            }}
          >
            <Icon size={24} color={m.color} />
          </motion.div>

          <h3 style={{ fontSize: 28, fontWeight: 900, color: "#fff", marginBottom: 10, letterSpacing: "-0.03em" }}>
            {industry.title}
          </h3>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 28 }}>
            {m.caption}
          </p>

          <motion.div
            whileHover={{ x: 6 }}
            style={{ display: "flex", alignItems: "center", gap: 8 }}
          >
            <span style={{ fontSize: 14, fontWeight: 700, color: m.color }}>Explore Solutions</span>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: `${m.color}20`, border: `1px solid ${m.color}40`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <ArrowUpRight size={13} color={m.color} />
            </div>
          </motion.div>
        </div>

        {/* Mid panel */}
        <div style={{ padding: "40px 32px", position: "relative", borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", justifyContent: "center", gap: 22 }}>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {[
              { v: m.stat1, l: m.stat1Label },
              { v: m.stat2, l: m.stat2Label },
              { v: m.stat3, l: m.stat3Label },
            ].map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.12 }}
              >
                <div style={{ fontSize: 32, fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-0.03em" }}>{s.v}</div>
                <div style={{ fontSize: 10, color: m.color, fontWeight: 700, marginTop: 5, letterSpacing: "0.06em", textTransform: "uppercase" }}>{s.l}</div>
              </motion.div>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {m.tags.map(t => (
              <span key={t} style={{
                fontSize: 10, fontWeight: 700, color: m.color,
                background: `${m.color}12`, border: `1px solid ${m.color}25`,
                borderRadius: 20, padding: "4px 11px",
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div style={{ padding: "40px 32px", position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", gap: 16 }}>
          {m.bullets.map((b, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, x: 16 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ x: 4 }}
              style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
            >
              <div style={{
                width: 22, height: 22, borderRadius: "50%",
                background: `${m.color}15`, border: `1px solid ${m.color}35`,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, marginTop: 1,
                boxShadow: `0 0 8px ${m.color}20`,
              }}>
                <CheckCircle2 size={11} color={m.color} />
              </div>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>{b}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </Link>
  )
}

// ── Card style assignment ────────────────────────────────────────────────
const cardStyles: Record<string, "glass" | "minimal" | "neon" | "wide"> = {
  Heart: "glass",
  DollarSign: "glass",
  Factory: "minimal",
  Truck: "minimal",
  GraduationCap: "minimal",
  Monitor: "neon",
  Hotel: "neon",
  Building: "neon",
  ShoppingCart: "minimal",
  Rocket: "wide",
}

const colSpans: Record<string, string> = {
  Heart: "lg:col-span-2",
  DollarSign: "lg:col-span-1",
  Factory: "lg:col-span-1",
  Truck: "lg:col-span-1",
  GraduationCap: "lg:col-span-1",
  Monitor: "lg:col-span-2",
  Hotel: "lg:col-span-1",
  Building: "lg:col-span-1",
  ShoppingCart: "lg:col-span-2",
  Rocket: "lg:col-span-3",
}

// ── Marquee ─────────────────────────────────────────────────────────────
function IndustryMarquee() {
  const items = [
    { label: "Healthcare", emoji: "🏥" },
    { label: "E-Commerce", emoji: "🛒" },
    { label: "Manufacturing", emoji: "🏭" },
    { label: "Logistics", emoji: "🚚" },
    { label: "Finance", emoji: "💰" },
    { label: "Education", emoji: "🎓" },
    { label: "Hospitality", emoji: "🏨" },
    { label: "Real Estate", emoji: "🏢" },
    { label: "Technology", emoji: "💻" },
    { label: "Startups", emoji: "🚀" },
  ]
  const doubled = [...items, ...items]

  return (
    <div style={{
      background: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
      overflow: "hidden", padding: "14px 0",
      borderTop: "1px solid rgba(255,255,255,0.1)",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
      position: "relative",
    }}>
      {/* Fade edges */}
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(90deg, #1d4ed8, transparent)", zIndex: 1 }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(-90deg, #1d4ed8, transparent)", zIndex: 1 }} />

      <style>{`
        @keyframes mqScroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .mq-tr { display:flex; width:max-content; animation:mqScroll 40s linear infinite; }
        .mq-tr:hover { animation-play-state:paused; }
      `}</style>
      <div className="mq-tr">
        {doubled.map((item, i) => (
          <span key={i} style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "0 28px", fontSize: 11, fontWeight: 800,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap",
          }}>
            <span>{item.emoji}</span>
            {item.label}
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,0.3)", display: "inline-block" }} />
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Floating Stats ────────────────────────────────────────────────────────
function FloatingStats() {
  const stats = [
    { value: "500+", label: "Businesses Automated", icon: Users, color: "#4db8ff" },
    { value: "60%", label: "Avg Cost Reduction", icon: TrendingUp, color: "#00e5a0" },
    { value: "10M+", label: "Calls Handled", icon: Activity, color: "#ff6b9d" },
    { value: "24/7", label: "AI Uptime", icon: Globe, color: "#c084fc" },
  ]

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
      {stats.map((s, i) => {
        const SI = s.icon
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
            whileHover={{ y: -6, boxShadow: `0 16px 40px ${s.color}20` }}
            style={{
              background: "#fff",
              border: "1px solid #eaeef2",
              borderRadius: 18, padding: "18px 16px",
              textAlign: "center",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
              transition: "box-shadow 0.3s",
              cursor: "default",
            }}
          >
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: `${s.color}10`,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 10px",
            }}>
              <SI size={18} color={s.color} />
            </div>
            <p style={{ fontSize: 24, fontWeight: 900, color: "#0a0f1e", margin: 0, letterSpacing: "-0.03em" }}>{s.value}</p>
            <p style={{ fontSize: 11, color: "#94a3b8", margin: "4px 0 0", fontWeight: 500 }}>{s.label}</p>
          </motion.div>
        )
      })}
    </div>
  )
}

// ── Hero Floating Visual ──────────────────────────────────────────────────
function HeroVisual() {
  const floaters = [
    { icon: Heart,         label: "Healthcare",    color: "#ff6b9d", x: 0,   y: 0,   delay: 0 },
    { icon: ShoppingCart,  label: "E-commerce",    color: "#00e5a0", x: 180, y: 15,  delay: 0.15 },
    { icon: GraduationCap, label: "Education",     color: "#bd93f9", x: 330, y: 5,   delay: 0.3 },
    { icon: Hotel,         label: "Hospitality",   color: "#ff79c6", x: 55,  y: 140, delay: 0.45 },
    { icon: Factory,       label: "Manufacturing", color: "#ffb547", x: 220, y: 150, delay: 0.6 },
    { icon: Building,      label: "Real Estate",   color: "#ffb86c", x: 5,   y: 275, delay: 0.75 },
    { icon: Truck,         label: "Logistics",     color: "#4db8ff", x: 185, y: 285, delay: 0.9 },
    { icon: DollarSign,    label: "Finance",       color: "#50fa7b", x: 340, y: 160, delay: 1.05 },
  ]

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 480, margin: "0 auto" }}>
      {/* Background glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 55% 45%, rgba(59,130,246,0.12) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      <div style={{ position: "relative", height: 380 }}>
        {/* Connection lines */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 1 }} viewBox="0 0 480 380">
          {floaters.map((c, i) => (
            <motion.line key={i}
              x1={c.x + 72} y1={c.y + 24} x2={240} y2={190}
              stroke={c.color} strokeWidth="1" strokeDasharray="5 5"
              initial={{ opacity: 0, pathLength: 0 }}
              animate={{ opacity: 0.15, pathLength: 1 }}
              transition={{ delay: c.delay + 0.6, duration: 0.8 }}
            />
          ))}
        </svg>

        {/* Center hub */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, type: "spring", stiffness: 140, damping: 12 }}
          style={{
            position: "absolute", left: "50%", top: "50%",
            transform: "translate(-50%,-50%)",
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            borderRadius: 24, padding: "16px 24px",
            display: "flex", alignItems: "center", gap: 12,
            boxShadow: "0 8px 40px rgba(37,99,235,0.5), 0 0 0 1px rgba(255,255,255,0.12)",
            zIndex: 10,
          }}
        >
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
            <Bot size={24} color="#fff" />
          </motion.div>
          <div>
            <p style={{ fontSize: 13, fontWeight: 800, color: "#fff", margin: 0 }}>PixoraNest AI</p>
            <p style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", margin: 0 }}>10 Industries · Always On</p>
          </div>
        </motion.div>

        {/* Pulse rings */}
        {[1, 2, 3].map(i => (
          <motion.div
            key={i}
            animate={{ scale: [1, 2.5], opacity: [0.15, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
            style={{
              position: "absolute", left: "50%", top: "50%",
              transform: "translate(-50%,-50%)",
              width: 100, height: 100, borderRadius: "50%",
              border: "1px solid #3b82f6",
              pointerEvents: "none", zIndex: 0,
            }}
          />
        ))}

        {/* Floaters */}
        {floaters.map((card, i) => {
          const CIcon = card.icon
          return (
            <motion.div key={i}
              initial={{ opacity: 0, scale: 0.5, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: card.delay, duration: 0.5, type: "spring", stiffness: 130 }}
              style={{ position: "absolute", left: card.x, top: card.y, zIndex: 2 }}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.08, boxShadow: `0 8px 24px ${card.color}30` }}
                style={{
                  background: "#fff", border: "1px solid #eaeef2",
                  borderRadius: 16, padding: "10px 16px",
                  display: "flex", alignItems: "center", gap: 10,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  minWidth: 140, cursor: "default",
                  transition: "box-shadow 0.2s",
                }}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: 9,
                  background: `${card.color}12`,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <CIcon size={15} color={card.color} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#0a0f1e", whiteSpace: "nowrap" }}>
                  {card.label}
                </span>
              </motion.div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// ── Trust badges ─────────────────────────────────────────────────────────
const trustBadges = [
  { icon: Users,    label: "500+ Businesses Automated" },
  { icon: TrendingUp, label: "60% Cost Reduction" },
  { icon: Zap,      label: "3x Efficiency Gain" },
  { icon: Shield,   label: "Enterprise Secure" },
]

// ─── Main Page ────────────────────────────────────────────────────────────
export function IndustriesPageContent() {
  return (
    <div className="pt-24" style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}>

      {/* ══════════ HERO ══════════ */}
      <section className="px-4 pb-0 pt-10 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Subtle mesh bg */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `
            radial-gradient(ellipse at 70% 20%, rgba(37,99,235,0.05) 0%, transparent 50%),
            radial-gradient(ellipse at 20% 80%, rgba(99,102,241,0.04) 0%, transparent 50%)
          `,
        }} />

        {/* Subtle dot grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.3,
          backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }} />

        <div className="mx-auto max-w-7xl relative">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              <motion.div variants={fadeInUp} style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "linear-gradient(135deg, #eff6ff, #e0f2fe)",
                border: "1px solid #bfdbfe",
                borderRadius: 24, padding: "7px 16px", marginBottom: 24,
              }}>
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}>
                  <Sparkles size={13} color="#2563eb" />
                </motion.div>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#2563eb", letterSpacing: "0.06em" }}>
                  TRUSTED BY 500+ BUSINESSES WORLDWIDE
                </span>
              </motion.div>

              <motion.h1 variants={fadeInUp}
                className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
                style={{ letterSpacing: "-0.03em", lineHeight: 1.08, marginBottom: 24 }}
              >
                AI Automation for{" "}
                <span style={{ position: "relative", display: "inline-block" }}>
                  <span style={{
                    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}>
                    Every Industry
                  </span>
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.9, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      position: "absolute", bottom: -3, left: 0, right: 0, height: 3,
                      background: "linear-gradient(90deg, #2563eb, #7c3aed, #06b6d4)",
                      borderRadius: 2, transformOrigin: "left",
                    }}
                  />
                </span>
              </motion.h1>

              <motion.p variants={fadeInUp}
                className="text-lg leading-relaxed text-muted-foreground"
                style={{ maxWidth: 520, marginBottom: 36 }}
              >
                From healthcare to SaaS, we help businesses automate, scale, and grow faster with AI.
                Purpose-built solutions for every industry's unique challenges.
              </motion.p>

              <motion.div variants={fadeInUp} style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 40 }}>
                <Link href="#industries" style={{
                  background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                  color: "#fff", padding: "14px 30px", borderRadius: 14,
                  fontSize: 14, fontWeight: 700,
                  display: "inline-flex", alignItems: "center", gap: 8,
                  boxShadow: "0 4px 24px rgba(37,99,235,0.4), 0 1px 0 rgba(255,255,255,0.1) inset",
                  textDecoration: "none", transition: "transform 0.15s, box-shadow 0.15s",
                }}>
                  Explore Industries <ArrowUpRight size={16} />
                </Link>
                <Link href="/contact" style={{
                  background: "#fff", border: "1.5px solid #e2e8f0",
                  color: "#0f172a", padding: "14px 30px", borderRadius: 14,
                  fontSize: 14, fontWeight: 600,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  textDecoration: "none",
                }}>
                  Talk to Expert
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div variants={fadeInUp} style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>
                {trustBadges.map((b, i) => {
                  const BI = b.icon
                  return (
                    <motion.div
                      key={i}
                      whileHover={{ y: -2 }}
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <div style={{
                        width: 28, height: 28, borderRadius: 8,
                        background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center",
                        border: "1px solid #bfdbfe",
                      }}>
                        <BI size={13} color="#2563eb" />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#475569" }}>{b.label}</span>
                    </motion.div>
                  )
                })}
              </motion.div>
            </motion.div>

            {/* Right */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="hidden md:block"
            >
              <HeroVisual />
            </motion.div>
          </div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="hidden md:block"
            style={{ marginTop: 48 }}
          >
            <FloatingStats />
          </motion.div>
        </div>
      </section>

      {/* Marquee */}
      <div className="mt-16"><IndustryMarquee /></div>

      {/* ══════════ BENTO GRID ══════════ */}
      <SectionWrapper>
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-60px" }}>

          <motion.div variants={fadeInUp} style={{ textAlign: "center", marginBottom: 60 }}>
            <span style={{
              fontSize: 11, fontWeight: 800, letterSpacing: "0.14em",
              textTransform: "uppercase", color: "#2563eb",
              display: "block", marginBottom: 14,
            }}>
              Industries We Serve
            </span>
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl" style={{ letterSpacing: "-0.03em", marginBottom: 18 }}>
              AI Automation for{" "}
              <span style={{
                background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Every Sector
              </span>
            </h2>
            <p className="text-muted-foreground" style={{ maxWidth: 560, margin: "0 auto", lineHeight: 1.8, fontSize: 15 }}>
              Tailored AI solutions for every industry — built to handle the unique challenges
              of your business at scale.
            </p>
          </motion.div>

          {/* Grid */}
          <div id="industries" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {industries.map((industry, idx) => {
              const style = cardStyles[industry.icon] || "minimal"
              const span = colSpans[industry.icon] || "lg:col-span-1"

              return (
                <motion.div
                  key={industry.slug}
                  variants={fadeInUp}
                  className={span}
                  custom={idx}
                >
                  {style === "glass"   && <GlassCard   industry={industry} />}
                  {style === "minimal" && <MinimalCard  industry={industry} />}
                  {style === "neon"    && <NeonCard     industry={industry} />}
                  {style === "wide"    && <WideCard     industry={industry} />}
                </motion.div>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div variants={fadeInUp} style={{ marginTop: 64, textAlign: "center" }}>
            <p style={{ fontSize: 15, color: "#64748b", marginBottom: 20 }}>
              Don&apos;t see your industry? We customise AI solutions for any business.
            </p>
            <Link href="/contact" style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              color: "#fff", padding: "15px 36px", borderRadius: 14,
              fontSize: 14, fontWeight: 700,
              boxShadow: "0 4px 24px rgba(37,99,235,0.35)",
              textDecoration: "none",
            }}>
              Talk to an Expert <ArrowUpRight size={16} />
            </Link>
          </motion.div>

        </motion.div>
      </SectionWrapper>

    </div>
  )
}