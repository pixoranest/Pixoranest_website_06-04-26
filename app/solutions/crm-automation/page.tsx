import type { Metadata } from "next"
import { CRMAutomationPageContent } 
from "./page_content"

export const metadata: Metadata = {
  title: "CRM Automation for Indian Businesses | PixoraNest",
  description:
    "Automate your entire sales pipeline with smart CRM workflows, lead tracking, and performance analytics. Capture every lead, score them instantly, and close deals faster.",
  keywords: [
    "CRM automation India",
    "sales pipeline automation",
    "lead management software India",
    "CRM workflow automation",
    "automated lead scoring",
    "sales automation tools India",
    "CRM integration India",
    "lead tracking software",
  ],
  alternates: {
    canonical: "https://pixoranest.com/solutions/crm-automation",
  },
  openGraph: {
    title: "CRM Automation — Automate Your Sales Pipeline | PixoraNest",
    description:
      "Smart CRM workflows, lead tracking, and performance analytics for Indian businesses. Capture every lead and close deals faster.",
    url: "https://pixoranest.com/solutions/crm-automation",
    siteName: "PixoraNest",
    type: "website",
    images: [
      {
        url: "https://pixoranest.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "PixoraNest CRM Automation — Sales Pipeline Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CRM Automation for Indian Businesses | PixoraNest",
    description:
      "Automate lead capture, scoring, and follow-ups with PixoraNest CRM Automation.",
    images: ["https://pixoranest.com/og-image.png"],
  },
}

export default function CRMAutomationPage() {
  return <CRMAutomationPageContent />
}