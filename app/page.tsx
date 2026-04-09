import type { Metadata } from "next"
import { HeroSection } from "@/components/home/hero-section"
import { HowItWorksSection } from "@/components/home/how-it-works-section"
import { SolutionsSection } from "@/components/home/solutions-section"
import { IndustriesSection } from "@/components/home/industries-section"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import LeadForm from "@/components/lead-form"

// ─── Constants ────────────────────────────────────────────────────────────────
const SITE_URL = "https://www.pixoranest.com"   // 🔁 keep in sync with layout.tsx
const OG_IMAGE = `${SITE_URL}/og-image.jpg`

// ─── Page Metadata ────────────────────────────────────────────────────────────
// Title: 58 chars ✅  |  Description: 155 chars ✅
export const metadata: Metadata = {
  title: "AI Automation Services for Businesses in India | PixoraNest",

  description:
    "PixoraNest delivers AI automation services for Indian businesses — AI receptionist, WhatsApp lead management, call routing & social media automation. Book a free demo.",

  keywords: [
    // Primary
    "AI automation services India",
    // Secondary
    "AI receptionist for business India",
    "WhatsApp lead management software India",
    "AI call routing software India",
    "social media automation tool India",
    "AI voice agent for business India",
    // Long-tail / LSI
    "business automation for startups India",
    "WhatsApp business API India",
    "CRM automation India",
    "AI chatbot for small business India",
    "automated customer communication India",
  ],

  alternates: {
    canonical: SITE_URL,
    languages: { "en-IN": SITE_URL },
  },

  openGraph: {
    type:        "website",
    locale:      "en_IN",
    url:         SITE_URL,
    siteName:    "PixoraNest",
    title:       "AI Automation Services for Businesses in India | PixoraNest",
    description:
      "Automate calls, WhatsApp leads, and customer communication using PixoraNest AI tools — built for Indian startups and SMBs. Start your free demo today.",
    images: [
      {
        url:    OG_IMAGE,
        width:  1200,
        height: 630,
        alt:    "PixoraNest AI Automation Services for Businesses in India",
        type:   "image/jpeg",
      },
    ],
  },

  twitter: {
    card:        "summary_large_image",
    title:       "AI Automation Services for Businesses in India | PixoraNest",
    description:
      "AI receptionist, WhatsApp lead management, call routing & social media automation for Indian startups and SMBs.",
    images:  [OG_IMAGE],
    creator: "@pixoranest",
    site:    "@pixoranest",
  },
}

// ─── JSON-LD: HomePage BreadcrumbList ─────────────────────────────────────────
const breadcrumbSchema = {
  "@context":        "https://schema.org",
  "@type":           "BreadcrumbList",
  itemListElement: [
    {
      "@type":    "ListItem",
      position:   1,
      name:       "Home",
      item:       SITE_URL,
    },
  ],
}

// ─── JSON-LD: Service Offerings (ItemList) ────────────────────────────────────
// Helps Google understand and surface individual service pages
const servicesListSchema = {
  "@context": "https://schema.org",
  "@type":    "ItemList",
  name:       "PixoraNest AI Automation Services",
  description:
    "AI automation services for businesses in India including AI receptionist, WhatsApp lead management, call routing, social media automation, and AI voice agents.",
  url:        SITE_URL,
  numberOfItems: 5,
  itemListElement: [
    {
      "@type":    "ListItem",
      position:   1,
      name:       "FirstVoice – AI Receptionist",
      description:
        "24/7 AI receptionist that answers calls, qualifies leads, and books appointments automatically for Indian businesses.",
      url:        `${SITE_URL}/solutions/firstvoice`,
    },
    {
      "@type":    "ListItem",
      position:   2,
      name:       "LeadNest – WhatsApp Lead Management",
      description:
        "WhatsApp CRM and lead management software that auto-follows up, qualifies, and converts leads via WhatsApp Business API.",
      url:        `${SITE_URL}/solutions/leadnest`,
    },
    {
      "@type":    "ListItem",
      position:   3,
      name:       "CallOrbit – AI Call Routing",
      description:
        "Intelligent call handling and routing system that distributes inbound calls to the right team instantly.",
      url:        `${SITE_URL}/solutions/callorbit`,
    },
    {
      "@type":    "ListItem",
      position:   4,
      name:       "Socialium – Social Media Automation",
      description:
        "AI-powered social media automation tool that schedules, posts, and analyzes content across platforms for Indian businesses.",
      url:        `${SITE_URL}/solutions/socialium`,
    },
    {
      "@type":    "ListItem",
      position:   5,
      name:       "EchoAssist – AI Voice Agent",
      description:
        "Conversational AI voice agent that handles customer calls, FAQs, and support queries automatically.",
      url:        `${SITE_URL}/solutions/echoassist`,
    },
  ],
}

// ─── JSON-LD: Homepage FAQ ────────────────────────────────────────────────────
// Targets featured snippet / People Also Ask positions
const faqSchema = {
  "@context": "https://schema.org",
  "@type":    "FAQPage",
  mainEntity: [
    {
      "@type":          "Question",
      name:             "What AI automation services does PixoraNest offer?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "PixoraNest offers five AI automation services for businesses in India: FirstVoice (AI Receptionist), LeadNest (WhatsApp Lead Management), CallOrbit (AI Call Routing), Socialium (Social Media Automation), and EchoAssist (AI Voice Agent).",
      },
    },
    {
      "@type":          "Question",
      name:             "Is PixoraNest suitable for small businesses in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. PixoraNest is specifically designed for Indian startups and small-to-medium businesses (SMBs) that want to automate customer communication, lead management, and business operations without a large IT team.",
      },
    },
    {
      "@type":          "Question",
      name:             "Does PixoraNest integrate with WhatsApp Business API?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "Yes. PixoraNest's LeadNest product is built on the WhatsApp Business API, enabling automated lead follow-up, customer messaging, and CRM workflows directly through WhatsApp.",
      },
    },
    {
      "@type":          "Question",
      name:             "How quickly can I get started with PixoraNest?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "You can book a free demo and get onboarded within 24–48 hours. Our team handles setup, integration, and training so your business is automated quickly.",
      },
    },
    {
      "@type":          "Question",
      name:             "What industries does PixoraNest serve?",
      acceptedAnswer: {
        "@type": "Answer",
        text:
          "PixoraNest serves a wide range of industries including real estate, healthcare, education, e-commerce, hospitality, legal services, and retail businesses across India.",
      },
    },
  ],
}

