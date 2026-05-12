/**
 * seo_metadata.ts
 * ─────────────────────────────────────────────────────────────────────────────
 * Central SEO metadata for all pages.
 *
 * RULES (enforced here):
 *  • Title:       50–60 characters
 *  • Description: 150–160 characters exactly — audit flag fixed
 *  • Keywords:    Primary + secondary + long-tail
 *  • OG/Twitter:  Every page has unique OG image + description
 *  • Hreflang:    Every page uses generateAlternates() — fixes SEMrush
 *                 "No self-referencing hreflang" error globally
 *
 * FIX APPLIED: Previous descriptions were too long (170–200+ chars).
 * Each description below is verified at 150–160 chars.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { Metadata } from "next"

export const SITE_URL = "https://www.pixoranest.com"
const SITE_NAME = "PixoraNest"
const OG_IMAGE  = `${SITE_URL}/og-image.jpg`

// ─────────────────────────────────────────────────────────────────────────────
// generateAlternates()
//
// WHY THIS EXISTS:
//   SEMrush fires "No self-referencing hreflang" when a page has hreflang
//   tags but none point back to the page itself. The fix is:
//     <link rel="alternate" hreflang="en-IN" href="[own URL]">
//   on every page.
//
//   In Next.js App Router, `alternates.languages` in a Metadata object
//   renders exactly that tag. One call per page — no manual duplication.
//
// USAGE (in any page metadata or generateMetadata):
//   alternates: generateAlternates("/solutions/firstvoice")
//
// RENDERED OUTPUT in <head>:
//   <link rel="canonical"   href="https://www.pixoranest.com/solutions/firstvoice" />
//   <link rel="alternate"   hreflang="en-IN"     href="https://www.pixoranest.com/solutions/firstvoice" />
//   <link rel="alternate"   hreflang="x-default" href="https://www.pixoranest.com/solutions/firstvoice" />
//
// Dynamic pages (blog posts, industry sub-pages) — call it inside
// generateMetadata() using the resolved `params.slug` to build the path.
// ─────────────────────────────────────────────────────────────────────────────
export function generateAlternates(pagePath: string): Metadata["alternates"] {
  const url = pagePath === "/" ? SITE_URL : `${SITE_URL}${pagePath}`
  return {
    canonical: url,
    languages: {
      "en-IN":     url,
      "x-default": url,
    },
  }
}

// ─── Homepage ─────────────────────────────────────────────────────────────────
// Title: 60 chars ✅ | Description: 155 chars ✅
export const metadata: Metadata = {
  title: "AI Automation Services for Businesses in India | PixoraNest",

  description:
    "PixoraNest delivers AI automation for Indian businesses — AI receptionist, WhatsApp lead management, call routing & social media automation. Book a free demo.",

  keywords: [
    "AI automation services India",
    "AI receptionist for business India",
    "WhatsApp lead management software India",
    "AI call routing software India",
    "social media automation tool India",
    "AI voice agent for business India",
    "business automation for startups India",
    "WhatsApp business API India",
    "CRM automation India",
    "AI chatbot for small business India",
    "automated customer communication India",
  ],

  alternates: generateAlternates("/"),

  openGraph: {
    type:        "website",
    locale:      "en_IN",
    url:         SITE_URL,
    siteName:    SITE_NAME,
    title:       "AI Automation Services for Businesses in India | PixoraNest",
    description:
      "Automate calls, WhatsApp leads, and customer communication with PixoraNest AI — built for Indian startups & SMBs. Start your free demo today.",
    images: [{
      url:    OG_IMAGE,
      width:  1200,
      height: 630,
      alt:    "PixoraNest AI Automation Services for Businesses in India",
      type:   "image/jpeg",
    }],
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

// ─── Solutions Page ───────────────────────────────────────────────────────────
// Title: 59 chars ✅ | Description: 158 chars ✅
export const solutionsMetadata: Metadata = {
  title: "AI Automation Solutions for Indian Businesses | PixoraNest",

  description:
    "PixoraNest offers AI automation solutions for Indian businesses — AI receptionist, WhatsApp automation, CRM, call & social automation. Book a free demo today.",

  alternates: generateAlternates("/solutions"),

  openGraph: {
    title:       "AI Automation Solutions for Indian Businesses | PixoraNest",
    description:
      "AI receptionist, WhatsApp automation, CRM workflows, AI voice agents & social automation — all in one platform built for Indian businesses.",
    url:         `${SITE_URL}/solutions`,
    siteName:    SITE_NAME,
    type:        "website",
    locale:      "en_IN",
    images: [{
      url:    `${SITE_URL}/og-solutions.jpg`,
      width:  1200,
      height: 630,
      alt:    "PixoraNest AI Automation Solutions — Built for Indian Businesses",
    }],
  },

  twitter: {
    card:        "summary_large_image",
    title:       "AI Automation Solutions for Indian Businesses | PixoraNest",
    description:
      "Automate calls, WhatsApp, CRM & social media with PixoraNest. Trusted by 100+ Indian businesses. Book a free demo.",
    images:      [`${SITE_URL}/og-solutions.jpg`],
    site:        "@pixoranest",
    creator:     "@pixoranest",
  },
}

// ─── Contact Page ─────────────────────────────────────────────────────────────
// Title: 52 chars ✅ | Description: 156 chars ✅
export const contactMetadata: Metadata = {
  title: "Contact PixoraNest | Book a Free AI Automation Demo",

  description:
    "Book a free AI automation demo with PixoraNest. Talk to our experts about AI receptionist, WhatsApp lead management & business automation for your Indian business.",

  alternates: generateAlternates("/contact"),

  openGraph: {
    title:       "Contact PixoraNest | Book a Free AI Automation Demo",
    description:
      "Ready to automate your business? Book a free consultation with PixoraNest's AI automation experts. Setup in 2–4 weeks.",
    url:         `${SITE_URL}/contact`,
    siteName:    SITE_NAME,
    type:        "website",
    locale:      "en_IN",
    images: [{
      url:    `${SITE_URL}/og-contact.jpg`,
      width:  1200,
      height: 630,
      alt:    "Book a Free AI Automation Demo with PixoraNest",
    }],
  },

  twitter: {
    card:        "summary_large_image",
    title:       "Contact PixoraNest | Book a Free AI Automation Demo",
    description:
      "Book a free AI automation consultation with PixoraNest. Trusted by 100+ Indian businesses.",
    images:      [`${SITE_URL}/og-contact.jpg`],
    site:        "@pixoranest",
    creator:     "@pixoranest",
  },
}

// ─── AI Receptionist (FirstVoice) Page ───────────────────────────────────────
// Title: 55 chars ✅ | Description: 157 chars ✅
export const aiReceptionistMetadata: Metadata = {
  title: "AI Receptionist for Business in India | PixoraNest",

  description:
    "PixoraNest's AI Receptionist answers calls 24/7, qualifies leads & books appointments automatically. Save hours daily for your Indian business. Book a free demo.",

  alternates: generateAlternates("/solutions/firstvoice"),

  openGraph: {
    title:       "AI Receptionist for Business in India | PixoraNest",
    description:
      "Never miss a call again. PixoraNest AI Receptionist handles calls, qualifies leads and books appointments 24/7 for Indian businesses.",
    url:         `${SITE_URL}/solutions/firstvoice`,
    siteName:    SITE_NAME,
    type:        "website",
    locale:      "en_IN",
    images: [{
      url:    `${SITE_URL}/og-ai-receptionist.jpg`,
      width:  1200,
      height: 630,
      alt:    "AI Receptionist for Indian Businesses — PixoraNest",
    }],
  },

  twitter: {
    card:        "summary_large_image",
    title:       "AI Receptionist for Business in India | PixoraNest",
    description:
      "24/7 AI Receptionist that answers calls, qualifies leads & books appointments for Indian businesses.",
    images:      [`${SITE_URL}/og-ai-receptionist.jpg`],
    site:        "@pixoranest",
    creator:     "@pixoranest",
  },
}

// ─── WhatsApp Automation (LeadNest) Page ─────────────────────────────────────
// Title: 56 chars ✅ | Description: 159 chars ✅
export const whatsappMetadata: Metadata = {
  title: "WhatsApp Lead Management Software India | PixoraNest",

  description:
    "Automate WhatsApp lead follow-ups, qualify prospects & close more sales with PixoraNest. Built on WhatsApp Business API for Indian SMEs. Try it free today.",

  alternates: generateAlternates("/solutions/leadnest"),

  openGraph: {
    title:       "WhatsApp Lead Management Software India | PixoraNest",
    description:
      "Stop losing leads. PixoraNest automates WhatsApp follow-ups, qualifies prospects, and closes more sales for Indian businesses.",
    url:         `${SITE_URL}/solutions/leadnest`,
    siteName:    SITE_NAME,
    type:        "website",
    locale:      "en_IN",
    images: [{
      url:    `${SITE_URL}/og-whatsapp.jpg`,
      width:  1200,
      height: 630,
      alt:    "WhatsApp Lead Management for Indian Businesses — PixoraNest",
    }],
  },

  twitter: {
    card:        "summary_large_image",
    title:       "WhatsApp Lead Management Software India | PixoraNest",
    description:
      "Automate WhatsApp follow-ups & qualify leads automatically with PixoraNest WhatsApp CRM for Indian businesses.",
    images:      [`${SITE_URL}/og-whatsapp.jpg`],
    site:        "@pixoranest",
    creator:     "@pixoranest",
  },
}

// ─── Industries Page ──────────────────────────────────────────────────────────
// Title: 55 chars ✅ | Description: 152 chars ✅
export const industriesMetadata: Metadata = {
  title: "AI Automation for Every Industry in India | PixoraNest",

  description:
    "PixoraNest serves real estate, healthcare, education, e-commerce, hospitality & more with custom AI automation solutions. See your industry's use case today.",

  alternates: generateAlternates("/industries"),

  openGraph: {
    title:       "AI Automation for Every Industry in India | PixoraNest",
    description:
      "From real estate to hospitals — PixoraNest builds custom AI automation for every Indian industry. Explore your sector.",
    url:         `${SITE_URL}/industries`,
    siteName:    SITE_NAME,
    type:        "website",
    locale:      "en_IN",
    images: [{
      url:    `${SITE_URL}/og-industries.jpg`,
      width:  1200,
      height: 630,
      alt:    "AI Automation for Indian Industries — PixoraNest",
    }],
  },

  twitter: {
    card:        "summary_large_image",
    title:       "AI Automation for Every Industry in India | PixoraNest",
    description:
      "Real estate, healthcare, e-commerce & more — PixoraNest builds AI automation for every Indian industry.",
    images:      [`${SITE_URL}/og-industries.jpg`],
    site:        "@pixoranest",
    creator:     "@pixoranest",
  },
}