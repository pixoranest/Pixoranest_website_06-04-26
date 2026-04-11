"use client"

import dynamic from "next/dynamic"
import Link from "next/link"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { stats } from "@/lib/data"
import { ArrowRight, Play, Zap, Shield, Star, TrendingUp } from "lucide-react"

// ─── Lazy-load HeroAIChat — prevents LCP block ────────────────────────────────
const HeroAIChat = dynamic(() => import("./HeroAIChat"), {
  ssr: false,
  loading: () => (
    <div className="mx-auto h-96 w-full max-w-sm animate-pulse rounded-2xl bg-card/50" />
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
  value,
  label,
  icon,
  inView,
}: {
  value: number
  label: string
  icon: React.ReactNode
  inView: boolean
}) {
  return (
    <motion.div
      variants={fadeInUp}
      className="group flex flex-col items-center gap-2 text-center"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all group-hover:bg-primary/20 group-hover:scale-110">
        {icon}
      </div>
      <div className="text-2xl font-bold text-foreground sm:text-3xl">
        <Counter end={value} inView={inView} />+
      </div>
      <div className="text-xs text-muted-foreground leading-tight">{label}</div>
    </motion.div>
  )
}

// ─── Floating orb ─────────────────────────────────────────────────────────────

function FloatingOrb({ className, delay = 0 }: { className: string; delay?: number }) {
  return (
    <motion.div
      className={`pointer-events-none absolute rounded-full blur-3xl ${className}`}
      animate={{ y: [0, -24, 0], opacity: [0.5, 0.75, 0.5] }}
      transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  )
}

// ─── Trust badge ──────────────────────────────────────────────────────────────

function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="flex cursor-default items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-sm"
    >
      {icon}
      {label}
    </motion.div>
  )
}

// ─── Tilt card wrapper ────────────────────────────────────────────────────────

function TiltWrapper({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 150, damping: 20 })
  const springY = useSpring(y, { stiffness: 150, damping: 20 })
  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4])
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4])

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((e.clientX - rect.left) / rect.width - 0.5)
    y.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      className="w-full"
    >
      {children}
    </motion.div>
  )
}

// ─── Logo strip ───────────────────────────────────────────────────────────────

const logos = ["Stripe", "HubSpot", "Salesforce", "Notion", "Slack", "Zapier"]

// ─── Stat icons ──────────────────────────────────────────────────────────────

const statIcons = [
  <TrendingUp key="t" className="h-5 w-5" />,
  <Shield key="s" className="h-5 w-5" />,
  <Star key="st" className="h-5 w-5" />,
]

// ─── Hero Section ─────────────────────────────────────────────────────────────

export function HeroSection() {
  // Trigger counter only when stats bar is in viewport
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
    // SEO: landmark <section> with descriptive aria-label
    <section
      aria-label="PixoraNest AI automation services for Indian businesses — hero"
      className="relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-28"
    >

      {/* ── Background ───────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: "radial-gradient(ellipse 80% 50% at 50% -10%, hsl(var(--primary)/0.08) 0%, transparent 70%)",
          }}
        />
        <FloatingOrb className="left-[-10%] top-[10%] h-[500px] w-[500px] bg-primary/8" delay={0} />
        <FloatingOrb className="right-[-5%] top-[20%] h-[400px] w-[400px] bg-violet-500/6" delay={2} />
        <FloatingOrb className="left-[40%] bottom-[5%] h-[300px] w-[300px] bg-primary/6" delay={4} />
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/6 blur-[100px]" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── LEFT: Copy ───────────────────────────────────────────── */}
          <div>
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <Zap className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              {/* SEO: badge includes brand + India signal */}
              <span className="text-xs font-semibold text-primary tracking-wide">
                India's Leading AI Automation Agency
              </span>
            </motion.div>

            {/*
              SEO: H1 — ONE per page, contains primary keyword:
              "AI Automation Solutions for Modern Businesses in India"
              Do NOT add another h1 anywhere on this page.
            */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance"
            >
              AI Automation{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-primary via-violet-400 to-primary bg-clip-text text-transparent">
                  Solutions
                </span>
                <span className="absolute -inset-1 -z-0 rounded-lg bg-primary/10 blur-sm" aria-hidden="true" />
              </span>{" "}
              for Modern Businesses in India
            </motion.h1>

            {/* SEO: body copy mentions India + core keywords naturally */}
            <motion.p
              variants={fadeInUp}
              className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground text-pretty"
            >
              PixoraNest helps Indian startups and SMEs build powerful{" "}
              <strong className="font-semibold text-foreground">AI Agents</strong> and{" "}
              <strong className="font-semibold text-foreground">Automation Workflows</strong>{" "}
              to automate customer communication, manage leads, and streamline
              business operations — saving your team hours every day.
            </motion.p>

            {/* SEO: trust badges — India-specific */}
            <motion.div variants={fadeInUp} className="mt-5 flex flex-wrap gap-2">
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
            </motion.div>

            {/* CTA buttons */}
            <motion.div variants={fadeInUp} className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-full sm:w-auto"
              >
                {/* SEO: descriptive CTA text with geo context */}
                <Link
                  href="/contact"
                  className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/40 sm:w-auto"
                  aria-label="Book a free AI automation strategy call with PixoraNest"
                >
                  <span className="absolute inset-0 bg-gradient-to-r from-primary via-violet-500 to-primary bg-[length:200%] transition-all duration-500 group-hover:bg-right-center" aria-hidden="true" />
                  <span className="relative flex items-center gap-2">
                    Book Free AI Strategy Call
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="w-full sm:w-auto"
              >
                <Link
                  href="/solutions"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card/80 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-primary/5 sm:w-auto"
                  aria-label="See how PixoraNest AI automation works"
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20" aria-hidden="true">
                    <Play className="h-3 w-3 text-primary" />
                  </div>
                  See How It Works
                </Link>
              </motion.div>
            </motion.div>

            {/* Logo strip */}
            <motion.div variants={fadeInUp} className="mt-10">
              <p className="mb-3 text-xs text-muted-foreground/60 uppercase tracking-widest">
                Integrates with your stack
              </p>
              <div className="flex flex-wrap items-center gap-4" aria-label="Supported integrations">
                {logos.map((logo) => (
                  <span
                    key={logo}
                    className="text-xs font-semibold text-muted-foreground/40 grayscale transition-all hover:text-muted-foreground/70"
                  >
                    {logo}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT: AI Chat (lazy-loaded) ─────────────────────────── */}
          <motion.div
            variants={fadeInUp}
            animate={{ y: [0, -10, 0] }}
            transition={{
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", repeatType: "loop" },
            }}
          >
            <TiltWrapper>
              <div className="relative">
                <motion.div
                  className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl"
                  animate={{ opacity: [0.5, 0.9, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  aria-hidden="true"
                />
                <div className="relative">
                  <HeroAIChat />
                </div>
              </div>
            </TiltWrapper>
          </motion.div>

        </div>

        {/* ── Stats bar — counter triggers on viewport entry ─────────── */}
        <motion.div
          ref={statsRef}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-3 gap-4 rounded-2xl border border-border/60 bg-card/40 px-4 py-6 backdrop-blur-sm sm:gap-6 sm:px-8 sm:py-8"
          style={{
            background: "linear-gradient(135deg, hsl(var(--card)/0.6), hsl(var(--card)/0.3))",
            boxShadow: "0 1px 0 0 hsl(var(--primary)/0.1) inset, 0 -1px 0 0 hsl(var(--border)/0.5) inset",
          }}
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
        </motion.div>

      </motion.div>
    </section>
  )
}