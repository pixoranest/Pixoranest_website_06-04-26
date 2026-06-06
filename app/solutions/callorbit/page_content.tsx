"use client";

/**
 * CallOrbit — Premium Redesign
 * Drop-in replacement for app/solutions/callorbit/page_content.tsx
 *
 * Requirements in your Next.js repo:
 *  - next/link, lucide-react
 *  - @/components/reveal exporting <Reveal>
 *  - Tailwind CSS
 *
 * Wire `handleOpenDemo` to your shared PixoraNest demo modal.
 */

import Link from "next/link";
import { useEffect, useState } from "react";
import { Reveal } from "@/components/reveal";
import {
  ArrowRight,
  PlayCircle,
  Phone,
  PhoneIncoming,
  PhoneCall,
  PhoneMissed,
  Bot,
  Sparkles,
  CheckCircle2,
  Clock,
  Users,
  TrendingDown,
  UserX,
  Moon,
  MessageSquare,
  Headphones,
  Calendar,
  Target,
  Database,
  Mic,
  BarChart3,
  Globe2,
  ShieldCheck,
  Zap,
  HeartPulse,
  Building2,
  GraduationCap,
  Car,
  Wrench,
  Briefcase,
  Star,
  ChevronRight,
  ArrowUpRight,
  Volume2,
  Network,
  Workflow,
  Quote,
} from "lucide-react";

/* ─────────────── BRAND TOKENS ─────────────── */
const C = {
  primary: "#2559FB",
  primaryDark: "#233B7A",
  secondary: "#3154FB",
  bgLight: "#E4F0FF",
  bgDark: "#0B1437",
  bgDarker: "#070D24",
  text: "#374151",
  muted: "#6B7280",
  border: "#E5E7EB",
  gradient: "linear-gradient(135deg, #2559FB 0%, #3154FB 50%, #233B7A 100%)",
  gradientText: "linear-gradient(135deg, #2559FB 0%, #7AA0FF 100%)",
  heroGlow:
    "radial-gradient(ellipse 80% 60% at 70% 30%, rgba(37,89,251,0.45) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 20% 80%, rgba(49,84,251,0.35) 0%, transparent 55%)",
};

const WA_LINK =
  "https://wa.me/919460686266?text=Hi%2C%20I%27m%20interested%20in%20CallOrbit%20by%20PixoraNest";

/* ─────────────── DATA ─────────────── */

const TRUST_BADGES = [
  "AI Voice Agents",
  "24/7 Availability",
  "CRM Integration",
  "Multi-language Support",
];

const METRICS = [
  { value: "90%", label: "Faster Response Time", icon: Zap },
  { value: "24/7", label: "Always-On Availability", icon: Clock },
  { value: "3×", label: "More Qualified Leads", icon: TrendingDown },
  { value: "70%", label: "Fewer Missed Calls", icon: PhoneCall },
];

const PROBLEMS = [
  { icon: PhoneMissed, t: "Missed Calls", d: "Every unanswered ring is a lost opportunity walking to your competitor." },
  { icon: UserX, t: "Lost Leads", d: "Inquiries vanish into voicemail, sticky notes, and forgotten callbacks." },
  { icon: Clock, t: "Slow Follow-Ups", d: "Leads cool off in minutes. Manual follow-up never keeps pace." },
  { icon: Users, t: "High Staffing Costs", d: "Receptionists and call centers don't scale — and they don't sleep." },
  { icon: Moon, t: "No After-Hours Cover", d: "Customers expect answers at 2 AM. Your business goes dark at 6 PM." },
];

const STEPS = [
  { n: "01", icon: PhoneIncoming, t: "Customer Calls", d: "Inbound call lands on any connected number, 24/7." },
  { n: "02", icon: Bot, t: "AI Answers", d: "A natural voice agent greets the caller in their language." },
  { n: "03", icon: Target, t: "Lead Qualified", d: "AI asks the right questions and scores intent in real time." },
  { n: "04", icon: Calendar, t: "Booked & Synced", d: "Appointment booked, CRM updated, follow-up triggered automatically." },
];

