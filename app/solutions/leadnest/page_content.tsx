"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight, CheckCircle2, ChevronDown, X, PlayCircle,
  Users, Workflow, BarChart3, MessageSquare, Filter, Target,
  Bell, TrendingUp, Database, Zap, Phone, Mail,
  Building2, HeartPulse, GraduationCap, Landmark, Scale,
  Wrench, Briefcase, Hotel, ShoppingBag, Cpu,
  ClipboardList, GitBranch, Settings2, Plug, LifeBuoy, Gauge,
  Star, Award, ShieldCheck, Clock, Sparkles, Layers,
  PieChart, FileBarChart, Inbox, UserCheck, Repeat, Network,
} from "lucide-react";

/* ─────────────── BRAND TOKENS (inline so you don't need globals) ───────────────
   Primary       #2559FB
   Primary-Dark  #233B7A
   Secondary     #3154FB
   Bg            #FFFFFF
   Bg Light      #E4F0FF
   Text          #374151
   Muted         #6B7280
   Border        #E5E7EB
─────────────────────────────────────────────────────────────────────────────── */

const C = {
  primary: "#2559FB",
  primaryDark: "#233B7A",
  bgLight: "#E4F0FF",
  text: "#374151",
  muted: "#6B7280",
  border: "#E5E7EB",
};

// ───────── DATA ─────────

const TRUST_BADGES = [
  "CRM Platform", "Lead Management", "Sales Automation",
  "Workflow Automation", "Customer Communication",
];

const INTEGRATIONS = [
  "HubSpot", "Salesforce", "Zoho", "Pipedrive",
  "Google Workspace", "Slack", "WhatsApp", "Outlook",
];

const PROBLEMS = [
  { icon: Inbox, t: "Lost Leads", d: "Inquiries slip through email, forms, WhatsApp, and calls — never reaching a sales rep." },
  { icon: Clock, t: "Slow Response Times", d: "Leads that wait more than five minutes convert 10× lower. Manual triage kills speed." },
  { icon: Repeat, t: "Manual Follow-Ups", d: "Reps forget to follow up, send the wrong message, or chase the wrong lead." },
  { icon: Database, t: "Scattered Customer Data", d: "Contacts live in spreadsheets, inboxes, and notebooks with no single source of truth." },
  { icon: UserCheck, t: "No Lead Ownership", d: "Without clear assignment, leads bounce between reps or go silent for weeks." },
  { icon: PieChart, t: "Poor Sales Visibility", d: "Leadership flies blind — no pipeline view, no forecast, no conversion data." },
  { icon: MessageSquare, t: "Disconnected Communication", d: "Calls, emails, and WhatsApp threads live in silos, hiding the full customer story." },
  { icon: TrendingUp, t: "Missed Revenue Opportunities", d: "Hot leads cool down, repeat customers are ignored, and renewals are forgotten." },
  { icon: FileBarChart, t: "Manual Reporting", d: "Weekly reports are stitched together by hand, full of errors, days behind reality." },
  { icon: Target, t: "Low Conversion Rates", d: "Without scoring, nurturing and automation, fewer than 5% of leads ever become customers." },
];

const WORKFLOW = [
  { icon: Inbox, t: "Lead Captured" },
  { icon: UserCheck, t: "Lead Assigned" },
  { icon: Filter, t: "Lead Qualified" },
  { icon: Sparkles, t: "Lead Nurtured" },
  { icon: MessageSquare, t: "Customer Engaged" },
  { icon: GitBranch, t: "Pipeline Updated" },
  { icon: Bell, t: "Sales Team Notified" },
  { icon: Award, t: "Deal Closed" },
  { icon: BarChart3, t: "Analytics Generated" },
];

