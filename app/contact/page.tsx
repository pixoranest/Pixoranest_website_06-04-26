import type { Metadata } from "next"
import { ContactPageContent } from "./contact-content"
const SITE_URL = "https://www.pixoranest.com"

export const metadata: Metadata = {
  title: "Contact PixoraNest | Book a Free AI Automation Demo",
  description:
    "Book a free AI automation demo with PixoraNest. Talk to our experts about AI receptionist, WhatsApp lead management & business automation for your Indian business.",
  alternates: {
    canonical: `${SITE_URL}/contact`,
    languages: { "en-IN": `${SITE_URL}/contact` },
  },
  openGraph: {
    title: "Contact PixoraNest | Book a Free AI Automation Demo",
    description:
      "Ready to automate your business? Book a free consultation with PixoraNest's AI automation experts. Setup in 2–4 weeks.",
    url: `${SITE_URL}/contact`,
    siteName: "PixoraNest",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: `${SITE_URL}/og-contact.jpg`,
        width: 1200,
        height: 630,
        alt: "Book a Free AI Automation Demo with PixoraNest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact PixoraNest | Book a Free AI Automation Demo",
    description:
      "Book a free AI automation consultation with PixoraNest. Trusted by 500+ Indian businesses.",
    images: [`${SITE_URL}/og-contact.jpg`],
    site: "@pixoranest",
    creator: "@pixoranest",
  },
}

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/contact#webpage`,
  url: `${SITE_URL}/contact`,
  name: "Contact PixoraNest | Free AI Automation Demo India",
  description:
    "Contact PixoraNest to book a free AI automation demo for your Indian business. Get expert help with AI receptionist, WhatsApp automation & AI voice agents.",
  inLanguage: "en-IN",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: `${SITE_URL}/contact`,
      },
    ],
  },
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <ContactPageContent />
    </>
  )
}