const FEATURES = [
  { icon: Mic, t: "AI Voice Agents", d: "Human-like voice agents that listen, understand, and respond naturally on every call.", featured: true },
  { icon: PhoneIncoming, t: "Inbound Call Handling", d: "Never miss a ring — every call answered instantly, day or night." },
  { icon: PhoneCall, t: "Outbound Follow-Ups", d: "AI dials back, nurtures, and re-engages cold leads automatically." },
  { icon: Calendar, t: "Appointment Scheduling", d: "Calendars synced. Bookings confirmed. Reminders sent." },
  { icon: Target, t: "Lead Qualification", d: "Smart scoring sends only sales-ready leads to your reps." },
  { icon: Database, t: "CRM Integration", d: "Two-way sync with HubSpot, Salesforce, Zoho and more." },
  { icon: Volume2, t: "Call Recording", d: "Full transcripts and recordings, searchable and compliant." },
  { icon: BarChart3, t: "Analytics Dashboard", d: "Live insight into volume, conversion, sentiment and ROI." },
  { icon: Globe2, t: "Multi-language Support", d: "English, Hindi, Hinglish and major regional languages." },
  { icon: ShieldCheck, t: "24/7 Availability", d: "Enterprise-grade uptime. Your AI never calls in sick." },
];

const INDUSTRIES = [
  { icon: HeartPulse, t: "Healthcare", d: "Patient intake, appointment booking, follow-ups." },
  { icon: Building2, t: "Real Estate", d: "Buyer & tenant inquiries, site-visit bookings." },
  { icon: GraduationCap, t: "Education", d: "Admissions, counselling, enrollment tracking." },
  { icon: Car, t: "Automotive", d: "Test drives, service bookings, lead routing." },
  { icon: Wrench, t: "Home Services", d: "Dispatch, quoting, after-hours emergency calls." },
  { icon: Briefcase, t: "Agencies", d: "Client intake, qualification, and onboarding." },
];

const CONVERSATION = [
  { role: "customer", text: "Hi, I'd like to book a consultation." },
  { role: "ai", text: "Absolutely. What day works best for you this week?" },
  { role: "customer", text: "Thursday afternoon if possible." },
  { role: "ai", text: "Thursday at 3 PM with Dr. Mehta is open. Shall I confirm and text you the details?" },
  { role: "customer", text: "Yes, please." },
];

const INTEGRATIONS = [
  "Meta",
  "Google Calendar",
  "HubSpot",
  "Salesforce",
  "Zoho",
  "WhatsApp",
  "Slack",
  "Outlook",
];

const TESTIMONIALS = [
  {
    quote:
      "CallOrbit replaced three receptionists overnight. We're capturing 40% more qualified leads and our team finally stopped chasing voicemails.",
    name: "Priya Sharma",
    role: "VP Sales",
    company: "Lumen Realty",
  },
  {
    quote:
      "The AI sounds genuinely human. Our patients book consultations at midnight and we wake up to a full calendar. Game-changer.",
    name: "Dr. Arjun Mehta",
    role: "Founder",
    company: "ClearSkin Clinics",
  },
  {
    quote:
      "Setup took a week. ROI hit in under a month. PixoraNest's team configured every flow exactly the way we sell.",
    name: "Rahul Kapoor",
    role: "COO",
    company: "DriveNext Auto",
  },
];

/* ─────────────── PAGE ─────────────── */