const FEATURES = [
  { icon: Layers, t: "CRM Software", d: "A unified customer relationship management system that stores every contact, conversation, and deal in one place." },
  { icon: Inbox, t: "Lead Management Platform", d: "Capture leads from web forms, ads, calls, WhatsApp, email, and chat — automatically deduplicated and enriched." },
  { icon: Target, t: "Lead Tracking System", d: "Track every lead's source, stage, owner, and last activity. No lead ever falls off the radar." },
  { icon: Filter, t: "Lead Qualification Software", d: "Score, route, and qualify leads with rules and AI — so sales reps only spend time on real opportunities." },
  { icon: Star, t: "Lead Scoring Software", d: "Dynamic lead scoring based on intent signals, engagement, demographics and behavior." },
  { icon: Sparkles, t: "Lead Nurturing Software", d: "Multi-step email, WhatsApp and SMS journeys that warm cold leads until they're sales-ready." },
  { icon: GitBranch, t: "Sales Pipeline Software", d: "Visual drag-and-drop pipelines for every product line, region, or sales motion." },
  { icon: Workflow, t: "Sales Workflow Automation", d: "Trigger tasks, emails, reminders, and approvals automatically — eliminate manual ops." },
  { icon: MessageSquare, t: "Customer Communication Platform", d: "Unified inbox for email, WhatsApp, calls, and chat — every conversation logged on the contact." },
  { icon: Users, t: "Customer Engagement Software", d: "Run targeted campaigns, win-back flows, and onboarding sequences from a single platform." },
  { icon: Briefcase, t: "Opportunity Management Software", d: "Manage deals, forecasts, quotes, and approvals across multiple stages and stakeholders." },
  { icon: ClipboardList, t: "Inquiry Management Software", d: "Centralize every inbound inquiry, assign owners, set SLAs, and track time-to-response." },
  { icon: TrendingUp, t: "Sales Conversion Tracking", d: "Measure conversion at every stage — source to closed-won — and find your leakiest step." },
  { icon: Repeat, t: "Customer Lifecycle Management", d: "From first inquiry to upsell and retention, track customers across the full lifecycle." },
  { icon: Zap, t: "Automation Workflows", d: "Visual, no-code workflows for routing, follow-ups, escalations, and cross-system updates." },
  { icon: BarChart3, t: "Reporting & Analytics", d: "Real-time dashboards for pipeline, activity, conversion, and team performance." },
];

const ECOSYSTEM = [
  { name: "FirstVoice", t: "AI Voice Receptionist", d: "Answers every inbound call 24/7, qualifies the lead and pushes structured data into LeadNest.", href: "/firstvoice", icon: Phone },
  { name: "LeadNest", t: "CRM & Lead Management", d: "The central system of record — captures, scores, nurtures, and converts every lead.", icon: Layers, current: true },
  { name: "CallOrbit", t: "Communication Routing", d: "Routes calls, WhatsApp, and chat to the right team based on intent, region and availability.", href: "/callorbit", icon: Network },
];

const INDUSTRIES = [
  { icon: Building2, t: "Real Estate" },
  { icon: HeartPulse, t: "Healthcare" },
  { icon: GraduationCap, t: "Education" },
  { icon: Landmark, t: "Financial Services" },
  { icon: Scale, t: "Legal Services" },
  { icon: Wrench, t: "Home Services" },
  { icon: Briefcase, t: "Consulting" },
  { icon: Hotel, t: "Hospitality" },
  { icon: ShoppingBag, t: "E-Commerce" },
  { icon: Cpu, t: "Technology" },
];

const USE_CASES = [
  { t: "Lead Management for Real Estate", d: "Capture buyer inquiries from portals, ads and calls. Auto-assign to agents, qualify by budget and locality, and nurture until site-visit booking.", href: "/industries/real-estate" },
  { t: "Patient Inquiry Management for Healthcare", d: "Centralize patient inquiries, route to the right department, schedule consultations, and follow up on treatment plans — all HIPAA-aware.", href: "/industries/healthcare" },
  { t: "Student Enrollment Tracking for Education", d: "Track prospective students from first inquiry to admission. Automate counseling reminders, document collection, and program-fit scoring.", href: "/industries/education" },
  { t: "Customer Acquisition for Financial Services", d: "Qualify loan, insurance, and investment leads with KYC-ready workflows, compliant communication, and advisor handoff.", href: "/industries/financial-services" },
  { t: "Client Management for Legal Firms", d: "Manage case inquiries, conflict checks, intake forms, and recurring client communication with full audit trails.", href: "/industries/legal" },
];

const SERVICES = [
  { icon: Plug, t: "Implementation", d: "PixoraNest handles end-to-end LeadNest implementation — discovery, data migration, environment setup, and go-live." },
  { icon: Settings2, t: "Workflow Configuration", d: "PixoraNest configures pipelines, stages, lead routing rules, scoring models, and SLA policies to your business." },
  { icon: Zap, t: "Automation Setup", d: "PixoraNest automation experts design no-code workflows for follow-ups, handoffs, escalations and notifications." },
  { icon: Network, t: "Communication Integrations", d: "PixoraNest connects WhatsApp Business, email providers, call systems, ad platforms and your existing tools." },
  { icon: LifeBuoy, t: "Onboarding & Training", d: "PixoraNest trains your sales, marketing and ops teams with role-based onboarding and playbooks." },
  { icon: Gauge, t: "CRM Optimization", d: "PixoraNest runs quarterly CRM audits — conversion analysis, automation tuning, and pipeline cleanup." },
];

