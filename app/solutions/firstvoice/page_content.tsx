"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
  Phone, PhoneCall, PhoneIncoming, PhoneForwarded, Clock, Globe2,
  Bot, Headphones, MessageSquare, Calendar, Database, Languages,
  Shield, Zap, BarChart3, Users, CheckCircle2, ArrowRight, X,
  PlayCircle, Building2, Sparkles, Workflow, Mic, Volume2, Settings,
} from "lucide-react"

/* ------------------------------------------------------------------ */
/*  BRAND TOKENS (inline for portability)                              */
/* ------------------------------------------------------------------ */
const BRAND = {
  primary: "#2559FB",
  primaryDark: "#233B7A",
  secondary: "#3154FB",
  bg: "#FFFFFF",
  bgLight: "#E4F0FF",
  textPrimary: "#374151",
  textSecondary: "#6B7280",
  border: "#E5E7EB",
}

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

const HERO_BADGES = [
  "24/7 Call Coverage",
  "Multilingual Voice AI",
  "CRM + WhatsApp Sync",
  "Enterprise Grade",
  "Setup in 48 Hours",
]

const PROBLEMS = [
  { icon: PhoneIncoming, title: "Missed Calls = Missed Revenue", text: "Up to 62% of business calls go unanswered after hours. Every missed call is a lost lead handed to your competitors." },
  { icon: Clock, title: "Slow Response Kills Conversions", text: "Leads contacted within 5 minutes are 9× more likely to convert. Manual call handling can't keep that promise consistently." },
  { icon: Users, title: "Receptionist Costs Keep Rising", text: "A full in-house receptionist team costs 6–10× more than an AI voice agent — and still can't cover nights, weekends or peak spikes." },
  { icon: Headphones, title: "Inconsistent Customer Experience", text: "Tone, script and qualification quality vary wildly between human agents and shifts, hurting your brand perception." },
  { icon: Database, title: "Calls Don't Reach Your CRM", text: "Notes get lost on paper, in chat or in someone's head — leaving sales teams blind to active intent and follow-ups." },
  { icon: Globe2, title: "Language Barriers Lose Customers", text: "Callers who can't speak in their preferred language hang up. Multilingual coverage is no longer optional." },
  { icon: Zap, title: "No Scalable Way to Handle Spikes", text: "Marketing campaigns, launches and seasonal peaks flood your lines — human teams simply can't scale on demand." },
]

const WORKFLOW = [
  { n: "01", icon: PhoneCall, title: "Call Lands on FirstVoice", text: "Every inbound call — day or night — is answered instantly by your AI voice receptionist." },
  { n: "02", icon: Mic, title: "Natural Conversation Starts", text: "FirstVoice greets the caller in their language with your brand voice and tone." },
  { n: "03", icon: Bot, title: "Intent Detection", text: "AI identifies whether the caller is a new lead, existing customer, support request or spam." },
  { n: "04", icon: CheckCircle2, title: "Smart Qualification", text: "Custom questions capture budget, requirement, timeline and decision-maker details." },
  { n: "05", icon: PhoneForwarded, title: "Intelligent Routing", text: "Hot leads are transferred live to the right team; others get scheduled callbacks." },
  { n: "06", icon: Calendar, title: "Appointment Booking", text: "FirstVoice checks calendar availability and confirms meetings on the call itself." },
  { n: "07", icon: Database, title: "CRM Update in Real Time", text: "Caller details, transcript, intent and next steps are pushed to your CRM instantly." },
  { n: "08", icon: MessageSquare, title: "WhatsApp Follow-Up", text: "An automated WhatsApp confirmation, brochure or callback link is sent within seconds." },
]

