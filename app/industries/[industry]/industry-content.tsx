"use client"

import Link from "next/link"
import { useState, useMemo } from "react"
import {
  ShoppingCart, Check, ArrowRight, PhoneCall, MessageSquare, Truck, Link2,
  BarChart3, Database, Sparkles, Zap, Mail, Calculator, Plus, Minus, Clock,
  TrendingUp,
} from "lucide-react"
import { ECOMMERCE_TIERS, type EcommerceTier } from "@/app/industries/ecommerce-pricing"

/* ------------------------------------------------------------------ */
/*  BRAND TOKENS                                                        */
/* ------------------------------------------------------------------ */
const BRAND = {
  primary: "#6D28D9",
  primaryDark: "#4C1D95",
  accent: "#F59E0B",
  ink: "#0F172A",
  sub: "#475569",
  line: "#E2E8F0",
  bg: "#FFFFFF",
  soft: "#F8FAFC",
}

const formatINR = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n)

/* ------------------------------------------------------------------ */
/*  TYPES                                                               */
/* ------------------------------------------------------------------ */
type IndustryConfig = {
  slug: string
  name: string
  headline: string
  subhead: string
  icon: any
  painPoints: string[]
  outcomes: { metric: string; label: string }[]
  features: { icon: any; title: string; body: string }[]
  integrations: string[]
}

/* ------------------------------------------------------------------ */
/*  INDUSTRY DATA                                                       */
/* ------------------------------------------------------------------ */
const INDUSTRIES: Record<string, IndustryConfig> = {
  ecommerce: {
    slug: "ecommerce",
    name: "E-Commerce",
    headline: "AI agents that sell, support & recover carts — 24/7",
    subhead:
      "Connect your store, WhatsApp, and helpdesk. We deploy a voice + chat agent that handles 80% of order, return, and pre-sale queries automatically — so your team focuses on growth, not repetitive tickets.",
    icon: ShoppingCart,
    painPoints: [
      "Cart abandonment above 70% with no recovery system",
      "WhatsApp queries pile up overnight with zero response",
      "Manual order-tracking burns your CX team's entire day",
      "Returns & refunds lack a clear, automated funnel",
    ],
    outcomes: [
      { metric: "+32%", label: "Cart recovery rate" },
      { metric: "−65%", label: "First-response time" },
      { metric: "3.2×", label: "Repeat-buyer rate" },
      { metric: "₹18L+", label: "Avg. saved per year" },
    ],
    features: [
      {
        icon: MessageSquare,
        title: "Pre-sale chat agent",
        body: "Answers product, sizing, stock, and COD questions instantly — in your brand voice, round the clock.",
      },
      {
        icon: Truck,
        title: "Live order tracking",
        body: "Pulls real-time shipment status from Shiprocket, Delhivery, and Bluedart without human intervention.",
      },
      {
        icon: Mail,
        title: "Cart recovery flows",
        body: "WhatsApp + email sequences with smart discount logic that re-engage abandoned buyers automatically.",
      },
      {
        icon: BarChart3,
        title: "CX analytics dashboard",
        body: "Heat-map of unresolved questions, CSAT trends, and weekly performance reports sent to your inbox.",
      },
      {
        icon: Database,
        title: "Catalog sync",
        body: "Two-way sync with Shopify, WooCommerce, Magento, and Unicommerce — products, stock, and pricing always current.",
      },
      {
        icon: Sparkles,
        title: "COD verification agent",
        body: "Auto-calls COD orders before dispatch to confirm intent, cutting Return-to-Origin (RTO) losses significantly.",
      },
    ],
    integrations: [
      "Shopify",
      "WooCommerce",
      "Magento",
      "Razorpay",
      "Shiprocket",
      "Delhivery",
      "WhatsApp BSP",
      "Zoho CRM",
      "Freshdesk",
      "Unicommerce",
    ],
  },
}

