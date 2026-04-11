import type { Metadata } from "next"
import { SolutionsPageContent } from "./solutions-content"
import { allSolutionsSchemas } from "@/lib/schema/solutions-schema"


  // (unchanged SEO code)


export default function SolutionsPage() {
  return (
    <>
      {allSolutionsSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <SolutionsPageContent />
    </>
  )
}

// ─── COMPREHENSIVE SEO METADATA ────────────────────────────────────────────────
// Strategy: Target every "AI automation" search in India —
// national, state-level (Rajasthan), city-level (Jaipur, Alwar, Narayanpur),
// and "near me" intent. Also covers industry-specific searches.
// ──────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  // ── Title: Primary keyword + brand (55 chars) ──
  title: "AI Automation Solutions for Indian Businesses | PixoraNest",

  // ── Description: Hook + keywords + CTA (158 chars) ──
  description:
    "PixoraNest offers AI automation solutions for Indian businesses — AI receptionist, WhatsApp automation, CRM, call & social automation. Book a free demo today.",

  // ── Keywords: National + State + City + Near Me + Industry ──
  keywords: [
    // PRIMARY — national
    "AI automation solutions India",
    "AI automation services India",
    "business automation tools India",
    "AI tools for small business India",
    "automate business processes India",
    "AI solutions for startups India",
    "intelligent automation India",
    "SaaS automation platform India",
    "AI-powered business tools India",
    "digital transformation India",

    // NEAR ME intent (highest conversion)
    "AI automation near me",
    "business automation near me",
    "AI automation company near me",
    "AI tools near me",
    "automation services near me",

    // RAJASTHAN — state level
    "AI automation in Rajasthan",
    "business automation Rajasthan",
    "AI tools for business Rajasthan",
    "AI automation company Rajasthan",
    "digital automation Rajasthan",
    "AI services Rajasthan",

    // JAIPUR — city level
    "AI automation in Jaipur",
    "AI automation company Jaipur",
    "business automation Jaipur",
    "AI tools Jaipur",
    "WhatsApp automation Jaipur",
    "CRM automation Jaipur",
    "AI receptionist Jaipur",
    "lead automation Jaipur",

    // ALWAR — city level
    "AI automation in Alwar",
    "business automation Alwar",
    "AI tools Alwar",
    "AI automation company Alwar",
    "WhatsApp automation Alwar",

    // NARAYANPUR — city level
    "AI automation in Narayanpur",
    "business automation Narayanpur",
    "AI tools Narayanpur",

    // PRODUCT / CHANNEL specific
    "AI receptionist for business India",
    "WhatsApp automation India",
    "WhatsApp lead automation India",
    "WhatsApp business automation India",
    "CRM automation India",
    "CRM workflow automation India",
    "AI call handling system India",
    "call automation software India",
    "AI voice agent India",
    "social media automation India",
    "Instagram automation India",
    "Facebook automation India",

    // INDUSTRY specific (people search these)
    "AI automation for real estate India",
    "AI automation for clinics India",
    "AI automation for hospitals India",
    "AI automation for coaching institutes India",
    "AI automation for ecommerce India",
    "AI automation for D2C brands India",
    "AI automation for startups India",
    "AI automation for SMEs India",
    "AI automation for insurance India",
    "AI automation for lawyers India",

    // PROBLEM / INTENT keywords (people searching for solutions)
    "automate customer communication India",
    "automate lead follow-ups India",
    "reduce missed calls business India",
    "automate WhatsApp replies India",
    "AI chatbot for business India",
    "lead generation automation India",
    "sales automation India",
    "marketing automation India",
    "workflow automation software India",
    "AI customer support automation India",
    "voice AI assistant India",
    "AI for SMEs India",
    "business growth automation India",
    "reduce manual work business India",
    "AI-based customer engagement India",
  ],

  // ── Canonical ──
  alternates: {
    canonical: "https://pixoranest.com/solutions",
    languages: {
      "en-IN": "https://pixoranest.com/solutions",
    },
  },

  // ── Robots ──
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Open Graph ──
  openGraph: {
    title: "AI Automation Solutions for Indian Businesses | PixoraNest",
    description:
      "AI receptionist, WhatsApp automation, CRM workflows, AI voice agents & social automation — all in one platform built for Indian businesses.",
    url: "https://pixoranest.com/solutions",
    siteName: "PixoraNest",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://pixoranest.com/og-solutions.png",
        width: 1200,
        height: 630,
        alt: "PixoraNest AI Automation Solutions — Built for Indian Businesses",
      },
    ],
  },

  // ── Twitter Card ──
  twitter: {
    card: "summary_large_image",
    title: "AI Automation Solutions for Indian Businesses | PixoraNest",
    description:
      "Automate calls, WhatsApp, CRM & social media with PixoraNest. Trusted by 500+ Indian businesses. Book a free demo.",
    images: ["https://pixoranest.com/og-solutions.png"],
    site: "@pixoranest",
    creator: "@pixoranest",
  },

  // ── Verification & Author ──
  authors: [{ name: "PixoraNest", url: "https://pixoranest.com" }],
  category: "AI Automation Software",
  classification: "Business Software",
}

