"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { ArrowRight, CheckCircle2 } from "lucide-react"

const trustPoints = [
  "No commitment",
  "Free consultation",
  "Results-driven",
]

export function CTASection() {
  return (
    <section className="px-4 py-24 sm:px-6 lg:px-8">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-4xl"
      >
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 px-8 py-20 text-center sm:px-16">

          {/* ── Background layers ──────────────────────────────────────── */}
          <div
            className="absolute inset-0 -z-10"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)/0.12) 0%, hsl(var(--card)) 50%, hsl(var(--primary)/0.08) 100%)",
            }}
          />

          {/* Wave SVG */}
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-30">
            <svg
              className="absolute bottom-0 left-0 w-full"
              viewBox="0 0 1440 200"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0,100 C240,180 480,20 720,100 C960,180 1200,20 1440,100 L1440,200 L0,200 Z"
                fill="hsl(var(--primary))"
                fillOpacity="0.06"
              />
              <path
                d="M0,120 C360,200 720,40 1080,120 C1260,160 1380,80 1440,120 L1440,200 L0,200 Z"
                fill="hsl(var(--primary))"
                fillOpacity="0.04"
              />
            </svg>
          </div>

          {/* Dot grid */}
          <div
            className="pointer-events-none absolute inset-0 -z-10 opacity-[0.04]"
            style={{
              backgroundImage: "radial-gradient(hsl(var(--primary)) 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          {/* Center glow */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-96 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />

          {/* Pulsing ring */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10"
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.1, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 500, height: 500 }}
          />

          {/* ── Content ──────────────────────────────────────────────── */}
          <motion.div
            variants={fadeInUp}
            className="relative mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-xs font-semibold text-primary tracking-wide">
              Start automating today
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="relative mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance"
          >
            Build Your{" "}
            <span className="bg-gradient-to-r from-primary via-violet-400 to-primary bg-clip-text text-transparent">
              AI Automation System
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="relative mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted-foreground text-pretty"
          >
            Schedule a free discovery call and discover how PixoraNest AI
            automation solutions can automate customer communication, manage
            leads, and streamline your business operations using AI-powered tools.
          </motion.p>

          {/* CTA button */}
          <motion.div variants={fadeInUp} className="relative mt-10">
            <Link
              href="/contact"
              className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-primary px-9 py-4 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition-all hover:shadow-2xl hover:shadow-primary/40 hover:scale-[1.03]"
            >
              {/* Shimmer effect */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative flex items-center gap-2">
                Book a Free Demo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </motion.div>

          {/* Trust line */}
          <motion.div
            variants={fadeInUp}
            className="relative mt-6 flex flex-wrap items-center justify-center gap-4"
          >
            {trustPoints.map((point) => (
              <span key={point} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                {point}
              </span>
            ))}
          </motion.div>

        </div>
      </motion.div>
    </section>
  )
}