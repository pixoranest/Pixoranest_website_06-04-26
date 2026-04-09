import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { blogPosts } from "@/lib/data"
import { getArticleForSlug, getBlogImage } from "@/lib/blog-articles"
import { BlogArticleContent } from "./article-content"

interface Props {
  params: Promise<{
    slug: string
  }>
}

/**
 * Safely converts any date string to ISO 8601 format.
 * Falls back to today's date if parsing fails.
 * Schema.org requires ISO 8601 — "January 15, 2025" is invalid.
 */
function toISODate(dateStr: string): string {
  if (!dateStr) return new Date().toISOString().split("T")[0]
  const parsed = new Date(dateStr)
  if (!isNaN(parsed.getTime())) return parsed.toISOString().split("T")[0]
  return new Date().toISOString().split("T")[0]
}

/* ─── Generate SEO Metadata per Article ─── */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return {
      title: "Article Not Found | PixoraNest Blog",
      description:
        "The requested blog article could not be found. Explore our AI automation blog for the latest insights.",
      robots: { index: false, follow: false },
    }
  }

  const article = getArticleForSlug(slug)
  const heroImage = article?.heroImage || getBlogImage(slug)

  const seoTitle = `${post.title} | PixoraNest`
  const seoDescription =
    article?.metaDescription ||
    `${post.excerpt} Learn how PixoraNest helps Indian businesses automate smarter.`

  const canonicalUrl = `https://pixoranest.com/blog/${slug}`
  const imageUrl = heroImage.startsWith("http")
    ? heroImage
    : `https://pixoranest.com${heroImage}`

  const publishedDate = toISODate(article?.publishedDate ?? post.date)
  const modifiedDate = toISODate(article?.modifiedDate ?? post.date)

  return {
    title: seoTitle,
    description: seoDescription,

    keywords: [
      ...(article?.seoKeywords ?? []),
      "AI automation India",
      "PixoraNest",
      post.category,
    ],

    authors: [
      {
        name: post.author,
        url: "https://pixoranest.com/about",
      },
    ],

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: post.title,
      description: seoDescription,
      url: canonicalUrl,
      siteName: "PixoraNest",
      locale: "en_IN",
      type: "article",
      publishedTime: publishedDate,
      modifiedTime: modifiedDate,
      authors: ["https://pixoranest.com/about"],
      section: post.category,
      tags: article?.tags ?? [post.category],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${post.title} – PixoraNest AI Automation Blog`,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      site: "@pixoranest",
      title: post.title,
      description: seoDescription,
      images: [
        {
          url: imageUrl,
          alt: `${post.title} – PixoraNest`,
        },
      ],
    },

    other: {
      "geo.region": "IN",
      "article:author": post.author,
      "article:section": post.category,
    },
  }
}

/* ─── Static Blog Routes ─── */
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

/* ─── Blog Article Page ─── */
export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) notFound()

  const article = getArticleForSlug(slug)
  const heroImage = article?.heroImage || getBlogImage(slug)
  const canonicalUrl = `https://pixoranest.com/blog/${slug}`
  const imageUrl = heroImage.startsWith("http")
    ? heroImage
    : `https://pixoranest.com${heroImage}`
  const seoDescription =
    article?.metaDescription ||
    `${post.excerpt} Learn how PixoraNest helps Indian businesses automate smarter.`

  // ── Safe ISO dates (schema.org requires ISO 8601, not "Jan 15, 2025") ──
  const publishedDate = toISODate(article?.publishedDate ?? post.date)
  const modifiedDate = toISODate(article?.modifiedDate ?? post.date)

  // ── BlogPosting Schema (more specific than Article – preferred for blogs) ──
  const articleSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${canonicalUrl}/#article`,
    headline: post.title,
    description: seoDescription,
    url: canonicalUrl,
    image: {
      "@type": "ImageObject",
      "@id": `${canonicalUrl}/#primaryimage`,
      url: imageUrl,
      width: 1200,
      height: 630,
      caption: `${post.title} – PixoraNest AI Automation Blog`,
    },
    author: {
      "@type": "Person",
      "@id": "https://pixoranest.com/about/#author",
      name: post.author,
      url: "https://pixoranest.com/about",
    },
    publisher: {
      "@id": "https://pixoranest.com/#organization",
    },
    datePublished: publishedDate,
    dateModified: modifiedDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    inLanguage: "en-IN",
    isPartOf: {
      "@id": "https://pixoranest.com/blog/#blog",
    },
    about: {
      "@type": "Thing",
      name: post.category,
    },
    keywords: (article?.seoKeywords ?? [post.category]).join(", "),
    articleSection: post.category,
  })

  const breadcrumbSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${canonicalUrl}/#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://pixoranest.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://pixoranest.com/blog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: canonicalUrl,
      },
    ],
  })

  const faqItems = article?.faqs?.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  }))

  const faqSchema =
    faqItems && faqItems.length > 0
      ? JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${canonicalUrl}/#faq`,
          mainEntity: faqItems,
        })
      : null

  return (
    <>
      {/* BlogPosting Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: articleSchema }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbSchema }}
      />

      {/* FAQ Schema – only renders when FAQs exist */}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: faqSchema }}
        />
      )}

      <BlogArticleContent
        post={post}
        article={article}
        heroImage={heroImage}
        slug={slug}
      />
    </>
  )
}