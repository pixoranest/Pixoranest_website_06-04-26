import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { industries, clinicFaqs } from "@/lib/data"
import IndustryPageContent from "./industry-content"

// ─── Static params ────────────────────────────────────────────────────────
export function generateStaticParams() {
  return industries.map((industry) => ({
    industry: industry.slug,
  }))
}

// ─── Per-industry SEO overrides ───────────────────────────────────────────
const industryMeta: Record<
  string,
  {
    titleSuffix: string
    titleOverride?: string
    descriptionOverride?: string
    additionalKeywords?: string[]
  }
> = {
  healthcare: {
    titleSuffix: "Healthcare & Hospitals",
    descriptionOverride:
      "AI automation for hospitals and healthcare networks in India. Automate patient calls, appointment booking & 24/7 support. Reduce costs by 60%. Live in 24 hours.",
    additionalKeywords: [
      "AI receptionist for hospital",
      "hospital call automation India",
      "healthcare chatbot",
    ],
  },
  "healthcare-clinics": {
    titleSuffix: "Healthcare Clinics",
    titleOverride:
      "AI Receptionist & Patient Communication Automation for Healthcare Clinics | PixoraNest",
    descriptionOverride:
      "AI receptionist & patient communication automation for healthcare clinics, dental practices, diagnostic centres & multi-specialty OPDs. FirstVoice answers every call, LeadNest sends WhatsApp reminders. Live in 24 hours.",
    additionalKeywords: [
      "AI automation for healthcare clinics",
      "AI receptionist for clinics",
      "AI receptionist for dental clinic India",
      "clinic appointment automation",
      "patient communication automation",
      "clinic call answering software",
      "WhatsApp automation for clinics",
      "medical front desk automation",
      "healthcare lead automation",
      "WhatsApp appointment reminders clinic",
      "after-hours clinic call answering",
      "PMS EMR integration clinic AI",
      "multilingual clinic chatbot India",
      "diagnostic centre AI automation",
      "multi-specialty clinic chatbot",
      "missed call recovery for clinics India",
      "24/7 AI front desk for clinic",
      "polyclinic AI receptionist India",
      "prescription refill automation",
      "OPD WhatsApp automation",
    ],
  },
  ecommerce: {
    titleSuffix: "E-Commerce & D2C Brands",
    descriptionOverride:
      "AI automation for e-commerce businesses in India. Recover abandoned carts, automate customer support & boost conversions 5x with PixoraNest — live in 24 hours.",
    additionalKeywords: [
      "AI cart recovery WhatsApp",
      "e-commerce AI customer support",
      "automated order tracking",
      "Shopify AI automation",
      "WooCommerce AI chatbot",
    ],
  },
  manufacturing: {
    titleSuffix: "Manufacturing & Factory Operations",
    additionalKeywords: [
      "AI predictive maintenance",
      "factory automation AI",
      "manufacturing QA automation",
      "industrial AI automation India",
    ],
  },
  logistics: {
    titleSuffix: "Logistics & Supply Chain",
    additionalKeywords: [
      "AI route optimisation",
      "fleet management AI",
      "logistics automation India",
      "delivery tracking automation",
    ],
  },
  finance: {
    titleSuffix: "Finance & Banking",
    additionalKeywords: [
      "AI KYC automation",
      "fraud detection AI",
      "fintech AI automation India",
      "banking chatbot automation",
    ],
  },
  education: {
    titleSuffix: "Education & EdTech",
    additionalKeywords: [
      "AI student admission automation",
      "EdTech AI chatbot",
      "automated fee reminders education",
      "school attendance automation AI",
    ],
  },
  hospitality: {
    titleSuffix: "Hospitality & Hotels",
    additionalKeywords: [
      "AI hotel booking automation",
      "hotel chatbot AI",
      "hotel concierge AI India",
      "resort AI automation",
    ],
  },
  "real-estate": {
    titleSuffix: "Real Estate & Property",
    additionalKeywords: [
      "AI lead qualification real estate",
      "WhatsApp AI real estate",
      "real estate chatbot India",
      "automated site visit scheduling",
    ],
  },
  "it-saas": {
    titleSuffix: "Technology & SaaS",
    additionalKeywords: [
      "AI SaaS support automation",
      "churn prevention AI",
      "SaaS onboarding automation",
      "tech startup automation",
    ],
  },
  startups: {
    titleSuffix: "Startups & Growing Businesses",
    additionalKeywords: [
      "AI for startups India",
      "startup automation tools",
      "AI lead generation startup",
      "investor update automation",
    ],
  },
}

