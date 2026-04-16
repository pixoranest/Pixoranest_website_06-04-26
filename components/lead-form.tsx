"use client";

/**
 * lead-form.tsx — Production-ready lead form
 *
 * What changed from your original:
 *  1. Submits to Web3Forms (works on static/Hostinger — your /api/lead was broken)
 *  2. reCAPTCHA v3 loads ONLY when user first touches the form (lazy)
 *  3. Removed the window resize listener — CSS grid handles mobile now
 *  4. All UI, colors, and fields are exactly the same
 */

import { useState, useRef, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormState {
  name: string;
  phone: string;
  email: string;
  company: string;
  service: string;
  budget: string;
}

interface Props {
  source?: string;
  onSuccess?: () => void;
  variant?: "light" | "dark";
}

// ─── Extend window for reCAPTCHA ──────────────────────────────────────────────
declare global {
  interface Window {
    grecaptcha: {
      ready: (cb: () => void) => void;
      execute: (key: string, opts: { action: string }) => Promise<string>;
    };
  }
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function LeadForm({
  source = "home",
  onSuccess,
  variant = "light",
}: Props) {
  // ── State ──────────────────────────────────────────────────────────────────
  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    email: "",
    company: "",
    service: "",
    budget: "",
  });
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [focused, setFocused]   = useState<string | null>(null);

  // ── reCAPTCHA lazy-load refs ───────────────────────────────────────────────
  const recaptchaLoaded = useRef(false);
  const recaptchaReady  = useRef(false);

  // ── Load reCAPTCHA only on first form interaction ──────────────────────────
  const loadRecaptcha = useCallback(() => {
    // If already loading or loaded — do nothing
    if (recaptchaLoaded.current) return;
    recaptchaLoaded.current = true;

    const key = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;
    if (!key) {
      // No key set — skip silently (won't block form submission)
      recaptchaReady.current = true;
      return;
    }

    const script   = document.createElement("script");
    script.src     = `https://www.google.com/recaptcha/api.js?render=${key}`;
    script.async   = true;
    script.defer   = true;
    script.onload  = () => {
      window.grecaptcha.ready(() => {
        recaptchaReady.current = true;
      });
    };
    document.body.appendChild(script);
  }, []);

  // ── Validation ────────────────────────────────────────────────────────────
  const validatePhone = (phone: string) => /^[6-9]\d{9}$/.test(phone);

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client-side validation
    if (!form.name || !form.phone || !form.service) {
      setError("Please fill required fields");
      return;
    }
    if (!validatePhone(form.phone)) {
      setError("Enter valid WhatsApp number");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // ── Step 1: Get reCAPTCHA token (if loaded) ──────────────────────────
      let recaptchaToken = "";
      const key = process.env.NEXT_PUBLIC_RECAPTCHA_KEY;

      if (key && recaptchaReady.current) {
        try {
          recaptchaToken = await window.grecaptcha.execute(key, {
            action: "lead_form",
          });
        } catch {
          // Don't block submission if reCAPTCHA fails
          recaptchaToken = "";
        }
      }

      // ── Step 2: Send to Web3Forms ─────────────────────────────────────────
      // Web3Forms works on static sites — no server needed.
      // Get your free access key at: https://web3forms.com
      // Add it to .env.local as: NEXT_PUBLIC_WEB3FORMS_KEY=your_key_here
      const web3FormsKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

      if (web3FormsKey) {
        const payload = {
          access_key:       web3FormsKey,
          name:             form.name,
          phone:            form.phone,
          email:            form.email || "Not provided",
          company:          form.company || "Not provided",
          service:          form.service,
          budget:           form.budget || "Not specified",
          source:           source,
          "g-recaptcha-response": recaptchaToken,
        };

        const res = await fetch("https://api.web3forms.com/submit", {
          method:  "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body:    JSON.stringify(payload),
        });

        const data = await res.json();
        if (!data.success) throw new Error(data.message || "Submission failed");
      }

      // ── Step 3: Open WhatsApp (same as before) ────────────────────────────
      const message = `Hi PixoraNest, I'm interested 🚀\n\nName: ${form.name}\nPhone: ${form.phone}\nService: ${form.service}`;
      window.open(
        `https://wa.me/919460686266?text=${encodeURIComponent(message)}`,
        "_blank"
      );

      // ── Step 4: Reset & close ─────────────────────────────────────────────
      if (onSuccess) onSuccess();
      setForm({ name: "", phone: "", email: "", company: "", service: "", budget: "" });

    } catch {
      setError("Something went wrong. Please try WhatsApp directly.");
    } finally {
      setLoading(false);
    }
  };

  // ── Helpers ───────────────────────────────────────────────────────────────
  const isDark = variant === "dark";

  const inp = (field: string): React.CSSProperties => ({
    width:           "100%",
    padding:         "13px 16px",
    borderRadius:    12,
    fontSize:        14,
    fontWeight:      400,
    outline:         "none",
    border:          `1.5px solid ${
      focused === field
        ? "rgba(99,102,241,0.6)"
        : isDark
        ? "rgba(255,255,255,0.1)"
        : "#e2e8f0"
    }`,
    backgroundColor:
      focused === field
        ? isDark ? "rgba(99,102,241,0.08)" : "rgba(99,102,241,0.04)"
        : isDark ? "rgba(255,255,255,0.05)" : "#fff",
    color:       isDark ? "#ffffff" : "#0f172a",
    boxShadow:   focused === field ? "0 0 0 3px rgba(99,102,241,0.15)" : "none",
    transition:  "all 0.2s ease",
    boxSizing:   "border-box",
    appearance:  "none" as React.CSSProperties["appearance"],
    WebkitAppearance: "none" as React.CSSProperties["WebkitAppearance"],
  });

  const labelStyle: React.CSSProperties = {
    display:       "block",
    fontSize:       11,
    fontWeight:     600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color:          isDark ? "rgba(255,255,255,0.45)" : "#94a3b8",
    marginBottom:   10,
  };

  // CSS grid — no JS needed for mobile detection
  const twoColGrid: React.CSSProperties = {
    display:             "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap:                 12,
  };

  const fullSpan: React.CSSProperties = {
    gridColumn: "1 / -1",
  };

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit}
      onFocus={loadRecaptcha}   /* ← reCAPTCHA loads on first interaction */
      style={{ display: "flex", flexDirection: "column", gap: 22 }}
    >
      {/* ── CONTACT DETAILS ─────────────────────────── */}
      <div>
        <p style={labelStyle}>Contact Details</p>
        <div style={twoColGrid}>

          <input
            placeholder="Full Name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused(null)}
            style={inp("name")}
          />

          <input
            placeholder="WhatsApp Number *"
            value={form.phone}
            inputMode="numeric"
            maxLength={10}
            onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "") })}
            onFocus={() => setFocused("phone")}
            onBlur={() => setFocused(null)}
            style={inp("phone")}
          />

          <input
            placeholder="Business Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused(null)}
            style={{ ...inp("email"), ...fullSpan }}
          />

          <input
            placeholder="Company Name"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            onFocus={() => setFocused("company")}
            onBlur={() => setFocused(null)}
            style={{ ...inp("company"), ...fullSpan }}
          />
        </div>
      </div>

      {/* ── REQUIREMENT ─────────────────────────────── */}
      <div>
        <p style={labelStyle}>Your Requirement</p>
        <div style={twoColGrid}>

          {/* Service */}
          <div style={{ position: "relative" }}>
            <select
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              onFocus={() => setFocused("service")}
              onBlur={() => setFocused(null)}
              style={{ ...inp("service"), cursor: "pointer", paddingRight: 36 }}
            >
              <option value="">Select service *</option>
              <option>WhatsApp Automation</option>
              <option>AI Calling Agent</option>
              <option>AI Receptionist</option>
            </select>
            <span style={{
              position:      "absolute",
              right:          12,
              top:           "50%",
              transform:     "translateY(-50%)",
              pointerEvents: "none",
              color:          isDark ? "rgba(255,255,255,0.4)" : "#94a3b8",
              fontSize:       10,
            }}>▼</span>
          </div>

          {/* Budget */}
          <div style={{ position: "relative" }}>
            <select
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
              onFocus={() => setFocused("budget")}
              onBlur={() => setFocused(null)}
              style={{ ...inp("budget"), cursor: "pointer", paddingRight: 36 }}
            >
              <option value="">Select Budget</option>
              <option>₹25,000 – ₹50,000</option>
              <option>₹50,000 – ₹1,00,000</option>
              <option>₹1,50,000 – ₹2,25,000</option>
              <option>₹2,25,000+</option>
            </select>
            <span style={{
              position:      "absolute",
              right:          12,
              top:           "50%",
              transform:     "translateY(-50%)",
              pointerEvents: "none",
              color:          isDark ? "rgba(255,255,255,0.4)" : "#94a3b8",
              fontSize:       10,
            }}>▼</span>
          </div>
        </div>
      </div>

      {/* ── ERROR ───────────────────────────────────── */}
      {error && (
        <div style={{
          display:         "flex",
          alignItems:      "center",
          gap:              8,
          backgroundColor: "rgba(239,68,68,0.12)",
          border:          "1px solid rgba(239,68,68,0.3)",
          borderRadius:     10,
          padding:         "10px 14px",
        }}>
          <span style={{ fontSize: 14 }}>⚠️</span>
          <p style={{ color: "#f87171", fontSize: 13, margin: 0 }}>{error}</p>
        </div>
      )}

      {/* ── CTA BUTTON ──────────────────────────────── */}
      <button
        type="submit"
        disabled={loading}
        style={{
          width:        "100%",
          padding:      "15px 24px",
          borderRadius:  14,
          border:        "none",
          background:    loading
            ? "rgba(99,102,241,0.5)"
            : "linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #7c3aed 100%)",
          color:         "#ffffff",
          fontSize:       15,
          fontWeight:     700,
          cursor:         loading ? "not-allowed" : "pointer",
          boxShadow:      loading ? "none" : "0 8px 32px rgba(79,70,229,0.4)",
          transition:    "all 0.25s ease",
          letterSpacing: "0.01em",
          position:      "relative",
          overflow:      "hidden",
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            (e.currentTarget as HTMLElement).style.transform  = "translateY(-1px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(79,70,229,0.5)";
          }
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform  = "translateY(0)";
          (e.currentTarget as HTMLElement).style.boxShadow = loading
            ? "none"
            : "0 8px 32px rgba(79,70,229,0.4)";
        }}
      >
        {loading ? (
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <span style={{
              width:          16,
              height:         16,
              border:        "2px solid rgba(255,255,255,0.3)",
              borderTopColor: "#fff",
              borderRadius:  "50%",
              display:       "inline-block",
              animation:     "spin 0.7s linear infinite",
            }} />
            Submitting...
          </span>
        ) : (
          "Claim 15% Discount 🚀"
        )}
      </button>

      {/* ── TRUST BADGE ─────────────────────────────── */}
      <div style={{
        display:        "flex",
        alignItems:     "center",
        justifyContent: "center",
        flexWrap:       "wrap",
        gap:             6,
        textAlign:      "center",
      }}>
        <span style={{ fontSize: 13 }}>🔒</span>
        <p style={{
          fontSize:      11,
          fontWeight:     500,
          margin:         0,
          color:          isDark ? "rgba(255,255,255,0.4)" : "#94a3b8",
          letterSpacing: "0.02em",
        }}>
          100% secure &nbsp;•&nbsp; No spam &nbsp;•&nbsp; Quick WhatsApp response
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </form>
  );
}