"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  CheckCircle2, X, ArrowRight, Zap, Shield,
  MessageCircle, BarChart3, Users, Bot, Star,
  TrendingUp, Clock, Headphones, Rocket, Phone,
} from "lucide-react"

/* ─── Design tokens ─────────────────────────────────────────────── */
const C = {
  blue:      "#2563eb",
  blueLight: "#3b82f6",
  navy:      "#0f172a",
  navyMid:   "#1e293b",
  slate:     "rgba(255,255,255,0.55)",
  muted:     "rgba(255,255,255,0.38)",
  border:    "rgba(255,255,255,0.15)",
  surface:   "rgba(255,255,255,0.06)",
  white:     "#ffffff",
  green:     "#4ade80",
  amber:     "#fbbf24",
  purple:    "#a78bfa",
}

/* ─── Animated counter ──────────────────────────────────────────── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true
        let cur = 0
        const step = to / 50
        const t = setInterval(() => {
          cur += step
          if (cur >= to) { setN(to); clearInterval(t) }
          else setN(Math.floor(cur))
        }, 20)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [to])

  return <span ref={ref}>{n.toLocaleString()}{suffix}</span>
}

/* ─── Live Chat Widget ──────────────────────────────────────────── */
const MSGS = [
  { id: 1, from: "user",   text: "Hi, what plans do you offer?" },
  { id: 2, from: "ai",     text: "We have Pro Plus & Foundation! Which fits you best?" },
  { id: 3, from: "user",   text: "Tell me about Pro Plus" },
  { id: 4, from: "system", text: "✅ Lead captured & saved to CRM" },
  { id: 5, from: "ai",     text: "Pro Plus at ₹48,999/yr — WhatsApp AI, CRM & full automation!" },
  { id: 6, from: "system", text: "🚀 Follow-up scheduled automatically" },
] as const

