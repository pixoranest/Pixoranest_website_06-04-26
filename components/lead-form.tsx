"use client";

import { useState } from "react";

export default function LeadForm({
  source = "home",
  onSuccess,
  variant = "light",
}: any) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    company: "",
    service: "",
    budget: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  const validatePhone = (phone: string) => {
    return /^[6-9]\d{9}$/.test(phone);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

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
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source }),
      });

      const message = `Hi PixoraNest, I'm interested 🚀

Name: ${form.name}
Phone: ${form.phone}
Service: ${form.service}`;

      window.open(
        `https://wa.me/919460686266?text=${encodeURIComponent(message)}`,
        "_blank"
      );

      if (onSuccess) onSuccess();

      setForm({
        name: "",
        phone: "",
        email: "",
        company: "",
        service: "",
        budget: "",
      });
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // ── Shared input style (dark variant — used in popup) ──────────────────
  const getInputStyle = (field: string): React.CSSProperties => ({
    width: "100%",
    padding: "13px 16px",
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 400,
    outline: "none",
    border: `1.5px solid ${focused === field ? "rgba(99,102,241,0.7)" : "rgba(255,255,255,0.1)"}`,
    backgroundColor: focused === field ? "rgba(99,102,241,0.08)" : "rgba(255,255,255,0.05)",
    color: "#ffffff",
    boxShadow: focused === field ? "0 0 0 3px rgba(99,102,241,0.18)" : "none",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
    appearance: "none" as any,
    WebkitAppearance: "none" as any,
  });

  const lightInputStyle = (field: string): React.CSSProperties => ({
    width: "100%",
    padding: "13px 16px",
    borderRadius: 12,
    fontSize: 14,
    fontWeight: 400,
    outline: "none",
    border: `1.5px solid ${focused === field ? "rgba(99,102,241,0.6)" : "#e2e8f0"}`,
    backgroundColor: focused === field ? "rgba(99,102,241,0.04)" : "#fff",
    color: "#0f172a",
    boxShadow: focused === field ? "0 0 0 3px rgba(99,102,241,0.15)" : "none",
    transition: "all 0.2s ease",
    boxSizing: "border-box",
    appearance: "none" as any,
    WebkitAppearance: "none" as any,
  });

  const isDark = variant === "dark";
  const inp = (field: string) => isDark ? getInputStyle(field) : lightInputStyle(field);

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: isDark ? "rgba(255,255,255,0.45)" : "#94a3b8",
    marginBottom: 10,
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 22 }}>

      {/* ── CONTACT DETAILS ─────────────────────────────── */}
      <div>
        <p style={labelStyle}>Contact Details</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {/* Full Name */}
          <input
            placeholder="Full Name *"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            onFocus={() => setFocused("name")}
            onBlur={() => setFocused(null)}
            style={inp("name")}
          />

          {/* WhatsApp */}
          <input
            placeholder="WhatsApp Number *"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            onFocus={() => setFocused("phone")}
            onBlur={() => setFocused(null)}
            style={inp("phone")}
          />

          {/* Email */}
          <input
            placeholder="Business Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            onFocus={() => setFocused("email")}
            onBlur={() => setFocused(null)}
            style={{ ...inp("email"), gridColumn: "1 / -1" }}
          />

          {/* Company */}
          <input
            placeholder="Company Name"
            value={form.company}
            onChange={(e) => setForm({ ...form, company: e.target.value })}
            onFocus={() => setFocused("company")}
            onBlur={() => setFocused(null)}
            style={{ ...inp("company"), gridColumn: "1 / -1" }}
          />
        </div>
      </div>

      {/* ── REQUIREMENT ─────────────────────────────────── */}
      <div>
        <p style={labelStyle}>Your Requirement</p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {/* Service — wrapper for custom arrow */}
          <div style={{ position: "relative" }}>
            <select
              value={form.service}
              onChange={(e) => setForm({ ...form, service: e.target.value })}
              onFocus={() => setFocused("service")}
              onBlur={() => setFocused(null)}
              style={{ ...inp("service"), cursor: "pointer", paddingRight: 36 }}
            >
              <option value="" style={{ color: "#000", background: "#fff" }}>Select service *</option>
              <option style={{ color: "#000", background: "#fff" }}>WhatsApp Automation</option>
              <option style={{ color: "#000", background: "#fff" }}>AI Calling Agent</option>
              <option style={{ color: "#000", background: "#fff" }}>AI Receptionist</option>
            </select>
            <span style={{
              position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
              pointerEvents: "none", color: isDark ? "rgba(255,255,255,0.4)" : "#94a3b8", fontSize: 10,
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
  <option value="" style={{ color: "#000", background: "#fff" }}>Select Budget</option>
  <option style={{ color: "#000", background: "#fff" }}>₹25,000 – ₹50,000</option>
  <option style={{ color: "#000", background: "#fff" }}>₹50,000 – ₹1,00,000</option>
  <option style={{ color: "#000", background: "#fff" }}>₹1,50,000 – ₹2,25,000</option>
  <option style={{ color: "#000", background: "#fff" }}>₹2,25,000+</option>
</select>
            <span style={{
              position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
              pointerEvents: "none", color: isDark ? "rgba(255,255,255,0.4)" : "#94a3b8", fontSize: 10,
            }}>▼</span>
          </div>
        </div>
      </div>

      {/* ── ERROR ───────────────────────────────────────── */}
      {error && (
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          backgroundColor: "rgba(239,68,68,0.12)",
          border: "1px solid rgba(239,68,68,0.3)",
          borderRadius: 10, padding: "10px 14px",
        }}>
          <span style={{ fontSize: 14 }}>⚠️</span>
          <p style={{ color: "#f87171", fontSize: 13, margin: 0 }}>{error}</p>
        </div>
      )}

      {/* ── CTA BUTTON ──────────────────────────────────── */}
      <button
        type="submit"
        disabled={loading}
        style={{
          width: "100%",
          padding: "15px 24px",
          borderRadius: 14,
          border: "none",
          background: loading
            ? "rgba(99,102,241,0.5)"
            : "linear-gradient(135deg, #2563eb 0%, #4f46e5 50%, #7c3aed 100%)",
          color: "#ffffff",
          fontSize: 15,
          fontWeight: 700,
          cursor: loading ? "not-allowed" : "pointer",
          boxShadow: loading ? "none" : "0 8px 32px rgba(79,70,229,0.4)",
          transition: "all 0.25s ease",
          letterSpacing: "0.01em",
          position: "relative",
          overflow: "hidden",
        }}
        onMouseEnter={(e) => {
          if (!loading) {
            (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(79,70,229,0.5)";
          }
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
          (e.currentTarget as HTMLElement).style.boxShadow = loading ? "none" : "0 8px 32px rgba(79,70,229,0.4)";
        }}
      >
        {loading ? (
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <span style={{
              width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)",
              borderTopColor: "#fff", borderRadius: "50%", display: "inline-block",
              animation: "spin 0.7s linear infinite",
            }} />
            Submitting...
          </span>
        ) : "Claim 15% Discount 🚀"}
      </button>

      {/* ── TRUST BADGE ─────────────────────────────────── */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
        <span style={{ fontSize: 13 }}>🔒</span>
        <p style={{
          fontSize: 11, fontWeight: 500, margin: 0,
          color: isDark ? "rgba(255,255,255,0.4)" : "#94a3b8",
          letterSpacing: "0.02em",
        }}>
          100% secure &nbsp;•&nbsp; No spam &nbsp;•&nbsp; Quick WhatsApp response
        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </form>
  );
}