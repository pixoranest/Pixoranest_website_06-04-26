import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Automation Services for Businesses in India | PixoraNest",

  // ✅ Fixed: 148 chars (was 174 — Google was cutting it off)
  description:
    "PixoraNest automates WhatsApp leads, AI calls & customer communication for Indian businesses. AI agents built for SMEs. Book a free demo.",

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
    "customer communication automation India",
    "PixoraNest",
  ],

  metadataBase: new URL("https://www.pixoranest.com"),
  alternates: {
    canonical: "https://www.pixoranest.com",
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
    title: "AI Automation Services for Businesses in India | PixoraNest",
    description:
      "Automate WhatsApp leads, AI calls & customer communication for your Indian business. Book a free demo with PixoraNest today.",
    url: "https://www.pixoranest.com",
    siteName: "PixoraNest",
    images: [
      {
        url: "/og/pixoranest-ai-automation-india.jpg",
        width: 1200,
        height: 630,
        alt: "PixoraNest — AI Automation Services for Indian Businesses",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "AI Automation Services for Businesses in India | PixoraNest",
    description:
      "Automate WhatsApp leads, AI calls & customer communication for your Indian business. Book a free demo.",
    images: ["/og/pixoranest-ai-automation-india.jpg"],
    creator: "@pixoranest",
    site: "@pixoranest",
  },
}