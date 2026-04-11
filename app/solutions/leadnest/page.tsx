import type { Metadata } from "next"
import { LeadNestPageContent } from "./page_content"

export const metadata: Metadata = {
  title: "WhatsApp Lead Automation India — Convert 3x More Leads | LeadNest",
  description:
    "LeadNest automates WhatsApp lead capture, instant replies & CRM sync for Indian businesses. 98% message open rate. 14-day free trial. Book a demo today.",
  keywords: [
    // Primary
    "WhatsApp lead automation India",
    "WhatsApp business automation India",
    "WhatsApp automation India",
    "WhatsApp CRM integration India",
    "WhatsApp lead management software India",
    "automated WhatsApp follow-up India",
    "WhatsApp marketing automation India",

    // Near me + local
    "WhatsApp automation near me",
    "WhatsApp automation Rajasthan",
    "WhatsApp automation Jaipur",
    "WhatsApp automation Alwar",
    "WhatsApp lead generation Jaipur",
    "WhatsApp business tool Rajasthan",

    // Industry
    "WhatsApp automation for real estate India",
    "WhatsApp automation for coaching India",
    "WhatsApp automation for ecommerce India",
    "WhatsApp automation for insurance India",
    "WhatsApp automation for D2C brands India",
    "WhatsApp lead generation real estate India",

    // Problem/intent
    "automate WhatsApp replies India",
    "WhatsApp auto reply business India",
    "WhatsApp drip campaign India",
    "WhatsApp lead capture India",
    "WhatsApp bot for business India",
    "WhatsApp chatbot India",
    "automate WhatsApp follow-ups India",
    "WhatsApp abandoned cart recovery India",
    "WhatsApp broadcast campaign India",
  ],
  alternates: {
    canonical: "https://pixoranest.com/solutions/leadnest",
    languages: { "en-IN": "https://pixoranest.com/solutions/leadnest" },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "LeadNest WhatsApp Lead Automation — Convert 3x More Leads | PixoraNest",
    description:
      "Capture, qualify & nurture leads on WhatsApp automatically. Official WhatsApp Business API. 14-day free trial for Indian businesses.",
    url: "https://pixoranest.com/solutions/leadnest",
    siteName: "PixoraNest",
    type: "website",
    locale: "en_IN",
    images: [{ url: "https://pixoranest.com/og-leadnest.png", width: 1200, height: 630, alt: "LeadNest WhatsApp Lead Automation India" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "LeadNest WhatsApp Automation | PixoraNest India",
    description: "Automate WhatsApp lead capture, qualification & follow-ups. Convert 3x more leads for your Indian business.",
    images: ["https://pixoranest.com/og-leadnest.png"],
  },
}

export default function LeadNestPage() {
  return <LeadNestPageContent />
}