"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import {
  PhoneCall,
  PhoneIncoming,
  PhoneMissed,
  PhoneForwarded,
  MessageCircle,
  CalendarCheck,
  Clock,
  Globe2,
  Shield,
  ArrowRight,
  Plus,
  CheckCircle2,
  ChevronRight,
  Users,
  Bell,
  Activity,
  Mic,
  Send,
  Sparkles,
  Bot,
  Smile,
  type LucideIcon,
} from "lucide-react"
import {
  Home,
  Building,
  Building2,
  Briefcase,
  Store,
  Key,
  UserCog,
  Timer,
  TrendingUp,
  Workflow as WorkflowIcon,
  Phone,
  GitBranch,
  Target,
  Headphones,
  Network,
  MapPin,
  Search,
  Star,
  Zap,
  BarChart3,
  Quote,
  Database,
  Layers,
} from "lucide-react"

/* -------------------------------------------------------------------------- */
/*  Types & data                                                              */
/* -------------------------------------------------------------------------- */

type Industry = {
  slug: string
  name: string
  tagline?: string
  description?: string
  [key: string]: unknown
}

type FAQ = { q: string; a: string }

export const clinicFaqs: FAQ[] = [
  {
    q: "How fast can my dental practice go live with PixoraNest?",
    a: "Setup is guided end-to-end. We connect FirstVoice to your existing clinic number, train it on your treatments, dentists and hours, and route bookings into your calendar or PMS.",
  },
  {
    q: "Will the AI receptionist sound robotic to my patients?",
    a: "No. FirstVoice uses natural, low-latency voice with accent support across English, Hindi and major Indian languages, so dental patients feel they are talking to a real front desk.",
  },
  {
    q: "What happens to missed calls and after-hours patient inquiries?",
    a: "Every missed or after-hours call is answered by the AI receptionist, booked or triaged, and a WhatsApp confirmation is sent via LeadNest — so no patient slips through.",
  },
  {
    q: "Can it handle emergency dental calls differently?",
    a: "Yes. CallOrbit routes urgent cases (pain, swelling, trauma) straight to the on-call dentist or your emergency line, while routine cleanings and consultations are booked by FirstVoice.",
  },
  {
    q: "Does it integrate with my existing dental PMS or calendar?",
    a: "Yes. We integrate with common practice systems and Google Calendar. Bookings, reschedules and cancellations sync both ways.",
  },
  {
    q: "Is patient data handled securely?",
    a: "All calls and messages are encrypted in transit and at rest. We follow healthcare-grade data handling practices and never share patient data across tenants.",
  },
]

export const realEstateFaqs: FAQ[] = [
  { q: "What is real estate automation software and how does PixoraNest help?", a: "Real estate automation software handles repetitive work — answering property calls, capturing leads, qualifying buyers, routing them to the right agent, and following up — without manual effort. PixoraNest combines FirstVoice (AI receptionist for real estate), LeadNest (real estate CRM and lead management), and CallOrbit (real estate call routing software) into one platform built for agencies, brokers, builders, and property consultants." },
  { q: "How does the AI receptionist handle property inquiries?", a: "FirstVoice answers every inbound call 24/7, identifies the property of interest, qualifies budget and intent, books site visits in your calendar, and sends a WhatsApp confirmation via LeadNest — all in a natural conversation, in English, Hindi, and regional languages. It works as a fully managed real estate answering service that never sleeps." },
  { q: "Can PixoraNest replace my existing real estate CRM?", a: "Yes. LeadNest works as a standalone real estate CRM software with pipeline management, real estate lead nurturing, and follow-up automation. If you already use Zoho, HubSpot, Salesforce, or a custom property CRM, we integrate via API or Zapier so leads flow in automatically." },
  { q: "How does intelligent call routing work for a real estate agency?", a: "CallOrbit reads the caller's intent and routing rules — VIP buyer to senior agent, commercial inquiry to commercial team, specific project to its dedicated agent, after-hours calls to FirstVoice. No more random round-robin or missed handoffs. It's purpose-built real estate call routing software." },
  { q: "Will this improve my real estate lead conversion rate?", a: "Yes. Most clients see conversion rise from ~12% to 30%+ within 90 days. The biggest lever is response time — leads contacted within 1 minute convert 7x more than those contacted in an hour. PixoraNest is real estate lead conversion software that responds in seconds, every time." },
  { q: "How does it stop lead leakage?", a: "Every call, missed call, WhatsApp message, and web inquiry lands in LeadNest with full context. Nothing sits in an agent's personal phone, a sticky note, or a forgotten WhatsApp chat. Complete real estate lead tracking in one pipeline." },
  { q: "Does the system handle after-hours property inquiries?", a: "Yes. Most property buyers research at night and on weekends. FirstVoice answers, qualifies, books site visits, and LeadNest sends instant WhatsApp confirmations — so a 10 PM Sunday lead is already qualified and scheduled by Monday morning. It functions as a 24/7 real estate phone answering service." },
  { q: "How long does setup take for a real estate agency?", a: "Most agencies go live in 24–72 hours. We connect FirstVoice to your existing numbers, import your project list and price sheets, configure CallOrbit routing rules per project or branch, and train LeadNest on your sales pipeline." },
  { q: "Can it support multiple projects and branches?", a: "Yes. CallOrbit routes calls per project, per location, or per agent. LeadNest segments leads by project, source, and stage. Builders and developers use this as their property management automation backbone to run dozens of projects from one dashboard." },
  { q: "Does PixoraNest work for commercial real estate and property management?", a: "Yes. Commercial brokers use it to qualify tenant inquiries, route enterprise leads, and manage lease pipelines. Property management firms use LeadNest for tenant communication, maintenance follow-ups, and renewal automation as a full real estate customer management system." },
  { q: "How does real estate lead nurturing work?", a: "LeadNest runs automated WhatsApp + email sequences — drip campaigns for cold leads, site-visit reminders for warm leads, post-visit follow-ups, and re-engagement for stalled deals. You define the playbook once; it runs forever." },
  { q: "Is buyer data handled securely?", a: "All calls and messages are encrypted in transit and at rest. Buyer data never crosses tenants. We follow enterprise-grade data handling and offer DPA agreements for larger agencies." },
  { q: "What does the real estate sales pipeline look like in LeadNest?", a: "A visual kanban: New Lead → Contacted → Qualified → Site Visit Scheduled → Site Visit Done → Negotiation → Booked → Closed. Every stage has automation triggers — reminders, follow-ups, agent notifications — so deals never stall silently. It's complete property inquiry management end to end." },
  { q: "Can I see ROI before committing?", a: "Yes. Book a demo and we'll run a 14-day pilot on one project or branch. You'll see lead response time, missed-call recovery, and conversion lift live in your dashboard before scaling." },
  { q: "How is this different from a generic real estate answering service?", a: "Traditional answering services take messages. PixoraNest qualifies leads, books site visits, routes calls intelligently, and runs your follow-up sequences — it replaces the receptionist and augments your sales team with full property CRM capability." },
]


/* Brand tokens (homepage):
   Primary blue #2D5BFF · Wash #EAF1FF / #F3F6FF · Text #0B1020 · Muted #5B6480 */

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }

/* -------------------------------------------------------------------------- */
/*  Primitives                                                                */
/* -------------------------------------------------------------------------- */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-[#DCE6FF] bg-[#EAF1FF] px-3 py-1 text-xs font-semibold tracking-wide text-[#2D5BFF]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#2D5BFF]" />
      {children}
    </div>
  )
}

function Card({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={`relative rounded-2xl border border-[#E6ECFA] bg-white shadow-[0_1px_2px_rgba(11,16,32,0.04),0_10px_30px_-16px_rgba(45,91,255,0.18)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#2D5BFF]/30 hover:shadow-[0_1px_2px_rgba(11,16,32,0.04),0_20px_50px_-20px_rgba(45,91,255,0.35)] ${className}`}
    >
      {children}
    </div>
  )
}

function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-xl bg-[#2D5BFF] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_-12px_rgba(45,91,255,0.6)] transition hover:bg-[#2348d6] hover:shadow-[0_18px_40px_-12px_rgba(45,91,255,0.7)]"
    >
      {children}
    </Link>
  )
}

function GhostButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 rounded-xl border border-[#DCE6FF] bg-white px-5 py-3 text-sm font-semibold text-[#0B1020] transition hover:border-[#2D5BFF]/40 hover:bg-[#F3F6FF]"
    >
      {children}
    </Link>
  )
}

function SoftBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.45]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(45,91,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(45,91,255,0.06) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at 50% 0%, black 25%, transparent 75%)",
        }}
      />
      <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[#DCE6FF]/70 blur-[120px]" />
      <div className="absolute top-[40%] right-[-10%] h-[420px] w-[420px] rounded-full bg-[#EAF1FF] blur-[120px]" />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/*  LIVE Hero console — dental AI receptionist                                */
/* -------------------------------------------------------------------------- */

type Turn = { who: "Patient" | "FirstVoice"; text: string }

const CONVO: Turn[] = [
  { who: "Patient", text: "Hi, I'd like to book a teeth cleaning this Saturday." },
  { who: "FirstVoice", text: "Sure. Dr. Kapoor has a slot at 10:15 AM on Saturday. Shall I confirm?" },
  { who: "Patient", text: "Yes please. Also, how much is a root canal consultation?" },
  { who: "FirstVoice", text: "Consultation is ₹500, adjusted if you proceed. Booking your cleaning now." },
]

function HeroConsole() {
  const reduce = useReducedMotion()
  const [step, setStep] = useState(0)
  const [typing, setTyping] = useState(false)
  const [booked, setBooked] = useState(false)
  const [showWA, setShowWA] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduce) {
      setStep(CONVO.length)
      setBooked(true)
      setShowWA(true)
      return
    }
    let cancelled = false
    const run = async () => {
      setStep(0); setBooked(false); setShowWA(false)
      for (let i = 0; i < CONVO.length; i++) {
        if (cancelled) return
        if (CONVO[i].who === "FirstVoice") {
          setTyping(true)
          await new Promise((r) => setTimeout(r, 900))
          if (cancelled) return
          setTyping(false)
        }
        setStep(i + 1)
        await new Promise((r) => setTimeout(r, 1100))
      }
      if (cancelled) return
      setBooked(true)
      await new Promise((r) => setTimeout(r, 600))
      if (cancelled) return
      setShowWA(true)
    }
    run()
    const id = window.setInterval(run, 14000)
    return () => { cancelled = true; window.clearInterval(id) }
  }, [reduce])

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [step, typing])

  const visible = CONVO.slice(0, step)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="relative"
    >
      <div className="pointer-events-none absolute -inset-10 -z-10">
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2D5BFF]/15 blur-3xl" />
      </div>

      <div className="overflow-hidden rounded-3xl border border-[#E6ECFA] bg-white shadow-[0_30px_80px_-30px_rgba(45,91,255,0.35)]">
        <div className="flex items-center justify-between border-b border-[#EEF2FB] bg-[#FAFBFF] px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            <span className="h-2.5 w-2.5 rounded-full bg-slate-200" />
            <span className="ml-3 text-[11px] font-medium text-[#5B6480]">FirstVoice · dental front desk</span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            On call
          </div>
        </div>

        <div className="flex items-center justify-between px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#DCE6FF] bg-[#EAF1FF]">
              <PhoneIncoming className="h-4 w-4 text-[#2D5BFF]" />
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0B1020]">+91 98•••• 41•••</p>
              <p className="text-[11px] text-[#5B6480]">New patient · cleaning inquiry</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#5B6480]">
            <Mic className="h-3.5 w-3.5 text-[#2D5BFF]" />
            Listening
          </div>
        </div>

        <div
          ref={scrollRef}
          className="h-[260px] space-y-2.5 overflow-y-auto border-t border-[#EEF2FB] bg-[#FAFBFF] px-5 py-4"
        >
          <AnimatePresence initial={false}>
            {visible.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className={`flex ${m.who === "FirstVoice" ? "justify-start" : "justify-end"}`}
              >
                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed shadow-sm ${
                    m.who === "FirstVoice"
                      ? "border border-[#E6ECFA] bg-white text-[#0B1020]"
                      : "bg-[#2D5BFF] text-white"
                  }`}
                >
                  {m.who === "FirstVoice" && (
                    <div className="mb-1 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wide text-[#2D5BFF]">
                      <Bot className="h-3 w-3" /> AI Receptionist
                    </div>
                  )}
                  <p>{m.text}</p>
                </div>
              </motion.div>
            ))}

            {typing && (
              <motion.div
                key="typing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-center gap-1 rounded-2xl border border-[#E6ECFA] bg-white px-3 py-2.5 shadow-sm">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="h-1.5 w-1.5 rounded-full bg-[#2D5BFF]"
                      animate={{ y: [0, -3, 0], opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {booked && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="mx-5 mb-5 mt-3 rounded-xl border border-[#DCE6FF] bg-[#F3F6FF] p-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DCE6FF] bg-white">
                    <CalendarCheck className="h-4 w-4 text-[#2D5BFF]" />
                  </div>
                  <div>
                    <p className="text-[12px] font-semibold text-[#0B1020]">Cleaning appointment booked</p>
                    <p className="text-[11px] text-[#5B6480]">Dr. Kapoor · Saturday, 10:15 AM</p>
                  </div>
                </div>
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                  Confirmed
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2 border-t border-[#EEF2FB] bg-white px-4 py-2.5">
          <Mic className="h-3.5 w-3.5 text-[#2D5BFF]" />
          <div className="flex flex-1 items-center gap-0.5">
            {Array.from({ length: 22 }).map((_, i) => (
              <motion.span
                key={i}
                className="w-[3px] rounded-full bg-[#2D5BFF]/60"
                animate={reduce ? { height: 4 } : { height: [4, 6 + ((i * 7) % 12), 4] }}
                transition={{ duration: 1.1, repeat: Infinity, delay: (i * 0.05) % 0.9, ease: "easeInOut" }}
                style={{ height: 4 }}
              />
            ))}
          </div>
          <span className="text-[10px] font-medium text-[#5B6480]">Transcribing</span>
        </div>
      </div>

      <AnimatePresence>
        {showWA && (
          <motion.div
            initial={{ opacity: 0, x: 20, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.4 }}
            className="absolute -bottom-8 -right-4 hidden w-64 rounded-2xl border border-[#E6ECFA] bg-white p-3 shadow-[0_20px_50px_-20px_rgba(45,91,255,0.35)] md:block"
          >
            <div className="flex items-center gap-2 border-b border-[#EEF2FB] pb-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50">
                <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
              </div>
              <div>
                <p className="text-[11px] font-semibold text-[#0B1020]">WhatsApp · LeadNest</p>
                <p className="text-[10px] text-[#5B6480]">Sent · just now</p>
              </div>
            </div>
            <div className="mt-2 rounded-xl rounded-tl-sm bg-emerald-50 p-2.5 text-[11px] leading-relaxed text-emerald-800">
              ✅ Cleaning with <b>Dr. Kapoor</b> confirmed for Sat 10:15 AM. Clinic address & directions ↗
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, x: -20, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute -top-4 -left-6 hidden w-60 rounded-2xl border border-[#E6ECFA] bg-white p-3 shadow-[0_20px_50px_-20px_rgba(45,91,255,0.3)] lg:block"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EAF1FF]">
            <PhoneMissed className="h-3.5 w-3.5 text-[#2D5BFF]" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#0B1020]">Missed call recovered</p>
            <p className="text-[10px] text-[#5B6480]">After-hours · auto-replied on WhatsApp</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* -------------------------------------------------------------------------- */
/*  Pain points                                                               */
/* -------------------------------------------------------------------------- */

const painFeatures: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: PhoneMissed, title: "Recover missed patient calls", desc: "Every missed dental call is answered, triaged and re-engaged on WhatsApp within seconds." },
  { icon: Clock, title: "Handle after-hours inquiries 24/7", desc: "Patients calling at 11 PM or on Sundays still get a real answer and a booking — not voicemail." },
  { icon: Users, title: "Reduce front-desk overload", desc: "Receptionists stop juggling 4 calls at once and focus on patients in the waiting area." },
  { icon: Globe2, title: "Multilingual patient communication", desc: "English, Hindi and major regional languages — patients speak naturally, AI understands." },
  { icon: CalendarCheck, title: "Booking, rescheduling & cancellations", desc: "Slots are checked, locked or moved in your PMS during the conversation." },
  { icon: Bell, title: "Reminders & treatment follow-ups", desc: "Appointment reminders, treatment-plan nudges and review requests — fewer no-shows." },
]

function Features() {
  return (
    <section className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 max-w-2xl"
        >
          <motion.div variants={fadeUp}>
            <Eyebrow>What dental practices solve with PixoraNest</Eyebrow>
          </motion.div>
          <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-bold tracking-tight text-[#0B1020] md:text-4xl">
            Built for the operational reality of a busy dental clinic.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {painFeatures.map((f) => {
            const Icon = f.icon
            return (
              <motion.div key={f.title} variants={fadeUp}>
                <Card className="h-full p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#DCE6FF] bg-gradient-to-br from-[#EAF1FF] to-white text-[#2D5BFF]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-[#0B1020]">{f.title}</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6480]">{f.desc}</p>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Workflow                                                                  */
/* -------------------------------------------------------------------------- */

const workflowSteps: { icon: LucideIcon; title: string; desc: string; tag: string }[] = [
  { icon: PhoneIncoming, title: "Patient Call", desc: "Inbound call from any number, any hour.", tag: "Inbound" },
  { icon: Mic, title: "AI Receptionist", desc: "FirstVoice answers, understands intent, qualifies.", tag: "FirstVoice" },
  { icon: CalendarCheck, title: "Dental Booking", desc: "Cleaning, consultation or treatment booked in real time.", tag: "FirstVoice" },
  { icon: MessageCircle, title: "WhatsApp Confirmation", desc: "Instant confirmation with address & dentist info.", tag: "LeadNest" },
  { icon: Bell, title: "Reminder", desc: "Automated reminder before the visit reduces no-shows.", tag: "LeadNest" },
  { icon: Send, title: "Follow-Up", desc: "Post-treatment care message and rebooking nudge.", tag: "LeadNest" },
  { icon: Smile, title: "Review Request", desc: "Happy patient nudged to leave a Google review.", tag: "LeadNest" },
]

function ClinicWorkflow() {
  return (
    <section className="relative bg-[#F3F6FF]/60 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14 max-w-2xl"
        >
          <motion.div variants={fadeUp}>
            <Eyebrow>Patient journey</Eyebrow>
          </motion.div>
          <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-bold tracking-tight text-[#0B1020] md:text-4xl">
            One automated journey — from missed call to loyal dental patient.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 text-[#5B6480]">
            Every step runs on its own. Your front desk stops firefighting and focuses on patients in the chair.
          </motion.p>
        </motion.div>

        <div className="relative">
          <div className="pointer-events-none absolute left-0 right-0 top-[58px] hidden h-px bg-gradient-to-r from-transparent via-[#2D5BFF]/40 to-transparent lg:block" />

          <motion.ol
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-7"
          >
            {workflowSteps.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.li key={s.title} variants={fadeUp} className="relative">
                  <Card className="h-full p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#DCE6FF] bg-[#EAF1FF]">
                        <Icon className="h-4 w-4 text-[#2D5BFF]" />
                      </div>
                      <span className="text-[10px] font-semibold tracking-wider text-[#9AA3BD]">0{i + 1}</span>
                    </div>
                    <p className="text-sm font-semibold text-[#0B1020]">{s.title}</p>
                    <p className="mt-1 text-[12px] leading-relaxed text-[#5B6480]">{s.desc}</p>
                    <p className="mt-3 inline-flex items-center gap-1 rounded-full border border-[#DCE6FF] bg-white px-2 py-0.5 text-[10px] font-medium text-[#2D5BFF]">
                      <span className="h-1 w-1 rounded-full bg-[#2D5BFF]" />
                      {s.tag}
                    </p>
                  </Card>
                  {i < workflowSteps.length - 1 && (
                    <ChevronRight className="absolute -right-3 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-[#B6C2E0] lg:block" />
                  )}
                </motion.li>
              )
            })}
          </motion.ol>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Products focus — FirstVoice + LeadNest + CallOrbit                        */
/* -------------------------------------------------------------------------- */

function FirstVoiceMock() {
  return (
    <div className="rounded-xl border border-[#E6ECFA] bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <p className="text-[11px] font-semibold text-[#0B1020]">Live dental call · Hindi</p>
        </div>
        <span className="rounded-full border border-[#DCE6FF] bg-[#EAF1FF] px-2 py-0.5 text-[10px] font-semibold text-[#2D5BFF]">
          EN · HI · TA
        </span>
      </div>
      <div className="mt-3 flex items-end gap-0.5">
        {Array.from({ length: 32 }).map((_, i) => (
          <motion.span
            key={i}
            className="w-[3px] rounded-full bg-[#2D5BFF]/70"
            animate={{ height: [4, 4 + ((i * 11) % 18), 4] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: (i * 0.04) % 1, ease: "easeInOut" }}
            style={{ height: 4 }}
          />
        ))}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2 text-center">
        <div className="rounded-lg border border-[#E6ECFA] bg-[#FAFBFF] px-2 py-1.5">
          <p className="text-[9px] text-[#5B6480]">Intent</p>
          <p className="text-[11px] font-semibold text-[#0B1020]">Cleaning</p>
        </div>
        <div className="rounded-lg border border-[#E6ECFA] bg-[#FAFBFF] px-2 py-1.5">
          <p className="text-[9px] text-[#5B6480]">Dentist</p>
          <p className="text-[11px] font-semibold text-[#0B1020]">Dr. Kapoor</p>
        </div>
        <div className="rounded-lg border border-[#E6ECFA] bg-[#FAFBFF] px-2 py-1.5">
          <p className="text-[9px] text-[#5B6480]">Slot</p>
          <p className="text-[11px] font-semibold text-[#0B1020]">Sat 10:15</p>
        </div>
      </div>
    </div>
  )
}

function LeadNestMock() {
  return (
    <div className="space-y-1.5 rounded-xl border border-[#E6ECFA] bg-white p-4">
      <div className="rounded-lg rounded-tl-sm bg-emerald-50 px-2.5 py-1.5 text-[11px] text-emerald-800">
        ✅ Cleaning confirmed · Sat 10:15 AM
      </div>
      <div className="ml-auto w-max rounded-lg rounded-tr-sm bg-[#F3F6FF] px-2.5 py-1.5 text-[11px] text-[#0B1020]">
        Thanks!
      </div>
      <div className="rounded-lg rounded-tl-sm bg-emerald-50 px-2.5 py-1.5 text-[11px] text-emerald-800">
        Reminder · tomorrow morning, avoid eating 1 hr before
      </div>
      <div className="rounded-lg rounded-tl-sm bg-emerald-50 px-2.5 py-1.5 text-[11px] text-emerald-800">
        Post-visit care · reply 1 to book a Google review
      </div>
    </div>
  )
}

function CallOrbitMock() {
  return (
    <div className="rounded-xl border border-[#E6ECFA] bg-white p-4">
      <div className="space-y-2">
        <div className="flex items-center justify-between rounded-lg border border-rose-200 bg-rose-50/60 px-3 py-2">
          <div className="flex items-center gap-2">
            <PhoneForwarded className="h-3.5 w-3.5 text-rose-600" />
            <p className="text-[11px] font-semibold text-[#0B1020]">Emergency · severe pain</p>
          </div>
          <span className="text-[10px] font-semibold text-rose-600">→ On-call dentist</span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-[#DCE6FF] bg-[#F3F6FF] px-3 py-2">
          <div className="flex items-center gap-2">
            <PhoneForwarded className="h-3.5 w-3.5 text-[#2D5BFF]" />
            <p className="text-[11px] font-semibold text-[#0B1020]">VIP patient · implants</p>
          </div>
          <span className="text-[10px] font-semibold text-[#2D5BFF]">→ Dr. Iyer</span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-[#E6ECFA] bg-[#FAFBFF] px-3 py-2">
          <div className="flex items-center gap-2">
            <PhoneForwarded className="h-3.5 w-3.5 text-[#5B6480]" />
            <p className="text-[11px] font-semibold text-[#0B1020]">Routine · Andheri branch</p>
          </div>
          <span className="text-[10px] font-semibold text-[#5B6480]">→ FirstVoice</span>
        </div>
      </div>
    </div>
  )
}

function ProductsFocus() {
  const cards = [
    {
      tag: "Voice AI · core",
      icon: Mic,
      name: "FirstVoice",
      headline: "AI receptionist for every dental call.",
      points: [
        "Natural voice in English, Hindi & regional languages",
        "Understands cleaning, consult, treatment, emergency",
        "Books directly into your dental PMS or calendar",
        "Handles after-hours patient inquiries 24/7",
      ],
      mock: <FirstVoiceMock />,
    },
    {
      tag: "WhatsApp automation",
      icon: MessageCircle,
      name: "LeadNest",
      headline: "Patient conversations on WhatsApp.",
      points: [
        "Instant booking confirmations with clinic address",
        "Smart reminders before the dental appointment",
        "Auto-recovers missed calls with a booking link",
        "Post-treatment follow-ups and review nudges",
      ],
      mock: <LeadNestMock />,
    },
    {
      tag: "Call routing",
      icon: PhoneCall,
      name: "CallOrbit",
      headline: "Right call, right dentist, right branch.",
      points: [
        "Routes emergency dental calls to the on-call dentist",
        "Transfers VIP patients to their preferred dentist",
        "Manages multi-location clinics across branches",
        "Falls back to FirstVoice for routine inquiries",
      ],
      mock: <CallOrbitMock />,
    },
  ]

  return (
    <section className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 max-w-2xl"
        >
          <motion.div variants={fadeUp}>
            <Eyebrow>The PixoraNest stack for dental practices</Eyebrow>
          </motion.div>
          <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-bold tracking-tight text-[#0B1020] md:text-4xl">
            Three products. One AI front desk for your clinic.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 text-[#5B6480]">
            Start with FirstVoice on your clinic line. Add LeadNest for WhatsApp confirmations and reminders. Use CallOrbit to route emergencies and VIPs intelligently.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-5 lg:grid-cols-3"
        >
          {cards.map((p) => {
            const Icon = p.icon
            return (
              <motion.div key={p.name} variants={fadeUp}>
                <Card className="group h-full bg-gradient-to-br from-white via-white to-[#F3F6FF] p-6 md:p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2D5BFF] text-white shadow-[0_12px_30px_-10px_rgba(45,91,255,0.6)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-[#0B1020]">{p.name}</p>
                      <p className="text-[11px] font-medium text-[#5B6480]">{p.tag}</p>
                    </div>
                  </div>
                  <p className="mt-5 text-lg font-semibold leading-snug text-[#0B1020]">{p.headline}</p>
                  <ul className="mt-4 space-y-2">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-[13px] text-[#0B1020]">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2D5BFF]" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6">{p.mock}</div>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mt-6"
        >
          <Card className="flex items-center gap-3 p-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#DCE6FF] bg-[#EAF1FF]">
              <Activity className="h-4 w-4 text-[#2D5BFF]" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#0B1020]">EchoAssist · overflow & feedback</p>
              <p className="text-[11px] text-[#5B6480]">Handles overflow, after-hours load and post-treatment feedback at scale.</p>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  FAQ                                                                       */
/* -------------------------------------------------------------------------- */

function FAQSection({ faqs, heading = "Questions dental practice owners ask us." }: { faqs: FAQ[]; heading?: string }) {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <section className="relative bg-[#F3F6FF]/60 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-3xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-10 text-center"
        >
          <motion.div variants={fadeUp} className="flex justify-center">
            <Eyebrow>FAQ</Eyebrow>
          </motion.div>
          <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-bold tracking-tight text-[#0B1020] md:text-4xl">
            {heading}
          </motion.h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i
            return (
              <Card key={i} className={`overflow-hidden ${isOpen ? "border-[#2D5BFF]/40" : ""}`}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-[#0B1020]">{f.q}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#DCE6FF] bg-white text-[#2D5BFF]"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-5 pb-5 text-sm leading-relaxed text-[#5B6480]">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  CTA                                                                       */
/* -------------------------------------------------------------------------- */

function CTA() {
  return (
    <section className="relative px-6 pb-28 pt-8">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl border border-[#DCE6FF] bg-gradient-to-br from-white via-[#F3F6FF] to-[#EAF1FF] p-10 shadow-[0_30px_80px_-40px_rgba(45,91,255,0.5)] md:p-14">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[80%] -translate-x-1/2 rounded-full bg-[#2D5BFF]/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-[#2D5BFF]/10 blur-3xl" />
          <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <Eyebrow>AI Front Desk for Dental Practices</Eyebrow>
              <h3 className="mt-4 text-3xl font-bold tracking-tight text-[#0B1020] md:text-4xl">
                Never miss another dental appointment call.
              </h3>
              <p className="mt-3 max-w-xl text-[#5B6480]">
                Talk to our team about deploying an AI receptionist for your dental practice. Setup is guided end-to-end — no change to your existing clinic phone number.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-end">
              <PrimaryButton href="/contact">
                Book a free demo <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
              <GhostButton href="/pricing">See pricing</GhostButton>
            </div>
          </div>
          <p className="relative mt-6 text-xs text-[#5B6480]">
            No credit card · 15-min walkthrough · Cancel anytime
          </p>
        </div>
      </div>
    </section>
  )
}

/* -------------------------------------------------------------------------- */
/*  Generic (non-dental) layout                                               */
/* -------------------------------------------------------------------------- */

function GenericLayout({ industry }: { industry: Industry }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-[#0B1020]">
      <SoftBackground />
      <section className="relative px-6 pt-32 pb-20">
        <div className="mx-auto max-w-5xl text-center">
          <Eyebrow>{industry.name}</Eyebrow>
          <h1 className="mt-5 text-4xl font-bold tracking-tight md:text-6xl">
            AI automation for{" "}
            <span className="bg-gradient-to-r from-[#2D5BFF] to-[#6E8BFF] bg-clip-text text-transparent">
              {industry.name.toLowerCase()}
            </span>
            .
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-[#5B6480]">
            {industry.description ??
              "PixoraNest helps teams capture every lead, automate follow-ups and run their operations on a single, calm dashboard."}
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <PrimaryButton href="/contact">
              Book a demo <ArrowRight className="h-4 w-4" />
            </PrimaryButton>
            <GhostButton href="/pricing">See pricing</GhostButton>
          </div>
        </div>
      </section>
      <Features />
      <CTA />
    </main>
  )
}

/* -------------------------------------------------------------------------- */
/*  Dental clinic layout                                                      */
/* -------------------------------------------------------------------------- */

function ClinicLayout({ industry }: { industry: Industry }) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-[#0B1020]">
      <SoftBackground />

      <section className="relative px-6 pt-28 pb-24 md:pt-36">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.nav
              variants={fadeUp}
              className="mb-6 flex items-center gap-1.5 text-[12px] text-[#5B6480]"
            >
              <Link href="/" className="hover:text-[#0B1020]">PixoraNest</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/industries" className="hover:text-[#0B1020]">Industries</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="font-medium text-[#0B1020]">{industry.name}</span>
            </motion.nav>

            <motion.div variants={fadeUp}>
              <Eyebrow>
                <Smile className="h-3 w-3" />
                AI Front Desk for Dental Practices
              </Eyebrow>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-[#0B1020] md:text-6xl"
            >
              Never miss another{" "}
              <span className="bg-gradient-to-r from-[#2D5BFF] to-[#6E8BFF] bg-clip-text text-transparent">
                dental appointment call.
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-5 max-w-xl text-base leading-relaxed text-[#5B6480] md:text-lg">
              PixoraNest answers every patient call with a natural-voice AI receptionist, books cleanings, consultations and treatments in real time, and follows up on WhatsApp — so your front desk stops drowning and your clinic stops losing patients.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
              <PrimaryButton href="/contact">
                Book a free demo <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
              <GhostButton href="/pricing">See how it works</GhostButton>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-wrap items-center gap-2 text-[12px] text-[#5B6480]"
            >
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E6ECFA] bg-white px-3 py-1.5">
                <Shield className="h-3.5 w-3.5 text-[#2D5BFF]" /> Healthcare-grade data handling
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E6ECFA] bg-white px-3 py-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#2D5BFF]" /> Guided setup
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E6ECFA] bg-white px-3 py-1.5">
                <Globe2 className="h-3.5 w-3.5 text-[#2D5BFF]" /> Multilingual
              </span>
            </motion.div>
          </motion.div>

          <HeroConsole />
        </div>
      </section>

      <Features />
      <ProductsFocus />
      <ClinicWorkflow />

      <FAQSection faqs={clinicFaqs} />
      <CTA />
    </main>
  )
}

/* ========================================================================== */
/*  REAL ESTATE — redesigned layout                                           */
/*  Brand: #2D5BFF · #EAF1FF · #F3F6FF · #0B1020 · #5B6480                    */
/*  Glassmorphism + Framer Motion + JSON-LD (FAQ + Breadcrumb)                */
/* ========================================================================== */

/* ---------- Hero animated pipeline ---------- */

const reHeroSteps = [
  { icon: PhoneIncoming, label: "Property Inquiry", tag: "Inbound" },
  { icon: Mic, label: "FirstVoice Qualifies", tag: "FirstVoice" },
  { icon: Database, label: "LeadNest Captures", tag: "LeadNest" },
  { icon: GitBranch, label: "CallOrbit Routes", tag: "CallOrbit" },
  { icon: Key, label: "Site Visit Booked", tag: "Converted" },
]

function RealEstateHeroFlow() {
  const reduce = useReducedMotion()
  const [active, setActive] = useState(0)
  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => setActive((a) => (a + 1) % reHeroSteps.length), 1600)
    return () => window.clearInterval(id)
  }, [reduce])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className="relative"
    >
      <div className="pointer-events-none absolute -inset-10 -z-10">
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2D5BFF]/20 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-[#6E8BFF]/15 blur-3xl" />
      </div>

      {/* Glassmorphism panel */}
      <div className="overflow-hidden rounded-3xl border border-white/60 bg-white/70 p-6 shadow-[0_30px_80px_-30px_rgba(45,91,255,0.45)] backdrop-blur-xl">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <p className="text-[12px] font-semibold text-[#0B1020]">Live property lead pipeline</p>
          </div>
          <span className="rounded-full border border-[#DCE6FF] bg-[#EAF1FF] px-2 py-0.5 text-[10px] font-semibold text-[#2D5BFF]">
            Avg response · 8s
          </span>
        </div>

        <ol className="space-y-2">
          {reHeroSteps.map((s, i) => {
            const Icon = s.icon
            const isActive = i === active
            const isDone = i < active
            return (
              <li key={s.label}>
                <motion.div
                  animate={{
                    backgroundColor: isActive ? "rgba(234,241,255,0.95)" : "rgba(255,255,255,0.8)",
                    borderColor: isActive ? "#2D5BFF" : "rgba(230,236,250,1)",
                  }}
                  transition={{ duration: 0.4 }}
                  className="flex items-center justify-between rounded-xl border px-3.5 py-3 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      animate={{ scale: isActive ? 1.05 : 1 }}
                      className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                        isActive || isDone
                          ? "bg-[#2D5BFF] text-white shadow-[0_8px_20px_-6px_rgba(45,91,255,0.6)]"
                          : "border border-[#DCE6FF] bg-[#EAF1FF] text-[#2D5BFF]"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </motion.div>
                    <div>
                      <p className="text-[13px] font-semibold text-[#0B1020]">{s.label}</p>
                      <p className="text-[11px] text-[#5B6480]">{s.tag}</p>
                    </div>
                  </div>
                  {(isActive || isDone) && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-[#2D5BFF]"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </motion.span>
                  )}
                </motion.div>
                {i < reHeroSteps.length - 1 && (
                  <div className="my-1 ml-7 h-3 w-px bg-gradient-to-b from-[#2D5BFF]/40 to-transparent" />
                )}
              </li>
            )
          })}
        </ol>

        <div className="mt-5 grid grid-cols-3 gap-2">
          {[
            { l: "Conversion", v: "34%" },
            { l: "Missed calls", v: "2%" },
            { l: "Response", v: "Instant" },
          ].map((m) => (
            <div key={m.l} className="rounded-lg border border-white/60 bg-white/60 p-2.5 text-center backdrop-blur">
              <p className="text-[10px] text-[#5B6480]">{m.l}</p>
              <p className="text-sm font-bold text-[#0B1020]">{m.v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating glass chip — agent notification */}
      <motion.div
        initial={{ opacity: 0, x: -20, y: -10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="absolute -top-4 -left-6 hidden w-60 rounded-2xl border border-white/60 bg-white/70 p-3 shadow-[0_20px_50px_-20px_rgba(45,91,255,0.3)] backdrop-blur-xl lg:block"
      >
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#EAF1FF]">
            <Bell className="h-3.5 w-3.5 text-[#2D5BFF]" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#0B1020]">Hot lead assigned</p>
            <p className="text-[10px] text-[#5B6480]">3BHK · Whitefield · ₹1.4Cr</p>
          </div>
        </div>
      </motion.div>

      {/* Floating glass chip — WhatsApp confirmation */}
      <motion.div
        initial={{ opacity: 0, x: 20, y: 10 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="absolute -bottom-6 -right-4 hidden w-64 rounded-2xl border border-white/60 bg-white/70 p-3 shadow-[0_20px_50px_-20px_rgba(45,91,255,0.35)] backdrop-blur-xl md:block"
      >
        <div className="flex items-center gap-2 border-b border-[#EEF2FB] pb-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50">
            <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-[#0B1020]">WhatsApp · LeadNest</p>
            <p className="text-[10px] text-[#5B6480]">Sent · just now</p>
          </div>
        </div>
        <div className="mt-2 rounded-xl rounded-tl-sm bg-emerald-50 p-2.5 text-[11px] leading-relaxed text-emerald-800">
          ✅ Site visit booked · <b>Sat 11:00 AM</b> · Pin & directions ↗
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ---------- Glass card primitive (RE-scoped) ---------- */

function GlassCard({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={`relative rounded-2xl border border-white/60 bg-white/60 shadow-[0_10px_40px_-20px_rgba(45,91,255,0.28)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-[#2D5BFF]/30 hover:bg-white/80 hover:shadow-[0_20px_60px_-20px_rgba(45,91,255,0.4)] ${className}`}
    >
      {children}
    </div>
  )
}

/* ---------- Industry problems ---------- */

const reChallenges: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: PhoneMissed, title: "Missed Property Calls", desc: "Buyers calling outside office hours hang up and book a viewing on a competitor's listing instead." },
  { icon: Timer, title: "Slow Lead Follow-Ups", desc: "Real estate leads contacted after 5 minutes convert 80% less. Most agencies take hours." },
  { icon: Network, title: "Lead Leakage Across Channels", desc: "Inquiries stuck in agent WhatsApps, sticky notes, and forgotten email threads — no real estate lead tracking." },
  { icon: UserCog, title: "Manual Lead Assignment", desc: "Round-robin routing sends VIP buyers to junior agents and stalls hot deals across multiple branches." },
  { icon: Clock, title: "No After-Hours Coverage", desc: "Property buyers research at night and on weekends — your team doesn't, and your competitor does." },
  { icon: TrendingUp, title: "Poor Conversion Rates", desc: "Cold pipelines, weak real estate lead nurturing and inconsistent follow-up kill closing rates." },
]