// ─── Metadata ─────────────────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>
}): Promise<Metadata> {
  const { industry: slug } = await params
  const industry = industries.find((i) => i.slug === slug)
  if (!industry) return {}

  const override = industryMeta[slug]
  const titleSuffix = override?.titleSuffix ?? industry.title
  const title =
    override?.titleOverride ??
    `AI Automation for ${titleSuffix} | PixoraNest`
  const description =
    override?.descriptionOverride ??
    `AI automation solutions for the ${industry.title.toLowerCase()} industry in India. Automate customer communication, calls & lead management with PixoraNest. Go live in 24 hours.`

  const url = `https://pixoranest.com/industries/${slug}/`

  const baseKeywords = [
    `AI automation for ${industry.title.toLowerCase()}`,
    `${industry.title.toLowerCase()} AI chatbot`,
    `${industry.title.toLowerCase()} call automation`,
    `${industry.title.toLowerCase()} WhatsApp automation`,
    `24/7 AI support ${industry.title.toLowerCase()}`,
    `${industry.title.toLowerCase()} lead automation India`,
    `PixoraNest ${industry.title.toLowerCase()} AI`,
  ]
  const keywords = [...baseKeywords, ...(override?.additionalKeywords ?? [])]

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: { "en-IN": url },
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
      title,
      description,
      url,
      siteName: "PixoraNest",
      type: "website",
      locale: "en_IN",
      images: [
        {
          url: "https://pixoranest.com/og-image.png",
          width: 1200,
          height: 630,
          alt: `AI automation for ${industry.title} — PixoraNest`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://pixoranest.com/og-image.png"],
      creator: "@pixoranest",
      site: "@pixoranest",
    },
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────
export default async function IndustryPage({
  params,
}: {
  params: Promise<{ industry: string }>
}) {
  const { industry: slug } = await params
  const industry = industries.find((i) => i.slug === slug)
  if (!industry) notFound()

  const url = `https://pixoranest.com/industries/${industry.slug}/`
  const isClinic = industry.slug === "healthcare-clinics"

  const webPageName = isClinic
    ? "AI Receptionist & Patient Communication Automation for Healthcare Clinics | PixoraNest"
    : `AI Automation for ${industry.title} | PixoraNest`

  const serviceName = isClinic
    ? "AI Receptionist & Patient Communication Automation for Healthcare Clinics"
    : `AI Automation for ${industry.title}`

  const serviceDescription = isClinic
    ? "PixoraNest delivers an AI receptionist (FirstVoice), WhatsApp appointment automation (LeadNest), smart call routing (CallOrbit), and after-hours AI voice handling (EchoAssist) for clinics, dental practices, diagnostic centres, and multi-specialty OPDs."
    : `PixoraNest AI automation for ${industry.title.toLowerCase()} businesses — automating calls, leads, and customer communication.`

  // ── WebPage + Service JSON-LD ──
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: webPageName,
    description: serviceDescription,
    url,
    publisher: {
      "@type": "Organization",
      name: "PixoraNest",
      url: "https://pixoranest.com",
      logo: {
        "@type": "ImageObject",
        url: "https://pixoranest.com/images/logo-pixoranest.png",
      },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://pixoranest.com/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Industries",
          item: "https://pixoranest.com/industries/",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: industry.title,
          item: url,
        },
      ],
    },
    mainEntity: {
      "@type": "Service",
      name: serviceName,
      serviceType: isClinic
        ? "AI Receptionist & Patient Communication Automation"
        : "AI Automation",
      description: serviceDescription,
      provider: {
        "@type": "Organization",
        name: "PixoraNest",
        url: "https://pixoranest.com",
      },
      areaServed: "IN",
      ...(isClinic && {
        audience: {
          "@type": "Audience",
          audienceType:
            "Healthcare Clinics, Dental Practices, Diagnostic Centres, Multi-Specialty OPDs",
        },
      }),
    },
  }

  // ── FAQ JSON-LD (clinic only) ──
  const safeFaqs = Array.isArray(clinicFaqs) ? clinicFaqs : []
  const faqJsonLd =
    isClinic && safeFaqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: safeFaqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.a,
            },
          })),
        }
      : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd !== null && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <IndustryPageContent industry={industry} />
    </>
  )
}