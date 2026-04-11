"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

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
  if (fallback && !fallback.includes("picsum.photos")) return fallback;
  const pool = CATEGORY_IMAGES[category] ?? CATEGORY_IMAGES["Finance"];
  return pool[id % pool.length];
}

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

function CardImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const handleError = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    if (!errored) {
      setErrored(true);
      e.currentTarget.src = FALLBACK_SVG;
      setLoaded(true);
    }
  }, [errored]);

  return (
    <>
      {!loaded && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg,rgba(219,234,254,0.6) 0%,rgba(186,230,253,0.8) 40%,rgba(219,234,254,0.6) 80%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.6s ease-in-out infinite",
            zIndex: 1,
          }}
        />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)}
        onError={handleError}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          zIndex: 2,
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}
        className="card-img-el"
      />
    </>
  );
}

export default function StoryCard({ story }: { story: Story }) {
  const imageSrc = getStoryImage(story.category, story.id, story.image);
  const imageAlt = story.imageAlt ?? `${story.company} — ${story.tag} case study`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      style={{
        background: "rgba(255,255,255,0.75)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderRadius: "20px",
        overflow: "hidden",
        border: "1px solid rgba(37,99,235,0.1)",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 4px 16px rgba(37,99,235,0.05)",
        transition: "box-shadow 0.3s, border-color 0.3s",
        cursor: "default",
      }}
      onHoverStart={(e) => {
        (e.target as HTMLElement).closest("article")!.style.boxShadow = "0 22px 54px rgba(37,99,235,0.12)";
        (e.target as HTMLElement).closest("article")!.style.borderColor = "rgba(37,99,235,0.25)";
      }}
      onHoverEnd={(e) => {
        const el = (e.target as HTMLElement).closest("article");
        if (el) {
          el.style.boxShadow = "0 4px 16px rgba(37,99,235,0.05)";
          el.style.borderColor = "rgba(37,99,235,0.1)";
        }
      }}
    >
      <div
        style={{
          position: "relative",
          height: "210px",
          overflow: "hidden",
          background: "linear-gradient(135deg,#dbeafe,#e0e7ff)",
          flexShrink: 0,
        }}
        className="card-img-wrap"
      >
        <CardImage src={imageSrc} alt={imageAlt} />

        <div
          aria-hidden="true"
          style={{
            position: "absolute", inset: 0, zIndex: 3,
            background: "linear-gradient(180deg,transparent 35%,rgba(15,23,42,0.28))",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "absolute", top: "12px", left: "12px", zIndex: 4,
            display: "flex", alignItems: "center", gap: "5px",
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.6)",
            borderRadius: "100px", padding: "4px 10px 4px 7px",
          }}
        >
          <div
            style={{
              width: "18px", height: "18px", borderRadius: "6px",
              background: story.logoGradient, display: "flex",
              alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 900, fontSize: "7px", flexShrink: 0,
            }}
          >
            {story.logo}
          </div>
          <span style={{ fontSize: "11px", fontWeight: 700, color: "#334155" }}>{story.category}</span>
        </div>

        <span
          style={{
            position: "absolute", top: "12px", right: "12px", zIndex: 4,
            background: "rgba(37,99,235,0.88)", color: "#fff",
            fontSize: "10px", fontWeight: 700,
            padding: "4px 10px", borderRadius: "100px", letterSpacing: "0.03em",
          }}
        >
          {story.tag}
        </span>

        {story.featured && (
          <span
            style={{
              position: "absolute", bottom: "12px", left: "12px", zIndex: 4,
              background: "rgba(251,191,36,0.92)", color: "#78350f",
              fontSize: "10px", fontWeight: 800,
              padding: "4px 10px", borderRadius: "100px",
            }}
          >
            ★ Featured
          </span>
        )}
      </div>

      <div style={{ padding: "22px", display: "flex", flexDirection: "column", gap: "13px", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              width: "32px", height: "32px", borderRadius: "8px",
              background: story.logoGradient, display: "flex",
              alignItems: "center", justifyContent: "center",
              color: "#fff", fontWeight: 900, fontSize: "10px", flexShrink: 0,
              boxShadow: "0 2px 8px rgba(0,0,0,0.14)",
            }}
          >
            {story.logo}
          </div>
          <span style={{ fontWeight: 800, fontSize: "13px", color: "#0f172a" }}>{story.company}</span>
        </div>

        <h3
          style={{
            fontSize: "15px", fontWeight: 800, lineHeight: 1.42, color: "#0f172a", margin: 0,
            display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
          }}
        >
          {story.title}
        </h3>

        <p
          style={{
            fontSize: "13px", lineHeight: 1.65, color: "#64748b", margin: 0,
            display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden",
          }}
        >
          {story.excerpt}
        </p>

        <div role="list" aria-label="Key results" style={{ display: "flex", gap: "8px" }}>
          {story.metrics.map((m) => (
            <div
              key={m.label}
              role="listitem"
              style={{
                flex: 1, background: "rgba(37,99,235,0.05)",
                border: "1px solid rgba(37,99,235,0.1)",
                borderRadius: "10px", padding: "10px 8px", textAlign: "center",
                transition: "background 0.2s, border-color 0.2s",
              }}
            >
              <strong style={{ display: "block", fontSize: "17px", fontWeight: 900, color: "#2563eb", lineHeight: 1 }}>
                {m.value}
              </strong>
              <span style={{ display: "block", fontSize: "10px", color: "#94a3b8", marginTop: "3px", fontWeight: 700 }}>
                {m.label}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            marginTop: "auto", paddingTop: "12px",
            borderTop: "1px solid rgba(37,99,235,0.08)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "30px", height: "30px", borderRadius: "50%",
                background: story.logoGradient, display: "flex",
                alignItems: "center", justifyContent: "center",
                color: "#fff", fontWeight: 900, fontSize: "11px", flexShrink: 0,
              }}
            >
              {story.author[0]}
            </div>
            <div>
              <div style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a" }}>{story.author}</div>
              <div style={{ fontSize: "10px", color: "#94a3b8" }}>{story.role}</div>
            </div>
          </div>

          <Link
            href="#"
            prefetch={false}
            aria-label={`Read full case study: ${story.title}`}
            style={{
              fontSize: "12px", fontWeight: 800, color: "#2563eb",
              textDecoration: "none", whiteSpace: "nowrap", transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#1d4ed8")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#2563eb")}
          >
            Read Case Study →
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .card-img-wrap:hover .card-img-el {
          transform: scale(1.06);
        }
      `}</style>
    </motion.article>
  );
}