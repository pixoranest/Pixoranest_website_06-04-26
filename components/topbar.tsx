"use client";

import { MessageCircle, PhoneCall } from "lucide-react";

export default function TopBar() {
  return (
    <div className="w-full h-[44px] bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm shadow-md">

      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">

        {/* LEFT SIDE - URGENCY */}
        <div className="hidden md:flex items-center gap-3 font-medium">

          <span className="animate-pulse">
            🔥 Only Few Demo Slots Left Today
          </span>

          <span className="text-white/80">
            • Free AI Consultation
          </span>

        </div>

        {/* RIGHT SIDE - CTA */}
        <div className="flex items-center gap-3">

          {/* CALL CTA */}
          <a
            href="tel:+919460686266"
            className="hidden md:flex items-center gap-1 hover:underline font-semibold"
          >
            <PhoneCall size={14} />
            Call Now
          </a>

          {/* WHATSAPP CTA */}
          <a
            href="https://wa.me/919460686266"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-white text-blue-600 px-3 py-1 rounded-full text-xs font-semibold hover:scale-105 transition"
          >
            <MessageCircle size={14} />
            Chat Now
          </a>

          {/* DEMO BUTTON (MAIN CTA) */}
          <a
            href="https://wa.me/919460686266?text=Hi%20I%20want%20to%20book%20a%20free%20demo"
            target="_blank"
            className="bg-yellow-400 text-black px-3 py-1 rounded-full text-xs font-bold hover:scale-105 transition"
          >
            🚀 Book Demo
          </a>

        </div>

      </div>
    </div>
  );
}