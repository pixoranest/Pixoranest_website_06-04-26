"use client";

import { useReveal } from "./useReveal";

const WA_ICON_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z";

type Product = {
  tag: string;
  name: string;
  icon: string;
  desc: string;
  benefits: string[];
  featured?: boolean;
  iconBg?: string;
  iconBorder?: string;
  tagStyle?: string;
  ctaStyle?: string;
};

const products: Product[] = [
  {
    tag: "FirstVoice",
    name: "AI Receptionist",
    icon: "📞",
    desc: "Your business never sleeps. FirstVoice answers every call 24/7 — greeting callers, capturing details, and routing them instantly, just like a trained receptionist.",
    benefits: [
      "Zero missed calls — day, night, weekends",
      "AI qualifies the lead before transferring",
      "Saves ₹15,000+ per month vs hiring staff",
      "Hindi, English & regional language support",
      "Every call logged automatically in CRM",
    ],
  },
  {
    tag: "LeadNest",
    name: "WhatsApp Automation",
    icon: "💬",
    desc: "Turn every WhatsApp inquiry into a conversion. LeadNest auto-responds, qualifies, and nurtures leads — so your team only talks to people ready to buy.",
    benefits: [
      "Auto-reply within 60 seconds, 24/7",
      "Send brochures, price lists & demos automatically",
      "Broadcast to thousands of leads in one click",
      "Drip sequences that convert cold leads",
      "Multi-agent inbox — whole team in one number",
    ],
    featured: true,
    iconBg: "bg-[rgba(37,211,102,0.15)]",
    iconBorder: "border-[rgba(37,211,102,0.3)]",
    tagStyle: "bg-[rgba(37,211,102,0.12)] text-[#25D366]",
    ctaStyle:
      "bg-[rgba(37,211,102,0.15)] text-[#25D366] border-[rgba(37,211,102,0.3)] hover:bg-[rgba(37,211,102,0.25)] hover:border-[rgba(37,211,102,0.6)]",
  },
  {
    tag: "CallOrbit",
    name: "AI Call Routing",
    icon: "🔀",
    desc: "Stop callers from getting lost in your phone system. CallOrbit understands what they need and routes them to the right person — instantly, every time.",
    benefits: [
      "Zero hold-time frustration for customers",
      "Route by department, language or urgency",
      "Full call recording & analytics dashboard",
      "Works with any existing phone or SIM setup",
      "Overflow routing when team is unavailable",
    ],
  },
];

function RevealDiv({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { ref, className: revealCls } = useReveal();
  return (
    <div ref={ref} className={`${revealCls} ${className}`}>
      {children}
    </div>
  );
}

export default function Products() {
  const eyebrow = useReveal();
  const title = useReveal();
  const sub = useReveal();

  return (
    <section className="py-24 px-6" id="services">
      <div className="max-w-[1060px] mx-auto">
        <div
          ref={eyebrow.ref}
          className={`text-xs font-semibold tracking-[0.12em] uppercase text-blue-400 mb-4 ${eyebrow.className}`}
        >
          Our Products
        </div>
        <h2
          ref={title.ref}
          className={`text-[clamp(28px,4vw,44px)] font-extrabold tracking-tight leading-[1.2] mb-4 ${title.className}`}
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          3 AI Products.<br />One Mission — Zero Missed Leads.
        </h2>
        <p ref={sub.ref} className={`text-slate-400 text-[17px] max-w-[560px] leading-[1.7] ${sub.className}`}>
          Each product is purpose-built for Indian SMBs. No coding, no tech team. Go-live in 72 hours or more, depending on your automation scope.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-14">
          {products.map((p) => (
            <RevealDiv
              key={p.tag}
              className={`relative flex flex-col rounded-3xl p-8 border transition-all duration-300 overflow-hidden group ${
                p.featured
                  ? "border-[rgba(37,211,102,0.3)] bg-gradient-to-br from-[rgba(37,211,102,0.06)] to-[#111827] hover:border-[rgba(37,211,102,0.5)]"
                  : "border-white/[0.07] bg-[#111827] hover:border-blue-500/40 hover:-translate-y-1"
              }`}
            >
              {p.featured && (
                <span className="absolute top-5 right-5 bg-[#25D366] text-black text-[11px] font-bold px-3 py-1 rounded-full tracking-[0.04em]">
                  Most Popular
                </span>
              )}

              <div className="flex items-center gap-4 mb-5">
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 border ${
                    p.iconBg ?? "bg-[rgba(37,99,235,0.12)]"
                  } ${p.iconBorder ?? "border-blue-500/20"}`}
                >
                  {p.icon}
                </div>
                <div>
                  <span
                    className={`inline-block text-[11px] font-semibold tracking-[0.06em] px-2.5 py-0.5 rounded-full mb-1 ${
                      p.tagStyle ?? "bg-[rgba(37,99,235,0.15)] text-blue-400"
                    }`}
                  >
                    {p.tag}
                  </span>
                  <div
                    className="text-lg font-bold"
                    style={{ fontFamily: "Sora, sans-serif" }}
                  >
                    {p.name}
                  </div>
                </div>
              </div>

              <p className="text-slate-400 text-sm leading-[1.65] mb-5">{p.desc}</p>

              <div className="h-px bg-white/[0.07] my-0 mb-4" />

              <div className="text-[11px] font-semibold tracking-[0.08em] uppercase text-slate-400 mb-3">
                What you gain
              </div>
              <ul className="flex flex-col gap-2 mb-6 flex-1">
                {p.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-2 text-[13px] text-[#F1F5F9]">
                    <span className="text-[#25D366] font-bold text-[13px] mt-px shrink-0">✓</span>
                    {b}
                  </li>
                ))}
              </ul>

              <a
                href="#book-demo"
                className={`inline-block mt-auto px-5 py-2.5 rounded-full border text-[13px] font-semibold text-center transition-all duration-200 ${
                  p.ctaStyle ??
                  "bg-[rgba(37,99,235,0.1)] text-blue-400 border-blue-500/30 hover:bg-[rgba(37,99,235,0.2)] hover:border-blue-400/60"
                }`}
              >
                Book Demo for {p.tag} →
              </a>
            </RevealDiv>
          ))}
        </div>
      </div>
    </section>
  );
}