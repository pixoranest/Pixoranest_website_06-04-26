"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const stats = [
  { value: "500+", label: "Businesses", icon: "🏢" },
  { value: "10M+", label: "Messages/mo", icon: "💬" },
  { value: "98%", label: "Satisfaction", icon: "⭐" },
  { value: "4.8x", label: "Avg ROI", icon: "📈" },
];

const categories = ["All", "Healthcare", "E-commerce", "Real Estate", "Finance", "Hospitality", "Logistics"];

const stories = [
  {
    id: 1,
    company: "NoBroker.com",
    logo: "NB",
    logoGradient: "linear-gradient(135deg,#E53E3E,#FC8181)",
    category: "Real Estate",
    title: "NoBroker Achieves 4X Clickthrough with WhatsApp Ads & AI-Powered Property Recommendations",
    excerpt: "By deploying PixoraNest's WhatsApp lead automation, NoBroker automated property inquiries, reduced response time from hours to seconds, and dramatically improved conversion rates.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=700&q=85",
    metrics: [
      { value: "4X", label: "Clickthrough Rate" },
      { value: "80%", label: "Faster Response" },
      { value: "60%", label: "Cost Reduction" },
    ],
    author: "Rahul Sharma",
    role: "Head of Digital, NoBroker",
    featured: true,
    tag: "WhatsApp Automation",
  },
  {
    id: 2,
    company: "Apollo Hospitals",
    logo: "AH",
    logoGradient: "linear-gradient(135deg,#2B6CB0,#63B3ED)",
    category: "Healthcare",
    title: "Apollo Hospitals Cuts Patient Wait Time by 60% with AI Receptionist",
    excerpt: "PixoraNest's AI call automation handles 24/7 appointment scheduling, triage support, and prescription reminders — freeing staff to focus on critical care.",
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=700&q=85",
    metrics: [
      { value: "60%", label: "Wait Time Reduced" },
      { value: "3X", label: "Faster Response" },
      { value: "92%", label: "Patient Satisfaction" },
    ],
    author: "Dr. Priya Nair",
    role: "Operations Director, Apollo",
    featured: false,
    tag: "AI Call Automation",
  },
  {
    id: 3,
    company: "Meesho",
    logo: "ME",
    logoGradient: "linear-gradient(135deg,#805AD5,#B794F4)",
    category: "E-commerce",
    title: "Meesho Scales to 5X Lead Conversion with CRM Workflow Automation",
    excerpt: "PixoraNest automated Meesho's entire seller onboarding and customer support pipeline. Leads are captured, nurtured, and converted without any manual intervention.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=85",
    metrics: [
      { value: "5X", label: "Lead Conversion" },
      { value: "40%", label: "Cart Recovery" },
      { value: "20M+", label: "Messages/Month" },
    ],
    author: "Aakriti Gupta",
    role: "Growth Lead, Meesho",
    featured: false,
    tag: "CRM Automation",
  },
  {
    id: 4,
    company: "HDFC Bank",
    logo: "HB",
    logoGradient: "linear-gradient(135deg,#DD6B20,#F6AD55)",
    category: "Finance",
    title: "HDFC Bank Processes 20M Queries with 97% Accuracy via Conversational AI",
    excerpt: "HDFC Bank deployed PixoraNest's AI voice agent across 43 branches — delivering human-like conversations, instant loan eligibility checks, and 24/7 support.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=700&q=85",
    metrics: [
      { value: "97%", label: "Query Accuracy" },
      { value: "40X", label: "Scale Growth" },
      { value: "24/7", label: "Support Coverage" },
    ],
    author: "Vikram Mehta",
    role: "CX Head, HDFC Bank",
    featured: false,
    tag: "AI Voice Agent",
  },
  {
    id: 5,
    company: "Zomato",
    logo: "ZO",
    logoGradient: "linear-gradient(135deg,#C53030,#FC8181)",
    category: "Hospitality",
    title: "Zomato Reduces Support Tickets by 70% with AI-Powered WhatsApp Bot",
    excerpt: "PixoraNest's WhatsApp automation allowed Zomato to resolve order issues, process refunds, and handle complaints instantly — achieving 600% increase in message open rates within 30 days.",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=700&q=85",
    metrics: [
      { value: "70%", label: "Tickets Reduced" },
      { value: "600%", label: "Open Rate Increase" },
      { value: "2 sec", label: "Avg Response" },
    ],
    author: "Sanya Kapoor",
    role: "Head of CX, Zomato",
    featured: false,
    tag: "WhatsApp Automation",
  },
  {
    id: 6,
    company: "Delhivery",
    logo: "DL",
    logoGradient: "linear-gradient(135deg,#276749,#68D391)",
    category: "Logistics",
    title: "Delhivery Automates Delivery Updates for 2M+ Shipments Monthly",
    excerpt: "With PixoraNest's workflow automation, Delhivery sends real-time delivery notifications and resolves disputes — all without human involvement. Complaints dropped 55%.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=700&q=85",
    metrics: [
      { value: "2M+", label: "Shipments/Month" },
      { value: "55%", label: "Complaints Reduced" },
      { value: "98%", label: "Delivery Accuracy" },
    ],
    author: "Rohit Jain",
    role: "VP Operations, Delhivery",
    featured: false,
    tag: "CRM Automation",
  },
  {
    id: 7,
    company: "Byju's",
    logo: "BY",
    logoGradient: "linear-gradient(135deg,#6B46C1,#B794F4)",
    category: "E-commerce",
    title: "Byju's Boosts Enrollment by 35% with AI Lead Nurturing on WhatsApp",
    excerpt: "PixoraNest enabled Byju's to automate their entire lead-to-enrollment funnel. AI-driven follow-ups and personalized course recommendations transformed sales operations.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&q=85",
    metrics: [
      { value: "35%", label: "Enrollment Growth" },
      { value: "10X", label: "Faster Follow-ups" },
      { value: "50%", label: "Sales Cost Saved" },
    ],
    author: "Neha Reddy",
    role: "Sales Director, Byju's",
    featured: false,
    tag: "WhatsApp Automation",
  },
  {
    id: 8,
    company: "Tata CliQ",
    logo: "TC",
    logoGradient: "linear-gradient(135deg,#C05621,#F6AD55)",
    category: "E-commerce",
    title: "Tata CliQ Sees 1.7X Higher Purchase Rate from WhatsApp-Driven Traffic",
    excerpt: "Customers from WhatsApp notifications were 1.7× more likely to purchase. PixoraNest's precision targeting turned broadcast campaigns into a revenue engine.",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=700&q=85",
    metrics: [
      { value: "1.7X", label: "Purchase Likelihood" },
      { value: "57%", label: "CTR on WhatsApp" },
      { value: "10%", label: "Subscription Growth" },
    ],
    author: "Arjun Menon",
    role: "Retention Manager, Tata CliQ",
    featured: false,
    tag: "CRM Automation",
  },
  {
    id: 9,
    company: "MagicBricks",
    logo: "MB",
    logoGradient: "linear-gradient(135deg,#2B6CB0,#90CDF4)",
    category: "Real Estate",
    title: "MagicBricks Captures 3X More Qualified Leads with AI WhatsApp Funnel",
    excerpt: "MagicBricks integrated PixoraNest's WhatsApp lead automation to qualify buyers instantly, schedule site visits automatically, and follow up with personalised property matches — reducing agent workload by 65%.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=700&q=85",
    metrics: [
      { value: "3X", label: "Qualified Leads" },
      { value: "65%", label: "Agent Workload Cut" },
      { value: "48hr", label: "Faster Site Visits" },
    ],
    author: "Amit Verma",
    role: "VP Sales, MagicBricks",
    featured: false,
    tag: "WhatsApp Automation",
  },
  {
    id: 10,
    company: "99acres",
    logo: "9A",
    logoGradient: "linear-gradient(135deg,#276749,#9AE6B4)",
    category: "Real Estate",
    title: "99acres Reduces Lead Drop-off by 45% Using PixoraNest CRM Automation",
    excerpt: "99acres deployed PixoraNest's CRM workflow to re-engage cold leads, automate property alert messaging, and route hot prospects directly to agents — increasing closure rates significantly.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=700&q=85",
    metrics: [
      { value: "45%", label: "Drop-off Reduced" },
      { value: "2.8X", label: "Closure Rate" },
      { value: "30%", label: "Cost Per Lead Cut" },
    ],
    author: "Sneha Pillai",
    role: "Head of Growth, 99acres",
    featured: false,
    tag: "CRM Automation",
  },
];

const testimonials = [
  {
    quote: "PixoraNest didn't just automate our calls — they transformed how our entire operations team functions. We went from missing 40% of inbound leads to capturing every single one, 24/7.",
    author: "Sanjay Kumar",
    role: "CEO, RealtyPlus India",
    avatar: "SK",
    gradient: "linear-gradient(135deg,#2B6CB0,#63B3ED)",
    stars: 5,
  },
  {
    quote: "The WhatsApp automation was live in 3 days. Within the first month, our lead response time dropped from 4 hours to 8 seconds. Our sales team finally has time to close, not chase.",
    author: "Preethi Iyer",
    role: "VP Growth, HealthFirst",
    avatar: "PI",
    gradient: "linear-gradient(135deg,#276749,#68D391)",
    stars: 5,
  },
  {
    quote: "We tried 3 other automation platforms before PixoraNest. None of them understood our industry. PixoraNest built a custom workflow that fits our logistics operations perfectly.",
    author: "Mahesh Rao",
    role: "COO, FastShip Logistics",
    avatar: "MR",
    gradient: "linear-gradient(135deg,#805AD5,#B794F4)",
    stars: 5,
  },
];

const heroCards = [
  { company: "NoBroker.com", metric: "4X", label: "Clickthrough Rate", cat: "Real Estate", grad: "linear-gradient(135deg,#E53E3E,#FC8181)", logo: "NB", barPct: "82%" },
  { company: "Apollo Hospitals", metric: "60%", label: "Wait Time Reduced", cat: "Healthcare", grad: "linear-gradient(135deg,#2B6CB0,#63B3ED)", logo: "AH", barPct: "74%" },
  { company: "Meesho", metric: "5X", label: "Lead Conversion", cat: "E-commerce", grad: "linear-gradient(135deg,#805AD5,#B794F4)", logo: "ME", barPct: "90%" },
];

