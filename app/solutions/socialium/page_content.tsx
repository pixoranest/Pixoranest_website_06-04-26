"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Calendar, MessageSquare, Star, UserPlus, BarChart2, Eye,
  Image, Share2, ArrowRight, CheckCircle2, ChevronRight,
} from "lucide-react"

const WA_LINK = "https://wa.me/919460686266?text=Hi%2C%20I%27m%20interested%20in%20Socialium%20Social%20Media%20Automation"

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
}
const stagger = { visible: { transition: { staggerChildren: 0.1 } } }

const features = [
  { icon: Calendar,     title: "AI Content Scheduling",     desc: "Schedule posts for optimal engagement times across all platforms. AI suggests best formats." },
  { icon: MessageSquare,title: "DM Auto-Reply Bot",         desc: "Auto-reply to Instagram & Facebook DMs with smart, context-aware responses that qualify leads." },
  { icon: Star,         title: "Comment Automation",        desc: "Auto-reply to comments, filter spam, and direct engaged users to your lead funnel." },
  { icon: UserPlus,     title: "Social Lead Capture",       desc: "Capture leads from DMs, story replies, and ad comments into your CRM automatically." },
  { icon: BarChart2,    title: "Social Analytics Dashboard",desc: "Track reach, engagement, leads, and revenue per post and platform in one place." },
  { icon: Eye,          title: "Competitor Monitoring",     desc: "Track competitor posts, engagement, and follower growth with weekly reports." },
  { icon: Image,        title: "AI Caption Generator",      desc: "Generate platform-optimised captions in English, Hindi, or Hinglish with one click." },
  { icon: Share2,       title: "Cross-Platform Publishing", desc: "Publish once, post everywhere — Instagram, Facebook, LinkedIn, and Twitter simultaneously." },
]

const steps = [
  { num: "01", title: "Connect Your Social Accounts", desc: "Link Instagram, Facebook, LinkedIn, and Twitter in one click. Under 2 minutes per platform." },
  { num: "02", title: "Build Automation Rules",        desc: "Set up DM reply flows, comment responses, lead capture, and posting schedules visually." },
  { num: "03", title: "Schedule Content in Bulk",      desc: "Upload 30–90 days of content in one session. AI optimises posting times for reach." },
  { num: "04", title: "Track Growth & Leads",          desc: "Monitor engagement, leads, and revenue from your unified analytics dashboard in real time." },
]

const benefits = [
  { stat: "5 hrs", label: "Saved Per Week",      desc: "Per team member on manual social tasks" },
  { stat: "4x",    label: "More Leads",          desc: "Captured from DMs and comments" },
  { stat: "60%",   label: "Higher Engagement",   desc: "With consistent posting & auto-replies" },
  { stat: "30 min",label: "Weekly Management",   desc: "Socialium handles the rest automatically" },
]

const useCases = [
  { industry: "D2C Fashion & E-commerce",  desc: "21 posts/week automated, 50+ qualified leads daily — Instagram revenue share from 8% to 31%." },
  { industry: "Restaurants & F&B",         desc: "Auto-book table reservations from DMs — walk-in bookings from social up 44%." },
  { industry: "EdTech & Coaching",         desc: "Auto-capture Facebook ad comment leads — qualified lead cost dropped from ₹320 to ₹85." },
  { industry: "Real Estate Marketing",     desc: "380 qualified leads captured in 5 days from a single Instagram Reels launch campaign." },
]

export function SocialiumPageContent() {
  return (
    <main className="overflow-hidden">

      {/* ── HERO ───────────────────────────────────────────────────────── */}
      <section className="relative px-4 pt-20 pb-24 sm:px-6 lg:px-8 lg:pt-28 lg:pb-32">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-violet-500/6 blur-[120px]" />
          <div className="absolute right-[-10%] top-[20%] h-72 w-72 rounded-full bg-primary/6 blur-3xl" />
        </div>

        <motion.div variants={stagger} initial="hidden" animate="visible"
          className="mx-auto max-w-4xl text-center"
        >
          <motion.div variants={fadeUp} className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500" />
            </span>
            <Share2 className="h-3.5 w-3.5 text-violet-500" />
            <span className="text-xs font-semibold tracking-wide text-violet-600">Socialium · Social Media Automation</span>
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            Grow Your Brand on Social —{" "}
            <span className="bg-gradient-to-r from-violet-500 via-primary to-sky-500 bg-clip-text text-transparent">
              Without the Daily Grind
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Socialium automates content scheduling, DM replies, lead capture, and competitor tracking
            across Instagram, Facebook, and LinkedIn — so your brand grows 24/7 on autopilot.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:scale-[1.03]"
            >
              Start Free Trial
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
            {["Meta Business API partner", "14-day free trial", "Hindi & English captions"].map((t) => (
              <span key={t} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-violet-500" />{t}
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
              <div className="text-3xl font-bold text-violet-500 sm:text-4xl">{b.stat}</div>
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
              Everything to Automate Your{" "}
              <span className="text-primary">Social Media Growth</span>
            </h2>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => {
              const Icon = f.icon
              return (
                <motion.div key={f.title} variants={fadeUp} whileHover={{ y: -4 }}
                  className="group rounded-2xl border border-border/60 bg-card/50 p-5 backdrop-blur-sm transition-all hover:border-violet-500/30 hover:shadow-lg"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-500 transition-colors group-hover:bg-violet-500/20">
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
              Automate Your Social in <span className="text-primary">4 Steps</span>
            </h2>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <motion.div key={s.num} variants={fadeUp} className="relative flex flex-col">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-violet-500/30 bg-violet-500/10 text-xs font-bold text-violet-600">
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
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">Socialium Powering Growth Across Industries</h2>
          </motion.div>
          <div className="grid gap-4 sm:grid-cols-2">
            {useCases.map((u) => (
              <motion.div key={u.industry} variants={fadeUp}
                className="flex gap-4 rounded-2xl border border-border/60 bg-card/50 p-5"
              >
                <ChevronRight className="mt-0.5 h-5 w-5 shrink-0 text-violet-500" />
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
          className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-violet-500/20 px-8 py-14 text-center"
          style={{ background: "linear-gradient(135deg, hsl(var(--card)) 0%, hsl(262 83% 58% / 0.06) 100%)" }}
        >
          <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
            Start Growing on Social — Without the Grind
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">
            14-day free trial. Our growth strategist helps you set up your first automation in 30 minutes.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:scale-[1.03]"
            >
              Start Free Trial
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