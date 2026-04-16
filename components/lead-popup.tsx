"use client";

/**
 * lead-popup.tsx — Popup without framer-motion
 *
 * What changed from your original:
 *  1. Removed framer-motion entirely — saves ~45KB of JS
 *  2. Replaced with CSS transitions — identical visual result
 *  3. Scroll handler now uses { passive: true } — better mobile performance
 *  4. All styling, logic, and behavior is identical
 */

import { useEffect, useState } from "react";
import LeadForm from "./lead-form";

export default function LeadPopup() {
  const [open, setOpen]       = useState(false);
  const [visible, setVisible] = useState(false); // controls CSS fade-in after mount

  // ── Show popup at 25% scroll, once per session ────────────────────────────
  useEffect(() => {
    const alreadyShown = localStorage.getItem("lead_popup_shown");
    if (alreadyShown) return;

    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;

      if (scrollPercent >= 25) {
        setOpen(true);
        localStorage.setItem("lead_popup_shown", "true");
        window.removeEventListener("scroll", handleScroll);
      }
    };

    // passive: true tells browser this won't block scrolling — better performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Trigger CSS fade-in after popup mounts in DOM ─────────────────────────
  useEffect(() => {
    if (!open) return;
    // Small delay lets the DOM paint first, then CSS transition kicks in
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, [open]);

  // ── Close: fade out first, then unmount ───────────────────────────────────
  const handleClose = () => {
    setVisible(false);
    setTimeout(() => setOpen(false), 220); // match transition duration
  };

  // ── Close on Escape key ───────────────────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <>
      {/* ── CSS transitions (replaces framer-motion) ─────────────────────── */}
      <style>{`
        .popup-backdrop {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: center; justify-content: center;
          padding: 16px;
          opacity: 0;
          transition: opacity 0.22s ease;
        }
        .popup-backdrop.visible { opacity: 1; }

        .popup-overlay {
          position: absolute; inset: 0;
          background: rgba(2,6,23,0.82);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .popup-modal {
          position: relative; z-index: 10;
          width: 100%; max-width: 560px; max-height: 90dvh;
          overflow-y: auto; border-radius: 24px;
          background: linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow:
            0 0 0 1px rgba(99,102,241,0.3),
            0 32px 80px rgba(0,0,0,0.6),
            0 0 60px rgba(79,70,229,0.12) inset;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          transform: scale(0.93) translateY(24px);
          transition: transform 0.26s cubic-bezier(0.34,1.36,0.64,1), opacity 0.22s ease;
          opacity: 0;
        }
        .popup-backdrop.visible .popup-modal {
          transform: scale(1) translateY(0);
          opacity: 1;
        }

        .popup-close-btn {
          position: absolute; top: 16px; right: 16px;
          display: flex; align-items: center; justify-content: center;
          width: 32px; height: 32px; border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.55);
          font-size: 16px; cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        .popup-close-btn:hover {
          background: rgba(255,255,255,0.12);
          color: #fff;
        }
      `}</style>

      {/* ── BACKDROP ────────────────────────────────────────────────────────── */}
      <div className={`popup-backdrop${visible ? " visible" : ""}`}>

        {/* Clicking the dark overlay closes the popup */}
        <div className="popup-overlay" onClick={handleClose} aria-hidden="true" />

        {/* ── MODAL ─────────────────────────────────────────────────────────── */}
        <div className="popup-modal" role="dialog" aria-modal="true" aria-label="Get a free demo">

          {/* Subtle top glow bar */}
          <div style={{
            position:  "absolute",
            top:        0,
            left:      "50%",
            transform: "translateX(-50%)",
            width:     "60%",
            height:     1,
            background:"linear-gradient(90deg, transparent, rgba(139,92,246,0.8), transparent)",
            borderRadius: "0 0 8px 8px",
          }} />

          {/* ── INNER CONTENT ─────────────────────────────────────────────── */}
          <div style={{ padding: "32px 32px 28px" }}>

            {/* Close button */}
            <button
              onClick={handleClose}
              aria-label="Close popup"
              className="popup-close-btn"
            >
              ✕
            </button>

            {/* ── HEADER ──────────────────────────────────────────────────── */}
            <div style={{ textAlign: "center", marginBottom: 28 }}>

              {/* Icon badge */}
              <div style={{
                display:        "inline-flex",
                alignItems:     "center",
                justifyContent: "center",
                width:           52,
                height:          52,
                borderRadius:    16,
                background:     "linear-gradient(135deg, #2563eb, #7c3aed)",
                boxShadow:      "0 8px 24px rgba(79,70,229,0.4)",
                fontSize:        24,
                marginBottom:    16,
              }}>
                🚀
              </div>

              <h2 style={{
                margin:        "0 0 8px",
                fontSize:      "clamp(20px, 5vw, 26px)",
                fontWeight:     800,
                color:         "#ffffff",
                letterSpacing: "-0.03em",
                lineHeight:     1.2,
              }}>
                Turn WhatsApp Leads into Paying Customers Automatically
              </h2>

              <p style={{
                margin:      0,
                fontSize:    14,
                color:       "rgba(255,255,255,0.5)",
                lineHeight:   1.5,
              }}>
                Limited Time Offer: Flat 15% OFF on Setup 🎉
              </p>

              {/* Separator */}
              <div style={{
                width:        48,
                height:        2,
                background:   "linear-gradient(90deg, #2563eb, #7c3aed)",
                borderRadius:  2,
                margin:       "16px auto 0",
              }} />
            </div>

            {/* ── FORM ────────────────────────────────────────────────────── */}
            <LeadForm
              source="popup"
              variant="dark"
              onSuccess={handleClose}
            />

          </div>
        </div>
      </div>
    </>
  );
}