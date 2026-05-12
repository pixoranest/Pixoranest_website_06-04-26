import type { Metadata } from "next"
import CustomerStoriesClient from "./CustomerStoriesClient"

const SITE_URL = "https://www.pixoranest.com"

export const metadata: Metadata = {
  title: "Customer Success Stories | PixoraNest AI Automation",
  description:
    "Discover how 500+ Indian businesses including NoBroker, Apollo Hospitals, Meesho, HDFC Bank, Zomato and Delhivery achieved 4X ROI using PixoraNest WhatsApp automation, AI call automation, CRM workflow automation, and AI voice agents.",
  keywords: [
    "WhatsApp automation India",
    "AI call automation",
    "CRM workflow automation",
    "AI voice agent",
    "customer success stories",
    "NoBroker automation",
    "Apollo AI receptionist",
    "Meesho CRM",
    "HDFC Bank AI",
    "PixoraNest case studies",
  ],
  openGraph: {
    title: "Customer Success Stories | PixoraNest AI Automation",
    description:
      "Real results from 500+ Indian businesses using PixoraNest's WhatsApp automation, AI calling, and CRM workflows.",
    url: `${SITE_URL}/customer-stories`,
    siteName: "PixoraNest",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-customer-stories.jpg`,
        width: 1200,
        height: 630,
        alt: "PixoraNest Customer Success Stories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Customer Success Stories | PixoraNest AI Automation",
    description:
      "Discover how NoBroker, Apollo, Meesho, HDFC Bank and more achieved 4X ROI with PixoraNest.",
    images: [`${SITE_URL}/og-customer-stories.jpg`],
  },
  alternates: {
    canonical: `${SITE_URL}/customer-stories`,
  },
}

// ─── JSON-LD ──────────────────────────────────────────────────────────────────
// SoftwareApplication is defined HERE (once, canonical) — NOT in layout.tsx.
// Organization is referenced by @id, not redefined.
// All numeric values (ratingValue, reviewCount, ratingCount) must be numbers,
// not strings — Google's validator rejects quoted numerics in AggregateRating.
const jsonLdString = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/customer-stories#webpage`,
      url: `${SITE_URL}/customer-stories`,
      name: "Customer Success Stories | PixoraNest AI Automation",
      description:
        "Discover how 500+ Indian businesses achieved 4X ROI using PixoraNest WhatsApp automation, AI call automation, CRM workflow automation, and AI voice agents.",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Customer Stories",
            item: `${SITE_URL}/customer-stories`,
          },
        ],
      },
    },

    // ── CANONICAL SoftwareApplication node ──────────────────────────────────
    // This is the single authoritative definition. layout.tsx no longer emits one.
    // Reviews are nested — do NOT add itemReviewed inside a nested review.
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE_URL}/#product`,
      name: "PixoraNest AI Automation Platform",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: SITE_URL,
      description:
        "India's leading WhatsApp automation, AI calling, and CRM workflow platform trusted by 500+ businesses.",
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
      // FIX: ratingValue must be a number, not a string.
      // FIX: Use only reviewCount — ratingCount is a synonym; using both
      //      causes validators to flag a duplicate property warning.
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: 4.8,
        bestRating: 5,
        worstRating: 1,
        reviewCount: 500,
      },
      review: [
        {
          "@type": "Review",
          name: "Transformed our entire operations — 100% lead capture",
          reviewBody:
            "PixoraNest didn't just automate our calls — they transformed how our entire operations team functions. We went from missing 40% of inbound leads to capturing every single one, 24/7.",
          reviewRating: {
            "@type": "Rating",
            ratingValue: 5,
            bestRating: 5,
            worstRating: 1,
          },
          datePublished: "2024-10-01",
          author: {
            "@type": "Person",
            name: "Sanjay Kumar",
            jobTitle: "CEO",
          },
          publisher: {
            "@type": "Organization",
            name: "RealtyPlus India",
          },
        },
        {
          "@type": "Review",
          name: "Lead response time dropped from 4 hours to 8 seconds",
          reviewBody:
            "The WhatsApp automation was live in 3 days. Within the first month, our lead response time dropped from 4 hours to 8 seconds. Our sales team finally has time to close, not chase.",
          reviewRating: {
            "@type": "Rating",
            ratingValue: 5,
            bestRating: 5,
            worstRating: 1,
          },
          datePublished: "2024-11-01",
          author: {
            "@type": "Person",
            name: "Preethi Iyer",
            jobTitle: "VP Growth",
          },
          publisher: {
            "@type": "Organization",
            name: "HealthFirst",
          },
        },
        {
          "@type": "Review",
          name: "Custom workflow that fits our logistics operations perfectly",
          reviewBody:
            "We tried 3 other automation platforms before PixoraNest. None of them understood our industry. PixoraNest built a custom workflow that fits our logistics operations perfectly.",
          reviewRating: {
            "@type": "Rating",
            ratingValue: 5,
            bestRating: 5,
            worstRating: 1,
          },
          datePublished: "2024-12-01",
          author: {
            "@type": "Person",
            name: "Mahesh Rao",
            jobTitle: "COO",
          },
          publisher: {
            "@type": "Organization",
            name: "FastShip Logistics",
          },
        },
      ],
    },
  ],
})

export default function CustomerStoriesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />
      <CustomerStoriesClient />
    </>
  )
}