"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Database, Filter, Bell, BarChart2, Zap, Users,
  GitBranch, PieChart, ArrowRight, CheckCircle2,
  MessageSquare, ChevronRight,
} from "lucide-react"

const WA_LINK =
  "https://wa.me/919460686266?text=Hi%2C%20I%27m%20interested%20in%20CRM%20Automation%20by%20PixoraNest"

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
}
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

const features = [
  {
    icon: Zap,
    title: "Auto Lead Capture",
    desc: "Capture leads from calls, WhatsApp, forms, and social — pushed to your CRM the moment they arrive.",
  },
  {
    icon: Filter,
    title: "AI Lead Scoring",
    desc: "Automatically score and prioritise leads by intent, source, and behaviour so your team focuses on the best prospects.",
  },
  {
    icon: GitBranch,
    title: "Smart Workflow Automation",
    desc: "Build drag-and-drop workflows that trigger emails, tasks, and notifications based on lead actions and pipeline stage.",
  },
  {
    icon: Users,
    title: "Auto Lead Assignment",
    desc: "Route leads to the right sales rep by territory, language, product, or round-robin — instantly and automatically.",
  },
  {
    icon: Bell,
    title: "Follow-up Reminders",
    desc: "Never miss a follow-up. Automated reminders via WhatsApp, email, or push notification at exactly the right time.",
  },
  {
    icon: Database,
    title: "Pipeline Management",
    desc: "Visualise your entire sales pipeline with drag-and-drop stages, deal values, and conversion probabilities.",
  },
  {
    icon: BarChart2,
    title: "Revenue Analytics",
    desc: "Track conversion rates, revenue by source, rep performance, and deal velocity — all in one real-time dashboard.",
  },
  {
    icon: PieChart,
    title: "Multi-Source Integration",
    desc: "Connect Zoho, HubSpot, Freshsales, or any CRM. All lead sources flow into one unified view automatically.",
  },
]

const steps = [
  {
    num: "01",
    title: "Connect Your Lead Sources",
    desc: "Link calls, WhatsApp, web forms, and social channels. All leads flow into your CRM in real time.",
  },
  {
    num: "02",
    title: "Configure Automation Workflows",
    desc: "Use our visual builder to set up scoring rules, assignment logic, and follow-up sequences in minutes.",
  },
  {
    num: "03",
    title: "Sync Your Existing CRM",
    desc: "Connect Zoho, HubSpot, Freshsales, or Salesforce. All data syncs bi-directionally with zero manual entry.",
  },
  {
    num: "04",
    title: "Track, Optimise & Scale",
    desc: "Monitor pipeline health, rep performance, and conversion trends from your live analytics dashboard.",
  },
]

const benefits = [
  { stat: "3x",   label: "More Conversions",   desc: "With automated follow-ups and lead scoring" },
  { stat: "80%",  label: "Less Manual Entry",   desc: "All lead data captured and synced automatically" },
  { stat: "5 hrs", label: "Saved Per Week",     desc: "Per sales rep on admin and data entry tasks" },
  { stat: "100%", label: "Leads Tracked",       desc: "Full pipeline visibility from capture to close" },
]

const useCases = [
  {
    industry: "Real Estate",
    desc: "Auto-assign property inquiries by location and budget — agents only call pre-qualified leads, cutting site-visit costs by 40%.",
  },
  {
    industry: "EdTech & Coaching",
    desc: "Score admissions leads by exam year and intent — counsellors convert 3x more enrolments with half the manual effort.",
  },
  {
    industry: "Insurance & BFSI",
    desc: "Automate policy renewal workflows and follow-up sequences — renewal rates improved 28% without adding headcount.",
  },
  {
    industry: "B2B SaaS & IT Services",
    desc: "Route enterprise leads to senior reps instantly with full context — deal cycle shortened by 35% on average.",
  },
]

const whyPoints = [
  "Works with any CRM — Zoho, HubSpot, Freshsales, Salesforce, and custom APIs",
  "No-code workflow builder — zero developers or IT team required",
  "GDPR and Indian data protection compliant with encrypted storage",
  "Connects with PixoraNest LeadNest, FirstVoice, and CallOrbit natively",
  "Flat monthly pricing — no per-lead or per-action charges",
  "Dedicated onboarding manager for every account",
]

