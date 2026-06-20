"use client";
import { useMemo, useState } from "react"
import {
  Check, Sparkles, Zap, Crown, ShoppingCart, ArrowRight,
  Star, Shield, Clock, TrendingUp, Bot,
  Plus, Minus, Flame,
} from "lucide-react"
/* ─────────────────────────────────────────────────────────────────── */
/*  DESIGN TOKENS                                                      */
/* ─────────────────────────────────────────────────────────────────── */
const T = {
  blue700:   "#1D4ED8",
  blue600:   "#2563EB",
  blue500:   "#3B82F6",
  blue400:   "#60A5FA",
  blue200:   "#BFDBFE",
  blue100:   "#DBEAFE",
  blue50:    "#EFF6FF",
  ink:       "#0F172A",
  body:      "#1E293B",
  muted:     "#64748B",
  faint:     "#94A3B8",
  divider:   "#E2E8F0",
  pageBg:    "#EEF4FF",
  cardBg:    "#FFFFFF",
  green500:  "#22C55E",
  green100:  "#DCFCE7",
  featBg:    "#EFF6FF",
  featBorder:"#2563EB",
  badgeBg:   "#0EA5E9",
}
const fmt = (n: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n)
/* ─────────────────────────────────────────────────────────────────── */
/*  WHATSAPP                                                           */
/* ─────────────────────────────────────────────────────────────────── */
export const WHATSAPP_URL = "https://wa.me/919460686266"
/* ─────────────────────────────────────────────────────────────────── */
/*  CALCULATOR CONFIG                                                  */
/* ─────────────────────────────────────────────────────────────────── */
export const GST_RATE = 0.18
export type DurationMonths = 3 | 6 | 12 | 24
type DurationOption = { months: DurationMonths; label: string; discount: number }
const DURATIONS: DurationOption[] = [
  { months: 3,  label: "3 mo",  discount: 0    },
  { months: 6,  label: "6 mo",  discount: 0.05 },
  { months: 12, label: "12 mo", discount: 0.10 },
  { months: 24, label: "24 mo", discount: 0.15 },
]
type Calc = {
  setup: number
  maintenanceGross: number
  discountAmount: number
  maintenanceNet: number
  gst: number
  total: number
  discountPct: number
}
function computeCalc(setup: number, monthly: number, months: DurationMonths): Calc {
  const opt = DURATIONS.find((d) => d.months === months)!
  const maintenanceGross = monthly * months
  const discountAmount   = maintenanceGross * opt.discount
  const maintenanceNet   = maintenanceGross - discountAmount
  const preGst           = setup + maintenanceNet
  const gst              = preGst * GST_RATE
  const total            = preGst + gst
  return {
    setup,
    maintenanceGross,
    discountAmount,
    maintenanceNet,
    gst,
    total,
    discountPct: opt.discount * 100,
  }
}
/* ─────────────────────────────────────────────────────────────────── */
/*  PLAN DATA                                                          */
/* ─────────────────────────────────────────────────────────────────── */
type Feat = { text: string; bold?: boolean }
type FixedPlan = {
  kind: "fixed"
  id: string
  name: string
  icon: typeof Sparkles
  tagline: string
  price: string
  period: string
  subtext: string
  cta: string
  href: string
  featured?: boolean
  badge?: string
  badgeColor?: string
  features: Feat[]
}
type CalcPlan = {
  kind: "calc"
  id: string
  name: string
  icon: typeof Sparkles
  tagline: string
  basePrice: string
  subtext: string
  setup: number
  monthly: number
  cta: string
  href: string
  featured?: boolean
  badge?: string
  badgeColor?: string
  features: Feat[]
}
type Plan = FixedPlan | CalcPlan
const PLANS: Plan[] = [
  {
    kind: "fixed",
    id: "pro-plus",
    name: "Pro Plus",
    icon: Bot,
    tagline: "LeadNest — WhatsApp lead engine",
    price: "₹49,000",
    period: "/year",
    subtext: "billed yearly · GST extra",
    cta: "Get started",
    href: WHATSAPP_URL,
    featured: true,
    badge: "MOST POPULAR",
    badgeColor: T.blue600,
    features: [
      { text: "WhatsApp AI lead qualification" },
      { text: "Lead capture from any source" },
      { text: "AI conversation & auto follow-up" },
      { text: "Appointment / demo / site-visit booking" },
      { text: "CRM integration" },
      { text: "Lead nurturing sequences" },
      { text: "Analytics & reports" },
      { text: "API integration" },
      { text: "Instant notifications" },
    ],
  },
  {
    kind: "calc",
    id: "foundation",
    name: "Foundation",
    icon: Zap,
    tagline: "Voice + WhatsApp, fully managed",
    basePrice: "Setup: ₹65,000 · Maintenance: ₹20,000/month · GST: 18%",
    subtext: "One-time setup + monthly maintenance · GST extra",
    setup: 65000,
    monthly: 20000,
    cta: "Get started",
    href: WHATSAPP_URL,
    badge: "BEST VALUE",
    badgeColor: "#F59E0B",
    features: [
      { text: "Everything in Pro Plus", bold: true },
      { text: "FirstVoice — AI receptionist" },
      { text: "CallOrbit — AI telecaller" },
      { text: "Custom AI training" },
      { text: "Dedicated account manager" },
      { text: "Priority support" },
      { text: "Multi-agent inbox" },
      { text: "Workflow builder" },
    ],
  },
  {
    kind: "calc",
    id: "ecommerce",
    name: "E-Commerce Automation",
    icon: ShoppingCart,
    tagline: "Order-to-delivery, on autopilot",
    basePrice: "Setup: ₹1,25,000 · Maintenance: ₹30,000/month · GST: 18%",
    subtext: "One-time setup + monthly maintenance · GST extra",
    setup: 125000,
    monthly: 30000,
    cta: "Get started",
    href: WHATSAPP_URL,
    features: [
      { text: "Everything in Foundation", bold: true },
      { text: "Order & shipping automation" },
      { text: "COD verification" },
      { text: "Abandoned cart recovery" },
      { text: "Order tracking & delivery updates" },
      { text: "Returns & refunds flow" },
      { text: "Upsell & cross-sell" },
      { text: "Review collection" },
      { text: "Customer support automation" },
      { text: "Loyalty automation" },
    ],
  },
  {
    kind: "fixed",
    id: "enterprise",
    name: "Enterprise",
    icon: Crown,
    tagline: "Custom AI automation, built around you",
    price: "Custom",
    period: "",
    subtext: "tailored scope & pricing",
    cta: "Request a quote",
    href: WHATSAPP_URL,
    features: [
      { text: "Multi-product, multi-location rollout" },
      { text: "Custom integrations & private models" },
      { text: "SLA-backed support" },
      { text: "Dedicated solution architect" },
    ],
  },
]
/* ─────────────────────────────────────────────────────────────────── */
/*  FAQ                                                                */
/* ─────────────────────────────────────────────────────────────────── */
const FAQ = [
  {
    q: "What does the setup fee cover?",
    a: "Discovery workshop, agent persona design, knowledge-base ingestion, channel provisioning (WhatsApp BSP, voice numbers), CRM/ERP connectors, and supervised go-live.",
  },
  {
    q: "Can I change my plan after starting?",
    a: "Yes. You can upgrade your plan or term at any time. We credit the unused portion of your current commitment toward the new one.",
  },
  {
    q: "Is GST included in the headline price?",
    a: "No. All prices are exclusive of 18% GST. The calculator breakdown shows setup, maintenance, discount, GST, and total payable so there are no surprises.",
  },
  {
    q: "What happens when my term ends?",
    a: "You can renew at the same tier, move to a longer term for bigger savings, or pause. No auto-lock-in.",
  },
  {
    q: "Do you offer refunds?",
    a: "We offer a 14-day satisfaction window after go-live. If the agent doesn't meet the agreed KPIs, we refund the unused monthly portion (setup is non-refundable).",
  },
]
/* ================================================================== */
/*  PAGE                                                               */
/* ================================================================== */
export default function PricingContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(0)
  return (
    <div style={{ background: T.pageBg, color: T.body }}>
      {/* HEADER */}
      <section className="px-6 pt-20 pb-10">
        <div className="mx-auto max-w-5xl text-center">
          <div
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold"
            style={{ background: T.blue100, color: T.blue700 }}
          >
            <Sparkles className="h-3.5 w-3.5" />
            Choose your automation stack
          </div>
          <h1 className="mt-6 text-4xl sm:text-5xl font-bold tracking-tight" style={{ color: T.ink }}>
            Simple, transparent pricing
            <br />
            <span style={{ color: T.blue600 }}>built for growth</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg" style={{ color: T.muted }}>
            All prices in INR. GST extra. Maintenance discounts apply on longer commitments.
          </p>
        </div>
      </section>
      {/* PLAN CARDS */}
      <section className="px-6 pb-16 pt-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 items-stretch">
            {PLANS.map((p) => (
              <PlanCard key={p.id} plan={p} />
            ))}
          </div>
          <p className="mt-8 text-center text-sm flex items-center justify-center gap-2" style={{ color: T.muted }}>
            <Shield className="h-4 w-4" />
            All plans include enterprise-grade security and 99.9% uptime SLA
          </p>
        </div>
      </section>
      {/* TRUST METRICS */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Shield,     title: "GST-compliant invoices", body: "Tax-ready billing every cycle." },
              { icon: Star,       title: "4.9 / 5 client rating",  body: "Avg. score across Indian SMBs." },
              { icon: Clock,      title: "Live in 14 days",        body: "Typical Foundation onboarding." },
              { icon: TrendingUp, title: "3.2× avg ROI",           body: "Reported within 90 days of go-live." },
            ].map((t, i) => {
              const Icon = t.icon
              return (
                <div
                  key={i}
                  className="rounded-2xl p-5"
                  style={{ background: T.cardBg, border: `1px solid ${T.divider}` }}
                >
                  <div
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg mb-3"
                    style={{ background: T.blue50, color: T.blue600 }}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="font-semibold text-sm" style={{ color: T.ink }}>{t.title}</p>
                  <p className="text-sm mt-1" style={{ color: T.muted }}>{t.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10" style={{ color: T.ink }}>
            Pricing questions, answered
          </h2>
          <div className="space-y-3">
            {FAQ.map((item, i) => {
              const open = openFaq === i
              return (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden"
                  style={{ background: T.cardBg, border: `1px solid ${T.divider}` }}
                >
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-semibold" style={{ color: T.ink }}>{item.q}</span>
                    <span
                      className="inline-flex h-7 w-7 items-center justify-center rounded-full shrink-0"
                      style={{ background: T.blue50, color: T.blue600 }}
                    >
                      {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </span>
                  </button>
                  {open && (
                    <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: T.muted }}>
                      {item.a}
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>
      {/* CTA BANNER */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-4xl">
          <div
            className="rounded-3xl p-10 text-center"
            style={{ background: T.blue600, color: "#fff" }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold">
              Foundation or E-Commerce — not sure which fits?
            </h3>
            <p className="mt-3 text-base opacity-90 max-w-2xl mx-auto">
              Book a free 20-minute call. We'll map your use-case to the right plan and term —
              no commitment, no pressure.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold"
                style={{ background: "#fff", color: T.blue700 }}
              >
                <Flame className="h-4 w-4" />
                Book pricing call
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold border"
                style={{ borderColor: "rgba(255,255,255,0.5)", color: "#fff" }}
              >
                <ArrowRight className="h-4 w-4" />
                Try live demo
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
/* ================================================================== */
/*  PLAN CARD — premium SaaS layout                                    */
/* ================================================================== */
/*
  Internal structure (top → bottom, every card):
    1. Badge slot           (fixed height — keeps headers aligned)
    2. Header               (icon + name + tagline, compact)
    3. Price block          (prominent — large numeric, clear cadence)
    4. Calculator (calc)    (compact, ~35% shorter than before)
    5. Divider
    6. Features (flex-1)    (scannable, even rhythm)
    7. CTA                  (anchored to bottom — consistent row)
*/
function PlanCard({ plan }: { plan: Plan }) {
  const Icon = plan.icon
  const featured = !!plan.featured
  return (
    <div
      className="relative rounded-2xl flex flex-col h-full"
      style={{
        background: T.cardBg,
        border: `1px solid ${featured ? T.featBorder : T.divider}`,
        boxShadow: featured
          ? "0 20px 40px -20px rgba(37,99,235,0.35)"
          : "0 1px 2px rgba(15,23,42,0.04)",
      }}
    >
      {/* Badge slot — reserved height so all card headers line up */}
      <div className="h-6 relative">
        {plan.badge && (
          <div
            className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[10px] font-bold tracking-wider whitespace-nowrap z-10 shadow-sm"
            style={{ background: plan.badgeColor ?? T.badgeBg, color: "#fff" }}
          >
            {plan.badge}
          </div>
        )}
      </div>
      <div className="px-6 pb-6 pt-2 flex flex-col flex-1">
        {/* Header */}
        <div className="flex items-center gap-3">
          <div
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl shrink-0"
            style={{ background: T.blue50, color: T.blue600 }}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold leading-tight" style={{ color: T.ink }}>
              {plan.name}
            </h3>
          </div>
        </div>
        <p className="mt-2 text-sm leading-snug min-h-[2.5rem]" style={{ color: T.muted }}>
          {plan.tagline}
        </p>
        {/* Price block — prominent */}
        <div className="mt-5">
          {plan.kind === "fixed" ? (
            <PriceFixed price={plan.price} period={plan.period} subtext={plan.subtext} />
          ) : (
            <PriceCalc setup={plan.setup} monthly={plan.monthly} subtext={plan.subtext} />
          )}
        </div>
        {/* Compact calculator (calc plans only) */}
        {plan.kind === "calc" && (
          <div className="mt-4">
            <Calculator setup={plan.setup} monthly={plan.monthly} />
          </div>
        )}
        {/* Divider */}
        <div className="mt-6 mb-5 h-px" style={{ background: T.divider }} />
        {/* Features — flex-1 to push CTA down on sparse cards */}
        <ul className="space-y-2.5 flex-1">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span
                className="mt-0.5 inline-flex h-[18px] w-[18px] items-center justify-center rounded-full shrink-0"
                style={{ background: T.green100, color: T.green500 }}
              >
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span
                className="text-[13.5px] leading-snug"
                style={{ color: T.body, fontWeight: f.bold ? 600 : 400 }}
              >
                {f.text}
              </span>
            </li>
          ))}
        </ul>
        {/* CTA — anchored at bottom */}
        <a
          href={plan.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition w-full hover:opacity-95"
          style={{
            background: featured ? T.blue600 : T.ink,
            color: "#fff",
            boxShadow: featured ? "0 8px 20px -8px rgba(37,99,235,0.55)" : "none",
          }}
        >
          {plan.cta}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}
/* ─── Price components ─────────────────────────────────────────────── */
function PriceFixed({
  price, period, subtext,
}: { price: string; period: string; subtext: string }) {
  return (
    <div>
      <div className="flex items-baseline gap-1.5 flex-wrap">
        <span
          className="font-bold tracking-tight leading-none"
          style={{ color: T.ink, fontSize: "2.5rem" }}
        >
          {price}
        </span>
        {period && (
          <span className="text-sm font-medium" style={{ color: T.muted }}>
            {period}
          </span>
        )}
      </div>
      <p className="mt-2 text-xs" style={{ color: T.faint }}>{subtext}</p>
    </div>
  )
}
function PriceCalc({
  setup, monthly, subtext,
}: { setup: number; monthly: number; subtext: string }) {
  return (
    <div>
      {/* Hero monthly price */}
      <div className="flex items-baseline gap-1.5 flex-wrap">
        <span
          className="font-bold tracking-tight leading-none"
          style={{ color: T.ink, fontSize: "2.5rem" }}
        >
          ₹{fmt(monthly)}
        </span>
        <span className="text-sm font-medium" style={{ color: T.muted }}>/month</span>
      </div>
      {/* Setup pill */}
      <div className="mt-2 flex items-center gap-2 flex-wrap">
        <span
          className="inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold"
          style={{ background: T.blue50, color: T.blue700 }}
        >
          + ₹{fmt(setup)} setup
        </span>
        <span className="text-[11px]" style={{ color: T.faint }}>GST extra</span>
      </div>
      <p className="mt-2 text-xs" style={{ color: T.faint }}>{subtext}</p>
    </div>
  )
}
/* ================================================================== */
/*  CALCULATOR — compact (≈35% shorter)                                */
/* ================================================================== */
function Calculator({ setup, monthly }: { setup: number; monthly: number }) {
  const [months, setMonths] = useState<DurationMonths>(6)
  const calc = useMemo(() => computeCalc(setup, monthly, months), [setup, monthly, months])
  return (
    <div
      className="rounded-xl p-3"
      style={{ background: T.featBg, border: `1px solid ${T.blue200}` }}
    >
      {/* Header row: label + savings */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold tracking-wider" style={{ color: T.blue700 }}>
          ESTIMATE TOTAL
        </span>
        {calc.discountPct > 0 && (
          <span
            className="text-[10px] font-bold px-1.5 py-0.5 rounded"
            style={{ background: T.green100, color: "#15803D" }}
          >
            SAVE {calc.discountPct}%
          </span>
        )}
      </div>
      {/* Duration segmented control */}
      <div
        className="grid grid-cols-4 gap-0.5 p-0.5 rounded-lg mb-2.5"
        style={{ background: T.cardBg, border: `1px solid ${T.blue200}` }}
      >
        {DURATIONS.map((d) => {
          const active = d.months === months
          return (
            <button
              key={d.months}
              onClick={() => setMonths(d.months)}
              className="py-1.5 rounded-md text-[11px] font-semibold transition"
              style={{
                background: active ? T.blue600 : "transparent",
                color:      active ? "#fff"    : T.muted,
              }}
            >
              {d.label}
            </button>
          )
        })}
      </div>
      {/* Compact summary: total hero + two micro-rows */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wide" style={{ color: T.muted }}>
            Total payable
          </p>
          <p className="text-xl font-bold leading-tight" style={{ color: T.blue700 }}>
            ₹{fmt(calc.total)}
          </p>
        </div>
        <div className="text-right text-[10.5px] leading-tight" style={{ color: T.muted }}>
          <div>Setup ₹{fmt(calc.setup)}</div>
          <div>
            +{months}mo ₹{fmt(calc.maintenanceNet)}
          </div>
          <div>+GST ₹{fmt(calc.gst)}</div>
        </div>
      </div>
    </div>
  )
}
