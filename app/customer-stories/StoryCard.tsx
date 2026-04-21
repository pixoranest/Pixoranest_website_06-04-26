"use client";
// ─── StoryCard.tsx ────────────────────────────────────────────────────────────
//
// FIXES vs original:
//
// 1. REMOVED referrerPolicy="no-referrer" from <img> tags.
//    "no-referrer" suppresses the Referer header entirely. Unsplash's CDN
//    uses hotlink-protection that checks the Referer header — when it's
//    absent the CDN returns a 403, causing blank image areas.
//    Default browser referrer behavior (no attribute) sends the header
//    correctly and images load as expected.
//
// 2. REMOVED crossOrigin attribute from <img> tags.
//    crossOrigin="anonymous" was triggering CORS preflight requests that
//    Unsplash CDN doesn't always handle for image requests, causing
//    additional failures in some browsers.
//
// 3. useReveal() hook is safe — IntersectionObserver is only accessed
//    inside useEffect (client-only), never during SSR/pre-render.
//
// 4. ALL microdata attributes (itemScope, itemType, itemProp) removed.
//    These were contributing to Google Search Console Review schema errors.
//    No structured data = no invalid schema warnings.
//
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";

// ─── Category → Unsplash image pool ──────────────────────────────────────────
// All URLs are direct Unsplash CDN links — no fetch() required.
// These are baked into the static bundle at build time.
const CATEGORY_IMAGES: Record<string, string[]> = {
  "Real Estate": [
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=700&h=400&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=700&h=400&fit=crop&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&h=400&fit=crop&q=80",
  ],
  "Healthcare": [
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=700&h=400&fit=crop&q=80",
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&h=400&fit=crop&q=80",
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=700&h=400&fit=crop&q=80",
  ],
  "E-commerce": [
    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=700&h=400&fit=crop&q=80",
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&h=400&fit=crop&q=80",
    "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=700&h=400&fit=crop&q=80",
  ],
  "Finance": [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=700&h=400&fit=crop&q=80",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=700&h=400&fit=crop&q=80",
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=700&h=400&fit=crop&q=80",
  ],
  "Hospitality": [
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&h=400&fit=crop&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=700&h=400&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&h=400&fit=crop&q=80",
  ],
  "Logistics": [
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&h=400&fit=crop&q=80",
    "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=700&h=400&fit=crop&q=80",
    "https://images.unsplash.com/photo-1553413077-190dd305871c?w=700&h=400&fit=crop&q=80",
  ],
};

// Inline SVG fallback — used when Unsplash fails. No network request required.
const FALLBACK_SVG = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="700" height="400" viewBox="0 0 700 400">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#dbeafe"/>
      <stop offset="100%" style="stop-color:#e0e7ff"/>
    </linearGradient>
  </defs>
  <rect width="700" height="400" fill="url(#g)"/>
  <rect x="290" y="160" width="120" height="80" rx="12" fill="#bfdbfe" opacity="0.8"/>
  <circle cx="330" cy="185" r="18" fill="#93c5fd"/>
  <rect x="310" y="215" width="80" height="6" rx="3" fill="#93c5fd"/>
</svg>
`)}`;

function getStoryImage(category: string, id: number, fallback?: string): string {
  // If a custom image URL was provided and it's not a broken picsum link, use it
  if (fallback && !fallback.includes("picsum.photos")) return fallback;
  const pool = CATEGORY_IMAGES[category] ?? CATEGORY_IMAGES["Finance"];
  return pool[id % pool.length];
}

// ─── Types ────────────────────────────────────────────────────────────────────
export interface StoryMetric { value: string; label: string; }
export interface Story {
  id: number;
  company: string;
  logo: string;
  logoGradient: string;
  category: string;
  title: string;
  excerpt: string;
  image?: string;
  imageAlt?: string;
  metrics: StoryMetric[];
  author: string;
  role: string;
  featured: boolean;
  tag: string;
}

