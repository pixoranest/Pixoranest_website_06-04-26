"use client";

import React from "react";

export interface StoryCardProps {
  industry: string;
  industryIcon: string;
  businessType: string;
  challenge: string;
  solution: string;
  solutionTag: string;
  results: string[];
  before: string;
  after: string;
  accentColor?: string; // retained for API compatibility; not used for styling
}

export default function StoryCard({
  industry,
  industryIcon,
  businessType,
  challenge,
  solution,
  solutionTag,
  results,
  before,
  after,
}: StoryCardProps) {
  return (
    <article className="group flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden">
      {/* Brand accent bar */}
      <div className="h-0.5 w-full bg-blue-600" />

      <div className="flex flex-col flex-1 p-6 lg:p-7">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl">
              {industryIcon}
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                {industry}
              </p>
              <p className="text-sm font-semibold text-slate-800 leading-snug">
                {businessType}
              </p>
            </div>
          </div>
          <span className="shrink-0 rounded-full border border-blue-100 bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-700">
            {solutionTag}
          </span>
        </div>

        {/* ── Challenge ──────────────────────────────────────────────── */}
        <div className="mb-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Challenge
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">{challenge}</p>
        </div>

        {/* ── Solution ───────────────────────────────────────────────── */}
        <div className="mb-5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1.5">
            Solution
          </p>
          <p className="text-sm font-medium text-slate-700 leading-relaxed">
            {solution}
          </p>
        </div>

        {/* ── Results ────────────────────────────────────────────────── */}
        <div className="mb-5">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
            Results
          </p>
          <ul className="grid grid-cols-2 gap-2">
            {results.map((result) => (
              <li
                key={result}
                className="flex items-start gap-1.5 text-sm font-semibold text-slate-800"
              >
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {result}
              </li>
            ))}
          </ul>
        </div>

        {/* ── Before / After ─────────────────────────────────────────── */}
        <div className="mt-auto grid grid-cols-2 gap-3 pt-4 border-t border-slate-100">
          <div className="rounded-xl border border-red-100 bg-red-50 p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-red-400 mb-1">
              Before
            </p>
            <p className="text-xs font-medium leading-snug text-red-700">
              {before}
            </p>
          </div>
          <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-3">
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 mb-1">
              After
            </p>
            <p className="text-xs font-medium leading-snug text-emerald-700">
              {after}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}