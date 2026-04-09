// app/solutions/[solution]/page.tsx

import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { solutionsMap } from "@/lib/solution-data"
import { SolutionPageContent } from "./solution-page-content"

// ─── 1. Pre-render all 6 solution pages at build time ────────────────────────
export async function generateStaticParams() {
  return Object.keys(solutionsMap).map((slug) => ({ solution: slug }))
}

// ─── 2. Unique SEO Metadata for every solution page ───────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ solution: string }>
}): Promise<Metadata> {
  const { solution } = await params
  const data = solutionsMap[solution]

  if (!data) {
    return {
      title: "Solution Not Found | PixoraNest",
      robots: { index: false, follow: false },
    }
  }

  const pageUrl = `https://pixoranest.com/solutions/${data.slug}`
  const ogImage = `https://pixoranest.com/og/${data.slug}.jpg`

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    keywords: [data.focusKeyword, ...data.secondaryKeywords].join(", "),

    alternates: {
      canonical: pageUrl,
    },

    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: pageUrl,
      siteName: "PixoraNest",
      locale: "en_IN",
      type: "website",
      images: [{ url: ogImage, width: 1200, height: 630, alt: data.metaTitle }],
    },

    twitter: {
      card: "summary_large_image",
      title: data.metaTitle,
      description: data.metaDescription,
      site: "@pixoranest",
      creator: "@pixoranest",
      images: [ogImage],
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
  }
}

// ─── 3. Page Component with 3 JSON-LD Schemas ─────────────────────────────────
export default async function SolutionPage({
  params,
}: {
  params: Promise<{ solution: string }>
}) {
  const { solution } = await params
  const data = solutionsMap[solution]

  if (!data) return notFound()

  const pageUrl = `https://pixoranest.com/solutions/${data.slug}`

  // Schema 1 — Service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: data.badge,
    description: data.metaDescription,
    url: pageUrl,
    provider: {
      "@type": "Organization",
      name: "PixoraNest",
      url: "https://pixoranest.com",
      logo: { "@type": "ImageObject", url: "https://pixoranest.com/logo.png" },
    },
    areaServed: { "@type": "Country", name: "India" },
    serviceType: data.focusKeyword,
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
      url: "https://pixoranest.com/demo",
    },
  }

  // Schema 2 — FAQ (shows as rich result in Google search)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  }

  // Schema 3 — Breadcrumb
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://pixoranest.com" },
      { "@type": "ListItem", position: 2, name: "Solutions", item: "https://pixoranest.com/solutions" },
      { "@type": "ListItem", position: 3, name: data.badge.split("·")[0].trim(), item: pageUrl },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SolutionPageContent data={data} />
    </>
  )
}