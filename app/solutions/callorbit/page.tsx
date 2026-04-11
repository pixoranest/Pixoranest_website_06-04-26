import type { Metadata } from "next"
import { CallOrbitPageContent } from "./page_content"

export const metadata: Metadata = {
  title: "AI Call Automation & Smart Routing India — Replace IVR | CallOrbit",
  description:
    "CallOrbit replaces your IVR with AI-powered call routing, real-time transcription & automated follow-ups. Cut call costs 60%. Live in 24 hours. Book a demo.",
  keywords: [
    // Primary
    "call automation software India",
    "AI call routing India",
    "smart call routing India",
    "IVR replacement India",
    "cloud telephony India",
    "AI call handling system India",
    "automated call routing India",
    "call center automation India",

    // Near me + local
    "call automation near me",
    "call automation Rajasthan",
    "call automation Jaipur",
    "call automation Alwar",
    "cloud telephony Jaipur",
    "AI call handling Jaipur",
    "IVR replacement Rajasthan",

    // Industry
    "call automation for hospitals India",
    "call automation for banks India",
    "call automation for logistics India",
    "call automation for real estate India",
    "call automation for SaaS India",
    "call routing for BFSI India",

    // Problem/intent
    "replace IVR with AI India",
    "AI instead of IVR India",
    "reduce call wait time India",
    "call transcription software India",
    "real-time call transcription India",
    "automated call follow-up India",
    "virtual number India",
    "virtual number for business India",
    "call recording software India",
    "call analytics dashboard India",
    "TRAI compliant calling India",
  ],
  alternates: {
    canonical: "https://pixoranest.com/solutions/callorbit",
    languages: { "en-IN": "https://pixoranest.com/solutions/callorbit" },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "CallOrbit AI Call Automation — Replace IVR With Intelligent Routing | PixoraNest",
    description:
      "AI call routing, real-time transcription & automated follow-ups for Indian businesses. TRAI compliant. 99.9% uptime. Live in 24 hours.",
    url: "https://pixoranest.com/solutions/callorbit",
    siteName: "PixoraNest",
    type: "website",
    locale: "en_IN",
    images: [{ url: "https://pixoranest.com/og-callorbit.png", width: 1200, height: 630, alt: "CallOrbit AI Call Automation India" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "CallOrbit AI Call Automation | PixoraNest India",
    description: "Replace your IVR with AI. Smart call routing, transcription & follow-ups for Indian businesses. Cut costs 60%.",
    images: ["https://pixoranest.com/og-callorbit.png"],
  },
}

export default function CallOrbitPage() {
  return <CallOrbitPageContent />
}