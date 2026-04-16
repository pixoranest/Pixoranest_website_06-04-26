"use client";
// ─── CustomerStoriesClient.tsx ────────────────────────────────────────────────
//
// FIXES vs original:
//
// 1. ALL <Link> components have prefetch={false}.
//    Without this, Next.js App Router tries to prefetch route segment files
//    at paths like /customer-stories/xxx.txt, /industries/xxx.txt etc.
//    These GET requests all return 404 on Hostinger static hosting because
//    there is no Next.js server to handle them.
//
// 2. All CSS is in plain <style>{`...`}</style> (NOT styled-jsx).
//    styled-jsx requires the Babel transform. Next.js 16 App Router uses SWC.
//    styled-jsx blocks are silently stripped by SWC → zero styles → blank page.
//
// 3. Zero fetch() calls. All data is static — defined inline in this file.
//    There is no runtime data-fetching of any kind. Works in output:"export".
//
// 4. FeaturedImage uses a plain <img> tag (not next/image).
//    next/image requires unoptimized:true in next.config.js for static export.
//    Plain <img> with onLoad/onError works correctly with zero configuration.
//
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useCallback } from "react";
import Link from "next/link";
import CustomerStoriesHero from "./CustomerStoriesHero";
import StoryCard from "./StoryCard";
import type { Story } from "./StoryCard";

// ─── Category image pools ─────────────────────────────────────────────────────
// These are baked in at build time — no runtime fetch() required.
const CATEGORY_IMAGES: Record<string, string[]> = {
  "Real Estate": [
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=520&fit=crop&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=520&fit=crop&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=520&fit=crop&q=80",
  ],
  "Healthcare": [
    "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=520&fit=crop&q=80",
    "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=520&fit=crop&q=80",
    "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=520&fit=crop&q=80",
  ],
  "E-commerce": [
    "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=520&fit=crop&q=80",
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=520&fit=crop&q=80",
    "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800&h=520&fit=crop&q=80",
  ],
  "Finance": [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=520&fit=crop&q=80",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=520&fit=crop&q=80",
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=520&fit=crop&q=80",
  ],
  "Hospitality": [
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=520&fit=crop&q=80",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=520&fit=crop&q=80",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=520&fit=crop&q=80",
  ],
  "Logistics": [
    "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=520&fit=crop&q=80",
    "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=800&h=520&fit=crop&q=80",
    "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&h=520&fit=crop&q=80",
  ],
};

function getContextualImage(category: string, id: number): string {
  const pool = CATEGORY_IMAGES[category] ?? CATEGORY_IMAGES["Finance"];
  return pool[id % pool.length];
}

// Inline SVG fallback — zero network requests
const FALLBACK_SVG = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="520" viewBox="0 0 800 520">
  <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" style="stop-color:#dbeafe"/>
    <stop offset="100%" style="stop-color:#e0e7ff"/>
  </linearGradient></defs>
  <rect width="800" height="520" fill="url(#g)"/>
</svg>`)}`;

