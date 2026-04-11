import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import LeadPopup from "@/components/lead-popup"
import TopBar from "@/components/topbar"

import "./globals.css"
import { metadata } from "./seo_metadata";
export { metadata };

// ─── Fonts ────────────────────────────────────────────────────────────────────
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",       // ✅ prevents FOIT — improves CLS score
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

// ─── Site-wide Constants ──────────────────────────────────────────────────────
const SITE_URL  = "https://www.pixoranest.com"   // 🔁 update to your live domain
const SITE_NAME = "PixoraNest"
const OG_IMAGE  = `${SITE_URL}/og-image.jpg`     // 1200 × 630 px recommended

// ─── Viewport (moved out of metadata per Next.js 14+ requirement) ─────────────
export const viewport: Viewport = {
  width:        "device-width",
  initialScale: 1,
  themeColor:   "#0f172a",
}

// ─── Global Metadata ──────────────────────────────────────────────────────────


// ─── JSON-LD: Organization Schema (E-E-A-T trust signal) ──────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type":    "Organization",
  name:        SITE_NAME,
  url:         SITE_URL,
  logo:        `${SITE_URL}/logo.png`,
  description:
    "PixoraNest provides AI automation services for businesses in India including AI receptionist, WhatsApp lead management, call routing, and social media automation.",
  foundingDate: "2024",
  areaServed: {
    "@type": "Country",
    name:    "India",
  },
  address: {
    "@type":          "PostalAddress",
    addressCountry:   "IN",
  },
  contactPoint: {
    "@type":             "ContactPoint",
    contactType:         "customer support",
    availableLanguage:   ["English", "Hindi"],
    areaServed:          "IN",
  },
  sameAs: [
    // 🔁 Replace with your actual social profile URLs
    "https://www.linkedin.com/company/pixoranest",
    "https://twitter.com/pixoranest",
    "https://www.instagram.com/pixoranest",
  ],
}

// ─── JSON-LD: WebSite Schema (enables Google Sitelinks Search Box) ─────────────
const websiteSchema = {
  "@context":   "https://schema.org",
  "@type":      "WebSite",
  name:          SITE_NAME,
  url:           SITE_URL,
  description:
    "AI Automation Services for Businesses in India — AI Receptionist, WhatsApp Lead Management, Call Routing & Social Media Automation.",
  inLanguage:    "en-IN",
  potentialAction: {
    "@type":  "SearchAction",
    target: {
      "@type":      "EntryPoint",
      urlTemplate:  `${SITE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
}

// ─── JSON-LD: SoftwareApplication Schema (SaaS product suite) ─────────────────
const softwareSchema = {
  "@context":            "https://schema.org",
  "@type":               "SoftwareApplication",
  name:                  "PixoraNest AI Automation Platform",
  applicationCategory:   "BusinessApplication",
  operatingSystem:       "Web",
  url:                   SITE_URL,
  description:
    "AI-powered automation platform for Indian businesses offering AI receptionist, WhatsApp CRM, smart call routing, and social media management.",
  offers: {
    "@type":        "Offer",
    priceCurrency:  "INR",
    availability:   "https://schema.org/InStock",
  },
  aggregateRating: {
    "@type":       "AggregateRating",
    ratingValue:   "4.8",
    reviewCount:   "120",    // 🔁 update with real review count
    bestRating:    "5",
    worstRating:   "1",
  },
}

// ─── Root Layout Component ────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* ── India Geo-Targeting Meta Tags ───────────────────────────── */}
        <meta name="geo.region"    content="IN" />
        <meta name="geo.placename" content="India" />
        <meta name="language"      content="English" />
        <meta name="coverage"      content="India" />
        <meta name="distribution"  content="global" />
        <meta name="rating"        content="general" />
        <meta name="target"        content="all" />

        {/* ── JSON-LD Schema Markup ───────────────────────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(softwareSchema),
          }}
        />

        {/* ── Google Tag Manager ──────────────────────────────────────── */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PQDKCZQM');`,
          }}
        />
      </head>

      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}
      >
        {/* GTM noscript fallback — required for full GTM compliance */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PQDKCZQM"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* ── Layout Hierarchy ────────────────────────────────────────── */}
        <TopBar />
        <Navbar />
        <LeadPopup />

        <main className="pt-[120px]">
          {children}
        </main>

        <Footer />
        <WhatsAppButton />
        <Analytics />
      </body>
    </html>
  )
}