// ─── Page Component ───────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* ── JSON-LD Schemas ─────────────────────────────────────────────── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      {/*
        SEO NOTE for HeroSection component:
        ✅ Ensure H1 contains primary keyword: "AI Automation Services for Businesses in India"
        ✅ First 100 words must contain: "AI automation", "India", "businesses"
        ✅ Hero image alt text: "AI automation platform for businesses in India – PixoraNest"
        ✅ Suggested image filename: ai-automation-services-india-pixoranest-hero.jpg
      */}
      <HeroSection />

      {/* ── How It Works ────────────────────────────────────────────────── */}
      {/*
        SEO NOTE for HowItWorksSection component:
        ✅ Use H2: "How PixoraNest AI Automation Works"
        ✅ Include semantic keywords: "automated workflows", "AI-powered", "business communication"
        ✅ Step image alts: "step-1-connect-ai-automation-pixoranest.jpg" etc.
      */}
      <HowItWorksSection />

      {/* ── Solutions ───────────────────────────────────────────────────── */}
      {/*
        SEO NOTE for SolutionsSection component:
        ✅ Use H2: "Our AI Automation Solutions for Indian Businesses"
        ✅ Each solution card links internally to its dedicated service page
        ✅ Internal anchor text examples:
            - "Explore FirstVoice AI Receptionist" → /solutions/firstvoice
            - "Learn about LeadNest WhatsApp CRM"  → /solutions/leadnest
            - "See CallOrbit Call Routing"          → /solutions/callorbit
            - "Discover Socialium Social Automation"→ /solutions/socialium
            - "Try EchoAssist AI Voice Agent"       → /solutions/echoassist
        ✅ Card images: "firstvoice-ai-receptionist-india.jpg" etc.
      */}
      <SolutionsSection />

      {/* ── Industries ──────────────────────────────────────────────────── */}
      {/*
        SEO NOTE for IndustriesSection component:
        ✅ Use H2: "Industries We Serve Across India"
        ✅ Include: real estate, healthcare, education, e-commerce, hospitality
        ✅ Internal link: "View all industry solutions" → /industries
        ✅ Helps capture long-tail: "AI automation for real estate India" etc.
      */}
      <IndustriesSection />

      {/* ── Testimonials ────────────────────────────────────────────────── */}
      {/*
        SEO NOTE for TestimonialsSection component:
        ✅ Use H2: "What Indian Businesses Say About PixoraNest"
        ✅ Include reviewer name, business name, city (E-E-A-T signal)
        ✅ Matches aggregateRating in layout.tsx Organization schema
        ✅ Add Review schema markup per testimonial for rich snippet eligibility
      */}
      <TestimonialsSection />

      {/* ── Final CTA + Lead Form ────────────────────────────────────────── */}
      <section
        aria-label="Get a free AI automation demo"
        className="py-20 bg-gradient-to-br from-blue-50 to-white"
      >
        <div className="max-w-6xl mx-auto px-6 text-center mb-10">

          {/*
            H2 here intentionally targets transactional search intent:
            "free AI automation demo India" — commercial + transactional keywords
          */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get a Free AI Automation Demo for Your Business 🚀
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto">
            See how PixoraNest&apos;s AI automation services help Indian businesses
            increase sales, automate customer communication, and save hours every
            week. No technical knowledge required.
          </p>

        </div>

        {/* Lead Form — source tracked for GTM conversion events */}
        <div className="flex justify-center">
          <LeadForm source="homepage-cta" />
        </div>

        {/* Trust signal — E-E-A-T + conversion booster */}
        <p className="text-xs text-gray-500 text-center mt-6">
          🔒 100% secure. No spam ever. Our team contacts you within 24 hours.
        </p>

        {/*
          INTERNAL LINKS — placed near CTA for UX + SEO crawlability
          These pass link equity to high-priority service pages
        */}
        <nav
          aria-label="Explore PixoraNest AI services"
          className="flex flex-wrap justify-center gap-4 mt-10 text-sm"
        >
          <a
            href="/solutions/firstvoice"
            className="text-blue-600 hover:underline"
          >
            AI Receptionist for Business
          </a>
          <span className="text-gray-300" aria-hidden="true">|</span>
          <a
            href="/solutions/leadnest"
            className="text-blue-600 hover:underline"
          >
            WhatsApp Lead Management
          </a>
          <span className="text-gray-300" aria-hidden="true">|</span>
          <a
            href="/solutions/callorbit"
            className="text-blue-600 hover:underline"
          >
            AI Call Routing Software
          </a>
          <span className="text-gray-300" aria-hidden="true">|</span>
          <a
            href="/solutions/socialium"
            className="text-blue-600 hover:underline"
          >
            Social Media Automation India
          </a>
          <span className="text-gray-300" aria-hidden="true">|</span>
          <a
            href="/solutions/echoassist"
            className="text-blue-600 hover:underline"
          >
            AI Voice Agent India
          </a>
        </nav>

      </section>
    </>
  )
}