function ChatWidget() {
  const [visible, setVisible] = useState<number[]>([])
  const [typing, setTyping]   = useState(false)
  const idx     = useRef(0)
  const timer   = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const alive   = useRef(true)
  const bottom  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    alive.current = true
    function tick() {
      if (!alive.current) return
      if (idx.current >= MSGS.length) {
        timer.current = setTimeout(() => {
          if (!alive.current) return
          idx.current = 0; setVisible([]); setTyping(false)
          timer.current = setTimeout(tick, 800)
        }, 2500)
        return
      }
      setTyping(true)
      const i = idx.current
      timer.current = setTimeout(() => {
        if (!alive.current) return
        setVisible(p => [...p, MSGS[i].id])
        setTyping(false)
        idx.current = i + 1
        timer.current = setTimeout(tick, 1400)
      }, 900)
    }
    timer.current = setTimeout(tick, 600)
    return () => { alive.current = false; clearTimeout(timer.current) }
  }, [])

  useEffect(() => {
    if (bottom.current) {
      bottom.current.scrollTo({ top: bottom.current.scrollHeight, behavior: "smooth" })
    }
  }, [visible, typing])

  return (
    <div style={{
      background: "rgba(255,255,255,0.12)", backdropFilter: "blur(20px)",
      borderRadius: 20, border: "1px solid rgba(255,255,255,0.25)",
      boxShadow: "0 32px 80px rgba(37,99,235,0.15)", overflow: "hidden",
      width: "100%", maxWidth: 360,
    }}>
      {/* header */}
      <div style={{ background: C.blue, padding: "14px 18px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Bot size={18} color="#fff" />
        </div>
        <div>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#fff" }}>PixoraNest AI</p>
          <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 2 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80" }} />
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.75)" }}>Always online · Replies instantly</span>
          </div>
        </div>
      </div>
      {/* messages */}
      <div ref={bottom} style={{ padding: 14, minHeight: 220, maxHeight: 240, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
        <AnimatePresence>
          {MSGS.filter(m => visible.includes(m.id)).map(msg => (
            <motion.div key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.28, type: "spring", stiffness: 240 }}
              style={{ display: "flex", justifyContent: msg.from === "user" ? "flex-start" : msg.from === "system" ? "center" : "flex-end" }}
            >
              {msg.from === "system" ? (
                <div style={{ background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 20, padding: "4px 12px", fontSize: 10.5, fontWeight: 600, color: "#4ade80" }}>{msg.text}</div>
              ) : (
                <div style={{ background: msg.from === "user" ? "rgba(37,99,235,0.15)" : C.blue, color: msg.from === "user" ? "#1e293b" : "#fff", borderRadius: msg.from === "user" ? "4px 14px 14px 14px" : "14px 4px 14px 14px", padding: "8px 12px", fontSize: 12, lineHeight: 1.5, maxWidth: "76%", fontWeight: 500 }}>
                  {msg.text}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {typing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: "flex", justifyContent: "flex-end" }}>
            <div style={{ background: C.blue, borderRadius: "14px 4px 14px 14px", padding: "8px 12px", display: "flex", gap: 3, alignItems: "center" }}>
              {[0,1,2].map(i => (
                <motion.div key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.8)" }}
                  animate={{ y: [0, -4, 0] }} transition={{ duration: 0.55, repeat: Infinity, delay: i * 0.15 }} />
              ))}
            </div>
          </motion.div>
        )}
      </div>
      {/* input bar */}
      <div style={{ borderTop: "1px solid rgba(255,255,255,0.15)", padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ flex: 1, background: "rgba(37,99,235,0.08)", borderRadius: 18, padding: "7px 12px", fontSize: 11.5, color: "rgba(30,41,59,0.5)" }}>Type a message...</div>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: C.blue, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <ArrowRight size={13} color="#fff" />
        </div>
      </div>
    </div>
  )
}

/* ─── Plan data ─────────────────────────────────────────────────── */
const PLANS = [
  {
    id: "proplus", name: "Pro Plus", tag: "Best for growing businesses",
    price: "₹48,999", cycle: "/year", note: "~₹4,083/month · Billed annually",
    badge: null as string | null, icon: Zap, dark: false,
    items: [
      "WhatsApp Chatbot + Broadcast Campaigns",
      "CRM Dashboard & Lead Capture",
      "AI Replies, Follow-ups & FAQ Bot",
      "Official WhatsApp Business API",
      "Marketing & Lifecycle Automation",
      "Rule-Based Workflow Builder",
      "Multi-agent Inbox",
    ],
  },
  {
    id: "foundation", name: "Foundation", tag: "Complete enterprise AI suite",
    price: "₹65,000", cycle: " one-time", note: "₹65K setup (first month) + ₹20K/month maintenance",
    badge: "Most Complete", icon: Shield, dark: true,
    items: [
      "Everything in Pro Plus, PLUS:",
      "FirstVoice AI Voice Receptionist",
      "LeadNest WhatsApp Lead Management",
      "CallOrbit Intelligent Call Routing",
      "Custom AI Training for your business",
      "Dedicated Account Manager",
      "Priority 24/7 Support",
    ],
  },
]

const FEATURE_GROUPS = [
  {
    group: "Core Automation",
    rows: [
      { name: "WhatsApp Chatbot",              a: true,  b: true },
      { name: "Broadcast Campaigns",            a: true,  b: true },
      { name: "CRM Dashboard",                 a: true,  b: true },
      { name: "Lead Capture & Management",     a: true,  b: true },
      { name: "Marketing Automation",           a: true,  b: true },
      { name: "AI Replies & Follow-ups",       a: true,  b: true },
    ],
  },
  {
    group: "Advanced Features",
    rows: [
      { name: "Rule-Based Workflows",           a: true,  b: true },
      { name: "Lead Lifecycle Automation",      a: true,  b: true },
      { name: "AI Assistant & FAQ Bot",         a: true,  b: true },
      { name: "Official WhatsApp Business API", a: true,  b: true },
      { name: "Multi-agent Inbox",              a: true,  b: true },
      { name: "Custom Chatflow Builder",        a: true,  b: true },
    ],
  },
  {
    group: "Enterprise AI Tools",
    rows: [
      { name: "FirstVoice AI Voice Receptionist",   a: false, b: true },
      { name: "LeadNest WhatsApp Lead Mgmt",        a: false, b: true },
      { name: "CallOrbit Intelligent Call Routing", a: false, b: true },
      { name: "Dedicated Account Manager",          a: false, b: true },
      { name: "Custom AI Training",                 a: false, b: true },
      { name: "Priority 24/7 Support",             a: false, b: true },
    ],
  },
]

const TESTIMONIALS = [
  { name: "Rakesh Sharma", role: "Real Estate Agency, Jaipur",   stars: 5, text: "Lead response time dropped from 4 hours to 12 seconds. The WhatsApp AI handles 80% of queries on its own." },
  { name: "Priya Menon",   role: "Healthcare Clinic, Bangalore", stars: 5, text: "Patient appointment automation saved us 3 hours daily. The AI receptionist is indistinguishable from a real person." },
  { name: "Arjun Nair",    role: "E-commerce Brand, Chennai",    stars: 5, text: "Cart recovery campaigns alone gave us 40% more revenue. The ROI in month one paid for the annual plan twice over." },
]

/* ─── Main export ───────────────────────────────────────────────── */
export function PricingPageContent() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        .pricing-page *, .pricing-page *::before, .pricing-page *::after { box-sizing: border-box; }
        .pricing-page h1,.pricing-page h2,.pricing-page h3,.pricing-page p,.pricing-page span { margin: 0; padding: 0; }
        .pricing-page { font-family: 'Plus Jakarta Sans', sans-serif; background: transparent; color: #1e293b; overflow-x: hidden; }
        .pricing-page a { text-decoration: none; }
        .badge-pulse { animation: badgePulse 2s ease-in-out infinite; }
        @keyframes badgePulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }
        .fade-up { animation: fadeUp 0.6s ease both; }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.22s; }
        .stagger-3 { animation-delay: 0.34s; }
        .stagger-4 { animation-delay: 0.46s; }
        .float { animation: float 3.5s ease-in-out infinite; }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: center; }
        @media(max-width:900px){
          .hero-grid { grid-template-columns: 1fr; gap: 40px; }
          .hero-right { display: flex; justify-content: center; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .plans-grid { grid-template-columns: 1fr !important; }
          .flow-grid { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
          .testi-grid { grid-template-columns: 1fr !important; }
          .compare-table { overflow-x: auto; }
          .h1-size { font-size: clamp(2rem,6vw,2.8rem) !important; }
        }
        @media(max-width:600px){
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .flow-grid { grid-template-columns: 1fr !important; }
          .hero-badges { flex-wrap: wrap; }
          .cta-btns { flex-direction: column; align-items: stretch !important; }
          .cta-btns a { justify-content: center; }
          .guarantee-strip { flex-direction: column; align-items: flex-start !important; gap: 14px !important; }
          .final-cta-btns { flex-direction: column; align-items: center; }
        }
        .pricing-page input::placeholder,
        .pricing-page textarea::placeholder { color: rgba(30,41,59,0.35); }
      `}</style>

      <div className="pricing-page">

        {/* ══════════════════════════════════ HERO */}
        <section style={{
          background: "transparent",
          paddingTop: 200, paddingBottom: 80, paddingLeft: 24, paddingRight: 24,
          position: "relative", minHeight: "100vh", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: -100, left: -100, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -120, right: -80, width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

          <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <div className="hero-grid">
              {/* LEFT */}
              <div>
                <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)", borderRadius: 20, padding: "6px 14px", marginBottom: 24 }}>
                  <Zap size={12} color="#f59e0b" />
                  <span style={{ fontSize: 11.5, fontWeight: 600, color: "#2563eb" }}>AI Automation Pricing — India</span>
                </div>

                <h1 className="fade-up stagger-1 h1-size" style={{ fontSize: "clamp(2.4rem,4.5vw,3.6rem)", fontWeight: 900, color: "#0f172a", lineHeight: 1.08, letterSpacing: "-0.03em", marginBottom: 20 }}>
                  Stop Losing Leads.<br />
                  <span style={{ color: "#2563eb" }}>Automate Everything</span><br />
                  with AI.
                </h1>

                <p className="fade-up stagger-2" style={{ fontSize: 16, color: "#475569", lineHeight: 1.75, marginBottom: 32, maxWidth: 460 }}>
                  Capture leads instantly, reply on WhatsApp 24/7, and convert customers while you sleep — starting at just ₹48,999/year.
                </p>

                <div className="fade-up stagger-3 cta-btns" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 36, alignItems: "center" }}>
                  <Link href="#pricing" style={{ background: C.blue, color: "#fff", padding: "13px 26px", borderRadius: 12, fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", gap: 8, boxShadow: "0 8px 24px rgba(37,99,235,0.35)" }}>
                    View Plans <ArrowRight size={15} />
                  </Link>
                  <Link href="/contact" style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(37,99,235,0.2)", color: "#1e293b", padding: "13px 26px", borderRadius: 12, fontWeight: 600, fontSize: 14 }}>
                    Book Free Demo
                  </Link>
                </div>

                <div className="fade-up stagger-4 hero-badges" style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                  {["500+ Businesses", "2–5x More Conversions", "80% Work Reduced", "No Coding Needed"].map(t => (
                    <div key={t} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <CheckCircle2 size={13} color="#16a34a" />
                      <span style={{ fontSize: 12, color: "#475569", fontWeight: 500 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RIGHT */}
              <div className="hero-right" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                <ChatWidget />
                <div className="float" style={{ alignSelf: "flex-start", background: "rgba(255,255,255,0.75)", backdropFilter: "blur(12px)", border: "1px solid rgba(37,99,235,0.15)", borderRadius: 14, padding: "10px 16px", display: "flex", alignItems: "center", gap: 10, boxShadow: "0 8px 28px rgba(37,99,235,0.12)" }}>
                  <div style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(22,163,74,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <TrendingUp size={14} color="#16a34a" />
                  </div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, color: "#0f172a" }}>Lead Converted 🎉</p>
                    <p style={{ fontSize: 10, color: "#94a3b8" }}>2 seconds after inquiry</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════ STATS */}
        <section style={{ background: "transparent", borderBottom: "1px solid rgba(37,99,235,0.1)", padding: "48px 24px" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
              {[
                { val: 500,  suf: "+",  label: "Businesses served",     icon: Users,         color: C.blue   },
                { val: 10,   suf: "M+", label: "Messages automated",    icon: MessageCircle, color: "#16a34a"  },
                { val: 98,   suf: "%",  label: "Customer satisfaction", icon: Star,          color: "#d97706"  },
                { val: 24,   suf: "/7", label: "AI always online",      icon: Clock,         color: "#7c3aed" },
              ].map(({ val, suf, label, icon: Icon, color }) => (
                <div key={label} style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.8)", borderRadius: 16, padding: "20px 22px", display: "flex", alignItems: "center", gap: 14, boxShadow: "0 4px 16px rgba(37,99,235,0.06)" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon size={20} color={color} />
                  </div>
                  <div>
                    <div style={{ fontSize: 24, fontWeight: 900, color: "#0f172a", lineHeight: 1 }}>
                      <Counter to={val} suffix={suf} />
                    </div>
                    <div style={{ fontSize: 11, color: "#64748b", fontWeight: 500, marginTop: 3 }}>{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════ HOW IT WORKS */}
        <section style={{ padding: "80px 24px", background: "transparent" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2563eb", display: "block", marginBottom: 10 }}>Process</span>
              <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.025em", marginBottom: 12 }}>How It Works</h2>
              <p style={{ fontSize: 15, color: "#64748b", maxWidth: 460, margin: "0 auto" }}>From first contact to closed deal — fully automated in 4 steps.</p>
            </div>
            <div className="flow-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, position: "relative" }}>
              <div style={{ position: "absolute", top: 36, left: "12%", right: "12%", height: 2, background: `linear-gradient(to right,rgba(37,99,235,0),rgba(37,99,235,0.2),rgba(37,99,235,0))`, pointerEvents: "none" }} />
              {[
                { icon: MessageCircle, label: "Customer Reaches Out",  sub: "Via WhatsApp, call or web form", color: C.blue   },
                { icon: Bot,           label: "AI Responds Instantly", sub: "Under 10 seconds, 24/7",         color: "#7c3aed" },
                { icon: BarChart3,     label: "Lead Saved to CRM",    sub: "Auto-tagged, scored & routed",   color: "#16a34a"  },
                { icon: Rocket,        label: "Follow-up & Close",    sub: "Nurture until they convert",     color: "#d97706"  },
              ].map(({ icon: Icon, label, sub, color }, i) => (
                <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "24px 12px", background: "rgba(255,255,255,0.6)", backdropFilter: "blur(12px)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.8)", boxShadow: "0 4px 16px rgba(37,99,235,0.06)", position: "relative", zIndex: 1 }}>
                  <div style={{ position: "relative", marginBottom: 14 }}>
                    <div style={{ width: 58, height: 58, borderRadius: "50%", background: `${color}12`, border: `2px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon size={24} color={color} />
                    </div>
                    <div style={{ position: "absolute", top: -5, right: -5, width: 20, height: 20, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, color: "#fff" }}>{i + 1}</div>
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", marginBottom: 6 }}>{label}</p>
                  <p style={{ fontSize: 11.5, color: "#64748b", lineHeight: 1.5 }}>{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════ PRICING CARDS */}
        <section id="pricing" style={{ padding: "80px 24px", background: "transparent" }}>
          <div style={{ maxWidth: 960, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2563eb", display: "block", marginBottom: 10 }}>Pricing</span>
              <h2 style={{ fontSize: "clamp(1.8rem,3vw,2.4rem)", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.025em", marginBottom: 12 }}>Simple, Transparent Pricing</h2>
              <p style={{ fontSize: 15, color: "#64748b", maxWidth: 440, margin: "0 auto" }}>Two plans. Everything you need to automate your business and grow faster.</p>
            </div>

            <div className="plans-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
              {PLANS.map(plan => {
                const PlanIcon = plan.icon
                return (
                  <div key={plan.id} style={{ position: "relative" }}>
                    {plan.badge && (
                      <div className="badge-pulse" style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "#f59e0b", borderRadius: 20, padding: "4px 18px", fontSize: 11, fontWeight: 800, color: "#fff", zIndex: 10, whiteSpace: "nowrap", boxShadow: "0 4px 14px rgba(245,158,11,0.35)", letterSpacing: "0.04em" }}>
                        ★ {plan.badge}
                      </div>
                    )}
                    <div style={{
                      background: plan.dark ? "rgba(15,23,42,0.88)" : "rgba(255,255,255,0.7)",
                      backdropFilter: "blur(20px)",
                      border: plan.dark ? "1px solid rgba(37,99,235,0.3)" : "1px solid rgba(255,255,255,0.9)",
                      borderRadius: 22, overflow: "hidden",
                      boxShadow: plan.dark ? "0 24px 64px rgba(37,99,235,0.2)" : "0 8px 32px rgba(37,99,235,0.1)"
                    }}>
                      {/* card top */}
                      <div style={{ padding: "32px 30px 24px", borderBottom: plan.dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(37,99,235,0.1)" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                          <div>
                            <p style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#2563eb", marginBottom: 6 }}>{plan.tag}</p>
                            <h3 style={{ fontSize: 26, fontWeight: 900, color: plan.dark ? "#fff" : "#0f172a", letterSpacing: "-0.02em" }}>{plan.name}</h3>
                          </div>
                          <div style={{ width: 44, height: 44, borderRadius: 12, background: plan.dark ? "rgba(37,99,235,0.2)" : "rgba(37,99,235,0.08)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <PlanIcon size={20} color="#2563eb" />
                          </div>
                        </div>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 5 }}>
                          <span style={{ fontSize: 44, fontWeight: 900, color: plan.dark ? "#fff" : "#0f172a", letterSpacing: "-0.03em", lineHeight: 1 }}>{plan.price}</span>
                          <span style={{ fontSize: 14, color: plan.dark ? "rgba(255,255,255,0.45)" : "#94a3b8", fontWeight: 500 }}>{plan.cycle}</span>
                        </div>
                        <p style={{ fontSize: 12, color: plan.dark ? "rgba(255,255,255,0.38)" : "#94a3b8" }}>{plan.note}</p>
                      </div>
                      {/* card features */}
                      <div style={{ padding: "24px 30px 30px" }}>
                        <div style={{ display: "flex", flexDirection: "column", gap: 11, marginBottom: 26 }}>
                          {plan.items.map((item, fi) => (
                            <div key={fi} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                              <CheckCircle2 size={14} color="#16a34a" style={{ flexShrink: 0, marginTop: 2 }} />
                              <span style={{ fontSize: 13, color: plan.dark ? "rgba(255,255,255,0.78)" : "#374151", fontWeight: fi === 0 && plan.dark ? 600 : 400, lineHeight: 1.45 }}>{item}</span>
                            </div>
                          ))}
                        </div>
                        <Link href="/contact" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, background: plan.dark ? "#fff" : C.blue, color: plan.dark ? "#0f172a" : "#fff", borderRadius: 11, padding: "13px 22px", fontWeight: 700, fontSize: 14, boxShadow: plan.dark ? "0 8px 20px rgba(255,255,255,0.15)" : `0 8px 22px rgba(37,99,235,0.3)` }}>
                          Get Started <ArrowRight size={15} />
                        </Link>
                        <p style={{ textAlign: "center", fontSize: 11, color: plan.dark ? "rgba(255,255,255,0.3)" : "#94a3b8", marginTop: 11 }}>
                        {plan.dark 
  ? "₹65K setup + ₹20K/month · Cancel anytime" 
  : "Annual billing · Cancel anytime"}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* guarantee strip */}
            <div className="guarantee-strip" style={{ marginTop: 28, background: "rgba(255,255,255,0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.9)", borderRadius: 14, padding: "18px 28px", display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 24, alignItems: "center", boxShadow: "0 4px 16px rgba(37,99,235,0.06)" }}>
              {[
                { icon: Shield,     text: "No hidden fees" },
                { icon: Headphones, text: "Onboarding support included" },
                { icon: Zap,        text: "Live within 48 hours" },
                { icon: Star,       text: "98% customer satisfaction" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: "flex", alignItems: "center", gap: 7 }}>
                  <Icon size={14} color="#2563eb" />
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: "#475569" }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════ FEATURE TABLE */}
        <section style={{ padding: "80px 24px", background: "transparent" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2563eb", display: "block", marginBottom: 10 }}>Compare</span>
              <h2 style={{ fontSize: "clamp(1.6rem,2.5vw,2.2rem)", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.025em" }}>Full Feature Comparison</h2>
            </div>

            <div className="compare-table">
              <div style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(16px)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.9)", overflow: "hidden", boxShadow: "0 4px 24px rgba(37,99,235,0.08)" }}>
                {/* col headers */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 130px 130px" }}>
                  <div style={{ padding: "16px 18px", borderBottom: "1px solid rgba(37,99,235,0.1)" }} />
                  {[{ label: "Pro Plus", sub: "₹48,999/yr", dark: false }, { label: "Foundation", sub: "₹65,000 setup", dark: true }].map(col => (
                    <div key={col.label} style={{ background: col.dark ? "rgba(15,23,42,0.85)" : "rgba(37,99,235,0.08)", padding: "16px 0", textAlign: "center" as const, borderBottom: "1px solid rgba(37,99,235,0.1)" }}>
                      <p style={{ fontSize: 13, fontWeight: 800, color: col.dark ? "#fff" : "#0f172a", margin: 0 }}>{col.label}</p>
                      <p style={{ fontSize: 10, color: col.dark ? "rgba(255,255,255,0.45)" : "#64748b", margin: "3px 0 0" }}>{col.sub}</p>
                    </div>
                  ))}
                </div>

                {FEATURE_GROUPS.map((g, gi) => (
                  <div key={gi}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 130px 130px", background: "rgba(37,99,235,0.04)", borderTop: "1px solid rgba(37,99,235,0.08)" }}>
                      <div style={{ padding: "9px 18px", gridColumn: "1/4" }}>
                        <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#94a3b8" }}>{g.group}</span>
                      </div>
                    </div>
                    {g.rows.map((row, ri) => (
                      <div key={ri} style={{ display: "grid", gridTemplateColumns: "1fr 130px 130px", borderTop: "1px solid rgba(37,99,235,0.06)", background: ri % 2 === 0 ? "transparent" : "rgba(37,99,235,0.02)" }}>
                        <div style={{ padding: "12px 18px", fontSize: 13, color: "#374151", fontWeight: 500 }}>{row.name}</div>
                        {[row.a, row.b].map((has, ci) => (
                          <div key={ci} style={{ padding: "12px 0", textAlign: "center" as const, background: ci === 1 ? "rgba(15,23,42,0.04)" : "transparent" }}>
                            {has
                              ? <CheckCircle2 size={16} color={ci === 1 ? "#2563eb" : "#16a34a"} style={{ margin: "0 auto" }} />
                              : <X size={14} color="rgba(148,163,184,0.6)" style={{ margin: "0 auto" }} />
                            }
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}

                {/* CTA row */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 130px 130px", borderTop: "1px solid rgba(37,99,235,0.1)", padding: "16px 0" }}>
                  <div />
                  {PLANS.map((plan, i) => (
                    <div key={plan.id} style={{ textAlign: "center" as const, padding: "0 8px" }}>
                      <Link href="/contact" style={{ display: "block", background: i === 1 ? "#0f172a" : C.blue, color: "#fff", borderRadius: 9, padding: "10px 0", fontSize: 12, fontWeight: 700, textAlign: "center" }}>
                        Choose {plan.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════ TESTIMONIALS */}
        <section style={{ padding: "80px 24px", background: "transparent", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(37,99,235,0.04) 1px, transparent 0)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
          <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2563eb", display: "block", marginBottom: 10 }}>Testimonials</span>
              <h2 style={{ fontSize: "clamp(1.6rem,2.5vw,2.2rem)", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.025em" }}>Loved by 500+ Businesses</h2>
            </div>
            <div className="testi-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
              {TESTIMONIALS.map((t, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.9)", borderRadius: 18, padding: "26px 24px", boxShadow: "0 4px 20px rgba(37,99,235,0.07)" }}>
                  <div style={{ display: "flex", gap: 2, marginBottom: 14 }}>
                    {Array.from({ length: t.stars }).map((_, si) => <Star key={si} size={13} color="#f59e0b" fill="#f59e0b" />)}
                  </div>
                  <p style={{ fontSize: 13.5, color: "#374151", lineHeight: 1.7, marginBottom: 18, fontStyle: "italic" }}>"{t.text}"</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(37,99,235,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: "#2563eb" }}>
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "#0f172a", margin: 0 }}>{t.name}</p>
                      <p style={{ fontSize: 11, color: "#94a3b8", margin: 0 }}>{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════ FAQ */}
        <section style={{ padding: "80px 24px", background: "transparent" }}>
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 48 }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2563eb", display: "block", marginBottom: 10 }}>FAQs</span>
              <h2 style={{ fontSize: "clamp(1.6rem,2.5vw,2.2rem)", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.025em" }}>Common Questions</h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { q: "What is the difference between Pro Plus and Foundation?", a: "Pro Plus covers all core AI automation — WhatsApp chatbot, CRM, broadcasts, and AI follow-ups. Foundation adds FirstVoice AI voice receptionist, LeadNest WhatsApp management, CallOrbit call routing, a dedicated account manager, and custom AI training." },
                { q: "Is the Foundation plan a subscription?", a: "No — Foundation is a one-time setup fee of ₹65,000. There is no monthly or annual recurring billing for the platform itself." },
                { q: "How quickly can I go live?", a: "Most clients go live within 24–48 hours. Our team handles the entire setup including WhatsApp API verification." },
                { q: "Do I need technical knowledge?", a: "None at all. PixoraNest is built for business owners. Our team handles setup, AI training, and CRM connection." },
                { q: "Can I upgrade from Pro Plus to Foundation later?", a: "Yes. You can upgrade at any time and we'll credit your Pro Plus payment toward the Foundation setup fee." },
              ].map((faq, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.9)", borderLeft: "3px solid #2563eb", borderRadius: "0 12px 12px 0", padding: "18px 20px", boxShadow: "0 2px 12px rgba(37,99,235,0.06)" }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#0f172a", marginBottom: 8 }}>{faq.q}</p>
                  <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.7 }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════ FINAL CTA */}
        <section style={{ padding: "96px 24px", background: "transparent", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(37,99,235,0.04) 1px, transparent 0)", backgroundSize: "28px 28px", pointerEvents: "none" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />
          <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(37,99,235,0.1)", border: "1px solid rgba(37,99,235,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <Rocket size={28} color="#2563eb" />
            </div>
            <h2 style={{ fontSize: "clamp(2rem,4vw,2.8rem)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", marginBottom: 16 }}>
              Ready to Automate<br />Your Business?
            </h2>
            <p style={{ fontSize: 16, color: "#64748b", maxWidth: 420, margin: "0 auto 36px" }}>
              Join 500+ businesses already using PixoraNest AI to capture leads, reply 24/7, and close more deals.
            </p>
            <div className="final-cta-btns" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 24 }}>
              <Link href="/contact" style={{ background: C.blue, color: "#fff", padding: "14px 30px", borderRadius: 12, fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", gap: 8, boxShadow: "0 8px 24px rgba(37,99,235,0.35)" }}>
                Book Free Demo <ArrowRight size={16} />
              </Link>
              <Link href="#pricing" style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(12px)", border: "1px solid rgba(37,99,235,0.18)", color: "#1e293b", padding: "14px 30px", borderRadius: 12, fontWeight: 600, fontSize: 15 }}>
                View Pricing
              </Link>
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 20, flexWrap: "wrap" }}>
              <span style={{ fontSize: 12, color: "#94a3b8", display: "flex", alignItems: "center", gap: 5 }}>
                <MessageCircle size={12} /> info@pixoranest.com
              </span>
              <span style={{ fontSize: 12, color: "#94a3b8", display: "flex", alignItems: "center", gap: 5 }}>
                <Phone size={12} /> 9460686266
              </span>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}