"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { Reveal } from "@/components/reveal"
import { stats } from "@/lib/data"
import { ArrowRight, Play, Zap, Shield, Star, TrendingUp } from "lucide-react"

// FIX: Lazy load the AI chat component (heavy) — already done, kept as-is
const HeroAIChat = dynamic(() => import("./HeroAIChat"), {
  ssr: false,
  loading: () => (
    <div
      className="mx-auto h-96 w-full max-w-sm animate-pulse rounded-2xl bg-card/50"
      aria-label="Loading AI chat demo..."
      role="status"
    />
  ),
})

// ─── Animated counter ─────────────────────────────────────────────────────────

function Counter({ end, inView }: { end: number; inView: boolean }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let current = 0
    const duration = 2000
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      current += increment
      if (current >= end) { current = end; clearInterval(timer) }
      setCount(Math.floor(current))
    }, 16)
    return () => clearInterval(timer)
  }, [end, inView])
  return <>{count}</>
}

function AnimatedStat({
  value, label, icon, inView,
}: {
  value: number; label: string; icon: React.ReactNode; inView: boolean
}) {
  return (
    <div className="group flex flex-col items-center gap-2 text-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all group-hover:bg-primary/20 group-hover:scale-110">
        {icon}
      </div>
      <div className="text-2xl font-bold text-foreground sm:text-3xl">
        <Counter end={value} inView={inView} />+
      </div>
      <div className="text-xs text-muted-foreground leading-tight">{label}</div>
    </div>
  )
}

// ─── Trust badge ──────────────────────────────────────────────────────────────

function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex cursor-default items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-sm transition-transform hover:scale-105">
      {icon}
      {label}
    </div>
  )
}

// ─── Logo strip ───────────────────────────────────────────────────────────────

const logos = ["Stripe", "HubSpot", "Salesforce", "Notion", "Slack", "Zapier"]

// ─── Stat icons ───────────────────────────────────────────────────────────────

const statIcons = [
  <TrendingUp key="t" className="h-5 w-5" />,
  <Shield     key="s" className="h-5 w-5" />,
  <Star       key="st" className="h-5 w-5" />,
]

// ─── Hero Section ─────────────────────────────────────────────────────────────

