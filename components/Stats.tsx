"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { num: "90%", label: "Reduction in missed leads" },
  { num: "3×", label: "Faster lead response" },
  { num: "24/7", label: "AI always available" },
  { num: "72hrs+", label: "Go-live (automation dependent)" },
];

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`bg-[#111827] border-t border-b border-white/[0.07] px-6 md:px-10 py-8 transition-all duration-[550ms] ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-7"
      }`}
    >
      <div className="max-w-[960px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((s) => (
          <div key={s.num}>
            <div
              className="text-[32px] font-extrabold text-blue-400"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              {s.num}
            </div>
            <div className="text-[13px] text-slate-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}