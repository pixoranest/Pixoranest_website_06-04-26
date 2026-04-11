import type { Metadata } from "next"
import { EchoAssistPageContent } from "./page_content"

export const metadata: Metadata = {
  title: "AI Voice Agent for Business India — 10,000 Calls/Day | EchoAssist",
  description:
    "EchoAssist makes human-like AI voice calls in English & Hindi. Outbound sales, appointment reminders & support at scale. 85% cost saving. Book a free demo.",
  keywords: [
    // Primary
    "AI voice agent India",
    "AI voice agent for business India",
    "conversational AI phone agent India",
    "AI sales calling India",
    "automated voice bot India",
    "AI outbound calling India",
    "AI customer support voice India",
    "voice AI assistant India",

    // Near me + local
    "AI voice agent near me",
    "AI calling agent near me",
    "AI voice agent Rajasthan",
    "AI voice agent Jaipur",
    "AI voice agent Alwar",
    "automated calling Jaipur",
    "AI outbound calling Rajasthan",

    // Industry
    "AI voice agent for healthcare India",
    "AI voice agent for insurance India",
    "AI appointment reminder calls India",
    "AI voice agent for D2C India",
    "AI voice agent for EdTech India",
    "automated appointment reminders India",
    "AI renewal reminder calls India",

    // Problem/intent
    "automate outbound calls India",
    "replace sales calling team AI India",
    "AI phone survey India",
    "NPS survey automation India",
    "automated feedback calls India",
    "scale outbound calls without hiring India",
    "TRAI DND compliant calling India",
    "Hindi English AI voice call India",
  ],
  alternates: {
    canonical: "https://pixoranest.com/solutions/echoassist",
    languages: { "en-IN": "https://pixoranest.com/solutions/echoassist" },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "EchoAssist AI Voice Agent — 10,000 Human-Like Calls Per Day | PixoraNest",
    description:
      "Scale your outbound calling without hiring. EchoAssist handles sales, reminders & surveys in English & Hindi. 85% cheaper than a human team.",
    url: "https://pixoranest.com/solutions/echoassist",
    siteName: "PixoraNest",
    type: "website",
    locale: "en_IN",
    images: [{ url: "https://pixoranest.com/og-echoassist.png", width: 1200, height: 630, alt: "EchoAssist AI Voice Agent India" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "EchoAssist AI Voice Agent | PixoraNest India",
    description: "Make 10,000 human-like AI calls per day in English & Hindi. Outbound sales, reminders & support at scale.",
    images: ["https://pixoranest.com/og-echoassist.png"],
  },
}

export default function EchoAssistPage() {
  return <EchoAssistPageContent />
}