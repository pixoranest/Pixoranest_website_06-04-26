import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { industries } from "@/lib/data"
import { IndustryPageContent } from "./industry-content"

export function generateStaticParams() {
  return industries.map((industry) => ({
    industry: industry.slug,
  }))
}

// ─── Per-industry SEO overrides ───────────────────────────────────────────
const industryMeta: Record<string, {
  titleSuffix: string
  descriptionOverride?: string
  additionalKeywords?: string[]
}> = {
  healthcare: {
    titleSuffix: "Healthcare & Clinics",
    descriptionOverride:
      "AI automation for healthcare clinics and hospitals. Automate patient calls, appointment booking, prescription follow-ups & 24/7 patient support. Reduce clinic costs by 60% with PixoraNest.",
    additionalKeywords: [
      "AI receptionist for clinic", "automated appointment booking healthcare",
      "AI patient communication", "hospital call automation India",
      "healthcare chatbot", "clinic AI automation",
    ],
  },
  "e-commerce": {
    titleSuffix: "E-Commerce & Online Retail",
    descriptionOverride:
      "AI automation for e-commerce businesses. Recover abandoned carts, automate customer support, track orders & boost conversions 5x with PixoraNest AI — live in 24 hours.",
    additionalKeywords: [
      "AI cart recovery WhatsApp", "e-commerce AI customer support",
      "automated order tracking", "AI for online store India",
      "Shopify AI automation", "WooCommerce AI chatbot",
    ],
  },
  manufacturing: {
    titleSuffix: "Manufacturing & Factory Operations",
    additionalKeywords: [
      "AI predictive maintenance", "factory automation AI",
      "manufacturing QA automation", "AI shift scheduling",
      "industrial AI automation India",
    ],
  },
  logistics: {
    titleSuffix: "Logistics & Supply Chain",
    additionalKeywords: [
      "AI route optimisation", "fleet management AI",
      "logistics automation India", "AI dispatch software",
      "delivery tracking automation",
    ],
  },
  finance: {
    titleSuffix: "Finance & Banking",
    additionalKeywords: [
      "AI KYC automation", "fraud detection AI",
      "fintech AI automation India", "AI compliance reporting",
      "banking chatbot automation",
    ],
  },
  education: {
    titleSuffix: "Education & EdTech",
    additionalKeywords: [
      "AI student admission automation", "EdTech AI chatbot",
      "automated fee reminders education", "AI tutor chatbot",
      "school attendance automation AI",
    ],
  },
  hospitality: {
    titleSuffix: "Hospitality & Hotels",
    additionalKeywords: [
      "AI hotel booking automation", "hotel chatbot AI",
      "automated guest support", "hotel concierge AI India",
      "resort AI automation",
    ],
  },
  "real-estate": {
    titleSuffix: "Real Estate & Property",
    additionalKeywords: [
      "AI lead qualification real estate", "WhatsApp AI real estate",
      "real estate chatbot India", "automated site visit scheduling",
      "property AI automation",
    ],
  },
  technology: {
    titleSuffix: "Technology & SaaS",
    additionalKeywords: [
      "AI SaaS support automation", "churn prevention AI",
      "SaaS onboarding automation", "AI user support software",
      "tech startup automation",
    ],
  },
  startups: {
    titleSuffix: "Startups & Growing Businesses",
    additionalKeywords: [
      "AI for startups India", "startup automation tools",
      "AI lead generation startup", "growth automation AI",
      "investor update automation",
    ],
  },
}

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
  const title = `AI Automation for ${titleSuffix} | PixoraNest`

  const description =
    override?.descriptionOverride ??
    `AI automation solutions for the ${industry.title.toLowerCase()} industry. Automate customer communication, calls, lead management & operations with PixoraNest AI. Reduce costs by 60%, go live in 24 hours.`

  const url = `https://pixoranest.com/industries/${industry.slug}`

  const baseKeywords = [
    `AI automation for ${industry.title.toLowerCase()} industry`,
    `AI solutions for ${industry.title.toLowerCase()} businesses`,
    `AI automation tools for ${industry.title.toLowerCase()}`,
    `business automation for ${industry.title.toLowerCase()} companies`,
    `AI customer communication for ${industry.title.toLowerCase()}`,
    `PixoraNest ${industry.title.toLowerCase()} AI`,
    `${industry.title.toLowerCase()} AI chatbot`,
    `${industry.title.toLowerCase()} call automation`,
    `${industry.title.toLowerCase()} WhatsApp automation`,
    `reduce ${industry.title.toLowerCase()} costs AI`,
    `24/7 AI support ${industry.title.toLowerCase()}`,
    `${industry.title.toLowerCase()} lead automation India`,
  ]

  const keywords = [
    ...baseKeywords,
    ...(override?.additionalKeywords ?? []),
  ]

  return {
    title,
    description,
    keywords,

    alternates: {
      canonical: url,
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
      type: "article",
      locale: "en_IN",
      images: [
        {
          url: "https://pixoranest.com/og-image.png",
          width: 1200,
          height: 630,
          alt: `AI automation for ${industry.title} industry — PixoraNest`,
          type: "image/png",
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

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ industry: string }>
}) {
  const { industry: slug } = await params
  const industry = industries.find((i) => i.slug === slug)

  if (!industry) notFound()

  // JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `AI Automation for ${industry.title} Industry | PixoraNest`,
    description: `AI automation solutions purpose-built for the ${industry.title.toLowerCase()} industry.`,
    url: `https://pixoranest.com/industries/${industry.slug}`,
    publisher: {
      "@type": "Organization",
      name: "PixoraNest",
      url: "https://pixoranest.com",
      logo: { "@type": "ImageObject", url: "https://pixoranest.com/logo.png" },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://pixoranest.com" },
        { "@type": "ListItem", position: 2, name: "Industries", item: "https://pixoranest.com/industries" },
        { "@type": "ListItem", position: 3, name: industry.title, item: `https://pixoranest.com/industries/${industry.slug}` },
      ],
    },
    mainEntity: {
      "@type": "Service",
      name: `AI Automation for ${industry.title}`,
      description: `PixoraNest AI automation solutions for ${industry.title.toLowerCase()} businesses — automating calls, leads, customer communication, and operations.`,
      provider: {
        "@type": "Organization",
        name: "PixoraNest",
        url: "https://pixoranest.com",
      },
      areaServed: "IN",
      availableChannel: {
        "@type": "ServiceChannel",
        serviceUrl: `https://pixoranest.com/industries/${industry.slug}`,
      },
    },
    // FAQ Schema for top questions
    "@graph": [
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: `How can AI automation benefit ${industry.title.toLowerCase()} businesses?`,
            acceptedAnswer: {
              "@type": "Answer",
              text: `AI automation helps ${industry.title.toLowerCase()} businesses reduce operational costs by up to 60%, provide 24/7 customer support, automate lead management, and scale without adding headcount.`,
            },
          },
          {
            "@type": "Question",
            name: "How quickly can PixoraNest AI be deployed?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Most clients go live within 24–48 hours. PixoraNest handles the full setup process — no heavy lifting required from your team.",
            },
          },
          {
            "@type": "Question",
            name: "Does PixoraNest integrate with existing tools?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes. PixoraNest integrates with most CRMs, ERPs, and business tools via API, Zapier, or native connectors.",
            },
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <IndustryPageContent industry={industry} />
    </>
  )
}