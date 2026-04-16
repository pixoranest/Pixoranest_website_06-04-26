"use client"

import Link from "next/link"
import {
  Heart, ShoppingCart, Factory, Truck, DollarSign,
  GraduationCap, Hotel, Building, Monitor, ArrowRight,
} from "lucide-react"

// ─── Types ─────────────────────────────────────────────────────────────────

interface Industry {
  slug: string
  icon: string
  title: string
  description: string
}

// ─── Inline fallback data (replace with your @/lib/data import if working) ──

const industries: Industry[] = [
  {
    slug: "healthcare",
    icon: "Heart",
    title: "Healthcare",
    description:
      "Healthcare organisations handle thousands of patient interactions daily, from appointment scheduling to follow-ups and prescription reminders. AI automation helps clinics, hospitals, and diagnostics centers streamline these processes efficiently. Virtual receptionists powered by AI ensure every call and inquiry is answered instantly, reducing patient wait times and staff overload.",
  },
  {
    slug: "ecommerce",
    icon: "ShoppingCart",
    title: "E-commerce",
    description:
      "E-commerce businesses face intense competition where customer experience defines success. Managing orders, inventory, support tickets, and marketing campaigns manually limits growth potential. AI-powered automation handles cart recovery, personalised recommendations, and instant customer support around the clock.",
  },
  {
    slug: "manufacturing",
    icon: "Factory",
    title: "Manufacturing",
    description:
      "Modern manufacturing demands precision, efficiency, and seamless coordination across production lines, supply chains, and quality control. AI automation optimises production scheduling, monitors equipment health, and predicts maintenance needs before breakdowns occur.",
  },
  {
    slug: "logistics",
    icon: "Truck",
    title: "Logistics",
    description:
      "Logistics companies manage complex networks of shipments, drivers, warehouses, and customer expectations. Without automation, route inefficiencies, communication gaps, and delayed updates erode profitability and customer satisfaction. AI-powered route optimisation reduces fuel costs and delivery times.",
  },
  {
    slug: "finance",
    icon: "DollarSign",
    title: "Finance",
    description:
      "Financial institutions operate under strict regulatory requirements where accuracy, speed, and security are non-negotiable. AI automation streamlines KYC verification, loan processing, and fraud detection with real-time pattern analysis. Automated reporting ensures regulatory submissions are accurate and timely.",
  },
  {
    slug: "education",
    icon: "GraduationCap",
    title: "Education",
    description:
      "Educational institutions — from schools and universities to online learning platforms — juggle student enrolment, attendance tracking, fee collection, and parent communication daily. AI automation handles enrolment processing, sends automated attendance and fee reminders, and provides 24/7 inquiry handling for prospective students.",
  },
  {
    slug: "hospitality",
    icon: "Hotel",
    title: "Hospitality",
    description:
      "In hospitality, guest experience determines reputation and repeat business. Hotels, restaurants, and travel companies must respond to inquiries instantly, manage reservations across channels, and deliver personalised service at scale. AI concierge systems handle booking confirmations, pre-arrival communications, and instant guest support.",
  },
  {
    slug: "real-estate",
    icon: "Building",
    title: "Real Estate",
    description:
      "Real estate professionals handle high-value transactions that require instant follow-ups, property matching, and consistent communication with buyers, sellers, and tenants. AI automation captures and qualifies leads instantly via WhatsApp and web forms, sends automated property recommendations, and schedules viewings automatically.",
  },
  {
    slug: "it-saas",
    icon: "Monitor",
    title: "IT & SaaS",
    description:
      "SaaS and IT companies operate in fast-paced environments where user experience, rapid iteration, and efficient scaling determine success. Converting trial users, managing support at scale, and preventing churn require systems that grow with your user base. AI automation handles onboarding sequences, product adoption nudges, and intelligent support routing.",
  },
]

// ─── Color map ──────────────────────────────────────────────────────────────

const iconMap: Record<string, React.ElementType> = {
  Heart, ShoppingCart, Factory, Truck, DollarSign,
  GraduationCap, Hotel, Building, Monitor,
}