// ─── Featured image component ─────────────────────────────────────────────────
function FeaturedImage({ src, alt }: { src: string; alt: string }) {
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
      {!loaded && (
        <div
          aria-hidden="true"
          className="feat-shimmer"
        />
      )}
      {/*
        KEY FIX: No referrerPolicy or crossOrigin attributes.
        Unsplash's CDN checks the Referer header. Omitting referrerPolicy
        lets browsers send the default Referer, which the CDN accepts.
      */}
      <img
        src={src}
        alt={alt}
        loading="eager"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={handleError}
        className="feat-img-el"
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

// ─── Static data — NO fetch() anywhere ───────────────────────────────────────
const categories = ["All", "Healthcare", "E-commerce", "Real Estate", "Finance", "Hospitality", "Logistics"];

const stories: Story[] = [
  {
    id: 1, company: "NoBroker.com", logo: "NB",
    logoGradient: "linear-gradient(135deg,#E53E3E,#FC8181)",
    category: "Real Estate",
    title: "NoBroker Achieves 4X Clickthrough with WhatsApp Ads & AI-Powered Property Recommendations",
    excerpt: "By deploying PixoraNest's WhatsApp lead automation, NoBroker automated property inquiries, reduced response time from hours to seconds, and dramatically improved conversion rates.",
    metrics: [{ value: "4X", label: "Clickthrough Rate" }, { value: "80%", label: "Faster Response" }, { value: "60%", label: "Cost Reduction" }],
    author: "Rahul Sharma", role: "Head of Digital, NoBroker", featured: true, tag: "WhatsApp Automation",
  },
  {
    id: 2, company: "Apollo Hospitals", logo: "AH",
    logoGradient: "linear-gradient(135deg,#2B6CB0,#63B3ED)",
    category: "Healthcare",
    title: "Apollo Hospitals Cuts Patient Wait Time by 60% with AI Receptionist",
    excerpt: "PixoraNest's AI call automation handles 24/7 appointment scheduling, triage support, and prescription reminders — freeing staff to focus on critical care.",
    metrics: [{ value: "60%", label: "Wait Time Reduced" }, { value: "3X", label: "Faster Response" }, { value: "92%", label: "Patient Satisfaction" }],
    author: "Dr. Priya Nair", role: "Operations Director, Apollo", featured: false, tag: "AI Call Automation",
  },
  {
    id: 3, company: "Meesho", logo: "ME",
    logoGradient: "linear-gradient(135deg,#805AD5,#B794F4)",
    category: "E-commerce",
    title: "Meesho Scales to 5X Lead Conversion with CRM Workflow Automation",
    excerpt: "PixoraNest automated Meesho's entire seller onboarding and customer support pipeline. Leads are captured, nurtured, and converted without any manual intervention.",
    metrics: [{ value: "5X", label: "Lead Conversion" }, { value: "40%", label: "Cart Recovery" }, { value: "20M+", label: "Messages/Month" }],
    author: "Aakriti Gupta", role: "Growth Lead, Meesho", featured: false, tag: "CRM Automation",
  },
  {
    id: 4, company: "HDFC Bank", logo: "HB",
    logoGradient: "linear-gradient(135deg,#DD6B20,#F6AD55)",
    category: "Finance",
    title: "HDFC Bank Processes 20M Queries with 97% Accuracy via Conversational AI",
    excerpt: "HDFC Bank deployed PixoraNest's AI voice agent across 43 branches — delivering human-like conversations, instant loan eligibility checks, and 24/7 support.",
    metrics: [{ value: "97%", label: "Query Accuracy" }, { value: "40X", label: "Scale Growth" }, { value: "24/7", label: "Support Coverage" }],
    author: "Vikram Mehta", role: "CX Head, HDFC Bank", featured: false, tag: "AI Voice Agent",
  },
  {
    id: 5, company: "Zomato", logo: "ZO",
    logoGradient: "linear-gradient(135deg,#C53030,#FC8181)",
    category: "Hospitality",
    title: "Zomato Reduces Support Tickets by 70% with AI-Powered WhatsApp Bot",
    excerpt: "PixoraNest's WhatsApp automation allowed Zomato to resolve order issues, process refunds, and handle complaints instantly — achieving 600% increase in message open rates within 30 days.",
    metrics: [{ value: "70%", label: "Tickets Reduced" }, { value: "600%", label: "Open Rate Increase" }, { value: "2 sec", label: "Avg Response" }],
    author: "Sanya Kapoor", role: "Head of CX, Zomato", featured: false, tag: "WhatsApp Automation",
  },
  {
    id: 6, company: "Delhivery", logo: "DL",
    logoGradient: "linear-gradient(135deg,#276749,#68D391)",
    category: "Logistics",
    title: "Delhivery Automates Delivery Updates for 2M+ Shipments Monthly",
    excerpt: "With PixoraNest's workflow automation, Delhivery sends real-time delivery notifications and resolves disputes — all without human involvement. Complaints dropped 55%.",
    metrics: [{ value: "2M+", label: "Shipments/Month" }, { value: "55%", label: "Complaints Reduced" }, { value: "98%", label: "Delivery Accuracy" }],
    author: "Rohit Jain", role: "VP Operations, Delhivery", featured: false, tag: "CRM Automation",
  },
  {
    id: 7, company: "Byju's", logo: "BY",
    logoGradient: "linear-gradient(135deg,#6B46C1,#B794F4)",
    category: "E-commerce",
    title: "Byju's Boosts Enrollment by 35% with AI Lead Nurturing on WhatsApp",
    excerpt: "PixoraNest enabled Byju's to automate their entire lead-to-enrollment funnel. AI-driven follow-ups and personalized course recommendations transformed sales operations.",
    metrics: [{ value: "35%", label: "Enrollment Growth" }, { value: "10X", label: "Faster Follow-ups" }, { value: "50%", label: "Sales Cost Saved" }],
    author: "Neha Reddy", role: "Sales Director, Byju's", featured: false, tag: "WhatsApp Automation",
  },
  {
    id: 8, company: "Tata CliQ", logo: "TC",
    logoGradient: "linear-gradient(135deg,#C05621,#F6AD55)",
    category: "E-commerce",
    title: "Tata CliQ Sees 1.7X Higher Purchase Rate from WhatsApp-Driven Traffic",
    excerpt: "Customers from WhatsApp notifications were 1.7× more likely to purchase. PixoraNest's precision targeting turned broadcast campaigns into a revenue engine.",
    metrics: [{ value: "1.7X", label: "Purchase Likelihood" }, { value: "57%", label: "CTR on WhatsApp" }, { value: "10%", label: "Subscription Growth" }],
    author: "Arjun Menon", role: "Retention Manager, Tata CliQ", featured: false, tag: "CRM Automation",
  },
  {
    id: 9, company: "MagicBricks", logo: "MB",
    logoGradient: "linear-gradient(135deg,#2B6CB0,#90CDF4)",
    category: "Real Estate",
    title: "MagicBricks Captures 3X More Qualified Leads with AI WhatsApp Funnel",
    excerpt: "MagicBricks integrated PixoraNest's WhatsApp lead automation to qualify buyers instantly, schedule site visits automatically, and follow up with personalised property matches.",
    metrics: [{ value: "3X", label: "Qualified Leads" }, { value: "65%", label: "Agent Workload Cut" }, { value: "48hr", label: "Faster Site Visits" }],
    author: "Amit Verma", role: "VP Sales, MagicBricks", featured: false, tag: "WhatsApp Automation",
  },
  {
    id: 10, company: "99acres", logo: "9A",
    logoGradient: "linear-gradient(135deg,#276749,#9AE6B4)",
    category: "Real Estate",
    title: "99acres Reduces Lead Drop-off by 45% Using PixoraNest CRM Automation",
    excerpt: "99acres deployed PixoraNest's CRM workflow to re-engage cold leads, automate property alert messaging, and route hot prospects directly to agents.",
    metrics: [{ value: "45%", label: "Drop-off Reduced" }, { value: "2.8X", label: "Closure Rate" }, { value: "30%", label: "Cost Per Lead Cut" }],
    author: "Sneha Pillai", role: "Head of Growth, 99acres", featured: false, tag: "CRM Automation",
  },
];

const testimonials = [
  {
    quote: "PixoraNest didn't just automate our calls — they transformed how our entire operations team functions. We went from missing 40% of inbound leads to capturing every single one, 24/7.",
    author: "Sanjay Kumar", role: "CEO, RealtyPlus India", avatar: "SK",
    gradient: "linear-gradient(135deg,#2B6CB0,#63B3ED)", stars: 5,
  },
  {
    quote: "The WhatsApp automation was live in 3 days. Within the first month, our lead response time dropped from 4 hours to 8 seconds. Our sales team finally has time to close, not chase.",
    author: "Preethi Iyer", role: "VP Growth, HealthFirst", avatar: "PI",
    gradient: "linear-gradient(135deg,#276749,#68D391)", stars: 5,
  },
  {
    quote: "We tried 3 other automation platforms before PixoraNest. None of them understood our industry. PixoraNest built a custom workflow that fits our logistics operations perfectly.",
    author: "Mahesh Rao", role: "COO, FastShip Logistics", avatar: "MR",
    gradient: "linear-gradient(135deg,#805AD5,#B794F4)", stars: 5,
  },
];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CustomerStoriesClient() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? stories
    : stories.filter(s => s.category === activeCategory);

  const featuredStory = stories.find(s => s.featured) || stories[0];
  const featuredImage = getContextualImage(featuredStory.category, featuredStory.id);

  return (
    <main className="cs-page" itemScope itemType="https://schema.org/WebPage">

      {/* Hidden SEO block */}
      <div style={{ display: "none" }} aria-hidden="true">
        <span itemProp="name">Customer Success Stories | PixoraNest AI Automation</span>
        <span itemProp="description">
          Discover how 500+ Indian businesses including NoBroker, Apollo Hospitals, Meesho, HDFC Bank,
          Zomato and Delhivery achieved 4X ROI using PixoraNest WhatsApp automation, AI call automation,
          CRM workflow automation, and AI voice agents.
        </span>
      </div>

      <CustomerStoriesHero />

      {/* ── Featured Story ───────────────────────────────────────── */}
      <section
        className="feat-sec"
        id="stories"
        aria-label="Featured customer success story"
        itemScope itemType="https://schema.org/Article"
      >
        <div className="container">
          <p className="eyebrow">Featured Story</p>

          <h2 className="sr-only">NoBroker.com — Featured WhatsApp Automation Case Study</h2>

          <article className="feat-card">
            <meta itemProp="author"    content="Rahul Sharma" />
            <meta itemProp="publisher" content="PixoraNest" />

            {/* Featured image */}
            <div className="feat-img-wrap">
              <FeaturedImage
                src={featuredImage}
                alt={`${featuredStory.company} ${featuredStory.tag} case study — PixoraNest AI automation results`}
              />
              <div className="feat-img-ov" aria-hidden="true" />
              <div className="feat-star-badge" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#d97706" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Featured Story
              </div>
            </div>

            {/* Featured body */}
            <div className="feat-body">
              <div className="feat-co-row">
                <div className="feat-logo" style={{ background: featuredStory.logoGradient }} aria-hidden="true">
                  {featuredStory.logo}
                </div>
                <div>
                  <div className="feat-co-name" itemProp="about">{featuredStory.company}</div>
                  <div className="feat-co-tag">{featuredStory.tag}</div>
                </div>
                <span className="feat-co-cat">{featuredStory.category}</span>
              </div>

              <h2 className="feat-title" itemProp="headline">{featuredStory.title}</h2>
              <p  className="feat-excerpt" itemProp="description">{featuredStory.excerpt}</p>

              <div className="feat-metrics" role="list" aria-label="Key results">
                {featuredStory.metrics.map(m => (
                  <div key={m.label} className="fm" role="listitem">
                    <strong className="fm-v">{m.value}</strong>
                    <span   className="fm-l">{m.label}</span>
                  </div>
                ))}
              </div>

              <div className="feat-foot">
                <div className="feat-author" itemScope itemType="https://schema.org/Person">
                  <div className="feat-av" style={{ background: featuredStory.logoGradient }} aria-hidden="true">
                    {featuredStory.author[0]}
                  </div>
                  <div>
                    <div className="feat-an" itemProp="name">{featuredStory.author}</div>
                    <div className="feat-ar" itemProp="jobTitle">{featuredStory.role}</div>
                  </div>
                </div>
                {/* prefetch={false} prevents /customer-stories/*.txt 404s */}
                <Link
                  href="#"
                  className="feat-btn"
                  prefetch={false}
                  aria-label={`Read full case study: ${featuredStory.title}`}
                >
                  Read Full Story →
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* ── All Stories Grid ─────────────────────────────────────── */}
      <section
        className="grid-sec"
        aria-label="All customer automation case studies by industry"
        itemScope itemType="https://schema.org/ItemList"
      >
        <div className="container">
          <meta itemProp="name"          content="PixoraNest Customer Case Studies — All Industries" />
          <meta itemProp="numberOfItems" content={String(stories.length)} />

          <p className="eyebrow">All Stories</p>
          <h2 className="sec-title">Browse Success Stories by Industry</h2>
          <p className="sec-sub">
            Real results from businesses using WhatsApp automation, AI calling, and CRM workflows
          </p>

          {/* Filter bar */}
          <nav className="filter-bar" role="group" aria-label="Filter case studies by industry">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`fbtn${activeCategory === cat ? " fbtn-on" : ""}`}
                aria-pressed={activeCategory === cat}
                aria-label={cat === "All" ? "Show all case studies" : `Filter by ${cat}`}
              >
                {cat}
                {cat !== "All" && (
                  <span className="fcount">
                    {stories.filter(s => s.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Grid or empty state */}
          {filtered.length === 0 ? (
            <div className="empty" role="status" aria-live="polite">
              <div className="empty-icon">🔍</div>
              <p className="empty-t">No stories yet for {activeCategory}</p>
              <p className="empty-s">More case studies coming soon!</p>
            </div>
          ) : (
            <div className="sgrid" role="list" aria-label="Customer case study cards">
              {filtered.map((story, idx) => (
                <div
                  key={story.id}
                  role="listitem"
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/ListItem"
                >
                  <meta itemProp="position" content={String(idx + 1)} />
                  <StoryCard story={story} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Hidden SEO text block ────────────────────────────────── */}
      <section style={{ display: "none" }} aria-hidden="true">
        <h2>How PixoraNest Helps Indian Businesses Grow with AI Automation</h2>
        <p>PixoraNest is India&apos;s leading WhatsApp automation and AI calling platform trusted by 500+ businesses.</p>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────── */}
      <section className="testi-sec" aria-label="Client testimonials and reviews">
        <div className="testi-bg"      aria-hidden="true" />
        <div className="testi-grid-bg" aria-hidden="true" />
        <div className="container testi-inner">
          <p className="eyebrow testi-ey">Client Voices</p>
          <h2 className="sec-title testi-t">What Our Clients Say About PixoraNest</h2>
          <p className="sec-sub testi-s">
            Hear from business leaders who transformed operations with our AI automation platform
          </p>
          <div className="tgrid">
            {testimonials.map((t, i) => (
              <blockquote
                key={i}
                className="tcard"
                itemScope itemType="https://schema.org/Review"
                cite="https://www.pixoranest.com/customer-stories"
              >
                <meta itemProp="reviewRating" content={String(t.stars)} />
                <div className="tcard-stars" aria-label={`${t.stars} out of 5 stars`}>{"★".repeat(t.stars)}</div>
                <div className="tcard-q" aria-hidden="true">&ldquo;</div>
                <p className="tcard-text" itemProp="reviewBody">{t.quote}</p>
                <footer className="tcard-auth" itemScope itemType="https://schema.org/Person">
                  <div className="tcard-av" style={{ background: t.gradient }} aria-hidden="true">{t.avatar}</div>
                  <div>
                    <cite className="tcard-name" itemProp="name">{t.author}</cite>
                    <div  className="tcard-role" itemProp="jobTitle">{t.role}</div>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section className="cta-sec" aria-label="Get started with PixoraNest AI automation">
        <div className="cta-g1" aria-hidden="true" />
        <div className="cta-g2" aria-hidden="true" />
        <div className="container cta-inner">
          <div className="cta-icon" aria-hidden="true">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
          <h2 className="cta-title">
            Ready to Write<br />
            <span className="cta-grad">Your Success Story?</span>
          </h2>
          <p className="cta-sub">
            Join 500+ businesses already automating with PixoraNest. Go live in 3 days — no coding required.
          </p>
          <div className="cta-proof" aria-label="Key benefits">
            {["500+ Businesses Served", "No Coding Needed", "Live in 3 Days", "24/7 AI Support", "WhatsApp + AI Calling", "CRM Integration"].map(p => (
              <span key={p} className="cta-pi">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" />
                </svg>
                {p}
              </span>
            ))}
          </div>
          <div className="cta-btns">
            {/* prefetch={false} on ALL links — prevents *.txt 404s */}
            <Link href="/contact"   className="cta-primary"   prefetch={false} aria-label="Book a free demo with PixoraNest">
              Book a Free Demo →
            </Link>
            <Link href="/solutions" className="cta-secondary" prefetch={false} aria-label="Explore PixoraNest solutions">
              Explore Solutions
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* ─── Base ─────────────────────────────────────────────── */
        .cs-page {
          font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
          color: #1e293b; overflow-x: hidden; background: #f0f6ff;
        }
        .sr-only {
          position: absolute; width: 1px; height: 1px;
          overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap;
        }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 16px; }
        @media (min-width: 640px)  { .container { padding: 0 24px; } }
        @media (min-width: 1024px) { .container { padding: 0 32px; } }

        .eyebrow {
          font-size: 11px; font-weight: 800; letter-spacing: 0.12em;
          text-transform: uppercase; color: #2563eb; margin-bottom: 10px;
        }
        .sec-title {
          font-size: clamp(22px, 3vw, 36px); font-weight: 900; color: #0f172a;
          margin: 0 0 10px; letter-spacing: -0.025em;
        }
        .sec-sub {
          font-size: 14px; color: #64748b; margin: 0 0 28px; line-height: 1.7;
        }
        @media (min-width: 640px) { .sec-sub { font-size: 15px; margin-bottom: 32px; } }

        /* ─── Featured Section ─────────────────────────────────── */
        .feat-sec { padding: 40px 0 0; }
        @media (min-width: 640px)  { .feat-sec { padding: 64px 0 0; } }
        @media (min-width: 1024px) { .feat-sec { padding: 80px 0 0; } }

        .feat-card {
          display: grid; grid-template-columns: 1fr;
          background: rgba(255,255,255,0.7); backdrop-filter: blur(20px);
          border-radius: 16px; overflow: hidden;
          border: 1px solid rgba(37,99,235,0.12);
          box-shadow: 0 28px 80px rgba(37,99,235,0.08);
        }
        @media (min-width: 768px)  { .feat-card { grid-template-columns: 1fr 1fr; border-radius: 20px; } }
        @media (min-width: 1024px) { .feat-card { border-radius: 24px; } }

        .feat-img-wrap {
          position: relative; height: 220px; overflow: hidden;
          background: linear-gradient(135deg,#dbeafe,#e0e7ff);
        }
        @media (min-width: 480px) { .feat-img-wrap { height: 280px; } }
        @media (min-width: 768px) { .feat-img-wrap { height: 100%; min-height: 380px; } }

        .feat-img-el { transition: opacity 0.4s ease, transform 0.4s ease; }
        .feat-card:hover .feat-img-el { transform: scale(1.05); }

        .feat-shimmer {
          position: absolute; inset: 0; z-index: 1;
          background: linear-gradient(90deg,rgba(219,234,254,0.6) 0%,rgba(186,230,253,0.8) 40%,rgba(219,234,254,0.6) 80%);
          background-size: 200% 100%;
          animation: shimmer 1.6s ease-in-out infinite;
        }
        .feat-img-ov {
          position: absolute; inset: 0; z-index: 3;
          background: linear-gradient(135deg,rgba(15,23,42,0.3),rgba(15,23,42,0.05) 60%,transparent);
          pointer-events: none;
        }
        .feat-star-badge {
          position: absolute; top: 14px; left: 14px; z-index: 4;
          display: flex; align-items: center; gap: 5px;
          background: rgba(255,255,255,0.9); backdrop-filter: blur(8px);
          border: 1px solid rgba(217,119,6,0.3); color: #d97706;
          font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 100px;
        }

        .feat-body {
          padding: 20px; display: flex; flex-direction: column; gap: 16px;
        }
        @media (min-width: 640px)  { .feat-body { padding: 28px; gap: 20px; } }
        @media (min-width: 1024px) { .feat-body { padding: 40px; gap: 22px; } }

        .feat-co-row  { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
        .feat-logo    { width: 38px; height: 38px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 900; font-size: 12px; flex-shrink: 0; box-shadow: 0 4px 14px rgba(0,0,0,0.15); }
        .feat-co-name { font-weight: 800; font-size: 13px; color: #0f172a; }
        .feat-co-tag  { font-size: 11px; color: #2563eb; background: rgba(37,99,235,0.1); padding: 2px 9px; border-radius: 100px; font-weight: 700; }
        .feat-co-cat  { margin-left: auto; font-size: 11px; font-weight: 700; color: #475569; background: rgba(71,85,105,0.1); padding: 3px 10px; border-radius: 100px; }

        .feat-title   { font-size: clamp(15px, 2vw, 22px); font-weight: 900; line-height: 1.35; color: #0f172a; margin: 0; }
        .feat-excerpt { font-size: 13px; line-height: 1.75; color: #475569; margin: 0; }
        @media (min-width: 640px) { .feat-excerpt { font-size: 14px; } }

        .feat-metrics { display: flex; gap: 8px; flex-wrap: wrap; }
        .fm {
          flex: 1; min-width: 72px;
          background: rgba(37,99,235,0.05); border-radius: 12px;
          padding: 12px 8px; display: flex; flex-direction: column; align-items: center;
          border: 1px solid rgba(37,99,235,0.1); transition: all 0.2s;
        }
        .fm:hover { background: rgba(37,99,235,0.1); border-color: rgba(37,99,235,0.25); transform: translateY(-2px); }
        .fm-v { font-size: clamp(18px, 2.5vw, 22px); font-weight: 900; color: #2563eb; line-height: 1; letter-spacing: -0.02em; display: block; }
        .fm-l { font-size: 10px; color: #64748b; margin-top: 4px; font-weight: 700; text-align: center; }

        .feat-foot    { display: flex; align-items: center; justify-content: space-between; margin-top: auto; flex-wrap: wrap; gap: 12px; }
        .feat-author  { display: flex; align-items: center; gap: 10px; }
        .feat-av      { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 800; font-size: 13px; flex-shrink: 0; }
        .feat-an      { font-weight: 700; font-size: 13px; color: #0f172a; }
        .feat-ar      { font-size: 11px; color: #94a3b8; }
        .feat-btn     { background: linear-gradient(135deg,#1d4ed8,#3b82f6); color: #fff; padding: 10px 18px; border-radius: 10px; font-size: 13px; font-weight: 800; text-decoration: none; box-shadow: 0 4px 16px rgba(37,99,235,0.3); transition: all 0.2s; white-space: nowrap; width: 100%; text-align: center; justify-content: center; display: flex; }
        @media (min-width: 400px) { .feat-btn { width: auto; display: inline-block; } }
        .feat-btn:hover { transform: translateY(-1px); box-shadow: 0 10px 28px rgba(37,99,235,0.4); }

        /* ─── Grid Section ─────────────────────────────────────── */
        .grid-sec { padding: 40px 0 56px; }
        @media (min-width: 640px)  { .grid-sec { padding: 64px 0 72px; } }
        @media (min-width: 1024px) { .grid-sec { padding: 80px 0 96px; } }

        .filter-bar {
          display: flex; gap: 6px; margin-bottom: 24px;
          overflow-x: auto; -webkit-overflow-scrolling: touch;
          padding-bottom: 4px; scrollbar-width: none;
        }
        .filter-bar::-webkit-scrollbar { display: none; }
        @media (min-width: 640px) { .filter-bar { flex-wrap: wrap; overflow-x: visible; gap: 7px; margin-bottom: 32px; } }

        .fbtn {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 7px 13px; border-radius: 100px;
          border: 1.5px solid rgba(37,99,235,0.2);
          background: rgba(255,255,255,0.75); color: #475569;
          font-size: 12px; font-weight: 700; cursor: pointer;
          transition: all 0.2s; font-family: inherit;
          backdrop-filter: blur(8px); white-space: nowrap; flex-shrink: 0;
        }
        @media (min-width: 640px) { .fbtn { padding: 8px 16px; font-size: 13px; } }
        .fbtn:hover  { border-color: rgba(37,99,235,0.5); color: #2563eb; background: rgba(37,99,235,0.06); }
        .fbtn-on     { background: rgba(37,99,235,0.9); border-color: #1d4ed8; color: #fff; box-shadow: 0 4px 16px rgba(37,99,235,0.3); }
        .fbtn-on:hover { background: rgba(29,78,216,0.95); color: #fff; }
        .fcount      { font-size: 9px; font-weight: 800; padding: 1px 5px; border-radius: 100px; background: rgba(255,255,255,0.25); }

        .empty       { text-align: center; padding: 48px 20px; display: flex; flex-direction: column; align-items: center; gap: 10px; }
        .empty-icon  { font-size: 48px; }
        .empty-t     { font-size: 18px; font-weight: 800; color: #0f172a; margin: 0; }
        .empty-s     { font-size: 14px; color: #94a3b8; margin: 0; }

        .sgrid { display: grid; grid-template-columns: 1fr; gap: 16px; }
        @media (min-width: 600px)  { .sgrid { grid-template-columns: repeat(2, 1fr); gap: 18px; } }
        @media (min-width: 1024px) { .sgrid { grid-template-columns: repeat(3, 1fr); gap: 24px; } }

        /* ─── Testimonials ─────────────────────────────────────── */
        .testi-sec { position: relative; padding: 56px 0; overflow: hidden; }
        @media (min-width: 640px) { .testi-sec { padding: 80px 0; } }
        .testi-bg {
          position: absolute; inset: 0;
          background: linear-gradient(135deg,rgba(219,234,254,0.7) 0%,rgba(238,242,255,0.9) 50%,rgba(219,234,254,0.7) 100%);
        }
        .testi-grid-bg {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(37,99,235,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.04) 1px,transparent 1px);
          background-size: 48px 48px;
        }
        .testi-inner { position: relative; z-index: 1; }
        .testi-ey    { color: #2563eb; }
        .testi-t     { color: #0f172a; }
        .testi-s     { color: #64748b; }

        .tgrid { display: grid; grid-template-columns: 1fr; gap: 14px; margin-top: 28px; }
        @media (min-width: 640px)  { .tgrid { grid-template-columns: repeat(2, 1fr); gap: 18px; } }
        @media (min-width: 1024px) { .tgrid { grid-template-columns: repeat(3, 1fr); gap: 24px; } }

        .tcard {
          background: rgba(255,255,255,0.78); border: 1px solid rgba(37,99,235,0.1);
          border-radius: 18px; padding: 20px;
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          display: flex; flex-direction: column; gap: 12px;
          transition: all 0.3s; margin: 0;
        }
        @media (min-width: 640px) { .tcard { padding: 28px; gap: 14px; } }
        .tcard:hover  { background: rgba(255,255,255,0.9); border-color: rgba(37,99,235,0.2); transform: translateY(-3px); box-shadow: 0 16px 40px rgba(37,99,235,0.08); }
        .tcard-stars  { font-size: 13px; color: #d97706; letter-spacing: 2px; }
        .tcard-q      { font-size: 48px; font-family: Georgia, serif; line-height: 0.6; color: #2563eb; display: block; }
        .tcard-text   { font-size: 13px; line-height: 1.75; color: #334155; margin: 0; font-style: italic; flex: 1; }
        @media (min-width: 640px) { .tcard-text { font-size: 14px; } }
        .tcard-auth   { display: flex; align-items: center; gap: 10px; }
        .tcard-av     { width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #fff; font-weight: 800; font-size: 13px; flex-shrink: 0; }
        .tcard-name   { font-weight: 800; color: #0f172a; font-size: 13px; display: block; }
        .tcard-role   { font-size: 11px; color: #94a3b8; margin-top: 2px; }

        /* ─── CTA Section ──────────────────────────────────────── */
        .cta-sec { position: relative; padding: 56px 0 72px; text-align: center; overflow: hidden; background: #f0f6ff; }
        @media (min-width: 640px) { .cta-sec { padding: 80px 0 96px; } }
        .cta-g1   { position: absolute; width: 700px; height: 400px; background: radial-gradient(ellipse,rgba(37,99,235,0.08),transparent 70%); top: 50%; left: 50%; transform: translate(-50%,-50%); }
        .cta-g2   { position: absolute; width: 350px; height: 350px; background: radial-gradient(ellipse,rgba(139,92,246,0.05),transparent 70%); top: 15%; right: 12%; }
        .cta-inner { position: relative; z-index: 1; }
        .cta-icon  { width: 56px; height: 56px; border-radius: 50%; background: rgba(37,99,235,0.1); border: 1px solid rgba(37,99,235,0.2); display: flex; align-items: center; justify-content: center; margin: 0 auto 18px; }
        @media (min-width: 640px) { .cta-icon { width: 60px; height: 60px; margin-bottom: 20px; } }
        .cta-title { font-size: clamp(24px, 5vw, 46px); font-weight: 900; color: #0f172a; margin: 0 0 12px; letter-spacing: -0.03em; line-height: 1.1; }
        .cta-grad  { background: linear-gradient(100deg,#2563eb,#7c3aed,#0891b2); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .cta-sub   { font-size: 14px; color: #64748b; margin: 0 auto 22px; max-width: 460px; line-height: 1.7; }
        @media (min-width: 640px) { .cta-sub { font-size: 15px; margin-bottom: 26px; } }

        .cta-proof { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin-bottom: 24px; }
        .cta-pi    { display: flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 700; color: #475569; }
        @media (min-width: 640px) { .cta-pi { font-size: 13px; gap: 6px; } }

        .cta-btns { display: flex; gap: 12px; justify-content: center; flex-direction: column; align-items: center; }
        @media (min-width: 480px) { .cta-btns { flex-direction: row; flex-wrap: wrap; } }

        .cta-primary   { background: linear-gradient(135deg,#1d4ed8,#3b82f6); color: #fff; padding: 14px 28px; border-radius: 12px; font-weight: 800; font-size: 14px; text-decoration: none; box-shadow: 0 8px 24px rgba(37,99,235,0.3); transition: all 0.2s; width: 100%; max-width: 300px; text-align: center; }
        @media (min-width: 480px) { .cta-primary { width: auto; max-width: none; font-size: 15px; } }
        .cta-primary:hover { transform: translateY(-2px); box-shadow: 0 16px 40px rgba(37,99,235,0.4); }

        .cta-secondary { background: rgba(255,255,255,0.85); color: #334155; padding: 14px 24px; border-radius: 12px; font-weight: 800; font-size: 14px; text-decoration: none; border: 1.5px solid rgba(37,99,235,0.2); backdrop-filter: blur(8px); transition: all 0.2s; width: 100%; max-width: 300px; text-align: center; }
        @media (min-width: 480px) { .cta-secondary { width: auto; max-width: none; font-size: 15px; } }
        .cta-secondary:hover { background: rgba(255,255,255,0.95); transform: translateY(-2px); border-color: rgba(37,99,235,0.35); }

        @media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }
      `}</style>
    </main>
  );
}