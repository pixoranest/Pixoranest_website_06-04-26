"use client"

import Link from "next/link"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useState, useRef } from "react"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { SectionWrapper } from "@/components/section-wrapper"
import { solutions } from "@/lib/data"
import {
  ArrowRight, ArrowLeft, CheckCircle2,
  Heart, ShoppingCart, Factory, Truck, DollarSign,
  GraduationCap, Hotel, Building, Monitor, Rocket,
  Phone, MessageCircle, PhoneCall, Mic, Zap, TrendingUp,
  Users, Shield, Clock, BarChart3, Bot, Plus, Minus,
  Star, Quote, Activity, Layers, ChevronRight, Globe,
} from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  Heart, ShoppingCart, Factory, Truck, DollarSign,
  GraduationCap, Hotel, Building, Monitor, Rocket,
}

// ─── Themes ───────────────────────────────────────────────────────────────
const industryTheme: Record<string, {
  color: string; light: string; gradient: string
  darkGradient: string; particleColor: string
}> = {
  Heart:         { color: "#ff6b9d", light: "#fff0f7", gradient: "from-pink-50 to-rose-50/20",    darkGradient: "linear-gradient(135deg, #0d0015 0%, #2d0035 100%)",   particleColor: "#ff6b9d" },
  ShoppingCart:  { color: "#00e5a0", light: "#f0fff8", gradient: "from-emerald-50 to-teal-50/20", darkGradient: "linear-gradient(135deg, #001a0f 0%, #003d24 100%)",   particleColor: "#00e5a0" },
  Factory:       { color: "#ffb547", light: "#fffbf0", gradient: "from-amber-50 to-yellow-50/20", darkGradient: "linear-gradient(135deg, #150a00 0%, #3d2200 100%)",   particleColor: "#ffb547" },
  Truck:         { color: "#4db8ff", light: "#f0f8ff", gradient: "from-sky-50 to-blue-50/20",    darkGradient: "linear-gradient(135deg, #000d1a 0%, #002d4d 100%)",   particleColor: "#4db8ff" },
  DollarSign:    { color: "#50fa7b", light: "#f0fff5", gradient: "from-green-50 to-emerald-50/20", darkGradient: "linear-gradient(135deg, #001a0e 0%, #003d22 100%)", particleColor: "#50fa7b" },
  GraduationCap: { color: "#bd93f9", light: "#f8f0ff", gradient: "from-violet-50 to-purple-50/20", darkGradient: "linear-gradient(135deg, #0d0020 0%, #2d0060 100%)", particleColor: "#bd93f9" },
  Hotel:         { color: "#ff79c6", light: "#fff0f8", gradient: "from-rose-50 to-pink-50/20",   darkGradient: "linear-gradient(135deg, #1a0010 0%, #4d0030 100%)",   particleColor: "#ff79c6" },
  Building:      { color: "#ffb86c", light: "#fff8f0", gradient: "from-orange-50 to-amber-50/20", darkGradient: "linear-gradient(135deg, #1a0800 0%, #4d2000 100%)",  particleColor: "#ffb86c" },
  Monitor:       { color: "#8be9fd", light: "#f0fdff", gradient: "from-cyan-50 to-sky-50/20",    darkGradient: "linear-gradient(135deg, #001520 0%, #003d55 100%)",   particleColor: "#8be9fd" },
  Rocket:        { color: "#c084fc", light: "#fdf0ff", gradient: "from-fuchsia-50 to-purple-50/20", darkGradient: "linear-gradient(135deg, #120020 0%, #3d0060 100%)", particleColor: "#c084fc" },
}

const defaultTheme = { color: "#2563eb", light: "#eff6ff", gradient: "from-blue-50 to-indigo-50/20", darkGradient: "linear-gradient(135deg, #0a1628, #1e3a5f)", particleColor: "#2563eb" }

// ─── Stats per industry ───────────────────────────────────────────────────
const industryStats: Record<string, { value: string; label: string; icon: React.ElementType }[]> = {
  Heart:         [{ value: "60%", label: "Cost reduction", icon: TrendingUp }, { value: "24/7", label: "Patient support", icon: Clock }, { value: "3x", label: "Faster response", icon: Zap }],
  ShoppingCart:  [{ value: "40%", label: "Cart recovery",  icon: TrendingUp }, { value: "24/7", label: "Support",         icon: Clock }, { value: "5x", label: "Conversion",       icon: Zap }],
  Factory:       [{ value: "55%", label: "Downtime cut",   icon: TrendingUp }, { value: "98%", label: "QA accuracy",      icon: Shield }, { value: "3x", label: "Output boost",     icon: Zap }],
  Truck:         [{ value: "35%", label: "Fuel savings",   icon: TrendingUp }, { value: "24/7", label: "Fleet live",       icon: Clock }, { value: "2x", label: "Delivery speed",   icon: Zap }],
  DollarSign:    [{ value: "80%", label: "Fraud detected", icon: Shield },    { value: "24/7", label: "Compliance",        icon: Clock }, { value: "4x", label: "Faster KYC",       icon: Zap }],
  GraduationCap: [{ value: "70%", label: "Admin saved",   icon: TrendingUp }, { value: "24/7", label: "Student support",  icon: Clock }, { value: "3x", label: "Enrolment rate",   icon: Zap }],
  Hotel:         [{ value: "50%", label: "Staff saved",   icon: TrendingUp }, { value: "24/7", label: "Guest support",    icon: Clock }, { value: "4x", label: "Booking rate",     icon: Zap }],
  Building:      [{ value: "60%", label: "Lead speed",    icon: TrendingUp }, { value: "24/7", label: "Inquiry AI",       icon: Clock }, { value: "3x", label: "Deals closed",     icon: Zap }],
  Monitor:       [{ value: "65%", label: "Support costs", icon: TrendingUp }, { value: "24/7", label: "User assist",      icon: Clock }, { value: "5x", label: "Trial convert",    icon: Zap }],
  Rocket:        [{ value: "70%", label: "Ops automated", icon: TrendingUp }, { value: "24/7", label: "Investor updates", icon: Clock }, { value: "4x", label: "Growth speed",     icon: Zap }],
}
const defaultStats = [{ value: "60%", label: "Cost reduction", icon: TrendingUp }, { value: "24/7", label: "Support", icon: Clock }, { value: "3x", label: "Faster", icon: Zap }]