export function CallOrbitPageContent() {
  const handleOpenDemo = () => {
    // TODO: wire to shared PixoraNest demo modal
    console.log("Open PixoraNest demo modal");
  };

  return (
    <main className="min-h-screen overflow-x-hidden" style={{ background: "#fff", color: C.text }}>
      <LocalStyles />

      {/* BREADCRUMB */}
      <nav
        aria-label="Breadcrumb"
        style={{ background: C.bgDark, borderBottom: "1px solid rgba(255,255,255,0.08)" }}
      >
        <div className="mx-auto max-w-7xl px-4 py-3 text-xs sm:px-6 lg:px-8" style={{ color: "rgba(255,255,255,0.6)" }}>
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" style={{ color: "inherit" }}>
                Home
              </Link>
            </li>
            <li>/</li>
            <li>Solutions</li>
            <li>/</li>
            <li className="font-medium" style={{ color: "#fff" }}>
              CallOrbit
            </li>
          </ol>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: C.bgDark }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: C.heroGlow }} />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-8 lg:px-8 lg:py-28">
          <div>
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur-md"
              style={{
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.06)",
                color: "#BFD0FF",
              }}
            >
              <Sparkles className="h-3.5 w-3.5" /> CallOrbit by PixoraNest · AI Voice Automation
            </span>

            <h1
              className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
              style={{ color: "#fff" }}
            >
              Never Miss Another{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: C.gradientText, WebkitBackgroundClip: "text" }}
              >
                Business Call
              </span>
            </h1>

            <p
              className="mt-5 max-w-xl text-base leading-7 sm:text-lg"
              style={{ color: "rgba(255,255,255,0.72)" }}
            >
              AI-powered voice agents that answer, qualify, schedule, and follow up — 24/7. Turn every
              ring into revenue, without hiring another receptionist.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                onClick={handleOpenDemo}
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold shadow-lg transition hover:translate-y-[-1px] sm:w-auto"
                style={{
                  background: C.gradient,
                  color: "#fff",
                  boxShadow: "0 10px 30px rgba(37,89,251,0.45)",
                }}
              >
                Book a Demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
              <button
                onClick={handleOpenDemo}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold backdrop-blur-md transition hover:bg-white/10 sm:w-auto"
                style={{
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.05)",
                  color: "#fff",
                }}
              >
                <PlayCircle className="h-4 w-4" /> Watch How It Works
              </button>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium">
              {TRUST_BADGES.map((b) => (
                <li key={b} className="flex items-center gap-1.5" style={{ color: "rgba(255,255,255,0.65)" }}>
                  <CheckCircle2 className="h-4 w-4" style={{ color: "#7AA0FF" }} />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* ORBIT VISUAL */}
          <div className="relative mx-auto w-full max-w-[480px]">
            <OrbitVisual />
          </div>
        </div>
      </section>

      {/* METRICS STRIP */}
      <section
        className="relative -mt-px"
        style={{
          background: C.bgDarker,
          borderTop: "1px solid rgba(255,255,255,0.06)",
          borderBottom: `1px solid ${C.border}`,
        }}
      >
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden px-0 sm:grid-cols-4">
          {METRICS.map(({ value, label, icon: Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-2 px-4 py-8 text-center"
              style={{ background: C.bgDarker, borderRight: "1px solid rgba(255,255,255,0.06)" }}
            >
              <Icon className="h-5 w-5" style={{ color: "#7AA0FF" }} />
              <div
                className="text-3xl font-bold tracking-tight sm:text-4xl"
                style={{
                  backgroundImage: C.gradientText,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {value}
              </div>
              <div className="text-xs font-medium uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.6)" }}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLEM */}
      <Reveal>
        <Section eyebrow="The problem" title="What's quietly bleeding your revenue" subtitle="Every business loses calls. Most never see it on the P&L.">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PROBLEMS.map(({ icon: Icon, t, d }, i) => (
              <div
                key={t}
                className={`group relative overflow-hidden rounded-2xl p-6 transition hover:-translate-y-1 ${
                  i === 0 ? "lg:col-span-2" : ""
                }`}
                style={{
                  border: `1px solid ${C.border}`,
                  background: "#fff",
                  boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
                }}
              >
                <div
                  className="absolute left-0 top-0 h-1 w-12 rounded-br-full"
                  style={{ background: C.gradient }}
                />
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{ background: C.bgLight, color: C.primary }}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-base font-semibold" style={{ color: C.text }}>
                  {t}
                </h3>
                <p className="mt-2 text-sm leading-6" style={{ color: C.muted }}>
                  {d}
                </p>
              </div>
            ))}
          </div>
        </Section>
      </Reveal>

      {/* HOW IT WORKS */}
      <Reveal>
        <section style={{ background: C.bgLight }}>
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="How CallOrbit works"
              title="From ring to revenue in 4 steps"
              subtitle="One automated flow. No menus. No hand-offs. Just answers."
            />

            <div className="relative mt-14">
              {/* connector line - desktop */}
              <div
                className="absolute left-0 right-0 top-12 hidden h-px lg:block"
                style={{
                  background:
                    "linear-gradient(to right, transparent, rgba(37,89,251,0.3) 10%, rgba(37,89,251,0.3) 90%, transparent)",
                }}
              />

              <ol className="relative grid gap-8 lg:grid-cols-4 lg:gap-6">
                {STEPS.map((s, i) => (
                  <li key={s.n} className="relative">
                    <div
                      className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-2xl"
                      style={{
                        background: "#fff",
                        border: `1px solid ${C.border}`,
                        boxShadow: "0 10px 30px rgba(37,89,251,0.12)",
                      }}
                    >
                      <s.icon className="h-9 w-9" style={{ color: C.primary }} />
                      <span
                        className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold"
                        style={{ background: C.gradient, color: "#fff", boxShadow: "0 4px 12px rgba(37,89,251,0.4)" }}
                      >
                        {i + 1}
                      </span>
                    </div>
                    <div className="mt-5 text-center">
                      <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: C.primary }}>
                        Step {s.n}
                      </div>
                      <h3 className="mt-1 text-base font-semibold" style={{ color: C.text }}>
                        {s.t}
                      </h3>
                      <p className="mt-2 text-sm leading-6" style={{ color: C.muted }}>
                        {s.d}
                      </p>
                    </div>
                    {/* mobile vertical connector */}
                    {i < STEPS.length - 1 && (
                      <div
                        className="mx-auto mt-6 h-8 w-px lg:hidden"
                        style={{ background: "rgba(37,89,251,0.25)" }}
                      />
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
      </Reveal>

      {/* FEATURES — bento */}
      <Reveal>
        <Section eyebrow="Capabilities" title="One platform. Every conversation handled." subtitle="From the first ring to the CRM sync — CallOrbit owns the entire voice operation.">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[200px]">
            {FEATURES.map(({ icon: Icon, t, d, featured }) => (
              <div
                key={t}
                className={`group relative overflow-hidden rounded-2xl p-6 transition hover:-translate-y-1 ${
                  featured ? "lg:col-span-2 lg:row-span-2" : ""
                }`}
                style={{
                  border: `1px solid ${featured ? "transparent" : C.border}`,
                  background: featured ? C.gradient : "#fff",
                  color: featured ? "#fff" : C.text,
                  boxShadow: featured
                    ? "0 20px 50px rgba(37,89,251,0.35)"
                    : "0 1px 3px rgba(15,23,42,0.04)",
                }}
              >
                {featured && (
                  <div
                    className="absolute inset-0 pointer-events-none opacity-30"
                    style={{
                      background:
                        "radial-gradient(circle at 80% 20%, rgba(255,255,255,0.25), transparent 50%)",
                    }}
                  />
                )}
                <div className="relative">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{
                      background: featured ? "rgba(255,255,255,0.18)" : C.bgLight,
                      color: featured ? "#fff" : C.primary,
                    }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3
                    className={`mt-4 font-semibold ${featured ? "text-2xl leading-tight sm:text-3xl" : "text-base"}`}
                    style={{ color: featured ? "#fff" : C.text }}
                  >
                    {t}
                  </h3>
                  <p
                    className={`mt-2 leading-6 ${featured ? "text-sm sm:text-base max-w-md" : "text-sm"}`}
                    style={{ color: featured ? "rgba(255,255,255,0.85)" : C.muted }}
                  >
                    {d}
                  </p>
                  {featured && (
                    <div className="mt-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold backdrop-blur-md"
                      style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}
                    >
                      <Sparkles className="h-3 w-3" /> Powered by PixoraNest AI
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </Reveal>

      {/* INDUSTRIES / USE CASES */}
      <Reveal>
        <section style={{ background: C.bgLight }}>
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Use cases"
              title="Built for any business that lives on the phone"
              subtitle="Industry-agnostic. Configured by PixoraNest for your exact sales motion."
            />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {INDUSTRIES.map(({ icon: Icon, t, d }) => (
                <div
                  key={t}
                  className="group flex flex-col gap-3 rounded-2xl p-6 transition hover:-translate-y-1"
                  style={{
                    background: "#fff",
                    border: `1px solid ${C.border}`,
                    boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
                  }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl transition group-hover:scale-110"
                    style={{ background: C.gradient, color: "#fff" }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold" style={{ color: C.text }}>
                      {t}
                    </h3>
                    <p className="mt-1 text-sm leading-6" style={{ color: C.muted }}>
                      {d}
                    </p>
                  </div>
                  <div
                    className="mt-2 inline-flex items-center gap-1 text-xs font-semibold opacity-0 transition group-hover:opacity-100"
                    style={{ color: C.primary }}
                  >
                    Explore <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </Reveal>

      {/* VOICE CONVERSATION DEMO */}
      <Reveal>
        <Section eyebrow="Live AI" title="Hear what a CallOrbit conversation sounds like" subtitle="Natural. Fast. Conversational. Closes the loop without a human in the seat.">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold"
                style={{ background: C.bgLight, color: C.primaryDark }}
              >
                <Mic className="h-3.5 w-3.5" /> LIVE TRANSCRIPT
              </div>
              <h3 className="mt-4 text-2xl font-bold leading-tight sm:text-3xl" style={{ color: C.text }}>
                A real call. Booked in 38 seconds.
              </h3>
              <p className="mt-3 text-base leading-7" style={{ color: C.muted }}>
                CallOrbit listens, understands intent, asks the right qualifying questions, and books the
                meeting — then drops the full transcript into your CRM with sentiment and next-best action.
              </p>
              <ul className="mt-5 space-y-2 text-sm" style={{ color: C.text }}>
                {["Natural turn-taking & interruption handling", "Calendar-aware booking", "CRM + WhatsApp sync on hang-up"].map(
                  (i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: C.primary }} />
                      {i}
                    </li>
                  )
                )}
              </ul>
            </div>

            <ConversationDemo />
          </div>
        </Section>
      </Reveal>

      {/* INTEGRATIONS */}
      <Reveal>
        <section
          className="relative overflow-hidden"
          style={{ background: C.bgDark, borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="absolute inset-0 pointer-events-none" style={{ background: C.heroGlow, opacity: 0.4 }} />
          <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: "#7AA0FF" }}>
                Integrations
              </div>
              <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl" style={{ color: "#fff" }}>
                Plugs into the tools you already use
              </h2>
            </div>

            <div className="relative mt-10 overflow-hidden">
              <div className="marquee flex gap-4">
                {[...INTEGRATIONS, ...INTEGRATIONS].map((name, i) => (
                  <div
                    key={`${name}-${i}`}
                    className="flex flex-shrink-0 items-center gap-3 rounded-2xl px-6 py-4 backdrop-blur-md"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "#fff",
                    }}
                  >
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold"
                      style={{ background: C.gradient }}
                    >
                      {name[0]}
                    </div>
                    <span className="whitespace-nowrap text-sm font-semibold">{name}</span>
                  </div>
                ))}
              </div>
              <div
                className="pointer-events-none absolute inset-y-0 left-0 w-24"
                style={{ background: `linear-gradient(to right, ${C.bgDark}, transparent)` }}
              />
              <div
                className="pointer-events-none absolute inset-y-0 right-0 w-24"
                style={{ background: `linear-gradient(to left, ${C.bgDark}, transparent)` }}
              />
            </div>
          </div>
        </section>
      </Reveal>

      {/* TESTIMONIALS */}
      <Reveal>
        <Section eyebrow="Customer stories" title="Teams already running on CallOrbit" subtitle="What founders and ops leaders say after switching.">
          <div className="grid gap-5 lg:grid-cols-3 lg:items-center">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={t.name}
                className={`relative rounded-2xl p-7 transition ${i === 1 ? "lg:scale-105 lg:z-10" : ""}`}
                style={{
                  background: i === 1 ? C.gradient : "#fff",
                  color: i === 1 ? "#fff" : C.text,
                  border: i === 1 ? "1px solid transparent" : `1px solid ${C.border}`,
                  boxShadow:
                    i === 1
                      ? "0 25px 60px rgba(37,89,251,0.35)"
                      : "0 1px 3px rgba(15,23,42,0.04)",
                }}
              >
                <Quote className="h-7 w-7 opacity-30" />
                <div className="mt-2 flex gap-0.5">
                  {[0, 1, 2, 3, 4].map((s) => (
                    <Star
                      key={s}
                      className="h-4 w-4"
                      fill={i === 1 ? "#fff" : "#F5B921"}
                      strokeWidth={0}
                    />
                  ))}
                </div>
                <p
                  className="mt-4 text-base leading-7"
                  style={{ color: i === 1 ? "rgba(255,255,255,0.95)" : C.text }}
                >
                  "{t.quote}"
                </p>
                <div
                  className="mt-6 flex items-center gap-3 border-t pt-5"
                  style={{ borderColor: i === 1 ? "rgba(255,255,255,0.2)" : C.border }}
                >
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold"
                    style={{
                      background: i === 1 ? "rgba(255,255,255,0.2)" : C.bgLight,
                      color: i === 1 ? "#fff" : C.primary,
                    }}
                  >
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div
                      className="text-xs"
                      style={{ color: i === 1 ? "rgba(255,255,255,0.75)" : C.muted }}
                    >
                      {t.role} · {t.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>
      </Reveal>

      {/* FINAL CTA */}
      <section
        className="relative overflow-hidden"
        style={{ background: C.bgDark }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: C.heroGlow }} />
        <div
          className="absolute -bottom-32 left-1/2 h-96 w-[120%] -translate-x-1/2 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(37,89,251,0.35) 0%, transparent 60%)",
            filter: "blur(40px)",
          }}
        />

        <div className="relative mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <div
            className="mx-auto inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium backdrop-blur-md"
            style={{
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.06)",
              color: "#BFD0FF",
            }}
          >
            <Sparkles className="h-3.5 w-3.5" /> Ready in days, not months
          </div>
          <h2
            className="mt-5 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
            style={{ color: "#fff" }}
          >
            Turn Every Call Into{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: C.gradientText, WebkitBackgroundClip: "text" }}
            >
              Revenue
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 sm:text-lg" style={{ color: "rgba(255,255,255,0.72)" }}>
            Deploy AI voice agents that answer, qualify, schedule, and convert customers automatically.
            PixoraNest configures, integrates and optimizes it all for you.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            <button
              onClick={handleOpenDemo}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold shadow-lg transition hover:translate-y-[-1px] sm:w-auto"
              style={{
                background: C.gradient,
                color: "#fff",
                boxShadow: "0 10px 30px rgba(37,89,251,0.5)",
              }}
            >
              Book a Demo
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold backdrop-blur-md transition hover:bg-white/10 sm:w-auto"
              style={{
                border: "1px solid rgba(255,255,255,0.2)",
                background: "rgba(255,255,255,0.05)",
                color: "#fff",
              }}
            >
              Talk to an Expert
            </Link>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition hover:bg-white/5 sm:w-auto"
              style={{ color: "rgba(255,255,255,0.85)" }}
            >
              <MessageSquare className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>

          <div
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" /> Enterprise-grade security
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Workflow className="h-3.5 w-3.5" /> Dedicated PixoraNest onboarding
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Globe2 className="h-3.5 w-3.5" /> Multi-language ready
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ─────────────── SUB-COMPONENTS ─────────────── */

function Section({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section style={{ background: "#fff" }}>
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeader eyebrow={eyebrow} title={title} subtitle={subtitle} />
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: C.primary }}>
        {eyebrow}
      </div>
      <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl" style={{ color: C.text }}>
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-7" style={{ color: C.muted }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

function OrbitVisual() {
  const orbitNodes = [
    { icon: Headphones, label: "Support" },
    { icon: Target, label: "Sales" },
    { icon: Calendar, label: "Booking" },
    { icon: HeartPulse, label: "Care" },
    { icon: Building2, label: "Branch" },
    { icon: Database, label: "CRM" },
  ];

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      {/* outer glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(37,89,251,0.35) 0%, transparent 65%)",
          filter: "blur(20px)",
        }}
      />

      {/* rings */}
      <div className="absolute inset-[8%] rounded-full orbit-spin-slow" style={{ border: "1px dashed rgba(255,255,255,0.15)" }} />
      <div className="absolute inset-[20%] rounded-full orbit-spin" style={{ border: "1px solid rgba(255,255,255,0.12)" }} />
      <div className="absolute inset-[34%] rounded-full orbit-spin-fast" style={{ border: "1px dashed rgba(122,160,255,0.25)" }} />

      {/* orbit nodes — positioned around middle ring */}
      {orbitNodes.map((n, i) => {
        const angle = (360 / orbitNodes.length) * i - 90;
        const rad = (angle * Math.PI) / 180;
        const radius = 42; // %
        const x = 50 + radius * Math.cos(rad);
        const y = 50 + radius * Math.sin(rad);
        return (
          <div
            key={n.label}
            className="absolute flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl backdrop-blur-md"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.18)",
              boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
              animation: `node-float 4s ease-in-out ${i * 0.3}s infinite`,
            }}
          >
            <n.icon className="h-5 w-5" style={{ color: "#BFD0FF" }} />
          </div>
        );
      })}

      {/* center node */}
      <div
        className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl"
        style={{
          background: C.gradient,
          boxShadow: "0 20px 60px rgba(37,89,251,0.6), inset 0 1px 0 rgba(255,255,255,0.3)",
        }}
      >
        <Phone className="h-10 w-10" style={{ color: "#fff" }} />
        <span
          className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold pulse-dot"
          style={{ background: "#22C55E", color: "#fff", border: "2px solid " + C.bgDark }}
        >
          3
        </span>
      </div>

      {/* floating routing card */}
      <div
        className="absolute -bottom-4 left-1/2 flex w-[min(280px,90%)] -translate-x-1/2 items-center gap-3 rounded-2xl px-4 py-3 backdrop-blur-xl"
        style={{
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.18)",
          boxShadow: "0 15px 40px rgba(0,0,0,0.4)",
        }}
      >
        <div
          className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg"
          style={{ background: "rgba(34,197,94,0.2)", color: "#22C55E" }}
        >
          <PhoneCall className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <div className="truncate text-xs font-semibold" style={{ color: "#fff" }}>
            Routing → Sales / Mumbai
          </div>
          <div className="text-[11px]" style={{ color: "rgba(255,255,255,0.6)" }}>
            Connected in 0.4s · qualified
          </div>
        </div>
      </div>
    </div>
  );
}

function ConversationDemo() {
  const [visible, setVisible] = useState(1);

  useEffect(() => {
    if (visible >= CONVERSATION.length) {
      const t = setTimeout(() => setVisible(1), 4000);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setVisible((v) => v + 1), 1400);
    return () => clearTimeout(t);
  }, [visible]);

  return (
    <div
      className="relative overflow-hidden rounded-3xl p-6 sm:p-8"
      style={{
        background: "#fff",
        border: `1px solid ${C.border}`,
        boxShadow: "0 25px 60px rgba(37,89,251,0.18)",
      }}
    >
      {/* header */}
      <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: C.border }}>
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-xl"
            style={{ background: C.gradient }}
          >
            <Bot className="h-5 w-5" style={{ color: "#fff" }} />
          </div>
          <div>
            <div className="text-sm font-semibold" style={{ color: C.text }}>
              CallOrbit AI Agent
            </div>
            <div className="flex items-center gap-1.5 text-xs" style={{ color: C.muted }}>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: "#22C55E" }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: "#22C55E" }} />
              </span>
              Live call · 00:38
            </div>
          </div>
        </div>
        <Volume2 className="h-5 w-5" style={{ color: C.muted }} />
      </div>

      {/* waveform */}
      <div className="my-4 flex h-8 items-center justify-center gap-1">
        {[3, 6, 4, 8, 5, 9, 4, 7, 3, 8, 5, 6, 4, 7, 5, 9, 3, 6, 4, 7].map((h, i) => (
          <span
            key={i}
            className="w-1 rounded-full wave-bar"
            style={{
              height: `${h * 3}px`,
              background: C.primary,
              opacity: 0.6,
              animationDelay: `${i * 0.08}s`,
            }}
          />
        ))}
      </div>

      {/* messages */}
      <div className="space-y-3 min-h-[260px]">
        {CONVERSATION.slice(0, visible).map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "ai" ? "justify-end" : "justify-start"} fade-in-up`}
          >
            <div
              className="max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-6"
              style={
                m.role === "ai"
                  ? {
                      background: C.gradient,
                      color: "#fff",
                      borderBottomRightRadius: "6px",
                      boxShadow: "0 4px 12px rgba(37,89,251,0.25)",
                    }
                  : {
                      background: "#F3F4F6",
                      color: C.text,
                      borderBottomLeftRadius: "6px",
                    }
              }
            >
              {m.text}
            </div>
          </div>
        ))}
        {visible < CONVERSATION.length && (
          <div className="flex justify-end fade-in-up">
            <div
              className="flex items-center gap-1 rounded-2xl px-4 py-3"
              style={{ background: C.bgLight, borderBottomRightRadius: "6px" }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="h-1.5 w-1.5 rounded-full typing-dot"
                  style={{ background: C.primary, animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* footer chip */}
      <div
        className="mt-5 flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs"
        style={{ background: C.bgLight, color: C.primaryDark }}
      >
        <Network className="h-3.5 w-3.5" />
        <span className="font-semibold">Synced to CRM</span>
        <span style={{ color: C.muted }}>· appointment booked · confirmation sent</span>
      </div>
    </div>
  );
}

/* ─────────────── LOCAL CSS (no global file needed) ─────────────── */
function LocalStyles() {
  return (
    <style>{`
      @keyframes orbit-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      .orbit-spin { animation: orbit-spin 30s linear infinite; }
      .orbit-spin-slow { animation: orbit-spin 60s linear infinite; }
      .orbit-spin-fast { animation: orbit-spin 18s linear infinite reverse; }

      @keyframes node-float {
        0%, 100% { transform: translate(-50%, -50%) translateY(0); }
        50% { transform: translate(-50%, -50%) translateY(-6px); }
      }

      @keyframes pulse-dot {
        0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(34,197,94,0.6); }
        50% { transform: scale(1.08); box-shadow: 0 0 0 8px rgba(34,197,94,0); }
      }
      .pulse-dot { animation: pulse-dot 1.6s ease-in-out infinite; }

      @keyframes wave {
        0%, 100% { transform: scaleY(0.4); opacity: 0.4; }
        50% { transform: scaleY(1); opacity: 1; }
      }
      .wave-bar { transform-origin: center; animation: wave 1.2s ease-in-out infinite; }

      @keyframes typing {
        0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
        30% { transform: translateY(-4px); opacity: 1; }
      }
      .typing-dot { animation: typing 1.2s ease-in-out infinite; }

      @keyframes fade-in-up {
        from { opacity: 0; transform: translateY(8px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .fade-in-up { animation: fade-in-up 0.35s ease-out both; }

      @keyframes marquee {
        from { transform: translateX(0); }
        to { transform: translateX(-50%); }
      }
      .marquee { animation: marquee 35s linear infinite; width: max-content; }
      .marquee:hover { animation-play-state: paused; }

      @media (prefers-reduced-motion: reduce) {
        .orbit-spin, .orbit-spin-slow, .orbit-spin-fast,
        .pulse-dot, .wave-bar, .typing-dot, .marquee { animation: none !important; }
      }
    `}</style>
  );
}

export default CallOrbitPageContent;

