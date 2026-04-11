"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  GitBranch, FileText, Bell, BarChart, Clock, Headphones,
  Smartphone, Repeat, ArrowRight, CheckCircle2, MessageSquare, ChevronRight,
} from "lucide-react"

const WA_LINK = "https://wa.me/919460686266?text=Hi%2C%20I%27m%20interested%20in%20CallOrbit%20Call%20Automation"

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
}
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

const features = [
  { icon: GitBranch,  title: "AI-Powered Smart Routing",    desc: "Routes calls based on caller intent, history, location, and language — not pre-set menus." },
  { icon: FileText,   title: "Real-Time Transcription",     desc: "Every call transcribed, summarised, and tagged with key topics, sentiment, and action items." },
  { icon: Bell,       title: "Automated Post-Call Follow-up",desc: "Triggers WhatsApp messages or CRM tasks automatically after every call." },
  { icon: BarChart,   title: "Call Analytics & Reporting",  desc: "Visualise call volume, handle time, missed calls, and conversion rates in real time." },
  { icon: Clock,      title: "Business Hours & Overflow",   desc: "Intelligent rules for after-hours routing, overflow to backup agents, and holiday schedules." },
  { icon: Headphones, title: "Call Recording & Monitoring", desc: "Record all calls for compliance. Supervisors can listen live or review recordings with smart search." },
  { icon: Smartphone, title: "Virtual Numbers — Any City",  desc: "Get local virtual numbers for Delhi, Mumbai, Bengaluru, and 100+ cities nationwide." },
  { icon: Repeat,     title: "IVR → AI Migration",         desc: "Migrate your existing IVR to CallOrbit without changing your number or disrupting operations." },
]

const steps = [
  { num: "01", title: "Connect Your Numbers",         desc: "Port your existing number or get new virtual numbers for any city. Takes under 24 hours." },
  { num: "02", title: "Configure AI Routing Rules",    desc: "Set up routing logic by intent, department, location, or time of day using our visual builder." },
  { num: "03", title: "Enable Transcription & Follow-ups", desc: "Turn on auto-transcription and configure post-call WhatsApp messages or CRM updates." },
  { num: "04", title: "Monitor & Improve",             desc: "Track call performance, agent metrics, and conversion trends — optimise with one click." },
]

const benefits = [
  { stat: "60%",  label: "Lower Handling Cost",   desc: "vs traditional call centres and IVR" },
  { stat: "40%",  label: "Faster First Response",  desc: "AI routing connects callers instantly" },
  { stat: "100%", label: "Calls Logged",           desc: "Full audit trail for every interaction" },
  { stat: "2x",   label: "Agent Productivity",     desc: "With transcripts delivered before every call" },
]

const useCases = [
  { industry: "BFSI & FinTech",        desc: "Intent-based routing cut transfer rates 70%, boosting loan application starts by 35%." },
  { industry: "Hospital Chains",        desc: "Route calls to nearest branch and correct department — wait time dropped from 4 min to 28 sec." },
  { industry: "Logistics & Supply",     desc: "Separate driver, vendor, and customer queues — dispute resolution time dropped 50%." },
  { industry: "B2B SaaS Startups",      desc: "AI call summaries coached reps on objections — deal close rate up 28% in 60 days." },
]