const FEATURES = [
  { icon: Bot, title: "AI Voice Receptionist", text: "A virtual phone receptionist that answers every call with human-like fluency and consistent brand tone." },
  { icon: Phone, title: "24/7 Call Answering Service", text: "Round-the-clock AI answering service — no missed nights, weekends, holidays or peak-hour spikes." },
  { icon: Headphones, title: "Business Call Answering Service", text: "Inbound call management software built for businesses that treat every call as revenue." },
  { icon: Workflow, title: "Property & Inquiry Handling", text: "Pre-built flows for property inquiries, service requests, appointment intake and FAQs." },
  { icon: Sparkles, title: "AI-Powered Lead Qualification", text: "Conversation intelligence software that scores, tags and routes leads in real time." },
  { icon: PhoneForwarded, title: "Smart Call Routing", text: "Call routing software that sends the right caller to the right team, location or specialist." },
  { icon: Database, title: "Deep CRM Integration", text: "Native connectors for HubSpot, Zoho, Salesforce, LeadSquared, Pipedrive and more." },
  { icon: MessageSquare, title: "WhatsApp Automation", text: "Automated WhatsApp confirmations, brochures, callbacks and nurture sequences." },
  { icon: Languages, title: "Multilingual Voice AI", text: "English, Hindi and major regional languages — switched dynamically per caller." },
  { icon: BarChart3, title: "Conversation Analytics", text: "Transcripts, sentiment, intent and outcome dashboards for every single call." },
  { icon: Calendar, title: "Calendar & Booking Sync", text: "Two-way sync with Google Calendar and Outlook for live appointment booking." },
  { icon: Shield, title: "Enterprise-Grade Security", text: "Encrypted call data, role-based access and compliance-ready audit trails." },
]

const METRICS = [
  { value: "100%", label: "Call Coverage", sub: "Every call answered, 24/7/365" },
  { value: "3.5×", label: "More Qualified Leads", sub: "vs traditional answering services" },
  { value: "68%", label: "Lower Reception Costs", sub: "compared to in-house teams" },
  { value: "92%", label: "Faster Response Time", sub: "instant answer vs minutes of wait" },
  { value: "47%", label: "More Appointments Booked", sub: "by automating scheduling on call" },
  { value: "24/7", label: "Always Available", sub: "nights, weekends, holidays included" },
]

const INTEGRATIONS = [
  "HubSpot", "Zoho CRM", "Salesforce", "LeadSquared",
  "Pipedrive", "Google Calendar", "Outlook", "WhatsApp Business",
]

