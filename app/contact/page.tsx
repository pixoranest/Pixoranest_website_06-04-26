import type { Metadata } from "next"
import { ContactPageContent } from "./contact-content"

export const metadata: Metadata = {
  metadataBase: new URL("https://pixoranest.com"),

  // ✅ 57 chars — perfect CTR-optimized
  title: "Contact PixoraNest | Free AI Automation Demo India",

  // ✅ 154 chars
  description:
    "Contact PixoraNest to book a free AI automation demo for your business in India. Get expert help with AI receptionist, WhatsApp automation & AI voice agents.",

  keywords: [
    "contact PixoraNest",
    "AI automation company India contact",
    "book free AI automation demo India",
    "WhatsApp automation demo India",
    "AI receptionist demo",
    "AI voice agent India",
    "business automation consulting India",
    "PixoraNest contact",
  ],

  authors: [{ name: "PixoraNest Team" }],
  creator: "PixoraNest",
  publisher: "PixoraNest",

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://pixoranest.com/contact",
  },

  openGraph: {
    title: "Contact PixoraNest | Free AI Automation Demo India",
    description:
      "Speak with PixoraNest AI automation experts in India. Book a free demo for AI receptionist, WhatsApp automation, AI voice agents & CRM workflow automation.",
    url: "https://pixoranest.com/contact",
    siteName: "PixoraNest",
    images: [
      {
        url: "https://pixoranest.com/og-contact.jpg",
        width: 1200,
        height: 630,
        alt: "Contact PixoraNest AI Automation Company India",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact PixoraNest | Free AI Automation Demo India",
    description:
      "Talk to PixoraNest AI automation experts in India. Free demo for AI receptionist, WhatsApp automation & business workflow automation.",
    images: ["https://pixoranest.com/og-contact.jpg"],
  },
}

export default function ContactPage() {
  return <ContactPageContent />
}