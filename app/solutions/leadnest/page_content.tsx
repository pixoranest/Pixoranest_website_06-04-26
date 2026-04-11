"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Zap, Filter, SendHorizontal, Users, Link2, LayoutTemplate,
  PieChart, Globe, ArrowRight, CheckCircle2, MessageSquare, ChevronRight,
} from "lucide-react"

const WA_LINK = "https://wa.me/919460686266?text=Hi%2C%20I%27m%20interested%20in%20LeadNest%20WhatsApp%20Automation"

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
}
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

const features = [
  { icon: Zap,            title: "Instant Auto-Reply",         desc: "Respond to every WhatsApp inquiry within seconds — day or night — with intelligent, context-aware messages." },
  { icon: Filter,         title: "AI Lead Qualification",      desc: "Asks smart qualifying questions (budget, timeline, intent) and scores each lead automatically." },
  { icon: SendHorizontal, title: "Drip Follow-up Sequences",   desc: "Automated multi-day follow-up campaigns that nurture cold leads until they're ready to buy." },
  { icon: Users,          title: "Multi-Agent Inbox",          desc: "Assign hot leads to the right sales agent automatically. All conversations in a unified inbox." },
  { icon: Link2,          title: "CRM Auto-Sync",              desc: "Every lead, conversation, and tag syncs to Zoho, HubSpot, or Freshsales in real time." },
  { icon: LayoutTemplate, title: "Approved Template Library",  desc: "Pre-built WABA-approved templates for follow-ups, offers, reminders, and abandoned inquiries." },
  { icon: PieChart,       title: "Conversion Analytics",       desc: "Track open rates, reply rates, conversion rates, and revenue per campaign and agent." },
  { icon: Globe,          title: "Broadcast Campaigns",        desc: "Send personalised bulk messages to segmented contact lists for launches or re-engagement." },
]

const steps = [
  { num: "01", title: "Connect WhatsApp Business", desc: "Link your WhatsApp Business API account with a single click. No technical setup required." },
  { num: "02", title: "Build Your Automation Flow", desc: "Use drag-and-drop builder to design qualification flows, follow-up sequences, and routing rules." },
  { num: "03", title: "Sync Your CRM",             desc: "Connect Zoho, HubSpot, or any CRM. All leads and conversations flow in automatically." },
  { num: "04", title: "Launch & Scale",             desc: "Go live and watch your pipeline fill with qualified leads. Scale with one-click broadcasts." },
]

const benefits = [
  { stat: "5 sec", label: "Response Time",       desc: "vs industry average of 2+ hours" },
  { stat: "3x",    label: "Lead Conversion",     desc: "vs manual WhatsApp sales" },
  { stat: "80%",   label: "Time Saved",          desc: "For your team on follow-ups" },
  { stat: "98%",   label: "Message Open Rate",   desc: "WhatsApp outperforms email 5×" },
]

const useCases = [
  { industry: "EdTech & Coaching",    desc: "Auto-qualify demo inquiries and push registrations — 38% of inquiries converted to paid enrolments." },
  { industry: "Real Estate",          desc: "Auto-reply with floor plans, pricing & site-visit booking — recover 60% of cold leads with drip follow-ups." },
  { industry: "Insurance & BFSI",     desc: "Automate policy renewal reminders at 30, 7, and 1 day — improve renewal rates by 28%." },
  { industry: "D2C E-commerce",       desc: "Trigger abandoned-cart messages with personalised discount codes — cart recovery from 6% to 31%." },
]

export function LeadNestPageContent() {
  return (
    <main className="overflow-hidden">

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative px-4 pt-20 pb-24 sm:px-6 lg:px-8 lg:pt-28 lg:pb-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-emerald-500/6 blur-[120px]" />
          <div className="absolute right-[-10%] top-[20%] h-72 w-72 rounded-full bg-primary/6 blur-3xl" />
        </div>

        <motion.div variants={stagger} initial="hidden" animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <MessageSquare className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-xs font-semibold tracking-wide text-emerald-600">LeadNest · WhatsApp Lead Management</span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            Turn WhatsApp Into Your{" "}
            <span className="bg-gradient-to-r from-emerald-500 via-primary to-violet-500 bg-clip-text text-transparent">
              #1 Sales Channel
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            98% of WhatsApp messages are read within 3 minutes. LeadNest captures every lead,
            qualifies automatically, nurtures with personalised follow-ups, and syncs to your CRM — zero manual work.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:scale-[1.03]"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={WA_LINK}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-7 py-3.5 text-sm font-semibold text-emerald-600 transition-all hover:bg-emerald-500/20"
            >
              <MessageSquare className="h-4 w-4" />
              Chat on WhatsApp
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {["Official WhatsApp Business API", "14-day free trial", "CRM sync included"].map((t) => (
              <span key={t} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />{t}
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
              <div className="text-3xl font-bold text-emerald-500 sm:text-4xl">{b.stat}</div>
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
              Powerful WhatsApp Automation{" "}
              <span className="text-primary">Built for Sales Teams</span>
            </h2>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <motion.div key={f.title} variants={fadeUp} whileHover={{ y: -4 }}
                  className="group rounded-2xl border border-border/60 bg-card/50 p-5 backdrop-blur-sm transition-all hover:border-emerald-500/30 hover:shadow-lg"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 transition-colors group-hover:bg-emerald-500/20">
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
              Set Up LeadNest in <span className="text-primary">Under 10 Minutes</span>
            </h2>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <motion.div key={s.num} variants={fadeUp} className="relative flex flex-col">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs font-bold text-emerald-600">
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
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">LeadNest in Action</h2>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2">
            {useCases.map((u) => (
              <motion.div key={u.industry} variants={fadeUp}
                className="flex gap-4 rounded-2xl border border-border/60 bg-card/50 p-5"
              >
                <ChevronRight className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
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
          className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-emerald-500/20 px-8 py-14 text-center"
          style={{ background: "linear-gradient(135deg, hsl(var(--card)) 0%, hsl(142 71% 45% / 0.06) 100%)" }}
        >
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Start Converting More Leads on WhatsApp
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">
            14-day free trial. No credit card required. Our team onboards you personally.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:scale-[1.03]"
            >
              Start Free Trial
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={WA_LINK}
              target="_blank" rel="noopener noreferrer"
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