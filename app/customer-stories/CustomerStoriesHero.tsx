"use client";
// ─── CustomerStoriesHero.tsx ──────────────────────────────────────────────────
//
// FIXES vs original:
//
// 1. REMOVED the `mounted` guard pattern entirely.
//    The pattern `if (!mounted) return <placeholder />` causes a guaranteed
//    hydration mismatch in `output: "export"`. Next.js pre-renders the
//    placeholder at build time, then React swaps in the real component on
//    hydration — React throws a warning and layout flashes.
//    This component uses NO browser-only APIs so the guard was never needed.
//
// 2. All CSS is in a plain <style>{`...`}</style> tag.
//    styled-jsx requires Babel. Next.js 16 App Router uses SWC — styled-jsx
//    blocks are silently stripped, injecting zero styles → blank page.
//
// 3. All <Link> components have prefetch={false}.
//    Without this, App Router tries to fetch route segment .txt/.rsc files
//    at runtime. These requests go to paths like /industries/xxx.txt and
//    return 404 on static hosting because Hostinger has no Next.js server.
//
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import Link from "next/link";

interface FloatingCard {
  company: string;
  logo: string;
  gradient: string;
  metric: string;
  label: string;
  tag: string;
}

const STATS = [
  { value: "500+", label: "Businesses",    icon: "🏢" },
  { value: "10M+", label: "Messages / mo", icon: "💬" },
  { value: "98%",  label: "Satisfaction",  icon: "⭐" },
  { value: "4.8×", label: "Avg ROI",       icon: "📈" },
];

const CARDS: FloatingCard[] = [
  { company: "NoBroker.com",     logo: "NB", gradient: "linear-gradient(135deg,#E53E3E,#FC8181)", metric: "4×",  label: "Clickthrough Rate", tag: "Real Estate" },
  { company: "Apollo Hospitals", logo: "AH", gradient: "linear-gradient(135deg,#2B6CB0,#63B3ED)", metric: "60%", label: "Wait Time Reduced",  tag: "Healthcare"  },
  { company: "Meesho",           logo: "ME", gradient: "linear-gradient(135deg,#805AD5,#B794F4)", metric: "5×",  label: "Lead Conversion",    tag: "E-commerce"  },
  { company: "HDFC Bank",        logo: "HB", gradient: "linear-gradient(135deg,#DD6B20,#F6AD55)", metric: "97%", label: "Query Accuracy",     tag: "Finance"     },
];

const TRUST_LOGOS = [
  { name: "NoBroker",  logo: "NB", gradient: "linear-gradient(135deg,#E53E3E,#FC8181)" },
  { name: "Apollo",    logo: "AH", gradient: "linear-gradient(135deg,#2B6CB0,#63B3ED)" },
  { name: "Meesho",    logo: "ME", gradient: "linear-gradient(135deg,#805AD5,#B794F4)" },
  { name: "HDFC",      logo: "HB", gradient: "linear-gradient(135deg,#DD6B20,#F6AD55)" },
  { name: "Zomato",    logo: "ZO", gradient: "linear-gradient(135deg,#C53030,#FC8181)" },
  { name: "Delhivery", logo: "DL", gradient: "linear-gradient(135deg,#276749,#68D391)" },
];

// ─── Floating card ────────────────────────────────────────────────────────────
function FloatingResultCard({ card, index }: { card: FloatingCard; index: number }) {
  const [barFill, setBarFill] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBarFill(true), 700 + index * 150);
    return () => clearTimeout(t);
  }, [index]);

  const pct           = ["82%", "74%", "90%", "70%"][index];
  const floatDuration = [1800, 2100, 1600, 2400][index];
  const floatDelay    = [0, 0.4, 0.8, 0.2][index];

  return (
    <div
      className="floating-card"
      style={{ animation: `floatY ${floatDuration}ms ease-in-out ${floatDelay}s infinite alternate` }}
    >
      <div className="floating-card-header">
        <div className="floating-card-logo" style={{ background: card.gradient }}>{card.logo}</div>
        <div className="floating-card-info">
          <div className="floating-card-company">{card.company}</div>
          <div className="floating-card-tag-sm">{card.tag}</div>
        </div>
        <span className="floating-card-verified">✓ Verified</span>
      </div>
      <div className="floating-card-metric-row">
        <span className="floating-card-metric">{card.metric}</span>
        <span className="floating-card-label">{card.label}</span>
      </div>
      <div className="floating-card-bar-row">
        <div className="floating-card-bar-track">
          <div className="floating-card-bar-fill" style={{ width: barFill ? pct : "0%" }} />
        </div>
        <span className="floating-card-pct">{pct}</span>
      </div>
    </div>
  );
}

