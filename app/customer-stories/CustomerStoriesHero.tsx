"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  MessageCircle,
  Phone,
  RefreshCw,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

function useCountUp(target: number, duration = 1400, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(eased * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return value;
}

export default function CustomerStoriesHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const calls = useCountUp(12, 1400, mounted);
  const appts = useCountUp(4, 1400, mounted);

  return (
    <section className="relative overflow-hidden bg-white">
      {/* Premium background depth: soft white → blue tint */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1200px 600px at 85% -10%, rgba(59,130,246,0.10), transparent 60%), radial-gradient(900px 500px at 0% 100%, rgba(99,102,241,0.06), transparent 55%), linear-gradient(180deg, #ffffff 0%, #f8fbff 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-blue-200/60 to-transparent"
      />

      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
          {/* LEFT — copy */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-3 py-1 text-xs font-semibold tracking-wider text-blue-700">
              <Sparkles className="h-3.5 w-3.5" />
              CUSTOMER STORIES
            </div>

            <h1 className="mt-5 text-4xl font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-[3.5rem]">
              How Indian businesses are{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                winning back hours
              </span>{" "}
              with PixoraNest AI.
            </h1>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
              Real teams replacing manual lead handling, missed calls, and slow follow-ups with always-on AI — and the measurable results to prove it.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/book-demo"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-700 hover:shadow-blue-600/40"
              >
                Book Free Demo
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/solutions"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50"
              >
                View Solutions
              </Link>
            </div>

            {/* Trust row — logo-style placeholders */}
            <div className="mt-10 border-t border-slate-200/70 pt-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                Trusted by 100+ Indian businesses
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-3">
                {[
                  "REALTYCO",
                  "MEDIPLUS",
                  "EDUNEST",
                  "FINSARTHI",
                  "URBANSTAY",
                ].map((name) => (
                  <span
                    key={name}
                    className="text-sm font-bold tracking-[0.18em] text-slate-400/90 transition hover:text-slate-600"
                    style={{ fontFamily: "ui-sans-serif, system-ui" }}
                  >
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT — connected workflow */}
          <div className="relative mx-auto w-full max-w-[560px]">
            {/* ambient glow */}
            <div
              aria-hidden
              className="absolute -inset-10 -z-10 rounded-[3rem] bg-gradient-to-br from-blue-400/20 via-indigo-300/10 to-transparent blur-3xl"
            />

            {/* Connector SVG */}
            <svg
              aria-hidden
              viewBox="0 0 560 620"
              className="absolute inset-0 h-full w-full"
              fill="none"
            >
              <defs>
                <linearGradient id="flow" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="0.9" />
                </linearGradient>
                <filter id="dotGlow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="3" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                id="flowPath"
                d="M 110 110 C 200 150, 260 220, 290 300 S 360 480, 470 520"
                stroke="url(#flow)"
                strokeWidth="2"
                strokeDasharray="6 6"
                strokeLinecap="round"
                opacity="0.55"
              />
              <circle r="4.5" fill="#3b82f6" filter="url(#dotGlow)">
                <animateMotion dur="5.5s" repeatCount="indefinite" rotate="auto">
                  <mpath href="#flowPath" />
                </animateMotion>
              </circle>
            </svg>

            {/* Card 1 — WhatsApp (top-left) */}
            <article
              className="relative ml-0 w-[260px] rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-xl shadow-slate-900/[0.06] backdrop-blur card-in"
              style={{ animationDelay: "60ms", transform: "rotate(-1.5deg)" }}
            >
              <header className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
                    <MessageCircle className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-[11px] font-semibold text-slate-800">
                    WhatsApp Lead Auto
                  </span>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              </header>
              <div className="mt-3 space-y-1.5">
                <div className="msg-in max-w-[85%] rounded-xl rounded-bl-sm bg-slate-100 px-2.5 py-1.5 text-[10.5px] text-slate-700">
                  Hi, need 3BHK in Bandra
                </div>
                <div className="msg-out ml-auto max-w-[85%] rounded-xl rounded-br-sm bg-emerald-500 px-2.5 py-1.5 text-[10.5px] text-white">
                  Sure! Budget range?
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-1">
                <span className="chip-in rounded-full bg-blue-50 px-2 py-0.5 text-[9px] font-semibold text-blue-700">
                  AI replied · 12s
                </span>
                <span className="chip-in rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">
                  Qualified
                </span>
              </div>
            </article>

            {/* Card 2 — AI Voice (DOMINANT CENTERPIECE) */}
            <article
              className="relative z-20 mx-auto -mt-4 w-[92%] rounded-2xl border border-slate-200/80 bg-white p-5 shadow-2xl shadow-blue-900/[0.10] card-in"
              style={{ animationDelay: "180ms" }}
            >
              <header className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-md shadow-blue-500/30">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      AI Voice Agent
                    </p>
                    <p className="text-[10.5px] text-slate-500">
                      Inbound · multilingual
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-600">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-500" />
                  </span>
                  Live Call
                </span>
              </header>

              {/* Waveform */}
              <div className="mt-4 flex h-14 items-center justify-center gap-[3px] rounded-xl bg-gradient-to-b from-blue-50/70 to-white px-3">
                {Array.from({ length: 28 }).map((_, i) => (
                  <span
                    key={i}
                    className="wave-bar inline-block w-[3px] rounded-full bg-gradient-to-t from-blue-500 to-indigo-500"
                    style={{
                      animationDelay: `${i * 60}ms`,
                      height: `${20 + ((i * 13) % 60)}%`,
                    }}
                  />
                ))}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Calls handled
                  </p>
                  <p className="mt-0.5 text-xl font-bold tabular-nums text-slate-900">
                    {calls}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                    Booked today
                  </p>
                  <p className="mt-0.5 text-xl font-bold tabular-nums text-slate-900">
                    {appts}
                  </p>
                </div>
              </div>
            </article>

            {/* Bottom row — CRM + Dashboard */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              {/* Card 3 — CRM */}
              <article
                className="rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-xl shadow-slate-900/[0.05] card-in"
                style={{ animationDelay: "320ms", transform: "rotate(-1deg)" }}
              >
                <header className="flex items-center gap-2">
                  <span className="grid h-7 w-7 place-items-center rounded-lg bg-violet-50 text-violet-600">
                    <RefreshCw className="h-3.5 w-3.5 animate-[spin_6s_linear_infinite]" />
                  </span>
                  <span className="text-[11px] font-semibold text-slate-800">
                    CRM Sync
                  </span>
                </header>
                <ul className="mt-3 space-y-1.5">
                  <li className="row-in flex items-center gap-1.5 text-[10.5px] text-slate-700">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    Lead synced
                  </li>
                  <li className="row-in flex items-center gap-1.5 text-[10.5px] text-slate-700">
                    <CheckCircle2 className="h-3 w-3 text-emerald-500" />
                    Follow-up @ 6 PM
                  </li>
                </ul>
              </article>

              {/* Card 4 — Refined Dashboard */}
              <article
                className="rounded-2xl border border-slate-200/80 bg-white/95 p-4 shadow-xl shadow-slate-900/[0.05] card-in"
                style={{ animationDelay: "420ms", transform: "rotate(1deg)" }}
              >
                <header className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-lg bg-blue-50 text-blue-600">
                      <TrendingUp className="h-3.5 w-3.5" />
                    </span>
                    <span className="text-[11px] font-semibold text-slate-800">
                      Conversations
                    </span>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[9px] font-bold text-emerald-700">
                    +24%
                  </span>
                </header>

                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-lg font-bold tabular-nums text-slate-900">
                    1,284
                  </span>
                  <span className="text-[9.5px] text-slate-500">this week</span>
                </div>

                {/* Mini area chart */}
                <svg
                  viewBox="0 0 140 44"
                  className="mt-1 h-10 w-full"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0 34 L18 28 L34 30 L50 22 L68 24 L86 16 L104 18 L122 10 L140 6 L140 44 L0 44 Z"
                    fill="url(#areaFill)"
                  />
                  <path
                    d="M0 34 L18 28 L34 30 L50 22 L68 24 L86 16 L104 18 L122 10 L140 6"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="line-draw"
                  />
                </svg>
              </article>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(12px) rotate(0deg); }
          to   { opacity: 1; }
        }
        .card-in {
          opacity: 0;
          animation: cardIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes msgIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .msg-in { animation: msgIn 0.5s ease-out 0.5s both; }
        .msg-out { animation: msgIn 0.5s ease-out 0.95s both; }
        .chip-in { opacity: 0; animation: msgIn 0.5s ease-out 1.4s both; }
        .chip-in:nth-of-type(2) { animation-delay: 1.6s; }
        .row-in { opacity: 0; animation: msgIn 0.5s ease-out both; }
        .row-in:nth-child(1) { animation-delay: 0.8s; }
        .row-in:nth-child(2) { animation-delay: 1.1s; }

        @keyframes wave {
          0%, 100% { transform: scaleY(0.4); }
          50%      { transform: scaleY(1); }
        }
        .wave-bar {
          transform-origin: center;
          animation: wave 1.1s ease-in-out infinite;
        }

        @keyframes draw {
          from { stroke-dasharray: 300; stroke-dashoffset: 300; }
          to   { stroke-dasharray: 300; stroke-dashoffset: 0; }
        }
        .line-draw { animation: draw 1.6s ease-out 0.4s both; }
      `}</style>
    </section>
  );
}
