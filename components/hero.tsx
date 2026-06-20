"use client";

import { useEffect, useRef } from "react";

const WA_ICON_PATH =
  "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z";

const phrases = [
  "Hi! Main aapke business ke liye kya kar sakta hoon?",
  "Kya aap apni leads automate karna chahte hain?",
  "Free demo book karne ke liye 'DEMO' type karein.",
  "Aapka AI receptionist ready hai — 24/7.",
];

export default function Hero() {
  const textRef = useRef<HTMLSpanElement>(null);
  const stateRef = useRef({ pi: 0, ci: 0, typing: true, timer: 0 });

  useEffect(() => {
    const s = stateRef.current;
    let rafId: ReturnType<typeof setTimeout>;

    function typeNext() {
      const el = textRef.current;
      if (!el) return;
      const phrase = phrases[s.pi];
      if (s.typing) {
        el.textContent = phrase.slice(0, s.ci++);
        if (s.ci > phrase.length) {
          s.typing = false;
          rafId = setTimeout(typeNext, 1800);
          return;
        }
      } else {
        el.textContent = phrase.slice(0, s.ci--);
        if (s.ci < 0) {
          s.typing = true;
          s.pi = (s.pi + 1) % phrases.length;
          s.ci = 0;
          rafId = setTimeout(typeNext, 400);
          return;
        }
      }
      rafId = setTimeout(typeNext, s.typing ? 45 : 22);
    }

    typeNext();
    return () => clearTimeout(rafId);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center text-center px-6 pt-[120px] pb-20 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(37,99,235,0.15)_0%,transparent_70%)] -top-[100px] left-1/2 -translate-x-1/2" />
        <div className="absolute w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(37,211,102,0.08)_0%,transparent_70%)] bottom-0 right-[10%]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[rgba(37,211,102,0.1)] border border-[rgba(37,211,102,0.25)] text-[#25D366] text-[13px] font-semibold px-4 py-1.5 rounded-full mb-7">
          <span className="w-2 h-2 bg-[#25D366] rounded-full animate-[pulse-green_1.5s_ease-in-out_infinite]" />
          Live 24/7 — AI Agent Always Available
        </div>

        <h1
          className="text-[clamp(36px,6vw,68px)] font-extrabold leading-[1.1] tracking-[-2px] mb-6"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          Stop Losing Leads.<br />
          Let{" "}
          <span className="bg-gradient-to-br from-blue-300 to-blue-600 bg-clip-text text-transparent">
            AI Handle
          </span>{" "}
          Everything.
        </h1>

        <p className="text-[clamp(16px,2vw,20px)] text-slate-400 max-w-xl mx-auto mb-10 leading-[1.7]">
          PixoraNest automates your calls, WhatsApp follow-ups, and CRM — so your business never misses a lead, even at 2 AM.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
          <a
            href="https://wa.me/919460686266?text=Hi%20PixoraNest!%20I%20am%20interested%20in%20a%20free%20AI%20demo%20for%20my%20business.%20%5BSource%3A%20Website%20-%20Hero%5D"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#25D366] text-black font-bold text-base px-8 py-4 rounded-full transition-all duration-300 shadow-[0_0_32px_rgba(37,211,102,0.3)] hover:bg-[#20c45a] hover:-translate-y-0.5 hover:shadow-[0_0_48px_rgba(37,211,102,0.45)] w-full sm:w-auto justify-center"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-black shrink-0">
              <path d={WA_ICON_PATH} />
            </svg>
            Book Free Demo on WhatsApp
          </a>
          <a
            href="#book-demo"
            className="inline-flex items-center gap-2 bg-transparent text-[#F1F5F9] font-semibold text-[15px] px-7 py-4 rounded-full border border-white/[0.07] transition-all duration-300 hover:border-blue-400 hover:text-blue-400 w-full sm:w-auto justify-center"
          >
            📅 Book a Demo Call
          </a>
        </div>

        {/* Chat bubble */}
        <div className="inline-flex items-center gap-2.5 bg-[#111827] border border-white/[0.07] rounded-[16px_16px_16px_4px] px-[18px] py-3.5 mt-12 text-sm text-slate-400">
          <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#25D366] shrink-0">
            <path d={WA_ICON_PATH} />
          </svg>
          <span ref={textRef}>PixoraNest AI is typing</span>
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full animate-[typing_0.9s_ease-in-out_infinite]" />
            <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full animate-[typing_0.9s_ease-in-out_0.2s_infinite]" />
            <span className="w-1.5 h-1.5 bg-[#25D366] rounded-full animate-[typing_0.9s_ease-in-out_0.4s_infinite]" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-green {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.6); }
          50% { box-shadow: 0 0 0 6px rgba(37, 211, 102, 0); }
        }
        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-5px); opacity: 1; }
        }
      `}</style>
    </section>
  );
}