// ─── Card Image ───────────────────────────────────────────────────────────────
function CardImage({ src, alt }: { src: string; alt: string }) {
  const [loaded,  setLoaded]  = useState(false);
  const [errored, setErrored] = useState(false);

  const handleError = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      if (!errored) {
        setErrored(true);
        e.currentTarget.src = FALLBACK_SVG;
        setLoaded(true);
      }
    },
    [errored]
  );

  return (
    <>
      {/* Shimmer placeholder while image loads */}
      {!loaded && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0, zIndex: 1,
            background: "linear-gradient(90deg,rgba(219,234,254,0.6) 0%,rgba(186,230,253,0.8) 40%,rgba(219,234,254,0.6) 80%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.6s ease-in-out infinite",
          }}
        />
      )}
      {/*
        KEY FIX: No referrerPolicy or crossOrigin attributes.
        Unsplash CDN checks the Referer header for hotlink protection.
        referrerPolicy="no-referrer" strips that header → CDN returns 403.
        Without the attribute, browsers send the full Referer by default.
      */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={handleError}
        className="card-img-el"
        style={{
          position: "absolute", inset: 0,
          width: "100%", height: "100%",
          objectFit: "cover", display: "block", zIndex: 2,
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
      />
    </>
  );
}

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
// IntersectionObserver only runs on client (inside useEffect). Safe for SSR.
function useReveal() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1";
      el.style.transform = "none";
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          io.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}

