"use client";

import { useState } from "react";

const WA_ICON_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z";

const expectItems = [
  {
    icon: "🎯",
    title: "Personalized for your industry",
    desc: "Real Estate, Healthcare, Education, Hospitality — we demo your exact use case.",
  },
  {
    icon: "📞",
    title: "Live AI on your number",
    desc: "We call you from your own AI Receptionist so you hear exactly how it sounds.",
  },
  {
    icon: "💬",
    title: "WhatsApp automation shown live",
    desc: "We trigger a real LeadNest flow to your phone during the call.",
  },
  {
    icon: "💰",
    title: "Transparent pricing walkthrough",
    desc: "No hidden costs. We share everything — you decide with full clarity.",
  },
];

const miniStats = [
  { num: "500+", label: "Demos delivered" },
  { num: "30", label: "Minutes only" },
  { num: "₹0", label: "Zero cost" },
];

export default function BookingSection() {
  const [calLoaded, setCalLoaded] = useState(false);

  return (
    <section id="book-demo" className="scroll-mt-20">
      {/* Banner */}
      <div className="bg-[linear-gradient(135deg,rgba(37,99,235,0.12),rgba(10,15,30,0)_60%),#0F172A] border-t border-b border-white/[0.07] px-6 md:px-10 py-16 md:py-[72px]">
        <div className="max-w-[1060px] mx-auto flex flex-col md:flex-row justify-between items-start gap-10 md:gap-12 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold tracking-[0.12em] uppercase text-blue-400 mb-2.5">
              Free 30-Minute Demo
            </div>
            <h2
              className="text-[clamp(28px,4vw,46px)] font-extrabold tracking-tight leading-[1.2] mb-3"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              See AI Handle Your<br />Business — Live.
            </h2>
            <p className="text-slate-400 text-base leading-[1.7] max-w-[480px]">
              Pick a time below. Our specialist will demo the exact product for your industry — using your number, your script, your brand. No slides. No fluff.
            </p>
          </div>
          <div className="flex gap-8 md:gap-10 shrink-0">
            {miniStats.map((s) => (
              <div key={s.num} className="text-center">
                <span
                  className="block text-[36px] font-extrabold text-blue-400 leading-none"
                  style={{ fontFamily: "Sora, sans-serif" }}
                >
                  {s.num}
                </span>
                <span className="block text-xs text-slate-400 mt-1">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="bg-[#0A0F1E] px-6 md:px-10 py-16 md:py-20">
        <div className="max-w-[1060px] mx-auto grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-12 items-start">
          {/* Left panel */}
          <div>
            <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-slate-400 mb-5">
              What to expect
            </div>
            <div className="flex flex-col gap-5 mb-9">
              {expectItems.map((item) => (
                <div key={item.title} className="flex gap-3.5 items-start">
                  <div className="w-10 h-10 bg-[rgba(37,99,235,0.1)] border border-blue-500/20 rounded-xl flex items-center justify-center text-lg shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm font-semibold mb-1">{item.title}</div>
                    <div className="text-[13px] text-slate-400 leading-[1.55]">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-7">
              <div className="text-[11px] font-semibold tracking-[0.1em] uppercase text-slate-400 mb-3.5">
                Available on
              </div>
              {["Google Meet", "WhatsApp Video Call", "Phone Call"].map((m) => (
                <div key={m} className="flex items-center gap-2.5 text-[13px] text-slate-400 py-1.5">
                  <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full shrink-0" />
                  {m}
                </div>
              ))}
            </div>

            <div className="bg-[rgba(37,211,102,0.07)] border border-[rgba(37,211,102,0.18)] rounded-2xl px-4.5 py-4 flex items-center gap-3 mb-7">
              <span className="w-2 h-2 bg-[#25D366] rounded-full shrink-0 animate-[pulse-green_1.5s_ease-in-out_infinite]" />
              <div>
                <div className="text-[13px] font-semibold text-[#25D366]">Team is Online</div>
                <div className="text-xs text-slate-400 mt-0.5">Mon–Sat · 10 AM – 7 PM IST · Avg. response under 5 min</div>
              </div>
            </div>

            <div className="border-t border-white/[0.07] pt-6">
              <div className="text-[13px] text-slate-400 mb-3">
                Prefer to talk now instead of scheduling?
              </div>
              <a
                href="https://wa.me/919460686266?text=Hi%20PixoraNest!%20I%20am%20interested%20in%20a%20free%20AI%20demo%20for%20my%20business.%20%5BSource%3A%20Website%20-%20Book%20Section%5D"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-[#25D366] text-black font-bold text-sm px-5 py-3 rounded-full transition-all duration-200 hover:bg-[#20c45a] hover:-translate-y-px"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-black shrink-0">
                  <path d={WA_ICON_PATH} />
                </svg>
                Chat on WhatsApp Now
              </a>
            </div>
          </div>

          {/* Right panel: Cal.com embed */}
          <div className="bg-[#111827] border border-white/[0.07] rounded-3xl overflow-hidden">
            <div className="bg-[#1E293B] border-b border-white/[0.07] px-6 py-4 flex items-center gap-2.5 text-sm font-semibold text-slate-400">
              <span className="w-2 h-2 bg-[#25D366] rounded-full animate-[pulse-green_1.5s_ease-in-out_infinite]" />
              Select a date &amp; time
            </div>

            {!calLoaded && (
              <div className="flex flex-col items-center justify-center gap-3 py-20">
                <div className="w-9 h-9 border-[3px] border-white/[0.07] border-t-blue-400 rounded-full animate-spin" />
                <span className="text-[13px] text-slate-400">Loading available slots...</span>
              </div>
            )}

            <iframe
              src="https://cal.com/pixora-nest/demo?embed=true&theme=dark&hideEventTypeDetails=true&layout=month_view"
              title="Book a Demo with PixoraNest"
              onLoad={() => setCalLoaded(true)}
              className="w-full border-none block bg-transparent transition-opacity duration-300"
              style={{
                height: "640px",
                opacity: calLoaded ? 1 : 0,
                display: calLoaded ? "block" : "none",
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-green {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.6); }
          50% { box-shadow: 0 0 0 6px rgba(37, 211, 102, 0); }
        }
      `}</style>
    </section>
  );
}