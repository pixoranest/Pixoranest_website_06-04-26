"use client";

import { useReveal } from "./useReveal";

const reasons = [
  {
    icon: "🇮🇳",
    title: "Built for India",
    desc: "Hindi, English, and regional language support. GST-compliant billing. Understands Indian business culture.",
  },
  {
    icon: "⚡",
    title: "72-Hour Go-Live",
    desc: "From sign-up to a fully working AI system in 72 hours or more — actual timeline depends on your automation complexity. Simple setups go faster.",
  },
  {
    icon: "🔧",
    title: "Zero Technical Skills Needed",
    desc: "We handle all setup and training. Your team doesn't need to know anything technical.",
  },
  {
    icon: "💬",
    title: "WhatsApp-First Support",
    desc: "Our team is available on WhatsApp — same platform your customers use. Fast, personal, and human.",
  },
  {
    icon: "📈",
    title: "Pay for Results",
    desc: "Transparent pricing. No hidden charges. Foundation Plan includes a dedicated account manager.",
  },
  {
    icon: "🔐",
    title: "Your Data is Safe",
    desc: "All data stored securely on Indian servers. WhatsApp Business API officially verified.",
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

export default function WhyUs() {
  const eyebrow = useReveal();
  const title = useReveal();

  return (
    <section className="py-24 px-6 bg-[#111827] border-t border-b border-white/[0.07]">
      <div className="max-w-[1060px] mx-auto">
        <div ref={eyebrow.ref} className={`text-xs font-semibold tracking-[0.12em] uppercase text-blue-400 mb-4 ${eyebrow.className}`}>
          Why PixoraNest
        </div>
        <h2
          ref={title.ref}
          className={`text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight leading-[1.2] mb-12 ${title.className}`}
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          Not Just a Tool.<br />Your AI Growth Partner.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r) => (
            <RevealCard
              key={r.title}
              className="bg-[#111827] border border-white/[0.07] rounded-2xl p-7"
            >
              <div className="text-[28px] mb-3.5">{r.icon}</div>
              <div className="text-base font-bold mb-2" style={{ fontFamily: "Sora, sans-serif" }}>
                {r.title}
              </div>
              <div className="text-sm text-slate-400 leading-[1.65]">{r.desc}</div>
            </RevealCard>
          ))}
        </div>
      </div>
    </section>
  );
}