export function CRMAutomationPageContent() {
  return (
    <main className="overflow-hidden">

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="relative px-4 pt-20 pb-24 sm:px-6 lg:px-8 lg:pt-28 lg:pb-32">
        {/* background blobs */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-orange-500/6 blur-[120px]" />
          <div className="absolute left-[-10%] top-[30%] h-72 w-72 rounded-full bg-primary/6 blur-3xl" />
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          {/* badge */}
          <motion.div
            variants={fadeUp}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
            </span>
            <Database className="h-3.5 w-3.5 text-orange-500" />
            <span className="text-xs font-semibold tracking-wide text-orange-600">
              CRM Automation · Sales Pipeline Intelligence
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance"
          >
            Automate Your Entire{" "}
            <span className="bg-gradient-to-r from-orange-500 via-primary to-violet-500 bg-clip-text text-transparent">
              Sales Pipeline
            </span>{" "}
            With AI
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            Automate your entire sales pipeline with smart CRM workflows, lead tracking,
            and performance analytics. Capture every lead, score them instantly, and
            close deals faster — without any manual data entry.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:scale-[1.03]"
            >
              Book a Free Demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-7 py-3.5 text-sm font-semibold text-emerald-600 transition-all hover:bg-emerald-500/20"
            >
              <MessageSquare className="h-4 w-4" />
              Chat on WhatsApp
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            {["No manual data entry", "Works with any CRM", "GDPR compliant"].map((t) => (
              <span key={t} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-orange-500" />
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── BENEFITS ───────────────────────────────────────────────── */}
      <section className="bg-card/40 px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto grid max-w-5xl grid-cols-2 gap-6 lg:grid-cols-4"
        >
          {benefits.map((b) => (
            <motion.div
              key={b.label}
              variants={fadeUp}
              className="rounded-2xl border border-border/60 bg-card p-6 text-center shadow-sm"
            >
              <div className="text-3xl font-bold text-orange-500 sm:text-4xl">{b.stat}</div>
              <div className="mt-1 text-sm font-semibold text-foreground">{b.label}</div>
              <div className="mt-1 text-xs text-muted-foreground">{b.desc}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── FEATURES ───────────────────────────────────────────────── */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-6xl"
        >
          <motion.div variants={fadeUp} className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-2">
              Features
            </p>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              Complete CRM Automation{" "}
              <span className="text-primary">Built for Sales Teams</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
              Everything you need to manage leads, automate workflows, and track
              conversions — in one connected platform.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <motion.div
                  key={f.title}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className="group rounded-2xl border border-border/60 bg-card/50 p-5 backdrop-blur-sm transition-all hover:border-orange-500/30 hover:shadow-lg"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500 transition-colors group-hover:bg-orange-500/20">
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

      {/* ── HOW IT WORKS ───────────────────────────────────────────── */}
      <section className="bg-card/30 px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-5xl"
        >
          <motion.div variants={fadeUp} className="mb-12 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange-500 mb-2">
              Process
            </p>
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              Live in{" "}
              <span className="text-primary">Under 30 Minutes</span>
            </h2>
          </motion.div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <motion.div key={s.num} variants={fadeUp} className="relative flex flex-col">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10 text-xs font-bold text-orange-600">
                    {s.num}
                  </span>
                  {i < steps.length - 1 && (
                    <div className="hidden flex-1 border-t border-dashed border-border lg:block" />
                  )}
                </div>
                <h3 className="mb-2 text-sm font-semibold text-foreground">{s.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── USE CASES ──────────────────────────────────────────────── */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-5xl"
        >
          <motion.div variants={fadeUp} className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              CRM Automation Across Indian Industries
            </h2>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2">
            {useCases.map((u) => (
              <motion.div
                key={u.industry}
                variants={fadeUp}
                className="flex gap-4 rounded-2xl border border-border/60 bg-card/50 p-5"
              >
                <ChevronRight className="mt-0.5 h-5 w-5 shrink-0 text-orange-500" />
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-foreground">{u.industry}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{u.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── WHY PIXORANEST ─────────────────────────────────────────── */}
      <section className="bg-card/30 px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mx-auto max-w-5xl"
        >
          <motion.div variants={fadeUp} className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              Why 500+ Indian Businesses Choose{" "}
              <span className="text-primary">PixoraNest CRM Automation</span>
            </h2>
          </motion.div>

          <div className="grid gap-3 sm:grid-cols-2">
            {whyPoints.map((point) => (
              <motion.div
                key={point}
                variants={fadeUp}
                className="flex items-start gap-3 rounded-xl border border-border/60 bg-card/50 px-5 py-4"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange-500" />
                <p className="text-sm text-muted-foreground">{point}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── INTERNAL LINKS ─────────────────────────────────────────── */}
      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto max-w-5xl"
        >
          <p className="mb-6 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Explore the Full PixoraNest Suite
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              { label: "AI Receptionist",     href: "/solutions/firstvoice"  },
              { label: "WhatsApp Automation", href: "/solutions/leadnest"    },
              { label: "Call Automation",     href: "/solutions/callorbit"   },
              { label: "AI Voice Agent",      href: "/solutions/echoassist"  },
              { label: "Social Automation",   href: "/solutions/socialium"   },
              { label: "View All Solutions",  href: "/solutions"             },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="rounded-full border border-border/60 bg-card px-4 py-2 text-xs font-medium text-muted-foreground transition-all hover:border-orange-500/40 hover:text-orange-600"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── BOTTOM CTA ─────────────────────────────────────────────── */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-orange-500/20 px-8 py-14 text-center"
          style={{
            background:
              "linear-gradient(135deg, hsl(var(--card)) 0%, hsl(24 95% 53% / 0.06) 100%)",
          }}
        >
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Ready to Automate Your Sales Pipeline?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">
            Plans start at ₹4,999/month. No setup fees. No long-term contracts.
            Live in under 30 minutes.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:scale-[1.03]"
            >
              Book a Free Demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-7 py-3.5 text-sm font-semibold text-emerald-600 transition-all hover:bg-emerald-500/20"
            >
              <MessageSquare className="h-4 w-4" />
              Chat on WhatsApp
            </Link>
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            No setup fees · No long-term contracts · Indian support team
          </p>
        </motion.div>
      </section>

    </main>
  )
}