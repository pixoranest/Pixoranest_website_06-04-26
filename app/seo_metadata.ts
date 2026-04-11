// ─────────────────────────────────────────────────────────────────────────────
// SEO METADATA — copy this into your root app/layout.tsx
// Covers: title, description, keywords, OG, Twitter, canonical, robots, JSON-LD
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next"

// ─── Page metadata export ─────────────────────────────────────────────────────
// Add this to app/layout.tsx (or app/page.tsx for homepage-specific meta)

export const metadata: Metadata = {
  // SEO: title — 57 chars, primary keyword in first 6 words, brand at end
  title: "AI Automation Services for Businesses in India | PixoraNest",

  // SEO: description — 152 chars, primary + secondary keywords, clear CTA
  description:
    "PixoraNest helps Indian startups and SMEs automate customer communication, manage leads with WhatsApp automation, and streamline operations using AI agents. Book a free demo.",

  keywords: [
    "AI automation services India",
    "business automation solutions India",
    "WhatsApp automation for business India",
    "AI chatbot for Indian businesses",
    "AI voice agent India",
    "workflow automation SME India",
    "AI receptionist India",
    "lead automation software India",
    "AI automation agency India",
    "PixoraNest",
  ],

  // Canonical & alternates
  metadataBase: new URL("https://pixoranest.com"),
  alternates: {
    canonical: "https://pixoranest.com",
  },

  // Robots
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

  // Open Graph — 1200×630 image recommended
  openGraph: {
    title: "AI Automation Services for Businesses in India | PixoraNest",
    description:
      "Automate customer communication, manage leads, and streamline business operations with PixoraNest AI automation solutions for Indian businesses.",
    url: "https://pixoranest.com",
    siteName: "PixoraNest",
    images: [
      {
        url: "/og/pixoranest-ai-automation-india.jpg", // place in /public/og/
        width: 1200,
        height: 630,
        alt: "PixoraNest — AI Automation Services for Indian Businesses",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  // Twitter / X card
  twitter: {
    card: "summary_large_image",
    title: "AI Automation Services for Businesses in India | PixoraNest",
    description:
      "Automate customer communication, manage leads & streamline operations with AI agents. Book a free demo.",
    images: ["/og/pixoranest-ai-automation-india.jpg"],
    creator: "@pixoranest", // update to your real handle
    site: "@pixoranest",
  },
}

// ─── JSON-LD Structured Data ──────────────────────────────────────────────────
// Add this <script> tag inside the <head> of your app/layout.tsx
// It tells Google your organization details and improves rich-result eligibility.

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://pixoranest.com/#organization",
      name: "PixoraNest",
      url: "https://pixoranest.com",
      logo: {
        "@type": "ImageObject",
        url: "https://pixoranest.com/logo.png",
        width: 200,
        height: 60,
      },
      description:
        "AI automation services for Indian businesses — WhatsApp automation, AI chatbot, voice agents, and workflow automation.",
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
      },
      sameAs: [
        "https://twitter.com/pixoranest",
        "https://linkedin.com/company/pixoranest",
        "https://instagram.com/pixoranest",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://pixoranest.com/#website",
      url: "https://pixoranest.com",
      name: "PixoraNest",
      publisher: { "@id": "https://pixoranest.com/#organization" },
    },
    {
      // HowTo schema — gives your how-it-works section rich snippet eligibility
      "@type": "HowTo",
      name: "How PixoraNest AI Automation Works",
      description:
        "Our 4-step process to implement AI automation for Indian businesses.",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Discovery & Automation Audit",
          text: "We analyse your business workflows to identify AI automation opportunities tailored for your Indian market.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Custom AI Agent Build",
          text: "We build AI agents, WhatsApp automation flows, and voice bots customised to your business.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Seamless System Integration",
          text: "We connect your AI automation system to WhatsApp, CRM, website, and third-party tools.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Launch, Track & Scale",
          text: "Go live in 2–4 weeks with full managed support and performance monitoring.",
        },
      ],
    },
  ],
}

// ─── Usage in app/layout.tsx ──────────────────────────────────────────────────
//
// import { jsonLd } from "@/lib/seo-metadata" // adjust path as needed
//
// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <head>
//         <script
//           type="application/ld+json"
//           dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
//         />
//       </head>
//       <body>{children}</body>
//     </html>
//   )
// }