const FAQS = [
  { q: "What exactly is FirstVoice?", a: "FirstVoice is an AI voice receptionist and 24/7 business call answering service. It uses voice AI software to answer inbound calls, qualify leads, route conversations and log everything into your CRM — without human agents." },
  { q: "How is FirstVoice different from a traditional virtual receptionist service?", a: "A traditional virtual receptionist service relies on human agents with fixed shifts and per-minute pricing. FirstVoice is an AI phone agent that works 24/7, handles unlimited simultaneous calls, never gets tired and writes structured data directly into your customer communication platform." },
  { q: "Is FirstVoice a cloud phone system or an add-on to one?", a: "FirstVoice works both ways. It can act as a hosted phone system on its own number, or sit on top of your existing business phone system / business telephone system as an AI answering layer." },
  { q: "Can FirstVoice handle business call answering 24/7?", a: "Yes. FirstVoice is a true 24/7 call answering service — nights, weekends, holidays and high-volume marketing spikes are all covered automatically." },
  { q: "Does FirstVoice work as an automated answering service for inbound calls only?", a: "FirstVoice is primarily an inbound call management software, but it also supports outbound follow-ups, callback automation and WhatsApp nurture sequences." },
  { q: "Will the caller know they're talking to an AI?", a: "FirstVoice uses natural, human-like voice AI. Most callers experience it as a friendly, professional receptionist. You can choose to disclose AI usage based on your brand and compliance policy." },
  { q: "Does FirstVoice qualify leads or just take messages?", a: "FirstVoice is a full lead engagement software, not a message-taking service. It asks your custom qualification questions, scores intent, tags leads and pushes them into your CRM in real time." },
  { q: "Which CRMs does FirstVoice integrate with?", a: "Native integrations include HubSpot, Zoho, Salesforce, LeadSquared and Pipedrive. Any other CRM can be connected via API or webhook." },
  { q: "Can FirstVoice book appointments directly on the call?", a: "Yes. FirstVoice connects to Google Calendar and Outlook and books appointments live during the conversation, then sends a WhatsApp and email confirmation." },
  { q: "What languages does FirstVoice support?", a: "FirstVoice is a multilingual voice AI platform supporting English, Hindi and major Indian regional languages, switching dynamically based on the caller." },
  { q: "How is FirstVoice different from IVR or interactive voice response software?", a: "Legacy IVR forces callers through menu trees. FirstVoice is a conversational AI receptionist software — callers speak naturally, and the AI understands intent without 'press 1, press 2' menus." },
  { q: "Can FirstVoice forward or transfer calls to my human team?", a: "Yes. FirstVoice includes call routing software and call forwarding software capabilities — hot leads can be transferred live to the right person, location or department." },
  { q: "How fast can FirstVoice be deployed?", a: "Typical deployment is 48 hours: number provisioning, voice persona setup, qualification logic, CRM and WhatsApp integration, and go-live." },
  { q: "Is FirstVoice secure and compliant?", a: "Yes. Call data is encrypted, role-based access is enforced, and full audit trails are available — meeting enterprise security and compliance expectations." },
  { q: "Does FirstVoice provide call analytics and reporting?", a: "Yes. As a conversation intelligence software, FirstVoice delivers transcripts, intent tags, sentiment scores, qualification outcomes and call analytics dashboards." },
  { q: "How does FirstVoice price compared to a live answering service?", a: "FirstVoice typically costs 60–80% less than a live answering service or full in-house receptionist team — with unlimited concurrency and zero overtime costs." },
]

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function FirstVoicePageContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  const [demoOpen, setDemoOpen] = useState(false)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setDemoOpen(false) }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <main
      className="min-h-screen"
      style={{ background: BRAND.bg, color: BRAND.textPrimary, fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
    >
      {/* ===== BREADCRUMB ===== */}
      <nav aria-label="Breadcrumb" className="border-b" style={{ borderColor: BRAND.border, background: BRAND.bg }}>
        <div className="mx-auto max-w-7xl px-6 py-3 text-sm" style={{ color: BRAND.textSecondary }}>
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/solutions" className="hover:underline">Solutions</Link>
          <span className="mx-2">/</span>
          <span style={{ color: BRAND.primaryDark }}>FirstVoice</span>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden" style={{ background: BRAND.bg }}>
        <div className="mx-auto max-w-7xl px-6 py-16 md:py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold"
              style={{ background: BRAND.bgLight, color: BRAND.primaryDark }}
            >
              <Sparkles size={14} /> AI Voice Receptionist Platform
            </span>
            <h1 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight" style={{ color: BRAND.primaryDark }}>
              FirstVoice — The AI Voice Receptionist That Answers Every Business Call, 24/7
            </h1>
            <p className="mt-5 text-lg md:text-xl" style={{ color: BRAND.textSecondary }}>
              FirstVoice is a 24/7 AI answering service and virtual phone receptionist that answers, qualifies, routes
              and logs every inbound call — with CRM, WhatsApp and calendar automation built in. Replace missed calls,
              voicemail and expensive answering services with one intelligent voice agent platform.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white shadow-sm transition"
                style={{ background: BRAND.primary }}
              >
                Book a Demo <ArrowRight size={18} />
              </Link>
              <button
                onClick={() => setDemoOpen(true)}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border transition"
                style={{ borderColor: BRAND.border, color: BRAND.primaryDark, background: BRAND.bg }}
              >
                <PlayCircle size={18} /> Watch Live Demo
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {HERO_BADGES.map((b) => (
                <span
                  key={b}
                  className="text-xs font-medium px-3 py-1.5 rounded-full border"
                  style={{ borderColor: BRAND.border, color: BRAND.textPrimary, background: BRAND.bg }}
                >
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Hero visual — clean call card */}
          <div className="relative">
            <div
              className="rounded-2xl p-6 md:p-8 border"
              style={{ background: BRAND.bgLight, borderColor: BRAND.border, boxShadow: "0 10px 30px -10px rgba(37,89,251,0.25)" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-white"
                    style={{ background: BRAND.primary }}
                  >
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: BRAND.primaryDark }}>Incoming Call</p>
                    <p className="text-xs" style={{ color: BRAND.textSecondary }}>+91 •• ••• 4827</p>
                  </div>
                </div>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: "#DCFCE7", color: "#166534" }}
                >
                  ● LIVE
                </span>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  { who: "FirstVoice", text: "Hi! Thanks for calling. How can I help you today?", mine: false },
                  { who: "Caller", text: "I want to know about your services and pricing.", mine: true },
                  { who: "FirstVoice", text: "Got it. May I take a few quick details so I can connect you to the right specialist?", mine: false },
                ].map((m, i) => (
                  <div key={i} className={`flex ${m.mine ? "justify-end" : "justify-start"}`}>
                    <div
                      className="max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm"
                      style={{
                        background: m.mine ? BRAND.bg : BRAND.primary,
                        color: m.mine ? BRAND.textPrimary : "#FFFFFF",
                        border: m.mine ? `1px solid ${BRAND.border}` : "none",
                      }}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2 text-center">
                {[
                  { icon: Volume2, label: "Active" },
                  { icon: Bot, label: "AI Agent" },
                  { icon: Database, label: "CRM Sync" },
                ].map(({ icon: Ic, label }) => (
                  <div key={label} className="rounded-lg py-2.5" style={{ background: BRAND.bg, border: `1px solid ${BRAND.border}` }}>
                    <Ic size={16} className="mx-auto" style={{ color: BRAND.primary }} />
                    <p className="mt-1 text-[11px] font-medium" style={{ color: BRAND.textSecondary }}>{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TRUST STRIP ===== */}
      <section className="border-y" style={{ borderColor: BRAND.border, background: BRAND.bg }}>
        <div className="mx-auto max-w-7xl px-6 py-8 text-center">
          <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: BRAND.textSecondary }}>
            Trusted by growth-stage businesses across India
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm font-semibold" style={{ color: BRAND.primaryDark }}>
            {INTEGRATIONS.map((i) => <span key={i}>{i}</span>)}
          </div>
        </div>
      </section>

      {/* ===== PROBLEMS ===== */}
      <Section bg={BRAND.bgLight}>
        <SectionHeader
          eyebrow="The Problem"
          title="Why traditional call answering breaks down"
          sub="Businesses lose revenue every day to missed calls, slow follow-ups and inconsistent customer experiences. FirstVoice solves the root cause — not the symptom."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROBLEMS.map(({ icon: Ic, title, text }) => (
            <div
              key={title}
              className="rounded-xl p-6 border bg-white transition hover:-translate-y-0.5"
              style={{ borderColor: BRAND.border, boxShadow: "0 1px 2px rgba(16,24,40,0.06)" }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: BRAND.bgLight, color: BRAND.primary }}
              >
                <Ic size={20} />
              </div>
              <h3 className="font-semibold text-lg mb-2" style={{ color: BRAND.primaryDark }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: BRAND.textSecondary }}>{text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== WORKFLOW ===== */}
      <Section bg={BRAND.bg}>
        <SectionHeader
          eyebrow="How It Works"
          title="From inbound call to closed lead — fully automated"
          sub="FirstVoice handles the entire conversation lifecycle, end-to-end, with no human intervention required."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {WORKFLOW.map(({ n, icon: Ic, title, text }) => (
            <div
              key={n}
              className="rounded-xl p-6 border bg-white relative"
              style={{ borderColor: BRAND.border, boxShadow: "0 1px 2px rgba(16,24,40,0.06)" }}
            >
              <span className="text-xs font-bold" style={{ color: BRAND.primary }}>STEP {n}</span>
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center my-3 text-white"
                style={{ background: BRAND.primary }}
              >
                <Ic size={20} />
              </div>
              <h3 className="font-semibold mb-2" style={{ color: BRAND.primaryDark }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: BRAND.textSecondary }}>{text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== CTA #1 ===== */}
      <CtaBand
        title="See FirstVoice answer a real business call"
        sub="Book a 20-minute live demo and watch the AI receptionist qualify, route and log a call in real time."
        onDemo={() => setDemoOpen(true)}
      />

      {/* ===== FEATURES ===== */}
      <Section bg={BRAND.bgLight}>
        <SectionHeader
          eyebrow="Features"
          title="A complete AI receptionist software platform"
          sub="Voice AI software, call routing software, conversation intelligence, CRM integration and WhatsApp automation — in one voice agent platform."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map(({ icon: Ic, title, text }) => (
            <div
              key={title}
              className="rounded-xl p-6 bg-white border transition hover:-translate-y-0.5"
              style={{ borderColor: BRAND.border, boxShadow: "0 1px 2px rgba(16,24,40,0.06)" }}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                style={{ background: BRAND.bgLight, color: BRAND.primary }}
              >
                <Ic size={20} />
              </div>
              <h3 className="font-semibold text-lg mb-2" style={{ color: BRAND.primaryDark }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: BRAND.textSecondary }}>{text}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== ROI METRICS ===== */}
      <Section bg={BRAND.bg}>
        <SectionHeader
          eyebrow="Business Impact"
          title="Measurable ROI from day one"
          sub="FirstVoice doesn't just answer calls — it changes the unit economics of your customer communication."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {METRICS.map((m) => (
            <div
              key={m.label}
              className="rounded-xl p-6 border text-center"
              style={{ borderColor: BRAND.border, background: BRAND.bgLight }}
            >
              <p className="text-4xl font-bold" style={{ color: BRAND.primary }}>{m.value}</p>
              <p className="mt-2 font-semibold" style={{ color: BRAND.primaryDark }}>{m.label}</p>
              <p className="text-sm mt-1" style={{ color: BRAND.textSecondary }}>{m.sub}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ===== INTEGRATIONS ===== */}
      <Section bg={BRAND.bgLight}>
        <SectionHeader
          eyebrow="Integrations"
          title="Plugs into the tools your business already runs on"
          sub="Native connectors for popular CRMs, calendars and messaging platforms — plus open APIs for everything else."
        />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {INTEGRATIONS.map((i) => (
            <div
              key={i}
              className="rounded-xl py-6 text-center font-semibold border bg-white"
              style={{ borderColor: BRAND.border, color: BRAND.primaryDark }}
            >
              {i}
            </div>
          ))}
        </div>
      </Section>

      {/* ===== SEO DEEP CONTENT ===== */}
      <Section bg={BRAND.bg}>
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="About FirstVoice"
            title="The complete AI voice receptionist and answering service for modern businesses"
            sub=""
          />

          <div className="space-y-6 text-base leading-relaxed" style={{ color: BRAND.textPrimary }}>
            <p>
              <strong>FirstVoice</strong> is PixoraNest's flagship <strong>AI voice receptionist</strong> and{" "}
              <strong>24/7 call answering service</strong>. It replaces missed calls, voicemail, IVR menus and
              expensive live answering services with a single intelligent <strong>voice agent platform</strong> that
              answers, understands, qualifies and routes every inbound business call — automatically.
            </p>

            <p>
              Built as an enterprise-grade <strong>AI phone agent</strong> and{" "}
              <strong>virtual phone receptionist</strong>, FirstVoice combines{" "}
              <strong>voice AI software</strong>, <strong>conversation intelligence software</strong>,{" "}
              <strong>call routing software</strong> and deep CRM automation into one seamless customer
              communication layer. Whether you operate a startup, a growing SMB or a multi-location enterprise,
              FirstVoice acts as a tireless <strong>virtual receptionist software</strong> that delivers consistent,
              on-brand conversations at any scale.
            </p>

            <h3 className="text-2xl font-bold pt-4" style={{ color: BRAND.primaryDark }}>
              What FirstVoice does
            </h3>
            <p>
              FirstVoice is engineered as an end-to-end <strong>automated answering service</strong> and{" "}
              <strong>digital receptionist software</strong>. The moment a call lands on your business number, the{" "}
              <strong>AI answering service</strong> greets the caller in their preferred language, detects intent,
              asks your custom qualification questions, and decides whether to transfer the call live, schedule a
              callback, book an appointment or send a WhatsApp follow-up. Every interaction is captured as
              structured data inside your CRM — turning your phone line into a true{" "}
              <strong>lead engagement software</strong> channel.
            </p>

            <h3 className="text-2xl font-bold pt-4" style={{ color: BRAND.primaryDark }}>
              Why businesses choose FirstVoice
            </h3>
            <p>
              Traditional <strong>telephone answering services</strong> and <strong>live answering services</strong>{" "}
              are bound by human shifts, per-minute pricing and inconsistent quality. Legacy{" "}
              <strong>interactive voice response software</strong> frustrates callers with rigid menu trees.
              FirstVoice — as a modern <strong>AI receptionist software</strong> — eliminates both problems. It
              works as a true <strong>24/7 call answering service</strong>, handles unlimited concurrent calls,
              and scales instantly during marketing campaigns or seasonal spikes without hiring or overtime cost.
            </p>

            <h3 className="text-2xl font-bold pt-4" style={{ color: BRAND.primaryDark }}>
              FirstVoice as a complete business phone system
            </h3>
            <p>
              FirstVoice can operate as a standalone <strong>hosted phone system</strong> and{" "}
              <strong>cloud phone system</strong> on its own number, or sit on top of your existing{" "}
              <strong>business phone system</strong> / <strong>business telephone system</strong> as an AI answering
              and qualification layer. Combined with native <strong>call forwarding software</strong>,{" "}
              <strong>inbound call management software</strong> and <strong>call management software</strong>{" "}
              capabilities, it gives every team — sales, support, operations — a unified{" "}
              <strong>customer communication platform</strong>.
            </p>

            <h3 className="text-2xl font-bold pt-4" style={{ color: BRAND.primaryDark }}>
              Built for sales and support automation
            </h3>
            <p>
              As <strong>customer support automation</strong> and <strong>customer interaction software</strong>,
              FirstVoice handles repetitive inbound queries — order status, business hours, pricing, FAQs — without
              tying up human agents. As a <strong>lead engagement software</strong> and{" "}
              <strong>voice automation software</strong>, it captures, qualifies and routes new leads in real time,
              with WhatsApp, email and CRM follow-ups firing automatically. The result is a measurable lift in
              conversion, response speed and customer satisfaction — at a fraction of the cost of a traditional{" "}
              <strong>virtual receptionist service</strong> or in-house team.
            </p>

            <h3 className="text-2xl font-bold pt-4" style={{ color: BRAND.primaryDark }}>
              Enterprise security, multilingual coverage, fast deployment
            </h3>
            <p>
              FirstVoice is built with enterprise-grade encryption, role-based access and full audit trails. It
              supports multilingual voice AI across English, Hindi and major regional languages — making it the
              ideal <strong>phone answering software</strong> for Indian businesses serving diverse customer bases.
              Most customers go live within 48 hours, with full CRM, WhatsApp and calendar integration configured
              by the PixoraNest team.
            </p>
          </div>
        </div>
      </Section>

      {/* ===== FAQ ===== */}
      <Section bg={BRAND.bgLight}>
        <SectionHeader
          eyebrow="FAQ"
          title="Everything you need to know about FirstVoice"
          sub="Answers to the most common questions about our AI voice receptionist and 24/7 answering service."
        />
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((f, i) => {
            const open = openFaq === i
            return (
              <div
                key={i}
                className="rounded-xl border bg-white overflow-hidden"
                style={{ borderColor: BRAND.border, boxShadow: "0 1px 2px rgba(16,24,40,0.06)" }}
              >
                <button
                  onClick={() => setOpenFaq(open ? null : i)}
                  aria-expanded={open}
                  className="w-full flex items-center justify-between text-left px-5 py-4 font-semibold"
                  style={{ color: BRAND.primaryDark }}
                >
                  <span>{f.q}</span>
                  <span
                    className="ml-4 shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm"
                    style={{ background: open ? BRAND.primaryDark : BRAND.primary }}
                  >
                    {open ? "−" : "+"}
                  </span>
                </button>
                {open && (
                  <div className="px-5 pb-5 text-sm leading-relaxed" style={{ color: BRAND.textSecondary }}>
                    {f.a}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Section>

      {/* ===== FINAL CTA ===== */}
      <section style={{ background: BRAND.primary }}>
        <div className="mx-auto max-w-5xl px-6 py-16 md:py-20 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold">Stop missing calls. Start closing them.</h2>
          <p className="mt-4 text-lg opacity-90 max-w-2xl mx-auto">
            Book a personalized FirstVoice demo and see how a 24/7 AI voice receptionist can transform your
            business communication — in 48 hours, not 6 months.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold bg-white"
              style={{ color: BRAND.primary }}
            >
              Book a Demo <ArrowRight size={18} />
            </Link>
            <a
              href="https://wa.me/910000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold border border-white/60 hover:bg-white/10 transition"
            >
              <MessageSquare size={18} /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* ===== DEMO MODAL ===== */}
      {demoOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(15,23,42,0.55)" }}
          onClick={() => setDemoOpen(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-3xl p-6 relative"
            onClick={(e) => e.stopPropagation()}
            style={{ boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}
          >
            <button
              onClick={() => setDemoOpen(false)}
              aria-label="Close demo"
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100"
              style={{ color: BRAND.textSecondary }}
            >
              <X size={20} />
            </button>
            <h3 className="text-xl font-bold" style={{ color: BRAND.primaryDark }}>FirstVoice Live Demo</h3>
            <p className="mt-2 text-sm" style={{ color: BRAND.textSecondary }}>
              Watch a real inbound business call answered, qualified, routed and logged by FirstVoice.
            </p>
            <div
              className="mt-5 aspect-video rounded-xl flex items-center justify-center"
              style={{ background: BRAND.bgLight, border: `1px solid ${BRAND.border}` }}
            >
              <div className="text-center">
                <PlayCircle size={56} style={{ color: BRAND.primary }} className="mx-auto" />
                <p className="mt-3 font-semibold" style={{ color: BRAND.primaryDark }}>Demo video coming soon</p>
                <p className="text-sm" style={{ color: BRAND.textSecondary }}>
                  Or book a live walkthrough with our team.
                </p>
              </div>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setDemoOpen(false)}
                className="px-4 py-2 rounded-lg border font-semibold"
                style={{ borderColor: BRAND.border, color: BRAND.textPrimary }}
              >
                Close
              </button>
              <Link
                href="/contact"
                className="px-4 py-2 rounded-lg font-semibold text-white"
                style={{ background: BRAND.primary }}
              >
                Book Live Demo
              </Link>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

/* ------------------------------------------------------------------ */
/*  SHARED SUB-COMPONENTS                                              */
/* ------------------------------------------------------------------ */

function Section({ children, bg }: { children: React.ReactNode; bg: string }) {
  return (
    <section style={{ background: bg }}>
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">{children}</div>
    </section>
  )
}

function SectionHeader({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-12">
      <span
        className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
        style={{ background: BRAND.bgLight, color: BRAND.primary }}
      >
        {eyebrow}
      </span>
      <h2 className="mt-4 text-3xl md:text-4xl font-bold" style={{ color: BRAND.primaryDark }}>{title}</h2>
      {sub && <p className="mt-4 text-lg" style={{ color: BRAND.textSecondary }}>{sub}</p>}
    </div>
  )
}

function CtaBand({ title, sub, onDemo }: { title: string; sub: string; onDemo: () => void }) {
  return (
    <section style={{ background: BRAND.bg }}>
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div
          className="rounded-2xl px-6 md:px-10 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6 border"
          style={{ background: BRAND.bgLight, borderColor: BRAND.border }}
        >
          <div className="md:max-w-2xl">
            <h3 className="text-2xl md:text-3xl font-bold" style={{ color: BRAND.primaryDark }}>{title}</h3>
            <p className="mt-2" style={{ color: BRAND.textSecondary }}>{sub}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold text-white"
              style={{ background: BRAND.primary }}
            >
              Book a Demo <ArrowRight size={18} />
            </Link>
            <button
              onClick={onDemo}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg font-semibold border bg-white"
              style={{ borderColor: BRAND.border, color: BRAND.primaryDark }}
            >
              <PlayCircle size={18} /> Watch Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
