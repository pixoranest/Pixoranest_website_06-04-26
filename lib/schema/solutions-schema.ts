// lib/schema/solutions-schema.ts

const SITE_URL = "https://www.pixoranest.com"

// ── 1. ORGANIZATION ────────────────────────────────────────────────────────
// FIX: No longer emits a full Organization definition.
// References the canonical @id from layout.tsx only.
// This prevents the "duplicate Organization" SEMrush error.
export const organizationRef = {
  "@id": `${SITE_URL}/#organization`,
}

// ── 2. LOCAL BUSINESS reference ────────────────────────────────────────────
// FIX: LocalBusiness is fully defined in layout.tsx.
// Solutions page references it — does not redefine it.
// FIX: Removed invalid @type array ["LocalBusiness","SoftwareApplication"]
// — these are incompatible types and cannot be combined.
export const localBusinessRef = {
  "@id": `${SITE_URL}/#localbusiness`,
}

// ── 3. WEBPAGE ─────────────────────────────────────────────────────────────
export const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${SITE_URL}/solutions#webpage`,
  url: `${SITE_URL}/solutions`,
  name: "AI Automation Solutions for Indian Businesses | PixoraNest",
  description:
    "Explore PixoraNest AI automation solutions — AI receptionist, WhatsApp automation, CRM, call automation, AI voice agents & social media automation for Indian businesses.",
  inLanguage: "en-IN",
  isPartOf: { "@id": `${SITE_URL}/#website` },
  about: { "@id": `${SITE_URL}/#organization` },
  breadcrumb: { "@id": `${SITE_URL}/solutions#breadcrumb` },
  // FIX: dateModified should reflect an actual update date, not a future one.
  datePublished: "2024-01-01",
  dateModified: "2025-04-01",
  keywords:
    "AI automation India, AI automation Rajasthan, AI automation Jaipur, WhatsApp automation India, CRM automation India, AI receptionist India",
}

// ── 4. BREADCRUMB ──────────────────────────────────────────────────────────
export const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${SITE_URL}/solutions#breadcrumb`,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: SITE_URL,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "AI Automation Solutions",
      item: `${SITE_URL}/solutions`,
    },
  ],
}

// ── 5. SERVICES ────────────────────────────────────────────────────────────
// FIX: All price values are strings (Schema.org Offer.price must be a string
// or number — both are valid, but keep consistent). Provider references
// Organization by @id rather than duplicating the full object.
export const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "@id": `${SITE_URL}/solutions#services`,
  name: "PixoraNest AI Automation Solutions",
  description: "Complete AI automation suite for Indian businesses",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "Service",
        "@id": `${SITE_URL}/solutions/firstvoice#service`,
        name: "FirstVoice — AI Receptionist",
        url: `${SITE_URL}/solutions/firstvoice`,
        description:
          "AI-powered virtual receptionist that answers every business call 24/7, qualifies leads, books appointments, and routes calls in English and Hindi.",
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: [
          { "@type": "Country", name: "India" },
          { "@type": "State", name: "Rajasthan" },
          { "@type": "City", name: "Jaipur" },
          { "@type": "City", name: "Alwar" },
        ],
        serviceType: "AI Call Automation",
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          price: "4999",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            billingIncrement: "P1M",
          },
        },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "Service",
        "@id": `${SITE_URL}/solutions/leadnest#service`,
        name: "LeadNest — WhatsApp Lead Automation",
        url: `${SITE_URL}/solutions/leadnest`,
        description:
          "WhatsApp automation platform for lead capture, instant replies, drip follow-ups, and CRM sync for Indian businesses.",
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: { "@type": "Country", name: "India" },
        serviceType: "WhatsApp Marketing Automation",
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          price: "3999",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            billingIncrement: "P1M",
          },
        },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "Service",
        "@id": `${SITE_URL}/solutions/callorbit#service`,
        name: "CallOrbit — AI Call Automation & Routing",
        url: `${SITE_URL}/solutions/callorbit`,
        description:
          "AI-powered call routing and transcription platform that replaces IVR with intelligent intent-based routing for Indian businesses.",
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: { "@type": "Country", name: "India" },
        serviceType: "Cloud Telephony & Call Automation",
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          price: "3999",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            billingIncrement: "P1M",
          },
        },
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "Service",
        "@id": `${SITE_URL}/solutions/echoassist#service`,
        name: "EchoAssist — AI Voice Agent",
        url: `${SITE_URL}/solutions/echoassist`,
        description:
          "Human-like AI voice agent for outbound sales calling, appointment reminders, and customer support in English and Hindi.",
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: { "@type": "Country", name: "India" },
        serviceType: "AI Voice Automation",
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          price: "7999",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            billingIncrement: "P1M",
          },
        },
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "Service",
        "@id": `${SITE_URL}/solutions/socialium#service`,
        name: "Socialium — Social Media Automation",
        url: `${SITE_URL}/solutions/socialium`,
        description:
          "Social media automation for content scheduling, Instagram DM auto-replies, lead capture, and analytics across Indian businesses.",
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: { "@type": "Country", name: "India" },
        serviceType: "Social Media Marketing Automation",
      },
    },
    {
      "@type": "ListItem",
      position: 6,
      item: {
        "@type": "Service",
        "@id": `${SITE_URL}/solutions/crm-automation#service`,
        name: "CRM Automation by PixoraNest",
        url: `${SITE_URL}/solutions/crm-automation`,
        description:
          "CRM workflow automation for lead capture, scoring, assignment, and sales pipeline management for Indian businesses.",
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: { "@type": "Country", name: "India" },
        serviceType: "CRM & Sales Automation",
        offers: {
          "@type": "Offer",
          priceCurrency: "INR",
          price: "4999",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            billingIncrement: "P1M",
          },
        },
      },
    },
  ],
}

