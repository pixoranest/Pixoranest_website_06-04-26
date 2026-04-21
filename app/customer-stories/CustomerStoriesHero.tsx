"use client";
// ─── CustomerStoriesHero.tsx ──────────────────────────────────────────────────
//
// MODIFICATIONS vs original:
// - Removed static floating result cards (4×, 60%, 5×, 97%)
// - Removed "Trusted by brands" logo strip
// - Added AI Automation Flow visualization on the right
// - Added floating AI/automation badges
// - Premium SaaS design (Stripe/Intercom inspired)
//
// PRESERVED:
// - Heading: "Real Businesses. Real Results."
// - Subtext + CTA buttons
// - Overall left/right layout
// - All SSR-safe patterns (no mounted guard, plain <style> tag, prefetch={false})
//
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────
interface FlowStep {
  id: number;
  icon: string;
  label: string;
  sublabel: string;
  color: string;
  glow: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const STATS = [
  { value: "500+", label: "Businesses",    icon: "🏢" },
  { value: "10M+", label: "Messages / mo", icon: "💬" },
  { value: "98%",  label: "Satisfaction",  icon: "⭐" },
  { value: "4.8×", label: "Avg ROI",       icon: "📈" },
];

const FLOW_STEPS: FlowStep[] = [
  { id: 0, icon: "📥", label: "Lead Captured",      sublabel: "via Website Form",       color: "#6366f1", glow: "rgba(99,102,241,0.35)"  },
  { id: 1, icon: "🧠", label: "AI Processing",      sublabel: "Intent & Scoring",       color: "#8b5cf6", glow: "rgba(139,92,246,0.35)"  },
  { id: 2, icon: "💬", label: "WhatsApp Automation", sublabel: "Auto-reply in 2s",       color: "#0ea5e9", glow: "rgba(14,165,233,0.35)"  },
  { id: 3, icon: "✅", label: "Conversion",          sublabel: "Deal Closed — ₹2.4L",    color: "#10b981", glow: "rgba(16,185,129,0.35)"  },
];

const FLOAT_BADGES = [
  { label: "AI Powered",        icon: "⚡", delay: "0s"   },
  { label: "24/7 Automation",   icon: "🔄", delay: "0.2s" },
  { label: "Instant Response",  icon: "⚡", delay: "0.4s" },
];

// ─── Animated flow connector ──────────────────────────────────────────────────
function FlowConnector({ active }: { active: boolean }) {
  return (
    <div className="flow-connector" aria-hidden="true">
      <div className="flow-connector-track">
        <div className={`flow-connector-fill${active ? " flow-connector-fill--active" : ""}`} />
      </div>
      {active && <div className="flow-connector-dot" />}
    </div>
  );
}

// ─── Lead card (step 0) ───────────────────────────────────────────────────────
function LeadCard({ visible }: { visible: boolean }) {
  return (
    <div className={`panel-card lead-card${visible ? " panel-card--visible" : ""}`}>
      <div className="panel-card-header">
        <span className="panel-card-icon" style={{ background: "linear-gradient(135deg,#6366f1,#818cf8)" }}>📥</span>
        <div>
          <div className="panel-card-title">New Lead</div>
          <div className="panel-card-sub">Just now · Website Form</div>
        </div>
        <span className="status-chip status-chip--blue">Incoming</span>
      </div>
      <div className="lead-fields">
        <div className="lead-field"><span className="lead-field-label">Name</span><span className="lead-field-val">Rahul Sharma</span></div>
        <div className="lead-field"><span className="lead-field-label">Phone</span><span className="lead-field-val">+91 98765 43210</span></div>
        <div className="lead-field"><span className="lead-field-label">Interest</span><span className="lead-field-val">3 BHK · Whitefield</span></div>
        <div className="lead-field"><span className="lead-field-label">Budget</span><span className="lead-field-val">₹90L – ₹1.2Cr</span></div>
      </div>
    </div>
  );
}

// ─── AI processing card (step 1) ──────────────────────────────────────────────
function AICard({ visible }: { visible: boolean }) {
  return (
    <div className={`panel-card ai-card${visible ? " panel-card--visible" : ""}`}>
      <div className="panel-card-header">
        <span className="panel-card-icon" style={{ background: "linear-gradient(135deg,#8b5cf6,#a78bfa)" }}>🧠</span>
        <div>
          <div className="panel-card-title">AI Processing</div>
          <div className="panel-card-sub">PixoraNest Engine</div>
        </div>
        <span className="status-chip status-chip--purple">Analysing</span>
      </div>
      <div className="ai-bars">
        {[
          { label: "Intent Score",    pct: "92%", color: "#6366f1" },
          { label: "Budget Match",    pct: "87%", color: "#8b5cf6" },
          { label: "Lead Quality",    pct: "95%", color: "#0ea5e9" },
        ].map((b) => (
          <div key={b.label} className="ai-bar-row">
            <div className="ai-bar-meta">
              <span className="ai-bar-label">{b.label}</span>
              <span className="ai-bar-pct" style={{ color: b.color }}>{b.pct}</span>
            </div>
            <div className="ai-bar-track">
              <div className="ai-bar-fill" style={{ width: visible ? b.pct : "0%", background: b.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── WhatsApp card (step 2) ───────────────────────────────────────────────────
function WhatsAppCard({ visible }: { visible: boolean }) {
  return (
    <div className={`panel-card wa-card${visible ? " panel-card--visible" : ""}`}>
      <div className="panel-card-header">
        <span className="panel-card-icon" style={{ background: "linear-gradient(135deg,#0ea5e9,#38bdf8)" }}>💬</span>
        <div>
          <div className="panel-card-title">WhatsApp Sent</div>
          <div className="panel-card-sub">Auto-reply · 2s after lead</div>
        </div>
        <span className="status-chip status-chip--green">Delivered ✓✓</span>
      </div>
      <div className="wa-bubble-wrap">
        <div className="wa-bubble">
          <p>Hi Rahul! 👋 Thanks for your interest in <strong>3 BHK homes in Whitefield</strong>.</p>
          <p>We have <strong>12 exclusive listings</strong> matching your budget of ₹90L–1.2Cr.</p>
          <p>Can I schedule a site visit for you this weekend? 🏡</p>
          <div className="wa-time">10:42 AM · ✓✓</div>
        </div>
      </div>
    </div>
  );
}

// ─── Conversion card (step 3) ─────────────────────────────────────────────────
function ConversionCard({ visible }: { visible: boolean }) {
  return (
    <div className={`panel-card conv-card${visible ? " panel-card--visible" : ""}`}>
      <div className="panel-card-header">
        <span className="panel-card-icon" style={{ background: "linear-gradient(135deg,#10b981,#34d399)" }}>✅</span>
        <div>
          <div className="panel-card-title">Deal Closed!</div>
          <div className="panel-card-sub">3h 24m from first message</div>
        </div>
        <span className="status-chip status-chip--emerald">Converted</span>
      </div>
      <div className="conv-body">
        <div className="conv-amount">₹2,40,000</div>
        <div className="conv-amount-label">Commission Earned</div>
        <div className="conv-tags">
          <span className="conv-tag">🏠 3 BHK · Whitefield</span>
          <span className="conv-tag">⚡ AI Automated</span>
          <span className="conv-tag">📱 WhatsApp</span>
        </div>
      </div>
    </div>
  );
}

// ─── Automation Flow Panel ────────────────────────────────────────────────────
function AutomationFlow() {
  const [activeStep, setActiveStep] = useState(-1);
  const [cycling, setCycling] = useState(false);

  useEffect(() => {
    // Initial run after 600ms
    const init = setTimeout(() => {
      setCycling(true);
    }, 600);
    return () => clearTimeout(init);
  }, []);

  useEffect(() => {
    if (!cycling) return;

    let step = 0;
    setActiveStep(0);

    const iv = setInterval(() => {
      step += 1;
      if (step > 3) {
        // pause then restart
        setActiveStep(-1);
        setTimeout(() => {
          step = 0;
          setActiveStep(0);
        }, 1200);
      } else {
        setActiveStep(step);
      }
    }, 1800);

    return () => clearInterval(iv);
  }, [cycling]);

  const panels = [
    <LeadCard       key="lead" visible={activeStep >= 0} />,
    <AICard         key="ai"   visible={activeStep >= 1} />,
    <WhatsAppCard   key="wa"   visible={activeStep >= 2} />,
    <ConversionCard key="conv" visible={activeStep >= 3} />,
  ];

  return (
    <div className="flow-root">
      {/* Floating badges */}
      <div className="float-badges">
        {FLOAT_BADGES.map((b) => (
          <div key={b.label} className="float-badge" style={{ animationDelay: b.delay }}>
            <span>{b.icon}</span> {b.label}
          </div>
        ))}
      </div>

      {/* Step pills */}
      <div className="flow-steps-row">
        {FLOW_STEPS.map((s, i) => (
          <div key={s.id} className={`flow-step${activeStep === i ? " flow-step--active" : ""}${activeStep > i ? " flow-step--done" : ""}`}
            style={{ "--step-color": s.color, "--step-glow": s.glow } as React.CSSProperties}>
            <div className="flow-step-icon">{activeStep > i ? "✓" : s.icon}</div>
            <div className="flow-step-label">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Connectors */}
      <div className="flow-connectors-row">
        {[0, 1, 2].map((i) => (
          <FlowConnector key={i} active={activeStep > i} />
        ))}
      </div>

      {/* Active panel */}
      <div className="flow-panel-wrap">
        {activeStep >= 0 && panels[Math.min(activeStep, 3)]}
      </div>

      {/* Replay hint */}
      <div className="flow-hint">
        <span className="flow-hint-dot" /> Automation loop replays every 8s
      </div>
    </div>
  );
}

// ─── Hero Component ───────────────────────────────────────────────────────────
export default function CustomerStoriesHero() {
  return (
    <section className="hero-section">
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

          {/* Stats grid */}
          <div className="hero-stats-wrap hero-anim hero-anim-4">
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

          {/* CTA Buttons */}
          <div className="hero-cta-row hero-anim hero-anim-5">
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

        {/* RIGHT: Automation Flow */}
        <div className="hero-right hero-anim hero-anim-2">
          <AutomationFlow />
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
        /* ─── Google Fonts ─────────────────────────────────────── */
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800;900&display=swap');

        .hero-section,
        .hero-section * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; }

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
        .hero-anim { opacity: 0; transform: translateY(24px); animation: heroFadeUp 0.65s cubic-bezier(0.22,1,0.36,1) forwards; }
        .hero-anim-1 { animation-delay: 0.05s; }
        .hero-anim-2 { animation-delay: 0.15s; }
        .hero-anim-3 { animation-delay: 0.25s; }
        .hero-anim-4 { animation-delay: 0.35s; }
        .hero-anim-5 { animation-delay: 0.45s; }
        @keyframes heroFadeUp { to { opacity: 1; transform: translateY(0); } }

        /* ─── Container ────────────────────────────────────────── */
        .hero-container {
          position: relative; z-index: 10;
          max-width: 1200px; margin: 0 auto;
          padding: 64px 16px 48px;
          display: flex; flex-direction: column; gap: 40px;
        }
        @media (min-width: 640px)  { .hero-container { padding: 72px 24px 56px; gap: 48px; } }
        @media (min-width: 900px)  { .hero-container { flex-direction: row; align-items: center; padding: 100px 32px 80px; gap: 64px; } }

        /* ─── Left Column ──────────────────────────────────────── */
        .hero-left { display: flex; flex-direction: column; gap: 20px; width: 100%; }
        @media (min-width: 640px) { .hero-left { gap: 24px; } }
        @media (min-width: 900px) { .hero-left { flex: 1 1 0; min-width: 0; gap: 24px; } }

        /* Badge */
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.85); border: 1px solid rgba(37,99,235,0.2); padding: 6px 12px 6px 8px; border-radius: 100px; font-size: 12px; font-weight: 700; color: #334155; backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); flex-wrap: wrap; width: fit-content; }
        .hero-badge-dot-wrap { position: relative; width: 14px; height: 14px; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .hero-badge-ring { position: absolute; inset: -3px; border-radius: 50%; border: 1.5px solid rgba(22,163,74,0.45); animation: liveRing 2s ease infinite; }
        .hero-badge-dot  { width: 8px; height: 8px; border-radius: 50%; background: #16a34a; }
        .hero-badge-pill { background: rgba(37,99,235,0.1); border: 1px solid rgba(37,99,235,0.2); color: #2563eb; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 100px; }

        /* Heading */
        .hero-heading          { margin: 0; font-size: clamp(30px,6vw,62px); font-weight: 900; line-height: 1.06; letter-spacing: -0.03em; color: #0f172a; }
        .hero-heading-line     { display: block; }
        .hero-heading-gradient { display: block; background: linear-gradient(100deg,#1d4ed8 0%,#7c3aed 50%,#0891b2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; background-size: 200%; animation: gShift 5s ease infinite; }

        /* Subtext */
        .hero-subtext { margin: 0; font-size: clamp(13px,1.6vw,15px); line-height: 1.8; color: #475569; max-width: 520px; }

        /* Stats */
        .hero-stats-wrap { background: rgba(255,255,255,0.82); border: 1px solid rgba(37,99,235,0.12); border-radius: 16px; overflow: hidden; backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px); }
        .hero-stats-grid { display: grid; grid-template-columns: repeat(2,1fr); }
        @media (min-width: 480px) { .hero-stats-grid { grid-template-columns: repeat(4,1fr); } }
        .hero-stat-cell  { display: flex; flex-direction: column; align-items: center; padding: 16px 8px; gap: 3px; border-right: 1px solid rgba(37,99,235,0.08); border-bottom: 1px solid rgba(37,99,235,0.08); }
        .hero-stat-cell:nth-child(2n) { border-right: none; }
        .hero-stat-cell:nth-child(3), .hero-stat-cell:nth-child(4) { border-bottom: none; }
        @media (min-width: 480px) {
          .hero-stat-cell            { border-bottom: none !important; }
          .hero-stat-cell:nth-child(2) { border-right: 1px solid rgba(37,99,235,0.08); }
          .hero-stat-cell:nth-child(3) { border-right: 1px solid rgba(37,99,235,0.08); }
          .hero-stat-cell:nth-child(4) { border-right: none; }
        }
        .hero-stat-icon  { font-size: 14px; }
        .hero-stat-value { font-size: 20px; font-weight: 900; color: #2563eb; line-height: 1; letter-spacing: -0.02em; }
        .hero-stat-label { font-size: 10px; color: #94a3b8; font-weight: 600; text-align: center; }

        /* CTA Buttons */
        .hero-cta-row     { display: flex; gap: 12px; flex-direction: column; }
        @media (min-width: 480px) { .hero-cta-row { flex-direction: row; flex-wrap: wrap; } }
        .hero-btn-primary { display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: linear-gradient(135deg,#1d4ed8,#3b82f6); color: #fff; padding: 14px 24px; border-radius: 12px; font-weight: 800; font-size: 14px; text-decoration: none; box-shadow: 0 8px 24px rgba(37,99,235,0.32); transition: transform 0.25s, box-shadow 0.25s; width: 100%; }
        @media (min-width: 480px) { .hero-btn-primary { width: auto; } }
        .hero-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 14px 36px rgba(37,99,235,0.42); }
        .hero-btn-secondary { display: inline-flex; align-items: center; justify-content: center; gap: 8px; background: rgba(255,255,255,0.8); color: #334155; padding: 14px 22px; border-radius: 12px; font-weight: 800; font-size: 14px; text-decoration: none; border: 1.5px solid rgba(37,99,235,0.2); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); transition: transform 0.25s, border-color 0.25s, color 0.25s; width: 100%; }
        @media (min-width: 480px) { .hero-btn-secondary { width: auto; } }
        .hero-btn-secondary:hover { transform: translateY(-2px); border-color: rgba(37,99,235,0.5); color: #2563eb; }

        /* ─── Right Column ─────────────────────────────────────── */
        .hero-right { width: 100%; }
        @media (min-width: 900px) { .hero-right { flex: 1 1 0; min-width: 0; } }

        /* ─── Automation Flow Root ─────────────────────────────── */
        .flow-root {
          background: rgba(255,255,255,0.72);
          border: 1px solid rgba(99,102,241,0.15);
          border-radius: 24px;
          padding: 20px 16px 16px;
          backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
          box-shadow: 0 24px 64px rgba(99,102,241,0.1), 0 2px 8px rgba(0,0,0,0.04);
          display: flex; flex-direction: column; gap: 14px;
          position: relative; overflow: hidden;
        }
        .flow-root::before {
          content: '';
          position: absolute; top: -60px; right: -60px;
          width: 200px; height: 200px; border-radius: 50%;
          background: radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        @media (min-width: 640px) { .flow-root { padding: 24px 20px 20px; gap: 16px; } }

        /* ─── Floating Badges ──────────────────────────────────── */
        .float-badges { display: flex; flex-wrap: wrap; gap: 8px; }
        .float-badge {
          display: inline-flex; align-items: center; gap: 6px;
          background: linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.08));
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 100px; padding: 5px 12px;
          font-size: 11px; font-weight: 700; color: #4f46e5;
          animation: badgePop 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
        }
        @keyframes badgePop { from { opacity:0; transform: scale(0.8); } to { opacity:1; transform: scale(1); } }

        /* ─── Flow Steps Row ───────────────────────────────────── */
        .flow-steps-row {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 4px;
        }
        .flow-step {
          display: flex; flex-direction: column; align-items: center; gap: 4px;
          padding: 10px 4px 8px;
          border-radius: 14px;
          border: 1.5px solid transparent;
          background: rgba(248,250,252,0.7);
          transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
          cursor: default;
        }
        .flow-step--active {
          background: rgba(255,255,255,0.95);
          border-color: var(--step-color);
          box-shadow: 0 0 0 3px var(--step-glow), 0 8px 20px rgba(0,0,0,0.06);
          transform: translateY(-3px);
        }
        .flow-step--done {
          background: rgba(255,255,255,0.9);
          border-color: rgba(16,185,129,0.4);
          box-shadow: 0 4px 12px rgba(16,185,129,0.08);
        }
        .flow-step-icon {
          width: 32px; height: 32px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px;
          background: rgba(248,250,252,1);
          border: 1.5px solid rgba(0,0,0,0.05);
          transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
        }
        .flow-step--active .flow-step-icon {
          background: var(--step-color);
          border-color: var(--step-color);
          box-shadow: 0 4px 12px var(--step-glow);
          animation: stepPulse 1.6s ease infinite;
        }
        .flow-step--done .flow-step-icon {
          background: #10b981; color: #fff; font-size: 13px;
          border-color: #10b981;
        }
        @keyframes stepPulse { 0%,100% { box-shadow: 0 4px 12px var(--step-glow); } 50% { box-shadow: 0 4px 24px var(--step-glow), 0 0 0 6px var(--step-glow); } }
        .flow-step-label { font-size: 9px; font-weight: 700; color: #64748b; text-align: center; line-height: 1.3; }
        .flow-step--active .flow-step-label { color: #0f172a; }
        .flow-step--done  .flow-step-label  { color: #10b981; }

        /* ─── Connectors ───────────────────────────────────────── */
        .flow-connectors-row {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 4px;
          padding: 0 12.5%;
          margin-top: -10px;
        }
        .flow-connector { display: flex; align-items: center; justify-content: center; position: relative; height: 12px; }
        .flow-connector-track { width: 100%; height: 2px; background: rgba(99,102,241,0.12); border-radius: 100px; overflow: hidden; position: relative; }
        .flow-connector-fill { height: 100%; width: 0%; background: linear-gradient(90deg,#6366f1,#0ea5e9); border-radius: 100px; transition: width 0.6s cubic-bezier(0.22,1,0.36,1); }
        .flow-connector-fill--active { width: 100%; }
        .flow-connector-dot { position: absolute; top: 50%; transform: translateY(-50%); width: 6px; height: 6px; border-radius: 50%; background: #6366f1; animation: dotSlide 0.6s cubic-bezier(0.22,1,0.36,1) forwards; box-shadow: 0 0 6px rgba(99,102,241,0.6); }
        @keyframes dotSlide { from { left: 0%; } to { left: calc(100% - 6px); } }

        /* ─── Panel Card ───────────────────────────────────────── */
        .flow-panel-wrap { min-height: 140px; }
        .panel-card {
          background: rgba(255,255,255,0.9);
          border: 1px solid rgba(99,102,241,0.12);
          border-radius: 18px;
          padding: 14px 16px;
          box-shadow: 0 8px 32px rgba(99,102,241,0.08), 0 2px 6px rgba(0,0,0,0.04);
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.5s cubic-bezier(0.22,1,0.36,1), transform 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .panel-card--visible { opacity: 1; transform: translateY(0); }
        .panel-card-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .panel-card-icon { width: 34px; height: 34px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 16px; flex-shrink: 0; }
        .panel-card-title { font-size: 13px; font-weight: 800; color: #0f172a; line-height: 1.2; }
        .panel-card-sub   { font-size: 10px; color: #94a3b8; margin-top: 1px; }

        /* Status chips */
        .status-chip { margin-left: auto; font-size: 9px; font-weight: 800; padding: 3px 8px; border-radius: 100px; flex-shrink: 0; }
        .status-chip--blue    { background: rgba(99,102,241,0.1);  color: #4f46e5; border: 1px solid rgba(99,102,241,0.2);  }
        .status-chip--purple  { background: rgba(139,92,246,0.1);  color: #7c3aed; border: 1px solid rgba(139,92,246,0.2);  }
        .status-chip--green   { background: rgba(14,165,233,0.1);  color: #0284c7; border: 1px solid rgba(14,165,233,0.2);  }
        .status-chip--emerald { background: rgba(16,185,129,0.1);  color: #059669; border: 1px solid rgba(16,185,129,0.2);  }

        /* ─── Lead Card ────────────────────────────────────────── */
        .lead-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 6px 12px; }
        .lead-field  { display: flex; flex-direction: column; gap: 1px; }
        .lead-field-label { font-size: 9px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; }
        .lead-field-val   { font-size: 12px; font-weight: 700; color: #1e293b; }

        /* ─── AI Card ──────────────────────────────────────────── */
        .ai-bars { display: flex; flex-direction: column; gap: 8px; }
        .ai-bar-row  { display: flex; flex-direction: column; gap: 3px; }
        .ai-bar-meta { display: flex; justify-content: space-between; align-items: center; }
        .ai-bar-label { font-size: 10px; font-weight: 600; color: #475569; }
        .ai-bar-pct   { font-size: 10px; font-weight: 800; }
        .ai-bar-track { height: 5px; background: rgba(99,102,241,0.08); border-radius: 100px; overflow: hidden; }
        .ai-bar-fill  { height: 100%; border-radius: 100px; transition: width 1.2s cubic-bezier(0.16,1,0.3,1); }

        /* ─── WhatsApp Card ────────────────────────────────────── */
        .wa-bubble-wrap { padding: 0 2px; }
        .wa-bubble {
          background: #dcfce7;
          border-radius: 4px 14px 14px 14px;
          padding: 10px 12px;
          font-size: 11.5px; line-height: 1.6; color: #1e293b;
          border: 1px solid rgba(22,163,74,0.12);
          position: relative;
        }
        .wa-bubble::before {
          content: ''; position: absolute; top: 0; left: -6px;
          border-width: 0 6px 8px 0; border-style: solid;
          border-color: transparent #dcfce7 transparent transparent;
        }
        .wa-bubble p { margin: 0 0 4px; }
        .wa-bubble p:last-of-type { margin-bottom: 6px; }
        .wa-time { font-size: 9px; color: #94a3b8; text-align: right; font-weight: 600; }

        /* ─── Conversion Card ──────────────────────────────────── */
        .conv-body    { text-align: center; padding: 6px 0 4px; }
        .conv-amount  { font-size: 32px; font-weight: 900; color: #059669; letter-spacing: -0.04em; line-height: 1; }
        .conv-amount-label { font-size: 10px; color: #94a3b8; font-weight: 600; margin: 4px 0 10px; }
        .conv-tags    { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; }
        .conv-tag     { font-size: 10px; font-weight: 700; color: #059669; background: rgba(16,185,129,0.08); border: 1px solid rgba(16,185,129,0.18); border-radius: 100px; padding: 3px 10px; }

        /* ─── Flow hint ────────────────────────────────────────── */
        .flow-hint      { display: flex; align-items: center; gap: 6px; font-size: 10px; color: #94a3b8; font-weight: 600; }
        .flow-hint-dot  { width: 6px; height: 6px; border-radius: 50%; background: #10b981; animation: liveRing 2s ease infinite; flex-shrink: 0; }

        /* ─── Wave ─────────────────────────────────────────────── */
        .hero-wave { position: relative; height: 60px; z-index: 10; pointer-events: none; margin-top: -20px; }

        /* ─── Keyframes ────────────────────────────────────────── */
        @keyframes liveRing { 0%,100% { transform:scale(1); opacity:0.8; } 50% { transform:scale(1.9); opacity:0; } }
        @keyframes gShift   { 0%,100% { background-position:0%; } 50% { background-position:100%; } }

        @media (prefers-reduced-motion: reduce) {
          .hero-anim, .panel-card { animation: none !important; opacity: 1; transform: none; transition: none; }
          .hero-badge-ring, .hero-heading-gradient, .float-badge { animation: none; }
          .flow-step--active .flow-step-icon { animation: none; }
          .flow-connector-fill { transition: none; }
          .ai-bar-fill { transition: none; }
        }
      `}</style>
    </section>
  );
}