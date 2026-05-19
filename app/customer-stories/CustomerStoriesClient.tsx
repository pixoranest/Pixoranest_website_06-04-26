"use client";

import { useState } from "react";
import {
  ArrowRight,
  Check,
  X,
  Building2,
  HeartPulse,
  GraduationCap,
  ShoppingBag,
  Landmark,
  Zap,
  Clock,
  PhoneCall,
  Users,
  TrendingUp,
  Wallet,
  Quote,
  Sparkles,
  MessageSquare,
  BrainCircuit,
  Database,
} from "lucide-react";
import CustomerStoriesHero from "./CustomerStoriesHero";

/* ------------------------------------------------------------------ */
/* Shared brand primitives                                            */
/* ------------------------------------------------------------------ */

const SectionHeader = ({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
}) => (
  <div className="mx-auto max-w-2xl text-center">
    <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
      <Sparkles className="h-3.5 w-3.5" />
      {eyebrow}
    </span>
    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-3 text-base leading-relaxed text-slate-600">{subtitle}</p>
    )}
  </div>
);

/* ------------------------------------------------------------------ */
/* 1. Featured Stories                                                */
/* ------------------------------------------------------------------ */

type Story = {
  industry: string;
  industryIcon: React.ComponentType<{ className?: string }>;
  automation: string;
  metric: string;
  metricLabel: string;
  headline: string;
  summary: string;
  before: string;
  after: string;
  company: string;
};

const stories: Story[] = [
  {
    industry: "Real Estate",
    industryIcon: Building2,
    automation: "WhatsApp Lead Automation",
    metric: "3.2×",
    metricLabel: "more qualified leads",
    headline: "Every property enquiry answered in seconds",
    summary:
      "AI handles enquiries, qualifies buyers and books site visits 24/7 — no missed leads on weekends.",
    before: "60% of WhatsApp enquiries went cold after hours",
    after: "100% replied within 30 seconds, day or night",
    company: "Leading Mumbai developer · 220+ units / yr",
  },
  {
    industry: "Healthcare",
    industryIcon: HeartPulse,
    automation: "AI Voice Agent",
    metric: "82%",
    metricLabel: "fewer missed appointments",
    headline: "Front-desk that never puts a patient on hold",
    summary:
      "Voice AI books, reschedules and confirms appointments across clinics — staff focus on in-person care.",
    before: "1 in 3 calls dropped during peak hours",
    after: "Average pickup time under 4 seconds",
    company: "Multi-specialty clinic · 9 locations",
  },
  {
    industry: "Education",
    industryIcon: GraduationCap,
    automation: "CRM + Follow-up Automation",
    metric: "+47%",
    metricLabel: "admission conversions",
    headline: "From first enquiry to enrolled, on autopilot",
    summary:
      "Personalised follow-ups, document reminders and counsellor handoffs run automatically across the funnel.",
    before: "Manual follow-ups took 3–5 days per lead",
    after: "Same-day nurture sequences with full CRM sync",
    company: "Ed-tech institute · 12k applicants / intake",
  },
];

