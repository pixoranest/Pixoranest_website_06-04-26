"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { SectionWrapper, SectionHeader } from "@/components/section-wrapper"
import { industries } from "@/lib/data"
import {
  Heart, ShoppingCart, Factory, Truck, DollarSign,
  GraduationCap, Hotel, Building, Monitor, Rocket,
  Home, CreditCard, UtensilsCrossed, Plane, Scale, ArrowRight,
} from "lucide-react"

// Extended icon map — includes India-specific industry icons
const iconMap: Record<string, React.ElementType> = {
  Heart, ShoppingCart, Factory, Truck, DollarSign,
  GraduationCap, Hotel, Building, Monitor, Rocket,
  // India-specific additions:
  Home,           // Real Estate
  CreditCard,     // Fintech / NBFC
  UtensilsCrossed, // Restaurants & QSR
  Plane,          // Travel & Tourism
  Scale,          // CA & Legal Firms
}

const colorMap: Record<string, { text: string; bg: string; border: string; gradient: string }> = {
  Heart:           { text: "text-red-500",     bg: "bg-red-500/10",     border: "border-red-500/20",     gradient: "from-red-500/10 to-transparent"     },
  ShoppingCart:    { text: "text-green-600",   bg: "bg-green-500/10",   border: "border-green-500/20",   gradient: "from-green-500/10 to-transparent"   },
  Factory:         { text: "text-amber-600",   bg: "bg-amber-500/10",   border: "border-amber-500/20",   gradient: "from-amber-500/10 to-transparent"   },
  Truck:           { text: "text-sky-500",     bg: "bg-sky-500/10",     border: "border-sky-500/20",     gradient: "from-sky-500/10 to-transparent"     },
  DollarSign:      { text: "text-emerald-600", bg: "bg-emerald-500/10", border: "border-emerald-500/20", gradient: "from-emerald-500/10 to-transparent" },
  GraduationCap:   { text: "text-violet-600",  bg: "bg-violet-500/10",  border: "border-violet-500/20",  gradient: "from-violet-500/10 to-transparent"  },
  Hotel:           { text: "text-rose-500",    bg: "bg-rose-500/10",    border: "border-rose-500/20",    gradient: "from-rose-500/10 to-transparent"    },
  Building:        { text: "text-orange-600",  bg: "bg-orange-500/10",  border: "border-orange-500/20",  gradient: "from-orange-500/10 to-transparent"  },
  Monitor:         { text: "text-cyan-600",    bg: "bg-cyan-500/10",    border: "border-cyan-500/20",    gradient: "from-cyan-500/10 to-transparent"    },
  Rocket:          { text: "text-fuchsia-600", bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/20", gradient: "from-fuchsia-500/10 to-transparent" },
  // India-specific
  Home:            { text: "text-indigo-600",  bg: "bg-indigo-500/10",  border: "border-indigo-500/20",  gradient: "from-indigo-500/10 to-transparent"  },
  CreditCard:      { text: "text-teal-600",    bg: "bg-teal-500/10",    border: "border-teal-500/20",    gradient: "from-teal-500/10 to-transparent"    },
  UtensilsCrossed: { text: "text-red-600",     bg: "bg-red-500/10",     border: "border-red-500/20",     gradient: "from-red-500/10 to-transparent"     },
  Plane:           { text: "text-sky-600",     bg: "bg-sky-500/10",     border: "border-sky-500/20",     gradient: "from-sky-500/10 to-transparent"     },
  Scale:           { text: "text-slate-600",   bg: "bg-slate-500/10",   border: "border-slate-500/20",   gradient: "from-slate-500/10 to-transparent"   },
}

const fallback = {
  text: "text-primary",
  bg: "bg-primary/10",
  border: "border-primary/20",
  gradient: "from-primary/10 to-transparent",
}

export function IndustriesSection() {
  return (
    // SEO: aria-label on section
    <SectionWrapper
      id="industries"
      className="relative bg-card/30"
      aria-label="AI automation solutions for Indian industries — healthcare, real estate, e-commerce and more"
    >

      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      {/*
        SEO H2: includes "India" + industry list for long-tail keyword coverage.
        Subtitle names specific industries for semantic relevance.
      */}
      <SectionHeader
        title="AI Automation for Every Industry in India"
        subtitle="PixoraNest provides AI automation solutions for Indian healthcare, real estate, D2C e-commerce, fintech, edtech, hospitality, and technology businesses."
      />

      {/* Grid: 1 col mobile, 2 col sm, 3 col lg */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {industries.slice(0, 9).map((industry) => {
          const Icon = iconMap[industry.icon] || Monitor
          const colors = colorMap[industry.icon] || fallback

          return (
            <motion.div
              key={industry.slug}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              <Link
                href={`/industries/${industry.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-transparent hover:shadow-xl"
                // SEO: descriptive aria-label per card
                aria-label={`AI automation for ${industry.title} in India — explore solutions`}
              >
                {/* Gradient border overlay on hover */}
                <div
                  className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-[1px] rounded-2xl bg-card/90"
                  aria-hidden="true"
                />

                {/* Top accent bar */}
                <div
                  className={`pointer-events-none absolute left-0 right-0 top-0 h-[2px] rounded-t-2xl ${colors.bg} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  aria-hidden="true"
                />

                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <div
                    className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl border ${colors.border} ${colors.bg} transition-transform duration-300 group-hover:scale-110`}
                    aria-hidden="true"
                  >
                    <Icon className={`h-5 w-5 ${colors.text}`} />
                  </div>

                  {/* SEO H3: each card is an h3 under the section H2 */}
                  <h3 className="mb-2 text-base font-semibold text-foreground">
                    {industry.title}
                  </h3>

                  <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {industry.description}
                  </p>

                  {/* CTA arrow */}
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold ${colors.text} transition-all`}
                    aria-hidden="true"
                  >
                    Explore Solutions
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>

      {/* SEO: "View all industries" link — passes link equity to /industries */}
      <motion.div
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mt-10 flex justify-center"
      >
        <Link
          href="/industries"
          className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/60 px-5 py-2.5 text-xs font-semibold text-muted-foreground backdrop-blur-sm transition-all hover:border-primary/30 hover:text-primary"
          aria-label="View all industries served by PixoraNest AI automation"
        >
          View all industries we serve
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </motion.div>
    </SectionWrapper>
  )
}