export default function CustomerStoriesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [heroIn, setHeroIn] = useState(false);
  const [deckIdx, setDeckIdx] = useState(0);
  const [barActive, setBarActive] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setHeroIn(true), 80);
    const interval = setInterval(() => {
      setBarActive(false);
      setTimeout(() => {
        setDeckIdx(prev => (prev + 1) % 3);
        setBarActive(true);
      }, 300);
    }, 3200);
    return () => { clearTimeout(t1); clearInterval(interval); };
  }, []);

  const filtered = activeCategory === "All"
    ? stories
    : stories.filter(s => s.category === activeCategory);

  const featuredStory = stories.find(s => s.featured)!;

  return (
    <main className="cs-page">

      {/* ════════════════════ HERO ════════════════════ */}
      <section className="hero">
        <div className="hero-base" />
        <div className="hero-spot-1" />
        <div className="hero-spot-2" />
        <div className="hero-spot-3" />
        <div className="hero-grid-overlay" />

        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="ptcl" style={{
            left: `${(i * 17 + 5) % 100}%`,
            top: `${(i * 23 + 10) % 100}%`,
            animationDuration: `${6 + (i % 7)}s`,
            animationDelay: `${(i * 0.4) % 5}s`,
            width: i % 3 === 0 ? "2px" : "3px",
            height: i % 3 === 0 ? "2px" : "3px",
            opacity: 0.3 + (i % 4) * 0.15,
          } as React.CSSProperties} />
        ))}

        <div className="aurora a1" />
        <div className="aurora a2" />
        <div className="aurora a3" />

        <div className="hero-wrap">
          {/* ── LEFT ── */}
          <div className={`hl ${heroIn ? "hl-in" : ""}`}>
            <div className="live-badge">
              <span className="live-ring-outer" />
              <span className="live-green" />
              <span className="live-text">Customer Success Stories</span>
              <span className="live-pill">500+ Businesses</span>
            </div>

            <h1 className="hero-h1">
              <span className="h1-w">Real Businesses.</span>
              <span className="h1-g">Real Results.</span>
            </h1>

            <p className="hero-p">
              Discover how industry leaders across India automate operations,
              capture 10× more leads, and deliver exceptional customer
              experiences with PixoraNest AI.
            </p>

            <div className="belt-wrap">
              <div className="belt">
                {["🏥 Healthcare","🏠 Real Estate","🛒 E-commerce","🏦 Finance","🚚 Logistics","🍽️ Hospitality","🏥 Healthcare","🏠 Real Estate","🛒 E-commerce","🏦 Finance"].map((t,i)=>(
                  <span key={i} className="belt-chip">{t}</span>
                ))}
              </div>
            </div>

            <div className="hero-stats-bar">
              {stats.map((s, i) => (
                <div key={s.label} className="hstat">
                  <span className="hstat-icon">{s.icon}</span>
                  <span className="hstat-val">{s.value}</span>
                  <span className="hstat-lbl">{s.label}</span>
                  {i < stats.length - 1 && <div className="hstat-div" />}
                </div>
              ))}
            </div>

            <div className="hero-btns">
              <Link href="#stories" className="hbtn-primary">
                Explore Stories
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </Link>
              <Link href="/contact" className="hbtn-ghost">Book a Free Demo</Link>
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className={`hr ${heroIn ? "hr-in" : ""}`}>
            <div className="glow-ring" />

            <div className="deck">
              {heroCards.map((card, i) => {
                const isActive = i === deckIdx;
                const isBehind = i === (deckIdx - 1 + 3) % 3;
                return (
                  <div key={i} className={`dcard ${isActive ? "dcard-active" : isBehind ? "dcard-behind" : "dcard-hide"}`}>
                    <div className="dcard-top">
                      <div className="dcard-logo" style={{ background: card.grad }}>{card.logo}</div>
                      <div className="dcard-info">
                        <span className="dcard-co">{card.company}</span>
                        <span className="dcard-cat">{card.cat}</span>
                      </div>
                      <span className="dcard-verified">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/></svg>
                        Verified
                      </span>
                    </div>
                    <div className="dcard-metric">
                      <span className="dcard-mval">{card.metric}</span>
                      <span className="dcard-mlbl">{card.label}</span>
                    </div>
                    <div className="dcard-bar-sec">
                      <span className="dcard-bar-title">Performance Growth</span>
                      <div className="dcard-track">
                        <div className="dcard-fill" style={{ width: isActive && barActive ? card.barPct : "0%" }} />
                      </div>
                      <span className="dcard-bar-pct">{card.barPct}</span>
                    </div>
                    <div className="dcard-footer">
                      <div className="deck-dots">
                        {heroCards.map((_, di) => (
                          <span key={di} className={`ddot ${di === deckIdx ? "ddot-on" : ""}`} />
                        ))}
                      </div>
                      <span className="dcard-cta">View Case Study →</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="toast t1">
              <span className="ti">🚀</span>
              <div><div className="tt">Lead Converted</div><div className="ts2">2 seconds after inquiry</div></div>
              <span className="ttime">just now</span>
            </div>
            <div className="toast t2">
              <span className="ti">✅</span>
              <div><div className="tt">AI Appointment Booked</div><div className="ts2">Apollo · AI Receptionist</div></div>
              <span className="ttime">1m ago</span>
            </div>
            <div className="toast t3">
              <span className="ti">💰</span>
              <div><div className="tt">Deal Closed — ₹2.4L</div><div className="ts2">MagicBricks · WhatsApp Bot</div></div>
              <span className="ttime">3m ago</span>
            </div>

            <div className="mpill mp1">
              <span className="mpv">10M+</span><span className="mpl">Messages / Month</span>
            </div>
            <div className="mpill mp2">
              <span className="mpv">98%</span><span className="mpl">Satisfaction Rate</span>
            </div>
          </div>
        </div>

        <div className="hero-wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,80 L0,80 Z" fill="rgba(219,234,254,0.5)"/>
          </svg>
        </div>
      </section>

      {/* ════════════════════ FEATURED ════════════════════ */}
      <section className="feat-sec container" id="stories">
        <div className="eyebrow">Featured Story</div>
        <div className="feat-card">
          <div className="feat-img-wrap">
            <img src={featuredStory.image} alt={featuredStory.company} className="feat-img" loading="eager" />
            <div className="feat-img-ov" />
            <div className="feat-star-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#d97706"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              Featured Story
            </div>
          </div>
          <div className="feat-body">
            <div className="feat-co-row">
              <div className="feat-logo" style={{ background: featuredStory.logoGradient }}>{featuredStory.logo}</div>
              <div>
                <div className="feat-co-name">{featuredStory.company}</div>
                <div className="feat-co-tag">{featuredStory.tag}</div>
              </div>
              <span className="feat-co-cat">{featuredStory.category}</span>
            </div>
            <h2 className="feat-title">{featuredStory.title}</h2>
            <p className="feat-excerpt">{featuredStory.excerpt}</p>
            <div className="feat-metrics">
              {featuredStory.metrics.map(m => (
                <div key={m.label} className="fm">
                  <span className="fm-v">{m.value}</span>
                  <span className="fm-l">{m.label}</span>
                </div>
              ))}
            </div>
            <div className="feat-foot">
              <div className="feat-author">
                <div className="feat-av" style={{ background: featuredStory.logoGradient }}>{featuredStory.author[0]}</div>
                <div>
                  <div className="feat-an">{featuredStory.author}</div>
                  <div className="feat-ar">{featuredStory.role}</div>
                </div>
              </div>
              <Link href="#" className="feat-btn">Read Full Story →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════ GRID ════════════════════ */}
      <section className="grid-sec container">
        <div className="eyebrow">All Stories</div>
        <h2 className="sec-title">Browse by Industry</h2>
        <p className="sec-sub">Find customer stories relevant to your business</p>

        <div className="filter-bar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`fbtn ${activeCategory === cat ? "fbtn-on" : ""}`}
            >
              {cat}
              {cat !== "All" && (
                <span className="fcount">{stories.filter(s => s.category === cat).length}</span>
              )}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="empty">
            <div className="empty-icon">🔍</div>
            <div className="empty-t">No stories yet for {activeCategory}</div>
            <div className="empty-s">More case studies coming soon!</div>
          </div>
        ) : (
          <div className="sgrid">
            {filtered.map(story => (
              <div key={story.id} className="scard">
                <div className="scard-imgw">
                  <img src={story.image} alt={story.company} className="scard-img" loading="lazy" />
                  <div className="scard-ov" />
                  <span className="scard-tag">{story.tag}</span>
                  {story.featured && <span className="scard-feat">Featured</span>}
                </div>
                <div className="scard-body">
                  <div className="scard-corow">
                    <div className="scard-logo" style={{ background: story.logoGradient }}>{story.logo}</div>
                    <span className="scard-co">{story.company}</span>
                    <span className="scard-cat">{story.category}</span>
                  </div>
                  <h3 className="scard-title">{story.title}</h3>
                  <p className="scard-exc">{story.excerpt}</p>
                  <div className="scard-metrics">
                    {story.metrics.map(m => (
                      <div key={m.label} className="sm">
                        <span className="sm-v">{m.value}</span>
                        <span className="sm-l">{m.label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="scard-foot">
                    <div className="scard-auth">
                      <div className="scard-av" style={{ background: story.logoGradient }}>{story.author[0]}</div>
                      <div>
                        <div className="scard-an">{story.author}</div>
                        <div className="scard-ar">{story.role}</div>
                      </div>
                    </div>
                    <Link href="#" className="scard-link">Find out more →</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ════════════════════ TESTIMONIALS ════════════════════ */}
      <section className="testi-sec">
        <div className="testi-bg" />
        <div className="testi-grid-bg" />
        <div className="container testi-inner">
          <div className="eyebrow testi-ey">Client Voices</div>
          <h2 className="sec-title testi-t">What Our Clients Say</h2>
          <p className="sec-sub testi-s">In their own words</p>
          <div className="tgrid">
            {testimonials.map((t, i) => (
              <div key={i} className="tcard">
                <div className="tcard-stars">{"★".repeat(t.stars)}</div>
                <div className="tcard-q">"</div>
                <p className="tcard-text">{t.quote}</p>
                <div className="tcard-auth">
                  <div className="tcard-av" style={{ background: t.gradient }}>{t.avatar}</div>
                  <div>
                    <div className="tcard-name">{t.author}</div>
                    <div className="tcard-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════ CTA ════════════════════ */}
      <section className="cta-sec">
        <div className="cta-g1" /><div className="cta-g2" />
        <div className="container cta-inner">
          <div className="cta-icon">
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
          <h2 className="cta-title">Ready to Write<br /><span className="cta-grad">Your Success Story?</span></h2>
          <p className="cta-sub">Join 500+ businesses already automating with PixoraNest. Go live in 3 days.</p>
          <div className="cta-proof">
            {["500+ Businesses","No Coding Needed","Live in 3 Days","24/7 AI Support"].map(p=>(
              <span key={p} className="cta-pi">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#16a34a" strokeWidth="2" strokeLinecap="round"/></svg>
                {p}
              </span>
            ))}
          </div>
          <div className="cta-btns">
            <Link href="/contact" className="cta-primary">Book a Free Demo →</Link>
            <Link href="/solutions" className="cta-secondary">Explore Solutions</Link>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
      `}</style>

      <style jsx>{`
        /* ── Base ── */
        .cs-page { font-family:'Plus Jakarta Sans',system-ui,sans-serif; background:transparent; color:#1e293b; overflow-x:hidden; }
        .container { max-width:1200px; margin:0 auto; padding:0 28px; }
        .eyebrow { font-size:11px; font-weight:800; letter-spacing:0.12em; text-transform:uppercase; color:#2563eb; margin-bottom:10px; }
        .sec-title { font-size:36px; font-weight:900; color:#0f172a; margin:0 0 10px; letter-spacing:-0.025em; }
        .sec-sub { font-size:16px; color:#64748b; margin:0 0 36px; }

        /* ══════════ HERO ══════════ */
        .hero {
          position:relative; min-height:100vh;
          display:flex; align-items:center;
          overflow:hidden;
          background:transparent;
        }
        .hero-base {
          position:absolute; inset:0;
          background:
            radial-gradient(ellipse 130% 80% at 15% 50%, rgba(219,234,254,0.9) 0%, transparent 55%),
            radial-gradient(ellipse 80% 60% at 85% 15%, rgba(186,230,253,0.7) 0%, transparent 55%),
            radial-gradient(ellipse 50% 50% at 60% 85%, rgba(224,231,255,0.6) 0%, transparent 50%),
            transparent;
        }
        .hero-spot-1 { position:absolute; width:900px; height:700px; border-radius:50%; background:radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 65%); top:-250px; left:-150px; animation:spotDrift 14s ease-in-out infinite alternate; }
        .hero-spot-2 { position:absolute; width:700px; height:600px; border-radius:50%; background:radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 65%); bottom:-200px; right:5%; animation:spotDrift2 18s ease-in-out infinite alternate; }
        .hero-spot-3 { position:absolute; width:500px; height:400px; border-radius:50%; background:radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 65%); top:35%; right:28%; animation:spotDrift 22s ease-in-out infinite alternate-reverse; }
        @keyframes spotDrift  { from{transform:translate(0,0) scale(1)} to{transform:translate(70px,50px) scale(1.12)} }
        @keyframes spotDrift2 { from{transform:translate(0,0) scale(1)} to{transform:translate(-50px,-70px) scale(1.1)} }

        .hero-grid-overlay { position:absolute; inset:0; background-image:linear-gradient(rgba(37,99,235,0.04) 1px, transparent 1px),linear-gradient(90deg, rgba(37,99,235,0.04) 1px, transparent 1px); background-size:52px 52px; mask-image:radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%); }

        .ptcl { position:absolute; border-radius:50%; background:rgba(37,99,235,0.4); animation:ptclUp linear infinite; }
        @keyframes ptclUp { 0%{transform:translateY(0) translateX(0);opacity:0} 10%{opacity:1} 90%{opacity:0.5} 100%{transform:translateY(-140px) translateX(20px);opacity:0} }

        .aurora { position:absolute; height:1px; border-radius:1px; opacity:0; animation:auroraMove linear infinite; }
        .a1 { width:350px; top:22%; left:-350px; background:linear-gradient(90deg,transparent,rgba(37,99,235,0.3),transparent); animation-duration:7s; animation-delay:0s; }
        .a2 { width:260px; top:58%; left:-260px; background:linear-gradient(90deg,transparent,rgba(139,92,246,0.25),transparent); animation-duration:10s; animation-delay:3.5s; }
        .a3 { width:440px; top:78%; left:-440px; background:linear-gradient(90deg,transparent,rgba(16,185,129,0.2),transparent); animation-duration:9s; animation-delay:1.5s; }
        @keyframes auroraMove { 0%{left:-450px;opacity:0} 8%{opacity:1} 92%{opacity:0.7} 100%{left:110%;opacity:0} }

        .hero-wrap { position:relative; z-index:10; max-width:1200px; margin:0 auto; padding:100px 28px 130px; display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:center; width:100%; }

        .hl { display:flex; flex-direction:column; gap:28px; opacity:0; transform:translateX(-44px); transition:all 1s cubic-bezier(0.16,1,0.3,1); }
        .hl-in { opacity:1; transform:translateX(0); }

        .live-badge { display:inline-flex; align-items:center; gap:8px; width:fit-content; background:rgba(255,255,255,0.7); border:1px solid rgba(37,99,235,0.15); padding:6px 14px 6px 8px; border-radius:100px; font-size:13px; font-weight:600; color:#334155; backdrop-filter:blur(8px); }
        .live-ring-outer { position:relative; width:16px; height:16px; flex-shrink:0; border-radius:50%; display:flex; align-items:center; justify-content:center; }
        .live-ring-outer::before { content:''; position:absolute; inset:-2px; border-radius:50%; border:1.5px solid rgba(22,163,74,0.5); animation:liveRing 2s ease infinite; }
        .live-green { position:absolute; width:8px; height:8px; border-radius:50%; background:#16a34a; left:4px; top:4px; }
        @keyframes liveRing { 0%,100%{transform:scale(1);opacity:0.8} 50%{transform:scale(1.8);opacity:0} }
        .live-pill { background:rgba(37,99,235,0.1); border:1px solid rgba(37,99,235,0.2); color:#2563eb; font-size:11px; font-weight:700; padding:2px 8px; border-radius:100px; }

        .hero-h1 { display:flex; flex-direction:column; margin:0; gap:4px; font-size:clamp(38px,4vw,62px); font-weight:900; line-height:1.06; letter-spacing:-0.03em; }
        .h1-w { color:#0f172a; }
        .h1-g { background:linear-gradient(100deg,#2563eb 0%,#7c3aed 45%,#0891b2 90%); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; background-size:200%; animation:gShift 5s ease infinite; }
        @keyframes gShift { 0%,100%{background-position:0%} 50%{background-position:100%} }

        .hero-p { font-size:16px; line-height:1.78; color:#475569; margin:0; max-width:440px; }

        .belt-wrap { overflow:hidden; mask-image:linear-gradient(90deg,transparent 0%,black 12%,black 88%,transparent 100%); }
        .belt { display:flex; gap:10px; width:max-content; animation:beltScroll 22s linear infinite; }
        @keyframes beltScroll { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        .belt-chip { white-space:nowrap; font-size:12px; font-weight:600; color:#475569; border:1px solid rgba(37,99,235,0.15); background:rgba(255,255,255,0.6); padding:5px 14px; border-radius:100px; flex-shrink:0; backdrop-filter:blur(4px); }

        .hero-stats-bar { display:flex; background:rgba(255,255,255,0.6); border:1px solid rgba(37,99,235,0.12); border-radius:16px; overflow:hidden; backdrop-filter:blur(12px); }
        .hstat { display:flex; flex-direction:column; align-items:center; padding:16px 18px; flex:1; gap:3px; position:relative; }
        .hstat-div { position:absolute; right:0; top:20%; bottom:20%; width:1px; background:rgba(37,99,235,0.1); }
        .hstat-icon { font-size:15px; }
        .hstat-val { font-size:20px; font-weight:900; color:#2563eb; line-height:1; letter-spacing:-0.02em; }
        .hstat-lbl { font-size:10px; color:#94a3b8; font-weight:600; text-align:center; }

        .hero-btns { display:flex; gap:14px; align-items:center; }
        .hbtn-primary { display:inline-flex; align-items:center; gap:8px; background:linear-gradient(135deg,#1d4ed8,#3b82f6); color:#fff; padding:13px 24px; border-radius:10px; font-weight:800; font-size:14px; text-decoration:none; box-shadow:0 8px 24px rgba(37,99,235,0.3); transition:all 0.25s; }
        .hbtn-primary:hover { transform:translateY(-2px); box-shadow:0 14px 36px rgba(37,99,235,0.4); }
        .hbtn-ghost { color:#475569; font-size:14px; font-weight:700; text-decoration:none; border-bottom:1px solid rgba(37,99,235,0.3); padding-bottom:2px; transition:color 0.2s; }
        .hbtn-ghost:hover { color:#2563eb; }

        .hr { position:relative; opacity:0; transform:translateX(44px); transition:all 1.1s cubic-bezier(0.16,1,0.3,1) 0.15s; }
        .hr-in { opacity:1; transform:translateX(0); }
        .glow-ring { position:absolute; width:440px; height:440px; border-radius:50%; border:1px solid rgba(37,99,235,0.1); top:50%; left:50%; transform:translate(-50%,-50%); animation:gRing 8s ease-in-out infinite; pointer-events:none; }
        .glow-ring::before { content:''; position:absolute; inset:32px; border-radius:50%; border:1px dashed rgba(37,99,235,0.07); animation:gRing 12s ease-in-out infinite reverse; }
        @keyframes gRing { 0%,100%{transform:translate(-50%,-50%) scale(1) rotate(0deg)} 50%{transform:translate(-50%,-50%) scale(1.06) rotate(180deg)} }

        .deck { position:relative; height:290px; margin:0 16px; }
        .dcard { position:absolute; inset:0; background:rgba(255,255,255,0.75); border:1px solid rgba(37,99,235,0.12); border-radius:22px; padding:26px; backdrop-filter:blur(20px); display:flex; flex-direction:column; gap:18px; transition:all 0.55s cubic-bezier(0.16,1,0.3,1); }
        .dcard-active { opacity:1; transform:translateY(0) scale(1); z-index:3; border-color:rgba(37,99,235,0.25); box-shadow:0 28px 64px rgba(37,99,235,0.12),0 0 0 1px rgba(37,99,235,0.08); }
        .dcard-behind { opacity:0.32; transform:translateY(14px) scale(0.96); z-index:2; }
        .dcard-hide   { opacity:0;    transform:translateY(28px) scale(0.91); z-index:1; }
        .dcard-top { display:flex; align-items:center; gap:10px; }
        .dcard-logo { width:38px; height:38px; border-radius:10px; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:900; font-size:12px; flex-shrink:0; }
        .dcard-info { flex:1; }
        .dcard-co { display:block; font-weight:800; font-size:14px; color:#0f172a; }
        .dcard-cat { font-size:11px; color:#94a3b8; }
        .dcard-verified { display:flex; align-items:center; gap:4px; font-size:11px; font-weight:700; color:#16a34a; background:rgba(22,163,74,0.08); border:1px solid rgba(22,163,74,0.2); border-radius:100px; padding:3px 9px; flex-shrink:0; }
        .dcard-metric { display:flex; align-items:baseline; gap:12px; }
        .dcard-mval { font-size:52px; font-weight:900; color:#2563eb; letter-spacing:-0.04em; line-height:1; }
        .dcard-mlbl { font-size:15px; color:#64748b; font-weight:600; }
        .dcard-bar-sec { display:flex; align-items:center; gap:8px; }
        .dcard-bar-title { font-size:11px; color:#94a3b8; white-space:nowrap; font-weight:500; }
        .dcard-track { flex:1; height:6px; background:rgba(37,99,235,0.1); border-radius:100px; overflow:hidden; }
        .dcard-fill { height:100%; background:linear-gradient(90deg,#1d4ed8,#3b82f6,#0891b2); border-radius:100px; transition:width 1.3s cubic-bezier(0.16,1,0.3,1) 0.3s; }
        .dcard-bar-pct { font-size:12px; font-weight:800; color:#2563eb; }
        .dcard-footer { display:flex; align-items:center; justify-content:space-between; margin-top:auto; }
        .deck-dots { display:flex; gap:5px; }
        .ddot { width:5px; height:5px; border-radius:50%; background:rgba(37,99,235,0.2); transition:all 0.35s; }
        .ddot-on { background:#2563eb; width:18px; border-radius:3px; }
        .dcard-cta { font-size:12px; font-weight:700; color:#2563eb; cursor:pointer; }

        .toast { display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.75); border:1px solid rgba(37,99,235,0.12); border-radius:12px; padding:10px 14px; backdrop-filter:blur(16px); position:relative; z-index:5; }
        .t1 { margin-top:12px; animation:tFloat 5s ease-in-out infinite; }
        .t2 { margin-top:8px;  animation:tFloat 6.5s ease-in-out infinite 1s; }
        .t3 { margin-top:8px;  animation:tFloat 7s ease-in-out infinite 2.2s; }
        @keyframes tFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-6px)} }
        .ti { font-size:20px; flex-shrink:0; }
        .tt { font-size:13px; font-weight:700; color:#0f172a; }
        .ts2 { font-size:11px; color:#94a3b8; margin-top:1px; }
        .ttime { margin-left:auto; font-size:10px; color:#cbd5e1; white-space:nowrap; }

        .mpill { display:inline-flex; align-items:center; gap:7px; background:rgba(37,99,235,0.08); border:1px solid rgba(37,99,235,0.15); border-radius:100px; padding:5px 14px; }
        .mp1 { margin-top:10px; animation:tFloat 4.5s ease-in-out infinite; }
        .mp2 { margin-left:10px; animation:tFloat 5.5s ease-in-out infinite 1.5s; }
        .mpv { font-size:14px; font-weight:900; color:#2563eb; }
        .mpl { font-size:11px; color:#64748b; font-weight:500; }

        .hero-wave { position:absolute; bottom:-1px; left:0; right:0; height:80px; z-index:10; pointer-events:none; }
        .hero-wave svg { width:100%; height:100%; display:block; }

        /* ══════════ FEATURED ══════════ */
        .feat-sec { padding:72px 28px 0; }
        .feat-card { display:grid; grid-template-columns:1fr 1fr; background:rgba(255,255,255,0.6); backdrop-filter:blur(20px); border-radius:24px; overflow:hidden; border:1px solid rgba(37,99,235,0.12); box-shadow:0 28px 80px rgba(37,99,235,0.08); }
        .feat-img-wrap { position:relative; min-height:480px; overflow:hidden; }
        .feat-img { width:100%; height:100%; object-fit:cover; display:block; transition:transform 7s ease; }
        .feat-card:hover .feat-img { transform:scale(1.05); }
        .feat-img-ov { position:absolute; inset:0; background:linear-gradient(135deg,rgba(15,23,42,0.3),rgba(15,23,42,0.05) 60%,transparent); }
        .feat-star-badge { position:absolute; top:20px; left:20px; display:flex; align-items:center; gap:5px; background:rgba(255,255,255,0.85); backdrop-filter:blur(8px); border:1px solid rgba(217,119,6,0.3); color:#d97706; font-size:12px; font-weight:700; padding:5px 12px; border-radius:100px; }
        .feat-body { padding:44px; display:flex; flex-direction:column; gap:22px; background:transparent; }
        .feat-co-row { display:flex; align-items:center; gap:12px; }
        .feat-logo { width:46px; height:46px; border-radius:12px; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:900; font-size:14px; flex-shrink:0; box-shadow:0 4px 14px rgba(0,0,0,0.15); }
        .feat-co-name { font-weight:800; font-size:15px; color:#0f172a; }
        .feat-co-tag { font-size:11px; color:#2563eb; background:rgba(37,99,235,0.1); padding:2px 9px; border-radius:100px; font-weight:700; }
        .feat-co-cat { margin-left:auto; font-size:11px; font-weight:700; color:#475569; background:rgba(71,85,105,0.1); padding:3px 10px; border-radius:100px; }
        .feat-title { font-size:22px; font-weight:900; line-height:1.3; color:#0f172a; margin:0; }
        .feat-excerpt { font-size:15px; line-height:1.75; color:#475569; margin:0; }
        .feat-metrics { display:flex; gap:12px; }
        .fm { flex:1; background:rgba(37,99,235,0.05); border-radius:14px; padding:16px 10px; display:flex; flex-direction:column; align-items:center; border:1px solid rgba(37,99,235,0.1); transition:all 0.2s; }
        .fm:hover { background:rgba(37,99,235,0.1); border-color:rgba(37,99,235,0.25); transform:translateY(-2px); }
        .fm-v { font-size:26px; font-weight:900; color:#2563eb; line-height:1; letter-spacing:-0.02em; }
        .fm-l { font-size:11px; color:#64748b; margin-top:5px; font-weight:700; text-align:center; }
        .feat-foot { display:flex; align-items:center; justify-content:space-between; margin-top:auto; }
        .feat-author { display:flex; align-items:center; gap:12px; }
        .feat-av { width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:800; font-size:14px; }
        .feat-an { font-weight:700; font-size:14px; color:#0f172a; }
        .feat-ar { font-size:12px; color:#94a3b8; }
        .feat-btn { background:linear-gradient(135deg,#1d4ed8,#3b82f6); color:#fff; padding:11px 22px; border-radius:10px; font-size:14px; font-weight:800; text-decoration:none; box-shadow:0 4px 16px rgba(37,99,235,0.3); transition:all 0.2s; }
        .feat-btn:hover { transform:translateY(-1px); box-shadow:0 10px 28px rgba(37,99,235,0.4); }

        /* ══════════ GRID ══════════ */
        .grid-sec { padding:72px 28px 80px; }
        .filter-bar { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:40px; }
        .fbtn { display:inline-flex; align-items:center; gap:6px; padding:8px 18px; border-radius:100px; border:1.5px solid rgba(37,99,235,0.2); background:rgba(255,255,255,0.6); color:#475569; font-size:13px; font-weight:700; cursor:pointer; transition:all 0.2s; font-family:inherit; backdrop-filter:blur(8px); }
        .fbtn:hover { border-color:rgba(37,99,235,0.5); color:#2563eb; background:rgba(37,99,235,0.06); }
        .fbtn-on { background:rgba(37,99,235,0.9); border-color:#1d4ed8; color:#fff; box-shadow:0 4px 16px rgba(37,99,235,0.3); }
        .fbtn-on:hover { background:rgba(29,78,216,0.95); color:#fff; }
        .fcount { font-size:10px; font-weight:800; padding:1px 6px; border-radius:100px; background:rgba(255,255,255,0.25); }

        .empty { text-align:center; padding:80px 20px; display:flex; flex-direction:column; align-items:center; gap:12px; }
        .empty-icon { font-size:52px; }
        .empty-t { font-size:20px; font-weight:800; color:#0f172a; }
        .empty-s { font-size:14px; color:#94a3b8; }

        .sgrid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; }
        .scard { background:rgba(255,255,255,0.65); backdrop-filter:blur(16px); border-radius:20px; overflow:hidden; border:1px solid rgba(37,99,235,0.1); display:flex; flex-direction:column; transition:transform 0.3s cubic-bezier(0.16,1,0.3,1),box-shadow 0.3s; }
        .scard:hover { transform:translateY(-6px); box-shadow:0 22px 54px rgba(37,99,235,0.12); border-color:rgba(37,99,235,0.25); }
        .scard-imgw { position:relative; height:200px; overflow:hidden; }
        .scard-img { width:100%; height:100%; object-fit:cover; transition:transform 0.5s; }
        .scard:hover .scard-img { transform:scale(1.07); }
        .scard-ov { position:absolute; inset:0; background:linear-gradient(180deg,transparent 40%,rgba(15,23,42,0.2)); }
        .scard-tag { position:absolute; top:12px; right:12px; background:rgba(255,255,255,0.85); backdrop-filter:blur(8px); color:#334155; font-size:10px; font-weight:700; padding:4px 10px; border-radius:100px; letter-spacing:0.04em; }
        .scard-feat { position:absolute; top:12px; left:12px; background:rgba(251,191,36,0.9); color:#78350f; font-size:10px; font-weight:800; padding:4px 10px; border-radius:100px; }
        .scard-body { padding:22px; display:flex; flex-direction:column; gap:12px; flex:1; }
        .scard-corow { display:flex; align-items:center; gap:8px; }
        .scard-logo { width:32px; height:32px; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:900; font-size:11px; flex-shrink:0; box-shadow:0 2px 8px rgba(0,0,0,0.15); }
        .scard-co { font-weight:800; font-size:13px; color:#0f172a; }
        .scard-cat { margin-left:auto; font-size:10px; font-weight:700; color:#2563eb; background:rgba(37,99,235,0.1); padding:2px 8px; border-radius:100px; }
        .scard-title { font-size:15px; font-weight:800; line-height:1.4; color:#0f172a; margin:0; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
        .scard-exc { font-size:13px; line-height:1.65; color:#64748b; margin:0; display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden; }
        .scard-metrics { display:flex; gap:8px; }
        .sm { flex:1; background:rgba(37,99,235,0.05); border-radius:10px; padding:10px 8px; text-align:center; border:1px solid rgba(37,99,235,0.1); transition:all 0.2s; }
        .scard:hover .sm { background:rgba(37,99,235,0.09); border-color:rgba(37,99,235,0.2); }
        .sm-v { display:block; font-size:17px; font-weight:900; color:#2563eb; line-height:1; }
        .sm-l { display:block; font-size:10px; color:#94a3b8; margin-top:3px; font-weight:700; }
        .scard-foot { display:flex; align-items:center; justify-content:space-between; margin-top:auto; padding-top:12px; border-top:1px solid rgba(37,99,235,0.08); }
        .scard-auth { display:flex; align-items:center; gap:8px; }
        .scard-av { width:30px; height:30px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:900; font-size:11px; flex-shrink:0; }
        .scard-an { font-size:12px; font-weight:700; color:#0f172a; }
        .scard-ar { font-size:10px; color:#94a3b8; }
        .scard-link { font-size:12px; font-weight:800; color:#2563eb; text-decoration:none; transition:color 0.2s; white-space:nowrap; }
        .scard-link:hover { color:#1d4ed8; }

        /* ══════════ TESTIMONIALS ══════════ */
        .testi-sec { position:relative; padding:88px 0; overflow:hidden; }
        .testi-bg { position:absolute; inset:0; background:linear-gradient(135deg,rgba(219,234,254,0.6) 0%,rgba(238,242,255,0.8) 50%,rgba(219,234,254,0.6) 100%); }
        .testi-grid-bg { position:absolute; inset:0; background-image:linear-gradient(rgba(37,99,235,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,0.04) 1px,transparent 1px); background-size:48px 48px; }
        .testi-inner { position:relative; z-index:1; }
        .testi-ey { color:#2563eb; }
        .testi-t { color:#0f172a; }
        .testi-s { color:#64748b; }
        .tgrid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; margin-top:40px; }
        .tcard { background:rgba(255,255,255,0.7); border:1px solid rgba(37,99,235,0.1); border-radius:20px; padding:32px; backdrop-filter:blur(12px); display:flex; flex-direction:column; gap:16px; transition:all 0.3s; }
        .tcard:hover { background:rgba(255,255,255,0.85); border-color:rgba(37,99,235,0.2); transform:translateY(-3px); box-shadow:0 16px 40px rgba(37,99,235,0.08); }
        .tcard-stars { font-size:14px; color:#d97706; letter-spacing:2px; }
        .tcard-q { font-size:56px; font-family:Georgia,serif; line-height:0.6; color:#2563eb; display:block; }
        .tcard-text { font-size:15px; line-height:1.75; color:#334155; margin:0; font-style:italic; flex:1; }
        .tcard-auth { display:flex; align-items:center; gap:12px; }
        .tcard-av { width:44px; height:44px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:800; font-size:14px; flex-shrink:0; }
        .tcard-name { font-weight:800; color:#0f172a; font-size:14px; }
        .tcard-role { font-size:12px; color:#94a3b8; margin-top:2px; }

        /* ══════════ CTA ══════════ */
        .cta-sec { position:relative; background:transparent; padding:88px 0 100px; text-align:center; overflow:hidden; }
        .cta-g1 { position:absolute; width:700px; height:400px; background:radial-gradient(ellipse,rgba(37,99,235,0.08),transparent 70%); top:50%; left:50%; transform:translate(-50%,-50%); }
        .cta-g2 { position:absolute; width:350px; height:350px; background:radial-gradient(ellipse,rgba(139,92,246,0.05),transparent 70%); top:15%; right:12%; }
        .cta-inner { position:relative; z-index:1; }
        .cta-icon { width:64px; height:64px; border-radius:50%; background:rgba(37,99,235,0.1); border:1px solid rgba(37,99,235,0.2); display:flex; align-items:center; justify-content:center; margin:0 auto 24px; }
        .cta-title { font-size:46px; font-weight:900; color:#0f172a; margin:0 0 16px; letter-spacing:-0.03em; line-height:1.1; }
        .cta-grad { background:linear-gradient(100deg,#2563eb,#7c3aed,#0891b2); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .cta-sub { font-size:17px; color:#64748b; margin:0 auto 28px; max-width:480px; }
        .cta-proof { display:flex; flex-wrap:wrap; gap:16px; justify-content:center; margin-bottom:36px; }
        .cta-pi { display:flex; align-items:center; gap:6px; font-size:13px; font-weight:700; color:#475569; }
        .cta-btns { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; }
        .cta-primary { background:linear-gradient(135deg,#1d4ed8,#3b82f6); color:#fff; padding:15px 30px; border-radius:12px; font-weight:800; font-size:15px; text-decoration:none; box-shadow:0 8px 24px rgba(37,99,235,0.3); transition:all 0.2s; }
        .cta-primary:hover { transform:translateY(-2px); box-shadow:0 16px 40px rgba(37,99,235,0.4); }
        .cta-secondary { background:rgba(255,255,255,0.7); color:#334155; padding:15px 30px; border-radius:12px; font-weight:800; font-size:15px; text-decoration:none; border:1.5px solid rgba(37,99,235,0.2); backdrop-filter:blur(8px); transition:all 0.2s; }
        .cta-secondary:hover { background:rgba(255,255,255,0.9); transform:translateY(-2px); border-color:rgba(37,99,235,0.35); }

        /* ══════════ RESPONSIVE ══════════ */
        @media (max-width:960px) {
          .hero-wrap { grid-template-columns:1fr; gap:40px; padding:80px 20px 100px; }
          .hr { display:none; }
          .hl { align-items:center; text-align:center; }
          .live-badge { align-self:center; }
          .hero-p { max-width:100%; }
          .hero-btns { justify-content:center; }
          .feat-card { grid-template-columns:1fr; }
          .feat-img-wrap { min-height:260px; }
          .tgrid { grid-template-columns:1fr; }
          .sgrid { grid-template-columns:repeat(2,1fr); }
        }
        @media (max-width:620px) {
          .sgrid { grid-template-columns:1fr; }
          .hero-h1 { font-size:36px; }
          .cta-title { font-size:32px; }
          .feat-body { padding:28px; }
        }
      `}</style>
    </main>
  );
}