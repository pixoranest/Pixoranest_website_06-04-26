"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, useInView } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { teamMembers } from "@/lib/data"
import {
  Facebook, Instagram, Youtube, Linkedin, ArrowRight,
  Target, Eye, Lightbulb, Users, Shield, Zap,
  CheckCircle2, Bot, TrendingUp, Globe, Award, Rocket,
  Phone, MessageCircle, PhoneForwarded, Mic, Share2,
} from "lucide-react"

const BLUE = "#2563eb"

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
}
const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

// ─── Schema JSON-LD ────────────────────────────────────────────────────────────
const aboutSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://pixoranest.com/#organization",
      "name": "PixoraNest",
      "url": "https://pixoranest.com",
      "logo": "https://pixoranest.com/logo.png",
      "description":
        "PixoraNest is an AI automation company in India that helps businesses automate calls, WhatsApp communication, lead management, and customer workflows using intelligent AI solutions.",
      "foundingLocation": "India",
      "areaServed": "IN",
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-9460686266",
        "contactType": "Customer Support",
        "email": "info@pixoranest.com",
        "availableLanguage": ["English", "Hindi"],
      },
      "sameAs": [
        "https://www.facebook.com/pixoranest2025",
        "https://www.instagram.com/pixoranest/",
        "https://www.linkedin.com/company/pixoranest-official/",
        "https://youtube.com/@pixora-nest",
      ],
    },
    {
      "@type": "WebPage",
      "@id": "https://pixoranest.com/about#webpage",
      "url": "https://pixoranest.com/about",
      "name": "About PixoraNest | AI Automation Company India",
      "description":
        "Learn about PixoraNest, India's leading AI automation company providing AI receptionists, WhatsApp automation, AI voice agents and business automation solutions.",
      "isPartOf": { "@id": "https://pixoranest.com/#organization" },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home",  "item": "https://pixoranest.com" },
          { "@type": "ListItem", "position": 2, "name": "About", "item": "https://pixoranest.com/about" },
        ],
      },
    },
  ],
}

