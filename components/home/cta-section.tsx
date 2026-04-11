"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react"

const trustPoints = [
  "No commitment",
  "Free consultation",
  "Results-driven",
]

/*
  FIX (Issue 2 — root cause confirmed):
  Slugs now match EXACTLY the keys defined in solutionsMap (lib/solution-data.ts).

  solutionsMap keys are:
    "ai-receptionist"      ✅
    "whatsapp-automation"  ✅
    "call-automation"      ✅
    "social-automation"    ✅  ← previous code had "social-media-automation" (WRONG → 404)
    "ai-voice-agent"       ✅

  Also removed aria-disabled="true" and onClick={e.preventDefault()} which
  were actively blocking navigation even when the route existed.
*/
const serviceLinks = [
  { label: "AI Receptionist for Business",   href: "/solutions/ai-receptionist"    },
  { label: "WhatsApp Lead Management India", href: "/solutions/whatsapp-automation" },
  { label: "AI Call Routing Software India", href: "/solutions/call-automation"     },
  { label: "Social Media Automation India",  href: "/solutions/social-automation"   },
  { label: "AI Voice Agent India",           href: "/solutions/ai-voice-agent"      },
]

export function CTASection() {
  return (
    <section
      aria-label="Start your AI automation journey — book a free demo with PixoraNest"
      className="px-4 py-16 sm:px-6 sm:py-24 lg:px-8"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto max-w-4xl"
      >
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 px-5 py-14 text-center sm:px-16 sm:py-20">

          {/* Background */}
          <div
            className="absolute inset-0 -z-10"
            style={{
              background: "linear-gradient(135deg, hsl(var(--primary)/0.12) 0%, hsl(var(--card)) 50%, hsl(var(--primary)/0.08) 100%)",
            }}
            aria-hidden="true"
          />

          {/* Wave SVG */}
          <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden opacity-30" aria-hidden="true">
            <svg
              className="absolute bottom-0 left-0 w-full"
              viewBox="0 0 1440 200"
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
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
            aria-hidden="true"
          />

          {/* Center glow */}
          <div
            className="pointer-events-none absolute left-1/2 top-0 h-48 w-72 sm:w-96 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
            aria-hidden="true"
          />

          {/* Pulsing ring */}
          <motion.div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10"
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.1, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 300, height: 300 }}
            aria-hidden="true"
          />

          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            className="relative mb-3 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5"
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="text-xs font-semibold text-primary tracking-wide">
              Limited onboarding slots — Start automating today
            </span>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="relative mt-4 text-center text-2xl font-bold tracking-tight text-foreground text-balance sm:text-4xl lg:text-5xl"
          >
            Start Automating Your{" "}
            <span className="bg-gradient-to-r from-primary via-violet-400 to-primary bg-clip-text text-transparent">
              Indian Business
            </span>{" "}
            — Free Consultation
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="relative mx-auto mt-5 max-w-xl px-2 text-sm leading-relaxed text-muted-foreground text-center text-pretty sm:px-0 sm:text-base"
          >
            Schedule a free discovery call and learn how PixoraNest AI automation
            solutions can automate customer communication, manage leads with WhatsApp
            automation, and streamline your business operations using AI-powered agents.
          </motion.p>

          {/* Primary CTA */}
          <motion.div variants={fadeInUp} className="relative mt-8 sm:mt-10">
            <motion.div
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-primary/20 blur-xl"
              animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ width: 200, height: 48 }}
              aria-hidden="true"
            />

            <motion.div
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="inline-block w-full sm:w-auto"
            >
              <Link
                href="/contact"
                className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-primary px-9 py-4 text-sm font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition-all hover:shadow-2xl hover:shadow-primary/40 sm:w-auto"
                aria-label="Book a free AI automation demo with PixoraNest"
              >
                <span
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                  aria-hidden="true"
                />
                <span className="relative flex items-center gap-2">
                  Book a Free Demo
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </motion.div>
          </motion.div>

          {/* WhatsApp CTA */}
          <motion.div variants={fadeInUp} className="relative mt-4">
            <Link
              href="https://wa.me/919460686266?text=Hi%2C%20I%27d%20like%20to%20book%20a%20free%20AI%20automation%20consultation"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-5 py-2 text-xs font-semibold text-emerald-600 transition-all hover:bg-emerald-500/20"
              aria-label="Chat with PixoraNest on WhatsApp for AI automation consultation"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              Or chat with us on WhatsApp
            </Link>
          </motion.div>

          {/* Trust points */}
          <motion.div
            variants={fadeInUp}
            className="relative mt-6 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            {trustPoints.map((point) => (
              <span key={point} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
                {point}
              </span>
            ))}
          </motion.div>

        </div>
      </motion.div>

      {/* Service nav — fully clickable, correct slugs, no blocking code */}
      <nav
        aria-label="Explore PixoraNest AI automation services"
        className="mt-10 flex flex-wrap justify-center gap-x-3 gap-y-3 px-4 text-xs sm:gap-x-4 sm:text-sm"
      >
        {serviceLinks.map((service, i) => (
          <span key={service.label} className="flex items-center gap-3">
            <Link
              href={service.href}
              className="text-primary/60 transition-colors hover:text-primary/90"
            >
              {service.label}
            </Link>
            {i < serviceLinks.length - 1 && (
              <span className="hidden text-border sm:inline" aria-hidden="true">|</span>
            )}
          </span>
        ))}
      </nav>

    </section>
  )
}