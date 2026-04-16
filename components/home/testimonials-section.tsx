"use client"

import Link from "next/link"
import { Star, Quote, ArrowRight } from "lucide-react"

// ─── Types ─────────────────────────────────────────────────────────────────

interface Testimonial {
  name: string
  role: string
  content: string
  rating: number
}

// ─── Data ──────────────────────────────────────────────────────────────────

const testimonials: Testimonial[] = [
  {
    name: "Rahul Sharma",
    role: "Founder, TechMart India — Bangalore",
    content:
      "PixoraNest's WhatsApp automation cut our lead response time from 4 hours to under 2 minutes. We saw 3× more qualified leads in the first month alone. Best AI automation investment we've made.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "CEO, MediCare Clinics — Chennai",
    content:
      "Their AI receptionist handles 80% of our appointment calls automatically. Our staff now focuses on patients, not phones. Revenue from missed-call recovery alone covered the setup cost in week 1.",
    rating: 5,
  },
  {
    name: "Arjun Mehta",
    role: "Co-Founder, EduPath Edtech — Hyderabad",
    content:
      "PixoraNest built us a WhatsApp lead nurturing flow that converts 40% better than our old email drips. The team understands Indian business communication patterns — that matters.",
    rating: 5,
  },
  {
    name: "Sneha Patel",
    role: "Director, Luxe Realty — Mumbai",
    content:
      "Our AI chatbot qualifies property inquiries 24/7 now. We used to lose weekend leads to competitors. Since PixoraNest, we've had zero missed leads and our site-visit bookings doubled.",
    rating: 5,
  },
]

const avatarGradients = [
  "from-sky-500 to-blue-600",
  "from-violet-500 to-purple-600",
  "from-emerald-500 to-teal-600",
  "from-rose-500 to-pink-600",
]

// ─── Testimonial Card ──────────────────────────────────────────────────────

function TestimonialCard({ t, i }: { t: Testimonial; i: number }) {
  const gradient = avatarGradients[i % avatarGradients.length]
  const initials = t.name.split(" ").map((n) => n[0]).join("")

  return (
    <div
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-xl hover:-translate-y-1"
      role="article"
      aria-label={`Testimonial from ${t.name}, ${t.role}`}
    >
      {/* Inner glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/4 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden="true"
      />

      {/* Stars */}
      <div className="relative mb-4 flex items-center gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
        {Array.from({ length: t.rating }).map((_, j) => (
          <Star key={j} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
        ))}
      </div>

      {/* Quote icon */}
      <Quote className="relative mb-4 h-7 w-7 text-blue-200" aria-hidden="true" />

      {/* Content */}
      <blockquote className="relative mb-6 flex-1 text-sm leading-relaxed text-gray-500">
        "{t.content}"
      </blockquote>

      {/* Divider */}
      <div className="relative mb-5 h-px bg-gray-100" aria-hidden="true" />

      {/* Author */}
      <div className="relative flex items-center gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-xs font-bold text-white shadow-md`}
          aria-hidden="true"
        >
          {initials}
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900">{t.name}</div>
          <div className="text-xs text-gray-400">{t.role}</div>
        </div>
      </div>
    </div>
  )
}

// ─── Section ───────────────────────────────────────────────────────────────

export function TestimonialsSection() {
  return (
    <section
      id="testimonials"
      className="relative w-full bg-[#f0f4fa] py-20 md:py-28 px-4 sm:px-6 lg:px-8"
      aria-label="Client success stories — PixoraNest AI automation results for Indian businesses"
    >
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #64748b 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-[2.6rem] leading-tight">
            Client Success Stories with AI Automation
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-500 sm:text-[1.05rem]">
            See how Indian businesses improve efficiency, automate customer
            communication, and generate more leads using PixoraNest AI
            automation solutions.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <TestimonialCard key={i} t={t} i={i} />
          ))}
        </div>

        {/* Social proof strip */}
        <div
          className="mt-12 flex flex-wrap items-center justify-center gap-5 sm:gap-7"
          aria-label="PixoraNest aggregate rating and client count"
        >
          <div className="flex items-center gap-2.5 text-sm text-gray-500">
            <div className="flex -space-x-2" aria-hidden="true">
              {avatarGradients.map((g, i) => (
                <div
                  key={i}
                  className={`flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br ${g} ring-2 ring-white text-[9px] font-bold text-white`}
                >
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <span>
              <strong className="text-gray-900">100+</strong> happy clients across India
            </span>
          </div>

          <div className="h-4 w-px bg-gray-200" aria-hidden="true" />

          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <div className="flex gap-0.5" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span>
              <strong className="text-gray-900">4.9/5</strong> average rating
            </span>
          </div>
        </div>

        {/* Read case studies */}
        <div className="mt-8 flex justify-center">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-xs font-semibold text-gray-500 shadow-sm transition-all duration-300 hover:border-blue-300 hover:text-blue-600 hover:shadow-md"
            aria-label="Read full AI automation case studies from PixoraNest clients"
          >
            Read full case studies
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection