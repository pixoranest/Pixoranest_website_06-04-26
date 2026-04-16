"use client"

import Link from "next/link"
import { Reveal } from "@/components/reveal"
import {
  Phone, Bot, Calendar, Filter, GitBranch, BarChart2,
  MessageSquare, Shield, ArrowRight, CheckCircle2, ChevronRight,
} from "lucide-react"

const WA_LINK = "https://wa.me/919460686266?text=Hi%2C%20I%27m%20interested%20in%20FirstVoice%20AI%20Receptionist"

const features = [
  { icon: Phone,         title: "24/7 Instant Answering",   desc: "Picks up every call within 2 rings — zero hold times, zero missed calls at any hour." },
  { icon: Bot,           title: "Natural AI Conversations", desc: "Human-like English & Hindi conversations powered by advanced NLP." },
  { icon: Calendar,      title: "Auto Appointment Booking", desc: "Syncs with Google Calendar & Calendly to book meetings on the spot." },
  { icon: Filter,        title: "Smart Lead Qualification", desc: "Asks the right questions and scores leads before passing to your sales team." },
  { icon: GitBranch,     title: "Intelligent Call Routing", desc: "Routes priority calls to the right department based on intent and context." },
  { icon: BarChart2,     title: "Call Analytics Dashboard", desc: "Real-time reports on call volume, lead quality, and conversion rates." },
  { icon: MessageSquare, title: "WhatsApp Follow-up",       desc: "Automatically sends a WhatsApp message with next steps after every call." },
  { icon: Shield,        title: "Data Privacy Compliant",   desc: "All call data encrypted and stored per Indian data protection standards." },
]

const steps = [
  { num: "01", title: "Connect Your Number",      desc: "Forward your existing business number or get a new virtual number. Setup in under 2 minutes." },
  { num: "02", title: "Train With Your Business", desc: "Feed FirstVoice your FAQs, products, and call scripts. It learns your business instantly." },
  { num: "03", title: "Go Live Instantly",        desc: "FirstVoice starts answering calls — greetings, qualification, bookings, and routing automated." },
  { num: "04", title: "Monitor & Optimise",       desc: "Track every conversation and lead from your real-time dashboard." },
]

const benefits = [
  { stat: "100%",  label: "Calls Answered",      desc: "Never lose a lead to a missed call" },
  { stat: "68%",   label: "Cost Reduction",       desc: "vs hiring a full-time receptionist" },
  { stat: "3.4x",  label: "More Qualified Leads", desc: "Routed to your sales team daily" },
  { stat: "<2min", label: "Setup Time",           desc: "Connect your number and go live" },
]

const useCases = [
  { industry: "Healthcare Clinics",   desc: "Auto-book appointments, reduce no-shows 30%, capture 100% of patient calls." },
  { industry: "Real Estate Agencies", desc: "Qualify buyer intent after hours and send pre-sorted lead briefs to agents every morning." },
  { industry: "Legal Firms",          desc: "Filter intake calls by case type and urgency while partners are in court." },
  { industry: "E-commerce & D2C",     desc: "Automate order status, returns, and product queries — free your team for escalations." },
]

export function FirstVoicePageContent() {
  return (
    <main className="overflow-hidden">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative px-4 pt-20 pb-24 sm:px-6 lg:px-8 lg:pt-28 lg:pb-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/8 blur-[120px]" />
          <div className="absolute right-[-10%] top-[20%] h-72 w-72 rounded-full bg-violet-500/6 blur-3xl" />
        </div>

        <div className="stagger-container mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <Phone className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold tracking-wide text-primary">FirstVoice · AI Receptionist</span>
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            Answer Every Call,{" "}
            <span className="bg-gradient-to-r from-primary via-violet-400 to-primary bg-clip-text text-transparent">
              24/7 — Without a Receptionist
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Stop losing customers to missed calls. FirstVoice answers instantly, qualifies leads, books appointments,
            and routes calls — in English & Hindi — so your team only handles what matters.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.03]"
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
            {["Trusted by 500+ Indian businesses", "English & Hindi", "Setup in 2 minutes"].map((t) => (
              <span key={t} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />{t}
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
                <div className="text-3xl font-bold text-primary sm:text-4xl">{b.stat}</div>
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
              Everything a Human Receptionist Does —{" "}
              <span className="text-primary">and More</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
              FirstVoice handles every aspect of inbound call management automatically.
            </p>
          </Reveal>
          <div className="stagger-container grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <div key={f.title}
                  className="group rounded-2xl border border-border/60 bg-card/50 p-5 backdrop-blur-sm transition-all hover:border-primary/30 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
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
              Live in <span className="text-primary">4 Simple Steps</span>
            </h2>
          </Reveal>
          <div className="stagger-container grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.num} className="relative flex flex-col">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-xs font-bold text-primary">
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
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Who Uses FirstVoice?</h2>
          </Reveal>
          <div className="stagger-container grid gap-4 sm:grid-cols-2">
            {useCases.map((u) => (
              <div key={u.industry} className="flex gap-4 rounded-2xl border border-border/60 bg-card/50 p-5">
                <ChevronRight className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
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
          className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-primary/20 px-8 py-14 text-center"
          style={{ background: "linear-gradient(135deg, hsl(var(--primary)/0.1) 0%, hsl(var(--card)) 60%, hsl(var(--primary)/0.06) 100%)" }}
        >
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
            Ready to Never Miss a Call Again?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground sm:text-base">
            Join 500+ Indian businesses using FirstVoice to convert every inbound call into a qualified lead.
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