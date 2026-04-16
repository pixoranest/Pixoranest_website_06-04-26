// app/customer-stories/page.tsx
// ─────────────────────────────────────────────────────────────────────────────
// This is a pure Server Component (no "use client").
// It exports static metadata and renders the client shell.
// Compatible with `output: "export"`.
// ─────────────────────────────────────────────────────────────────────────────

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

// No dynamic params, no generateStaticParams needed — this is a static page.
export default function CustomerStoriesPage() {
  return <CustomerStoriesClient />;
}