export function HeroSection() {
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsInView, setStatsInView] = useState(false)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsInView(true) },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/*
        FIX: Moved ALL inline <style> to globals.css.
        Inline styles in <style> tags inside components:
        1. Cannot be cached by the browser (re-parsed every render)
        2. Bloat HTML payload
        3. Cause CLS warnings in Lighthouse
        All hero-* keyframes are now in globals.css as .hero-* classes.
      */}

      <section
        aria-label="PixoraNest AI automation services for Indian businesses"
        className="relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-28"
      >
        {/* ── Background — FIX: replaced inline style backgroundImage with CSS classes ── */}
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {/* FIX: Grid pattern moved to CSS class .grid-bg */}
          <div className="absolute inset-0 opacity-[0.03] grid-bg" />

          {/* Radial gradient — kept as inline style: dynamic value, OK to keep */}
          <div className="hero-radial-bg absolute inset-0 opacity-40" />

          {/* Floating orbs — FIX: removed style prop, use CSS classes */}
          <div className="hero-orb hero-orb-left pointer-events-none absolute rounded-full blur-3xl hero-orb-float" aria-hidden="true" />
          <div className="hero-orb hero-orb-right pointer-events-none absolute rounded-full blur-3xl hero-orb-float hero-orb-delay-2" aria-hidden="true" />
          <div className="hero-orb hero-orb-bottom pointer-events-none absolute rounded-full blur-3xl hero-orb-float hero-orb-delay-4" aria-hidden="true" />
          <div className="hero-top-glow absolute left-1/2 top-0 -translate-x-1/2 rounded-full bg-primary/6 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

            {/* ── LEFT: Copy ── */}
            <div className="hero-fade-left">
              {/* Badge */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-sm">
                <span className="relative flex h-2 w-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <Zap className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
                <span className="text-xs font-semibold text-primary tracking-wide">
                  India's Leading AI Automation Agency
                </span>
              </div>

              {/* FIX: H1 — primary keyword front-loaded */}
              <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
                AI Automation{" "}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-primary via-violet-400 to-primary bg-clip-text text-transparent">
                    Solutions
                  </span>
                  <span className="absolute -inset-1 -z-0 rounded-lg bg-primary/10 blur-sm" aria-hidden="true" />
                </span>{" "}
                for Modern Businesses in India
              </h1>

              {/* Body */}
              <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground text-pretty">
                PixoraNest helps Indian startups and SMEs build powerful{" "}
                <strong className="font-semibold text-foreground">AI Agents</strong> and{" "}
                <strong className="font-semibold text-foreground">Automation Workflows</strong>{" "}
                to automate customer communication, manage leads, and streamline
                business operations — saving your team hours every day.
              </p>

              {/* Trust badges */}
              <div className="mt-5 flex flex-wrap gap-2">
                <TrustBadge
                  icon={<Shield className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />}
                  label="Trusted by 100+ Indian businesses"
                />
                <TrustBadge
                  icon={<Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" aria-hidden="true" />}
                  label="5-star rated agency"
                />
                <TrustBadge
                  icon={<TrendingUp className="h-3.5 w-3.5 text-primary" aria-hidden="true" />}
                  label="Setup in 2–4 weeks"
                />
              </div>

              {/* CTA buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <Link
                  href="/contact"
                  className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.03] sm:w-auto"
                  aria-label="Book a free AI automation strategy call with PixoraNest"
                >
                  {/* FIX: Shimmer overlay via CSS class instead of inline bg-gradient + bg-[length:200%] */}
                  <span className="absolute inset-0 hero-btn-shimmer" aria-hidden="true" />
                  <span className="relative flex items-center gap-2">
                    Book Free AI Strategy Call
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>

                {/* FIX: Internal link with descriptive anchor text for SEO */}
                <Link
                  href="/solutions"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card/80 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-primary/5 hover:scale-[1.03] sm:w-auto"
                  aria-label="See how PixoraNest AI automation works for Indian businesses"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20" aria-hidden="true">
                    <Play className="h-3 w-3 text-primary" />
                  </div>
                  See How It Works
                </Link>
              </div>

              {/* Logo strip */}
              <div className="mt-10">
                <p className="mb-3 text-xs text-muted-foreground/60 uppercase tracking-widest">
                  Integrates with your stack
                </p>
                <div className="flex flex-wrap items-center gap-4" aria-label="Supported integrations: Stripe, HubSpot, Salesforce, Notion, Slack, Zapier">
                  {logos.map((logo) => (
                    <span
                      key={logo}
                      className="text-xs font-semibold text-muted-foreground/40 transition-all hover:text-muted-foreground/70"
                    >
                      {logo}
                    </span>
                  ))}
                </div>
              </div>

              {/* FIX: Added internal SEO links — passes link equity to key service pages */}
              <nav
                aria-label="Quick links to PixoraNest AI services"
                className="mt-8 flex flex-wrap gap-x-3 gap-y-2"
              >
                <Link href="/solutions/ai-receptionist" className="internal-link text-xs">
                  AI Receptionist
                </Link>
                <span className="text-xs text-muted-foreground/30" aria-hidden="true">·</span>
                <Link href="/solutions/whatsapp-automation" className="internal-link text-xs">
                  WhatsApp Automation
                </Link>
                <span className="text-xs text-muted-foreground/30" aria-hidden="true">·</span>
                <Link href="/solutions/call-automation" className="internal-link text-xs">
                  Call Routing
                </Link>
                <span className="text-xs text-muted-foreground/30" aria-hidden="true">·</span>
                <Link href="/solutions/social-automation" className="internal-link text-xs">
                  Social Media Automation
                </Link>
                <span className="text-xs text-muted-foreground/30" aria-hidden="true">·</span>
                <Link href="/solutions/ai-voice-agent" className="internal-link text-xs">
                  AI Voice Agent
                </Link>
              </nav>
            </div>

            {/* ── RIGHT: AI Chat ── */}
            {/* FIX: Removed inline style boxShadow — moved to CSS class */}
            <div className="hero-fade-right hero-float">
              <div className="relative">
                <div
                  className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl hero-glow-pulse"
                  aria-hidden="true"
                />
                <div className="relative">
                  <HeroAIChat />
                </div>
              </div>
            </div>

          </div>

          {/* ── Stats bar ── */}
          {/* FIX: Removed inline style — moved background + boxShadow to CSS classes */}
          <div
            ref={statsRef}
            className="mt-16 grid grid-cols-3 gap-4 rounded-2xl border border-border/60 bg-card/40 px-4 py-6 backdrop-blur-sm sm:gap-6 sm:px-8 sm:py-8 hero-stats-bar"
            aria-label="PixoraNest key statistics"
          >
            {stats.map((stat, i) => (
              <AnimatedStat
                key={stat.label}
                value={stat.value}
                label={stat.label}
                icon={statIcons[i % statIcons.length]}
                inView={statsInView}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}