// ── 6. FAQ SCHEMA ──────────────────────────────────────────────────────────
export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${SITE_URL}/solutions#faq`,
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does AI automation cost for Indian businesses?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PixoraNest AI automation plans start at ₹3,999/month for call automation, ₹4,999/month for AI receptionist and CRM automation, and ₹7,999/month for AI voice agent with 5,000 call minutes. All plans include onboarding support. No setup fees or long-term contracts.",
      },
    },
    {
      "@type": "Question",
      name: "Is AI automation available in Rajasthan, Jaipur, and Alwar?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. PixoraNest serves businesses across India including Rajasthan cities like Jaipur, Alwar, Narayanpur, Ajmer, Kota, Udaipur and more. Our AI automation platform works 100% online — no physical installation required.",
      },
    },
    {
      "@type": "Question",
      name: "Is WhatsApp automation legal in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. PixoraNest uses only the official WhatsApp Business API by Meta, which is fully legal and compliant in India. All outbound messages require prior opt-in consent from customers, and we follow TRAI and Meta's messaging policies.",
      },
    },
    {
      "@type": "Question",
      name: "What is the best AI automation tool for small businesses in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "PixoraNest is designed specifically for Indian small businesses and SMEs. It offers AI receptionist, WhatsApp automation, CRM workflows, and AI voice agents at affordable flat monthly pricing with no per-call or per-message charges.",
      },
    },
    {
      "@type": "Question",
      name: "How long does it take to implement AI automation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most PixoraNest products are live within 30 minutes to 24 hours. WhatsApp automation and CRM workflows are live in under 30 minutes. Call routing goes live in 24 hours. AI voice agent is ready in 48 hours including script training.",
      },
    },
    {
      "@type": "Question",
      name: "Does PixoraNest AI automation integrate with Zoho, HubSpot, and Freshsales?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. PixoraNest natively integrates with Zoho CRM, HubSpot, Freshsales, Salesforce, and Pipedrive. All lead data, conversations, and call outcomes sync automatically in real time.",
      },
    },
    {
      "@type": "Question",
      name: "Is AI automation safe for my business data?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. PixoraNest is SOC2-compliant with all data encrypted at rest and in transit. Our infrastructure is hosted on Indian data centers, fully compliant with Indian data protection regulations.",
      },
    },
    {
      "@type": "Question",
      name: "Does PixoraNest support Hindi for AI automation?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. FirstVoice AI receptionist and EchoAssist AI voice agent both support English and Hindi fluently. LeadNest WhatsApp automation supports Hindi, English, and Hinglish templates.",
      },
    },
  ],
}

// ── COMBINED EXPORT ────────────────────────────────────────────────────────
// FIX: No longer includes a standalone Organization schema.
// The solutions page only emits WebPage, Breadcrumb, Services, and FAQ.
// Organization and LocalBusiness come from layout.tsx automatically.
export const allSolutionsSchemas = [
  webPageSchema,
  breadcrumbSchema,
  servicesSchema,
  faqSchema,
]