"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LeadForm from "./lead-form";

export default function LeadPopup() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // ✅ mount check
  useEffect(() => {
    setMounted(true);
  }, []);

  // ✅ 25% scroll popup logic
  useEffect(() => {
    if (!mounted) return;

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

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mounted]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="popup-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
        >
          {/* ── BACKDROP ─────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(2, 6, 23, 0.82)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            }}
          />

          {/* ── MODAL ────────────────────────────────────── */}
          <motion.div
            key="popup-modal"
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 340, damping: 28 }}
            style={{
              position: "relative",
              zIndex: 10,
              width: "100%",
              maxWidth: 560,
              maxHeight: "90dvh",
              overflowY: "auto",
              borderRadius: 24,
              /* Gradient border via box-shadow + background clip trick */
              background: "linear-gradient(145deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.02) 100%)",
              border: "1px solid rgba(255,255,255,0.1)",
              boxShadow: `
                0 0 0 1px rgba(99,102,241,0.3),
                0 32px 80px rgba(0,0,0,0.6),
                0 0 60px rgba(79,70,229,0.12) inset
              `,
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            {/* Subtle top glow bar */}
            <div style={{
              position: "absolute",
              top: 0,
              left: "50%",
              transform: "translateX(-50%)",
              width: "60%",
              height: 1,
              background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.8), transparent)",
              borderRadius: "0 0 8px 8px",
            }} />

            {/* Inner content */}
            <div style={{ padding: "32px 32px 28px" }}>

              {/* ── CLOSE BUTTON ───────────────────────── */}
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  border: "1px solid rgba(255,255,255,0.12)",
                  backgroundColor: "rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.55)",
                  fontSize: 16,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.12)";
                  (e.currentTarget as HTMLElement).style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.06)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.55)";
                }}
              >
                ✕
              </button>

              {/* ── HEADER ─────────────────────────────── */}
              <div style={{ textAlign: "center", marginBottom: 28 }}>
                {/* Icon badge */}
                <div style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  background: "linear-gradient(135deg, #2563eb, #7c3aed)",
                  boxShadow: "0 8px 24px rgba(79,70,229,0.4)",
                  fontSize: 24,
                  marginBottom: 16,
                }}>
                  🚀
                </div>

                <h2 style={{
                  margin: "0 0 8px",
                  fontSize: "clamp(20px, 5vw, 26px)",
                  fontWeight: 800,
                  color: "#ffffff",
                  letterSpacing: "-0.03em",
                  lineHeight: 1.2,
                }}>
                 Turn WhatsApp Leads into Paying Customers Automatically
                </h2>

                <p style={{
                  margin: 0,
                  fontSize: 14,
                  color: "rgba(255,255,255,0.5)",
                  lineHeight: 1.5,
                }}>
Limited Time Offer: Flat 15% OFF on Setup 🎉                </p>

                {/* Separator */}
                <div style={{
                  width: 48,
                  height: 2,
                  background: "linear-gradient(90deg, #2563eb, #7c3aed)",
                  borderRadius: 2,
                  margin: "16px auto 0",
                }} />
              </div>

              {/* ── FORM ───────────────────────────────── */}
              <LeadForm
                source="popup"
                variant="dark"
                onSuccess={() => setOpen(false)}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}