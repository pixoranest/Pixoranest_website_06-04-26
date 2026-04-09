"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { SectionWrapper, SectionHeader } from "@/components/section-wrapper"
import { steps } from "@/lib/data"
import { Search, Repeat, Rocket, BarChart3 } from "lucide-react"

const icons = [Search, Repeat, Rocket, BarChart3]

const stepColors = [
  { bg: "bg-sky-500/10", text: "text-sky-400", border: "border-sky-500/20", glow: "shadow-sky-500/20" },
  { bg: "bg-violet-500/10", text: "text-violet-400", border: "border-violet-500/20", glow: "shadow-violet-500/20" },
  { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20", glow: "shadow-primary/20" },
  { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20", glow: "shadow-emerald-500/20" },
]

function StepCard({ step, i }: { step: { number: number; title: string; description: string }; i: number }) {
  const Icon = icons[i]
  const colors = stepColors[i]

  return (
    <motion.div
      variants={fadeInUp}
      className="group relative flex flex-col"
    >
      {/* Step number floating badge */}
      <div className="mb-4 flex items-center gap-3">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-full border ${colors.border} ${colors.bg} text-xs font-bold ${colors.text}`}
        >
          {step.number}
        </div>
        {i < 3 && (
          <div className="relative flex-1 overflow-hidden">
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
        className={`relative flex-1 overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl ${colors.glow} group-hover:shadow-lg`}
      >
        {/* Corner accent */}
        <div className={`absolute right-0 top-0 h-20 w-20 rounded-bl-3xl ${colors.bg} opacity-50`} />

        <div
          className={`relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl border ${colors.border} ${colors.bg} transition-transform duration-300 group-hover:scale-110`}
        >
          <Icon className={`h-5 w-5 ${colors.text}`} />
        </div>

        <div className={`mb-1 text-[10px] font-bold uppercase tracking-[0.15em] ${colors.text}`}>
          Step {step.number}
        </div>

        <h3 className="mb-3 text-base font-semibold text-foreground leading-snug">
          {step.title}
        </h3>

        <p className="text-sm leading-relaxed text-muted-foreground">
          {step.description}
        </p>
      </div>
    </motion.div>
  )
}

export function HowItWorksSection() {
  return (
    <SectionWrapper id="how-it-works" className="bg-card/30">
      {/* Subtle dot background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <SectionHeader
        title="How PixoraNest AI Automation Works"
        subtitle="Our proven four-step process helps businesses implement AI automation solutions, streamline workflows, and automate customer communication efficiently."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {steps.map((step, i) => (
          <StepCard key={step.number} step={step} i={i} />
        ))}
      </motion.div>

      {/* Bottom CTA hint */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-12 flex justify-center"
      >
        <div className="flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-5 py-2.5 text-xs text-muted-foreground backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Average setup time: 2–4 weeks · Fully managed onboarding
        </div>
      </motion.div>
    </SectionWrapper>
  )
}