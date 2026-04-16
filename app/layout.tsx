import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import LeadPopup from "@/components/lead-popup"
import TopBar from "@/components/topbar"
import { GoogleAnalytics } from "@/components/GoogleAnalytics"

// FIX: Removed @vercel/analytics import.
// @vercel/analytics injects a script that phones home to Vercel's edge network.
// On Hostinger static hosting (no Vercel), this import does NOT crash the build,
// but the <Analytics /> component injects a script tag pointing to
// /_vercel/insights/script.js — which returns 404 on Hostinger → console errors.
// If you need analytics on Hostinger, use Google Analytics (already wired up
// via GoogleAnalytics component + NEXT_PUBLIC_GA_ID env var) or Plausible/Fathom.

import "./globals.css"
import { metadata } from "./seo_metadata"
export { metadata }

// ─── Fonts ────────────────────────────────────────────────────────────────────
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

// ─── Constants ────────────────────────────────────────────────────────────────
const SITE_URL = "https://www.pixoranest.com"
const SITE_NAME = "PixoraNest"

// ─── Viewport ─────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
}

// ─── JSON-LD: Organization Schema ─────────────────────────────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "PixoraNest provides AI automation services for businesses in India including AI receptionist, WhatsApp lead management, call routing, and social media automation.",
  foundingDate: "2024",
  areaServed: { "@type": "Country", name: "India" },
  address: {
    "@type": "PostalAddress",
    streetAddress: "1st Floor, near Tehsil Bhawan, Narayanpur",
    addressLocality: "Narayanpur",
    addressRegion: "Rajasthan",
    postalCode: "301024",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-94606-86266",
    email: "info@pixoranest.com",
    contactType: "customer support",
    availableLanguage: ["English", "Hindi"],
    areaServed: "IN",
  },
  sameAs: [
    "https://www.linkedin.com/company/pixoranest",
    "https://twitter.com/pixoranest",
    "https://www.instagram.com/pixoranest",
    "https://www.facebook.com/pixoranest2025",
    "https://www.youtube.com/@pixora-nest",
  ],
}

// ─── JSON-LD: LocalBusiness Schema ────────────────────────────────────────────
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  name: SITE_NAME,
  url: SITE_URL,
  telephone: "+91-94606-86266",
  email: "info@pixoranest.com",
  image: `${SITE_URL}/logo.png`,
  description:
    "AI automation agency in Rajasthan, India — offering AI receptionist, WhatsApp lead management, call routing, and business automation for Indian SMEs.",
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1st Floor, near Tehsil Bhawan, Narayanpur",
    addressLocality: "Narayanpur",
    addressRegion: "Rajasthan",
    postalCode: "301024",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "27.4424",
    longitude: "76.1265",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "State", name: "Rajasthan" },
  ],
  hasMap: "https://maps.google.com/?q=Narayanpur+Rajasthan+India",
  sameAs: [
    "https://www.linkedin.com/company/pixoranest",
    "https://twitter.com/pixoranest",
    "https://www.instagram.com/pixoranest",
    "https://www.youtube.com/@pixora-nest",
  ],
}

// ─── JSON-LD: WebSite Schema ──────────────────────────────────────────────────
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "AI Automation Services for Businesses in India — AI Receptionist, WhatsApp Lead Management, Call Routing & Social Media Automation.",
  inLanguage: "en-IN",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
}

// ─── JSON-LD: SoftwareApplication Schema ──────────────────────────────────────
const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "PixoraNest AI Automation Platform",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  url: SITE_URL,
  description:
    "AI-powered automation platform for Indian businesses — AI receptionist, WhatsApp CRM, smart call routing, and social media management.",
  offers: {
    "@type": "Offer",
    priceCurrency: "INR",
    availability: "https://schema.org/InStock",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "120",
    bestRating: "5",
    worstRating: "1",
  },
}

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        {/* Geo Tags */}
        <meta name="geo.region" content="IN-RJ" />
        <meta name="geo.placename" content="Narayanpur, Rajasthan, India" />
        <meta name="geo.position" content="27.4424;76.1265" />
        <meta name="ICBM" content="27.4424, 76.1265" />
        <meta name="language" content="English" />

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
        />

        {/* Preconnect */}
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>

      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}
      >
        <TopBar />
        <Navbar />
        <LeadPopup />

        {/*
          No <Suspense> wrapper here.
          With output:"export", all pages are pre-rendered to static HTML at
          build time. Suspense serves no purpose and causes RSC payload (.txt)
          requests at runtime on static hosting → 404s.
        */}
        <main className="pt-[120px] min-h-screen">
          {children}
        </main>

        <Footer />
        <WhatsAppButton />

        {/* Google Analytics — NEXT_PUBLIC_ vars are inlined at build time */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics id={process.env.NEXT_PUBLIC_GA_ID} />
        )}

        {/*
          NOTE: @vercel/analytics <Analytics /> component has been removed.
          It requests /_vercel/insights/script.js which 404s on Hostinger.
          Google Analytics above handles all tracking needs.
        */}
      </body>
    </html>
  )
}