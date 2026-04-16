"use client"

import Link from "next/link"
import { Search, Cpu, Plug, BarChart3, MessageCircle } from "lucide-react"

// ─── Types ────────────────────────────────────────────────────────────────────

interface StepColor {
  bg: string
  text: string
  border: string
  glow: string
  connector: string
}

interface Step {
  number: number
  icon: React.ElementType
  title: string
  microCopy: string
  description: string
  color: StepColor
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const HOW_IT_WORKS_STEPS: Step[] = [
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
      border: "border-sky-500/25",
      glow: "shadow-sky-500/20",
      connector: "border-sky-500/20",
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
      border: "border-violet-500/25",
      glow: "shadow-violet-500/20",
      connector: "border-violet-500/20",
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
      bg: "bg-blue-500/10",
      text: "text-blue-500",
      border: "border-blue-500/25",
      glow: "shadow-blue-500/20",
      connector: "border-blue-500/20",
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
      border: "border-emerald-500/25",
      glow: "shadow-emerald-500/20",
      connector: "border-emerald-500/20",
    },
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="relative w-full overflow-hidden bg-[#f0f4fa] py-20 md:py-28"
      aria-label="How PixoraNest AI automation works — 4-step process for Indian businesses"
    >
      {/* Subtle dot-grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #64748b 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ── Header ── */}
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-[2.6rem] leading-tight">
            How PixoraNest AI Automation Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-500 sm:text-[1.05rem]">
            Our proven 4-step process helps Indian businesses implement AI
            automation solutions, automate customer communication, and scale
            operations without adding headcount.
          </p>
        </div>

        {/* ── Steps grid ── */}
        <ol
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          style={{ listStyle: "none", padding: 0, margin: 0 }}
          aria-label="4-step AI automation onboarding process"
        >
          {HOW_IT_WORKS_STEPS.map((step, i) => {
            const Icon = step.icon
            const c = step.color
            return (
              <li
                key={step.number}
                className="group flex flex-col"
                aria-label={`Step ${step.number}: ${step.title}`}
              >
                {/* Step number bubble + dashed connector */}
                <div className="mb-5 flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 ${c.border} ${c.bg} text-sm font-bold ${c.text} transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg ${c.glow}`}
                    aria-hidden="true"
                  >
                    {step.number}
                  </div>
                  {i < 3 && (
                    <div
                      className={`hidden flex-1 border-t-2 border-dashed ${c.connector} lg:block`}
                      aria-hidden="true"
                    />
                  )}
                </div>

                {/* Card */}
                <div
                  className={`
                    relative flex flex-1 flex-col overflow-hidden rounded-2xl
                    border border-gray-200/80 bg-white/90 p-6
                    shadow-sm backdrop-blur-sm
                    transition-all duration-300
                    hover:-translate-y-1 hover:shadow-lg hover:border-gray-300/60
                  `}
                >
                  {/* Corner accent */}
                  <div
                    className={`absolute right-0 top-0 h-16 w-16 rounded-bl-3xl ${c.bg} opacity-70`}
                    aria-hidden="true"
                  />

                  {/* Icon */}
                  <div
                    className={`relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl border ${c.border} ${c.bg} transition-all duration-300 group-hover:scale-105 group-hover:shadow-md ${c.glow}`}
                    aria-hidden="true"
                  >
                    <Icon className={`h-5 w-5 ${c.text}`} />
                  </div>

                  {/* Step label */}
                  <p
                    className={`mb-1.5 text-[9px] font-bold uppercase tracking-[0.2em] ${c.text} opacity-80`}
                  >
                    Step {step.number}
                  </p>

                  {/* Title */}
                  <h3 className="mb-1.5 text-[0.92rem] font-semibold leading-snug text-gray-900">
                    {step.title}
                  </h3>

                  {/* Micro copy */}
                  <p className={`mb-4 text-[11px] font-semibold ${c.text} opacity-80`}>
                    {step.microCopy}
                  </p>

                  {/* Description */}
                  <p className="text-[0.83rem] leading-relaxed text-gray-500">
                    {step.description}
                  </p>
                </div>
              </li>
            )
          })}
        </ol>

        {/* ── Bottom CTA ── */}
        <div className="mt-14 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {/* Status pill */}
          <div className="flex items-center gap-2.5 rounded-full border border-gray-200 bg-white/80 px-5 py-2.5 text-xs font-medium text-gray-500 shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Average setup time: 2–4 weeks · Fully managed onboarding
          </div>

          {/* WhatsApp CTA */}
          <Link
            href="https://wa.me/919460686266?text=Hi%2C%20I%20want%20to%20know%20more%20about%20AI%20automation%20for%20my%20business"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2.5 text-xs font-semibold text-emerald-600 transition-all duration-300 hover:bg-emerald-500/20 hover:shadow-md"
            aria-label="Chat with PixoraNest on WhatsApp to learn about AI automation"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
            Chat on WhatsApp
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── Default export (for flexibility) ────────────────────────────────────────
export default HowItWorksSection