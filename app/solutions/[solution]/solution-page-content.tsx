"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Phone, MessageCircle, Mic, Share2, Settings, Bot,
  Zap, Filter, Calendar, GitBranch, BarChart2, MessageSquare, Shield,
  LayoutTemplate, PieChart, Globe, UserPlus, Star,
  Brain, CalendarCheck, ClipboardList, Database,
  FileText, Bell, BarChart, Clock, Smartphone, Repeat,
  RefreshCw, FileSearch, Cpu, SendHorizontal, Users,
  ChevronDown, ChevronUp, ArrowRight, Check, Quote,
} from "lucide-react"
import type { SolutionData } from "@/lib/solution-data"

// ─── Icon map ─────────────────────────────────────────────────────────────────
const iconMap: Record<string, React.ElementType> = {
  Phone, MessageCircle, Mic, Share2, Settings, Bot,
  Zap, Filter, Calendar, GitBranch, BarChart2, MessageSquare, Shield,
  LayoutTemplate, PieChart, Globe, UserPlus, Star,
  Brain, CalendarCheck, ClipboardList, Database,
  FileText, Bell, BarChart, Clock, Smartphone, Repeat,
  RefreshCw, FileSearch, Cpu, SendHorizontal, Users,
}

function Icon({ name, className }: { name: string; className?: string }) {
  const Comp = iconMap[name] ?? Bot
  return <Comp className={className} />
}

// ─── Star Rating ──────────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          className={i <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
        />
      ))}
    </div>
  )
}