// ─── Animated Counter ──────────────────────────────────────────────────────────
function Counter({ end, suffix = "+" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref    = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let current = 0
    const step  = end / 80
    const timer = setInterval(() => {
      current += step
      if (current >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(current))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

// ─── Values ────────────────────────────────────────────────────────────────────
const values = [
  {
    icon: Lightbulb,
    title: "Innovation First",
    color: "#d97706",
    bg: "rgba(217,119,6,0.08)",
    description:
      "We stay at the forefront of AI technology, constantly exploring new ways to solve business challenges for Indian companies.",
  },
  {
    icon: Users,
    title: "Client-Centric",
    color: BLUE,
    bg: "rgba(37,99,235,0.08)",
    description:
      "Every solution we build starts with understanding our clients' unique needs, goals, and the specific context of their industry.",
  },
  {
    icon: Shield,
    title: "Trust & Security",
    color: "#059669",
    bg: "rgba(5,150,105,0.08)",
    description:
      "We prioritize data security and privacy in every solution, ensuring full compliance with Indian data protection standards.",
  },
  {
    icon: Zap,
    title: "Results-Driven",
    color: "#7c3aed",
    bg: "rgba(124,58,237,0.08)",
    description:
      "We measure success by the tangible results and ROI our AI automation solutions deliver for each client we work with.",
  },
]

// ─── Solutions ─────────────────────────────────────────────────────────────────
const solutions = [
  { name: "FirstVoice — AI Receptionist",         href: "/solutions/firstvoice-ai-receptionist",     icon: Phone           },
  { name: "LeadNest — WhatsApp Automation",        href: "/solutions/leadnest-whatsapp-automation",   icon: MessageCircle   },
  { name: "CallOrbit — AI Call Automation",        href: "/solutions/callorbit-smart-call-routing",   icon: PhoneForwarded  },
  { name: "EchoAssist — AI Voice Agent",           href: "/solutions/echoassist-ai-voice-agent",      icon: Mic             },
  { name: "Socialium — Social Media Automation",   href: "/solutions/socialium-social-automation",    icon: Share2          },
]

// ─── Socials ───────────────────────────────────────────────────────────────────
const socials = [
  { icon: Facebook,  label: "Facebook",  href: "https://www.facebook.com/pixoranest2025",               color: "#1877f2" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/pixoranest/",                 color: "#e1306c" },
  { icon: Youtube,   label: "YouTube",   href: "https://youtube.com/@pixora-nest",                      color: "#ff0000" },
  { icon: Linkedin,  label: "LinkedIn",  href: "https://www.linkedin.com/company/pixoranest-official/", color: "#0077b5" },
]

// ─── Main Export ───────────────────────────────────────────────────────────────
export function AboutPageContent() {
  return (
    <>
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      <div className="overflow-x-hidden bg-transparent">

        {/* ══════════════════════════════════════════
            HERO
        ══════════════════════════════════════════ */}
        <section
          className="px-6 pt-28 pb-20 sm:pt-36 sm:pb-28"
          style={{ background: "transparent", position: "relative", overflow: "hidden" }}
        >
          {/* Ambient glow orbs */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 6, repeat: Infinity }}
            style={{ position: "absolute", top: -80, left: -80, width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.12) 0%, transparent 70%)", pointerEvents: "none" }}
          />
          <motion.div
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 8, repeat: Infinity, delay: 2 }}
            style={{ position: "absolute", bottom: -80, right: -60, width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)", pointerEvents: "none" }}
          />

          <div className="max-w-5xl mx-auto text-center" style={{ position: "relative", zIndex: 1 }}>
            <motion.div variants={staggerContainer} initial="hidden" animate="visible">

              {/* Breadcrumb — SEO */}
              <motion.div variants={fadeInUp} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 16, fontSize: 12, color: "#64748b" }}>
                <Link href="/" style={{ color: "#64748b", textDecoration: "none" }}>Home</Link>
                <span>/</span>
                <span style={{ color: BLUE, fontWeight: 600 }}>About Us</span>
              </motion.div>

              {/* Badge */}
              <motion.div variants={fadeInUp} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)", borderRadius: 20, padding: "6px 16px", marginBottom: 24 }}>
                <Award size={13} color={BLUE} />
                <span style={{ fontSize: 12, fontWeight: 600, color: BLUE }}>India's Leading AI Automation Company</span>
              </motion.div>

              {/* H1 — primary keyword placed here */}
              <motion.h1 variants={fadeInUp}
                style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", fontWeight: 900, color: "#0f172a", lineHeight: 1.1, letterSpacing: "-0.03em", marginBottom: 20 }}>
                AI Automation Company India<br />
                <span style={{ color: BLUE }}>Helping Businesses Grow</span><br />
                with Smart Technology
              </motion.h1>

              {/* Opening paragraph — primary keyword in first 100 words */}
              <motion.p variants={fadeInUp}
                style={{ fontSize: 17, color: "#475569", lineHeight: 1.75, maxWidth: 680, margin: "0 auto 32px" }}>
                PixoraNest is a leading <strong>AI automation company in India</strong> that helps businesses streamline operations through intelligent automation. From AI receptionists to WhatsApp lead management — we build tools that work 24/7 so your business never misses a lead or a customer.
              </motion.p>

              {/* CTAs */}
              <motion.div variants={fadeInUp} style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 40 }}>
                <Link href="/contact"
                  style={{ background: BLUE, color: "#fff", padding: "14px 28px", borderRadius: 12, fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", gap: 8, boxShadow: "0 8px 24px rgba(37,99,235,0.3)", textDecoration: "none" }}>
                  Talk to Our Team <ArrowRight size={16} />
                </Link>
                <Link href="/solutions"
                  style={{ background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.2)", color: BLUE, padding: "14px 28px", borderRadius: 12, fontWeight: 600, fontSize: 14, textDecoration: "none" }}>
                  View Solutions
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div variants={fadeInUp} style={{ display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center" }}>
                {["500+ Businesses Served", "10M+ Interactions Automated", "98% Satisfaction Rate", "24/7 AI Support"].map(t => (
                  <div key={t} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.65)", backdropFilter: "blur(8px)", border: "1px solid rgba(37,99,235,0.12)", borderRadius: 20, padding: "6px 14px" }}>
                    <CheckCircle2 size={13} color="#059669" />
                    <span style={{ fontSize: 12, color: "#334155", fontWeight: 500 }}>{t}</span>
                  </div>
                ))}
              </motion.div>

            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            STATS
        ══════════════════════════════════════════ */}
        <section className="px-6 py-14 bg-transparent border-b border-border">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { end: 500, suffix: "+",  label: "Businesses Served",     icon: Users,       color: BLUE      },
              { end: 10,  suffix: "M+", label: "Interactions Automated", icon: Bot,         color: "#059669" },
              { end: 98,  suffix: "%",  label: "Customer Satisfaction",  icon: Award,       color: "#d97706" },
              { end: 50,  suffix: "+",  label: "Industries Covered",     icon: Globe,       color: "#7c3aed" },
            ].map((s, i) => {
              const SI = s.icon
              return (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  style={{ textAlign: "center", background: "rgba(255,255,255,0.65)", backdropFilter: "blur(12px)", border: "1px solid rgba(37,99,235,0.12)", borderRadius: 20, padding: "20px 12px", boxShadow: "0 4px 20px rgba(37,99,235,0.06)" }}>
                  <div style={{ width: 52, height: 52, borderRadius: 14, background: `${s.color}12`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
                    <SI size={22} color={s.color} />
                  </div>
                  <div style={{ fontSize: 36, fontWeight: 900, lineHeight: 1, letterSpacing: "-0.03em", color: "#0f172a" }}>
                    <Counter end={s.end} suffix={s.suffix} />
                  </div>
                  <p style={{ fontSize: 12, fontWeight: 500, marginTop: 6, color: "#64748b" }}>{s.label}</p>
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* ══════════════════════════════════════════
            MISSION & VISION
        ══════════════════════════════════════════ */}
        <section className="px-6 py-20 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: BLUE, display: "block", marginBottom: 10 }}>Who We Are</span>
              {/* H2 — secondary keyword */}
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.02em", color: "#0f172a" }}>
                Our Mission & Vision as an AI Automation Company
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  icon: Target,
                  title: "Our Mission",
                  color: BLUE,
                  accentBg: "rgba(37,99,235,0.08)",
                  body: "To empower businesses of all sizes across India with accessible and intelligent AI automation. We build powerful tools — AI receptionists, WhatsApp management, call automation, and voice agents — that help companies improve productivity, enhance customer engagement, and scale efficiently without increasing headcount.",
                  link: { text: "Explore our AI solutions →", href: "/solutions" },
                },
                {
                  icon: Eye,
                  title: "Our Vision",
                  color: "#7c3aed",
                  accentBg: "rgba(124,58,237,0.08)",
                  body: "To become the leading AI business automation platform in India and globally. We envision a future where businesses operate with intelligent systems that automate communication, improve decision-making, and unlock new growth — where human creativity and AI work hand in hand to build stronger companies.",
                  link: { text: "View our pricing plans →", href: "/pricing" },
                },
              ].map((card, i) => {
                const CardIcon = card.icon
                return (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.5 }}
                    style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(20px)", border: "1px solid rgba(37,99,235,0.12)", borderRadius: 24, padding: "36px", boxShadow: "0 4px 24px rgba(37,99,235,0.06)", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: card.color, borderRadius: "24px 24px 0 0" }} />
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: card.accentBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                      <CardIcon size={24} color={card.color} />
                    </div>
                    <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 14, letterSpacing: "-0.02em", color: "#0f172a" }}>{card.title}</h3>
                    <p style={{ fontSize: 14, lineHeight: 1.75, marginBottom: 20, color: "#475569" }}>{card.body}</p>
                    <Link href={card.link.href} style={{ fontSize: 13, fontWeight: 700, color: card.color, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                      {card.link.text}
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            WHY CHOOSE US
        ══════════════════════════════════════════ */}
        <section className="px-6 py-20 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: BLUE, display: "block", marginBottom: 10 }}>Why PixoraNest</span>
              {/* H2 — secondary keyword variation */}
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 12, color: "#0f172a" }}>
                Why Businesses Choose PixoraNest for AI Automation in India
              </h2>
              <p style={{ fontSize: 15, maxWidth: 560, margin: "0 auto", color: "#64748b" }}>
                We help businesses across India streamline operations and accelerate growth with powerful, industry-tested AI automation solutions.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Advanced AI Technology",
                  color: BLUE,
                  accentBg: "rgba(37,99,235,0.08)",
                  body: "PixoraNest develops intelligent automation platforms powered by modern AI. Our systems automate repetitive tasks, manage conversations, and optimise workflows across all industries in India and beyond.",
                },
                {
                  title: "Scalable Business Platform",
                  color: "#059669",
                  accentBg: "rgba(5,150,105,0.08)",
                  body: "From WhatsApp lead management to AI call handling and social media automation — our tools help Indian businesses scale efficiently while improving customer engagement without adding overhead.",
                },
                {
                  title: "Secure & Reliable Infrastructure",
                  color: "#7c3aed",
                  accentBg: "rgba(124,58,237,0.08)",
                  body: "Security is our top priority. Our infrastructure ensures full data protection, reliable uptime, and scalable deployment for Indian businesses operating at any scale.",
                },
              ].map((card, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(12px)", border: "1px solid rgba(37,99,235,0.12)", borderRadius: 20, padding: "28px", boxShadow: "0 4px 20px rgba(37,99,235,0.06)" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: card.accentBg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    <CheckCircle2 size={20} color={card.color} />
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 800, marginBottom: 10, color: "#0f172a" }}>{card.title}</h3>
                  <p style={{ fontSize: 13, lineHeight: 1.72, color: "#64748b" }}>{card.body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            CORE VALUES
        ══════════════════════════════════════════ */}
        <section className="px-6 py-20 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: BLUE, display: "block", marginBottom: 10 }}>Our Values</span>
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 12, color: "#0f172a" }}>
                Core Values Driving PixoraNest
              </h2>
              <p style={{ fontSize: 15, maxWidth: 500, margin: "0 auto", color: "#64748b" }}>
                These principles guide how we design and deliver every AI automation solution we build for Indian businesses.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => {
                const Icon = v.icon
                return (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(12px)", border: "1px solid rgba(37,99,235,0.12)", borderRadius: 20, padding: "28px 24px", textAlign: "center", boxShadow: "0 4px 20px rgba(37,99,235,0.06)", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: "60%", height: 3, background: v.color, borderRadius: "0 0 4px 4px" }} />
                    <div style={{ width: 52, height: 52, borderRadius: "50%", background: v.bg, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                      <Icon size={22} color={v.color} />
                    </div>
                    <h3 style={{ fontSize: 15, fontWeight: 800, marginBottom: 10, color: "#0f172a" }}>{v.title}</h3>
                    <p style={{ fontSize: 12.5, lineHeight: 1.65, color: "#64748b" }}>{v.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            OUR SOLUTIONS — Internal links
        ══════════════════════════════════════════ */}
        <section className="px-6 py-20 bg-transparent">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-14 items-center">

              {/* Left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: BLUE, display: "block", marginBottom: 12 }}>Our Solutions</span>
                <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 16, color: "#0f172a" }}>
                  Explore Our AI Automation Solutions for Business
                </h2>
                <p style={{ fontSize: 14.5, lineHeight: 1.75, marginBottom: 24, color: "#475569" }}>
                  PixoraNest provides advanced AI automation tools that help businesses across India streamline operations, automate communication, and improve customer engagement — reducing manual work and enabling scalable digital transformation.
                </p>
                <Link href="/solutions"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, background: BLUE, color: "#fff", padding: "12px 24px", borderRadius: 12, fontWeight: 700, fontSize: 13.5, textDecoration: "none", boxShadow: "0 6px 20px rgba(37,99,235,0.28)" }}>
                  View All Solutions <ArrowRight size={15} />
                </Link>
              </motion.div>

              {/* Right — solution link cards */}
              <motion.div
                initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
                style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {solutions.map((sol, i) => {
                  const SIcon = sol.icon
                  return (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                      <Link href={sol.href}
                        style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 14, padding: "14px 18px", background: "rgba(255,255,255,0.65)", backdropFilter: "blur(12px)", border: "1px solid rgba(37,99,235,0.12)", borderRadius: 16, transition: "all 0.2s", boxShadow: "0 2px 12px rgba(37,99,235,0.04)" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,99,235,0.3)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.9)" }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(37,99,235,0.12)"; (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.65)" }}>
                        <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(37,99,235,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                          <SIcon size={17} color={BLUE} />
                        </div>
                        <span style={{ fontSize: 13.5, fontWeight: 600, color: "#0f172a" }}>{sol.name}</span>
                        <ArrowRight size={14} color="#94a3b8" style={{ marginLeft: "auto" }} />
                      </Link>
                    </motion.div>
                  )
                })}
              </motion.div>

            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            OUR STORY
        ══════════════════════════════════════════ */}
        <section className="px-6 py-20 bg-transparent" style={{ position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(37,99,235,0.04) 0%, rgba(124,58,237,0.03) 100%)", pointerEvents: "none" }} />

          <div className="max-w-4xl mx-auto" style={{ position: "relative" }}>
            <div className="text-center mb-12">
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: BLUE, display: "block", marginBottom: 10 }}>Our Story</span>
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" }}>
                The PixoraNest Story
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                "PixoraNest was founded with a mission to simplify business operations for Indian companies through powerful AI automation. Our founders recognised that businesses across India were spending too much time managing repetitive processes — answering calls, chasing leads, replying to WhatsApp messages — that could be automated with modern AI technology.",
                "Today, PixoraNest builds advanced AI automation products including FirstVoice AI Receptionist, LeadNest WhatsApp Automation, CallOrbit AI Call Automation, Socialium Social Media Automation, and EchoAssist AI Voice Agent — all designed to handle real business problems at scale across India and globally.",
                "These intelligent systems help businesses automate communication, manage leads, improve customer support, and scale operations efficiently. Our team continues to innovate, enabling companies worldwide to operate smarter, faster, and more profitably every day.",
              ].map((para, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                  style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(12px)", border: "1px solid rgba(37,99,235,0.12)", borderRadius: 16, padding: "20px 24px", borderLeft: `3px solid ${BLUE}`, boxShadow: "0 4px 20px rgba(37,99,235,0.06)" }}>
                  <p style={{ fontSize: 14, color: "#475569", lineHeight: 1.8, margin: 0 }}>{para}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            TEAM
        ══════════════════════════════════════════ */}
        <section id="team" className="px-6 py-20 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: BLUE, display: "block", marginBottom: 10 }}>Our Team</span>
              <h2 style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 12, color: "#0f172a" }}>
                Meet the Experts Behind PixoraNest
              </h2>
              <p style={{ fontSize: 15, maxWidth: 480, margin: "0 auto", color: "#64748b" }}>
                AI engineers, automation specialists, and product innovators building intelligent AI automation solutions for businesses across India and worldwide.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {teamMembers.map((member, i) => (
                <motion.div key={member.name}
                  initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: (i % 5) * 0.1 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}>
                  <div style={{ background: "rgba(255,255,255,0.65)", backdropFilter: "blur(12px)", border: "1px solid rgba(37,99,235,0.12)", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 24px rgba(37,99,235,0.06)" }}>
                    <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden", background: "rgba(37,99,235,0.04)" }}>
                      <Image
                        src={member.image}
                        alt={`${member.name} — PixoraNest AI Automation Team India`}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width:640px)50vw,(max-width:768px)33vw,20vw"
                      />
                      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top, rgba(255,255,255,0.5), transparent)", pointerEvents: "none" }} />
                    </div>
                    <div style={{ padding: "16px", textAlign: "center" }}>
                      <span style={{ display: "inline-flex", background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)", borderRadius: 20, padding: "3px 10px", fontSize: 9.5, fontWeight: 700, color: BLUE, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                        {member.role}
                      </span>
                      <h3 style={{ fontSize: 14, fontWeight: 700, marginTop: 8, color: "#0f172a" }}>{member.name}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SOCIAL MEDIA
        ══════════════════════════════════════════ */}
        <section className="px-6 py-16 bg-transparent border-t border-border">
          <div className="max-w-4xl mx-auto text-center">
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: BLUE, display: "block", marginBottom: 10 }}>Follow Us</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 8, color: "#0f172a" }}>
              Connect with PixoraNest
            </h2>
            <p style={{ fontSize: 14, maxWidth: 480, margin: "0 auto 32px", color: "#64748b" }}>
              Stay updated with the latest AI automation insights, product launches, and business tips from India's leading automation company.
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
              {socials.map((s, i) => {
                const SIcon = s.icon
                return (
                  <motion.a key={i} href={s.href} target="_blank" rel="noopener noreferrer nofollow"
                    aria-label={`Follow PixoraNest on ${s.label}`}
                    initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -4, scale: 1.05 }}
                    style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 20px", background: "rgba(255,255,255,0.65)", backdropFilter: "blur(12px)", border: "1px solid rgba(37,99,235,0.12)", borderRadius: 16, textDecoration: "none", boxShadow: "0 4px 16px rgba(37,99,235,0.06)", cursor: "pointer" }}>
                    <SIcon size={18} color={s.color} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{s.label}</span>
                  </motion.a>
                )
              })}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            FINAL CTA
        ══════════════════════════════════════════ */}
        <section className="px-6 py-24 bg-transparent" style={{ position: "relative", overflow: "hidden" }}>
          <motion.div
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)", pointerEvents: "none" }}
          />

          <div className="max-w-3xl mx-auto text-center" style={{ position: "relative" }}>
            <motion.div
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6 }}>

              <div style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(20px)", border: "1px solid rgba(37,99,235,0.15)", borderRadius: 28, padding: "52px 40px", boxShadow: "0 8px 40px rgba(37,99,235,0.08)" }}>
                <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(37,99,235,0.08)", border: "1px solid rgba(37,99,235,0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
                  <Rocket size={28} color={BLUE} />
                </div>
                <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 900, color: "#0f172a", letterSpacing: "-0.03em", marginBottom: 16 }}>
                  Start Automating Your Business<br />with PixoraNest
                </h2>
                <p style={{ fontSize: 15.5, color: "#64748b", maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.75 }}>
                  Discover how AI receptionists, WhatsApp lead management, call automation, and voice agents can transform your Indian business — starting today.
                </p>
                <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 24 }}>
                  <Link href="/contact"
                    style={{ background: BLUE, color: "#fff", padding: "15px 32px", borderRadius: 12, fontWeight: 700, fontSize: 15, display: "flex", alignItems: "center", gap: 8, boxShadow: "0 8px 24px rgba(37,99,235,0.3)", textDecoration: "none" }}>
                    Talk to Our AI Experts <ArrowRight size={16} />
                  </Link>
                  <Link href="/solutions"
                    style={{ background: "rgba(37,99,235,0.06)", border: "1px solid rgba(37,99,235,0.2)", color: BLUE, padding: "15px 32px", borderRadius: 12, fontWeight: 600, fontSize: 15, textDecoration: "none" }}>
                    Explore Solutions
                  </Link>
                </div>
                <p style={{ fontSize: 12.5, color: "#94a3b8" }}>
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