const colorMap: Record<string, { text: string; bg: string; border: string; hoverBorder: string }> = {
  Heart:         { text: "text-red-500",     bg: "bg-red-50",     border: "border-red-200/60",     hoverBorder: "hover:border-red-300"     },
  ShoppingCart:  { text: "text-green-600",   bg: "bg-green-50",   border: "border-green-200/60",   hoverBorder: "hover:border-green-300"   },
  Factory:       { text: "text-amber-600",   bg: "bg-amber-50",   border: "border-amber-200/60",   hoverBorder: "hover:border-amber-300"   },
  Truck:         { text: "text-sky-500",     bg: "bg-sky-50",     border: "border-sky-200/60",     hoverBorder: "hover:border-sky-300"     },
  DollarSign:    { text: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200/60", hoverBorder: "hover:border-emerald-300" },
  GraduationCap: { text: "text-violet-600",  bg: "bg-violet-50",  border: "border-violet-200/60",  hoverBorder: "hover:border-violet-300"  },
  Hotel:         { text: "text-rose-500",    bg: "bg-rose-50",    border: "border-rose-200/60",    hoverBorder: "hover:border-rose-300"    },
  Building:      { text: "text-orange-600",  bg: "bg-orange-50",  border: "border-orange-200/60",  hoverBorder: "hover:border-orange-300"  },
  Monitor:       { text: "text-cyan-600",    bg: "bg-cyan-50",    border: "border-cyan-200/60",    hoverBorder: "hover:border-cyan-300"    },
}

const fallback = {
  text: "text-blue-500",
  bg: "bg-blue-50",
  border: "border-blue-200/60",
  hoverBorder: "hover:border-blue-300",
}

// ─── Component ──────────────────────────────────────────────────────────────

export function IndustriesSection() {
  return (
    <section
      id="industries"
      className="relative w-full bg-white py-20 md:py-28 px-4 sm:px-6 lg:px-8"
      aria-label="AI automation solutions for Indian industries — healthcare, real estate, e-commerce and more"
    >
      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#64748b 1px, transparent 1px), linear-gradient(90deg, #64748b 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-[2.6rem] leading-tight">
            AI Automation for Every Industry in India
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-500 sm:text-[1.05rem]">
            PixoraNest provides AI automation solutions for Indian healthcare,
            real estate, D2C e-commerce, fintech, edtech, hospitality, and
            technology businesses.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.slice(0, 9).map((industry) => {
            const Icon = iconMap[industry.icon] || Monitor
            const c = colorMap[industry.icon] || fallback

            return (
              <Link
                key={industry.slug}
                href={`/industries/${industry.slug}`}
                className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border ${c.border} bg-white p-6 shadow-sm transition-all duration-300 ${c.hoverBorder} hover:shadow-xl hover:-translate-y-1`}
                aria-label={`AI automation for ${industry.title} in India — explore solutions`}
              >
                {/* Hover bg tint */}
                <div
                  className={`pointer-events-none absolute inset-0 rounded-2xl ${c.bg} opacity-0 transition-opacity duration-300 group-hover:opacity-60`}
                  aria-hidden="true"
                />

                {/* Icon */}
                <div
                  className={`relative mb-5 flex h-11 w-11 items-center justify-center rounded-xl border ${c.border} ${c.bg} transition-all duration-300 group-hover:scale-110`}
                  aria-hidden="true"
                >
                  <Icon className={`h-5 w-5 ${c.text}`} />
                </div>

                {/* Title */}
                <h3 className="relative mb-2.5 text-[0.95rem] font-semibold text-gray-900">
                  {industry.title}
                </h3>

                {/* Description */}
                <p className="relative mb-5 flex-1 text-sm leading-relaxed text-gray-500">
                  {industry.description}
                </p>

                {/* CTA */}
                <span
                  className={`relative inline-flex items-center gap-1.5 text-xs font-semibold ${c.text} transition-all`}
                >
                  Explore Solutions
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            )
          })}
        </div>

        {/* View all */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/industries"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-xs font-semibold text-gray-500 shadow-sm transition-all duration-300 hover:border-blue-300 hover:text-blue-600 hover:shadow-md"
            aria-label="View all industries served by PixoraNest AI automation"
          >
            View all industries we serve
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default IndustriesSection