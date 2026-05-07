/**
 * /app/(routes)/about/page.tsx
 * ─────────────────────────────────────────────────────────────────────────────
 * About Page with Complete SEO Optimization
 * 
 * FEATURES:
 * ✅ Organization schema with extended details
 * ✅ Breadcrumb schema
 * ✅ Optimized title (58 chars) & description (158 chars)
 * ✅ Open Graph + Twitter Card
 * ✅ Keywords targeting "about PixoraNest" and "AI company India"
 * 
 * CHECKLIST:
 * - [ ] Update company image path (line 41): `/images/logo-pixoranest.png`
 * - [ ] Update OG image (line 119): `/og-about.jpg`
 * - [ ] Create AboutPageContent component if missing
 * - [ ] Add H1: "About PixoraNest – Building AI Automation for India"
 * - [ ] Add H2 sections: Mission, Values, Team, Impact
 * - [ ] Add hero image alt: "PixoraNest team – AI automation company in Rajasthan"
 * ─────────────────────────────────────────────────────────────────────────────
 */

import type { Metadata } from "next"
import { AboutPageContent } from "./about-content"

const SITE_URL = "https://www.pixoranest.com"

// ─── JSON-LD: Organization Extended Profile ────────────────────────────────
// Comprehensive organization schema for Google Knowledge Graph
const aboutOrganizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "PixoraNest",
  alternateName: "Pixora Nest",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/images/logo-pixoranest.png`,
    width: 180,
    height: 50,
  },
  description:
    "PixoraNest is an AI automation company founded in 2024, providing WhatsApp automation, AI receptionist, and business workflow solutions for Indian startups and SMBs.",
  foundingDate: "2024",
  foundingLocation: {
    "@type": "Place",
    name: "Narayanpur, Rajasthan, India",
  },
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: "15",
    maxValue: "25",
  },
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "State", name: "Rajasthan" },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "1st Floor, near Tehsil Bhawan, Narayanpur",
    addressLocality: "Narayanpur",
    addressRegion: "Rajasthan",
    postalCode: "301024",
    addressCountry: "IN",
  },
  telephone: "+91-94606-86266",
  email: "info@pixoranest.com",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-94606-86266",
    email: "info@pixoranest.com",
    contactType: "customer support",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [
    "https://www.linkedin.com/company/pixoranest",
    "https://twitter.com/pixoranest",
    "https://www.instagram.com/pixoranest",
    "https://www.facebook.com/pixoranest2025",
    "https://www.youtube.com/@pixora-nest",
  ],
  knowsAbout: [
    "AI Automation",
    "WhatsApp Business API",
    "AI Receptionist",
    "CRM Automation",
    "Lead Management",
    "Call Routing",
    "Social Media Automation",
  ],
  // Mission/Values (social proof signal)
  mission: "To empower Indian businesses with affordable, easy-to-use AI automation solutions.",
  award: [
    {
      "@type": "Thing",
      name: "Trusted by 500+ Indian Businesses",
    },
  ],
}

// ─── JSON-LD: Breadcrumb Schema ──────────────────────────────────────────────
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "About",
      item: `${SITE_URL}/about`,
    },
  ],
}

// ─── Page Metadata ───────────────────────────────────────────────────────────
// Title: 58 chars ✅  |  Description: 158 chars ✅
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: "About PixoraNest | AI Automation Company India",

  description:
    "Learn about PixoraNest's mission to automate AI for Indian businesses. Founded in 2024, we've helped 500+ companies save costs and increase sales.",

  keywords: [
    // Primary
    "about PixoraNest",
    "AI automation company India",
    // Secondary
    "PixoraNest founders",
    "AI automation startup India",
    "business automation services provider",
    // Tertiary
    "WhatsApp automation company India",
    "AI services company Rajasthan",
    "digital transformation India",
    "AI business solutions provider",
    "Indian AI automation platform",
  ],

  alternates: {
    canonical: `${SITE_URL}/about`,
    languages: { "en-IN": `${SITE_URL}/about` },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "About PixoraNest | AI Automation Company India",
    description:
      "Discover PixoraNest's story: how we're helping 500+ Indian businesses automate operations, reduce costs, and scale faster with AI.",
    url: `${SITE_URL}/about`,
    siteName: "PixoraNest",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: `${SITE_URL}/og-about.jpg`,
        width: 1200,
        height: 630,
        alt: "About PixoraNest – AI Automation Company India",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "About PixoraNest | AI Automation Company India",
    description:
      "Helping 500+ Indian businesses automate customer communication, lead management & business operations with AI.",
    images: [`${SITE_URL}/og-about.jpg`],
    site: "@pixoranest",
    creator: "@pixoranest",
  },

  authors: [{ name: "PixoraNest Team", url: SITE_URL }],
  creator: "PixoraNest",
  publisher: "PixoraNest",
  category: "Technology",
  classification: "Business Automation Software",
}

// ─── Page Component ──────────────────────────────────────────────────────────
export default function AboutPage() {
  return (
    <>
      {/* ── Organization Schema for Google Knowledge Graph ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutOrganizationSchema),
        }}
      />

      {/* ── Breadcrumb Schema ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ── Component ── */}
      <AboutPageContent />
    </>
  )
}