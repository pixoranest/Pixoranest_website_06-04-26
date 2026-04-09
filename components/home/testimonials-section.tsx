"use client"

import { motion } from "framer-motion"
import { useRef, useEffect } from "react"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { SectionWrapper, SectionHeader } from "@/components/section-wrapper"
import { testimonials } from "@/lib/data"
import { Star, Quote } from "lucide-react"

// Avatar gradient colors per index
const avatarGradients = [
  "from-sky-500 to-blue-600",
  "from-violet-500 to-purple-600",
  "from-emerald-500 to-teal-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-600",
  "from-cyan-500 to-sky-600",
]

function TestimonialCard({ t, i }: {
  t: { name: string; role: string; content: string; rating: number }
  i: number
}) {
  const gradient = avatarGradients[i % avatarGradients.length]
  const initials = t.name.split(" ").map((n) => n[0]).join("")

  return (
    <motion.div variants={fadeInUp} className="group h-full">
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/8">

        {/* Hover glow */}
        <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/6 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Stars */}
        <div className="relative mb-4 flex items-center gap-0.5">
          {Array.from({ length: t.rating }).map((_, j) => (
            <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>

        {/* Quote icon */}
        <Quote className="relative mb-3 h-7 w-7 text-primary/20" />

        {/* Content */}
        <p className="relative mb-6 flex-1 text-sm leading-relaxed text-muted-foreground">
          {t.content}
        </p>

        {/* Author */}
        <div className="relative flex items-center gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-xs font-bold text-white shadow-lg`}
          >
            {initials}
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">{t.name}</div>
            <div className="text-xs text-muted-foreground">{t.role}</div>
          </div>
        </div>

      </div>
    </motion.div>
  )
}

export function TestimonialsSection() {
  return (
    <SectionWrapper id="testimonials">
      <SectionHeader
        title="Client Success Stories with AI Automation"
        subtitle="See how businesses improve efficiency, automate customer communication, and generate more leads using PixoraNest AI automation solutions."
      />

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
        className="mt-12 flex flex-wrap items-center justify-center gap-6"
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <div className="flex -space-x-2">
            {avatarGradients.slice(0, 4).map((g, i) => (
              <div
                key={i}
                className={`flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${g} ring-2 ring-background text-[9px] font-bold text-white`}
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          <span><strong className="text-foreground">100+</strong> happy clients</span>
        </div>
        <div className="h-4 w-px bg-border" />
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span><strong className="text-foreground">4.9/5</strong> average rating</span>
        </div>
      </motion.div>
    </SectionWrapper>
  )
}