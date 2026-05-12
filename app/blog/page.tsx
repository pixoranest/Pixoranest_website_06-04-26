import type { Metadata } from "next"
import { BlogPageContent } from "./blog-content"

// Use canonical www. domain consistently — without www. creates a separate
// @id that won't resolve to the Organization defined in layout.tsx
const SITE_URL = "https://www.pixoranest.com"

// ─── Blog Schema ──────────────────────────────────────────────────────────────
// Organization is defined in layout.tsx. Reference it here via @id only.
// WebSite is defined in layout.tsx. Reference it here via @id only.
const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": `${SITE_URL}/blog#blog`,
  name: "PixoraNest AI Automation Blog",
  description:
    "Expert insights on AI automation, WhatsApp lead management, AI voice agents and business workflow automation for Indian startups.",
  url: `${SITE_URL}/blog`,
  publisher: { "@id": `${SITE_URL}/#organization` },
  isPartOf: { "@id": `${SITE_URL}/#website` },
  inLanguage: "en-IN",
}

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${SITE_URL}/blog#breadcrumb`,
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
      name: "Blog",
      item: `${SITE_URL}/blog`,
    },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: "AI Automation Blog | WhatsApp, Voice & Lead Automation | PixoraNest",

  description:
    "Explore expert guides on AI automation, WhatsApp lead management, AI voice agents & business workflow automation. Helping Indian startups scale faster.",

  keywords: [
    "AI automation for businesses India",
    "WhatsApp automation India",
    "AI receptionist India",
    "AI voice agent for small business",
    "business automation India",
    "WhatsApp lead management software India",
    "AI call handling India",
    "social media automation India",
    "automate customer support India",
    "AI lead generation India",
    "WhatsApp Business API India",
    "FirstVoice AI receptionist",
    "LeadNest WhatsApp automation",
    "CallOrbit call routing AI",
    "EchoAssist AI voice agent",
    "Socialium social media automation",
    "PixoraNest AI services",
  ],

  authors: [{ name: "PixoraNest Team", url: `${SITE_URL}/about` }],
  creator: "PixoraNest",
  publisher: "PixoraNest",

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

  alternates: {
    canonical: `${SITE_URL}/blog`,
    languages: { "en-IN": `${SITE_URL}/blog` },
  },

  openGraph: {
    title: "AI Automation Blog | WhatsApp, Voice & Lead Automation | PixoraNest",
    description:
      "Expert guides on AI automation, WhatsApp lead management, AI voice agents & workflow automation for Indian startups and small businesses.",
    url: `${SITE_URL}/blog`,
    siteName: "PixoraNest",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og/blog-og.jpg`,
        width: 1200,
        height: 630,
        alt: "PixoraNest AI Automation Blog – WhatsApp & Voice Agent Insights for Indian Businesses",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@pixoranest",
    creator: "@pixoranest",
    title: "AI Automation Blog | PixoraNest",
    description:
      "Expert guides on WhatsApp automation, AI voice agents & lead management for Indian startups and small businesses.",
    images: [
      {
        url: `${SITE_URL}/og/blog-og.jpg`,
        alt: "PixoraNest AI Automation Blog",
      },
    ],
  },

  other: {
    "geo.region": "IN",
    "geo.placename": "India",
    "content-language": "en-IN",
  },
}

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <BlogPageContent />
    </>
  )
}