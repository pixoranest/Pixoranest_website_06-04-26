import type { Metadata } from "next";
import LeadNestPageContent from "./page_content";

const TITLE = "LeadNest CRM & Lead Management Platform | PixoraNest";
const DESCRIPTION =
  "LeadNest by PixoraNest is an AI-powered CRM, lead management, sales automation and customer communication platform. Capture, qualify, nurture and convert leads.";
const URL = "https://pixoranest.com/leadnest";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: URL,
    type: "website",
    siteName: "PixoraNest",
    images: [
      {
        url: "https://pixoranest.com/og-leadnest.png",
        width: 1200,
        height: 630,
        alt: "LeadNest CRM & Lead Management Platform by PixoraNest",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["https://pixoranest.com/og-leadnest.png"],
  },
};

const FAQS_FOR_SCHEMA = [
  ["What is LeadNest?", "LeadNest is an AI-powered CRM and lead management platform built by PixoraNest. It combines CRM software, lead tracking, sales pipeline management, workflow automation and customer communication in a single platform."],
  ["What makes LeadNest different from other CRM software?", "LeadNest is developed by PixoraNest and combines CRM, lead management, sales automation, and customer communication into one platform — instead of bolting together separate tools. PixoraNest also delivers implementation, automation and optimization as a managed service."],
  ["Does PixoraNest provide CRM implementation services?", "Yes. PixoraNest provides full CRM implementation — discovery, data migration, workflow configuration, automation, integrations, onboarding and ongoing optimization for LeadNest."],
  ["Is LeadNest only for Real Estate?", "No. LeadNest by PixoraNest is an industry-agnostic CRM and lead management platform. Real Estate is one of many use cases — PixoraNest also deploys LeadNest for Healthcare, Education, Financial Services, Legal, Hospitality, E-Commerce and Technology."],
  ["How does LeadNest capture leads?", "LeadNest captures leads from web forms, landing pages, ads, WhatsApp, email, chat, phone calls (via PixoraNest's FirstVoice), and any custom source via API or webhook."],
  ["Can LeadNest automatically qualify leads?", "Yes. LeadNest's lead qualification software uses rules and AI scoring to qualify leads on budget, intent, source and behavior — the PixoraNest team helps you design the scoring model for your business."],
  ["Does LeadNest support sales pipeline management?", "Yes. LeadNest is a full sales pipeline software — multiple pipelines, custom stages, drag-and-drop deal management, forecasting and conversion analytics. PixoraNest configures pipelines to match your sales motion."],
  ["Can LeadNest automate follow-ups?", "Yes. LeadNest's sales workflow automation triggers emails, WhatsApp messages, calls, reminders, and tasks based on lead stage, score, or behavior. PixoraNest's automation experts design these flows."],
  ["Does LeadNest include a customer communication platform?", "Yes. LeadNest is a unified customer communication platform — every email, WhatsApp message, call and chat is logged on the contact record. PixoraNest also integrates external channels you already use."],
  ["Which channels does LeadNest support?", "LeadNest by PixoraNest supports email, WhatsApp Business, SMS, voice calls, web chat, and Instagram/Facebook DMs. PixoraNest connects each channel during implementation."],
  ["Can LeadNest integrate with my existing tools?", "Yes. PixoraNest integrates LeadNest with HubSpot, Salesforce, Zoho, Pipedrive, Google Workspace, Microsoft 365, Slack, WhatsApp Business, Razorpay, Stripe, and custom systems via API."],
  ["How long does it take to deploy LeadNest?", "Most businesses go live on LeadNest within 2–4 weeks. PixoraNest runs a structured implementation — discovery, configuration, integrations, training and go-live."],
  ["Does LeadNest provide reporting and analytics?", "Yes. LeadNest ships with real-time dashboards for pipeline, conversion, activity, source performance and team productivity. PixoraNest builds custom reports for your leadership team."],
  ["Is LeadNest suitable for small businesses?", "Yes. PixoraNest deploys LeadNest for small teams, mid-market companies and large enterprises — pricing and configuration scale with your business."],
  ["Does LeadNest support multiple languages?", "Yes. LeadNest by PixoraNest supports multilingual customer communication including English, Hindi, Hinglish and major regional languages."],
  ["How does LeadNest improve conversion rates?", "By combining instant lead capture, AI qualification, automated nurturing, pipeline visibility and unified communication, PixoraNest's LeadNest typically lifts conversion rates 2–3× within the first quarter."],
  ["Is my data secure on LeadNest?", "Yes. LeadNest data is encrypted in transit and at rest, hosted on enterprise-grade infrastructure, and PixoraNest provides role-based access control, audit logs and DPDP/GDPR-aligned policies."],
  ["Can LeadNest work with FirstVoice and CallOrbit?", "Yes. LeadNest, FirstVoice and CallOrbit are all PixoraNest products and are designed to work as one ecosystem — FirstVoice captures inbound calls, LeadNest manages the lead, CallOrbit routes ongoing communication."],
  ["What kind of support does PixoraNest provide?", "PixoraNest provides onboarding, training, dedicated success management, automation engineering, quarterly CRM audits and ongoing optimization for every LeadNest customer."],
  ["How do I get started with LeadNest?", "Book a demo with PixoraNest. The team will map your sales process, design your LeadNest workflows, and give you a personalized plan to capture more leads and close more deals."],
];

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "LeadNest",
    applicationCategory: "BusinessApplication",
    applicationSubCategory: "CRM & Lead Management Platform",
    description: DESCRIPTION,
    brand: { "@type": "Brand", name: "PixoraNest" },
    operatingSystem: "Web",
    url: URL,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS_FOR_SCHEMA.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://pixoranest.com/" },
      { "@type": "ListItem", position: 2, name: "Solutions", item: "https://pixoranest.com/solutions" },
      { "@type": "ListItem", position: 3, name: "LeadNest", item: URL },
    ],
  },
];

export default function LeadNestPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LeadNestPageContent />
    </>
  );
}
