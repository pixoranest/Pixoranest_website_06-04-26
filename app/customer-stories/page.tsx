// app/customer-stories/page.tsx

import type { Metadata } from "next";
import CustomerStoriesClient from "./CustomerStoriesClient";

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
    url: "https://www.pixoranest.com/customer-stories",
    siteName: "PixoraNest",
    type: "website",
    images: [
      {
        url: "https://www.pixoranest.com/og-customer-stories.jpg",
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
    images: ["https://www.pixoranest.com/og-customer-stories.jpg"],
  },
  alternates: {
    canonical: "https://www.pixoranest.com/customer-stories",
  },
};

// ─── JSON-LD serialised once at module load (= build time for static export) ──
const jsonLdString = JSON.stringify({
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.pixoranest.com/customer-stories#webpage",
      url:  "https://www.pixoranest.com/customer-stories",
      name: "Customer Success Stories | PixoraNest AI Automation",
      description:
        "Discover how 500+ Indian businesses achieved 4X ROI using PixoraNest WhatsApp automation, AI call automation, CRM workflow automation, and AI voice agents.",
      isPartOf: { "@id": "https://www.pixoranest.com/#website" },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home",             item: "https://www.pixoranest.com" },
          { "@type": "ListItem", position: 2, name: "Customer Stories", item: "https://www.pixoranest.com/customer-stories" },
        ],
      },
    },

    // ── SoftwareApplication with nested reviews ──────────────────────────────
    // RULE: When a Review is nested INSIDE its reviewed entity, Google infers
    // the subject from the parent node. Adding `itemReviewed` inside a nested
    // review creates a directional conflict → Google issues a non-critical
    // warning and may ignore the review for rich results.
    // FIX: Remove `itemReviewed` from every review that is already nested.
    {
      "@type": "SoftwareApplication",
      "@id":   "https://www.pixoranest.com/#product",
      name:    "PixoraNest AI Automation Platform",
      applicationCategory: "BusinessApplication",
      operatingSystem:     "Web",
      url:                 "https://www.pixoranest.com",
      description:
        "India's leading WhatsApp automation, AI calling, and CRM workflow platform trusted by 500+ businesses.",
      offers: {
        "@type":        "Offer",
        priceCurrency:  "INR",
        availability:   "https://schema.org/InStock",
      },
      aggregateRating: {
        "@type":      "AggregateRating",
        ratingValue:  "4.8",
        bestRating:   "5",
        worstRating:  "1",
        ratingCount:  "500",
        reviewCount:  "500",
      },
      review: [
        {
          "@type":      "Review",
          name:         "Transformed our entire operations — 100% lead capture",
          reviewBody:
            "PixoraNest didn't just automate our calls — they transformed how our entire operations team functions. We went from missing 40% of inbound leads to capturing every single one, 24/7.",
          reviewRating: {
            "@type":      "Rating",
            ratingValue:  "5",
            bestRating:   "5",
            worstRating:  "1",
          },
          datePublished: "2024-10-01",
          author: {
            "@type":   "Person",
            name:      "Sanjay Kumar",
            jobTitle:  "CEO",
          },
          // ↑ NO `itemReviewed` here — this review is nested inside
          //   SoftwareApplication, so Google already knows what is reviewed.
          // Adding itemReviewed would cause: "directional conflict" warning.
          publisher: {
            "@type": "Organization",
            name:    "RealtyPlus India",
          },
        },
        {
          "@type":      "Review",
          name:         "Lead response time dropped from 4 hours to 8 seconds",
          reviewBody:
            "The WhatsApp automation was live in 3 days. Within the first month, our lead response time dropped from 4 hours to 8 seconds. Our sales team finally has time to close, not chase.",
          reviewRating: {
            "@type":      "Rating",
            ratingValue:  "5",
            bestRating:   "5",
            worstRating:  "1",
          },
          datePublished: "2024-11-01",
          author: {
            "@type":   "Person",
            name:      "Preethi Iyer",
            jobTitle:  "VP Growth",
          },
          publisher: {
            "@type": "Organization",
            name:    "HealthFirst",
          },
        },
        {
          "@type":      "Review",
          name:         "Custom workflow that fits our logistics operations perfectly",
          reviewBody:
            "We tried 3 other automation platforms before PixoraNest. None of them understood our industry. PixoraNest built a custom workflow that fits our logistics operations perfectly.",
          reviewRating: {
            "@type":      "Rating",
            ratingValue:  "5",
            bestRating:   "5",
            worstRating:  "1",
          },
          datePublished: "2024-12-01",
          author: {
            "@type":   "Person",
            name:      "Mahesh Rao",
            jobTitle:  "COO",
          },
          publisher: {
            "@type": "Organization",
            name:    "FastShip Logistics",
          },
        },
      ],
    },

    {
      "@type": "Organization",
      "@id":   "https://www.pixoranest.com/#organization",
      name:    "PixoraNest",
      url:     "https://www.pixoranest.com",
      logo: {
        "@type":  "ImageObject",
        url:      "https://www.pixoranest.com/images/logo-pixoranest.png",
        width:    180,
        height:   50,
      },
      sameAs: [
        "https://www.linkedin.com/company/pixoranest",
        "https://twitter.com/pixoranest",
        "https://www.instagram.com/pixoranest",
        "https://www.facebook.com/pixoranest2025",
        "https://www.youtube.com/@pixora-nest",
      ],
      contactPoint: {
        "@type":            "ContactPoint",
        telephone:          "+91-94606-86266",
        email:              "info@pixoranest.com",
        contactType:        "customer support",
        availableLanguage:  ["English", "Hindi"],
        areaServed:         "IN",
      },
    },
  ],
});

// ─── Page (Server Component — no "use client") ────────────────────────────────
// Plain <script> in a Server Component is written into the static HTML at
// build time. It does not participate in React hydration. Zero runtime cost.
export default function CustomerStoriesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString }}
      />
      <CustomerStoriesClient />
    </>
  );
}