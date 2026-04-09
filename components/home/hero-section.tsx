"use client"

import Link from "next/link"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { useEffect, useState, useRef } from "react"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { stats } from "@/lib/data"
import { ArrowRight, Play, Zap, Shield, Star, TrendingUp } from "lucide-react"
import HeroAIChat from "./HeroAIChat"

// ─── Animated counter ─────────────────────────────────────────────────────────

function Counter({ end }: { end: number }) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    let current = 0
    const duration = 2000
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      current += increment
      if (current >= end) { current = end; clearInterval(timer) }
      setCount(Math.floor(current))
    }, 16)
    return () => clearInterval(timer)
  }, [end])
  return <>{count}</>
}

function AnimatedStat({ value, label, icon }: { value: number; label: string; icon: React.ReactNode }) {
  return (
    <motion.div
      variants={fadeInUp}
      className="group flex flex-col items-center gap-2 text-center"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all group-hover:bg-primary/20 group-hover:scale-110">
        {icon}
      </div>
      <div className="text-2xl font-bold text-foreground sm:text-3xl">
        <Counter end={value} />+
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
      animate={{ y: [0, -24, 0], opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 6 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  )
}

// ─── Trust badge ──────────────────────────────────────────────────────────────

function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-card/60 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-sm">
      {icon}
      {label}
    </div>
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

// ─── Hero Section ─────────────────────────────────────────────────────────────

const statIcons = [
  <TrendingUp key="t" className="h-5 w-5" />,
  <Shield key="s" className="h-5 w-5" />,
  <Star key="st" className="h-5 w-5" />,
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-28">

      {/* ── Background layer ─────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        {/* Orbs */}
        <FloatingOrb className="left-[-10%] top-[10%] h-[500px] w-[500px] bg-primary/8" delay={0} />
        <FloatingOrb className="right-[-5%] top-[20%] h-[400px] w-[400px] bg-violet-500/6" delay={2} />
        <FloatingOrb className="left-[40%] bottom-[5%] h-[300px] w-[300px] bg-primary/6" delay={4} />
        {/* Top center glow */}
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/6 blur-[100px]" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
      >
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">

          {/* ── LEFT: Copy ──────────────────────────────────────────────── */}
          <div>
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 backdrop-blur-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-semibold text-primary tracking-wide">
                The Architects of Automation
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance"
            >
              AI Automation{" "}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-primary via-violet-400 to-primary bg-clip-text text-transparent">
                  Solutions
                </span>
                <span className="absolute -inset-1 -z-0 rounded-lg bg-primary/10 blur-sm" />
              </span>{" "}
              for Modern Businesses
            </motion.h1>

            {/* Body */}
            <motion.p
              variants={fadeInUp}
              className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground text-pretty"
            >
              PixoraNest helps businesses build powerful{" "}
              <strong className="font-semibold text-foreground">AI Agents</strong> and{" "}
              <strong className="font-semibold text-foreground">Automation Workflows</strong>{" "}
              to automate customer communication, manage leads, and streamline
              business operations — saving hours every day.
            </motion.p>

            {/* Trust badges */}
            <motion.div variants={fadeInUp} className="mt-5 flex flex-wrap gap-2">
              <TrustBadge icon={<Shield className="h-3.5 w-3.5 text-emerald-400" />} label="Trusted by 100+ businesses" />
              <TrustBadge icon={<Star className="h-3.5 w-3.5 text-amber-400 fill-amber-400" />} label="5-star rated agency" />
              <TrustBadge icon={<TrendingUp className="h-3.5 w-3.5 text-primary" />} label="Results-driven" />
            </motion.div>

            {/* CTA buttons */}
            <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/40 hover:scale-[1.02]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-violet-500 to-primary bg-[length:200%] transition-all duration-500 group-hover:bg-right-center" />
                <span className="relative flex items-center gap-2">
                  Book 1:1 Discovery Call
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>

              <Link
                href="/solutions"
                className="group inline-flex items-center gap-2 rounded-xl border border-border bg-card/80 px-6 py-3.5 text-sm font-semibold text-foreground backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-primary/5 hover:scale-[1.02]"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/20">
                  <Play className="h-3 w-3 text-primary" />
                </div>
                Try Demo
              </Link>
            </motion.div>

            {/* Logo strip */}
            <motion.div variants={fadeInUp} className="mt-10">
              <p className="mb-3 text-xs text-muted-foreground/60 uppercase tracking-widest">
                Integrates with your stack
              </p>
              <div className="flex flex-wrap items-center gap-4">
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

          {/* ── RIGHT: AI Chat with tilt ─────────────────────────────────── */}
          <motion.div variants={fadeInUp}>
            <TiltWrapper>
              <div className="relative">
                {/* Glow behind card */}
                <div className="absolute -inset-4 rounded-3xl bg-primary/10 blur-2xl" />
                <div className="relative">
                  <HeroAIChat />
                </div>
              </div>
            </TiltWrapper>
          </motion.div>

        </div>

        {/* ── Stats bar ───────────────────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-3 gap-6 rounded-2xl border border-border/60 bg-card/40 px-8 py-8 backdrop-blur-sm"
          style={{
            background: "linear-gradient(135deg, hsl(var(--card)/0.6), hsl(var(--card)/0.3))",
            boxShadow: "0 1px 0 0 hsl(var(--primary)/0.1) inset, 0 -1px 0 0 hsl(var(--border)/0.5) inset",
          }}
        >
          {stats.map((stat, i) => (
            <AnimatedStat
              key={stat.label}
              value={stat.value}
              label={stat.label}
              icon={statIcons[i % statIcons.length]}
            />
          ))}
        </motion.div>

      </motion.div>
    </section>
  )
}