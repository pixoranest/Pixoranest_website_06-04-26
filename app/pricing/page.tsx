import type { Metadata } from "next"
import PricingContent from "./pricing-content"

export const metadata: Metadata = {
  title: "AI Automation Pricing Plans for Businesses | PixoraNest",
  description:
    "Compare PixoraNest AI automation pricing plans for businesses. Choose from WhatsApp automation, AI voice agents and workflow automation solutions that fit your budget.",
  keywords: [
    "AI automation pricing plans",
    "AI automation pricing for businesses",
    "WhatsApp automation pricing",
    "AI voice agent pricing",
    "business automation pricing",
    "AI automation solutions pricing",
    "AI automation pricing",
    "WhatsApp automation pricing",
    "AI voice agent pricing",
    "business automation plans",
    "automation pricing india",
    "affordable AI automation",
  ],
  alternates: {
    canonical: "https://pixoranest.com/pricing",
  },
  openGraph: {
    title: "AI Automation Pricing Plans | PixoraNest",
    description:
      "Compare PixoraNest AI automation pricing plans and choose the best solution for your business automation needs.",
    url: "https://pixoranest.com/pricing",
    siteName: "PixoraNest",
    type: "website",
    images: [
      {
        url: "https://pixoranest.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "PixoraNest AI automation pricing plans",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Automation Pricing Plans | PixoraNest",
    description:
      "Explore flexible AI automation pricing plans designed for startups, growing businesses, and enterprises.",
    images: ["https://pixoranest.com/og-image.png"],
  },
}

export default function PricingPage() {
  return <PricingContent />
}
