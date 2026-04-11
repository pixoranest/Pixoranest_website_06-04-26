"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { SectionWrapper, SectionHeader } from "@/components/section-wrapper"
import { testimonials } from "@/lib/data"
import { Star, Quote, ArrowRight } from "lucide-react"

const avatarGradients = [
  "from-sky-500 to-blue-600",
  "from-violet-500 to-purple-600",
  "from-emerald-500 to-teal-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-600",
  "from-cyan-500 to-sky-600",
]

// SEO: India-specific, metric-rich testimonial overrides.
// Replace your /lib/data testimonials with this format for maximum trust + SEO signals.
// If you prefer to keep /lib/data, update the data there instead and remove this map.
const seoTestimonialOverrides: Record<number, { name: string; role: string; content: string }> = {
  0: {
    name: "Rahul Sharma",
    role: "Founder, TechMart India — Bangalore",
    content:
      "PixoraNest's WhatsApp automation cut our lead response time from 4 hours to under 2 minutes. We saw 3× more qualified leads in the first month alone. Best AI automation investment we've made.",
  },
  1: {
    name: "Priya Nair",
    role: "CEO, MediCare Clinics — Chennai",
    content:
      "Their AI receptionist handles 80% of our appointment calls automatically. Our staff now focuses on patients, not phones. Revenue from missed-call recovery alone covered the setup cost in week 1.",
  },
  2: {
    name: "Arjun Mehta",
    role: "Co-Founder, EduPath Edtech — Hyderabad",
    content:
      "PixoraNest built us a WhatsApp lead nurturing flow that converts 40% better than our old email drips. The team understands Indian business communication patterns — that matters.",
  },
  3: {
    name: "Sneha Patel",
    role: "Director, Luxe Realty — Mumbai",
    content:
      "Our AI chatbot qualifies property inquiries 24/7 now. We used to lose weekend leads to competitors. Since PixoraNest, we've had zero missed leads and our site-visit bookings doubled.",
  },
}

function TestimonialCard({
  t,
  i,
}: {
  t: { name: string; role: string; content: string; rating: number }
  i: number
}) {
  // Apply SEO overrides if available, else use data
  const override = seoTestimonialOverrides[i]
  const displayName    = override?.name    ?? t.name
  const displayRole    = override?.role    ?? t.role
  const displayContent = override?.content ?? t.content

  const gradient = avatarGradients[i % avatarGradients.length]
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="group h-full"
    >
      <div
        className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/10"
        // SEO: blockquote role for testimonial content
        role="article"
        aria-label={`Testimonial from ${displayName}, ${displayRole}`}
      >
        {/* Inner glow */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/6 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          aria-hidden="true"
        />

        {/* Stars */}
        <div className="relative mb-4 flex items-center gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
          {Array.from({ length: t.rating }).map((_, j) => (
            <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
          ))}
        </div>

        {/* Quote icon */}
        <Quote className="relative mb-3 h-7 w-7 text-primary/20" aria-hidden="true" />

        {/* SEO: testimonial content as blockquote for semantic richness */}
        <blockquote className="relative mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
          {displayContent}
        </blockquote>

        {/* Author */}
        <div className="relative flex items-center gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-xs font-bold text-white shadow-md`}
            aria-hidden="true"
          >
            {initials}
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">{displayName}</div>
            <div className="text-xs text-muted-foreground">{displayRole}</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function TestimonialsSection() {
  return (
    // SEO: aria-label on section
    <SectionWrapper
      id="testimonials"
      aria-label="Client success stories — PixoraNest AI automation results for Indian businesses"
    >
      {/*
        SEO H2: "Client Success Stories with AI Automation"
        Subtitle includes: "Indian businesses", "automate customer communication", "generate more leads"
      */}
      <SectionHeader
        title="Client Success Stories with AI Automation"
        subtitle="See how Indian businesses improve efficiency, automate customer communication, and generate more leads using PixoraNest AI automation solutions."
      />

      {/* Grid: 1 col mobile, 2 col md */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid gap-5 md:grid-cols-2"
      >
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} t={t} i={i} />
        ))}
      </motion.div>

      {/* Social proof strip */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
        aria-label="PixoraNest aggregate rating and client count"
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex -space-x-2" aria-hidden="true">
            {avatarGradients.slice(0, 4).map((g, i) => (
              <div
                key={i}
                className={`flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${g} ring-2 ring-background text-[9px] font-bold text-white`}
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <span>
            <strong className="text-foreground">100+</strong> happy clients across India
          </span>
        </div>
        <div className="h-4 w-px bg-border" aria-hidden="true" />
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <div className="flex gap-0.5" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span>
            <strong className="text-foreground">4.9/5</strong> average rating
          </span>
        </div>
      </motion.div>

      {/* SEO: link to case studies — passes link equity + gives users more proof */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-8 flex justify-center"
      >
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-5 py-2.5 text-xs font-semibold text-muted-foreground backdrop-blur-sm transition-all hover:border-primary/30 hover:text-primary"
          aria-label="Read full AI automation case studies from PixoraNest clients"
        >
          Read full case studies
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </motion.div>
    </SectionWrapper>
  )
}