// ─── Workflow steps ───────────────────────────────────────────────────────
const workflowSteps = [
  { step: "01", label: "Lead Arrives",   icon: Phone,         desc: "Customer contacts via call, WhatsApp, or web" },
  { step: "02", label: "AI Qualifies",   icon: Bot,           desc: "AI instantly qualifies and categorises the lead" },
  { step: "03", label: "CRM Updated",    icon: BarChart3,     desc: "Data synced to your CRM in real-time automatically" },
  { step: "04", label: "Follow-up Sent", icon: MessageCircle, desc: "Personalised follow-up dispatched automatically" },
  { step: "05", label: "Deal Closed",    icon: TrendingUp,    desc: "Converted customer with full audit trail" },
]

// ─── Case study data ──────────────────────────────────────────────────────
const caseStudyData: Record<string, {
  company: string; challenge: string; result: string
  before: { label: string; value: string }[]
  after: { label: string; value: string }[]
}> = {
  Heart: {
    company: "Metro Healthcare Clinic",
    challenge: "Missed 40% of patient calls due to limited reception staff during peak hours, losing patients to competitors.",
    result: "Deployed PixoraNest AI Receptionist — handling all incoming calls 24/7, booking appointments automatically.",
    before: [{ label: "Missed calls", value: "40%" }, { label: "Booking time", value: "8 min avg" }, { label: "Staff cost", value: "₹80K/mo" }],
    after:  [{ label: "Missed calls", value: "0%" },  { label: "Booking time", value: "45 sec" },    { label: "Staff cost", value: "₹28K/mo" }],
  },
  ShoppingCart: {
    company: "StyleHub E-commerce",
    challenge: "Cart abandonment rate of 68% and no system to re-engage customers who left without purchasing.",
    result: "AI-powered cart recovery via WhatsApp with personalised offers increased conversions dramatically.",
    before: [{ label: "Cart abandonment", value: "68%" }, { label: "Recovery rate", value: "4%" },  { label: "Support response", value: "6 hrs" }],
    after:  [{ label: "Cart abandonment", value: "31%" }, { label: "Recovery rate", value: "40%" }, { label: "Support response", value: "Instant" }],
  },
  Factory: {
    company: "Precision Parts Mfg.",
    challenge: "Unplanned downtime costing ₹2L+ per hour with reactive maintenance and manual QA tracking.",
    result: "AI predictive maintenance and automated QA reporting cut downtime by over 55%.",
    before: [{ label: "Downtime/month", value: "48 hrs" }, { label: "QA reports", value: "Manual, 2 days" }, { label: "Output target", value: "72%" }],
    after:  [{ label: "Downtime/month", value: "6 hrs" },  { label: "QA reports", value: "Real-time" },       { label: "Output target", value: "98%" }],
  },
  default: {
    company: "Enterprise Client",
    challenge: "Manual processes causing delays, increased operational costs, and poor customer experience at scale.",
    result: "PixoraNest AI automation transformed operations — reducing costs, improving speed, and delighting customers.",
    before: [{ label: "Response time", value: "6 hrs" },     { label: "Operational cost", value: "100%" }, { label: "Customer satisfaction", value: "62%" }],
    after:  [{ label: "Response time", value: "Instant" }, { label: "Operational cost", value: "40%" },  { label: "Customer satisfaction", value: "96%" }],
  },
}