// ─── StoryCard ────────────────────────────────────────────────────────────────
export default function StoryCard({ story }: { story: Story }) {
  const imageSrc = getStoryImage(story.category, story.id, story.image);
  const imageAlt = story.imageAlt ?? `${story.company} — ${story.tag} case study`;
  const ref      = useReveal();

  return (
    <>
      {/* REMOVED: itemScope itemType was not present here in original, kept clean */}
      <article
        ref={ref as React.RefObject<HTMLElement>}
        className="story-card"
        style={{
          opacity: 0,
          transform: "translateY(24px)",
          transition: "opacity 0.55s cubic-bezier(0.22,1,0.36,1), transform 0.55s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s, border-color 0.3s",
        }}
      >
        {/* Image */}
        <div className="story-card-img-wrap">
          <CardImage src={imageSrc} alt={imageAlt} />
          <div className="story-card-img-overlay"  aria-hidden="true" />
          <div className="story-card-cat-chip">
            <div className="story-card-cat-chip-logo" style={{ background: story.logoGradient }}>{story.logo}</div>
            <span className="story-card-cat-chip-name">{story.category}</span>
          </div>
          <span className="story-card-tag-badge">{story.tag}</span>
          {story.featured && <span className="story-card-featured-badge">★ Featured</span>}
        </div>

        {/* Body */}
        <div className="story-card-body">
          <div className="story-card-company-row">
            <div className="story-card-company-logo" style={{ background: story.logoGradient }}>{story.logo}</div>
            <span className="story-card-company-name">{story.company}</span>
          </div>
          <h3 className="story-card-title">{story.title}</h3>
          <p  className="story-card-excerpt">{story.excerpt}</p>

          <div role="list" aria-label="Key results" className="story-card-metrics">
            {story.metrics.map((m) => (
              <div key={m.label} role="listitem" className="story-card-metric">
                <strong className="story-card-metric-value">{m.value}</strong>
                <span   className="story-card-metric-label">{m.label}</span>
              </div>
            ))}
          </div>

          <div className="story-card-footer">
            <div className="story-card-author">
              <div className="story-card-author-avatar" style={{ background: story.logoGradient }}>{story.author[0]}</div>
              <div>
                <div className="story-card-author-name">{story.author}</div>
                <div className="story-card-author-role">{story.role}</div>
              </div>
            </div>
            {/* prefetch={false} prevents .txt route-segment 404s on static hosting */}
            <Link
              href="#"
              prefetch={false}
              aria-label={`Read full case study: ${story.title}`}
              className="story-card-link"
            >
              Read Case Study →
            </Link>
          </div>
        </div>
      </article>

      <style>{`
        @keyframes shimmer { 0% { background-position:200% 0; } 100% { background-position:-200% 0; } }

        .story-card {
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
          border-radius: 20px; overflow: hidden;
          border: 1px solid rgba(37,99,235,0.1);
          display: flex; flex-direction: column;
          box-shadow: 0 4px 16px rgba(37,99,235,0.05);
          cursor: default; height: 100%;
        }
        .story-card:hover {
          box-shadow: 0 22px 54px rgba(37,99,235,0.12);
          border-color: rgba(37,99,235,0.25);
          transform: translateY(-5px) !important;
        }

        .story-card-img-wrap { position: relative; height: 180px; overflow: hidden; background: linear-gradient(135deg,#dbeafe,#e0e7ff); flex-shrink: 0; }
        @media (min-width: 640px)  { .story-card-img-wrap { height: 200px; } }
        @media (min-width: 1024px) { .story-card-img-wrap { height: 210px; } }
        .story-card-img-wrap:hover .card-img-el { transform: scale(1.06); }

        .story-card-img-overlay  { position: absolute; inset: 0; z-index: 3; background: linear-gradient(180deg,transparent 35%,rgba(15,23,42,0.28)); pointer-events: none; }
        .story-card-cat-chip     { position: absolute; top: 10px; left: 10px; z-index: 4; display: flex; align-items: center; gap: 5px; background: rgba(255,255,255,0.9); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.6); border-radius: 100px; padding: 3px 8px 3px 5px; }
        .story-card-cat-chip-logo { width: 16px; height: 16px; border-radius: 5px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 900; font-size: 6px; flex-shrink: 0; }
        .story-card-cat-chip-name { font-size: 10px; font-weight: 700; color: #334155; }
        .story-card-tag-badge    { position: absolute; top: 10px; right: 10px; z-index: 4; background: rgba(37,99,235,0.88); color: #fff; font-size: 9px; font-weight: 700; padding: 3px 9px; border-radius: 100px; letter-spacing: 0.03em; }
        .story-card-featured-badge { position: absolute; bottom: 10px; left: 10px; z-index: 4; background: rgba(251,191,36,0.92); color: #78350f; font-size: 9px; font-weight: 800; padding: 3px 9px; border-radius: 100px; }

        .story-card-body { padding: 16px; display: flex; flex-direction: column; gap: 11px; flex: 1; }
        @media (min-width: 640px)  { .story-card-body { padding: 20px; gap: 13px; } }
        @media (min-width: 1024px) { .story-card-body { padding: 22px; } }

        .story-card-company-row  { display: flex; align-items: center; gap: 8px; }
        .story-card-company-logo { width: 28px; height: 28px; border-radius: 7px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 900; font-size: 9px; flex-shrink: 0; box-shadow: 0 2px 8px rgba(0,0,0,0.14); }
        @media (min-width: 640px) { .story-card-company-logo { width: 32px; height: 32px; border-radius: 8px; font-size: 10px; } }
        .story-card-company-name { font-weight: 800; font-size: 12px; color: #0f172a; }
        @media (min-width: 640px) { .story-card-company-name { font-size: 13px; } }

        .story-card-title   { font-size: 13px; font-weight: 800; line-height: 1.4; color: #0f172a; margin: 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        @media (min-width: 640px)  { .story-card-title { font-size: 14px; } }
        @media (min-width: 1024px) { .story-card-title { font-size: 15px; } }
        .story-card-excerpt { font-size: 12px; line-height: 1.6; color: #64748b; margin: 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        @media (min-width: 640px) { .story-card-excerpt { font-size: 13px; } }

        .story-card-metrics      { display: flex; gap: 6px; }
        @media (min-width: 640px) { .story-card-metrics { gap: 8px; } }
        .story-card-metric       { flex: 1; background: rgba(37,99,235,0.05); border: 1px solid rgba(37,99,235,0.1); border-radius: 10px; padding: 8px 5px; text-align: center; transition: background 0.2s, border-color 0.2s; min-width: 0; }
        @media (min-width: 640px) { .story-card-metric { padding: 10px 8px; } }
        .story-card-metric-value { display: block; font-size: 15px; font-weight: 900; color: #2563eb; line-height: 1; }
        @media (min-width: 640px) { .story-card-metric-value { font-size: 17px; } }
        .story-card-metric-label { display: block; font-size: 9px; color: #94a3b8; margin-top: 3px; font-weight: 700; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        @media (min-width: 640px) { .story-card-metric-label { font-size: 10px; } }

        .story-card-footer        { display: flex; align-items: center; justify-content: space-between; margin-top: auto; padding-top: 10px; border-top: 1px solid rgba(37,99,235,0.08); gap: 8px; flex-wrap: wrap; }
        @media (min-width: 640px)  { .story-card-footer { padding-top: 12px; flex-wrap: nowrap; } }
        .story-card-author        { display: flex; align-items: center; gap: 7px; min-width: 0; }
        .story-card-author-avatar { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 900; font-size: 10px; flex-shrink: 0; }
        @media (min-width: 640px) { .story-card-author-avatar { width: 30px; height: 30px; font-size: 11px; } }
        .story-card-author-name   { font-size: 11px; font-weight: 700; color: #0f172a; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        @media (min-width: 640px) { .story-card-author-name { font-size: 12px; } }
        .story-card-author-role   { font-size: 9px; color: #94a3b8; }
        @media (min-width: 640px) { .story-card-author-role { font-size: 10px; } }
        .story-card-link          { font-size: 11px; font-weight: 800; color: #2563eb; text-decoration: none; white-space: nowrap; transition: color 0.2s; flex-shrink: 0; }
        @media (min-width: 640px) { .story-card-link { font-size: 12px; } }
        .story-card-link:hover    { color: #1d4ed8; }

        @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
      `}</style>
    </>
  );
}