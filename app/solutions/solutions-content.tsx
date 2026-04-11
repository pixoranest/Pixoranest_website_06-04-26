"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Phone, MessageCircle, PhoneCall, Mic, Share2, Settings, Cpu, Database, Rocket } from "lucide-react"

// ─── Animated Workflow Component ───────────────────────────────────────────────
function LeadJourneyFlow() {
  const [activeStep, setActiveStep] = useState(-1)
  const [lineWidths, setLineWidths] = useState([0, 0, 0, 0])
  const [showStats, setShowStats] = useState(false)
  const [tickMsg, setTickMsg] = useState({ text: "Waiting for incoming lead...", color: "#94a3b8" })
  const animRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const runningRef = useRef(false)

  const stages = [
    {
      label: "Lead\ncaptured", color: "#2563EB", bg: "#EFF6FF", border: "#3B82F6", ring: "#3B82F6",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.1 1.2 2 2 0 012.08 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81A2 2 0 017.22 6.6L6.5 7.32a16 16 0 006.18 6.18l.72-.72a2 2 0 012.07-.48 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
        </svg>
      ),
    },
    {
      label: "AI\nqualifies", color: "#92400E", bg: "#FFFBEB", border: "#F59E0B", ring: "#F59E0B",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      ),
    },
    {
      label: "CRM\nupdated", color: "#5B21B6", bg: "#F5F3FF", border: "#8B5CF6", ring: "#8B5CF6",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
        </svg>
      ),
    },
    {
      label: "Follow-up\nsent", color: "#065F46", bg: "#F0FDF4", border: "#10B981", ring: "#10B981",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      ),
    },
    {
      label: "Deal\nclosed", color: "#14532D", bg: "#F0FDF4", border: "#16A34A", ring: "#16A34A",
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#15803D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      ),
    },
  ]

  const ticks = [
    { text: "📞 Incoming call detected — AI picking up...", color: "#3B82F6" },
    { text: "🤖 AI qualifying lead in real-time...", color: "#F59E0B" },
    { text: "📋 CRM updated automatically — lead logged...", color: "#8B5CF6" },
    { text: "💬 Personalised follow-up sent via WhatsApp...", color: "#10B981" },
    { text: "✅ Deal closed — lead converted!", color: "#16A34A" },
  ]

  const connColors = ["#3B82F6", "#F59E0B", "#8B5CF6", "#10B981"]

  function runFlow() {
    if (runningRef.current) return
    runningRef.current = true
    setActiveStep(0)
    setTickMsg(ticks[0])
    setLineWidths([0, 0, 0, 0])
    setShowStats(false)

    let delay = 300
    for (let i = 0; i < 4; i++) {
      const idx = i
      animRef.current = setTimeout(() => {
        const start = performance.now()
        const dur = 750
        function frame(now: number) {
          const p = Math.min((now - start) / dur, 1)
          setLineWidths(prev => {
            const next = [...prev]
            next[idx] = p * 100
            return next
          })
          if (p < 1) requestAnimationFrame(frame)
          else {
            setActiveStep(idx + 1)
            setTickMsg(ticks[idx + 1])
            if (idx === 3) {
              setTimeout(() => setShowStats(true), 300)
              setTimeout(() => {
                setTickMsg({ text: "🔄 New lead coming in...", color: "#94a3b8" })
                setTimeout(() => { runningRef.current = false; runFlow() }, 900)
              }, 3200)
            }
          }
        }
        requestAnimationFrame(frame)
      }, delay)
      delay += 1050
    }
  }

  useEffect(() => {
    const t = setTimeout(runFlow, 600)
    return () => {
      clearTimeout(t)
      if (animRef.current) clearTimeout(animRef.current)
      runningRef.current = false
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ background: "#ffffff", borderRadius: 24, padding: "28px 24px 24px", boxShadow: "0 4px 32px rgba(0,0,0,0.08)", width: "100%", maxWidth: 540, fontFamily: "inherit" }}>
      <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "#94a3b8", textAlign: "center", marginBottom: 16 }}>
        How a lead becomes a customer
      </p>
      <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {[
          { label: "WhatsApp", color: "#10B981" },
          { label: "Phone call", color: "#3B82F6" },
          { label: "Social", color: "#8B5CF6" },
          { label: "Web form", color: "#F59E0B" },
        ].map(s => (
          <span key={s.label} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 20, border: "1px solid #e2e8f0", background: "#f8fafc", fontSize: 11, fontWeight: 500, color: "#64748b" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: s.color, display: "inline-block" }} />
            {s.label}
          </span>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "center" }}>
        {stages.map((stage, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", flex: i < 4 ? "1 1 auto" : "0 0 auto" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, position: "relative" }}>
              <div style={{
                width: 48, height: 48, borderRadius: "50%",
                background: stage.bg,
                border: `2px solid ${activeStep >= i ? stage.border : "#e2e8f0"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                transform: activeStep === i ? "scale(1.12)" : "scale(1)",
                transition: "transform 0.3s, border-color 0.3s",
                boxShadow: activeStep === i ? `0 0 0 6px ${stage.ring}22` : "none",
              }}>
                {stage.icon}
              </div>
              <p style={{ fontSize: 10, fontWeight: 600, color: activeStep >= i ? stage.color : "#94a3b8", textAlign: "center", whiteSpace: "pre-line", lineHeight: 1.35, transition: "color 0.3s" }}>
                {stage.label}
              </p>
            </div>
            {i < 4 && (
              <div style={{ flex: 1, height: 2, background: "#e2e8f0", borderRadius: 1, position: "relative", overflow: "hidden", margin: "0 4px", marginBottom: 22 }}>
                <div style={{ height: "100%", width: `${lineWidths[i]}%`, background: connColors[i], borderRadius: 1, position: "absolute", left: 0, top: 0 }} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 16, height: 26, overflow: "hidden", textAlign: "center" }}>
        <span key={tickMsg.text} style={{ fontSize: 11, color: "#64748b", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, animation: "tickIn 0.35s ease" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: tickMsg.color, display: "inline-block", flexShrink: 0 }} />
          {tickMsg.text}
        </span>
      </div>
      <div style={{ height: 1, background: "#f1f5f9", margin: "16px 0" }} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
        {[
          { num: "10M+", lbl: "Calls automated", color: "#2563EB" },
          { num: "98%", lbl: "Response rate", color: "#059669" },
          { num: "3.2x", lbl: "More conversions", color: "#16A34A" },
        ].map((s, i) => (
          <div key={i} style={{
            background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 12,
            padding: "12px 10px", textAlign: "center",
            opacity: showStats ? 1 : 0,
            transform: showStats ? "translateY(0)" : "translateY(8px)",
            transition: `opacity 0.4s ease ${i * 0.15}s, transform 0.4s ease ${i * 0.15}s`,
          }}>
            <div style={{ fontSize: 20, fontWeight: 700, color: s.color, lineHeight: 1 }}>{s.num}</div>
            <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 4, fontWeight: 500 }}>{s.lbl}</div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes tickIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

// ─── Solution Cards Data ────────────────────────────────────────────────────────
// ⚠️ PATHS match actual Next.js folder names under /app/solutions/
const solutionCards = [
  {
    icon: Phone,
    title: "AI Receptionist",
    desc: "Handle incoming calls 24/7. Qualify leads, book appointments, and route calls automatically.",
    link: "/solutions/firstvoice",       // folder: /solutions/firstvoice/
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Automation",
    desc: "Capture, qualify, and nurture leads through WhatsApp with automated follow-up sequences.",
    link: "/solutions/leadnest",         // folder: /solutions/leadnest/
    color: "bg-green-50 text-green-600",
  },
  {
    icon: PhoneCall,
    title: "Call Automation",
    desc: "Smart AI routing, real-time transcription, and automated follow-ups for every inbound call.",
    link: "/solutions/callorbit",        // folder: /solutions/callorbit/
    color: "bg-indigo-50 text-indigo-600",
  },
  {
    icon: Mic,
    title: "AI Voice Agent",
    desc: "Human-like AI voice conversations for outbound sales, support, and appointment reminders.",
    link: "/solutions/echoassist",       // folder: /solutions/echoassist/
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: Share2,
    title: "Social Automation",
    desc: "Auto-reply to DMs, schedule content, and capture leads from Instagram, Facebook, and LinkedIn.",
    link: "/solutions/socialium",        // folder: /solutions/socialium/
    color: "bg-pink-50 text-pink-600",
  },
  {
    icon: Settings,
    title: "CRM Automation",
    desc: "Connect all lead sources to your CRM. Auto-assign, score, and trigger follow-up workflows.",
    link: "/solutions/crm-automation",  // folder: /solutions/crm-automation/
    color: "bg-orange-50 text-orange-600",
  },
]

// ─── How It Works Steps ─────────────────────────────────────────────────────────
const steps = [
  {
    id: 0,
    title: "Lead",
    icon: Phone,
    contentTitle: "Capture Every Lead",
    contentDesc: "Customer reaches you via call, WhatsApp, or website. Incoming calls, messages, and inquiries are automatically captured and logged — no lead slips through the cracks.",
  },
  {
    id: 1,
    title: "AI Process",
    icon: Cpu,
    contentTitle: "AI-Powered Processing",
    contentDesc: "Our AI analyzes each lead, qualifies them, and routes them instantly to the right team or workflow — no manual effort required.",
  },
  {
    id: 2,
    title: "Capture",
    icon: Database,
    contentTitle: "Organize & Store",
    contentDesc: "All lead data is stored securely in your CRM. Customer data is structured, tagged, and synced automatically — zero manual entry.",
  },
  {
    id: 3,
    title: "Convert",
    icon: Rocket,
    contentTitle: "Convert & Close",
    contentDesc: "Automated follow-ups and reminders help close deals faster. Personalized outreach helps you close deals faster than the competition.",
  },
]

// ─── Main Page ──────────────────────────────────────────────────────────────────
export function SolutionsPageContent() {
  const [active, setActive] = useState(0)

  return (
    <main className="bg-[#eef4ff]">

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center gap-10 lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center">

            {/* LEFT — text */}
            <div className="w-full text-center lg:text-left">
              <p className="text-blue-600 text-sm font-semibold mb-3 uppercase tracking-wider">
                Trusted by 500+ businesses worldwide
              </p>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                AI Automation{" "}
                <span className="text-blue-600">Solutions</span>
              </h1>
              <p className="mt-5 text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                Automate calls, leads, and customer communication using powerful AI tools.
                Reduce costs and improve customer experience with intelligent automation.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <Link
                  href="/demo"
                  className="bg-blue-600 text-white px-7 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors text-center"
                >
                  Book a Demo →
                </Link>
                <Link
                  href="/contact"
                  className="border border-gray-300 bg-white px-7 py-3 rounded-xl font-semibold text-gray-700 hover:border-blue-400 hover:text-blue-600 transition-colors text-center"
                >
                  Contact Us
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 justify-center lg:justify-start text-sm text-gray-500">
                <span>✔ AI Call Automation</span>
                <span>✔ WhatsApp Lead Automation</span>
                <span>✔ CRM Workflow Automation</span>
              </div>
            </div>

            {/* RIGHT — animated widget */}
            <div className="w-full flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[540px]">
                <div className="absolute inset-0 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full pointer-events-none mx-auto" />
                <div className="relative">
                  <LeadJourneyFlow />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ═══════════════════ SOLUTIONS GRID ═══════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Solutions</p>
            <h2 className="text-3xl font-bold mt-2 text-gray-900">
              AI Automation <span className="text-blue-600">Solutions</span>
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              AI-powered tools to automate business communication, lead generation, and workflows — built for Indian businesses.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutionCards.map((item, i) => (
              // ✅ Entire card is a Link — clicking anywhere navigates correctly
              <Link
                key={i}
                href={item.link}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 hover:border-blue-200 transition-all duration-200 hover:-translate-y-1 block group"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${item.color}`}>
                  <item.icon size={20} />
                </div>
                <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                  {item.desc}
                </p>
                {/* ✅ "Explore →" is inside the Link — no nested <a> tags */}
                <p className="text-blue-600 mt-4 text-sm font-medium">Explore →</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ HOW IT WORKS ═══════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Process</p>
            <h2 className="text-3xl font-bold mt-2 text-gray-900">How It Works</h2>
            <p className="text-gray-600 mt-4 max-w-xl mx-auto">
              Four simple steps to automate your entire customer journey.
            </p>
          </div>

          {/* Desktop step indicator */}
          <div className="hidden md:block relative">
            <div className="flex justify-between items-center relative">
              <div className="absolute top-6 left-0 w-full h-[2px] bg-gray-200" />
              <div
                className="absolute top-6 left-0 h-[2px] bg-blue-600 transition-all duration-500"
                style={{ width: `${(active / 3) * 100}%` }}
              />
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = active === index
                return (
                  <div
                    key={step.id}
                    onClick={() => setActive(index)}
                    className="relative z-10 flex flex-col items-center cursor-pointer"
                  >
                    <div className={`w-12 h-12 flex items-center justify-center rounded-full border-2 transition-all duration-300 ${isActive ? "bg-blue-600 text-white border-blue-600 scale-110 shadow-lg shadow-blue-200" : "bg-white text-gray-400 border-gray-300 hover:border-blue-300"}`}>
                      <Icon size={20} />
                    </div>
                    <p className={`mt-2 text-sm font-medium ${isActive ? "text-blue-600" : "text-gray-500"}`}>
                      {step.title}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Mobile step buttons */}
          <div className="flex md:hidden gap-2 justify-center flex-wrap mb-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = active === index
              return (
                <button
                  key={step.id}
                  onClick={() => setActive(index)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${isActive ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-500 border-gray-200"}`}
                >
                  <Icon size={15} />
                  {step.title}
                </button>
              )
            })}
          </div>

          <div className="mt-8">
            <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-100 text-center">
              <h3 className="text-xl font-bold text-gray-900">{steps[active].contentTitle}</h3>
              <p className="text-gray-600 mt-3 max-w-xl mx-auto leading-relaxed">
                {steps[active].contentDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ TRUST STRIP ═══════════════════ */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-blue-600">
        <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center text-white">
          {[
            { num: "500+", label: "Businesses Trust Us" },
            { num: "10M+", label: "Interactions Automated" },
            { num: "4.9★", label: "Customer Rating" },
            { num: "99.9%", label: "Platform Uptime" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-3xl font-bold">{s.num}</div>
              <div className="text-sm text-blue-100 mt-1 font-medium">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════ FINAL CTA ═══════════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ready to Automate Your Business?
          </h2>
          <p className="text-gray-600 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Join 500+ Indian businesses using PixoraNest to capture more leads,
            automate communication, and close deals faster.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-4 rounded-xl transition-colors shadow-lg shadow-blue-200 text-center"
            >
              Book a Free Demo →
            </Link>
            <Link
              href="/contact"
              className="border border-gray-300 hover:border-blue-400 text-gray-700 hover:text-blue-600 font-semibold px-8 py-4 rounded-xl transition-colors text-center"
            >
              Talk to Sales
            </Link>
          </div>
          <p className="text-gray-400 text-xs mt-5">
            No setup fees · No long-term contracts · Indian support team
          </p>
        </div>
      </section>

    </main>
  )
}