"use client"

import { motion } from "framer-motion"
import { fadeInUp, staggerContainer } from "@/lib/animations"
import { SectionWrapper, SectionHeader } from "@/components/section-wrapper"
import { solutions } from "@/lib/data"
import {
  Phone, MessageCircle, PhoneForwarded, Mic, Share2, Settings, Bot, CheckCircle2,
} from "lucide-react"

const iconMap: Record<string, React.ElementType> = {
  Phone, MessageCircle, PhoneForwarded, Mic, Share2, Settings, Bot,
}

// SEO: feature bullets are benefit-driven with India-specific context
const featureMap: Record<string, string[]> = {
  "ai-chatbot":              ["24/7 automated customer support", "AI lead qualification for Indian markets", "Multi-channel WhatsApp & web ready"],
  "whatsapp-automation":     ["Bulk broadcast campaigns India", "Auto-reply & drip flows", "CRM integration & lead tracking"],
  "call-automation":         ["Inbound AI call handling India", "Smart routing & escalation", "Call transcription & analytics"],
  "voice-agent":             ["Human-like conversations in Hindi & English", "Automated appointment booking", "Multilingual support for Indian customers"],
  "social-media-automation": ["Auto-post scheduling India", "Engagement tracking & reporting", "Content repurposing across platforms"],
  "workflow-automation":     ["No-code automation builder", "Multi-app triggers & actions", "Error handling & monitoring"],
  "ai-agent":                ["Autonomous AI task execution", "Memory, context & learning", "API & CRM integrations India"],
}

const defaultFeatures = ["Fully managed setup", "Custom integration", "Dedicated support"]

// SEO: keyword-enriched titles mapped per solution slug
// These override whatever title comes from /lib/data for SEO purposes
const seoTitleMap: Record<string, string> = {
  "ai-chatbot":              "AI Chatbot for Indian Businesses — 24/7 Lead Capture",
  "whatsapp-automation":     "WhatsApp Automation India — Broadcast & Auto-Reply",
  "call-automation":         "AI Call Routing Software India — Smart Inbound Handling",
  "voice-agent":             "AI Voice Agent India — Human-Like Conversations 24/7",
  "social-media-automation": "Social Media Automation India — Auto-Post & Engagement",
  "workflow-automation":     "Workflow Automation for SMEs India — No-Code Builder",
  "ai-agent":                "AI Agent Development India — Autonomous Task Execution",
}

export function SolutionsSection() {
  return (
    // SEO: aria-label on section
    <SectionWrapper
      id="solutions"
      aria-label="PixoraNest AI automation solutions for Indian businesses"
    >
      {/*
        SEO H2: "AI Automation Solutions for Businesses in India"
        Subtitle contains: customer communication, lead management, workflow automation
      */}
      <SectionHeader
        title="AI Automation Solutions for Businesses in India"
        subtitle="Comprehensive AI automation services designed to transform customer communication, lead management, and business workflows for Indian startups and SMEs."
      />

      {/* Grid: 1 col mobile, 2 col sm, 3 col lg */}
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        {solutions.map((solution) => {
          const Icon = iconMap[solution.icon] || Bot
          const features = featureMap[solution.slug] ?? defaultFeatures
          // Use SEO-optimised title if available, fall back to data title
          const displayTitle = seoTitleMap[solution.slug] ?? solution.title

          return (
            <motion.div
              key={solution.slug}
              variants={fadeInUp}
              whileHover={{ y: -4, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
            >
              <div
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10"
                // SEO: article role makes each card a self-contained content unit
                role="article"
                aria-label={displayTitle}
              >
                {/* Inner glow */}
                <div
                  className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-primary/6 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />

                {/* Icon */}
                <div
                  className="relative mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20 group-hover:shadow-lg group-hover:shadow-primary/20"
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5 text-primary" />
                </div>

                {/*
                  SEO H3: each card title is an h3 under the section H2.
                  Using the SEO-optimised title that includes India + benefit.
                */}
                <h3 className="relative mb-2 text-base font-semibold text-foreground">
                  {displayTitle}
                </h3>

                {/* Description — keep original from data */}
                <p className="relative mb-4 text-sm leading-relaxed text-muted-foreground">
                  {solution.description}
                </p>

                {/* Feature bullets — benefit-driven, India-specific */}
                <ul
                  className="relative mt-auto space-y-1.5 border-t border-border/40 pt-4"
                  aria-label={`Features of ${displayTitle}`}
                >
                  {features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary/60" aria-hidden="true" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </SectionWrapper>
  )
}