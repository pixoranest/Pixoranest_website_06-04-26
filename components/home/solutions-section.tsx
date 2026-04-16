"use client"

import {
  Phone, MessageCircle, PhoneForwarded, Mic, Share2, Settings, Bot, CheckCircle2,
} from "lucide-react"

// ─── Types ─────────────────────────────────────────────────────────────────

interface Solution {
  slug: string
  icon: string
  title: string
  description: string
}

// ─── Inline fallback data (replace with your @/lib/data import if working) ──

const solutions: Solution[] = [
  {
    slug: "ai-chatbot",
    icon: "Phone",
    title: "AI Receptionist — FirstVoice",
    description:
      "FirstVoice is an advanced AI receptionist software designed to automate inbound business calls and provide a virtual phone answering service for modern companies. This AI-powered call handling system automatically answers customer calls, captures leads, routes conversations to the right team members, and schedules appointments using intelligent automation technology.",
  },
  {
    slug: "whatsapp-automation",
    icon: "MessageCircle",
    title: "WhatsApp Automation — LeadNest",
    description:
      "LeadNest is a powerful WhatsApp automation software built to help businesses automate customer communication, capture leads, and run automated WhatsApp marketing campaigns. Using the official WhatsApp Business API, this platform allows companies to send automated messages, create chatbot workflows, and manage conversations at scale.",
  },
  {
    slug: "call-automation",
    icon: "PhoneForwarded",
    title: "AI Call Automation — CallOrbit",
    description:
      "CallOrbit is an AI call automation platform that helps businesses automate inbound and outbound call management using intelligent routing technology. This AI-powered call handling system automatically distributes calls, prioritises conversations, and provides real-time analytics to improve communication efficiency.",
  },
  {
    slug: "voice-agent",
    icon: "Mic",
    title: "AI Voice Agent — EchoAssist",
    description:
      "EchoAssist is an intelligent AI voice agent designed to automate phone conversations and provide automated customer support using natural voice technology. This AI voice automation system can answer customer inquiries, qualify leads, schedule appointments, and handle routine support requests without human intervention.",
  },
  {
    slug: "social-media-automation",
    icon: "Share2",
    title: "Social Media Automation — Socialium",
    description:
      "Socialium is a social media automation platform that helps businesses automate content publishing, audience engagement, and response management across multiple social media channels. This automation tool allows companies to schedule posts, automate replies to messages and comments, track engagement analytics, and maintain consistent brand communication.",
  },
  {
    slug: "workflow-automation",
    icon: "Settings",
    title: "CRM Workflow Automation",
    description:
      "CRM Workflow Automation is an AI-powered automation solution designed to help businesses manage leads, automate follow-ups, and streamline sales pipelines using intelligent workflow automation. This business automation platform integrates with CRM systems to capture leads automatically, track customer interactions, and trigger automated communication sequences.",
  },
]

const iconMap: Record<string, React.ElementType> = {
  Phone, MessageCircle, PhoneForwarded, Mic, Share2, Settings, Bot,
}

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

// ─── Component ──────────────────────────────────────────────────────────────

export function SolutionsSection() {
  return (
    <section
      id="solutions"
      className="relative w-full bg-[#f0f4fa] py-20 md:py-28 px-4 sm:px-6 lg:px-8"
      aria-label="PixoraNest AI automation solutions for Indian businesses"
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
            AI Automation Solutions for Businesses in India
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-500 sm:text-[1.05rem]">
            Comprehensive AI automation services designed to transform customer
            communication, lead management, and business workflows for Indian
            startups and SMEs.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution) => {
            const Icon = iconMap[solution.icon] || Bot
            const features = featureMap[solution.slug] ?? defaultFeatures

            return (
              <div
                key={solution.slug}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white/90 p-6 shadow-sm transition-all duration-300 hover:border-blue-200 hover:shadow-xl hover:-translate-y-1"
                role="article"
                aria-label={solution.title}
              >
                {/* Hover top gradient */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-blue-500/4 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />
                {/* Top accent line */}
                <div
                  className="pointer-events-none absolute left-6 right-6 top-0 h-[1px] rounded-full bg-gradient-to-r from-transparent via-blue-400/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />

                {/* Icon */}
                <div
                  className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-blue-200/60 bg-blue-50 transition-all duration-300 group-hover:scale-110 group-hover:bg-blue-100 group-hover:shadow-md"
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5 text-blue-500" />
                </div>

                {/* Title */}
                <h3 className="relative mb-2.5 text-[0.95rem] font-semibold text-gray-900 leading-snug">
                  {solution.title}
                </h3>

                {/* Description */}
                <p className="relative mb-5 text-sm leading-relaxed text-gray-500 flex-1">
                  {solution.description}
                </p>

                {/* Features */}
                <ul
                  className="relative space-y-2 border-t border-gray-100 pt-4"
                  aria-label={`Features of ${solution.title}`}
                >
                  {features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-xs text-gray-400">
                      <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-blue-400/70" aria-hidden="true" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default SolutionsSection