"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import {
  Mail, Phone, MapPin, Send, CheckCircle2,
  ArrowRight, MessageCircle, Zap, Shield, Star, Clock, Bot,
} from "lucide-react"

const BLUE = "#2563eb"
const NAVY = "#0f172a"

// ─── Schema JSON-LD ────────────────────────────────────────────────────────────
const contactSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://pixoranest.com/contact#webpage",
      "url": "https://pixoranest.com/contact",
      "name": "Contact PixoraNest | Free AI Automation Demo India",
      "description":
        "Contact PixoraNest to book a free AI automation demo for your Indian business. Get expert help with AI receptionist, WhatsApp automation & AI voice agents.",
      "isPartOf": { "@id": "https://pixoranest.com/#organization" },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home",    "item": "https://pixoranest.com" },
          { "@type": "ListItem", "position": 2, "name": "Contact", "item": "https://pixoranest.com/contact" },
        ],
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://pixoranest.com/#localbusiness",
      "name": "PixoraNest",
      "description": "AI automation company in India providing AI receptionist, WhatsApp automation, AI voice agents and CRM workflow automation for businesses.",
      "url": "https://pixoranest.com",
      "telephone": "+91-9460686266",
      "email": "info@pixoranest.com",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "1st Floor, Near Tehsil Bhawan",
        "addressLocality": "Narayanpur",
        "addressRegion": "Rajasthan",
        "postalCode": "301024",
        "addressCountry": "IN",
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "09:00",
        "closes": "19:00",
      },
      "sameAs": [
        "https://www.facebook.com/pixoranest2025",
        "https://www.instagram.com/pixoranest/",
        "https://www.linkedin.com/company/pixoranest-official/",
        "https://youtube.com/@pixora-nest",
      ],
    },
  ],
}

// ─── Contact info cards ────────────────────────────────────────────────────────
const contactInfo = [
  {
    icon: Mail,
    label: "Email us",
    value: "info@pixoranest.com",
    sub: "We reply within 4 hours",
    href: "mailto:info@pixoranest.com",
    lightColor: "#2563eb",
    lightBg: "rgba(37,99,235,0.08)",
  },
  {
    icon: Phone,
    label: "Call / WhatsApp",
    value: "+91 94606 86266",
    sub: "Mon–Sat, 9am–7pm IST",
    href: "tel:+919460686266",
    lightColor: "#16a34a",
    lightBg: "rgba(22,163,74,0.08)",
  },
  {
    icon: MapPin,
    label: "Office Address",
    value: "Narayanpur, Rajasthan 301024",
    sub: "1st Floor, Near Tehsil Bhawan",
    href: "#",
    lightColor: "#d97706",
    lightBg: "rgba(217,119,6,0.08)",
  },
]

// ─── Trust badges ──────────────────────────────────────────────────────────────
const trustBadges = [
  { icon: Zap,    text: "Reply within 4 hours" },
  { icon: Shield, text: "100% data secure" },
  { icon: Star,   text: "98% satisfaction rate" },
  { icon: Clock,  text: "Live in 48 hours" },
]

// ─── Right-side trust points ───────────────────────────────────────────────────
const trustPoints = [
  { icon: Zap,    title: "Quick WhatsApp Response",  desc: "Our India-based team replies within minutes on WhatsApp — no waiting, no queues." },
  { icon: Shield, title: "No Spam. Ever.",            desc: "Your details stay private. Zero unsolicited follow-ups from our side." },
  { icon: Star,   title: "Free Consultation",         desc: "Get expert advice on the right AI automation solution for your Indian business." },
  { icon: Bot,    title: "AI-First Experts",          desc: "We've helped 500+ businesses across India deploy AI automation that actually converts." },
]

type FormData = {
  fullName: string
  email: string
  phone: string
  company: string
  requirements: string
}

// ─── Input field ───────────────────────────────────────────────────────────────
function LightField({
  type = "text", placeholder, value, onChange, required = true,
}: {
  type?: string
  placeholder: string
  value: string
  onChange: (v: string) => void
  required?: boolean
}) {
  const [focused, setFocused] = useState(false)
  return (
    <input
      type={type}
      required={required}
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        width: "100%",
        background: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(10px)",
        border: `1.5px solid ${focused ? "rgba(37,99,235,0.45)" : value ? "rgba(37,99,235,0.25)" : "rgba(37,99,235,0.15)"}`,
        borderRadius: 12,
        padding: "13px 16px",
        fontSize: 13.5,
        color: "#0f172a",
        outline: "none",
        transition: "border-color 0.2s, box-shadow 0.2s",
        fontFamily: "inherit",
        boxShadow: focused ? "0 0 0 3px rgba(37,99,235,0.08)" : "none",
      }}
    />
  )
}

