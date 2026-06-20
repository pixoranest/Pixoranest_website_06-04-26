"use client";

import { useReveal } from "./useReveal";

const steps = [
  {
    num: "01",
    title: "WhatsApp Us",
    desc: "Tell us your business type and biggest challenge. Takes 5 minutes.",
  },
  {
    num: "02",
    title: "Live Demo",
    desc: "We show you the AI working live — your number, your script, your brand.",
  },
  {
    num: "03",
    title: "We Set Up",
    desc: "Our team configures everything. Zero effort from your side.",
  },
  {
    num: "04",
    title: "Go Live",
    desc: "Your AI goes live in 72 hours or more — timeline depends on your automation scope.",
  },
];

function RevealCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, className: revealCls } = useReveal();
  return (
    <div ref={ref} className={`${revealCls} ${className}`}>
      {children}
    </div>
  );
}

export default function HowItWorks() {
  const eyebrow = useReveal();
  const title = useReveal();
  const sub1 = useReveal();
  const sub2 = useReveal();

  return (
    <section className="py-24 px-6 bg-[#111827] border-t border-b border-white/[0.07]">
      <div className="max-w-[1060px] mx-auto">
        <div ref={eyebrow.ref} className={`text-xs font-semibold tracking-[0.12em] uppercase text-blue-400 mb-4 ${eyebrow.className}`}>
          Simple Process
        </div>
        <h2
          ref={title.ref}
          className={`text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight leading-[1.2] mb-4 ${title.className}`}
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          Live in 72 Hours+
        </h2>
        <p ref={sub1.ref} className={`text-slate-400 text-[17px] max-w-[560px] leading-[1.7] mb-2 ${sub1.className}`}>
          Timeline depends on your automation complexity — simple setups go live faster, custom workflows take a bit longer.
        </p>
        <p ref={sub2.ref} className={`text-slate-400 text-[17px] max-w-[560px] leading-[1.7] mb-14 ${sub2.className}`}>
          No lengthy onboarding. No IT team required. Just results.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s) => (
            <RevealCard key={s.num} className="bg-[#111827] border border-white/[0.07] rounded-2xl px-6 py-7 text-center">
              <div
                className="text-[40px] font-extrabold text-[rgba(37,99,235,0.25)] leading-none mb-4"
                style={{ fontFamily: "Sora, sans-serif" }}
              >
                {s.num}
              </div>
              <div className="text-[15px] font-bold mb-2" style={{ fontFamily: "Sora, sans-serif" }}>
                {s.title}
              </div>
              <div className="text-[13px] text-slate-400 leading-[1.6]">{s.desc}</div>
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}