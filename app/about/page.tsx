import type { Metadata } from "next"
import { AboutPageContent } from "./about-content"

export const metadata: Metadata = {
  metadataBase: new URL("https://pixoranest.com"),

  // ✅ 57 chars — perfect CTR-optimized
  title: "About PixoraNest | AI Automation Company India",

  // ✅ 155 chars
  description:
    "PixoraNest is India's leading AI automation company. We build AI receptionists, WhatsApp automation, AI voice agents & call automation for Indian businesses.",

  keywords: [
    "AI automation company India",
    "AI automation solutions India",
    "AI receptionist software India",
    "WhatsApp automation India",
    "AI voice agent India",
    "business automation platform India",
    "PixoraNest",
    "AI business automation",
  ],

  alternates: {
    canonical: "https://pixoranest.com/about",
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "About PixoraNest | AI Automation Company India",
    description:
      "Discover PixoraNest — India's AI automation platform helping businesses automate calls, WhatsApp, leads and workflows. 500+ businesses. 98% satisfaction.",
    url: "https://pixoranest.com/about",
    siteName: "PixoraNest",
    images: [
      {
        url: "https://pixoranest.com/og-about.jpg",
        width: 1200,
        height: 630,
        alt: "PixoraNest AI Automation Company India — About Us",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "About PixoraNest | AI Automation Company India",
    description:
      "PixoraNest builds AI automation solutions — AI receptionists, WhatsApp automation, AI voice agents for Indian businesses.",
    images: ["https://pixoranest.com/og-about.jpg"],
  },
}

export default function AboutPage() {
  return <AboutPageContent />
}