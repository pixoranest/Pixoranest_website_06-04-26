import type { Metadata, Viewport } from "next"
import { Inter, Playfair_Display } from "next/font/google"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { WhatsAppButton } from "@/components/whatsapp-button"
import LeadPopup from "@/components/lead-popup"
import TopBar from "@/components/topbar"
import { GoogleAnalytics } from "@/components/GoogleAnalytics"
import Script from "next/script"
import "./globals.css"

import { metadata as homeMetadata } from "./seo_metadata"

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pixoranest.com"),
  ...homeMetadata,
}

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
  fallback: ["system-ui", "-apple-system", "sans-serif"],
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "700"],
  preload: false,
  fallback: ["Georgia", "serif"],
})

const SITE_URL = "https://www.pixoranest.com"
const SITE_NAME = "PixoraNest"

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563eb",
  minimumScale: 1,
  maximumScale: 5,
}

// ─── JSON-LD: Organization Schema ─────────────────────────────────────────────
// CANONICAL definition — all other pages reference this via @id only.
// Do NOT repeat Organization in any other page file.
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  alternateName: "Pixora Nest",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#logo`,
    url: `${SITE_URL}/images/logo-pixoranest.png`,
    width: 180,
    height: 50,
    caption: SITE_NAME,
  },
  description:
    "PixoraNest provides AI automation services for businesses in India — AI receptionist, WhatsApp lead management, call routing, and social media automation.",
  foundingDate: "2024",
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 15,
    maxValue: 25,
  },
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "State", name: "Rajasthan" },
    { "@type": "City", name: "Jaipur" },
    { "@type": "City", name: "Alwar" },
    { "@type": "City", name: "Narayanpur" },
  ],
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
  knowsAbout: [
    "AI Automation",
    "WhatsApp Business API",
    "AI Receptionist",
    "CRM Automation",
    "Lead Management",
    "Call Routing",
    "Social Media Automation",
  ],
  sameAs: [
    "https://www.linkedin.com/company/pixoranest",
    "https://twitter.com/pixoranest",
    "https://www.instagram.com/pixoranest",
    "https://www.facebook.com/pixoranest2025",
    "https://www.youtube.com/@pixora-nest",
  ],
}

// ─── JSON-LD: LocalBusiness Schema ────────────────────────────────────────────
// Separate node from Organization — do NOT combine @type arrays
// across incompatible types (LocalBusiness + SoftwareApplication is invalid).
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "ProfessionalService"],
  "@id": `${SITE_URL}/#localbusiness`,
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
  currenciesAccepted: "INR",
  paymentAccepted: "Online payment",
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
    latitude: 27.4424,
    longitude: 76.1265,
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
  parentOrganization: { "@id": `${SITE_URL}/#organization` },
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
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  description:
    "AI Automation Services for Businesses in India — AI Receptionist, WhatsApp Lead Management, Call Routing & Social Media Automation.",
  inLanguage: "en-IN",
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
}

// NOTE: SoftwareApplication schema has been moved to customer-stories/page.tsx
// where reviews are actually displayed. It does NOT belong in the global layout
// because it has product-specific aggregateRating data.

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://wa.me" />

        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        <meta name="geo.region" content="IN-RJ" />
        <meta name="geo.placename" content="Narayanpur, Rajasthan, India" />
        <meta name="geo.position" content="27.4424;76.1265" />
        <meta name="ICBM" content="27.4424, 76.1265" />
        <meta name="language" content="English" />
        <meta httpEquiv="content-language" content="en-IN" />
        <meta name="format-detection" content="telephone=no" />

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
        {/* FIX: Restored missing opening <a tag — was accidentally dropped */}
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

        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics id={process.env.NEXT_PUBLIC_GA_ID} />
        )}

        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PQDKCZQM"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
      </body>
    </html>
  )
}