const FAQS = [
  { q: "What is LeadNest?", a: "LeadNest is an AI-powered CRM and lead management platform built by PixoraNest. It combines CRM software, lead tracking, sales pipeline management, workflow automation and customer communication in a single platform." },
  { q: "What makes LeadNest different from other CRM software?", a: "LeadNest is developed by PixoraNest and combines CRM, lead management, sales automation, and customer communication into one platform — instead of bolting together separate tools. PixoraNest also delivers implementation, automation and optimization as a managed service." },
  { q: "Does PixoraNest provide CRM implementation services?", a: "Yes. PixoraNest provides full CRM implementation — discovery, data migration, workflow configuration, automation, integrations, onboarding and ongoing optimization for LeadNest." },
  { q: "Is LeadNest only for Real Estate?", a: "No. LeadNest by PixoraNest is an industry-agnostic CRM and lead management platform. Real Estate is one of many use cases — PixoraNest also deploys LeadNest for Healthcare, Education, Financial Services, Legal, Hospitality, E-Commerce and Technology." },
  { q: "How does LeadNest capture leads?", a: "LeadNest captures leads from web forms, landing pages, ads, WhatsApp, email, chat, phone calls (via PixoraNest's FirstVoice), and any custom source via API or webhook." },
  { q: "Can LeadNest automatically qualify leads?", a: "Yes. LeadNest's lead qualification software uses rules and AI scoring to qualify leads on budget, intent, source and behavior — the PixoraNest team helps you design the scoring model for your business." },
  { q: "Does LeadNest support sales pipeline management?", a: "Yes. LeadNest is a full sales pipeline software — multiple pipelines, custom stages, drag-and-drop deal management, forecasting and conversion analytics. PixoraNest configures pipelines to match your sales motion." },
  { q: "Can LeadNest automate follow-ups?", a: "Yes. LeadNest's sales workflow automation triggers emails, WhatsApp messages, calls, reminders, and tasks based on lead stage, score, or behavior. PixoraNest's automation experts design these flows." },
  { q: "Does LeadNest include a customer communication platform?", a: "Yes. LeadNest is a unified customer communication platform — every email, WhatsApp message, call and chat is logged on the contact record. PixoraNest also integrates external channels you already use." },
  { q: "Which channels does LeadNest support?", a: "LeadNest by PixoraNest supports email, WhatsApp Business, SMS, voice calls, web chat, and Instagram/Facebook DMs. PixoraNest connects each channel during implementation." },
  { q: "Can LeadNest integrate with my existing tools?", a: "Yes. PixoraNest integrates LeadNest with HubSpot, Salesforce, Zoho, Pipedrive, Google Workspace, Microsoft 365, Slack, WhatsApp Business, Razorpay, Stripe, and custom systems via API." },
  { q: "How long does it take to deploy LeadNest?", a: "Most businesses go live on LeadNest within 2–4 weeks. PixoraNest runs a structured implementation — discovery, configuration, integrations, training and go-live." },
  { q: "Does LeadNest provide reporting and analytics?", a: "Yes. LeadNest ships with real-time dashboards for pipeline, conversion, activity, source performance and team productivity. PixoraNest builds custom reports for your leadership team." },
  { q: "Is LeadNest suitable for small businesses?", a: "Yes. PixoraNest deploys LeadNest for small teams, mid-market companies and large enterprises — pricing and configuration scale with your business." },
  { q: "Does LeadNest support multiple languages?", a: "Yes. LeadNest by PixoraNest supports multilingual customer communication including English, Hindi, Hinglish and major regional languages." },
  { q: "How does LeadNest improve conversion rates?", a: "By combining instant lead capture, AI qualification, automated nurturing, pipeline visibility and unified communication, PixoraNest's LeadNest typically lifts conversion rates 2–3× within the first quarter." },
  { q: "Is my data secure on LeadNest?", a: "Yes. LeadNest data is encrypted in transit and at rest, hosted on enterprise-grade infrastructure, and PixoraNest provides role-based access control, audit logs and DPDP/GDPR-aligned policies." },
  { q: "Can LeadNest work with FirstVoice and CallOrbit?", a: "Yes. LeadNest, FirstVoice and CallOrbit are all PixoraNest products and are designed to work as one ecosystem — FirstVoice captures inbound calls, LeadNest manages the lead, CallOrbit routes ongoing communication." },
  { q: "What kind of support does PixoraNest provide?", a: "PixoraNest provides onboarding, training, dedicated success management, automation engineering, quarterly CRM audits and ongoing optimization for every LeadNest customer." },
  { q: "How do I get started with LeadNest?", a: "Book a demo with PixoraNest. The team will map your sales process, design your LeadNest workflows, and give you a personalized plan to capture more leads and close more deals." },
];