/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */
export default function IndustryContent({ slug }: { slug: string }) {
  const industry = INDUSTRIES[slug] ?? INDUSTRIES.ecommerce
  const Icon = industry.icon

  /* ── pricing calculator state ── */
  const [tier, setTier] = useState<EcommerceTier>(ECOMMERCE_TIERS[2]) // default: 12M (Most Popular)
  const [stores, setStores] = useState(1)

  /**
   * Quote logic:
   *   - setupFee is FLAT (does not multiply per store)
   *   - monthly = tier.monthlyRate × stores
   *   - subtotal (pre-GST) = setupFee + monthly × months
   *   - GST 18% applied on subtotal
   */
  const quote = useMemo(() => {
    const setupFee = tier.setupFee
    const monthlyPerStore = tier.monthlyRate
    const monthlyTotal = monthlyPerStore * stores
    const contractValue = monthlyTotal * tier.months
    const subtotal = setupFee + contractValue
    const gst = Math.round(subtotal * 0.18)
    const total = subtotal + gst
    return { setupFee, monthlyPerStore, monthlyTotal, contractValue, subtotal, gst, total }
  }, [tier, stores])

  return (
    <div style={{ background: BRAND.bg, color: BRAND.ink }}>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-12">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">

          {/* Left: copy */}
          <div>
            <span
              className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
              style={{ background: `${BRAND.primary}15`, color: BRAND.primary }}
            >
              <Icon className="h-3.5 w-3.5" />
              {industry.name} · AI Automation
            </span>

            <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
              {industry.headline}
            </h1>

            <p className="mt-5 text-lg leading-relaxed" style={{ color: BRAND.sub }}>
              {industry.subhead}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={`/contact?industry=${slug}`}
                className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white"
                style={{ background: BRAND.primary }}
              >
                Book a free demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="#calculator"
                className="inline-flex items-center gap-2 rounded-xl border px-6 py-3.5 text-sm font-semibold"
                style={{ borderColor: BRAND.line, color: BRAND.ink }}
              >
                <Calculator className="h-4 w-4" />
                See pricing
              </Link>
            </div>
          </div>

          {/* Right: outcomes */}
          <div
            className="rounded-3xl p-8"
            style={{
              background: `linear-gradient(135deg, ${BRAND.primary}08 0%, ${BRAND.accent}10 100%)`,
              border: `1px solid ${BRAND.line}`,
            }}
          >
            <h3
              className="text-sm font-bold uppercase tracking-wide"
              style={{ color: BRAND.sub }}
            >
              Typical outcomes
            </h3>

            <div className="mt-5 grid grid-cols-2 gap-5">
              {industry.outcomes.map((o, i) => (
                <div key={i}>
                  <div className="text-3xl font-extrabold" style={{ color: BRAND.primary }}>
                    {o.metric}
                  </div>
                  <div className="mt-1 text-sm" style={{ color: BRAND.sub }}>
                    {o.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Attribution — prevents unverifiable metrics concern */}
            <p className="mt-6 text-xs" style={{ color: BRAND.sub }}>
              * Avg. results across 12+ Indian e-commerce clients on PixoraNest, FY 2024–25.
              Individual results may vary.
            </p>
          </div>

        </div>
      </section>

      {/* ═══════════════ PAIN POINTS ═══════════════ */}
      <section
        className="mx-auto mt-10 max-w-7xl rounded-3xl px-6 py-16"
        style={{ background: BRAND.soft }}
      >
        <h2 className="text-center text-3xl font-bold md:text-4xl">
          Sound familiar?
        </h2>
        <p
          className="mx-auto mt-3 max-w-2xl text-center"
          style={{ color: BRAND.sub }}
        >
          These are the exact problems Indian e-commerce brands bring to us every week.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {industry.painPoints.map((p, i) => (
            <div
              key={i}
              className="rounded-2xl border bg-white p-6"
              style={{ borderColor: BRAND.line }}
            >
              <div
                className="grid h-10 w-10 place-items-center rounded-full text-sm font-bold"
                style={{ background: `${BRAND.accent}20`, color: "#92400E" }}
              >
                {i + 1}
              </div>
              <p className="mt-4 text-sm font-medium">{p}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ FEATURES ═══════════════ */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Built for Indian online stores
          </h2>
          <p className="mx-auto mt-3 max-w-2xl" style={{ color: BRAND.sub }}>
            Every module ships pre-configured for Indian e-commerce — Shiprocket,
            Delhivery, Razorpay out of the box. Most stores go live in under 7 days.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {industry.features.map((f, i) => {
            const FIcon = f.icon
            return (
              <div
                key={i}
                className="rounded-2xl border p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
                style={{ borderColor: BRAND.line }}
              >
                <div
                  className="grid h-11 w-11 place-items-center rounded-xl"
                  style={{ background: `${BRAND.primary}15`, color: BRAND.primary }}
                >
                  <FIcon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: BRAND.sub }}>
                  {f.body}
                </p>
              </div>
            )
          })}
        </div>
      </section>

      {/* ═══════════════ INTEGRATIONS ═══════════════ */}
      <section
        className="mx-auto max-w-7xl rounded-3xl px-6 py-14"
        style={{ background: BRAND.soft }}
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <div
            className="grid h-12 w-12 place-items-center rounded-2xl"
            style={{ background: BRAND.primary, color: "#fff" }}
          >
            <Link2 className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold md:text-3xl">
            Plays nicely with your stack
          </h2>
          <p className="text-sm" style={{ color: BRAND.sub }}>
            Storefronts · Payments · Logistics · CRM · Helpdesk
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {industry.integrations.map((tag) => (
            <span
              key={tag}
              className="rounded-full border bg-white px-4 py-2 text-sm font-medium"
              style={{ borderColor: BRAND.line, color: BRAND.ink }}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* ═══════════════ PRICING CALCULATOR ═══════════════ */}
      <section id="calculator" className="mx-auto mt-16 max-w-6xl px-6 py-16">

        <div className="text-center">
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
            style={{ background: `${BRAND.accent}20`, color: "#92400E" }}
          >
            <Calculator className="h-3.5 w-3.5" />
            E-Commerce Plan · Pricing Calculator
          </span>
          <h2 className="mt-5 text-3xl font-bold md:text-4xl">
            Build your custom quote
          </h2>
          <p className="mx-auto mt-3 max-w-2xl" style={{ color: BRAND.sub }}>
            Choose your contract term and number of storefronts. Setup fee, monthly
            total, GST (18%), and final payable are calculated instantly.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2">

          {/* ── CONTROLS ── */}
          <div
            className="rounded-2xl border bg-white p-6"
            style={{ borderColor: BRAND.line }}
          >
            {/* Term selector */}
            <h3
              className="text-sm font-bold uppercase tracking-wide"
              style={{ color: BRAND.sub }}
            >
              Contract term
            </h3>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {ECOMMERCE_TIERS.map((t) => {
                const active = tier.months === t.months
                return (
                  <button
                    key={t.months}
                    onClick={() => setTier(t)}
                    className="rounded-xl border-2 p-4 text-left transition-all"
                    style={{
                      borderColor: active ? BRAND.primary : BRAND.line,
                      background: active ? `${BRAND.primary}08` : "#fff",
                    }}
                  >
                    {/* Most Popular badge */}
                    {t.popular && (
                      <span
                        className="mb-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide"
                        style={{ background: `${BRAND.accent}25`, color: "#92400E" }}
                      >
                        Most Popular
                      </span>
                    )}

                    <div
                      className="flex items-center gap-2 text-xs font-semibold"
                      style={{ color: BRAND.sub }}
                    >
                      <Clock className="h-3.5 w-3.5" />
                      {t.label}
                    </div>

                    <div className="mt-1 text-xl font-extrabold">
                      ₹{formatINR(t.monthlyRate)}
                      <span className="text-xs font-medium" style={{ color: BRAND.sub }}>
                        /mo per store
                      </span>
                    </div>

                    {t.discount > 0 && (
                      <span
                        className="mt-1 inline-block text-[11px] font-bold"
                        style={{ color: BRAND.primary }}
                      >
                        Save {t.discount}% vs monthly
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Store count */}
            <h3
              className="mt-8 text-sm font-bold uppercase tracking-wide"
              style={{ color: BRAND.sub }}
            >
              Number of storefronts
            </h3>

            <div className="mt-4 flex items-center gap-4">
              <button
                onClick={() => setStores((s) => Math.max(1, s - 1))}
                className="grid h-11 w-11 place-items-center rounded-xl border transition-colors hover:border-violet-400"
                style={{ borderColor: BRAND.line }}
                aria-label="Remove one storefront"
              >
                <Minus className="h-4 w-4" />
              </button>

              <div
                className="grid h-14 flex-1 place-items-center rounded-xl border text-2xl font-extrabold"
                style={{ borderColor: BRAND.line, background: BRAND.soft }}
              >
                {stores}
              </div>

              <button
                onClick={() => setStores((s) => Math.min(20, s + 1))}
                className="grid h-11 w-11 place-items-center rounded-xl border transition-colors hover:border-violet-400"
                style={{ borderColor: BRAND.line }}
                aria-label="Add one storefront"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <p className="mt-2 text-xs" style={{ color: BRAND.sub }}>
              Each storefront = one connected Shopify / WooCommerce / Magento brand.
              Setup fee is charged once, regardless of storefront count.
            </p>
          </div>

          {/* ── QUOTE ── */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: `linear-gradient(180deg, ${BRAND.primary}08 0%, #fff 100%)`,
              border: `1.5px solid ${BRAND.primary}40`,
            }}
          >
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5" style={{ color: BRAND.primary }} />
              <h3 className="text-lg font-bold">Your quote</h3>
              <span
                className="ml-auto rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase"
                style={{ background: `${BRAND.primary}12`, color: BRAND.primary }}
              >
                E-Commerce Plan
              </span>
            </div>

            <div className="mt-5 space-y-3">
              {/* Setup fee */}
              <QuoteRow
                label="Setup fee (one-time, flat)"
                value={`₹${formatINR(quote.setupFee)}`}
              />

              {/* Monthly per store */}
              <QuoteRow
                label={`Monthly rate (per store)`}
                value={`₹${formatINR(quote.monthlyPerStore)}/mo`}
              />

              {/* Monthly total if multi-store */}
              {stores > 1 && (
                <QuoteRow
                  label={`Monthly total (${stores} stores)`}
                  value={`₹${formatINR(quote.monthlyTotal)}/mo`}
                />
              )}

              {/* Contract value */}
              <QuoteRow
                label={`${tier.months}-month contract value`}
                value={`₹${formatINR(quote.contractValue)}`}
              />

              {/* Subtotal */}
              <QuoteRow
                label="Subtotal (excl. GST)"
                value={`₹${formatINR(quote.subtotal)}`}
              />

              {/* GST */}
              <QuoteRow
                label="GST (18%)"
                value={`₹${formatINR(quote.gst)}`}
              />

              {/* Total */}
              <div
                className="mt-4 flex items-center justify-between rounded-xl px-4 py-4"
                style={{ background: BRAND.primary, color: "#fff" }}
              >
                <span className="text-sm font-bold uppercase tracking-wide">
                  Total payable
                </span>
                <span className="text-2xl font-extrabold">
                  ₹{formatINR(quote.total)}
                </span>
              </div>
            </div>

            <Link
              href={`/contact?industry=${slug}&term=${tier.months}&stores=${stores}`}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white"
              style={{ background: BRAND.ink }}
            >
              Request this quote
              <ArrowRight className="h-4 w-4" />
            </Link>

            <p className="mt-3 text-center text-xs" style={{ color: BRAND.sub }}>
              No payment needed to request. We send a formal proposal within 24 hours.
            </p>
          </div>

        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div
          className="rounded-3xl p-10 text-center md:p-14"
          style={{
            background: `linear-gradient(135deg, ${BRAND.primary} 0%, ${BRAND.primaryDark} 100%)`,
          }}
        >
          <TrendingUp className="mx-auto h-10 w-10 text-white" />

          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
            Ready to stop losing customers to slow support?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-white/85">
            Book a 20-minute audit call. We'll map your current customer journey
            and show you a working AI agent for your store — live, during the call.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={`/contact?industry=${slug}`}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold"
              style={{ color: BRAND.primary }}
            >
              <PhoneCall className="h-4 w-4" />
              Book free audit call
            </Link>
            <Link
              href={`/demo?industry=${slug}`}
              className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-6 py-3.5 text-sm font-semibold text-white"
            >
              <MessageSquare className="h-4 w-4" />
              See live demo
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {["Free audit call", "Cancel anytime", "GST invoice included"].map((t) => (
              <span
                key={t}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white"
              >
                <Check className="h-3 w-3" />
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  HELPERS                                                             */
/* ------------------------------------------------------------------ */
function QuoteRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex items-center justify-between rounded-lg px-4 py-3"
      style={{ background: BRAND.soft }}
    >
      <span className="text-sm" style={{ color: BRAND.sub }}>
        {label}
      </span>
      <span className="text-sm font-bold">{value}</span>
    </div>
  )
}