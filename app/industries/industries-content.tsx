"use client"

import Link from "next/link"
import { useState, useEffect, useRef } from "react"
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

// ── useInView hook ───────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

// ── FadeIn wrapper ───────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = "", style = {} }: {
  children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties
}) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
      display: "flex",
      flexDirection: "column",
      ...style,
    }}>
      {children}
    </div>
  )
}

// ── Animated progress bar ────────────────────────────────────────────────────
function AnimBar({ pct, color, delay = 0 }: { pct: number; color: string; delay?: number }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} style={{ height: 6, background: "#f1f5f9", borderRadius: 4, overflow: "hidden" }}>
      <div style={{
        height: "100%",
        background: `linear-gradient(90deg, ${color}, ${color}70)`,
        borderRadius: 4,
        width: inView ? `${pct}%` : "0%",
        transition: `width 1.3s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }} />
    </div>
  )
}

// ── Marquee ──────────────────────────────────────────────────────────────────
function IndustryMarquee() {
  const items = [
    { label: "Healthcare", emoji: "🏥" }, { label: "E-Commerce", emoji: "🛒" },
    { label: "Manufacturing", emoji: "🏭" }, { label: "Logistics", emoji: "🚚" },
    { label: "Finance", emoji: "💰" }, { label: "Education", emoji: "🎓" },
    { label: "Hospitality", emoji: "🏨" }, { label: "Real Estate", emoji: "🏢" },
    { label: "Technology", emoji: "💻" }, { label: "Startups", emoji: "🚀" },
  ]
  const doubled = [...items, ...items]

  return (
    <div style={{
      background: "linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%)",
      overflow: "hidden",
      padding: "14px 0",
      borderTop: "1px solid rgba(255,255,255,0.1)",
      borderBottom: "1px solid rgba(255,255,255,0.1)",
      position: "relative",
      width: "100%",
      maxWidth: "100vw",
    }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(90deg, #1d4ed8, transparent)", zIndex: 1 }} />
      <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 80, background: "linear-gradient(-90deg, #1d4ed8, transparent)", zIndex: 1 }} />
      <div className="mq-tr">
        {doubled.map((item, i) => (
          <span key={i} style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "0 28px", fontSize: 11, fontWeight: 800,
            letterSpacing: "0.12em", textTransform: "uppercase",
            color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap",
          }}>
            <span>{item.emoji}</span>{item.label}
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,0.3)", display: "inline-block" }} />
          </span>
        ))}
      </div>
    </div>
  )
}

// ── FloatingStats ────────────────────────────────────────────────────────────
function FloatingStats() {
  const stats = [
    { value: "500+", label: "Businesses Automated", icon: Users, color: "#4db8ff" },
    { value: "60%", label: "Avg Cost Reduction", icon: TrendingUp, color: "#00e5a0" },
    { value: "10M+", label: "Calls Handled", icon: Activity, color: "#ff6b9d" },
    { value: "24/7", label: "AI Uptime", icon: Globe, color: "#c084fc" },
  ]
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }} className="hidden md:grid">
      {stats.map((s, i) => {
        const SI = s.icon
        return (
          <FadeIn key={i} delay={300 + i * 100}>
            <div
              style={{
                background: "#fff", border: "1px solid #eaeef2",
                borderRadius: 18, padding: "18px 16px", textAlign: "center",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                transition: "transform 0.2s, box-shadow 0.2s", cursor: "default",
                flex: 1,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 40px ${s.color}20` }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)" }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 12, background: `${s.color}10`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
                <SI size={18} color={s.color} />
              </div>
              <p style={{ fontSize: 24, fontWeight: 900, color: "#0a0f1e", margin: 0, letterSpacing: "-0.03em" }}>{s.value}</p>
              <p style={{ fontSize: 11, color: "#94a3b8", margin: "4px 0 0", fontWeight: 500 }}>{s.label}</p>
            </div>
          </FadeIn>
        )
      })}
    </div>
  )
}

