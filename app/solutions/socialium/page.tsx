import type { Metadata } from "next"
import { SocialiumPageContent } from "./page_content"

export const metadata: Metadata = {
  title: "Social Media Automation India — Auto Post, DMs & Lead Capture | Socialium",
  description:
    "Socialium automates Instagram DMs, Facebook posts, lead capture & social analytics for Indian businesses. Grow on autopilot. 14-day free trial. Book a demo.",
  keywords: [
    // Primary
    "social media automation India",
    "Instagram automation India",
    "Facebook automation India",
    "LinkedIn automation India",
    "social media lead generation India",
    "social media marketing automation India",
    "Instagram DM automation India",
    "auto post social media India",

    // Near me + local
    "social media automation near me",
    "Instagram automation near me",
    "social media automation Rajasthan",
    "social media automation Jaipur",
    "Instagram automation Jaipur",
    "Facebook automation Jaipur",
    "social media automation Alwar",
    "digital marketing automation Rajasthan",

    // Industry
    "social media automation for D2C India",
    "Instagram automation for restaurants India",
    "social automation for real estate India",
    "social media automation for coaches India",
    "Instagram lead generation India",
    "Facebook lead capture India",

    // Problem/intent
    "schedule Instagram posts India",
    "auto reply Instagram DM India",
    "Instagram DM bot India",
    "Facebook comment automation India",
    "social media content scheduler India",
    "AI caption generator India",
    "social media analytics India",
    "competitor tracking social media India",
    "cross platform social posting India",
    "bulk schedule social media India",
  ],
  alternates: {
    canonical: "https://pixoranest.com/solutions/socialium",
    languages: { "en-IN": "https://pixoranest.com/solutions/socialium" },
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Socialium Social Media Automation — Grow Without the Grind | PixoraNest",
    description:
      "Schedule posts, auto-reply DMs, capture leads & track competitors across Instagram, Facebook & LinkedIn. Built for Indian businesses.",
    url: "https://pixoranest.com/solutions/socialium",
    siteName: "PixoraNest",
    type: "website",
    locale: "en_IN",
    images: [{ url: "https://pixoranest.com/og-socialium.png", width: 1200, height: 630, alt: "Socialium Social Media Automation India" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Socialium Social Media Automation | PixoraNest India",
    description: "Auto-post content, reply to DMs & capture leads from Instagram & Facebook on autopilot. 14-day free trial.",
    images: ["https://pixoranest.com/og-socialium.png"],
  },
}

export default function SocialiumPage() {
  return <SocialiumPageContent />
}