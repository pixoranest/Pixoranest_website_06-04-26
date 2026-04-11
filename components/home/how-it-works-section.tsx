"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { SectionWrapper, SectionHeader } from "@/components/section-wrapper"
import { Search, Cpu, Plug, BarChart3, MessageCircle } from "lucide-react"

// ─── Step data inlined for full SEO copy control ─────────────────────────────
const HOW_IT_WORKS_STEPS = [
  {
    number: 1,
    icon: Search,
    title: "Discovery & Automation Audit",
    microCopy: "Free 30-min call · No commitment",
    description:
      "We analyse your business workflows and customer touchpoints to identify the highest-impact AI automation opportunities — tailored for your industry and Indian market.",
    color: {
      bg: "bg-sky-500/10",
      text: "text-sky-500",
      border: "border-sky-500/20",
      glow: "shadow-sky-500/10",
    },
  },
  {
    number: 2,
    icon: Cpu,
    title: "Custom AI Agent Build",
    microCopy: "Delivered in 1–2 weeks",
    description:
      "Our team builds AI agents, WhatsApp automation flows, and voice bots customised to your business — no generic templates, no off-the-shelf software.",
    color: {
      bg: "bg-violet-500/10",
      text: "text-violet-500",
      border: "border-violet-500/20",
      glow: "shadow-violet-500/10",
    },
  },
  {
    number: 3,
    icon: Plug,
    title: "Seamless System Integration",
    microCopy: "Works with your CRM & existing tools",
    description:
      "We connect your AI automation system to WhatsApp, your CRM, website, and third-party tools — zero disruption to your existing business operations.",
    color: {
      bg: "bg-primary/10",
      text: "text-primary",
      border: "border-primary/20",
      glow: "shadow-primary/10",
    },
  },
  {
    number: 4,
    icon: BarChart3,
    title: "Launch, Track & Scale",
    microCopy: "Full managed support after go-live",
    description:
      "Go live within 2–4 weeks. We monitor AI performance, optimise automation workflows, and provide ongoing support so your business grows on autopilot.",
    color: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-500",
      border: "border-emerald-500/20",
      glow: "shadow-emerald-500/10",
    },
  },
]

// ─── Step Card ────────────────────────────────────────────────────────────────

function StepCard({
  step,
  i,
}: {
  step: (typeof HOW_IT_WORKS_STEPS)[number]
  i: number
}) {
  const Icon = step.icon
  const colors = step.color

  return (
    <motion.li
      variants={fadeInUp}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="group relative flex flex-col"
      aria-label={`Step ${step.number}: ${step.title}`}
    >
      {/* Step number + connector line */}
      <div className="mb-4 flex items-center gap-3">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border
            ${colors.border} ${colors.bg} text-xs font-bold ${colors.text}
            transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}
          aria-hidden="true"
        >
          {step.number}
        </div>

        {i < 3 && (
          <div className="relative hidden flex-1 overflow-hidden lg:flex" aria-hidden="true">
            <div className="h-px w-full bg-gradient-to-r from-border to-transparent" />
            <motion.div
              className="absolute left-0 top-0 h-px bg-gradient-to-r from-primary/50 to-transparent"
              initial={{ width: "0%" }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 * i, ease: "easeInOut" }}
            />
          </div>
        )}
      </div>

      {/* Card */}
      <div
        className={`relative flex-1 overflow-hidden rounded-2xl border border-border/60
          bg-card/50 p-6 backdrop-blur-sm transition-all duration-300
          hover:border-primary/30 hover:shadow-xl ${colors.glow} group-hover:shadow-lg`}
      >
        <div
          className={`absolute right-0 top-0 h-20 w-20 rounded-bl-3xl ${colors.bg} opacity-50`}
          aria-hidden="true"
        />

        <div
          className={`relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl
            border ${colors.border} ${colors.bg}
            transition-transform duration-300 group-hover:scale-110`}
          aria-hidden="true"
        >
          <Icon className={`h-5 w-5 ${colors.text}`} />
        </div>

        <div className={`mb-1 text-[10px] font-bold uppercase tracking-[0.15em] ${colors.text}`}>
          Step {step.number}
        </div>

        <h3 className="mb-1 text-base font-semibold text-foreground leading-snug">
          {step.title}
        </h3>

        <p className={`mb-3 text-[11px] font-medium ${colors.text} opacity-80`}>
          {step.microCopy}
        </p>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {step.description}
        </p>
      </div>
    </motion.li>
  )
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export function HowItWorksSection() {
  return (
    <SectionWrapper
      id="how-it-works"
      className="bg-card/30"
      aria-label="How PixoraNest AI automation works — 4-step process for Indian businesses"
    >
      {/* Dot background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
        aria-hidden="true"
      />

      <SectionHeader
        title="How PixoraNest AI Automation Works"
        subtitle="Our proven 4-step process helps Indian businesses implement AI automation solutions, automate customer communication, and scale operations without adding headcount."
      />

      <motion.ol
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        aria-label="4-step AI automation onboarding process"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        {HOW_IT_WORKS_STEPS.map((step, i) => (
          <StepCard key={step.number} step={step} i={i} />
        ))}
      </motion.ol>

      {/* Bottom CTA */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
      >
        {/* Status pill */}
        <div className="flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-5 py-2.5 text-xs text-muted-foreground backdrop-blur-sm">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Average setup time: 2–4 weeks · Fully managed onboarding
        </div>

        {/*
          FIX: Updated WhatsApp number from placeholder (91XXXXXXXXXX)
          to the correct number: 919460686266
          Opens in new tab — works on mobile and desktop.
        */}
        <Link
          href="https://wa.me/919460686266?text=Hi%2C%20I%20want%20to%20know%20more%20about%20AI%20automation%20for%20my%20business"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2.5 text-xs font-semibold text-emerald-600 transition-all hover:bg-emerald-500/20"
          aria-label="Chat with PixoraNest on WhatsApp to learn about AI automation"
        >
          <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
          Chat on WhatsApp
        </Link>
      </motion.div>
    </SectionWrapper>
  )
}