// ───────── MAIN COMPONENT ─────────

export default function LeadNestPageContent() {
  const [demoOpen, setDemoOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const openDemo = () => setDemoOpen(true);

  useEffect(() => {
    if (!demoOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setDemoOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [demoOpen]);

  return (
    <main style={{ background: "#fff", color: C.text }} className="min-h-screen">

      {/* BREADCRUMB */}
      <nav aria-label="Breadcrumb" style={{ borderBottom: `1px solid ${C.border}`, background: "#fff" }}>
        <div className="mx-auto max-w-7xl px-4 py-3 text-xs sm:px-6 lg:px-8" style={{ color: C.muted }}>
          <ol className="flex items-center gap-2">
            <li><Link href="/" style={{ color: "inherit" }}>Home</Link></li>
            <li>/</li>
            <li>Solutions</li>
            <li>/</li>
            <li className="font-medium" style={{ color: C.text }}>LeadNest</li>
          </ol>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ background: "#fff" }}>
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-20">
          <div>
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
              style={{ border: `1px solid ${C.border}`, background: C.bgLight, color: C.primaryDark }}
            >
              <Sparkles className="h-3.5 w-3.5" /> LeadNest by PixoraNest
            </span>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl" style={{ color: C.text }}>
              LeadNest CRM & Lead Management Platform
            </h1>
            <p className="mt-3 text-lg font-medium" style={{ color: C.primary }}>
              Turn Every Lead Into a Revenue Opportunity.
            </p>
            <p className="mt-4 max-w-xl text-base leading-7" style={{ color: C.muted }}>
              LeadNest by PixoraNest helps businesses capture inquiries, automate follow-ups,
              manage customer relationships, track sales pipelines, and improve conversion rates
              from first contact to closed deal.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <PrimaryCTA onClick={openDemo}>Book Demo <ArrowRight className="h-4 w-4" /></PrimaryCTA>
              <SecondaryCTA onClick={openDemo}><PlayCircle className="h-4 w-4" /> See Platform Tour</SecondaryCTA>
            </div>
            <ul className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium" style={{ color: C.muted }}>
              {TRUST_BADGES.map((b) => (
                <li key={b} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4" style={{ color: C.primary }} /> {b}
                </li>
              ))}
            </ul>
          </div>
          <PipelineCard />
        </div>
      </section>

      {/* TRUST STRIP */}
      <section style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: "#fff" }}>
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-medium uppercase tracking-wider" style={{ color: C.muted }}>
            Trusted across industries · Integrates with the tools you already use
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {INTEGRATIONS.map((i) => (
              <span key={i} className="text-sm font-semibold" style={{ color: C.muted, opacity: 0.85 }}>{i}</span>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLEMS */}
      <Section bg="light" eyebrow="The problem" title="Most businesses are losing revenue they never see" subtitle="Without a unified CRM and lead management platform, inquiries leak, follow-ups die, and pipeline goes dark.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROBLEMS.map(({ icon: Icon, t, d }) => (
            <Card key={t}>
              <IconBox><Icon className="h-5 w-5" /></IconBox>
              <h3 className="mt-4 text-base font-semibold" style={{ color: C.text }}>{t}</h3>
              <p className="mt-2 text-sm leading-6" style={{ color: C.muted }}>{d}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* WORKFLOW */}
      <Section bg="white" eyebrow="The workflow" title="How LeadNest moves a lead from inquiry to closed deal" subtitle="A single, automated workflow — designed and configured by PixoraNest.">
        <ol className="grid gap-4 md:grid-cols-3 lg:grid-cols-9">
          {WORKFLOW.map((s, i) => (
            <li key={s.t} className="rounded-xl p-4" style={{ border: `1px solid ${C.border}`, background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              <div className="flex items-center gap-2 text-xs font-semibold" style={{ color: C.primary }}>
                <span className="flex h-5 w-5 items-center justify-center rounded-full text-[10px]" style={{ background: C.primary, color: "#fff" }}>{i + 1}</span>
                STEP
              </div>
              <IconBox className="mt-3"><s.icon className="h-4 w-4" /></IconBox>
              <div className="mt-2 text-sm font-semibold" style={{ color: C.text }}>{s.t}</div>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBand title="See LeadNest move a real lead from inquiry to closed deal" subtitle="A 20-minute personalized walkthrough by the PixoraNest team." onClick={openDemo} />

      {/* FEATURES */}
      <Section bg="light" eyebrow="The platform" title="Everything you need to capture, qualify, nurture and convert" subtitle="LeadNest by PixoraNest replaces 5–8 disconnected tools with one CRM and lead management platform.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {FEATURES.map(({ icon: Icon, t, d }) => (
            <Card key={t}>
              <IconBox solid><Icon className="h-5 w-5" /></IconBox>
              <h3 className="mt-4 text-base font-semibold" style={{ color: C.text }}>{t}</h3>
              <p className="mt-2 text-sm leading-6" style={{ color: C.muted }}>{d}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* ECOSYSTEM */}
      <Section bg="white" eyebrow="The PixoraNest ecosystem" title="LeadNest works hand-in-hand with FirstVoice and CallOrbit" subtitle="Three PixoraNest products. One complete customer acquisition and conversion ecosystem.">
        <div className="grid gap-5 md:grid-cols-3">
          {ECOSYSTEM.map((p) => (
            <div key={p.name} className="rounded-2xl p-6"
              style={{
                border: `1px solid ${p.current ? C.primary : C.border}`,
                background: p.current ? C.bgLight : "#fff",
              }}>
              <div className="flex items-center gap-3">
                <IconBox solid><p.icon className="h-5 w-5" /></IconBox>
                <div>
                  <div className="text-base font-semibold" style={{ color: C.text }}>{p.name}</div>
                  <div className="text-xs" style={{ color: C.muted }}>{p.t}</div>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6" style={{ color: C.muted }}>{p.d}</p>
              {p.href ? (
                <Link href={p.href} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold" style={{ color: C.primary }}>
                  Explore {p.name} <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold" style={{ color: C.primaryDark }}>You are here</span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-10 rounded-2xl p-6" style={{ border: `1px solid ${C.border}`, background: C.bgLight }}>
          <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: C.primaryDark }}>How they work together</div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm font-medium" style={{ color: C.text }}>
            <Chip>FirstVoice captures inbound inquiries</Chip>
            <ArrowRight className="h-4 w-4" style={{ color: C.primary }} />
            <Chip>LeadNest stores, qualifies and nurtures the lead</Chip>
            <ArrowRight className="h-4 w-4" style={{ color: C.primary }} />
            <Chip>CallOrbit routes communication to the right team</Chip>
          </div>
        </div>
      </Section>

      {/* INDUSTRIES */}
      <Section bg="light" eyebrow="Industries" title="An industry-agnostic CRM, deployed by PixoraNest" subtitle="LeadNest powers lead and customer management across every industry that depends on inquiries.">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {INDUSTRIES.map(({ icon: Icon, t }) => (
            <div key={t} className="flex flex-col items-center gap-3 rounded-xl p-5 text-center"
              style={{ border: `1px solid ${C.border}`, background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              <IconBox><Icon className="h-5 w-5" /></IconBox>
              <div className="text-sm font-semibold" style={{ color: C.text }}>{t}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* USE CASES */}
      <Section bg="white" eyebrow="Use cases" title="Real workflows PixoraNest configures with LeadNest" subtitle="LeadNest adapts to each industry's sales motion — Real Estate is one of many.">
        <div className="grid gap-5 md:grid-cols-2">
          {USE_CASES.map((u) => (
            <div key={u.t} className="rounded-2xl p-6" style={{ border: `1px solid ${C.border}`, background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
              <h3 className="text-lg font-semibold" style={{ color: C.text }}>{u.t}</h3>
              <p className="mt-2 text-sm leading-6" style={{ color: C.muted }}>{u.d}</p>
              <Link href={u.href} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold" style={{ color: C.primary }}>
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand title="Whatever you sell, LeadNest helps you sell more of it" subtitle="From first inquiry to closed deal — PixoraNest configures LeadNest around your business." onClick={openDemo} />

      {/* SERVICES */}
      <Section bg="light" eyebrow="PixoraNest services" title="LeadNest, delivered as a managed service by PixoraNest" subtitle="You don't just get software — you get a team. PixoraNest implements, integrates, automates and optimizes LeadNest for you.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map(({ icon: Icon, t, d }) => (
            <Card key={t}>
              <IconBox solid><Icon className="h-5 w-5" /></IconBox>
              <h3 className="mt-4 text-base font-semibold" style={{ color: C.text }}>{t}</h3>
              <p className="mt-2 text-sm leading-6" style={{ color: C.muted }}>{d}</p>
            </Card>
          ))}
        </div>
      </Section>

      <CtaBand title="Ready to deploy LeadNest in your business?" subtitle="Talk to the PixoraNest team about a managed CRM rollout." onClick={openDemo} />

      {/* DEEP SEO */}
      <Section bg="white" eyebrow="Knowledge base" title="A complete guide to CRM, lead management and sales automation" subtitle="Everything PixoraNest has learned about modern customer acquisition — in one place.">
        <article className="mx-auto max-w-3xl space-y-10 text-[15px] leading-7" style={{ color: C.muted }}>
          <Block title="What is CRM Software?">
            <p>CRM software, short for customer relationship management software, is the system businesses use to store every contact, conversation, deal, and customer interaction in one place. A modern CRM platform is no longer a static address book — it&apos;s a customer management software layer that connects marketing, sales, support, and operations around the same customer record.</p>
            <p><strong style={{ color: C.text }}>LeadNest by PixoraNest</strong> is a full CRM system designed for businesses that want a single source of truth for every customer relationship. It combines a contact database, deal records, communication history, automation, and reporting into one platform — so leadership, sales, and customer-facing teams all see the same picture.</p>
          </Block>
          <Block title="What is Lead Management?">
            <p>Lead management is the discipline of capturing every inbound inquiry, qualifying it, assigning it to the right owner, nurturing it with relevant communication, and tracking it until it either converts or is intentionally closed. A lead management platform like LeadNest replaces the spreadsheets, email inboxes and notebooks where leads usually go to die.</p>
            <p>Strong lead management software unifies five jobs: lead capture across every channel, lead tracking through stages, lead qualification using scoring, lead nurturing through automated communication, and lead engagement when a prospect is ready to talk. PixoraNest builds and operates each of these layers inside LeadNest for its customers.</p>
          </Block>
          <Block title="How Lead Tracking Improves Conversion">
            <p>Lead tracking software gives every lead a clear status — new, contacted, qualified, nurturing, proposal, won, or lost — and records what happened at each stage. Without lead tracking, sales teams can&apos;t see which leads are stuck, which reps are overloaded, or which sources actually produce revenue.</p>
            <p>LeadNest&apos;s lead tracking system shows owner, source, stage, last activity and next action for every lead. PixoraNest typically sees 30–60% improvement in conversion rate within the first quarter, simply by making lead movement visible and eliminating &quot;lost&quot; leads.</p>
          </Block>
          <Block title="Benefits of Sales Automation">
            <p>Sales automation platforms remove manual, repetitive work from your sales team — assigning leads, sending follow-ups, updating fields, creating tasks, triggering approvals, and notifying stakeholders. The benefit is two-fold: reps spend more time selling, and the business stops losing deals to slow or forgotten follow-ups.</p>
            <p>LeadNest&apos;s sales automation platform handles lead routing, multi-channel follow-up sequences, pipeline updates, deal hand-offs and reporting. PixoraNest designs these flows for each customer so they match the way your sales team actually works.</p>
          </Block>
          <Block title="How Workflow Automation Increases Productivity">
            <p>Workflow automation software lets you describe a business process visually — &quot;when a lead is qualified, assign it to the regional manager, create a task to call within 30 minutes, and send a WhatsApp introduction&quot; — and have the platform execute it forever. That&apos;s compounded productivity: every automated step is one less manual step that can be skipped, forgotten, or delayed.</p>
            <p>LeadNest by PixoraNest ships with a no-code workflow builder for routing, follow-ups, escalations, SLA enforcement and cross-system updates. PixoraNest&apos;s automation experts build these workflows during implementation and tune them every quarter.</p>
          </Block>
          <Block title="How Customer Communication Platforms Improve Experience">
            <p>A customer communication platform unifies every channel — email, WhatsApp, calls, SMS, chat — so the customer&apos;s full history is visible on one screen, regardless of which channel they reached out on. This eliminates the &quot;can you remind me what you discussed?&quot; problem, and lets reps respond in the customer&apos;s preferred channel.</p>
            <p>LeadNest&apos;s customer communication software logs every interaction on the contact record. Combined with PixoraNest&apos;s FirstVoice (for inbound calls) and CallOrbit (for routing), you get a single, consistent customer experience across every touch.</p>
          </Block>
          <Block title="How LeadNest Helps Businesses Scale">
            <p>Most businesses hit a ceiling not because they can&apos;t generate leads, but because they can&apos;t process them. Scaling sales means handling more leads, more reps, more pipelines and more communication without losing quality. LeadNest scales each of those: unlimited lead capture, role-based pipelines, multi-team routing, and granular performance reporting.</p>
            <p>Businesses using PixoraNest LeadNest platform typically increase qualified pipeline 2–3× in the first quarter, cut response time by more than 80%, and reduce manual sales operations work by over 40% — without adding headcount.</p>
          </Block>
          <Block title="Why Businesses Choose PixoraNest">
            <p>PixoraNest is not just a software vendor — it&apos;s a customer acquisition partner. PixoraNest CRM implementation services include discovery, configuration, integrations, automation, onboarding, and quarterly optimization. PixoraNest customer communication solutions connect every channel your customers use. PixoraNest automation experts design the workflows that actually move revenue.</p>
            <p>That&apos;s why businesses choose PixoraNest LeadNest over generic CRM tools: one platform, one team, one outcome — more leads captured, more leads converted, more revenue closed. Explore <Link href="/firstvoice" style={{ color: C.primary, fontWeight: 600 }}>FirstVoice</Link> for inbound voice, <Link href="/callorbit" style={{ color: C.primary, fontWeight: 600 }}>CallOrbit</Link> for routing, or <Link href="/contact" style={{ color: C.primary, fontWeight: 600 }}>contact PixoraNest</Link> to start.</p>
          </Block>
        </article>
      </Section>

      {/* FAQ */}
      <Section bg="light" eyebrow="FAQ" title="Frequently asked questions about LeadNest" subtitle="Everything decision-makers ask the PixoraNest team before rolling out LeadNest.">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl" style={{ border: `1px solid ${C.border}`, background: "#fff" }}>
          {FAQS.map((f, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={f.q} style={{ borderTop: i === 0 ? "none" : `1px solid ${C.border}` }}>
                <button onClick={() => setOpenFaq(isOpen ? null : i)} aria-expanded={isOpen} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
                  <span className="text-sm font-semibold" style={{ color: C.text }}>{f.q}</span>
                  <ChevronDown className="h-4 w-4 flex-shrink-0 transition-transform" style={{ color: C.muted, transform: isOpen ? "rotate(180deg)" : "none" }} />
                </button>
                {isOpen && <div className="px-5 pb-5 text-sm leading-6" style={{ color: C.muted }}>{f.a}</div>}
              </div>
            );
          })}
        </div>
      </Section>

      {/* FINAL CTA */}
      <section style={{ background: C.primary }}>
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-5 px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "#fff" }}>
            Capture more leads. Convert more customers. Automate every follow-up.
          </h2>
          <p className="max-w-2xl text-base leading-7" style={{ color: "rgba(255,255,255,0.9)" }}>
            Book a personalized demo with the PixoraNest team and see how LeadNest can power your entire customer acquisition engine.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={openDemo} className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold shadow" style={{ background: "#fff", color: C.primary }}>
              Book Demo <ArrowRight className="h-4 w-4" />
            </button>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold" style={{ border: "1px solid rgba(255,255,255,0.4)", color: "#fff" }}>
              Talk to PixoraNest
            </Link>
          </div>
        </div>
      </section>

      {/* DEMO MODAL */}
      {demoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm" style={{ background: "rgba(35,59,122,0.7)" }} onClick={() => setDemoOpen(false)} role="dialog" aria-modal="true">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setDemoOpen(false)} aria-label="Close demo" className="absolute right-3 top-3 z-10 rounded-full p-2 shadow" style={{ background: "rgba(255,255,255,0.9)", color: C.text }}>
              <X className="h-4 w-4" />
            </button>
            <div className="aspect-video w-full" style={{ background: C.bgLight }}>
              <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full" style={{ background: C.primary, color: "#fff" }}>
                  <PlayCircle className="h-8 w-8" />
                </div>
                <div className="text-base font-semibold" style={{ color: C.text }}>LeadNest platform tour</div>
                <div className="max-w-sm text-sm" style={{ color: C.muted }}>
                  See how PixoraNest LeadNest captures, qualifies and converts leads across every channel.
                </div>
                <Link href="/contact" className="mt-2 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold" style={{ background: C.primary, color: "#fff" }}>
                  Book a live demo with PixoraNest <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

// ───────── UI PRIMITIVES ─────────

function PrimaryCTA({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold shadow-sm transition" style={{ background: C.primary, color: "#fff" }}>
      {children}
    </button>
  );
}

function SecondaryCTA({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold transition" style={{ border: `1px solid ${C.border}`, background: "#fff", color: C.text }}>
      {children}
    </button>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full px-3 py-1.5 text-xs font-medium" style={{ border: `1px solid ${C.border}`, background: "#fff", color: C.text }}>{children}</span>;
}

function Card({ children }: { children: React.ReactNode }) {
  return <div className="rounded-xl p-6 transition" style={{ border: `1px solid ${C.border}`, background: "#fff", boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>{children}</div>;
}

function IconBox({ children, solid, className = "" }: { children: React.ReactNode; solid?: boolean; className?: string }) {
  return (
    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${className}`} style={solid ? { background: C.primary, color: "#fff" } : { background: C.bgLight, color: C.primary }}>
      {children}
    </div>
  );
}

function Section({ bg, eyebrow, title, subtitle, children }: { bg: "white" | "light"; eyebrow: string; title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section style={{ background: bg === "light" ? C.bgLight : "#fff" }}>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: C.primary }}>{eyebrow}</div>
          <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: C.text }}>{title}</h2>
          {subtitle && <p className="mt-3 text-base leading-7" style={{ color: C.muted }}>{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

function CtaBand({ title, subtitle, onClick }: { title: string; subtitle: string; onClick: () => void }) {
  return (
    <section style={{ background: "#fff" }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-5 rounded-2xl px-6 py-10 text-center md:flex-row md:justify-between md:text-left" style={{ border: `1px solid ${C.border}`, background: C.bgLight }}>
          <div>
            <h3 className="text-xl font-semibold sm:text-2xl" style={{ color: C.text }}>{title}</h3>
            <p className="mt-1 text-sm" style={{ color: C.muted }}>{subtitle}</p>
          </div>
          <button onClick={onClick} className="inline-flex flex-shrink-0 items-center gap-2 rounded-lg px-5 py-3 text-sm font-semibold shadow-sm" style={{ background: C.primary, color: "#fff" }}>
            Book Demo <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-xl font-semibold" style={{ color: C.text }}>{title}</h3>
      <div className="mt-3 space-y-3">{children}</div>
    </div>
  );
}

function PipelineCard() {
  const stages = [
    { name: "New", count: 184 },
    { name: "Qualified", count: 96 },
    { name: "Nurturing", count: 58 },
    { name: "Proposal", count: 24 },
    { name: "Won", count: 12 },
  ];
  return (
    <div className="relative">
      <div className="rounded-2xl p-6" style={{ border: `1px solid ${C.border}`, background: "#fff", boxShadow: "0 10px 30px rgba(37,89,251,0.12)" }}>
        <div className="flex items-center justify-between pb-4" style={{ borderBottom: `1px solid ${C.border}` }}>
          <div className="flex items-center gap-2">
            <IconBox solid><Layers className="h-4 w-4" /></IconBox>
            <div>
              <div className="text-sm font-semibold" style={{ color: C.text }}>Pipeline · Q4</div>
              <div className="text-xs" style={{ color: C.muted }}>Live · 374 leads</div>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold" style={{ background: C.bgLight, color: C.primaryDark }}>
            <Sparkles className="h-3 w-3" /> AUTO-SYNCED
          </span>
        </div>

        <div className="mt-5 space-y-3">
          {stages.map((s) => (
            <div key={s.name}>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium" style={{ color: C.text }}>{s.name}</span>
                <span style={{ color: C.muted }}>{s.count} leads</span>
              </div>
              <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full" style={{ background: C.bgLight }}>
                <div className="h-full rounded-full" style={{ width: `${Math.min(100, (s.count / 200) * 100)}%`, background: C.primary }} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 pt-4 text-center" style={{ borderTop: `1px solid ${C.border}` }}>
          <Stat label="Response" value="< 2 min" />
          <Stat label="Conversion" value="28%" />
          <Stat label="Auto follow-ups" value="1.2K" />
        </div>
      </div>

      <div className="absolute -bottom-4 -right-4 hidden rounded-xl p-3 sm:block" style={{ border: `1px solid ${C.border}`, background: "#fff", boxShadow: "0 10px 30px rgba(37,89,251,0.12)" }}>
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: C.bgLight, color: C.primary }}>
            <Bell className="h-4 w-4" />
          </div>
          <div>
            <div className="text-xs font-semibold" style={{ color: C.text }}>New qualified lead</div>
            <div className="text-[11px]" style={{ color: C.muted }}>Assigned to Priya · 12s ago</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-sm font-semibold" style={{ color: C.text }}>{value}</div>
      <div className="text-[11px]" style={{ color: C.muted }}>{label}</div>
    </div>
  );
}