// ─── Hero Component ───────────────────────────────────────────────────────────
export default function CustomerStoriesHero() {
  // NO mounted guard — it causes hydration mismatch in static export.
  // All animations start from opacity:0 via CSS, which is safe for SSR.

  return (
    <section className="hero-section">
      {/* Background layers */}
      <div className="hero-bg-gradient" aria-hidden="true" />
      <div className="hero-bg-grid"     aria-hidden="true" />

      <div className="hero-container">
        {/* LEFT: Text content */}
        <div className="hero-left">

          {/* Badge */}
          <div className="hero-anim hero-anim-1">
            <div className="hero-badge">
              <span className="hero-badge-dot-wrap">
                <span className="hero-badge-ring" />
                <span className="hero-badge-dot" />
              </span>
              Customer Success Stories
              <span className="hero-badge-pill">500+ Businesses</span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="hero-heading hero-anim hero-anim-2">
            <span className="hero-heading-line">Real Businesses.</span>
            <span className="hero-heading-gradient">Real Results.</span>
          </h1>

          {/* Subtext */}
          <p className="hero-subtext hero-anim hero-anim-3">
            Discover how industry leaders across India automate operations, capture 10× more leads, and
            deliver exceptional customer experiences with PixoraNest AI.
          </p>

          {/* Trust logos */}
          <div className="hero-anim hero-anim-4">
            <div className="hero-trust-label">Trusted by India&apos;s top brands</div>
            <div className="hero-trust-logos">
              {TRUST_LOGOS.map((b) => (
                <div key={b.name} className="hero-trust-chip">
                  <div className="hero-trust-chip-logo" style={{ background: b.gradient }}>{b.logo}</div>
                  <span className="hero-trust-chip-name">{b.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stats grid */}
          <div className="hero-stats-wrap hero-anim hero-anim-5">
            <div className="hero-stats-grid">
              {STATS.map((s) => (
                <div key={s.label} className="hero-stat-cell">
                  <span className="hero-stat-icon">{s.icon}</span>
                  <strong className="hero-stat-value">{s.value}</strong>
                  <span className="hero-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Buttons — prefetch={false} PREVENTS /industries/*.txt 404s */}
          <div className="hero-cta-row hero-anim hero-anim-6">
            <Link href="#stories" prefetch={false} className="hero-btn-primary">
              Explore Stories
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link href="/contact" prefetch={false} className="hero-btn-secondary">
              Book a Free Demo
            </Link>
          </div>
        </div>

        {/* RIGHT: Floating cards */}
        <div className="hero-right" aria-hidden="true">
          <div className="hero-cards-grid">
            {CARDS.map((card, i) => (
              <FloatingResultCard key={card.company} card={card} index={i} />
            ))}
          </div>

          <div className="hero-notif hero-notif-1">
            <span className="hero-notif-icon">🚀</span>
            <div>
              <div className="hero-notif-title">Lead Converted</div>
              <div className="hero-notif-sub">2 seconds after inquiry</div>
            </div>
          </div>

          <div className="hero-notif hero-notif-2">
            <span className="hero-notif-icon">💰</span>
            <div>
              <div className="hero-notif-title">Deal Closed — ₹2.4L</div>
              <div className="hero-notif-sub">MagicBricks · WhatsApp Bot</div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="hero-wave" aria-hidden="true">
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg"
          style={{ width: "100%", height: "100%", display: "block" }}>
          <path d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,15 1440,30 L1440,60 L0,60 Z" fill="rgba(219,234,254,0.4)" />
        </svg>
      </div>

      <style>{`
        /* ─── Hero Section ─────────────────────────────────────── */
        .hero-section {
          position: relative; width: 100%; overflow: hidden;
          background: linear-gradient(150deg,#eef4ff 0%,#f5f8ff 40%,#edf3ff 70%,#f0f4ff 100%);
        }
        .hero-bg-gradient {
          position: absolute; inset: 0; pointer-events: none;
          background:
            radial-gradient(ellipse 80% 60% at 8% 50%, rgba(219,234,254,0.95) 0%, transparent 55%),
            radial-gradient(ellipse 60% 50% at 90% 10%, rgba(186,230,253,0.7) 0%, transparent 55%),
            radial-gradient(ellipse 50% 50% at 60% 90%, rgba(224,231,255,0.6) 0%, transparent 50%);
        }
        .hero-bg-grid {
          position: absolute; inset: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(37,99,235,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(37,99,235,0.03) 1px, transparent 1px);
          background-size: 56px 56px;
          mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%);
          -webkit-mask-image: radial-gradient(ellipse 90% 90% at 50% 50%, black 20%, transparent 100%);
        }

        /* ─── Entrance animations ──────────────────────────────── */
        /* Starts at opacity:0 — safe for SSR, animates in on client */
        .hero-anim {
          opacity: 0;
          transform: translateY(24px);
          animation: heroFadeUp 0.6s cubic-bezier(0.22,1,0.36,1) forwards;
        }
        .hero-anim-1 { animation-delay: 0.0s; }
        .hero-anim-2 { animation-delay: 0.1s; }
        .hero-anim-3 { animation-delay: 0.2s; }
        .hero-anim-4 { animation-delay: 0.3s; }
        .hero-anim-5 { animation-delay: 0.4s; }
        .hero-anim-6 { animation-delay: 0.5s; }
        @keyframes heroFadeUp {
          to { opacity: 1; transform: translateY(0); }
        }

        /* ─── Floating card animations ─────────────────────────── */
        @keyframes floatY {
          from { transform: translateY(0px); }
          to   { transform: translateY(-6px); }
        }

        /* ─── Container ────────────────────────────────────────── */
        .hero-container {
          position: relative; z-index: 10;
          max-width: 1200px; margin: 0 auto;
          padding: 64px 16px 48px;
          display: flex; flex-direction: column; gap: 40px;
        }
        @media (min-width: 640px)  { .hero-container { padding: 72px 24px 56px; gap: 48px; } }
        @media (min-width: 900px)  { .hero-container { flex-direction: row; align-items: center; padding: 100px 32px; gap: 64px; } }

        /* ─── Left Column ──────────────────────────────────────── */
        .hero-left { display: flex; flex-direction: column; gap: 20px; width: 100%; }
        @media (min-width: 640px) { .hero-left { gap: 24px; } }
        @media (min-width: 900px) { .hero-left { flex: 1 1 0; min-width: 0; gap: 24px; } }

        /* Badge */
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(255,255,255,0.85); border: 1px solid rgba(37,99,235,0.2);
          padding: 6px 12px 6px 8px; border-radius: 100px;
          font-size: 12px; font-weight: 700; color: #334155;
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          flex-wrap: wrap; width: fit-content;
        }
        .hero-badge-dot-wrap { position: relative; width: 14px; height: 14px; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .hero-badge-ring    { position: absolute; inset: -3px; border-radius: 50%; border: 1.5px solid rgba(22,163,74,0.45); animation: liveRing 2s ease infinite; }
        .hero-badge-dot     { width: 8px; height: 8px; border-radius: 50%; background: #16a34a; }
        .hero-badge-pill    { background: rgba(37,99,235,0.1); border: 1px solid rgba(37,99,235,0.2); color: #2563eb; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 100px; }

        /* Heading */
        .hero-heading           { margin: 0; font-size: clamp(30px,6vw,62px); font-weight: 900; line-height: 1.06; letter-spacing: -0.03em; color: #0f172a; }
        .hero-heading-line      { display: block; }
        .hero-heading-gradient  { display: block; background: linear-gradient(100deg,#1d4ed8 0%,#7c3aed 50%,#0891b2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; background-size: 200%; animation: gShift 5s ease infinite; }

        /* Subtext */
        .hero-subtext { margin: 0; font-size: clamp(13px,1.6vw,15px); line-height: 1.8; color: #475569; max-width: 520px; }

        /* Trust logos */
        .hero-trust-label  { font-size: 10px; font-weight: 700; color: #94a3b8; margin-bottom: 8px; letter-spacing: 0.08em; text-transform: uppercase; }
        .hero-trust-logos  { display: flex; flex-wrap: wrap; gap: 6px; }
        .hero-trust-chip   { display: flex; align-items: center; gap: 5px; background: rgba(255,255,255,0.75); border: 1px solid rgba(37,99,235,0.1); border-radius: 100px; padding: 4px 10px 4px 5px; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); }
        .hero-trust-chip-logo { width: 18px; height: 18px; border-radius: 5px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 900; font-size: 7px; }
        .hero-trust-chip-name { font-size: 11px; font-weight: 700; color: #334155; }

        /* Stats */
        .hero-stats-wrap  { background: rgba(255,255,255,0.82); border: 1px solid rgba(37,99,235,0.12); border-radius: 16px; overflow: hidden; backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); }
        .hero-stats-grid  { display: grid; grid-template-columns: repeat(2,1fr); }
        @media (min-width: 480px) { .hero-stats-grid { grid-template-columns: repeat(4,1fr); } }
        .hero-stat-cell   { display: flex; flex-direction: column; align-items: center; padding: 16px 8px; gap: 3px; border-right: 1px solid rgba(37,99,235,0.08); border-bottom: 1px solid rgba(37,99,235,0.08); }
        .hero-stat-cell:nth-child(2n) { border-right: none; }
        .hero-stat-cell:nth-child(3), .hero-stat-cell:nth-child(4) { border-bottom: none; }
        @media (min-width: 480px) {
          .hero-stat-cell            { border-bottom: none !important; }
          .hero-stat-cell:nth-child(2) { border-right: 1px solid rgba(37,99,235,0.08); }
          .hero-stat-cell:nth-child(3) { border-right: 1px solid rgba(37,99,235,0.08); }
          .hero-stat-cell:nth-child(4) { border-right: none; }
        }
        .hero-stat-icon   { font-size: 14px; }
        .hero-stat-value  { font-size: 20px; font-weight: 900; color: #2563eb; line-height: 1; letter-spacing: -0.02em; }
        .hero-stat-label  { font-size: 10px; color: #94a3b8; font-weight: 600; text-align: center; }

        /* CTA Buttons */
        .hero-cta-row       { display: flex; gap: 12px; flex-direction: column; }
        @media (min-width: 480px) { .hero-cta-row { flex-direction: row; flex-wrap: wrap; } }
        .hero-btn-primary   { display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: linear-gradient(135deg,#1d4ed8,#3b82f6); color: #fff; padding: 14px 24px; border-radius: 12px; font-weight: 800; font-size: 14px; text-decoration: none; box-shadow: 0 8px 24px rgba(37,99,235,0.32); transition: transform 0.25s, box-shadow 0.25s; width: 100%; }
        @media (min-width: 480px) { .hero-btn-primary { width: auto; } }
        .hero-btn-primary:hover  { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(37,99,235,0.42); }
        .hero-btn-secondary { display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: rgba(255,255,255,0.8); color: #334155; padding: 14px 22px; border-radius: 12px; font-weight: 800; font-size: 14px; text-decoration: none; border: 1.5px solid rgba(37,99,235,0.2); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); transition: transform 0.25s, border-color 0.25s, color 0.25s; width: 100%; }
        @media (min-width: 480px) { .hero-btn-secondary { width: auto; } }
        .hero-btn-secondary:hover { transform: translateY(-2px); border-color: rgba(37,99,235,0.5); color: #2563eb; }

        /* ─── Right Column ─────────────────────────────────────── */
        .hero-right       { display: flex; flex-direction: column; gap: 12px; width: 100%; }
        @media (min-width: 900px) { .hero-right { flex: 1 1 0; min-width: 0; } }
        .hero-cards-grid  { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; width: 100%; }
        @media (min-width: 640px) { .hero-cards-grid { gap: 12px; } }

        /* Floating card */
        .floating-card         { background: rgba(255,255,255,0.85); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border: 1px solid rgba(37,99,235,0.13); border-radius: 16px; padding: 14px; box-shadow: 0 12px 40px rgba(37,99,235,0.08), 0 2px 6px rgba(0,0,0,0.04); }
        @media (min-width: 640px) { .floating-card { padding: 16px 18px; border-radius: 18px; } }
        .floating-card-header  { display: flex; align-items: center; gap: 7px; margin-bottom: 10px; flex-wrap: wrap; }
        .floating-card-logo    { width: 28px; height: 28px; border-radius: 7px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 900; font-size: 9px; flex-shrink: 0; }
        @media (min-width: 640px) { .floating-card-logo { width: 32px; height: 32px; border-radius: 8px; font-size: 10px; } }
        .floating-card-info    { flex: 1; min-width: 0; }
        .floating-card-company { font-weight: 800; font-size: 11px; color: #0f172a; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        @media (min-width: 640px) { .floating-card-company { font-size: 12px; } }
        .floating-card-tag-sm  { font-size: 9px; color: #94a3b8; }
        .floating-card-verified { font-size: 8px; font-weight: 700; color: #16a34a; background: rgba(22,163,74,0.09); border: 1px solid rgba(22,163,74,0.2); border-radius: 100px; padding: 2px 6px; flex-shrink: 0; }
        @media (min-width: 640px) { .floating-card-verified { font-size: 9px; padding: 2px 7px; } }
        .floating-card-metric-row { display: flex; align-items: baseline; gap: 6px; margin-bottom: 8px; }
        .floating-card-metric  { font-size: 28px; font-weight: 900; color: #2563eb; letter-spacing: -0.04em; line-height: 1; }
        @media (min-width: 640px) { .floating-card-metric { font-size: 36px; } }
        .floating-card-label   { font-size: 11px; color: #64748b; font-weight: 600; line-height: 1.3; }
        .floating-card-bar-row { display: flex; align-items: center; gap: 6px; }
        .floating-card-bar-track { flex: 1; height: 4px; background: rgba(37,99,235,0.1); border-radius: 100px; overflow: hidden; }
        .floating-card-bar-fill  { height: 100%; background: linear-gradient(90deg,#1d4ed8,#3b82f6,#0891b2); border-radius: 100px; transition: width 1.4s cubic-bezier(0.16,1,0.3,1); }
        .floating-card-pct     { font-size: 10px; font-weight: 800; color: #2563eb; }

        /* Notification badges */
        .hero-notif   { display: flex; align-items: center; gap: 9px; background: rgba(255,255,255,0.9); backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); border: 1px solid rgba(37,99,235,0.12); border-radius: 12px; padding: 9px 14px; box-shadow: 0 8px 24px rgba(37,99,235,0.1); max-width: 280px; opacity: 0; animation: heroFadeUp 0.5s cubic-bezier(0.22,1,0.36,1) forwards; }
        .hero-notif-1 { animation-delay: 1.2s; }
        .hero-notif-2 { animation-delay: 1.7s; }
        .hero-notif-icon  { font-size: 18px; }
        .hero-notif-title { font-size: 12px; font-weight: 700; color: #0f172a; }
        .hero-notif-sub   { font-size: 10px; color: #94a3b8; margin-top: 1px; }

        /* Wave */
        .hero-wave { position: relative; height: 60px; z-index: 10; pointer-events: none; margin-top: -20px; }

        /* ─── Keyframes ────────────────────────────────────────── */
        @keyframes liveRing { 0%,100% { transform:scale(1); opacity:0.8; } 50% { transform:scale(1.9); opacity:0; } }
        @keyframes gShift   { 0%,100% { background-position:0%; } 50% { background-position:100%; } }

        @media (prefers-reduced-motion: reduce) {
          .hero-anim, .hero-notif, .floating-card { animation: none !important; opacity: 1; transform: none; }
          .hero-badge-ring, .hero-heading-gradient { animation: none; }
        }
      `}</style>
    </section>
  );
}