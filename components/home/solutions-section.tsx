"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { SectionWrapper, SectionHeader } from "@/components/section-wrapper"
import { solutions } from "@/lib/data"
import {
  Phone, MessageCircle, PhoneForwarded, Mic, Share2, Settings, Bot, ArrowRight,
} from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  Phone, MessageCircle, PhoneForwarded, Mic, Share2, Settings, Bot,
}

export function SolutionsSection() {
  return (
    <SectionWrapper id="solutions">
      <SectionHeader
        title="AI Automation Solutions for Businesses"
        subtitle="Comprehensive AI automation services designed to transform customer communication, lead management, and business workflows."
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {solutions.map((solution, i) => {
          const Icon = iconMap[solution.icon] || Bot

          return (
            <motion.div key={solution.slug} variants={fadeInUp}>
              <Link href={`/solutions/${solution.slug}`} className="group block h-full">
                <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-xl hover:shadow-primary/10">

                  {/* Glow on hover */}
                  <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/8 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Icon */}
                  <div className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20 group-hover:shadow-lg group-hover:shadow-primary/20">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>

                  {/* Text */}
                  <h3 className="relative mb-2 text-base font-semibold text-foreground">
                    {solution.title}
                  </h3>

                  <p className="relative flex-1 text-sm leading-relaxed text-muted-foreground">
                    {solution.description}
                  </p>

                  {/* Learn more */}
                  <div className="relative mt-5 flex items-center gap-1.5 text-xs font-semibold text-primary">
                    <span className="transition-all duration-200 group-hover:mr-1">Learn More</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>

                </div>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>
    </SectionWrapper>
  )
}