// ─── FAQ Accordion ────────────────────────────────────────────────────────────
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-blue-50 transition-colors"
      >
        <span className="font-semibold text-gray-900 pr-4 text-sm md:text-base">{q}</span>
        {open
          ? <ChevronUp size={18} className="text-blue-600 flex-shrink-0" />
          : <ChevronDown size={18} className="text-gray-400 flex-shrink-0" />
        }
      </button>
      {open && (
        <div className="bg-white px-5 pb-5">
          <div className="pt-2 border-t border-gray-100">
            <p className="text-gray-600 text-sm md:text-base leading-relaxed">{a}</p>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Main Page UI ─────────────────────────────────────────────────────────────
export function SolutionPageContent({ data }: { data: SolutionData }) {
  return (
    <main className="bg-white">

      {/* ══════ HERO ══════ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 pt-28 pb-20">

        {/* Grid pattern background */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-6 text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold px-4 py-2 rounded-full mb-6 uppercase tracking-widest">
            {data.badge}
          </div>

          {/* H1 — primary keyword here */}
          <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-6">
            {data.h1}
          </h1>

          <p className="text-blue-100/80 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
            {data.heroSubtext}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-600/30 hover:-translate-y-0.5"
            >
              {data.heroCTA} <ArrowRight size={16} />
            </Link>
            <a
              href="#how-it-works"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200"
            >
              {data.heroSecondaryCTA}
            </a>
          </div>

          {/* Trust strip */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-blue-200/60 text-xs font-medium">
            {["No credit card required", "14-day free trial", "Trusted by 500+ Indian businesses", "Indian data centers"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <Check size={12} className="text-green-400" /> {t}
              </span>
            ))}
          </div>

        </div>
      </section>

      {/* ══════ STATS STRIP ══════ */}
      <section className="bg-blue-600 py-10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white">
          {data.benefits.map((b, i) => (
            <div key={i}>
              <div className="text-3xl md:text-4xl font-bold">{b.stat}</div>
              <div className="text-sm font-semibold mt-1">{b.label}</div>
              <div className="text-xs text-blue-200 mt-0.5">{b.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════ PROBLEM ══════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">The Problem</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-5">
                {data.problemHeading}
              </h2>
              <p className="text-gray-600 leading-relaxed">{data.problemIntro}</p>
            </div>
            <div className="space-y-3">
              {data.problemPoints.map((point, i) => (
                <div key={i} className="flex items-start gap-3 bg-white border border-red-100 rounded-xl p-4 shadow-sm">
                  <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-red-500 text-xs font-bold">✕</span>
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════ SOLUTION OVERVIEW ══════ */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">The Solution</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{data.solutionHeading}</h2>
          <p className="text-blue-600 font-semibold mb-6">{data.solutionSubheading}</p>
          <p className="text-gray-600 text-lg leading-relaxed max-w-3xl mx-auto">{data.solutionDesc}</p>
        </div>
      </section>

      {/* ══════ FEATURES ══════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Features</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{data.featuresHeading}</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {data.features.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                  <Icon name={f.icon} className="text-blue-600 w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2 text-sm">{f.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ HOW IT WORKS ══════ */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Process</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{data.howItWorksHeading}</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-blue-100" />
            {data.steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center relative">
                <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-4 shadow-lg shadow-blue-200 relative z-10">
                  {step.num}
                </div>
                <h3 className="font-bold text-gray-900 mb-2 text-sm">{step.title}</h3>
                <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ USE CASES ══════ */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-950">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-widest mb-3">Use Cases</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{data.useCasesHeading}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {data.useCases.map((uc, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
                <div className="inline-flex items-center bg-blue-500/20 text-blue-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
                  {uc.industry}
                </div>
                <p className="text-blue-100/80 text-sm leading-relaxed">{uc.scenario}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ WHY PIXORANEST ══════ */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Why Us</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">{data.whyHeading}</h2>
              <div className="space-y-3">
                {data.whyPoints.map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={11} className="text-green-600" />
                    </div>
                    <p className="text-gray-700 text-sm">{point}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  href="/demo"
                  className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
                >
                  Book a Free Demo <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Trust stats */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: "500+", label: "Businesses Trust Us" },
                  { num: "10M+", label: "Interactions Automated" },
                  { num: "4.9★", label: "Customer Rating" },
                  { num: "99.9%", label: "Platform Uptime" },
                ].map((s, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 text-center shadow-sm">
                    <div className="text-2xl font-bold text-blue-600">{s.num}</div>
                    <div className="text-xs text-gray-500 mt-1 font-medium">{s.label}</div>
                  </div>
                ))}
              </div>
              <p className="text-center text-xs text-gray-400 mt-4">
                Trusted by startups and enterprises across India since 2022
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════ TESTIMONIALS ══════ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">Testimonials</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">What Our Customers Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {data.testimonials.map((t, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <Quote size={24} className="text-blue-100 mb-3" />
                <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0">
                    {t.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                    <div className="text-xs text-gray-500">{t.role}, {t.company}</div>
                  </div>
                </div>
                <div className="mt-3">
                  <StarRating rating={t.rating} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ FAQ ══════ */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{data.faqHeading}</h2>
          </div>
          <div className="space-y-3">
            {data.faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════ RELATED SOLUTIONS ══════ */}
      <section className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <p className="text-center text-sm text-gray-500 mb-5 font-medium">Explore Other PixoraNest Solutions</p>
          <div className="flex flex-wrap justify-center gap-3">
            {data.internalLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="text-sm text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-4 py-2 rounded-lg transition-colors"
              >
                {link.anchor} →
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ FINAL CTA ══════ */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white text-center">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Automate and Grow?</h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            Join 500+ Indian businesses that use PixoraNest to automate customer communication,
            capture more leads, and close more deals — without adding headcount.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 bg-white text-blue-700 hover:bg-blue-50 font-bold px-8 py-4 rounded-xl transition-colors shadow-xl"
            >
              Book a Free Demo <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-blue-500/30 hover:bg-blue-500/50 border border-white/30 text-white font-semibold px-8 py-4 rounded-xl transition-colors"
            >
              Talk to Sales
            </Link>
          </div>
          <p className="text-blue-200 text-xs mt-6">
            No setup fees · No long-term contracts · Indian support team
          </p>
        </div>
      </section>

    </main>
  )
}