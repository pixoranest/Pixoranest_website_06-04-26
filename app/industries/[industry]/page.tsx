// ─────────────────────────────────────────────────────────────────────────────
// FILE: app/industries/[industry]/page.tsx
// Replace your existing file entirely with this.
// ─────────────────────────────────────────────────────────────────────────────

import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { industries } from "@/lib/data"
import { IndustryPageContent } from "./industry-content"

// ─── FIX 1: Remove the broken IndustriesPageContent import entirely ───────────
// industry-page.tsx uses `export default` not `export const IndustriesPageContent`
// That component belongs to app/industries/page.tsx, NOT this file.
// It was only added by mistake — this file renders a single industry, not the list.

// ─── generateStaticParams: derive slugs from data array ──────────────────────
// This is the ONLY fix needed for indexing — Next.js needs this to pre-render
// each /industries/[slug] page as a static HTML file at build time.

export function generateStaticParams() {
  return industries.map((industry) => ({
    industry: industry.slug,
  }))
}

// ─── Per-industry SEO metadata ────────────────────────────────────────────────

const industryMetaOverrides: Record<string, {
  titleSuffix: string
  descriptionOverride?: string
}> = {
  healthcare: {
    titleSuffix: "Healthcare & Clinics",
    descriptionOverride:
      "AI automation for healthcare clinics and hospitals in India. Automate patient calls, appointment booking & 24/7 support. Reduce clinic costs by 60%. Setup in 2–4 weeks.",
  },
  ecommerce: {
    titleSuffix: "E-Commerce & D2C Brands",
    descriptionOverride:
      "AI automation for e-commerce businesses in India. Recover abandoned carts, automate customer support & boost conversions 5x with PixoraNest — live in 24 hours.",
  },
  manufacturing: {
    titleSuffix: "Manufacturing & Factory Operations",
  },
  logistics: {
    titleSuffix: "Logistics & Supply Chain",
  },
  finance: {
    titleSuffix: "Finance & Banking",
  },
  education: {
    titleSuffix: "Education & EdTech",
  },
  hospitality: {
    titleSuffix: "Hospitality & Hotels",
  },
  "real-estate": {
    titleSuffix: "Real Estate & Property",
  },
  "it-saas": {
    titleSuffix: "Technology & SaaS",
  },
  startups: {
    titleSuffix: "Startups & Growing Businesses",
  },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ industry: string }>
}): Promise<Metadata> {
  const { industry: slug } = await params

  // Find the industry object from data — same lookup used in the page component
  const industry = industries.find((i) => i.slug === slug)
  if (!industry) return {}

  const override = industryMetaOverrides[slug]
  const titleSuffix = override?.titleSuffix ?? industry.title
  const title = `AI Automation for ${titleSuffix} | PixoraNest`
  const description =
    override?.descriptionOverride ??
    `AI automation solutions for the ${industry.title.toLowerCase()} industry in India. Automate customer communication, calls & lead management with PixoraNest. Go live in 24 hours.`

  // ── Trailing slash: matches trailingSlash: true in next.config.mjs ──────────
  const url = `https://pixoranest.com/industries/${slug}/`

  return {
    title,
    description,
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

// ─── Page component ───────────────────────────────────────────────────────────

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ industry: string }>
}) {
  const { industry: slug } = await params

  // ── FIX 2: Look up the full IndustryData object from lib/data ────────────────
  // IndustryPageContent expects `industry: IndustryData` (the full object),
  // NOT a string slug. Passing a slug directly caused:
  //   "Type 'string' is not assignable to type 'IndustryData'"
  const industry = industries.find((i) => i.slug === slug)

  // If slug is not in the data array, show Next.js 404 page
  if (!industry) notFound()

  // ── JSON-LD structured data ──────────────────────────────────────────────────
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `AI Automation for ${industry.title} | PixoraNest`,
    description: `AI automation solutions purpose-built for the ${industry.title.toLowerCase()} industry in India.`,
    url: `https://pixoranest.com/industries/${industry.slug}/`,
    publisher: {
      "@type": "Organization",
      name: "PixoraNest",
      url: "https://pixoranest.com",
      logo: { "@type": "ImageObject", url: "https://pixoranest.com/images/logo-pixoranest.png" },
    },
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home",       item: "https://pixoranest.com/" },
        { "@type": "ListItem", position: 2, name: "Industries", item: "https://pixoranest.com/industries/" },
        { "@type": "ListItem", position: 3, name: industry.title, item: `https://pixoranest.com/industries/${industry.slug}/` },
      ],
    },
    mainEntity: {
      "@type": "Service",
      name: `AI Automation for ${industry.title}`,
      description: `PixoraNest AI automation for ${industry.title.toLowerCase()} businesses — automating calls, leads, and customer communication.`,
      provider: {
        "@type": "Organization",
        name: "PixoraNest",
        url: "https://pixoranest.com",
      },
      areaServed: "IN",
    },
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
              text: "Most clients go live within 24–48 hours. PixoraNest handles the full setup — no heavy lifting required from your team.",
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
      {/* ── FIX 2 (continued): pass the full industry object, not a string slug ── */}
      <IndustryPageContent industry={industry} />
    </>
  )
}