// ── HeroVisual ───────────────────────────────────────────────────────────────
function HeroVisual() {
  const floaters = [
    { icon: Heart,         label: "Healthcare",    color: "#ff6b9d", float: "3.5s", delay: "0ms" },
    { icon: ShoppingCart,  label: "E-commerce",    color: "#00e5a0", float: "3.8s", delay: "150ms" },
    { icon: GraduationCap, label: "Education",     color: "#bd93f9", float: "4.1s", delay: "300ms" },
    { icon: Hotel,         label: "Hospitality",   color: "#ff79c6", float: "3.6s", delay: "450ms" },
    { icon: Factory,       label: "Manufacturing", color: "#ffb547", float: "4.3s", delay: "600ms" },
    { icon: Building,      label: "Real Estate",   color: "#ffb86c", float: "3.9s", delay: "750ms" },
    { icon: Truck,         label: "Logistics",     color: "#4db8ff", float: "4.0s", delay: "900ms" },
    { icon: DollarSign,    label: "Finance",       color: "#50fa7b", float: "4.2s", delay: "1050ms" },
  ]
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 480, margin: "0 auto" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 55% 45%, rgba(59,130,246,0.12) 0%, transparent 65%)", pointerEvents: "none" }} />

      {/* Center hub */}
      <div style={{
        background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
        borderRadius: 24, padding: "16px 24px",
        display: "flex", alignItems: "center", gap: 12,
        boxShadow: "0 8px 40px rgba(37,99,235,0.5), 0 0 0 1px rgba(255,255,255,0.12)",
        width: "fit-content", margin: "0 auto 20px",
        animation: "fadeSlideUp 0.5s ease 2s both",
      }}>
        <div style={{ animation: "spin 10s linear infinite" }}>
          <Bot size={24} color="#fff" />
        </div>
        <div>
          <p style={{ fontSize: 13, fontWeight: 800, color: "#fff", margin: 0 }}>PixoraNest AI</p>
          <p style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", margin: 0 }}>10 Industries · Always On</p>
        </div>
      </div>

      {/* 2-col grid of floater cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {floaters.map((card, i) => {
          const CIcon = card.icon
          return (
            <div key={i} style={{ opacity: 0, animation: `fadeSlideUp 0.5s ease ${card.delay} forwards` }}>
              <div
                style={{
                  background: "#fff", border: "1px solid #eaeef2",
                  borderRadius: 16, padding: "10px 14px",
                  display: "flex", alignItems: "center", gap: 10,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  cursor: "default",
                  animation: `floatUpDown ${card.float} ease-in-out ${i * 300}ms infinite`,
                  transition: "box-shadow 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 8px 24px ${card.color}30` }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)" }}
              >
                <div style={{ width: 32, height: 32, borderRadius: 9, background: `${card.color}12`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <CIcon size={15} color={card.color} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#0a0f1e", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{card.label}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── GlassCard ────────────────────────────────────────────────────────────────
function GlassCard({ industry }: { industry: Industry }) {
  const Icon = iconMap[industry.icon] || Monitor
  const m = meta[industry.icon] || fallback
  const [hovered, setHovered] = useState(false)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const ref = useRef<HTMLDivElement>(null)

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setMousePos({ x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 })
  }

  return (
    <Link href={`/industries/${industry.slug}`} className="group flex flex-col flex-1" style={{ textDecoration: "none" }}>
      <div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: m.gradient, borderRadius: 28, padding: "40px 36px",
          flex: 1, display: "flex", flexDirection: "column",
          position: "relative", overflow: "hidden",
          border: `1px solid ${m.color}15`,
          boxShadow: hovered ? `0 0 0 1px ${m.color}30, 0 30px 70px rgba(0,0,0,0.7)` : `0 0 0 1px rgba(255,255,255,0.04), 0 20px 60px rgba(0,0,0,0.6)`,
          cursor: "pointer",
          transform: hovered ? "scale(1.02)" : "scale(1)",
          transition: "transform 0.35s ease, box-shadow 0.35s ease",
        }}
      >
        {hovered && (
          <div style={{
            position: "absolute", inset: 0,
            background: `radial-gradient(circle 200px at ${mousePos.x}% ${mousePos.y}%, ${m.color}12, transparent 60%)`,
            pointerEvents: "none",
          }} />
        )}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent 0%, ${m.color}80 50%, transparent 100%)` }} />
        <div style={{
          position: "absolute", width: 250, height: 250, borderRadius: "50%",
          background: m.color, filter: "blur(80px)",
          top: -100, right: -80, pointerEvents: "none", opacity: hovered ? 0.4 : 0.2,
          transition: "opacity 0.5s ease",
        }} />

        <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
            <div style={{
              width: 58, height: 58, borderRadius: 18,
              background: `linear-gradient(135deg, ${m.color}25, ${m.color}08)`,
              border: `1px solid ${m.color}40`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 0 20px ${m.color}30`,
              transition: "transform 0.2s",
              transform: hovered ? "rotate(20deg) scale(1.15)" : "none",
            }}>
              <Icon size={26} color={m.color} />
            </div>
            <span style={{ fontSize: 28, animation: "floatUpDown 3s ease-in-out infinite" }}>{m.emoji}</span>
          </div>

          <div style={{ display: "flex", gap: 0, marginBottom: 32 }}>
            {[{ v: m.stat1, l: m.stat1Label }, { v: m.stat2, l: m.stat2Label }, { v: m.stat3, l: m.stat3Label }].map((s, i) => (
              <div key={i} style={{
                flex: 1,
                paddingRight: i < 2 ? 18 : 0,
                paddingLeft: i > 0 ? 18 : 0,
                borderRight: i < 2 ? `1px solid rgba(255,255,255,0.06)` : "none",
                minWidth: 0,
              }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-0.03em" }}>{s.v}</div>
                <div style={{ fontSize: 10, color: m.color, fontWeight: 700, marginTop: 5, letterSpacing: "0.06em", textTransform: "uppercase" }}>{s.l}</div>
              </div>
            ))}
          </div>

          <div style={{ flex: 1 }} />

          <h3 style={{ fontSize: 26, fontWeight: 900, color: "#fff", marginBottom: 10, letterSpacing: "-0.03em", lineHeight: 1.2 }}>
            {industry.title}
          </h3>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, marginBottom: 24 }}>{m.caption}</p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 24 }}>
            {m.tags.map(t => (
              <span key={t} style={{
                fontSize: 10, fontWeight: 700, color: m.color,
                background: `${m.color}12`, border: `1px solid ${m.color}30`,
                borderRadius: 20, padding: "5px 13px", letterSpacing: "0.04em",
              }}>{t}</span>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: m.color, transform: hovered ? "translateX(4px)" : "", transition: "transform 0.2s" }}>
              Explore Solutions
            </span>
            <div style={{
              width: 36, height: 36, borderRadius: "50%",
              background: `${m.color}20`, border: `1px solid ${m.color}50`,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <ArrowUpRight size={15} color={m.color} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ── MinimalCard ──────────────────────────────────────────────────────────────
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
    <Link href={`/industries/${industry.slug}`} className="group flex flex-col flex-1" style={{ textDecoration: "none" }}>
      <div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "#ffffff",
          border: `1.5px solid ${hovered ? m.color + "50" : "#eaeef2"}`,
          borderRadius: 24, padding: "30px",
          flex: 1, display: "flex", flexDirection: "column",
          position: "relative", overflow: "hidden",
          boxShadow: hovered ? `0 24px 60px -12px ${m.color}25, 0 0 0 1px ${m.color}15` : "0 2px 12px rgba(0,0,0,0.06)",
          transform: hovered ? "translateY(-6px)" : "",
          transition: "box-shadow 0.35s, border-color 0.35s, transform 0.3s ease",
          cursor: "pointer",
        }}
      >
        {hovered && (
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: `radial-gradient(circle 180px at ${mousePos.x}% ${mousePos.y}%, ${m.color}08, transparent 70%)`,
          }} />
        )}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 4,
          background: `linear-gradient(90deg, ${m.color}, ${m.color}70, transparent)`,
          borderRadius: "24px 24px 0 0",
          transformOrigin: "left",
          transform: hovered ? "scaleX(1)" : "scaleX(0.2)",
          opacity: hovered ? 1 : 0.5,
          transition: "transform 0.4s ease, opacity 0.4s ease",
        }} />
        <div style={{
          position: "absolute", top: 0, right: 0, width: 120, height: 120,
          backgroundImage: `radial-gradient(${m.color}15 1px, transparent 1px)`,
          backgroundSize: "12px 12px", borderRadius: "0 24px 0 0", pointerEvents: "none",
        }} />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22 }}>
          <div style={{
            width: 50, height: 50, borderRadius: 14,
            background: `${m.color}10`, border: `1.5px solid ${m.color}25`,
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: "transform 0.2s",
            transform: hovered ? "rotate(12deg) scale(1.1)" : "",
          }}>
            <Icon size={22} color={m.color} />
          </div>
          <span style={{ fontSize: 22, animation: "floatUpDown 2.5s ease-in-out infinite" }}>{m.emoji}</span>
        </div>

        <h3 style={{ fontSize: 20, fontWeight: 800, color: "#0a0f1e", marginBottom: 8, letterSpacing: "-0.025em" }}>{industry.title}</h3>
        <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.75, marginBottom: 20, flex: 1 }}>{m.caption}</p>

        <div style={{ marginBottom: 20 }}>
          {[{ label: m.stat1Label, value: m.stat1, pct: 65 }, { label: m.stat2Label, value: m.stat2, pct: 78 }].map((s, i) => (
            <div key={i} style={{ marginBottom: i === 0 ? 12 : 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>{s.label}</span>
                <span style={{ fontSize: 13, fontWeight: 800, color: m.color }}>{s.value}</span>
              </div>
              <AnimBar pct={s.pct} color={m.color} delay={i * 200} />
            </div>
          ))}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
          {m.tags.slice(0, 3).map(t => (
            <span key={t} style={{
              fontSize: 10, fontWeight: 700, color: m.color,
              background: `${m.color}08`, border: `1px solid ${m.color}20`,
              borderRadius: 20, padding: "4px 10px",
            }}>{t}</span>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 6, paddingTop: 16, borderTop: `1px solid ${m.color}12`, marginTop: "auto" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: m.color, transform: hovered ? "translateX(3px)" : "", transition: "transform 0.2s" }}>
            Explore Solutions
          </span>
          <div style={{ transform: hovered ? "translateX(5px)" : "", transition: "transform 0.2s" }}>
            <ArrowUpRight size={14} color={m.color} />
          </div>
        </div>
      </div>
    </Link>
  )
}

// ── NeonCard ─────────────────────────────────────────────────────────────────
function NeonCard({ industry }: { industry: Industry }) {
  const Icon = iconMap[industry.icon] || Monitor
  const m = meta[industry.icon] || fallback
  const [hovered, setHovered] = useState(false)

  return (
    <Link href={`/industries/${industry.slug}`} className="group flex flex-col flex-1" style={{ textDecoration: "none" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: m.gradient, borderRadius: 24, padding: "30px",
          flex: 1, display: "flex", flexDirection: "column",
          position: "relative", overflow: "hidden",
          border: `1px solid ${m.color}20`,
          boxShadow: hovered
            ? `0 0 0 1px ${m.color}40, 0 20px 60px rgba(0,0,0,0.5), 0 0 80px ${m.color}15`
            : `0 0 0 1px ${m.color}10, 0 8px 32px rgba(0,0,0,0.4)`,
          transform: hovered ? "scale(1.02)" : "scale(1)",
          transition: "box-shadow 0.4s, transform 0.3s ease",
          cursor: "pointer",
        }}
      >
        <div style={{
          position: "absolute", inset: 0, borderRadius: 24,
          boxShadow: `inset 0 0 40px ${m.color}20`,
          pointerEvents: "none",
          opacity: hovered ? 0.8 : 0.1,
          transition: "opacity 0.4s",
        }} />

        <div style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
            <div style={{
              width: 46, height: 46, borderRadius: 14,
              background: `${m.color}15`, border: `1px solid ${m.color}40`,
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 0 16px ${m.color}30`,
              transition: "transform 0.2s",
              transform: hovered ? "rotate(15deg)" : "",
            }}>
              <Icon size={20} color={m.color} />
            </div>
            <div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>{industry.title}</h3>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#4ade80", animation: "pulse 1.5s infinite" }} />
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 600 }}>ACTIVE</span>
              </div>
            </div>
            <span style={{ fontSize: 20, marginLeft: "auto", animation: "floatUpDown 2.5s ease-in-out 0.5s infinite" }}>{m.emoji}</span>
          </div>

          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.75, marginBottom: 20, flex: 1 }}>{m.caption}</p>

          <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
            {[{ v: m.stat1, l: m.stat1Label }, { v: m.stat2, l: m.stat2Label }].map((s, i) => (
              <div key={i} style={{
                background: `${m.color}10`, border: `1px solid ${m.color}25`,
                borderRadius: 14, padding: "10px 14px",
                transition: "box-shadow 0.2s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 16px ${m.color}30` }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = "" }}
              >
                <div style={{ fontSize: 22, fontWeight: 900, color: "#fff", lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontSize: 10, color: m.color, fontWeight: 700, marginTop: 3 }}>{s.l}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 18 }}>
            {m.tags.slice(0, 3).map(t => (
              <span key={t} style={{
                fontSize: 10, fontWeight: 700, color: m.color,
                background: `${m.color}10`, border: `1px solid ${m.color}25`,
                borderRadius: 20, padding: "4px 11px",
                boxShadow: `0 0 8px ${m.color}15`,
              }}>{t}</span>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: "auto" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: m.color, transform: hovered ? "translateX(4px)" : "", transition: "transform 0.2s" }}>
              Explore Solutions
            </span>
            <div style={{ transform: hovered ? "translateX(4px)" : "", transition: "transform 0.2s" }}>
              <ArrowUpRight size={14} color={m.color} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

// ── WideCard ──────────────────────────────────────────────────────────────────
function WideCard({ industry }: { industry: Industry }) {
  const Icon = iconMap[industry.icon] || Monitor
  const m = meta[industry.icon] || fallback
  const [hovered, setHovered] = useState(false)

  return (
    <Link href={`/industries/${industry.slug}`} className="group block" style={{ textDecoration: "none" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: m.gradient, borderRadius: 28, overflow: "hidden",
          position: "relative",
          display: "flex", flexDirection: "row", flexWrap: "wrap",
          border: `1px solid ${m.color}20`,
          boxShadow: hovered
            ? `0 0 0 1px ${m.color}30, 0 24px 60px rgba(0,0,0,0.5), 0 0 100px ${m.color}12`
            : `0 0 0 1px rgba(255,255,255,0.04), 0 16px 48px rgba(0,0,0,0.4)`,
          transform: hovered ? "scale(1.008)" : "scale(1)",
          transition: "box-shadow 0.4s, transform 0.3s ease",
          cursor: "pointer",
        }}
      >
        {/* Left panel */}
        <div style={{
          padding: "40px 36px", position: "relative",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          flex: "1 1 220px", minWidth: 0,
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: 16,
            background: `${m.color}20`, border: `1px solid ${m.color}40`,
            display: "flex", alignItems: "center", justifyContent: "center",
            marginBottom: 22, boxShadow: `0 0 20px ${m.color}25`,
            transition: "transform 0.2s",
            transform: hovered ? "rotate(12deg) scale(1.1)" : "",
          }}>
            <Icon size={24} color={m.color} />
          </div>
          <h3 style={{ fontSize: 28, fontWeight: 900, color: "#fff", marginBottom: 10, letterSpacing: "-0.03em" }}>{industry.title}</h3>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, marginBottom: 28 }}>{m.caption}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, transform: hovered ? "translateX(6px)" : "", transition: "transform 0.2s" }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: m.color }}>Explore Solutions</span>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: `${m.color}20`, border: `1px solid ${m.color}40`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <ArrowUpRight size={13} color={m.color} />
            </div>
          </div>
        </div>

        {/* Mid panel */}
        <div style={{
          padding: "40px 32px", position: "relative",
          borderRight: "1px solid rgba(255,255,255,0.06)",
          display: "flex", flexDirection: "column", justifyContent: "center", gap: 22,
          flex: "1 1 200px", minWidth: 0,
        }}>
          <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
            {[{ v: m.stat1, l: m.stat1Label }, { v: m.stat2, l: m.stat2Label }, { v: m.stat3, l: m.stat3Label }].map((s, i) => (
              <div key={i} style={{ minWidth: 0 }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: "#fff", lineHeight: 1, letterSpacing: "-0.03em" }}>{s.v}</div>
                <div style={{ fontSize: 10, color: m.color, fontWeight: 700, marginTop: 5, letterSpacing: "0.06em", textTransform: "uppercase" }}>{s.l}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
            {m.tags.map(t => (
              <span key={t} style={{
                fontSize: 10, fontWeight: 700, color: m.color,
                background: `${m.color}12`, border: `1px solid ${m.color}25`,
                borderRadius: 20, padding: "4px 11px",
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Right panel */}
        <div style={{
          padding: "40px 32px", position: "relative",
          display: "flex", flexDirection: "column", justifyContent: "center", gap: 16,
          flex: "1 1 200px", minWidth: 0,
        }}>
          {m.bullets.map((b, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, transition: "transform 0.2s" }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateX(4px)" }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = "" }}
            >
              <div style={{ width: 22, height: 22, borderRadius: "50%", background: `${m.color}15`, border: `1px solid ${m.color}35`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, boxShadow: `0 0 8px ${m.color}20` }}>
                <CheckCircle2 size={11} color={m.color} />
              </div>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>{b}</span>
            </div>
          ))}
        </div>
      </div>
    </Link>
  )
}

// ── Card style assignment ────────────────────────────────────────────────────
const cardStyles: Record<string, "glass" | "minimal" | "neon" | "wide"> = {
  Heart: "glass", DollarSign: "glass",
  Factory: "minimal", Truck: "minimal", GraduationCap: "minimal", ShoppingCart: "minimal",
  Monitor: "neon", Hotel: "neon", Building: "neon",
  Rocket: "wide",
}

const colSpans: Record<string, string> = {
  Heart: "lg:col-span-1",
  DollarSign: "lg:col-span-1",
  Factory: "lg:col-span-1",
  Truck: "lg:col-span-1",
  GraduationCap: "lg:col-span-1",
  Monitor: "lg:col-span-1",
  Hotel: "lg:col-span-1",
  Building: "lg:col-span-1",
  ShoppingCart: "lg:col-span-1",
  Rocket: "lg:col-span-3",
}

const trustBadges = [
  { icon: Users, label: "500+ Businesses Automated" },
  { icon: TrendingUp, label: "60% Cost Reduction" },
  { icon: Zap, label: "3x Efficiency Gain" },
  { icon: Shield, label: "Enterprise Secure" },
]

// ─── Main Page ────────────────────────────────────────────────────────────────
export function IndustriesPageContent() {
  return (
    <div className="pt-24 overflow-x-hidden" style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <style>{`
        @keyframes mqScroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .mq-tr { display:flex; width:max-content; animation:mqScroll 40s linear infinite; }
        .mq-tr:hover { animation-play-state:paused; }
        @keyframes floatUpDown { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.2} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fadeSlideUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes underlineGrow { from{transform:scaleX(0)} to{transform:scaleX(1)} }
        @keyframes spinSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      `}</style>

      {/* ══════════ HERO ══════════
          Outer section: full-bleed (no horizontal padding here)
          Inner max-w container: carries all the padding
      */}
      <section className="relative overflow-hidden pb-0 pt-10">
        {/* Background decorations */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: `radial-gradient(ellipse at 70% 20%, rgba(37,99,235,0.05) 0%, transparent 50%), radial-gradient(ellipse at 20% 80%, rgba(99,102,241,0.04) 0%, transparent 50%)`,
        }} />
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.3, backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        {/* ── Centered content container ── */}
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12 xl:px-16 relative">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left */}
            <div style={{ animation: "fadeSlideUp 0.6s ease both" }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "linear-gradient(135deg, #eff6ff, #e0f2fe)",
                border: "1px solid #bfdbfe", borderRadius: 24,
                padding: "7px 16px", marginBottom: 24,
                animation: "fadeSlideUp 0.5s ease 0.1s both",
              }}>
                <div style={{ animation: "spinSlow 8s linear infinite" }}>
                  <Sparkles size={13} color="#2563eb" />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#2563eb", letterSpacing: "0.06em" }}>
                  TRUSTED BY 500+ BUSINESSES WORLDWIDE
                </span>
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
                style={{ letterSpacing: "-0.03em", lineHeight: 1.08, marginBottom: 24, animation: "fadeSlideUp 0.5s ease 0.15s both" }}>
                AI Automation for{" "}
                <span style={{ position: "relative", display: "inline-block" }}>
                  <span style={{
                    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}>Every Industry</span>
                  <div style={{
                    position: "absolute", bottom: -3, left: 0, right: 0, height: 3,
                    background: "linear-gradient(90deg, #2563eb, #7c3aed, #06b6d4)",
                    borderRadius: 2, transformOrigin: "left",
                    animation: "underlineGrow 0.6s ease 0.9s both",
                  }} />
                </span>
              </h1>

              <p className="text-lg leading-relaxed text-muted-foreground"
                style={{ maxWidth: 520, marginBottom: 36, animation: "fadeSlideUp 0.5s ease 0.2s both" }}>
                From healthcare to SaaS, we help businesses automate, scale, and grow faster with AI.
                Purpose-built solutions for every industry&apos;s unique challenges.
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 40, animation: "fadeSlideUp 0.5s ease 0.25s both" }}>
                <Link href="#industries" style={{
                  background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                  color: "#fff", padding: "14px 30px", borderRadius: 14,
                  fontSize: 14, fontWeight: 700,
                  display: "inline-flex", alignItems: "center", gap: 8,
                  boxShadow: "0 4px 24px rgba(37,99,235,0.4), 0 1px 0 rgba(255,255,255,0.1) inset",
                  textDecoration: "none",
                }}>
                  Explore Industries <ArrowUpRight size={16} />
                </Link>
                <Link href="/contact" style={{
                  background: "#fff", border: "1.5px solid #e2e8f0",
                  color: "#0f172a", padding: "14px 30px", borderRadius: 14,
                  fontSize: 14, fontWeight: 600,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)", textDecoration: "none",
                }}>
                  Talk to Expert
                </Link>
              </div>

              {/* Trust badges */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 14, animation: "fadeSlideUp 0.5s ease 0.3s both" }}>
                {trustBadges.map((b, i) => {
                  const BI = b.icon
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: 8,
                        background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center",
                        border: "1px solid #bfdbfe",
                      }}>
                        <BI size={13} color="#2563eb" />
                      </div>
                      <span style={{ fontSize: 12, fontWeight: 600, color: "#475569" }}>{b.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Right – hidden on mobile, shown md+ */}
            <div className="hidden md:block" style={{ animation: "fadeSlideUp 0.8s ease 0.2s both" }}>
              <HeroVisual />
            </div>
          </div>

          {/* Stats row */}
          <div style={{ marginTop: 48, marginBottom: 0, animation: "fadeSlideUp 0.6s ease 1.5s both" }}>
            <FloatingStats />
          </div>
        </div>

        {/* Bottom padding for hero */}
        <div className="h-16 lg:h-20" />
      </section>

      {/* ══════════ MARQUEE — intentionally full-bleed ══════════ */}
      <div className="w-full overflow-hidden">
        <IndustryMarquee />
      </div>

      {/* ══════════ BENTO GRID ══════════
          SectionWrapper now owns: max-w-7xl, px-4 sm:px-6 lg:px-12 xl:px-16, py-16 lg:py-20
          No extra padding wrappers needed inside.
      */}
      <SectionWrapper id="industries">
        {/* Section header */}
        <FadeIn style={{ textAlign: "center", marginBottom: 60, display: "block" }}>
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", textTransform: "uppercase", color: "#2563eb", display: "block", marginBottom: 14 }}>
            Industries We Serve
          </span>
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl" style={{ letterSpacing: "-0.03em", marginBottom: 18 }}>
            AI Automation for{" "}
            <span style={{
              background: "linear-gradient(135deg, #2563eb, #7c3aed)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>Every Sector</span>
          </h2>
          <p className="text-muted-foreground" style={{ maxWidth: 560, margin: "0 auto", lineHeight: 1.8, fontSize: 15 }}>
            Tailored AI solutions for every industry — built to handle the unique challenges of your business at scale.
          </p>
        </FadeIn>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8 items-stretch">
          {industries.map((industry, idx) => {
            const style = cardStyles[industry.icon] || "minimal"
            const span = colSpans[industry.icon] || "lg:col-span-1"
            return (
              <FadeIn key={industry.slug} delay={idx * 60} className={`${span} flex flex-col`}>
                {style === "glass"   && <GlassCard   industry={industry} />}
                {style === "minimal" && <MinimalCard  industry={industry} />}
                {style === "neon"    && <NeonCard     industry={industry} />}
                {style === "wide"    && <WideCard     industry={industry} />}
              </FadeIn>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <FadeIn style={{ marginTop: 64, textAlign: "center", display: "block" }}>
          <p style={{ fontSize: 15, color: "#64748b", marginBottom: 20 }}>
            Don&apos;t see your industry? We customise AI solutions for any business.
          </p>
          <Link href="/contact" style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
            color: "#fff", padding: "15px 36px", borderRadius: 14,
            fontSize: 14, fontWeight: 700,
            boxShadow: "0 4px 24px rgba(37,99,235,0.35)", textDecoration: "none",
          }}>
            Talk to an Expert <ArrowUpRight size={16} />
          </Link>
        </FadeIn>
      </SectionWrapper>
    </div>
  )
}