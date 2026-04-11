import type { Metadata } from "next"
import { FirstVoicePageContent } from "./page_content"

export const metadata: Metadata = {
  title: "AI Receptionist for Business India — 24/7 Call Answering | FirstVoice",
  description:
    "FirstVoice by PixoraNest answers every business call 24/7 in English & Hindi. Qualify leads, book appointments & route calls automatically. Trusted by 500+ Indian businesses.",
  keywords: [
    // Primary
    "AI receptionist for business India",
    "AI receptionist India",
    "virtual receptionist India",
    "automated call answering India",
    "AI phone answering service India",
    "24/7 business call automation",

    // Near me + local
    "AI receptionist near me",
    "virtual receptionist near me",
    "AI call answering near me",
    "AI receptionist Rajasthan",
    "AI receptionist Jaipur",
    "AI receptionist Alwar",
    "automated call answering Jaipur",
    "virtual receptionist Jaipur",

    // Industry
    "AI receptionist for clinics India",
    "AI receptionist for real estate India",
    "AI receptionist for law firms India",
    "AI receptionist for hospitals India",
    "AI call answering for small business India",

    // Problem/intent
    "never miss a business call India",
    "missed call automation India",
    "replace receptionist with AI India",
    "automate business calls India",
    "AI call routing India",
    "intelligent call routing India",
    "auto appointment booking India",
    "AI lead qualification calls India",
  ],
  alternates: {
    canonical: "https://pixoranest.com/solutions/firstvoice",
    languages: { "en-IN": "https://pixoranest.com/solutions/firstvoice" },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "FirstVoice AI Receptionist — Answer Every Business Call 24/7 | PixoraNest",
    description:
      "Stop losing customers to missed calls. FirstVoice AI receptionist answers instantly, qualifies leads & books appointments — in English & Hindi.",
    url: "https://pixoranest.com/solutions/firstvoice",
    siteName: "PixoraNest",
    type: "website",
    locale: "en_IN",
    images: [{ url: "https://pixoranest.com/og-firstvoice.png", width: 1200, height: 630, alt: "FirstVoice AI Receptionist for Indian Businesses" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "FirstVoice AI Receptionist | PixoraNest India",
    description: "AI-powered 24/7 call answering, lead qualification & appointment booking for Indian businesses.",
    images: ["https://pixoranest.com/og-firstvoice.png"],
  },
}

export default function FirstVoicePage() {
  return <FirstVoicePageContent />
}