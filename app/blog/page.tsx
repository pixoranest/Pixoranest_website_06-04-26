import type { Metadata } from "next"
import { BlogPageContent } from "./blog-content"

export const metadata: Metadata = {
  metadataBase: new URL("https://pixoranest.com"),

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

  authors: [{ name: "PixoraNest Team", url: "https://pixoranest.com/about" }],
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
    canonical: "https://pixoranest.com/blog",
  },

  openGraph: {
    title: "AI Automation Blog | WhatsApp, Voice & Lead Automation | PixoraNest",
    description:
      "Expert guides on AI automation, WhatsApp lead management, AI voice agents & workflow automation for Indian startups and small businesses.",
    url: "https://pixoranest.com/blog",
    siteName: "PixoraNest",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://pixoranest.com/og/blog-og.jpg",
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
        url: "https://pixoranest.com/og/blog-og.jpg",
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

// ── WebSite Schema – enables Google Sitelinks Searchbox ──
const websiteSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://pixoranest.com/#website",
  name: "PixoraNest",
  url: "https://pixoranest.com",
  description:
    "AI automation solutions for Indian startups – WhatsApp, voice agents, lead management & workflow automation.",
  publisher: {
    "@id": "https://pixoranest.com/#organization",
  },
  inLanguage: "en-IN",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://pixoranest.com/blog?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
})

// ── Organization Schema ──
const organizationSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://pixoranest.com/#organization",
  name: "PixoraNest",
  url: "https://pixoranest.com",
  logo: {
    "@type": "ImageObject",
    "@id": "https://pixoranest.com/#logo",
    url: "https://pixoranest.com/logo.png",
    width: 200,
    height: 60,
    caption: "PixoraNest",
  },
  sameAs: [
    "https://twitter.com/pixoranest",
    "https://www.linkedin.com/company/pixoranest",
  ],
})

// ── Blog Schema ──
const blogSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Blog",
  "@id": "https://pixoranest.com/blog/#blog",
  name: "PixoraNest AI Automation Blog",
  description:
    "Expert insights on AI automation, WhatsApp lead management, AI voice agents and business workflow automation for Indian startups.",
  url: "https://pixoranest.com/blog",
  publisher: {
    "@id": "https://pixoranest.com/#organization",
  },
  inLanguage: "en-IN",
})

// ── Breadcrumb Schema ──
const breadcrumbSchema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": "https://pixoranest.com/blog/#breadcrumb",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://pixoranest.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Blog",
      item: "https://pixoranest.com/blog",
    },
  ],
})

export default function BlogPage() {
  return (
    <>
      {/* WebSite Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: websiteSchema }}
      />
      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: organizationSchema }}
      />
      {/* Blog Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: blogSchema }}
      />
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />
      <BlogPageContent />
    </>
  )
}