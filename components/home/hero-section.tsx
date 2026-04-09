"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { stats } from "@/lib/data"
import { ArrowRight, Play, Zap } from "lucide-react"
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
      if (current >= end) {
        current = end
        clearInterval(timer)
      }
      setCount(Math.floor(current))
    }, 16)
    return () => clearInterval(timer)
  }, [end])

  return <>{count}</>
}

function AnimatedStat({ value, label }: { value: number; label: string }) {
  return (
    <motion.div variants={fadeInUp} className="text-center">
      <div className="text-3xl font-bold text-primary sm:text-4xl">
        <Counter end={value} />+
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </motion.div>
  )
}

// ─── Hero Section ─────────────────────────────────────────────────────────────

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 lg:pt-44 lg:pb-28">

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
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
            <motion.div
              variants={fadeInUp}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5"
            >
              <Zap className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-primary">
                The Architects of Automation
              </span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance"
            >
              AI Automation{" "}
              <span className="text-primary">Solutions</span>{" "}
              for Modern Businesses
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground text-pretty"
            >
              PixoraNest helps businesses build powerful{" "}
              <strong className="text-foreground">AI Agents</strong> and{" "}
              <strong className="text-foreground">Automation Workflows</strong>{" "}
              to automate customer communication, manage leads, and streamline
              business operations.
            </motion.p>

            <motion.div variants={fadeInUp} className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25"
              >
                Book 1:1 Discovery Call
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-all hover:border-primary/50 hover:bg-primary/5"
              >
                <Play className="h-4 w-4" />
                Try Demo
              </Link>
            </motion.div>
          </div>

          {/* ── RIGHT: AI Chat ───────────────────────────────────────────── */}
          <HeroAIChat />

        </div>

        {/* ── Stats bar ───────────────────────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-3 gap-8 rounded-2xl border border-border bg-card/50 px-8 py-8"
        >
          {stats.map((stat) => (
            <AnimatedStat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </motion.div>

      </motion.div>
    </section>
  )
}