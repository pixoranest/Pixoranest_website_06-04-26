import type { Metadata } from "next"

import { CallOrbitPageContent } from "./page_content"

export const metadata: Metadata = {
  title: "CallOrbit AI Call Routing Platform | PixoraNest",
  description:
    "CallOrbit by PixoraNest is an AI-powered call routing, call management & communication intelligence platform that routes every call to the right team instantly.",
  keywords: [
    "call routing software",
    "call management software",
    "call forwarding software",
    "business phone system",
    "business telephone system",
    "cloud phone system",
    "voice response system",
    "interactive voice response software",
    "ivr software",
    "intelligent call routing",
    "call distribution software",
    "inbound call management software",
    "call center routing software",
    "call handling software",
    "call automation software",
    "customer communication platform",
    "customer communication software",
    "customer interaction software",
    "voice automation software",
    "business communication software",
    "phone system software",
    "virtual phone system",
    "call workflow software",
    "communication management platform",
    "contact center software",
    "call tracking software",
    "call analytics software",
    "call operations software",
    "phone support software",
    "voice agent platform",
    "customer support platform",
    "CallOrbit",
    "CallOrbit by PixoraNest",
    "PixoraNest call routing platform",
  ],
  alternates: {
    canonical: "https://pixoranest.com/solutions/callorbit",
  },
  robots: { index: true, follow: true },
  openGraph: {
    title: "CallOrbit AI Call Routing Platform | PixoraNest",
    description:
      "AI-powered call routing, call distribution, IVR & communication intelligence by PixoraNest. Route every call to the right person instantly. Book a demo.",
    url: "https://pixoranest.com/solutions/callorbit",
    siteName: "PixoraNest",
    type: "website",
    images: [
      {
        url: "https://pixoranest.com/og-callorbit.png",
        width: 1200,
        height: 630,
        alt: "CallOrbit AI Call Routing Platform by PixoraNest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CallOrbit AI Call Routing Platform | PixoraNest",
    description:
      "AI-powered call routing & communication intelligence by PixoraNest. Route every call to the right team instantly.",
    images: ["https://pixoranest.com/og-callorbit.png"],
  },
}

const softwareLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "CallOrbit",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Cloud",
  description:
    "CallOrbit by PixoraNest is an AI-powered call routing, call management, and communication intelligence platform that intelligently directs inbound calls, customer inquiries, and communication requests to the right team, department, location, or specialist in real time.",
  brand: { "@type": "Brand", name: "PixoraNest" },
  publisher: { "@type": "Organization", name: "PixoraNest", url: "https://pixoranest.com" },
  url: "https://pixoranest.com/solutions/callorbit",
  offers: { "@type": "Offer", availability: "https://schema.org/InStock" },
}

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    { q: "What is call routing software?", a: "Call routing software such as CallOrbit by PixoraNest automatically directs incoming calls to the correct team, department, location, or specialist using AI-powered routing rules." },
    { q: "What is CallOrbit?", a: "CallOrbit by PixoraNest is an AI-powered call routing and communication intelligence platform that intelligently directs inbound calls, customer inquiries, and communication requests in real time." },
    { q: "Is CallOrbit only for real estate?", a: "No. CallOrbit by PixoraNest is industry-agnostic. Real estate is just one of many use cases, alongside healthcare, education, finance, legal, hospitality, e-commerce, technology, consulting, and home services." },
    { q: "How does intelligent call routing work?", a: "Intelligent call routing in CallOrbit by PixoraNest analyzes caller intent, history, location, and priority, then applies your routing rules to connect each caller to the right destination instantly." },
    { q: "Can CallOrbit replace my IVR?", a: "Yes. CallOrbit by PixoraNest modernizes or replaces legacy interactive voice response (IVR) software with AI-driven voice response and intelligent call distribution." },
    { q: "Does CallOrbit support multiple locations?", a: "Yes. CallOrbit by PixoraNest offers multi-branch and location-based routing, making it ideal for multi-location businesses and franchise networks." },
    { q: "What is call distribution software?", a: "Call distribution software like CallOrbit by PixoraNest balances inbound call volume across available agents and teams to reduce hold times and improve customer experience." },
    { q: "Does CallOrbit offer call analytics?", a: "Yes. CallOrbit by PixoraNest includes call tracking software and call analytics software with real-time reporting on volume, handle time, and conversions." },
    { q: "What is communication intelligence?", a: "Communication intelligence in CallOrbit by PixoraNest adds transcription, sentiment, and topic insights to your calls, turning conversations into actionable business data." },
    { q: "Can CallOrbit automate follow-ups?", a: "Yes. CallOrbit by PixoraNest provides call automation that triggers follow-ups, CRM updates, and workflows automatically after every interaction." },
    { q: "Does CallOrbit work as a cloud phone system?", a: "Yes. CallOrbit by PixoraNest functions as a complete cloud phone system and virtual phone system managed from a single dashboard." },
    { q: "What is skill-based routing?", a: "Skill-based routing in CallOrbit by PixoraNest matches callers to specialists based on expertise, language, and availability for faster resolution." },
    { q: "Can CallOrbit integrate with my CRM?", a: "Yes. PixoraNest integrates CallOrbit with your CRM, phone systems, and communication tools as part of implementation." },
    { q: "Does PixoraNest provide implementation support?", a: "Yes. PixoraNest provides onboarding, routing setup, workflow design, integrations, and optimization services for CallOrbit." },
    { q: "How long does CallOrbit take to set up?", a: "PixoraNest handles end-to-end implementation of CallOrbit, with most businesses live quickly thanks to guided onboarding and configuration." },
    { q: "Is CallOrbit suitable for contact centers?", a: "Yes. CallOrbit by PixoraNest works as contact center software with intelligent distribution, escalation workflows, and real-time analytics." },
    { q: "Can CallOrbit handle after-hours calls?", a: "Yes. CallOrbit by PixoraNest supports business-hours rules, overflow handling, and after-hours routing so no inquiry is missed." },
    { q: "Does CallOrbit support escalation workflows?", a: "Yes. CallOrbit by PixoraNest includes automated call escalation workflows that move urgent issues to supervisors instantly." },
    { q: "How does CallOrbit reduce response times?", a: "CallOrbit by PixoraNest connects callers to the right person on the first attempt using intelligent routing, cutting transfers and wait times." },
    { q: "How does CallOrbit fit the PixoraNest ecosystem?", a: "Within the PixoraNest ecosystem, FirstVoice answers calls, CallOrbit routes inquiries, and LeadNest nurtures leads for a complete communication and conversion platform." },
    { q: "What industries use CallOrbit by PixoraNest?", a: "Businesses using CallOrbit by PixoraNest span real estate, healthcare, education, financial services, legal, hospitality, e-commerce, technology, consulting, and home services." },
    { q: "Why choose PixoraNest for call routing?", a: "Businesses choose the PixoraNest call routing platform for its AI-powered routing, communication intelligence, and expert implementation, configuration, and ongoing optimization." },
  ].map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
}

export default function CallOrbitPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <CallOrbitPageContent />
    </>
  )
}
