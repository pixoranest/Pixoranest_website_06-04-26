import type { Metadata } from "next"
import Script from "next/script"
import FirstVoicePageContent from "./page_content"

export const metadata: Metadata = {
  title: "FirstVoice — AI Voice Receptionist & 24/7 Call Answering Service",
  description:
    "FirstVoice is an AI voice receptionist and 24/7 answering service that answers, qualifies, routes and logs every business call — with CRM, WhatsApp and calendar sync.",
  alternates: { canonical: "/solutions/firstvoice" },
  openGraph: {
    title: "FirstVoice — AI Voice Receptionist & 24/7 Answering Service",
    description:
      "AI phone agent that answers every call, qualifies leads, books appointments and syncs to your CRM & WhatsApp — 24/7, in multiple languages.",
    url: "/solutions/firstvoice",
    type: "website",
    siteName: "PixoraNest",
  },
  twitter: {
    card: "summary_large_image",
    title: "FirstVoice — AI Voice Receptionist",
    description:
      "AI answering service that never misses a call. 24/7 voice agent with CRM, WhatsApp and calendar automation.",
  },
}

const productSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "FirstVoice AI Receptionist",
  brand: { "@type": "Brand", name: "PixoraNest" },
  description:
    "AI voice receptionist and 24/7 call answering service. Answers, qualifies, routes and logs every inbound call with CRM, WhatsApp and calendar integration.",
  category: "AI Voice Agent Software",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    priceCurrency: "INR",
    price: "0",
    url: "/solutions/firstvoice",
  },
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is FirstVoice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "FirstVoice is an AI voice receptionist and 24/7 call answering service that answers every inbound business call, qualifies the caller, routes the conversation and logs everything in your CRM automatically.",
      },
    },
    {
      "@type": "Question",
      name: "How is FirstVoice different from a traditional answering service?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Traditional answering services use human agents with fixed hours and per-minute pricing. FirstVoice is an AI phone agent that works 24/7, handles unlimited concurrent calls, qualifies leads using your business logic and writes structured data straight to your CRM.",
      },
    },
    {
      "@type": "Question",
      name: "Does FirstVoice integrate with my CRM?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. FirstVoice integrates with HubSpot, Zoho, Salesforce, LeadSquared, Pipedrive and other popular CRMs through native connectors and APIs.",
      },
    },
    {
      "@type": "Question",
      name: "Can FirstVoice answer calls in multiple languages?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. FirstVoice supports multilingual voice AI across English, Hindi and major regional Indian languages, switching dynamically based on the caller.",
      },
    },
  ],
}

export default function FirstVoicePage() {
  return (
    <>
      <Script
        id="ld-product"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <Script
        id="ld-faq"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <FirstVoicePageContent />
    </>
  )
}