// ─── FAQ data ─────────────────────────────────────────────────────────────
const faqData: Record<string, { q: string; a: string }[]> = {
  Heart: [
    { q: "How does AI automation help healthcare clinics reduce costs?", a: "AI replaces manual call handling, appointment booking, and follow-up reminders — cutting staff costs by 60% while maintaining 24/7 patient engagement." },
    { q: "Is patient data secure with PixoraNest AI?", a: "Yes. All patient data is encrypted, stored securely, and handled in compliance with healthcare data protection standards." },
    { q: "Can AI handle appointment rescheduling and cancellations?", a: "Absolutely. The AI manages booking, rescheduling, cancellations, and sends automated reminders to reduce no-shows." },
    { q: "How quickly can PixoraNest be deployed for a clinic?", a: "Most healthcare clients are live within 24–48 hours with minimal setup required from your team." },
    { q: "Does the AI work with existing hospital management software?", a: "Yes, PixoraNest integrates with most popular HMS and CRM systems via API or Zapier." },
  ],
  default: [
    { q: "How can AI automation reduce operational costs?", a: "By automating repetitive tasks like call handling, lead follow-up, and data entry, businesses typically reduce operational costs by 40–65%." },
    { q: "How long does it take to implement PixoraNest AI?", a: "Most clients are live within 24–48 hours. Our team handles the entire setup so your team doesn't need to do heavy lifting." },
    { q: "Can AI automation integrate with our existing tools?", a: "Yes. PixoraNest integrates with most CRMs, ERPs, and business tools via API, Zapier, or native connectors." },
    { q: "Is AI automation suitable for small and medium businesses?", a: "Absolutely. Our solutions scale from small startups to large enterprises — with pricing that fits any business size." },
    { q: "What kind of support does PixoraNest provide after deployment?", a: "We offer 24/7 technical support, regular performance reviews, and continuous optimisation of your AI workflows." },
  ],
}

// ── Particles ───────────────────────────────────────────────────────────────
function Particles({ color }: { color: string }) {
  const particles = Array.from({ length: 15 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 2.5 + 1, duration: Math.random() * 4 + 3, delay: Math.random() * 3,
  }))
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {particles.map(p => (
        <motion.div key={p.id}
          animate={{ y: [0, -25, 0], opacity: [0, 0.5, 0], scale: [0, 1, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, borderRadius: "50%", background: color, filter: "blur(0.5px)" }}
        />
      ))}
    </div>
  )
}

// ─── Hero Visual ──────────────────────────────────────────────────────────
function IndustryHeroVisual({ iconKey, color, light }: { iconKey: string; color: string; light: string }) {
  const Icon = iconMap[iconKey] || Monitor
  const stats = industryStats[iconKey] || defaultStats

  const floatingCards = [
    { icon: Phone,         label: "AI Receptionist", delay: 0.2 },
    { icon: MessageCircle, label: "WhatsApp Bot",     delay: 0.45 },
    { icon: PhoneCall,     label: "Call Automation",  delay: 0.7 },
    { icon: Mic,           label: "Voice Agent",      delay: 0.95 },
  ]

  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 440, margin: "0 auto" }}>
      {/* Background aura */}
      <div style={{
        position: "absolute", inset: "-30px",
        background: `radial-gradient(ellipse at 55% 40%, ${color}15 0%, transparent 65%)`,
        pointerEvents: "none", borderRadius: "50%",
      }} />

      {/* Center icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 120 }}
        style={{
          width: 100, height: 100, borderRadius: "50%",
          background: `linear-gradient(135deg, ${light}, ${color}08)`,
          border: `2.5px solid ${color}35`,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 24px",
          boxShadow: `0 0 0 16px ${color}08, 0 12px 40px ${color}25`,
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon size={42} color={color} />
        </motion.div>
      </motion.div>

      {/* Pulse rings */}
      {[1, 2].map(i => (
        <motion.div key={i}
          animate={{ scale: [1, 2.2], opacity: [0.2, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 1, ease: "easeOut" }}
          style={{
            position: "absolute", left: "50%", top: 0,
            transform: "translateX(-50%)",
            width: 100, height: 100, borderRadius: "50%",
            border: `1.5px solid ${color}`,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Floating tool cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        {floatingCards.map((card, i) => {
          const CardIcon = card.icon
          return (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: card.delay, duration: 0.5, type: "spring" }}
            >
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3.2 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.06, boxShadow: `0 12px 32px ${color}20` }}
                style={{
                  background: "#fff", border: "1px solid #eaeef2",
                  borderRadius: 16, padding: "14px 16px",
                  display: "flex", alignItems: "center", gap: 11,
                  boxShadow: "0 2px 14px rgba(0,0,0,0.06)",
                  cursor: "default", transition: "box-shadow 0.2s",
                }}
              >
                <div style={{
                  width: 38, height: 38, borderRadius: 11,
                  background: `${color}10`, border: `1px solid ${color}20`,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <CardIcon size={17} color={color} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#0a0f1e", lineHeight: 1.3 }}>
                  {card.label}
                </span>
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}
      >
        {stats.map((s, i) => {
          const SI = s.icon
          return (
            <motion.div key={i}
              whileHover={{ y: -4, boxShadow: `0 10px 24px ${color}15` }}
              style={{
                background: "#fff", border: "1px solid #eaeef2",
                borderRadius: 14, padding: "14px 8px",
                textAlign: "center", boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
                transition: "all 0.2s", cursor: "default",
              }}
            >
              <SI size={15} color={color} style={{ margin: "0 auto 7px" }} />
              <p style={{ fontSize: 19, fontWeight: 800, color: "#0a0f1e", margin: 0, letterSpacing: "-0.02em" }}>
                {s.value}
              </p>
              <p style={{ fontSize: 10, color: "#94a3b8", margin: 0, lineHeight: 1.4, fontWeight: 500 }}>
                {s.label}
              </p>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}

// ─── Solution Card ─────────────────────────────────────────────────────────
function SolutionCard({ title, description, index, color, light }: {
  title: string; description: string; index: number; color: string; light: string
}) {
  const icons = [Phone, MessageCircle, PhoneCall, Mic, Bot, Zap]
  const Icon = icons[index % icons.length]
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={fadeInUp}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -8, boxShadow: `0 24px 48px -12px ${color}22` }}
      transition={{ duration: 0.25 }}
      style={{
        background: "#fff", border: `1.5px solid ${hovered ? color + "30" : "#eaeef2"}`,
        borderRadius: 22, padding: 26,
        position: "relative", overflow: "hidden",
        transition: "border-color 0.3s",
      }}
    >
      {/* Top bar */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0.3, opacity: hovered ? 1 : 0.6 }}
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 3,
          background: `linear-gradient(90deg, ${color}, ${color}60)`,
          borderRadius: "22px 22px 0 0", transformOrigin: "left",
        }}
      />

      {/* Dot pattern */}
      <div style={{
        position: "absolute", top: 0, right: 0, width: 100, height: 100,
        backgroundImage: `radial-gradient(${color}12 1px, transparent 1px)`,
        backgroundSize: "10px 10px", borderRadius: "0 22px 0 0", pointerEvents: "none",
      }} />

      <div style={{
        width: 50, height: 50, borderRadius: 14,
        background: light, border: `1.5px solid ${color}20`,
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 16,
        boxShadow: hovered ? `0 0 20px ${color}20` : "none",
        transition: "box-shadow 0.3s",
      }}>
        <Icon size={22} color={color} />
      </div>

      <h3 style={{ fontSize: 16, fontWeight: 800, color: "#0a0f1e", marginBottom: 9, letterSpacing: "-0.02em" }}>
        {title}
      </h3>
      <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.75, margin: 0 }}>
        {description}
      </p>

      <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 7 }}>
        <motion.div
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ width: 6, height: 6, borderRadius: "50%", background: color }}
        />
        <span style={{ fontSize: 11, color: color, fontWeight: 700, letterSpacing: "0.04em" }}>AI POWERED</span>
      </div>
    </motion.div>
  )
}

