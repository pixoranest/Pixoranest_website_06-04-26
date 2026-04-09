"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { SectionWrapper, SectionHeader } from "@/components/section-wrapper"
import { industries } from "@/lib/data"
import {
  Heart, ShoppingCart, Factory, Truck, DollarSign,
  GraduationCap, Hotel, Building, Monitor, Rocket, ArrowRight,
} from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  Heart, ShoppingCart, Factory, Truck, DollarSign,
  GraduationCap, Hotel, Building, Monitor, Rocket,
}

const colorMap: Record<string, { text: string; bg: string; border: string; gradient: string }> = {
  Heart:         { text: "text-red-400",     bg: "bg-red-500/10",     border: "border-red-500/20",     gradient: "from-red-500/10 to-transparent" },
  ShoppingCart:  { text: "text-green-400",   bg: "bg-green-500/10",   border: "border-green-500/20",   gradient: "from-green-500/10 to-transparent" },
  Factory:       { text: "text-amber-400",   bg: "bg-amber-500/10",   border: "border-amber-500/20",   gradient: "from-amber-500/10 to-transparent" },
  Truck:         { text: "text-sky-400",     bg: "bg-sky-500/10",     border: "border-sky-500/20",     gradient: "from-sky-500/10 to-transparent" },
  DollarSign:    { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", gradient: "from-emerald-500/10 to-transparent" },
  GraduationCap: { text: "text-violet-400",  bg: "bg-violet-500/10",  border: "border-violet-500/20",  gradient: "from-violet-500/10 to-transparent" },
  Hotel:         { text: "text-rose-400",    bg: "bg-rose-500/10",    border: "border-rose-500/20",    gradient: "from-rose-500/10 to-transparent" },
  Building:      { text: "text-orange-400",  bg: "bg-orange-500/10",  border: "border-orange-500/20",  gradient: "from-orange-500/10 to-transparent" },
  Monitor:       { text: "text-cyan-400",    bg: "bg-cyan-500/10",    border: "border-cyan-500/20",    gradient: "from-cyan-500/10 to-transparent" },
  Rocket:        { text: "text-fuchsia-400", bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/20", gradient: "from-fuchsia-500/10 to-transparent" },
}

const fallback = { text: "text-primary", bg: "bg-primary/10", border: "border-primary/20", gradient: "from-primary/10 to-transparent" }

export function IndustriesSection() {
  return (
    <SectionWrapper id="industries" className="relative bg-card/30">

      {/* Subtle pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <SectionHeader
        title="AI Automation Solutions for Every Industry"
        subtitle="PixoraNest provides AI automation solutions tailored for industries like healthcare, real estate, e-commerce, hospitality, education, and technology."
      />

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
            <motion.div key={industry.slug} variants={fadeInUp}>
              <Link
                href={`/industries/${industry.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-xl"
                style={{}}
              >
                {/* Gradient border on hover via pseudo-element replacement */}
                <div
                  className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br ${colors.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                />
                <div className="pointer-events-none absolute inset-[1px] rounded-2xl bg-card/90" />

                {/* Top accent bar */}
                <div className={`pointer-events-none absolute left-0 right-0 top-0 h-[2px] rounded-t-2xl ${colors.bg} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />

                {/* Content */}
                <div className="relative">
                  <div
                    className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl border ${colors.border} ${colors.bg} transition-transform duration-300 group-hover:scale-110`}
                  >
                    <Icon className={`h-5 w-5 ${colors.text}`} />
                  </div>

                  <h3 className="mb-2 text-base font-semibold text-foreground">
                    {industry.title}
                  </h3>

                  <p className="mb-5 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {industry.description}
                  </p>

                  <span className={`inline-flex items-center gap-1 text-xs font-semibold ${colors.text} transition-all`}>
                    Explore Solutions
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </SectionWrapper>
  )
}