export function CallOrbitPageContent() {
  return (
    <main className="overflow-hidden">

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative px-4 pt-20 pb-24 sm:px-6 lg:px-8 lg:pt-28 lg:pb-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-sky-500/6 blur-[120px]" />
          <div className="absolute left-[-10%] top-[30%] h-72 w-72 rounded-full bg-primary/6 blur-3xl" />
        </div>

        <motion.div variants={stagger} initial="hidden" animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500" />
            </span>
            <GitBranch className="h-3.5 w-3.5 text-sky-500" />
            <span className="text-xs font-semibold tracking-wide text-sky-600">CallOrbit · Call Automation & Routing</span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            Replace Your IVR With{" "}
            <span className="bg-gradient-to-r from-sky-500 via-primary to-violet-500 bg-clip-text text-transparent">
              AI That Actually Understands Callers
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            CallOrbit intelligently routes every call based on intent, transcribes conversations,
            triggers follow-ups, and gives your team real-time insights — from a single dashboard.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:scale-[1.03]"
            >
              Book a Free Demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-7 py-3.5 text-sm font-semibold text-emerald-600 transition-all hover:bg-emerald-500/20"
            >
              <MessageSquare className="h-4 w-4" />
              Chat on WhatsApp
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {["99.9% uptime SLA", "TRAI compliant", "No hardware needed"].map((t) => (
              <span key={t} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-sky-500" />{t}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── BENEFITS ──────────────────────────────────────────────────── */}
      <section className="bg-card/40 px-4 py-16 sm:px-6 lg:px-8">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mx-auto grid max-w-5xl grid-cols-2 gap-6 lg:grid-cols-4"
        >
          {benefits.map((b) => (
            <motion.div key={b.label} variants={fadeUp}
              className="rounded-2xl border border-border/60 bg-card p-6 text-center shadow-sm"
            >
              <div className="text-3xl font-bold text-sky-500 sm:text-4xl">{b.stat}</div>
              <div className="mt-1 text-sm font-semibold text-foreground">{b.label}</div>
              <div className="mt-1 text-xs text-muted-foreground">{b.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────── */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mx-auto max-w-6xl"
        >
          <motion.div variants={fadeUp} className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              Intelligent Call Automation{" "}
              <span className="text-primary">That Drives Results</span>
            </h2>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <motion.div key={f.title} variants={fadeUp} whileHover={{ y: -4 }}
                  className="group rounded-2xl border border-border/60 bg-card/50 p-5 backdrop-blur-sm transition-all hover:border-sky-500/30 hover:shadow-lg"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-500 transition-colors group-hover:bg-sky-500/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-1.5 text-sm font-semibold text-foreground">{f.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────── */}
      <section className="bg-card/30 px-4 py-20 sm:px-6 lg:px-8">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mx-auto max-w-5xl"
        >
          <motion.div variants={fadeUp} className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              From Setup to <span className="text-primary">First Call in 24 Hours</span>
            </h2>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <motion.div key={s.num} variants={fadeUp} className="relative flex flex-col">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-sky-500/30 bg-sky-500/10 text-xs font-bold text-sky-600">
                    {s.num}
                  </span>
                  {i < steps.length - 1 && <div className="hidden flex-1 border-t border-dashed border-border lg:block" />}
                </div>
                <h3 className="mb-2 text-sm font-semibold text-foreground">{s.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── USE CASES ─────────────────────────────────────────────────── */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
          className="mx-auto max-w-5xl"
        >
          <motion.div variants={fadeUp} className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">CallOrbit Across Indian Industries</h2>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2">
            {useCases.map((u) => (
              <motion.div key={u.industry} variants={fadeUp}
                className="flex gap-4 rounded-2xl border border-border/60 bg-card/50 p-5"
              >
                <ChevronRight className="mt-0.5 h-5 w-5 shrink-0 text-sky-500" />
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-foreground">{u.industry}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{u.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────────────────── */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-sky-500/20 px-8 py-14 text-center"
          style={{ background: "linear-gradient(135deg, hsl(var(--card)) 0%, hsl(199 89% 48% / 0.06) 100%)" }}
        >
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Ready to Upgrade from IVR to AI?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">
            Plans start at ₹3,999/month. Zero hardware. 99.9% uptime SLA. Live in 24 hours.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:scale-[1.03]"
            >
              Book a Free Demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href={WA_LINK} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-7 py-3.5 text-sm font-semibold text-emerald-600 transition-all hover:bg-emerald-500/20"
            >
              <MessageSquare className="h-4 w-4" />
              Chat on WhatsApp
            </Link>
          </div>
        </motion.div>
      </section>

    </main>
  )
}