const FeaturedStoriesSection = () => (
  <section className="bg-white py-20 sm:py-24">
    <div className="mx-auto max-w-6xl px-6">
      <SectionHeader
        eyebrow="Customer Outcomes"
        title="Real results from real teams"
        subtitle="A snapshot of how Indian businesses are scaling sales and operations with PixoraNest automation."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {stories.map((s) => {
          const Icon = s.industryIcon;
          return (
            <article
              key={s.headline}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
            >
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                  <Icon className="h-3.5 w-3.5" />
                  {s.industry}
                </span>
                <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                  {s.automation}
                </span>
              </div>

              <div className="mt-6">
                <div className="text-5xl font-semibold tracking-tight text-blue-600">
                  {s.metric}
                </div>
                <div className="mt-1 text-sm font-medium text-slate-500">
                  {s.metricLabel}
                </div>
              </div>

              <h3 className="mt-6 text-lg font-semibold leading-snug text-slate-900">
                {s.headline}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">
                {s.summary}
              </p>

              <div className="mt-6 space-y-2 border-t border-slate-100 pt-5">
                <div className="flex items-start gap-2 text-xs text-slate-500">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-slate-400" />
                  <span>
                    <span className="font-medium text-slate-700">Before:</span>{" "}
                    {s.before}
                  </span>
                </div>
                <div className="flex items-start gap-2 text-xs text-slate-600">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                  <span>
                    <span className="font-medium text-slate-900">After:</span>{" "}
                    {s.after}
                  </span>
                </div>
              </div>

              <div className="mt-6 text-xs font-medium text-slate-500">
                {s.company}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/* 2. Testimonials                                                    */
/* ------------------------------------------------------------------ */

const testimonials = [
  {
    quote:
      "PixoraNest replaced three different tools and a part-time ops hire. Our WhatsApp leads are now answered before our competitors even see them.",
    name: "Rohit Mehta",
    role: "Head of Sales",
    company: "Skyline Realty, Mumbai",
    initials: "RM",
  },
  {
    quote:
      "The AI voice agent handles 70% of patient calls on its own. Our front desk finally has time to actually take care of patients in the clinic.",
    name: "Dr. Anjali Sharma",
    role: "Clinic Director",
    company: "Wellspring Medical, Bengaluru",
    initials: "AS",
  },
];

const TestimonialsSection = () => (
  <section className="bg-slate-50/60 py-20 sm:py-24">
    <div className="mx-auto max-w-6xl px-6">
      <SectionHeader
        eyebrow="What teams are saying"
        title="Trusted by operators, not just buyers"
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="relative flex flex-col rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10"
          >
            <Quote className="absolute right-8 top-8 h-10 w-10 text-blue-100" />
            <blockquote className="text-lg leading-relaxed text-slate-800 sm:text-xl">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4 border-t border-slate-100 pt-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                {t.initials}
              </div>
              <div>
                <div className="text-sm font-semibold text-slate-900">
                  {t.name}
                </div>
                <div className="text-xs text-slate-500">
                  {t.role} · {t.company}
                </div>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/* 3. Industry Tabs                                                   */
/* ------------------------------------------------------------------ */

type Industry = {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  challenge: string;
  outcome: string;
  description: string;
  workflow: { icon: React.ComponentType<{ className?: string }>; label: string }[];
};

const industries: Industry[] = [
  {
    key: "real-estate",
    label: "Real Estate",
    icon: Building2,
    challenge: "Property enquiries go cold within minutes",
    outcome: "3.2× more qualified site visits",
    description:
      "PixoraNest replies on WhatsApp instantly, qualifies the buyer's budget and location, and books a site visit straight into your CRM.",
    workflow: [
      { icon: MessageSquare, label: "WhatsApp enquiry" },
      { icon: BrainCircuit, label: "AI qualifies buyer" },
      { icon: PhoneCall, label: "Site visit booked" },
      { icon: Database, label: "Synced to CRM" },
    ],
  },
  {
    key: "healthcare",
    label: "Healthcare",
    icon: HeartPulse,
    challenge: "Front desk overwhelmed by appointment calls",
    outcome: "82% fewer missed appointments",
    description:
      "A voice AI answers every call, books and reschedules patients, and sends confirmation reminders — your staff stays focused on care.",
    workflow: [
      { icon: PhoneCall, label: "Patient calls" },
      { icon: BrainCircuit, label: "AI voice agent" },
      { icon: Clock, label: "Slot booked" },
      { icon: MessageSquare, label: "Reminder sent" },
    ],
  },
  {
    key: "education",
    label: "Education",
    icon: GraduationCap,
    challenge: "Admission funnel leaks between counsellors",
    outcome: "+47% admission conversions",
    description:
      "Personalised nurture sequences, document reminders and counsellor handoffs are automated from first enquiry to enrolment.",
    workflow: [
      { icon: MessageSquare, label: "Enquiry captured" },
      { icon: BrainCircuit, label: "AI nurture" },
      { icon: Users, label: "Counsellor handoff" },
      { icon: Database, label: "Enrolment synced" },
    ],
  },
  {
    key: "ecommerce",
    label: "E-commerce",
    icon: ShoppingBag,
    challenge: "Cart abandonment and slow support replies",
    outcome: "2.4× more recovered revenue",
    description:
      "Automated WhatsApp recovery flows, order tracking and 24/7 AI support resolve buyer questions and bring carts back to checkout.",
    workflow: [
      { icon: ShoppingBag, label: "Cart abandoned" },
      { icon: MessageSquare, label: "WhatsApp nudge" },
      { icon: BrainCircuit, label: "AI answers query" },
      { icon: TrendingUp, label: "Order recovered" },
    ],
  },
  {
    key: "finance",
    label: "Finance",
    icon: Landmark,
    challenge: "High-intent leads waiting hours for a callback",
    outcome: "5× faster lead-to-call time",
    description:
      "PixoraNest qualifies loan and insurance leads instantly, routes hot prospects to advisors and keeps a clean audit trail.",
    workflow: [
      { icon: MessageSquare, label: "Lead arrives" },
      { icon: BrainCircuit, label: "AI qualifies" },
      { icon: PhoneCall, label: "Advisor connected" },
      { icon: Database, label: "Logged & compliant" },
    ],
  },
];

const IndustryTabsSection = () => {
  const [active, setActive] = useState(industries[0].key);
  const current = industries.find((i) => i.key === active)!;
  const Icon = current.icon;

  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Built for your industry"
          title="Automation tailored to how you actually work"
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {industries.map((i) => {
            const TabIcon = i.icon;
            const isActive = i.key === active;
            return (
              <button
                key={i.key}
                onClick={() => setActive(i.key)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                    : "border-slate-200 bg-white text-slate-700 hover:border-blue-200 hover:text-blue-700"
                }`}
              >
                <TabIcon className="h-4 w-4" />
                {i.label}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 rounded-3xl border border-slate-200 bg-gradient-to-br from-blue-50/40 to-white p-8 md:grid-cols-2 sm:p-10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-blue-700 shadow-sm ring-1 ring-blue-100">
              <Icon className="h-3.5 w-3.5" />
              {current.label}
            </span>
            <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900">
              {current.challenge}
            </h3>
            <div className="mt-5 inline-flex items-center gap-2 rounded-lg bg-blue-600/10 px-3 py-2 text-sm font-semibold text-blue-700">
              <TrendingUp className="h-4 w-4" />
              {current.outcome}
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate-600">
              {current.description}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Automation flow
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                Live
              </span>
            </div>
            <ol className="space-y-3">
              {current.workflow.map((step, idx) => {
                const StepIcon = step.icon;
                return (
                  <li
                    key={step.label}
                    className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600/10 text-blue-700">
                      <StepIcon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-slate-900">
                        {step.label}
                      </div>
                    </div>
                    <span className="text-xs font-medium text-slate-400">
                      0{idx + 1}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------ */
/* 4. Comparison                                                      */
/* ------------------------------------------------------------------ */

const comparisonRows = [
  {
    icon: Zap,
    label: "Response speed",
    manual: "5–60 minutes",
    ai: "Under 30 seconds",
  },
  {
    icon: Users,
    label: "Lead capture",
    manual: "Missed after hours",
    ai: "Every lead captured 24/7",
  },
  {
    icon: Clock,
    label: "Availability",
    manual: "Office hours only",
    ai: "Always-on, every day",
  },
  {
    icon: PhoneCall,
    label: "Follow-up consistency",
    manual: "Depends on the rep",
    ai: "Personalised & automated",
  },
  {
    icon: TrendingUp,
    label: "Scalability",
    manual: "Hire more staff to grow",
    ai: "Scales without headcount",
  },
  {
    icon: Wallet,
    label: "Operational cost",
    manual: "Rises with volume",
    ai: "Flat, predictable pricing",
  },
];

const ComparisonSection = () => (
  <section className="bg-slate-50/60 py-20 sm:py-24">
    <div className="mx-auto max-w-5xl px-6">
      <SectionHeader
        eyebrow="Manual vs PixoraNest AI"
        title="Why teams switch to automation"
        subtitle="A side-by-side look at how PixoraNest changes day-to-day operations."
      />

      <div className="mt-12 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="grid grid-cols-12 border-b border-slate-200 bg-slate-50/80 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
          <div className="col-span-4">Capability</div>
          <div className="col-span-4">Manual today</div>
          <div className="col-span-4 text-blue-700">With PixoraNest AI</div>
        </div>

        {comparisonRows.map((row, idx) => {
          const RowIcon = row.icon;
          return (
            <div
              key={row.label}
              className={`grid grid-cols-12 items-center px-6 py-4 text-sm ${
                idx % 2 === 1 ? "bg-slate-50/40" : "bg-white"
              }`}
            >
              <div className="col-span-4 flex items-center gap-3 font-medium text-slate-900">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                  <RowIcon className="h-4 w-4" />
                </span>
                {row.label}
              </div>
              <div className="col-span-4 flex items-center gap-2 text-slate-500">
                <X className="h-4 w-4 text-slate-400" />
                {row.manual}
              </div>
              <div className="col-span-4 flex items-center gap-2 font-medium text-slate-900">
                <Check className="h-4 w-4 text-blue-600" />
                {row.ai}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/* 5. Final CTA                                                       */
/* ------------------------------------------------------------------ */

const FinalCTASection = () => (
  <section className="bg-white py-20 sm:py-24">
    <div className="mx-auto max-w-5xl px-6">
      <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-blue-50/50 px-8 py-14 shadow-sm sm:px-14 sm:py-16">
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-blue-300/20 blur-3xl" />

        <div className="relative mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1 text-xs font-medium text-blue-700 shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Your story, next
          </span>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Ready to become our next success story?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            See how PixoraNest can automate your sales, support and operations in
            a 20-minute personalised demo.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#book-demo"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              Book Free Demo
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#talk-sales"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-blue-200 hover:text-blue-700"
            >
              Talk to Sales
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-slate-600">
            <li className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-blue-600" />
              Go live in days
            </li>
            <li className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-blue-600" />
              Indian support
            </li>
            <li className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-blue-600" />
              Fully managed onboarding
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
);

/* ------------------------------------------------------------------ */
/* Page composition                                                   */
/* ------------------------------------------------------------------ */

export default function CustomerStoriesClient() {
  return (
    <main className="bg-white">
      <CustomerStoriesHero />
      <FeaturedStoriesSection />
      <TestimonialsSection />
      <IndustryTabsSection />
      <ComparisonSection />
      <FinalCTASection />
    </main>
  );
}