function ReChallenges() {
  return (
    <section className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 max-w-2xl"
        >
          <motion.div variants={fadeUp}><Eyebrow>Industry challenges</Eyebrow></motion.div>
          <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-bold tracking-tight text-[#0B1020] md:text-4xl">
            The leakage costing real estate agencies their pipeline.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 text-[#5B6480]">
            Property buyers move fast. Without real estate lead management software, every minute of delay is a lost deal.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {reChallenges.map((f) => {
            const Icon = f.icon
            return (
              <motion.div key={f.title} variants={fadeUp}>
                <GlassCard className="h-full p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#DCE6FF] bg-gradient-to-br from-[#EAF1FF] to-white text-[#2D5BFF]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-[#0B1020]">{f.title}</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6480]">{f.desc}</p>
                </GlassCard>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- How it works ---------- */

const reHowSteps: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: PhoneIncoming, title: "Lead Comes In", desc: "Call, WhatsApp, web form, or portal inquiry from any source, any hour." },
  { icon: Mic, title: "FirstVoice Answers", desc: "AI receptionist for real estate greets, identifies the property, and qualifies intent." },
  { icon: Database, title: "LeadNest Stores & Qualifies", desc: "Lead enters your property CRM with budget, project and stage tagged automatically." },
  { icon: GitBranch, title: "CallOrbit Routes", desc: "Real estate call routing software sends the lead to the right agent, branch and project." },
  { icon: Key, title: "Agent Converts", desc: "Agent receives a hot, qualified lead and closes faster — site visit already booked." },
]

function ReHowItWorks() {
  return (
    <section className="relative bg-[#F3F6FF]/60 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-14 max-w-2xl"
        >
          <motion.div variants={fadeUp}><Eyebrow>How it works</Eyebrow></motion.div>
          <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-bold tracking-tight text-[#0B1020] md:text-4xl">
            From property inquiry to closed deal — fully automated.
          </motion.h2>
        </motion.div>

        <div className="relative">
          <div className="pointer-events-none absolute left-0 right-0 top-[58px] hidden h-px bg-gradient-to-r from-transparent via-[#2D5BFF]/40 to-transparent lg:block" />
          <motion.ol
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
          >
            {reHowSteps.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.li key={s.title} variants={fadeUp} className="relative">
                  <GlassCard className="h-full p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#DCE6FF] bg-[#EAF1FF]">
                        <Icon className="h-4 w-4 text-[#2D5BFF]" />
                      </div>
                      <span className="text-[10px] font-semibold tracking-wider text-[#9AA3BD]">STEP 0{i + 1}</span>
                    </div>
                    <p className="text-sm font-semibold text-[#0B1020]">{s.title}</p>
                    <p className="mt-1 text-[12px] leading-relaxed text-[#5B6480]">{s.desc}</p>
                  </GlassCard>
                  {i < reHowSteps.length - 1 && (
                    <ChevronRight className="absolute -right-3 top-1/2 hidden h-4 w-4 -translate-y-1/2 text-[#B6C2E0] lg:block" />
                  )}
                </motion.li>
              )
            })}
          </motion.ol>
        </div>
      </div>
    </section>
  )
}

/* ---------- Products section (FirstVoice + LeadNest + CallOrbit) ---------- */

const reSolutions = [
  {
    tag: "AI Receptionist · Voice",
    icon: Mic,
    name: "FirstVoice",
    headline: "AI receptionist for real estate.",
    href: "/solutions/firstvoice",
    desc: "A 24/7 real estate phone answering service that answers, qualifies, and books site visits.",
    points: [
      "24/7 property call answering",
      "Buyer intent & budget qualification",
      "Site visit scheduling",
      "Multilingual property inquiry handling",
    ],
  },
  {
    tag: "CRM · Lead automation",
    icon: Database,
    name: "LeadNest",
    headline: "Real estate CRM & lead management.",
    href: "/solutions/leadnest",
    desc: "A property CRM built for real estate lead tracking, nurturing and pipeline management.",
    points: [
      "Visual real estate sales pipeline",
      "Automated lead nurturing sequences",
      "WhatsApp + email follow-ups",
      "Multi-source lead capture",
    ],
  },
  {
    tag: "Call Routing · Multi-branch",
    icon: GitBranch,
    name: "CallOrbit",
    headline: "Real estate call routing software.",
    href: "/solutions/callorbit",
    desc: "Intent-based routing across projects, branches and agents — zero lost handoffs.",
    points: [
      "Intent-based call routing",
      "Per-project & per-branch rules",
      "VIP buyer prioritisation",
      "Smart IVR with fallback to FirstVoice",
    ],
  },
]

function ReSolutions() {
  return (
    <section className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 max-w-2xl"
        >
          <motion.div variants={fadeUp}><Eyebrow>The PixoraNest stack</Eyebrow></motion.div>
          <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-bold tracking-tight text-[#0B1020] md:text-4xl">
            One platform. Three automation systems.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 text-[#5B6480]">
            Replace your real estate answering service, real estate CRM software, and call routing software with a single platform purpose-built for property businesses.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-5 lg:grid-cols-3"
        >
          {reSolutions.map((p) => {
            const Icon = p.icon
            return (
              <motion.div key={p.name} variants={fadeUp}>
                <GlassCard className="group flex h-full flex-col bg-gradient-to-br from-white/80 via-white/70 to-[#F3F6FF]/60 p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2D5BFF] text-white shadow-[0_12px_30px_-10px_rgba(45,91,255,0.6)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-base font-bold text-[#0B1020]">{p.name}</p>
                      <p className="text-[11px] font-medium text-[#5B6480]">{p.tag}</p>
                    </div>
                  </div>
                  <p className="mt-5 text-lg font-semibold leading-snug text-[#0B1020]">{p.headline}</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#5B6480]">{p.desc}</p>
                  <ul className="mt-4 flex-1 space-y-2">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-[13px] text-[#0B1020]">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2D5BFF]" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={p.href}
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2D5BFF] transition-all hover:gap-2.5"
                  >
                    Explore {p.name} <ArrowRight className="h-4 w-4" />
                  </Link>
                </GlassCard>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- Benefits ---------- */

const reBenefits: { icon: LucideIcon; title: string; stat: string; desc: string }[] = [
  { icon: TrendingUp, title: "Increase Lead Conversion", stat: "+183%", desc: "From an industry-average 12% to 34% close rate with faster real estate lead conversion." },
  { icon: PhoneCall, title: "Never Miss Property Calls", stat: "98%", desc: "Calls answered — even at 11 PM on a Sunday — by an always-on real estate answering service." },
  { icon: Timer, title: "Faster Lead Response", stat: "8s", desc: "From hours to seconds. Hot property leads stay hot and convert before competitors call." },
  { icon: WorkflowIcon, title: "Automate Follow-Ups", stat: "100%", desc: "Every property lead nurtured by WhatsApp & email — no agent reminder required." },
  { icon: Activity, title: "Reduce Manual Work", stat: "−60%", desc: "Free agents from data entry and admin so they focus on closing site visits and deals." },
  { icon: Sparkles, title: "Scale Without Hiring", stat: "10x", desc: "Handle 10x the inquiry volume with the same agent headcount through property management automation." },
]

function ReBenefits() {
  return (
    <section className="relative bg-[#F3F6FF]/60 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 max-w-2xl"
        >
          <motion.div variants={fadeUp}><Eyebrow>Benefits</Eyebrow></motion.div>
          <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-bold tracking-tight text-[#0B1020] md:text-4xl">
            Why real estate businesses choose PixoraNest.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {reBenefits.map((b) => {
            const Icon = b.icon
            return (
              <motion.div key={b.title} variants={fadeUp}>
                <GlassCard className="h-full p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#DCE6FF] bg-gradient-to-br from-[#EAF1FF] to-white text-[#2D5BFF]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <p className="bg-gradient-to-r from-[#2D5BFF] to-[#6E8BFF] bg-clip-text text-2xl font-bold tracking-tight text-transparent">
                      {b.stat}
                    </p>
                  </div>
                  <p className="mt-4 text-sm font-semibold text-[#0B1020]">{b.title}</p>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-[#5B6480]">{b.desc}</p>
                </GlassCard>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- Workflow Visualization (animated, distinct from How It Works) ---------- */

const reWorkflowNodes: { icon: LucideIcon; label: string; sub: string; lane: "lead" | "ai" | "crm" | "agent" }[] = [
  { icon: Search, label: "Portal Inquiry", sub: "99acres / MagicBricks / Web", lane: "lead" },
  { icon: PhoneIncoming, label: "Inbound Call", sub: "Any number, any hour", lane: "lead" },
  { icon: Mic, label: "FirstVoice", sub: "Qualifies in 8 seconds", lane: "ai" },
  { icon: Database, label: "LeadNest CRM", sub: "Tagged · scored · stored", lane: "crm" },
  { icon: GitBranch, label: "CallOrbit", sub: "Routes by intent + project", lane: "crm" },
  { icon: Send, label: "WhatsApp Drip", sub: "Nurture sequence triggered", lane: "crm" },
  { icon: UserCog, label: "Agent Notified", sub: "Hot lead in their queue", lane: "agent" },
  { icon: Key, label: "Site Visit Booked", sub: "Calendar synced both ways", lane: "agent" },
]

const laneColor: Record<string, string> = {
  lead: "from-[#EAF1FF] to-white",
  ai: "from-[#2D5BFF] to-[#6E8BFF]",
  crm: "from-[#F3F6FF] to-[#EAF1FF]",
  agent: "from-emerald-50 to-white",
}

function ReWorkflowViz() {
  const reduce = useReducedMotion()
  const [pulse, setPulse] = useState(0)
  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => setPulse((p) => (p + 1) % reWorkflowNodes.length), 1200)
    return () => window.clearInterval(id)
  }, [reduce])

  return (
    <section className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 max-w-2xl"
        >
          <motion.div variants={fadeUp}><Eyebrow>Workflow visualization</Eyebrow></motion.div>
          <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-bold tracking-tight text-[#0B1020] md:text-4xl">
            The full real estate automation workflow, end to end.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 text-[#5B6480]">
            Every property inquiry flows through one orchestrated pipeline — from first touch to booked site visit.
          </motion.p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/60 p-6 shadow-[0_30px_80px_-30px_rgba(45,91,255,0.3)] backdrop-blur-xl md:p-10"
        >
          <div className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[80%] -translate-x-1/2 rounded-full bg-[#2D5BFF]/10 blur-3xl" />

          <div className="relative grid grid-cols-2 gap-3 md:grid-cols-4">
            {reWorkflowNodes.map((n, i) => {
              const Icon = n.icon
              const isActive = i === pulse
              const isAI = n.lane === "ai"
              return (
                <motion.div
                  key={n.label}
                  animate={{ scale: isActive ? 1.03 : 1, y: isActive ? -2 : 0 }}
                  transition={{ duration: 0.4 }}
                  className={`relative rounded-2xl border bg-gradient-to-br ${laneColor[n.lane]} p-4 backdrop-blur ${
                    isActive ? "border-[#2D5BFF] shadow-[0_15px_40px_-15px_rgba(45,91,255,0.55)]" : "border-white/70"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      isAI ? "bg-white/20 text-white" : "border border-[#DCE6FF] bg-white text-[#2D5BFF]"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <p className={`mt-3 text-sm font-semibold ${isAI ? "text-white" : "text-[#0B1020]"}`}>{n.label}</p>
                  <p className={`mt-0.5 text-[11px] leading-relaxed ${isAI ? "text-white/80" : "text-[#5B6480]"}`}>{n.sub}</p>
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="absolute right-3 top-3"
                    >
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2D5BFF] opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2D5BFF]" />
                      </span>
                    </motion.span>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Lane legend */}
          <div className="mt-8 flex flex-wrap items-center gap-3 text-[11px] text-[#5B6480]">
            <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#EAF1FF] ring-1 ring-[#2D5BFF]/30" /> Lead source</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#2D5BFF]" /> AI layer (FirstVoice)</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-[#F3F6FF] ring-1 ring-[#2D5BFF]/30" /> CRM & routing</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-emerald-100 ring-1 ring-emerald-500/40" /> Agent action</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- Case Study ---------- */

const reCaseMetrics = [
  { metric: "Lead Response Time", before: "6 Hours", after: "Instant", icon: Timer },
  { metric: "Lead Conversion", before: "12%", after: "34%", icon: Target },
  { metric: "Missed Calls", before: "38%", after: "2%", icon: PhoneMissed },
  { metric: "Agent Hours Saved / Week", before: "0", after: "120+", icon: Activity },
]

function ReCaseStudy() {
  return (
    <section className="relative bg-[#F3F6FF]/60 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 max-w-2xl"
        >
          <motion.div variants={fadeUp}><Eyebrow>Case study</Eyebrow></motion.div>
          <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-bold tracking-tight text-[#0B1020] md:text-4xl">
            How a Bengaluru property consultancy 3× conversion in 90 days.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]"
        >
          {/* Narrative card */}
          <motion.div variants={fadeUp}>
            <GlassCard className="h-full p-8 md:p-10">
              <Quote className="h-8 w-8 text-[#2D5BFF]/40" />
              <p className="mt-4 text-lg font-semibold leading-snug text-[#0B1020] md:text-xl">
                &ldquo;We were losing ~40% of inquiries to missed calls and slow follow-up. Within 60 days of going live on PixoraNest, every lead was answered in seconds, qualified, and routed to the right agent automatically. Our conversion went from 12% to 34%.&rdquo;
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-[#E6ECFA] pt-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#EAF1FF] text-[#2D5BFF]">
                  <Building2 className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#0B1020]">Sales Director</p>
                  <p className="text-[12px] text-[#5B6480]">Bengaluru property consultancy · 8 active projects</p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-xl border border-[#DCE6FF] bg-white/70 p-3 text-center backdrop-blur">
                  <p className="text-[10px] uppercase tracking-wider text-[#5B6480]">Projects</p>
                  <p className="mt-1 text-lg font-bold text-[#0B1020]">8</p>
                </div>
                <div className="rounded-xl border border-[#DCE6FF] bg-white/70 p-3 text-center backdrop-blur">
                  <p className="text-[10px] uppercase tracking-wider text-[#5B6480]">Inquiries / mo</p>
                  <p className="mt-1 text-lg font-bold text-[#0B1020]">1.2K</p>
                </div>
                <div className="rounded-xl border border-[#DCE6FF] bg-white/70 p-3 text-center backdrop-blur">
                  <p className="text-[10px] uppercase tracking-wider text-[#5B6480]">Go-live</p>
                  <p className="mt-1 text-lg font-bold text-[#0B1020]">3 days</p>
                </div>
              </div>
            </GlassCard>
          </motion.div>

          {/* Before / After metrics */}
          <motion.div variants={fadeUp} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {reCaseMetrics.map((r) => {
              const Icon = r.icon
              return (
                <GlassCard key={r.metric} className="overflow-hidden p-0">
                  <div className="flex items-center gap-3 border-b border-[#EEF2FB] px-5 py-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DCE6FF] bg-[#EAF1FF] text-[#2D5BFF]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="text-sm font-semibold text-[#0B1020]">{r.metric}</p>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-[#EEF2FB]">
                    <div className="p-5">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#5B6480]">Before</p>
                      <p className="mt-1 text-2xl font-bold tracking-tight text-[#5B6480] line-through decoration-rose-400/60">
                        {r.before}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-[#EAF1FF]/50 to-white p-5">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#2D5BFF]">After</p>
                      <p className="mt-1 bg-gradient-to-r from-[#2D5BFF] to-[#6E8BFF] bg-clip-text text-2xl font-bold tracking-tight text-transparent">
                        {r.after}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              )
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- Use cases (kept compact) ---------- */

const reUseCases: { icon: LucideIcon; title: string; desc: string }[] = [
  { icon: Building, title: "Real Estate Agencies", desc: "Capture, qualify and route every property inquiry across teams." },
  { icon: Briefcase, title: "Property Consultants", desc: "Run multi-project portfolios without losing a single lead." },
  { icon: Building2, title: "Builders & Developers", desc: "Manage hundreds of project inquiries from one dashboard." },
  { icon: Store, title: "Commercial Real Estate", desc: "Qualify enterprise tenants and route to senior brokers." },
  { icon: Home, title: "Property Management Firms", desc: "Automate tenant communication, renewals and maintenance." },
  { icon: Key, title: "Real Estate Brokers", desc: "Solo brokers run like a 10-person agency with AI as their team." },
]

function ReUseCases() {
  return (
    <section className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 max-w-2xl"
        >
          <motion.div variants={fadeUp}><Eyebrow>Use cases</Eyebrow></motion.div>
          <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-bold tracking-tight text-[#0B1020] md:text-4xl">
            Built for every real estate business.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {reUseCases.map((u) => {
            const Icon = u.icon
            return (
              <motion.div key={u.title} variants={fadeUp}>
                <GlassCard className="group h-full p-6">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#DCE6FF] bg-[#EAF1FF] text-[#2D5BFF] transition-colors group-hover:bg-[#2D5BFF] group-hover:text-white">
                      <Icon className="h-4 w-4" />
                    </div>
                    <p className="text-sm font-semibold text-[#0B1020]">{u.title}</p>
                  </div>
                  <p className="mt-3 text-[13px] leading-relaxed text-[#5B6480]">{u.desc}</p>
                </GlassCard>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- SEO long-form content (kept; H3 hierarchy under main H2) ---------- */

function ReSeoContent() {
  return (
    <section className="relative bg-[#F3F6FF]/60 px-6 py-24 md:py-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={fadeUp}><Eyebrow>The complete guide</Eyebrow></motion.div>
          <motion.h2 variants={fadeUp} className="mt-4 text-3xl font-bold tracking-tight text-[#0B1020] md:text-4xl">
            Real estate automation software, explained.
          </motion.h2>

          <motion.div
            variants={fadeUp}
            className="prose prose-slate mt-10 max-w-none text-[15px] leading-relaxed text-[#0B1020] [&_h3]:mt-10 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:tracking-tight [&_p]:mt-4 [&_p]:text-[#3a4360] [&_a]:font-semibold [&_a]:text-[#2D5BFF] [&_a]:no-underline hover:[&_a]:underline"
          >
            <p>
              The Indian real estate market generates billions of property inquiries every year, yet most agencies still lose 60–80% of them to slow response times, missed calls, and broken follow-up. <strong>Real estate automation software</strong> closes that gap — and PixoraNest is the platform purpose-built for property businesses that want to capture, qualify, and convert every lead without scaling headcount.
            </p>

            <h3>Why real estate needs automation more than any other industry</h3>
            <p>
              Property buyers don&apos;t behave like other customers. They research at midnight, compare 7+ listings before calling, and expect an instant response when they finally pick up the phone. A lead contacted within one minute is 7× more likely to convert than one contacted within an hour. Yet the average <strong>real estate lead conversion</strong> rate in India sits at just 12% — because most agencies simply can&apos;t respond fast enough across calls, WhatsApp, web forms, and listing portals simultaneously.
            </p>
            <p>
              Manual processes compound the problem. Inquiries get stuck in individual agent WhatsApp threads. Site visits are scheduled over phone tag. Follow-ups depend on whether a salesperson remembers. Hot leads cool off in hours, and by the time someone calls back, the buyer has booked elsewhere. Without proper <strong>real estate lead tracking</strong>, leakage is the default.
            </p>

            <h3>What real estate automation actually does</h3>
            <p>
              True <strong>real estate lead management</strong> automates the entire lifecycle — not just one piece of it. PixoraNest brings together three systems that traditional agencies stitch from five different tools:
            </p>
            <p>
              <Link href="/solutions/firstvoice"><strong>FirstVoice</strong></Link>
 is an <strong>AI receptionist for real estate</strong> that acts as a 24/7 <strong>real estate phone answering service</strong>. It picks up every call, identifies the property of interest, qualifies budget and intent in natural conversation, and books site visits directly into your calendar. It speaks English, Hindi, and major regional languages, and it never misses a call — not at 11 PM, not on a public holiday, not when your front desk is on lunch.
            </p>
            <p>
              <Link href="/solutions/leadnest"><strong>LeadNest</strong></Link> is the <strong>real estate CRM</strong> and <strong>real estate lead management software</strong> engine. Every call, WhatsApp message, web form submission, and portal inquiry lands in one pipeline with full context. Stages are visual and automated: New Lead → Contacted → Qualified → Site Visit Scheduled → Visited → Negotiation → Booked → Closed. Each stage triggers <strong>real estate lead nurturing</strong> sequences — WhatsApp drip campaigns, email follow-ups, site-visit reminders, post-visit nudges, and re-engagement for stalled deals.
            </p>
            <p>
              <Link href="/solutions/callorbit"><strong>CallOrbit</strong></Link> is intelligent <strong>real estate call routing software</strong> built for multi-project, multi-branch operations. Instead of round-robin chaos, CallOrbit reads the caller&apos;s intent and applies your routing rules: VIP buyers go to senior agents, commercial inquiries go to your commercial team, project-specific calls go to the dedicated project agent, and after-hours overflow goes straight to FirstVoice. No more lost handoffs, no more junior agents fumbling a high-value lead.
            </p>

            <h3>The conversion math: from 12% to 34%</h3>
            <p>
              <strong>Real estate lead conversion software</strong> works because conversion is a function of three things: response speed, lead quality at routing, and follow-up consistency. PixoraNest fixes all three. Response time drops from hours to seconds. Lead quality at routing improves because FirstVoice qualifies before transferring. Follow-up consistency hits 100% because LeadNest doesn&apos;t forget. Most agencies see conversion climb from the industry-average 12% to 30%+ within 90 days.
            </p>

            <h3>Built for the full real estate sales pipeline</h3>
            <p>
              Your <strong>real estate sales pipeline</strong> shouldn&apos;t live in spreadsheets, agent phones, and disconnected tools. LeadNest visualizes every stage, tracks every interaction, and surfaces stalled deals before they die. Sales managers see project-level pipelines, source attribution, agent performance, and bottleneck analysis in real time. <strong>Property inquiry management</strong> stops being guesswork.
            </p>

            <h3>Real estate customer management beyond the sale</h3>
            <p>
              <strong>Real estate customer management</strong> doesn&apos;t end at closing. Property management firms use LeadNest for tenant communication, lease renewals, maintenance requests, and rent reminders. Builders use <strong>property management automation</strong> for post-booking customer experience — payment milestone reminders, construction updates, possession scheduling, and handover coordination. One platform, full customer lifecycle.
            </p>

            <h3>Who PixoraNest is built for</h3>
            <p>
              Real estate agencies handling 100+ inquiries a month. Property consultants juggling multi-project portfolios. Builders and developers running 5+ active projects. Commercial real estate brokers managing enterprise tenant pipelines. Property management firms with tenant communication overload. Solo brokers who want to operate like a 10-person team. If you handle property leads, you need a <strong>property CRM</strong> that responds in seconds.
            </p>

            <h3>Going live in 24–72 hours</h3>
            <p>
              Most real estate businesses are live on PixoraNest within three days. We connect FirstVoice to your existing numbers (no number change required), import your project list and price sheets, configure CallOrbit routing per project and branch, and train LeadNest on your sales pipeline. Your team keeps working in their existing flow — the automation runs underneath.
            </p>
            <p>
              Ready to see what it looks like on your numbers? <Link href="/contact">Book a demo</Link> and we&apos;ll run a 14-day pilot on one project. You&apos;ll see the lead response time, missed-call recovery, and conversion lift live in your dashboard before scaling across your full operation.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ---------- Strong CTA ---------- */

function ReCTA() {
  return (
    <section className="relative px-6 pb-28 pt-8">
      <div className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-gradient-to-br from-white/80 via-[#F3F6FF]/80 to-[#EAF1FF]/80 p-10 shadow-[0_30px_80px_-40px_rgba(45,91,255,0.55)] backdrop-blur-xl md:p-14">
          <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[80%] -translate-x-1/2 rounded-full bg-[#2D5BFF]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-[#2D5BFF]/10 blur-3xl" />
          <div className="relative grid grid-cols-1 items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <Eyebrow>
                <Building2 className="h-3 w-3" />
                AI Automation for Real Estate
              </Eyebrow>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0B1020] md:text-4xl">
                Ready to automate your real estate operations?
              </h2>
              <p className="mt-3 max-w-xl text-[#5B6480]">
                Replace your real estate answering service, property CRM and call routing software with one platform. See conversion lift live in your dashboard within 14 days.
              </p>
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-[12px] text-[#0B1020]">
                <li className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[#2D5BFF]" /> Live in 72 hours</li>
                <li className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[#2D5BFF]" /> Keep your existing numbers</li>
                <li className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-[#2D5BFF]" /> 14-day ROI pilot</li>
              </ul>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row md:flex-col md:items-end">
              <PrimaryButton href="/contact">
                Book a Demo <ArrowRight className="h-4 w-4" />
              </PrimaryButton>
              <GhostButton href="/contact">Talk to an Expert</GhostButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- Real Estate layout (with JSON-LD schemas) ---------- */

function RealEstateLayout({ industry }: { industry: Industry }) {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: realEstateFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "PixoraNest", item: "/" },
      { "@type": "ListItem", position: 2, name: "Industries", item: "/industries" },
      { "@type": "ListItem", position: 3, name: industry.name || "Real Estate", item: `/industries/${industry.slug}` },
    ],
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-[#0B1020]">
      {/* JSON-LD schemas for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <SoftBackground />

      {/* Hero */}
      <section className="relative px-6 pt-28 pb-24 md:pt-36">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.nav
              variants={fadeUp}
              aria-label="Breadcrumb"
              className="mb-6 flex items-center gap-1.5 text-[12px] text-[#5B6480]"
            >
              <Link href="/" className="hover:text-[#0B1020]">PixoraNest</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/industries" className="hover:text-[#0B1020]">Industries</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="font-medium text-[#0B1020]">{industry.name}</span>
            </motion.nav>

            <motion.div variants={fadeUp}>
              <Eyebrow>
                <Building2 className="h-3 w-3" />
                AI Automation Platform for Real Estate
              </Eyebrow>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-[#0B1020] md:text-6xl"
            >
              AI Automation for{" "}
              <span className="bg-gradient-to-r from-[#2D5BFF] to-[#6E8BFF] bg-clip-text text-transparent">
                Real Estate Agencies.
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-5 max-w-xl text-base leading-relaxed text-[#5B6480] md:text-lg">
              Capture, qualify, route and convert every property lead automatically. PixoraNest combines an <strong className="font-semibold text-[#0B1020]">AI receptionist for real estate</strong>, a built-in <strong className="font-semibold text-[#0B1020]">real estate CRM</strong>, and intelligent <strong className="font-semibold text-[#0B1020]">call routing software</strong> — purpose-built for agencies, brokers, builders and property consultants.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
              <PrimaryButton href="/contact">Book a Demo <ArrowRight className="h-4 w-4" /></PrimaryButton>
              <GhostButton href="/contact">Watch Live Demo</GhostButton>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-2 text-[12px] text-[#5B6480]">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/70 px-3 py-1.5 backdrop-blur">
                <Shield className="h-3.5 w-3.5 text-[#2D5BFF]" /> Enterprise-grade security
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/70 px-3 py-1.5 backdrop-blur">
                <Zap className="h-3.5 w-3.5 text-[#2D5BFF]" /> Live in 72 hours
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/70 px-3 py-1.5 backdrop-blur">
                <Globe2 className="h-3.5 w-3.5 text-[#2D5BFF]" /> Multilingual
              </span>
            </motion.div>
          </motion.div>

          <RealEstateHeroFlow />
        </div>
      </section>

      <ReChallenges />
      <ReHowItWorks />
      <ReSolutions />
      <ReBenefits />
      <ReWorkflowViz />
      <ReCaseStudy />
      <ReUseCases />
      <ReSeoContent />
      <FAQSection
        faqs={realEstateFaqs}
        heading="Real estate automation — your questions, answered."
      />
      <ReCTA />
    </main>
  )
}

/* -------------------------------------------------------------------------- */
/*  Entry                                                                     */
/* -------------------------------------------------------------------------- */

export function IndustryPageContent({ industry }: { industry: Industry }) {
  if (industry.slug === "dental-practices" || industry.slug === "healthcare-clinics") {
    return <ClinicLayout industry={industry} />
  }

  if (industry.slug === "real-estate") {
    return <RealEstateLayout industry={industry} />
  }

  return <GenericLayout industry={industry} />
}

export default IndustryPageContent