// ─── Main component ────────────────────────────────────────────────────────────
export function ContactPageContent() {
  const [submitted, setSubmitted] = useState(false)
  const [loading,   setLoading]   = useState(false)
  const [formData,  setFormData]  = useState<FormData>({
    fullName: "", email: "", phone: "", company: "", requirements: "",
  })

  function update(key: keyof FormData) {
    return (v: string) => setFormData(prev => ({ ...prev, [key]: v }))
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    try {
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      setSubmitted(true)
    } catch (err) {
      console.error("Email Error:", err)
      alert("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />

      <div className="overflow-x-hidden" style={{ background: "transparent" }}>

        {/* ══════════════════════════════════════════
            HERO
        ══════════════════════════════════════════ */}
        <section
          className="px-6 pt-28 pb-16 sm:pt-36 sm:pb-20"
          style={{ background: "transparent", position: "relative", overflow: "hidden" }}
        >
          {/* Ambient glow orbs */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity }}
            style={{ position: "absolute", top: -80, left: -80, width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.18) 0%, transparent 70%)", pointerEvents: "none" }}
          />
          <motion.div
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, delay: 2 }}
            style={{ position: "absolute", bottom: -80, right: -60, width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)", pointerEvents: "none" }}
          />

          <div className="max-w-4xl mx-auto text-center" style={{ position: "relative", zIndex: 1 }}>
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">

              {/* Breadcrumb — SEO */}
              <motion.div variants={fadeInUp} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 16, fontSize: 12, color: "#64748b" }}>
                <Link href="/" style={{ color: "#64748b", textDecoration: "none" }}>Home</Link>
                <span>/</span>
                <span style={{ color: BLUE, fontWeight: 600 }}>Contact Us</span>
              </motion.div>

              {/* Badge */}
              <motion.div variants={fadeInUp} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)", borderRadius: 20, padding: "6px 16px", marginBottom: 24 }}>
                <MessageCircle size={13} color={BLUE} />
                <span style={{ fontSize: 12, fontWeight: 600, color: BLUE }}>We reply within 4 hours</span>
              </motion.div>

              {/* H1 — primary keyword */}
              <motion.h1 variants={fadeInUp}
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", fontWeight: 900, color: NAVY, lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 20 }}>
                Contact{" "}
                <span style={{ color: BLUE }}>PixoraNest</span>{" "}
                — India's AI Automation Experts
              </motion.h1>

              {/* Opening paragraph — keyword in first 100 words */}
              <motion.p variants={fadeInUp}
                style={{ fontSize: 17, color: "#475569", lineHeight: 1.75, maxWidth: 560, margin: "0 auto 36px" }}>
                Book a <strong>free AI automation demo</strong> for your Indian business. Speak with our experts about AI receptionist, WhatsApp automation, AI voice agents, and CRM workflow automation — and go live in 48 hours.
              </motion.p>

              {/* Trust badges */}
              <motion.div variants={fadeInUp} style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                {trustBadges.map((b, i) => {
                  const BIcon = b.icon
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, background: "rgba(255,255,255,0.65)", backdropFilter: "blur(8px)", border: "1px solid rgba(37,99,235,0.15)", borderRadius: 20, padding: "7px 14px" }}>
                      <BIcon size={13} color={BLUE} />
                      <span style={{ fontSize: 12, color: "#334155", fontWeight: 500 }}>{b.text}</span>
                    </div>
                  )
                })}
              </motion.div>

            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CONTACT INFO CARDS
        ══════════════════════════════════════════ */}
        <section className="px-6 py-8" style={{ background: "transparent", borderBottom: "1px solid rgba(37,99,235,0.08)" }}>
          <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-5">
            {contactInfo.map((info, i) => {
              const InfoIcon = info.icon
              return (
                <motion.a key={i} href={info.href}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,0.65)", backdropFilter: "blur(12px)", border: "1px solid rgba(37,99,235,0.12)", borderRadius: 16, padding: "18px 20px", textDecoration: "none", cursor: "pointer", transition: "all 0.2s", boxShadow: "0 4px 20px rgba(37,99,235,0.06)" }}>
                  <div style={{ width: 46, height: 46, borderRadius: 12, background: info.lightBg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <InfoIcon size={20} color={info.lightColor} />
                  </div>
                  <div>
                    <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#94a3b8", margin: 0, marginBottom: 3 }}>{info.label}</p>
                    <p style={{ fontSize: 13.5, fontWeight: 700, color: "#0f172a", margin: 0 }}>{info.value}</p>
                    <p style={{ fontSize: 11, color: "#64748b", margin: "2px 0 0" }}>{info.sub}</p>
                  </div>
                </motion.a>
              )
            })}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            MAIN CONTENT — FORM + RIGHT PANEL
        ══════════════════════════════════════════ */}
        <section className="px-6 py-16" style={{ background: "transparent" }}>
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-start">

            {/* ── LEFT: CONTACT FORM ── */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(20px)", border: "1px solid rgba(37,99,235,0.12)", borderRadius: 24, overflow: "hidden", boxShadow: "0 8px 40px rgba(37,99,235,0.08)" }}>

                {/* Form header */}
                <div style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #1e3a8a 100%)`, padding: "28px 32px", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: -20, right: -20, width: 120, height: 120, borderRadius: "50%", background: "rgba(37,99,235,0.3)", pointerEvents: "none" }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative" }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Send size={18} color="#fff" />
                    </div>
                    <div>
                      <p style={{ fontSize: 16, fontWeight: 800, color: "#fff", margin: 0 }}>Send Us a Message</p>
                      <p style={{ fontSize: 11, color: "rgba(255,255,255,0.6)", margin: 0 }}>We'll get back to you within 4 hours</p>
                    </div>
                  </div>
                </div>

                <div style={{ padding: "28px 32px" }}>
                  <AnimatePresence mode="wait">
                    {submitted ? (
                      <motion.div key="success"
                        initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                        style={{ textAlign: "center", padding: "40px 20px" }}>
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 0.5 }}
                          style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(22,163,74,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                          <CheckCircle2 size={36} color="#16a34a" />
                        </motion.div>
                        <h3 style={{ fontSize: 22, fontWeight: 800, color: "#0f172a", marginBottom: 10 }}>Message Sent!</h3>
                        <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.7, maxWidth: 320, margin: "0 auto 24px" }}>
                          Thank you for reaching out. Our India-based team will contact you within 4 hours.
                        </p>
                        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
                          <button
                            onClick={() => { setSubmitted(false); setFormData({ fullName: "", email: "", phone: "", company: "", requirements: "" }) }}
                            style={{ background: "rgba(37,99,235,0.08)", color: BLUE, border: "1px solid rgba(37,99,235,0.2)", borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                            Send another
                          </button>
                          <a href="https://wa.me/919460686266" target="_blank" rel="noopener noreferrer"
                            style={{ background: "#25d366", color: "#fff", borderRadius: 10, padding: "10px 20px", fontSize: 13, fontWeight: 600, textDecoration: "none", display: "flex", alignItems: "center", gap: 6 }}>
                            <MessageCircle size={14} />
                            WhatsApp us
                          </a>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.form key="form" onSubmit={handleSubmit}
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        style={{ display: "flex", flexDirection: "column", gap: 14 }}>

                        {/* Row 1 — Name + Email */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label style={{ fontSize: 11, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 5 }}>Full Name *</label>
                            <LightField placeholder="Your full name" value={formData.fullName} onChange={update("fullName")} />
                          </div>
                          <div>
                            <label style={{ fontSize: 11, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 5 }}>Business Email *</label>
                            <LightField type="email" placeholder="you@company.com" value={formData.email} onChange={update("email")} />
                          </div>
                        </div>

                        {/* Row 2 — Phone + Company */}
                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <label style={{ fontSize: 11, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 5 }}>Phone / WhatsApp *</label>
                            <LightField type="tel" placeholder="+91 98765 43210" value={formData.phone} onChange={update("phone")} />
                          </div>
                          <div>
                            <label style={{ fontSize: 11, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 5 }}>Company Name</label>
                            <LightField placeholder="Your company" value={formData.company} onChange={update("company")} required={false} />
                          </div>
                        </div>

                        {/* Message */}
                        <div>
                          <label style={{ fontSize: 11, fontWeight: 600, color: "#64748b", display: "block", marginBottom: 5 }}>Tell us about your automation needs *</label>
                          <textarea
                            rows={5}
                            required
                            placeholder="E.g. I want to automate my incoming calls and WhatsApp leads for my clinic in Delhi..."
                            value={formData.requirements}
                            onChange={e => update("requirements")(e.target.value)}
                            style={{
                              width: "100%",
                              background: "rgba(255,255,255,0.8)",
                              backdropFilter: "blur(10px)",
                              border: "1.5px solid rgba(37,99,235,0.15)",
                              borderRadius: 12,
                              padding: "13px 16px",
                              fontSize: 13.5,
                              color: "#0f172a",
                              outline: "none",
                              resize: "none",
                              fontFamily: "inherit",
                              transition: "border-color 0.2s, box-shadow 0.2s",
                            }}
                            onFocus={e => {
                              e.currentTarget.style.borderColor = "rgba(37,99,235,0.45)"
                              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(37,99,235,0.08)"
                            }}
                            onBlur={e => {
                              e.currentTarget.style.borderColor = "rgba(37,99,235,0.15)"
                              e.currentTarget.style.boxShadow = "none"
                            }}
                          />
                        </div>

                        {/* Privacy note */}
                        <p style={{ fontSize: 11.5, color: "#94a3b8", display: "flex", alignItems: "center", gap: 5, margin: 0 }}>
                          <Shield size={12} color="#94a3b8" style={{ flexShrink: 0 }} />
                          Your data is 100% secure and never shared with third parties.
                        </p>

                        {/* Submit */}
                        <motion.button
                          type="submit"
                          disabled={loading}
                          whileHover={{ scale: loading ? 1 : 1.01, boxShadow: loading ? "none" : "0 12px 28px rgba(37,99,235,0.4)" }}
                          whileTap={{ scale: loading ? 1 : 0.99 }}
                          style={{
                            display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                            background: loading ? "rgba(37,99,235,0.5)" : `linear-gradient(135deg, ${BLUE} 0%, #4f46e5 100%)`,
                            color: "#fff", border: "none", borderRadius: 12,
                            padding: "15px 24px", fontSize: 14, fontWeight: 700,
                            cursor: loading ? "not-allowed" : "pointer",
                            boxShadow: loading ? "none" : "0 8px 20px rgba(37,99,235,0.3)",
                            transition: "background 0.2s, box-shadow 0.2s",
                            width: "100%",
                          }}>
                          {loading ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.4)", borderTopColor: "#fff" }}
                              />
                              Sending...
                            </>
                          ) : (
                            <>Send Message <Send size={15} /></>
                          )}
                        </motion.button>

                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* ── RIGHT: CTA + TRUST POINTS ── */}
            <motion.div
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}>

              {/* Primary CTA card */}
              <motion.a
                href="https://wa.me/919460686266"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Book a free AI automation demo on WhatsApp with PixoraNest India"
                whileHover={{ y: -4, boxShadow: "0 20px 48px rgba(37,99,235,0.35)" }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                  background: "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
                  borderRadius: 20, padding: "36px 28px",
                  textDecoration: "none",
                  boxShadow: "0 12px 32px rgba(37,99,235,0.28)",
                  cursor: "pointer", position: "relative", overflow: "hidden",
                  transition: "box-shadow 0.3s",
                }}>
                <div style={{ position: "absolute", top: -40, right: -40, width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.08)", pointerEvents: "none" }} />
                <div style={{ position: "absolute", bottom: -30, left: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.05)", pointerEvents: "none" }} />

                <div style={{ width: 52, height: 52, borderRadius: 14, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <MessageCircle size={24} color="#fff" />
                </div>

                <div style={{ textAlign: "center", position: "relative" }}>
                  <p style={{ fontSize: 20, fontWeight: 900, color: "#fff", margin: 0, letterSpacing: "-0.02em" }}>
                    Book a Free Demo Call
                  </p>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", margin: "6px 0 0" }}>
                    Talk to an AI automation expert in India today
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.15)", borderRadius: 20, padding: "8px 18px", position: "relative" }}>
                  <ArrowRight size={14} color="#fff" />
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>Open WhatsApp</span>
                </div>

                <p style={{ fontSize: 11.5, color: "rgba(255,255,255,0.6)", margin: 0, position: "relative", textAlign: "center" }}>
                  ⚡ Quick response · No spam · Free consultation
                </p>
              </motion.a>

              {/* Trust points */}
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {trustPoints.map((point, i) => {
                  const PIcon = point.icon
                  return (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                      style={{ display: "flex", alignItems: "flex-start", gap: 14, background: "rgba(255,255,255,0.65)", backdropFilter: "blur(12px)", border: "1px solid rgba(37,99,235,0.1)", borderRadius: 16, padding: "16px 18px", boxShadow: "0 4px 16px rgba(37,99,235,0.05)" }}>
                      <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(37,99,235,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                        <PIcon size={17} color={BLUE} />
                      </div>
                      <div>
                        <p style={{ fontSize: 13.5, fontWeight: 700, color: "#0f172a", margin: 0 }}>{point.title}</p>
                        <p style={{ fontSize: 12.5, color: "#64748b", margin: "3px 0 0", lineHeight: 1.55 }}>{point.desc}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Office address card */}
              <div style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(12px)", border: "1px solid rgba(37,99,235,0.12)", borderRadius: 16, padding: "18px 20px", boxShadow: "0 4px 20px rgba(37,99,235,0.06)" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(217,119,6,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <MapPin size={17} color="#d97706" />
                  </div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#94a3b8", margin: "0 0 4px" }}>Office Address</p>
                    <p style={{ fontSize: 13.5, fontWeight: 700, color: "#0f172a", margin: 0 }}>PixoraNest AI Automation India</p>
                    <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.6, margin: "3px 0 0" }}>
                      1st Floor, Near Tehsil Bhawan<br />
                      Narayanpur, Rajasthan 301024, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Internal links */}
              <div style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(12px)", border: "1px solid rgba(37,99,235,0.10)", borderRadius: 16, padding: "18px 20px", boxShadow: "0 4px 16px rgba(37,99,235,0.05)" }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "#94a3b8", margin: "0 0 12px" }}>Explore Before You Contact</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {[
                    { label: "View all AI automation solutions",  href: "/solutions" },
                    { label: "See pricing plans",                  href: "/pricing"   },
                    { label: "Read customer success stories",      href: "/customer-stories" },
                    { label: "Learn about PixoraNest",             href: "/about"     },
                  ].map((link, i) => (
                    <Link key={i} href={link.href}
                      style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 600, color: BLUE, textDecoration: "none" }}>
                      <ArrowRight size={13} color={BLUE} />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            BOTTOM CTA
        ══════════════════════════════════════════ */}
        <section className="px-6 py-20" style={{ background: "transparent", position: "relative", overflow: "hidden" }}>
          <motion.div
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)", pointerEvents: "none" }}
          />
          <div className="max-w-3xl mx-auto text-center" style={{ position: "relative" }}>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(20px)", border: "1px solid rgba(37,99,235,0.15)", borderRadius: 28, padding: "52px 40px", boxShadow: "0 8px 40px rgba(37,99,235,0.08)" }}>
                <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", marginBottom: 14 }}>
                  Ready to Automate Your Business?
                </h2>
                <p style={{ fontSize: 15, color: "#64748b", maxWidth: 460, margin: "0 auto 32px", lineHeight: 1.75 }}>
                  Join 500+ businesses across India already using PixoraNest to capture leads, reply 24/7, and close more deals with AI automation.
                </p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                  <Link href="/pricing"
                    style={{ background: `linear-gradient(135deg, ${BLUE} 0%, #4f46e5 100%)`, color: "#fff", padding: "14px 28px", borderRadius: 12, fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", gap: 8, boxShadow: "0 8px 24px rgba(37,99,235,0.3)", textDecoration: "none" }}>
                    View Pricing <ArrowRight size={15} />
                  </Link>
                  <Link href="/solutions"
                    style={{ background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.2)", color: BLUE, padding: "14px 28px", borderRadius: 12, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
                    Explore Solutions
                  </Link>
                </div>
                <p style={{ fontSize: 12, color: "#94a3b8", marginTop: 20 }}>
                  ✉ info@pixoranest.com · 📞 9460686266
                </p>
              </div>
            </motion.div>
          </div>
        </section>

      </div>
    </>
  )
}