import type { Metadata } from "next";
import CustomerStoriesClient from "./CustomerStoriesClient";

const PAGE_URL = "https://pixoranest.com/customer-stories";
const PAGE_TITLE = "Customer Stories | PixoraNest";
const PAGE_DESCRIPTION =
  "Real customer success stories that prove AI automation works. See how Indian businesses in real estate, healthcare, and education improved lead response and operations with PixoraNest.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  keywords: [
    "PixoraNest customer stories",
    "AI automation case studies India",
    "AI receptionist results",
    "WhatsApp lead automation",
    "CRM workflow automation",
    "AI voice agent case study",
  ],
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: "PixoraNest",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    site: "@pixoranest",
  },
  alternates: { canonical: PAGE_URL },
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
};

// Only safe, factual schema — no fabricated reviews or aggregateRating.
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "PixoraNest",
  url: "https://pixoranest.com",
  description:
    "AI automation platform for Indian businesses — AI Receptionist, WhatsApp Lead Automation, AI Voice Agents, CRM Workflow Automation.",
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  url: PAGE_URL,
  isPartOf: { "@type": "WebSite", name: "PixoraNest", url: "https://pixoranest.com" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://pixoranest.com" },
    { "@type": "ListItem", position: 2, name: "Customer Stories", item: PAGE_URL },
  ],
};

export default function CustomerStoriesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <CustomerStoriesClient />
    </>
  );
}
