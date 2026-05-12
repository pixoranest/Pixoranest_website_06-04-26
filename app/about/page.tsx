import type { Metadata } from "next"
import { AboutPageContent } from "./about-content"

const SITE_URL = "https://www.pixoranest.com"

// ─── JSON-LD: Breadcrumb only ─────────────────────────────────────────────────
// Organization is defined once in layout.tsx with @id "https://www.pixoranest.com/#organization".
// Here we reference it — we do NOT redefine it. Redefining causes SEMrush
// "duplicate/conflicting structured data" errors.
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${SITE_URL}/about#breadcrumb`,
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

// ─── JSON-LD: AboutPage WebPage ───────────────────────────────────────────────
const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/about#webpage`,
  url: `${SITE_URL}/about`,
  name: "About PixoraNest | AI Automation Company India",
  description:
    "Learn about PixoraNest's mission to automate AI for Indian businesses. Founded in 2024, we've helped 500+ companies save costs and increase sales.",
  inLanguage: "en-IN",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  breadcrumb: { "@id": `${SITE_URL}/about#breadcrumb` },
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: "About PixoraNest | AI Automation Company India",

  description:
    "Learn about PixoraNest's mission to automate AI for Indian businesses. Founded in 2024, we've helped 500+ companies save costs and increase sales.",

  keywords: [
    "about PixoraNest",
    "AI automation company India",
    "PixoraNest founders",
    "AI automation startup India",
    "business automation services provider",
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
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AboutPageContent />
    </>
  )
}