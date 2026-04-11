import type { Metadata } from "next"
import { IndustriesPageContent } from "./industries-content"

export const metadata: Metadata = {
  title: "AI Automation Solutions by Industry | PixoraNest",

  description:
    "PixoraNest delivers AI automation solutions across 10+ industries — healthcare, real estate, e-commerce, education, logistics, finance & more. Automate calls, leads & customer communication. Go live in 24 hours.",

  keywords: [
    // Primary broad keywords
    "AI automation solutions for industries",
    "AI automation by industry",
    "business AI automation",
    "AI automation platform India",
    "AI business automation software",

    // Industry-specific keywords
    "AI automation for healthcare businesses",
    "AI automation for real estate companies",
    "AI automation for hospitality industry",
    "AI automation for education sector",
    "AI automation for e-commerce businesses",
    "AI automation for logistics companies",
    "AI automation for manufacturing",
    "AI automation for finance companies",
    "AI automation for SaaS startups",
    "AI automation for hotels",

    // Use-case keywords
    "AI tools for customer communication",
    "AI automation for lead management",
    "AI call automation software",
    "WhatsApp AI automation",
    "AI customer support automation",
    "automated appointment scheduling AI",
    "AI receptionist software",
    "AI chatbot for business",

    // Long-tail
    "how to automate business with AI",
    "AI automation reduce operational costs",
    "24/7 AI customer support solution",
    "AI automation live in 24 hours",
  ],

  alternates: {
    canonical: "https://pixoranest.com/industries",
  },

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

  openGraph: {
    title: "AI Automation for Every Industry | PixoraNest",
    description:
      "Discover purpose-built AI automation for healthcare, real estate, e-commerce, education & more. Automate customer communication, calls, and lead management — live in 24 hours.",
    url: "https://pixoranest.com/industries",
    siteName: "PixoraNest",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "https://pixoranest.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "PixoraNest AI automation solutions for every industry",
        type: "image/png",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "AI Automation for Every Industry | PixoraNest",
    description:
      "Purpose-built AI automation for 10+ industries. Automate calls, leads, customer communication & operations. Live in 24 hours.",
    images: ["https://pixoranest.com/og-image.png"],
    creator: "@pixoranest",
    site: "@pixoranest",
  },

  other: {
    "application-name": "PixoraNest",
    "theme-color": "#2563eb",
  },
}

// JSON-LD structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "AI Automation Solutions by Industry | PixoraNest",
  description:
    "PixoraNest delivers AI automation solutions across healthcare, real estate, e-commerce, education, logistics, finance and more.",
  url: "https://pixoranest.com/industries",
  publisher: {
    "@type": "Organization",
    name: "PixoraNest",
    url: "https://pixoranest.com",
    logo: {
      "@type": "ImageObject",
      url: "https://pixoranest.com/logo.png",
    },
  },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://pixoranest.com" },
      { "@type": "ListItem", position: 2, name: "Industries", item: "https://pixoranest.com/industries" },
    ],
  },
  mainEntity: {
    "@type": "ItemList",
    name: "Industries Served by PixoraNest AI",
    itemListElement: [
      "Healthcare", "E-Commerce", "Manufacturing", "Logistics",
      "Finance", "Education", "Hospitality", "Real Estate",
      "Technology / SaaS", "Startups",
    ].map((industry, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `AI Automation for ${industry}`,
    })),
  },
}

export default function IndustriesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <IndustriesPageContent />
    </>
  )
}