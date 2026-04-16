"use client"

import Link from "next/link"
import { Reveal } from "@/components/reveal"
import {
  Mic, Brain, Phone, Headphones, CalendarCheck, ClipboardList,
  Globe, Database, ArrowRight, CheckCircle2, MessageSquare, ChevronRight,
} from "lucide-react"

const WA_LINK = "https://wa.me/919460686266?text=Hi%2C%20I%27m%20interested%20in%20EchoAssist%20AI%20Voice%20Agent"

const features = [
  { icon: Mic,           title: "Human-Like Voice Synthesis",  desc: "Neural TTS generates natural, expressive voices indistinguishable from a human agent." },
  { icon: Brain,         title: "Contextual Intelligence",      desc: "Remembers context mid-call, handles interruptions, and adapts responses dynamically." },
  { icon: Phone,         title: "Outbound Sales Calling",       desc: "Run outbound campaigns at scale — pitch, handle objections, and book demos automatically." },
  { icon: Headphones,    title: "Inbound Customer Support",     desc: "Handle FAQs, order status, complaint logging, and escalation without human involvement." },
  { icon: CalendarCheck, title: "Appointment Reminders",        desc: "Automatically call leads to confirm appointments — reduce no-shows by up to 60%." },
  { icon: ClipboardList, title: "Automated Survey Calls",       desc: "Conduct NPS surveys and feedback calls at scale with structured data capture." },
  { icon: Globe,         title: "English & Hindi Multilingual", desc: "EchoAssist switches between English and Hindi fluently within the same call." },
  { icon: Database,      title: "Structured Data Capture",      desc: "Every call outcome, response, and intent pushed to your CRM or dashboard automatically." },
]

const steps = [
  { num: "01", title: "Define Your Call Flow",    desc: "Share your use case, call script, and objection handlers. We design the AI conversation flow." },
  { num: "02", title: "Train the Voice Agent",    desc: "EchoAssist is trained on your product, FAQs, and brand voice. We run test calls together." },
  { num: "03", title: "Upload Your Call List",    desc: "Upload your contact list or connect your CRM. Define campaign rules and timing." },
  { num: "04", title: "Launch & Monitor Live",    desc: "EchoAssist dials at scale. Monitor live outcomes and refine scripts in real time." },
]

const benefits = [
  { stat: "10K",  label: "Calls Per Day",     desc: "Scale instantly — no hiring, no ramp-up" },
  { stat: "85%",  label: "Cost Reduction",    desc: "vs equivalent human calling team" },
  { stat: "60%",  label: "Fewer No-Shows",    desc: "With automated appointment reminder calls" },
  { stat: "95%+", label: "Script Compliance", desc: "Every agent follows the script, every time" },
]

const useCases = [
  { industry: "Diagnostics & Healthcare",    desc: "2,000 daily reminder calls — no-show rate dropped from 34% to 8% in 6 weeks." },
  { industry: "Insurance & Renewals",        desc: "18,000 customers called in 3 days — renewal conversion improved from 19% to 31%." },
  { industry: "D2C Post-Purchase Feedback",  desc: "23% of called customers made a repeat purchase based on AI-recommended bundles." },
  { industry: "EdTech Webinar Registration", desc: "Cost per confirmed registration dropped from ₹180 to ₹22 vs manual outreach." },
]

export function EchoAssistPageContent() {
  return (
    <main className="overflow-hidden">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative px-4 pt-20 pb-24 sm:px-6 lg:px-8 lg:pt-28 lg:pb-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-amber-500/6 blur-[120px]" />
          <div className="absolute left-[-10%] top-[30%] h-72 w-72 rounded-full bg-primary/6 blur-3xl" />
        </div>

        <div className="stagger-container mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
            </span>
            <Mic className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-xs font-semibold tracking-wide text-amber-600">EchoAssist · AI Voice Agent</span>
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            10,000 Human-Like Calls a Day —{" "}
            <span className="bg-gradient-to-r from-amber-500 via-primary to-violet-500 bg-clip-text text-transparent">
              Zero Human Agents
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            EchoAssist makes and receives phone calls with the intelligence of your best rep and the availability
            of a machine — handling sales, support, reminders, and surveys in English & Hindi.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
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
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            {["Neural voice synthesis", "TRAI DND compliant", "Live in 48 hours"].map((t) => (
              <span key={t} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-500" />{t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ──────────────────────────────────────────────── */}
      <section className="bg-card/40 px-4 py-16 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-5xl">
          <div className="stagger-container grid grid-cols-2 gap-6 lg:grid-cols-4">
            {benefits.map((b) => (
              <div key={b.label} className="rounded-2xl border border-border/60 bg-card p-6 text-center shadow-sm">
                <div className="text-3xl font-bold text-amber-500 sm:text-4xl">{b.stat}</div>
                <div className="mt-1 text-sm font-semibold text-foreground">{b.label}</div>
                <div className="mt-1 text-xs text-muted-foreground">{b.desc}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────── */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              Powerful AI Voice Capabilities{" "}
              <span className="text-primary">Built for Scale</span>
            </h2>
          </Reveal>
          <div className="stagger-container grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title}
                  className="group rounded-2xl border border-border/60 bg-card/50 p-5 backdrop-blur-sm transition-all hover:border-amber-500/30 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 transition-colors group-hover:bg-amber-500/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mb-1.5 text-sm font-semibold text-foreground">{f.title}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────── */}
      <section className="bg-card/30 px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
              Script to First Call in <span className="text-primary">48 Hours</span>
            </h2>
          </Reveal>
          <div className="stagger-container grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.num} className="relative flex flex-col">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-bold text-amber-600">
                    {s.num}
                  </span>
                  {i < steps.length - 1 && <div className="hidden flex-1 border-t border-dashed border-border lg:block" />}
                </div>
                <h3 className="mb-2 text-sm font-semibold text-foreground">{s.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── USE CASES ─────────────────────────────────────────────── */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Reveal className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">EchoAssist in Action Across India</h2>
          </Reveal>
          <div className="stagger-container grid gap-4 sm:grid-cols-2">
            {useCases.map((u) => (
              <div key={u.industry} className="flex gap-4 rounded-2xl border border-border/60 bg-card/50 p-5">
                <ChevronRight className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />
                <div>
                  <h3 className="mb-1 text-sm font-semibold text-foreground">{u.industry}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{u.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ────────────────────────────────────────────── */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <Reveal
          className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-amber-500/20 px-8 py-14 text-center"
          style={{ background: "linear-gradient(135deg, hsl(var(--card)) 0%, hsl(45 93% 47% / 0.06) 100%)" }}
        >
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Scale Your Calling — Without Scaling Your Team
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">
            Plans from ₹7,999/month with 5,000 minutes included. Live in 48 hours.
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
        </Reveal>
      </section>

    </main>
  )
}