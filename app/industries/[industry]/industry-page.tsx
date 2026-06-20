import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { IndustryContent } from "./industry-content"

/* -------------------------------------------------------------------------- */
/*                       INDUSTRY METADATA REGISTRY                           */
/* -------------------------------------------------------------------------- */

type IndustryMeta = {
  slug: string
  name: string
  title: string
  description: string
  keywords: string[]
  ogImage?: string
}

const INDUSTRIES: Record<string, IndustryMeta> = {
  ecommerce: {
    slug: "ecommerce",
    name: "E-Commerce",
    title: "AI Automation for E-Commerce & D2C Brands | PixoraNest",
    description:
      "Recover abandoned carts, automate WhatsApp sales and lift conversions with PixoraNest AI automation built for Shopify, WooCommerce and D2C stores.",
    keywords: [
      "AI automation for ecommerce",
      "abandoned cart recovery",
      "WhatsApp automation for Shopify",
      "AI sales agent for D2C",
      "ecommerce chatbot India",
      "PixoraNest ecommerce automation",
    ],
    ogImage: "https://pixoranest.com/og-image.png",
  },

  // Keep your existing industry slugs here — do not modify them.
  // Example placeholders (replace with your real existing entries):
  "real-estate": {
    slug: "real-estate",
    name: "Real Estate",
    title: "AI Automation for Real Estate | PixoraNest",
    description:
      "Qualify leads, schedule site visits and follow up 24/7 with PixoraNest AI automation for real estate developers and brokers.",
    keywords: ["AI for real estate", "real estate lead automation", "WhatsApp automation real estate"],
    ogImage: "https://pixoranest.com/og-image.png",
  },
  healthcare: {
    slug: "healthcare",
    name: "Healthcare",
    title: "AI Automation for Healthcare & Clinics | PixoraNest",
    description:
      "Automate appointments, patient follow-ups and reminders with PixoraNest AI built for hospitals, clinics and healthcare providers.",
    keywords: ["AI for healthcare", "clinic automation", "patient WhatsApp automation"],
    ogImage: "https://pixoranest.com/og-image.png",
  },
  education: {
    slug: "education",
    name: "Education",
    title: "AI Automation for Education & EdTech | PixoraNest",
    description:
      "Convert enquiries, automate admissions and engage students with PixoraNest AI for schools, colleges and edtech platforms.",
    keywords: ["AI for education", "admission automation", "edtech WhatsApp automation"],
    ogImage: "https://pixoranest.com/og-image.png",
  },
  // ... keep any other existing industry slugs unchanged ...
}

/* -------------------------------------------------------------------------- */
/*                              STATIC PARAMS                                 */
/* -------------------------------------------------------------------------- */

export function generateStaticParams() {
  return Object.keys(INDUSTRIES).map((slug) => ({ slug }))
}

/* -------------------------------------------------------------------------- */
/*                                METADATA                                    */
/* -------------------------------------------------------------------------- */

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const industry = INDUSTRIES[params.slug]
  if (!industry) {
    return {
      title: "Industry Not Found | PixoraNest",
      description: "The industry page you are looking for does not exist.",
    }
  }

  const url = `https://pixoranest.com/industries/${industry.slug}`

  return {
    title: industry.title,
    description: industry.description,
    keywords: industry.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: industry.title,
      description: industry.description,
      siteName: "PixoraNest",
      images: [
        {
          url: industry.ogImage ?? "https://pixoranest.com/og-image.png",
          width: 1200,
          height: 630,
          alt: `${industry.name} AI Automation by PixoraNest`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: industry.title,
      description: industry.description,
      images: [industry.ogImage ?? "https://pixoranest.com/og-image.png"],
    },
  }
}

/* -------------------------------------------------------------------------- */
/*                                  PAGE                                      */
/* -------------------------------------------------------------------------- */

export default function IndustryPage({
  params,
}: {
  params: { slug: string }
}) {
  const industry = INDUSTRIES[params.slug]
  if (!industry) notFound()

  // Structured data — Service schema per industry
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${industry.name} AI Automation by PixoraNest`,
    description: industry.description,
    provider: {
      "@type": "Organization",
      name: "PixoraNest",
      url: "https://pixoranest.com",
      logo: "https://pixoranest.com/logo.png",
    },
    areaServed: "IN",
    serviceType: `AI Automation for ${industry.name}`,
    url: `https://pixoranest.com/industries/${industry.slug}`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <IndustryContent slug={industry.slug} industry={industry} />
    </>
  )
}