// ─── FAQ Item ──────────────────────────────────────────────────────────────
function FAQItem({ q, a, color, index }: { q: string; a: string; color: string; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      variants={fadeInUp}
      style={{
        background: open ? "#fff" : "#fff",
        border: `1.5px solid ${open ? color + "35" : "#eaeef2"}`,
        borderLeft: `3px solid ${color}`,
        borderRadius: 16, overflow: "hidden",
        boxShadow: open ? `0 8px 24px ${color}10` : "none",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", padding: "20px 22px",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14,
          background: "none", border: "none", cursor: "pointer", textAlign: "left",
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 700, color: "#0a0f1e", lineHeight: 1.5 }}>{q}</span>
        <motion.div animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.2 }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%",
            background: open ? color : `${color}12`,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            transition: "background 0.2s",
          }}>
            {open
              ? <Minus size={13} color="#fff" />
              : <Plus size={13} color={color} />
            }
          </div>
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{ overflow: "hidden" }}
      >
        <p style={{ padding: "0 22px 20px", fontSize: 13, color: "#64748b", lineHeight: 1.8, margin: 0 }}>
          {a}
        </p>
      </motion.div>
    </motion.div>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────
interface IndustryData {
  title: string; slug: string; description: string; icon: string;
}

export function IndustryPageContent({ industry }: { industry: IndustryData }) {
  const Icon = iconMap[industry.icon] || Monitor
  const theme = industryTheme[industry.icon] || defaultTheme
  const stats = industryStats[industry.icon] || defaultStats
  const faqs = (faqData[industry.icon] || faqData.default)
  const caseStudy = caseStudyData[industry.icon] || caseStudyData.default

  const benefits = [
    `Reduce ${industry.title.toLowerCase()} operational costs by up to 60%`,
    "24/7 automated customer engagement without extra staff",
    "Seamless integration with your existing tools in 24 hours",
    "Real-time analytics, dashboards, and performance reports",
    "Scalable AI solutions that grow as your business grows",
    "Industry-specific compliance and data security built-in",
  ]

  const benefitIcons = [TrendingUp, Clock, Shield, BarChart3, Users, Bot]

  return (
    <div className="pt-24" style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className={`px-4 pb-20 pt-10 sm:px-6 lg:px-8 relative overflow-hidden`}
        style={{ background: `linear-gradient(180deg, ${theme.light} 0%, #fff 100%)` }}
      >
        {/* Dot grid */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.4,
          backgroundImage: "radial-gradient(#cbd5e1 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }} />
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(ellipse at 80% 20%, ${theme.color}08 0%, transparent 50%)`,
        }} />

        <div className="mx-auto max-w-7xl relative">
          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <Link href="/industries" style={{
              display: "inline-flex", alignItems: "center", gap: 7,
              fontSize: 13, color: "#64748b", textDecoration: "none", marginBottom: 36,
              padding: "8px 14px", background: "#f8fafc", border: "1px solid #e2e8f0",
              borderRadius: 20, fontWeight: 500,
              transition: "color 0.2s",
            }}>
              <ArrowLeft size={13} /> Back to Industries
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">
              <motion.div variants={fadeInUp} style={{
                display: "inline-flex", alignItems: "center", gap: 9,
                background: `${theme.color}10`, border: `1.5px solid ${theme.color}30`,
                borderRadius: 24, padding: "8px 18px", marginBottom: 24,
              }}>
                <Icon size={14} color={theme.color} />
                <span style={{ fontSize: 12, fontWeight: 700, color: theme.color, letterSpacing: "0.04em" }}>
                  {industry.title} AI Solutions
                </span>
              </motion.div>

              <motion.h1 variants={fadeInUp}
                className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
                style={{ letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 22 }}
              >
                AI Automation for{" "}
                <span style={{
                  background: `linear-gradient(135deg, ${theme.color}, ${theme.color}aa)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  {industry.title}
                </span>
              </motion.h1>

              <motion.p variants={fadeInUp}
                className="text-lg leading-relaxed text-muted-foreground"
                style={{ maxWidth: 520, marginBottom: 32 }}
              >
                PixoraNest delivers advanced AI automation for the {industry.title.toLowerCase()} industry
                — automating customer communication, lead management, call handling, and operations at scale.
              </motion.p>

              <motion.div variants={fadeInUp} style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 32 }}>
                <Link href="/contact" style={{
                  background: theme.color, color: "#fff",
                  padding: "14px 30px", borderRadius: 14,
                  fontSize: 14, fontWeight: 700,
                  display: "inline-flex", alignItems: "center", gap: 9,
                  boxShadow: `0 4px 24px ${theme.color}40`, textDecoration: "none",
                }}>
                  Book a Free Demo <ArrowRight size={16} />
                </Link>
                <Link href="/solutions" style={{
                  background: "#fff", border: "1.5px solid #e2e8f0",
                  color: "#0f172a", padding: "14px 28px", borderRadius: 14,
                  fontSize: 14, fontWeight: 600, textDecoration: "none",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                }}>
                  View All Solutions
                </Link>
              </motion.div>

              <motion.div variants={fadeInUp} style={{ display: "flex", flexWrap: "wrap", gap: 22 }}>
                {[
                  { icon: Shield, label: "Enterprise Secure" },
                  { icon: Clock,  label: "Live in 24 hrs" },
                  { icon: Zap,    label: "No Setup Fees" },
                ].map((b, i) => {
                  const BI = b.icon
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#475569" }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: 8,
                        background: theme.light, border: `1px solid ${theme.color}20`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <BI size={13} color={theme.color} />
                      </div>
                      <span style={{ fontWeight: 600 }}>{b.label}</span>
                    </div>
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
              <IndustryHeroVisual iconKey={industry.icon} color={theme.color} light={theme.light} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          WORKFLOW TIMELINE
      ══════════════════════════════════════════ */}
      <section style={{
        background: "#fff",
        borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9",
        padding: "56px 0", overflow: "hidden",
      }}>
        <div className="max-w-7xl mx-auto px-6">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: theme.color }}>
              How It Works
            </span>
            <h2 style={{ fontSize: 24, fontWeight: 800, color: "#0a0f1e", marginTop: 8, letterSpacing: "-0.025em" }}>
              AI Automation Flow in {industry.title}
            </h2>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", overflowX: "auto", paddingBottom: 8 }} className="no-scrollbar">
            {workflowSteps.map((item, i) => {
              const StepIcon = item.icon
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "0 24px", maxWidth: 148 }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.12, boxShadow: `0 8px 24px ${theme.color}25` }}
                      style={{
                        width: 60, height: 60, borderRadius: "50%",
                        background: `linear-gradient(135deg, ${theme.light}, ${theme.color}08)`,
                        border: `2px solid ${theme.color}35`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        marginBottom: 12,
                        boxShadow: `0 4px 16px ${theme.color}15`,
                        cursor: "default", transition: "all 0.2s",
                      }}
                    >
                      <StepIcon size={24} color={theme.color} />
                    </motion.div>
                    <span style={{ fontSize: 10, fontWeight: 800, color: theme.color, letterSpacing: "0.1em" }}>
                      STEP {item.step}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 800, color: "#0a0f1e", marginTop: 4 }}>
                      {item.label}
                    </span>
                    <span style={{ fontSize: 11, color: "#94a3b8", marginTop: 5, lineHeight: 1.5 }}>
                      {item.desc}
                    </span>
                  </motion.div>

                  {i < workflowSteps.length - 1 && (
                    <div style={{ width: 52, height: 2, background: `${theme.color}18`, flexShrink: 0, position: "relative", overflow: "hidden", marginBottom: 40 }}>
                      <motion.div
                        initial={{ width: "0%" }}
                        whileInView={{ width: "100%" }}
                        transition={{ delay: i * 0.2 + 0.3, duration: 0.7 }}
                        viewport={{ once: true }}
                        style={{ position: "absolute", top: 0, left: 0, height: "100%", background: `linear-gradient(90deg, ${theme.color}, ${theme.color}60)` }}
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SOLUTIONS GRID
      ══════════════════════════════════════════ */}
      <SectionWrapper>
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 44 }}>
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: theme.color }}>
            Our Solutions
          </span>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl" style={{ letterSpacing: "-0.025em" }}>
            AI Solutions for{" "}
            <span style={{
              background: `linear-gradient(135deg, ${theme.color}, ${theme.color}80)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              {industry.title}
            </span>{" "}Businesses
          </h2>
        </div>

        <motion.div
          variants={staggerContainer} initial="hidden"
          whileInView="visible" viewport={{ once: true }}
          className="grid gap-5 sm:grid-cols-2"
        >
          {solutions.slice(0, 4).map((solution, i) => (
            <Link key={solution.slug} href={`/services/${solution.slug}`} style={{ textDecoration: "none" }}>
              <SolutionCard
                title={solution.title} description={solution.description}
                index={i} color={theme.color} light={theme.light}
              />
            </Link>
          ))}
        </motion.div>
      </SectionWrapper>

      {/* ══════════════════════════════════════════
          BENEFITS
      ══════════════════════════════════════════ */}
      <section style={{ padding: "80px 24px", background: `linear-gradient(180deg, ${theme.light} 0%, #fff 100%)` }}>
        <div className="max-w-7xl mx-auto sm:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            {/* Performance card */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div style={{
                background: "#fff", border: "1.5px solid #eaeef2",
                borderRadius: 26, padding: 32,
                boxShadow: "0 4px 28px rgba(0,0,0,0.06)",
              }}>
                {/* Card header */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 14,
                  marginBottom: 24, paddingBottom: 20,
                  borderBottom: "1px solid #f1f5f9",
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 14,
                    background: theme.light, border: `1.5px solid ${theme.color}20`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Icon size={24} color={theme.color} />
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 800, color: "#0a0f1e", margin: 0 }}>
                      {industry.title} Automation
                    </p>
                    <p style={{ fontSize: 12, color: "#94a3b8", margin: 0 }}>Performance overview</p>
                  </div>
                  <div style={{ marginLeft: "auto" }}>
                    <div style={{
                      background: "#dcfce7", borderRadius: 24,
                      padding: "5px 12px", fontSize: 11, fontWeight: 700, color: "#16a34a",
                      display: "flex", alignItems: "center", gap: 5,
                    }}>
                      <motion.div
                        animate={{ opacity: [1, 0.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        style={{ width: 5, height: 5, borderRadius: "50%", background: "#16a34a" }}
                      />
                      Live
                    </div>
                  </div>
                </div>

                {/* Progress bars */}
                {[
                  { label: "Leads captured",       value: 94, color: theme.color },
                  { label: "Response rate",         value: 98, color: "#22c55e" },
                  { label: "Cost saved",            value: 60, color: "#8b5cf6" },
                  { label: "Customer satisfaction", value: 91, color: "#f59e0b" },
                ].map((m, i) => (
                  <div key={i} style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                      <span style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>{m.label}</span>
                      <span style={{ fontSize: 13, color: "#0a0f1e", fontWeight: 800 }}>{m.value}%</span>
                    </div>
                    <div style={{ height: 7, background: "#f1f5f9", borderRadius: 4, overflow: "hidden" }}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${m.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                        style={{ height: "100%", background: `linear-gradient(90deg, ${m.color}, ${m.color}80)`, borderRadius: 4 }}
                      />
                    </div>
                  </div>
                ))}

                {/* Stats */}
                <div style={{
                  display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12,
                  marginTop: 22, paddingTop: 22, borderTop: "1px solid #f1f5f9",
                }}>
                  {stats.map((s, i) => {
                    const SI = s.icon
                    return (
                      <motion.div key={i}
                        whileHover={{ y: -3, boxShadow: `0 8px 20px ${theme.color}12` }}
                        style={{ textAlign: "center", padding: "12px 6px", borderRadius: 12, cursor: "default", transition: "all 0.2s" }}
                      >
                        <SI size={15} color={theme.color} style={{ margin: "0 auto 5px" }} />
                        <p style={{ fontSize: 18, fontWeight: 900, color: "#0a0f1e", margin: 0, letterSpacing: "-0.02em" }}>{s.value}</p>
                        <p style={{ fontSize: 10, color: "#94a3b8", margin: 0 }}>{s.label}</p>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </motion.div>

            {/* Benefits list */}
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.span variants={fadeInUp} style={{
                fontSize: 11, fontWeight: 800, letterSpacing: "0.12em",
                textTransform: "uppercase", color: theme.color,
              }}>
                Key Benefits
              </motion.span>

              <motion.h2 variants={fadeInUp}
                className="text-2xl font-bold text-foreground sm:text-3xl mt-2 mb-8"
                style={{ letterSpacing: "-0.025em" }}
              >
                Why {industry.title} Businesses Choose PixoraNest
              </motion.h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {benefits.map((b, i) => {
                  const BI = benefitIcons[i % benefitIcons.length]
                  return (
                    <motion.div key={i} variants={fadeInUp}
                      whileHover={{ x: 6, boxShadow: `0 4px 20px ${theme.color}10` }}
                      style={{
                        display: "flex", alignItems: "center", gap: 14,
                        background: "#fff", border: "1.5px solid #f1f5f9",
                        borderRadius: 16, padding: "14px 18px",
                        cursor: "default", transition: "all 0.25s",
                      }}
                    >
                      <div style={{
                        width: 40, height: 40, borderRadius: 12,
                        background: theme.light, border: `1px solid ${theme.color}20`,
                        display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                      }}>
                        <BI size={18} color={theme.color} />
                      </div>
                      <p style={{ fontSize: 13, fontWeight: 600, color: "#0a0f1e", margin: 0, lineHeight: 1.6 }}>
                        {b}
                      </p>
                      <ChevronRight size={14} color={theme.color} style={{ marginLeft: "auto", flexShrink: 0, opacity: 0.5 }} />
                    </motion.div>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CASE STUDY
      ══════════════════════════════════════════ */}
      <SectionWrapper>
        <div style={{ marginBottom: 44 }}>
          <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: theme.color }}>
            Case Study
          </span>
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl mt-2" style={{ letterSpacing: "-0.025em" }}>
            Real Results in {industry.title}
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            background: theme.darkGradient, borderRadius: 28, overflow: "hidden",
            border: `1px solid ${theme.color}20`,
            boxShadow: `0 20px 60px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.04)`,
            position: "relative",
          }}
        >
          <Particles color={theme.color} />

          <div className="grid md:grid-cols-2">
            {/* Left — story */}
            <div style={{ padding: "44px 40px", borderRight: "1px solid rgba(255,255,255,0.07)", position: "relative" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: `${theme.color}20`, border: `1px solid ${theme.color}35`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: `0 0 12px ${theme.color}25`,
                }}>
                  <Quote size={18} color={theme.color} />
                </div>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 800, color: "#fff", margin: 0 }}>{caseStudy.company}</p>
                  <p style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", margin: 0 }}>{industry.title} Industry</p>
                </div>
              </div>

              <div style={{ marginBottom: 22 }}>
                <p style={{ fontSize: 10, fontWeight: 800, color: theme.color, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
                  Challenge
                </p>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, margin: 0 }}>
                  {caseStudy.challenge}
                </p>
              </div>

              <div>
                <p style={{ fontSize: 10, fontWeight: 800, color: "#4ade80", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>
                  Solution
                </p>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.8, margin: 0 }}>
                  {caseStudy.result}
                </p>
              </div>

              <div style={{ display: "flex", gap: 3, marginTop: 22 }}>
                {[1, 2, 3, 4, 5].map(i => (
                  <Star key={i} size={15} color="#fbbf24" fill="#fbbf24" />
                ))}
              </div>
            </div>

            {/* Right — before/after */}
            <div style={{ padding: "44px 40px", position: "relative" }}>
              <p style={{ fontSize: 11, fontWeight: 800, color: "rgba(255,255,255,0.35)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 22 }}>
                Before vs After PixoraNest
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {caseStudy.before.map((b, i) => {
                  const a = caseStudy.after[i]
                  return (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      viewport={{ once: true }}
                      style={{
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderRadius: 14, padding: "16px 18px",
                      }}
                    >
                      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 700, marginBottom: 10 }}>
                        {b.label}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{
                          flex: 1, background: "rgba(239,68,68,0.12)",
                          border: "1px solid rgba(239,68,68,0.2)",
                          borderRadius: 10, padding: "8px 12px", textAlign: "center",
                        }}>
                          <span style={{ fontSize: 16, fontWeight: 900, color: "#fca5a5" }}>{b.value}</span>
                          <span style={{ fontSize: 10, color: "#fca5a5", display: "block", fontWeight: 600 }}>Before</span>
                        </div>
                        <ArrowRight size={14} color="rgba(255,255,255,0.25)" />
                        <div style={{
                          flex: 1, background: "rgba(74,222,128,0.12)",
                          border: "1px solid rgba(74,222,128,0.2)",
                          borderRadius: 10, padding: "8px 12px", textAlign: "center",
                        }}>
                          <span style={{ fontSize: 16, fontWeight: 900, color: "#86efac" }}>{a.value}</span>
                          <span style={{ fontSize: 10, color: "#86efac", display: "block", fontWeight: 600 }}>After</span>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </SectionWrapper>

      {/* ══════════════════════════════════════════
          FAQ
      ══════════════════════════════════════════ */}
      <section style={{ padding: "80px 24px", background: `linear-gradient(180deg, ${theme.light} 0%, #fff 100%)` }}>
        <div className="max-w-7xl mx-auto sm:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-start">

            <div>
              <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: theme.color }}>
                FAQs
              </span>
              <h2 className="text-2xl font-bold text-foreground sm:text-3xl mt-2 mb-5" style={{ letterSpacing: "-0.025em" }}>
                Frequently Asked Questions
              </h2>
              <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.8, marginBottom: 36 }}>
                Everything you need to know about AI automation for {industry.title.toLowerCase()} businesses.
              </p>

              {/* CTA card */}
              <motion.div
                whileHover={{ y: -4, boxShadow: `0 16px 40px ${theme.color}15` }}
                style={{
                  background: "#fff", border: `1.5px solid ${theme.color}20`,
                  borderRadius: 22, padding: 26, transition: "all 0.3s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: theme.light, border: `1px solid ${theme.color}20`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <Bot size={22} color={theme.color} />
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 800, color: "#0a0f1e", margin: 0 }}>PixoraNest AI</p>
                    <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>Ready to deploy in 24 hours</p>
                  </div>
                </div>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.75, marginBottom: 18 }}>
                  Pre-configured for {industry.title.toLowerCase()} use cases.
                  No heavy setup required from your team.
                </p>
                <Link href="/contact" style={{
                  display: "inline-flex", alignItems: "center", gap: 7,
                  fontSize: 13, fontWeight: 700, color: theme.color, textDecoration: "none",
                  padding: "10px 18px",
                  background: `${theme.color}10`, border: `1px solid ${theme.color}25`,
                  borderRadius: 10,
                }}>
                  Talk to an expert <ArrowRight size={14} />
                </Link>
              </motion.div>
            </div>

            <motion.div
              variants={staggerContainer} initial="hidden"
              whileInView="visible" viewport={{ once: true }}
              style={{ display: "flex", flexDirection: "column", gap: 10 }}
            >
              {faqs.map((faq, i) => (
                <FAQItem key={i} q={faq.q} a={faq.a} color={theme.color} index={i} />
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA
      ══════════════════════════════════════════ */}
      <section style={{ padding: "80px 24px", background: "#fff" }}>
        <motion.div
          variants={staggerContainer} initial="hidden"
          whileInView="visible" viewport={{ once: true }}
          style={{
            maxWidth: 840, margin: "0 auto",
            background: `linear-gradient(135deg, ${theme.color}08 0%, #fff 40%, ${theme.color}05 100%)`,
            border: `1.5px solid ${theme.color}20`,
            borderRadius: 32, padding: "64px 52px",
            textAlign: "center", position: "relative", overflow: "hidden",
          }}
        >
          {/* Decorative orbs */}
          <div style={{ position: "absolute", top: -60, right: -60, width: 220, height: 220, borderRadius: "50%", background: `${theme.color}06`, pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -50, left: -50, width: 160, height: 160, borderRadius: "50%", background: `${theme.color}05`, pointerEvents: "none" }} />

          {/* Dot grid accent */}
          <div style={{
            position: "absolute", top: 0, right: 0, width: 200, height: 200, pointerEvents: "none", opacity: 0.3,
            backgroundImage: `radial-gradient(${theme.color}20 1px, transparent 1px)`,
            backgroundSize: "16px 16px",
          }} />

          <motion.div variants={fadeInUp} style={{
            width: 72, height: 72, borderRadius: "50%",
            background: theme.light, border: `2.5px solid ${theme.color}30`,
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 24px",
            boxShadow: `0 8px 32px ${theme.color}20`,
          }}>
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2.5, repeat: Infinity }}>
              <Icon size={32} color={theme.color} />
            </motion.div>
          </motion.div>

          <motion.h2 variants={fadeInUp}
            className="text-3xl font-bold text-foreground sm:text-4xl"
            style={{ letterSpacing: "-0.03em", marginBottom: 14 }}
          >
            Start Automating Your{" "}
            <span style={{
              background: `linear-gradient(135deg, ${theme.color}, ${theme.color}80)`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              {industry.title}
            </span>{" "}Business
          </motion.h2>

          <motion.p variants={fadeInUp}
            className="text-muted-foreground"
            style={{ maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.8, fontSize: 15 }}
          >
            See how PixoraNest AI can transform your {industry.title.toLowerCase()} operations.
            Custom solutions, live in 24 hours.
          </motion.p>

          <motion.div variants={fadeInUp} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14, marginBottom: 30 }}>
            <Link href="/contact" style={{
              background: theme.color, color: "#fff",
              padding: "15px 36px", borderRadius: 14,
              fontSize: 14, fontWeight: 700,
              display: "inline-flex", alignItems: "center", gap: 9,
              boxShadow: `0 4px 24px ${theme.color}45`, textDecoration: "none",
            }}>
              Book a Free Demo <ArrowRight size={16} />
            </Link>
            <Link href="/solutions" style={{
              background: "#fff", border: "1.5px solid #e2e8f0",
              color: "#0f172a", padding: "15px 30px", borderRadius: 14,
              fontSize: 14, fontWeight: 600, textDecoration: "none",
              boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
            }}>
              Explore All Solutions
            </Link>
          </motion.div>

          <motion.div variants={fadeInUp} style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 28, fontSize: 13, color: "#64748b" }}>
            {["No setup fees", "Live in 24 hours", "Cancel anytime"].map((t, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 7, fontWeight: 600 }}>
                <CheckCircle2 size={15} color={theme.color} /> {t}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

    </div>
  )
}