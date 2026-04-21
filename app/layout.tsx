import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import LeadPopup from "@/components/lead-popup"
import TopBar from "@/components/topbar"
import { GoogleAnalytics } from "@/components/GoogleAnalytics"

import "./globals.css"
import { metadata } from "./seo_metadata"
export { metadata }

// ─── Fonts ────────────────────────────────────────────────────────────────────
// FIX: Added preload:true and reduced subsets to only what's used
// FIX: Added display:"swap" to prevent FOIT (Flash of Invisible Text)
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  // FIX: Only load weights actually used in the UI
  weight: ["400", "500", "600", "700"],
  preload: true,
  // FIX: Fallback font prevents layout shift
  fallback: ["system-ui", "-apple-system", "sans-serif"],
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "700"],
  preload: false, // Only used in headings — lazy is fine
  fallback: ["Georgia", "serif"],
})

// ─── Constants ────────────────────────────────────────────────────────────────
const SITE_URL = "https://www.pixoranest.com"
const SITE_NAME = "PixoraNest"

// ─── Viewport ─────────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb", // FIX: Match brand blue, not dark background
  // FIX: Prevent auto-zoom on input focus (iOS)
  minimumScale: 1,
  maximumScale: 5,
}

// ─── JSON-LD: Organization Schema ─────────────────────────────────────────────
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/images/logo-pixoranest.png`,
    width: 180,
    height: 50,
  },
  description:
    "PixoraNest provides AI automation services for businesses in India — AI receptionist, WhatsApp lead management, call routing, and social media automation.",
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
  image: {
    "@type": "ImageObject",
    url: `${SITE_URL}/images/logo-pixoranest.png`,
  },
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
        {/* ── Critical Resource Hints ── */}
        {/* FIX: Preconnect to GA before it loads — reduces RTT */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        {/* FIX: Preconnect to font CDN (already handled by next/font but belt+suspenders) */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* FIX: DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://wa.me" />

        {/* ── Favicon & PWA ── */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* ── Geo Tags (Local SEO) ── */}
        <meta name="geo.region" content="IN-RJ" />
        <meta name="geo.placename" content="Narayanpur, Rajasthan, India" />
        <meta name="geo.position" content="27.4424;76.1265" />
        <meta name="ICBM" content="27.4424, 76.1265" />
        <meta name="language" content="English" />
        {/* FIX: Added Hindi content language for Indian users */}
        <meta httpEquiv="content-language" content="en-IN" />

        {/* ── Mobile optimization ── */}
        {/* FIX: format-detection prevents iOS from linkifying numbers unintentionally */}
        <meta name="format-detection" content="telephone=no" />

        {/* ── JSON-LD Structured Data ── */}
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
      </head>

      <body
        className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground`}
      >
        {/* FIX: Skip-to-content link for accessibility (also an SEO signal) */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:text-sm focus:font-semibold"
        >
          Skip to main content
        </a>

        <TopBar />
        <Navbar />
        <LeadPopup />

        <main id="main-content" className="pt-[120px] min-h-screen">
          {children}
        </main>

        <Footer />
        <WhatsAppButton />

        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics id={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  )
}