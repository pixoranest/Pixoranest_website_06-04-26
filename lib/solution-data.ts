// lib/solutions-data.ts
// PixoraNest – Full SEO-optimised solution data for all 6 products

export interface FAQ {
  q: string
  a: string
}

export interface Step {
  num: string
  title: string
  desc: string
}

export interface Feature {
  icon: string
  title: string
  desc: string
}

export interface Benefit {
  stat: string
  label: string
  desc: string
}

export interface UseCase {
  industry: string
  scenario: string
}

export interface Testimonial {
  name: string
  role: string
  company: string
  quote: string
  rating: number
}

export interface ImageSuggestion {
  filename: string
  alt: string
  section: string
}

export interface SolutionData {
  // SEO
  slug: string
  metaTitle: string
  metaDescription: string
  focusKeyword: string
  secondaryKeywords: string[]

  // Hero
  badge: string
  h1: string
  heroSubtext: string
  heroCTA: string
  heroSecondaryCTA: string

  // Problem
  problemHeading: string
  problemIntro: string
  problemPoints: string[]

  // Solution overview
  solutionHeading: string
  solutionSubheading: string
  solutionDesc: string

  // Features
  featuresHeading: string
  features: Feature[]

  // Benefits
  benefitsHeading: string
  benefits: Benefit[]

  // Use Cases
  useCasesHeading: string
  useCases: UseCase[]

  // How it works
  howItWorksHeading: string
  steps: Step[]

  // Why PixoraNest
  whyHeading: string
  whyPoints: string[]

  // Testimonials
  testimonials: Testimonial[]

  // FAQ
  faqHeading: string
  faqs: FAQ[]

  // Image suggestions
  images: ImageSuggestion[]

  // Internal links
  internalLinks: { anchor: string; href: string }[]

  // Schema
  schemaService: object
  schemaFAQ: object
}

// ─────────────────────────────────────────────────────────────────────────────
// 1. FirstVoice – AI Receptionist
// ─────────────────────────────────────────────────────────────────────────────
export const firstVoice: SolutionData = {
  slug: "ai-receptionist",
  metaTitle: "AI Receptionist for Business India | FirstVoice",
  metaDescription:
    "FirstVoice by PixoraNest is an AI receptionist that answers calls 24/7, qualifies leads, and books appointments — no human staff needed. Try free demo.",
  focusKeyword: "AI receptionist for business India",
  secondaryKeywords: [
    "automated call answering",
    "virtual receptionist India",
    "AI phone answering service",
    "24/7 business call automation",
  ],

  badge: "FirstVoice · AI Receptionist",
  h1: "AI Receptionist for Business India — Answer Every Call, 24/7",
  heroSubtext:
    "Stop losing customers to missed calls. FirstVoice answers every incoming call instantly, qualifies your leads, books appointments, and routes the right calls to the right team — all without a single human receptionist.",
  heroCTA: "Book a Free Demo",
  heroSecondaryCTA: "See How It Works",

  problemHeading: "Your Business Loses Money Every Time a Call Goes Unanswered",
  problemIntro:
    "Studies show that 62% of callers never call back after a missed call. For small businesses and startups in India, every missed call is a missed sale. Traditional receptionists are expensive, take sick days, and can only handle one call at a time.",
  problemPoints: [
    "Receptionists cost ₹25,000–₹50,000/month — plus training, leaves, and turnover",
    "Calls outside working hours go to voicemail and are never returned",
    "High call volumes lead to long hold times and poor customer experience",
    "Manual lead qualification wastes your sales team's valuable time",
    "No structured data captured from inbound calls",
  ],

  solutionHeading: "Meet FirstVoice — Your AI Receptionist That Never Sleeps",
  solutionSubheading: "Intelligent. Instant. Always Available.",
  solutionDesc:
    "FirstVoice is an AI-powered receptionist that picks up every call within 2 rings, holds natural conversations in English and Hindi, captures lead details, qualifies prospects, books appointments directly into your calendar, and routes priority calls to your team — all in real time, at a fraction of the cost of a human receptionist.",

  featuresHeading: "Everything a Human Receptionist Does — and More",
  features: [
    {
      icon: "Phone",
      title: "24/7 Instant Call Answering",
      desc: "FirstVoice picks up every call within 2 rings — at 2 AM or 2 PM. Zero hold times, zero missed calls.",
    },
    {
      icon: "Bot",
      title: "Natural AI Conversations",
      desc: "Powered by advanced NLP, FirstVoice holds human-like conversations in English and Hindi, adapting tone and context dynamically.",
    },
    {
      icon: "Calendar",
      title: "Automatic Appointment Booking",
      desc: "Syncs with Google Calendar, Calendly, and CRMs to book meetings on the spot without any manual intervention.",
    },
    {
      icon: "Filter",
      title: "Smart Lead Qualification",
      desc: "Asks the right questions to score and qualify leads before passing them to your sales team, saving hours of effort.",
    },
    {
      icon: "GitBranch",
      title: "Intelligent Call Routing",
      desc: "Routes high-priority calls to the right department or executive instantly based on intent and context.",
    },
    {
      icon: "BarChart2",
      title: "Call Analytics Dashboard",
      desc: "Detailed reports on call volume, peak hours, lead quality, and conversion rates — all in one dashboard.",
    },
    {
      icon: "MessageSquare",
      title: "Instant WhatsApp Follow-up",
      desc: "After every call, FirstVoice automatically sends a WhatsApp message with next steps, links, or appointment confirmations.",
    },
    {
      icon: "Shield",
      title: "GDPR & Data Privacy Compliant",
      desc: "All call data is encrypted and stored securely in compliance with Indian data protection standards.",
    },
  ],

  benefitsHeading: "Real Business Outcomes from Day One",
  benefits: [
    { stat: "100%", label: "Calls Answered", desc: "Never lose another lead to a missed call" },
    { stat: "68%", label: "Cost Reduction", desc: "vs. hiring a full-time human receptionist" },
    { stat: "3.4x", label: "More Qualified Leads", desc: "Routed to your sales team daily" },
    { stat: "2 min", label: "Setup Time", desc: "Connect your number and go live instantly" },
  ],

  useCasesHeading: "Who Uses FirstVoice?",
  useCases: [
    { industry: "Healthcare Clinics", scenario: "A multi-specialty clinic in Hyderabad handles 300+ patient calls/day with zero wait times. Appointments are auto-booked and doctors' calendars are always updated." },
    { industry: "Real Estate Agencies", scenario: "A property firm in Mumbai never misses an inquiry. FirstVoice qualifies buyer intent, captures budget, and schedules site visits automatically." },
    { industry: "Legal Firms", scenario: "A law practice in Delhi uses FirstVoice to filter client calls, capture case details, and route urgent matters to the right lawyer." },
    { industry: "E-commerce & D2C Brands", scenario: "A Bengaluru D2C brand automates order-status queries, complaint logging, and return requests — eliminating a 5-person call center team." },
  ],

  howItWorksHeading: "How FirstVoice Works in 4 Simple Steps",
  steps: [
    { num: "01", title: "Connect Your Number", desc: "Forward your existing business number or get a new virtual number. Setup takes under 2 minutes." },
    { num: "02", title: "Train with Your Business Logic", desc: "Feed FirstVoice your FAQs, products, team structure, and call scripts. It learns your business in minutes." },
    { num: "03", title: "Go Live Instantly", desc: "FirstVoice starts answering calls immediately. It handles greetings, qualifies leads, books appointments, and routes calls." },
    { num: "04", title: "Monitor & Optimize", desc: "Track every conversation, lead quality score, and booking from your real-time dashboard. Improve scripts with one click." },
  ],

  whyHeading: "Why 500+ Indian Businesses Choose PixoraNest FirstVoice",
  whyPoints: [
    "Built specifically for Indian business communication norms and languages",
    "Integrates with 50+ CRMs including Zoho, HubSpot, Salesforce, and Freshdesk",
    "No per-minute charges — flat monthly pricing with unlimited calls",
    "Dedicated onboarding support and 24/7 technical assistance",
    "SOC2-compliant infrastructure hosted on Indian data centers",
    "Zero-code setup — no developers or IT team required",
  ],

  testimonials: [
    { name: "Rajesh Menon", role: "Director", company: "MedCare Hospitals, Kochi", quote: "We went from missing 40% of appointment calls to a 100% pick-up rate overnight. FirstVoice paid for itself in the first week.", rating: 5 },
    { name: "Priya Sharma", role: "Sales Head", company: "PropEdge Realty, Mumbai", quote: "Our sales team now only talks to pre-qualified leads. Conversion rates have doubled since we deployed FirstVoice.", rating: 5 },
    { name: "Amit Choudhary", role: "Founder", company: "LegalEase, Delhi", quote: "I was skeptical about AI handling client calls. But FirstVoice sounds more professional than our old receptionist and works 24/7.", rating: 5 },
  ],

  faqHeading: "Frequently Asked Questions about FirstVoice AI Receptionist",
  faqs: [
    { q: "Does FirstVoice work with my existing phone number?", a: "Yes. You can either forward your existing business landline or mobile number to FirstVoice, or get a new dedicated virtual number. No number porting needed." },
    { q: "Can FirstVoice speak in Hindi and regional languages?", a: "Currently FirstVoice supports English and Hindi fluently. Support for Tamil, Telugu, Marathi, and Bengali is in beta — contact us to join the waitlist." },
    { q: "How is this different from a traditional IVR system?", a: "IVR systems follow rigid menus and frustrate callers. FirstVoice holds natural two-way conversations, understands intent, and responds intelligently — giving callers the feeling of talking to a real person." },
    { q: "Is my call data secure?", a: "Absolutely. All call recordings and data are encrypted at rest and in transit. We are SOC2 Type II certified and comply with Indian data protection regulations." },
    { q: "Can FirstVoice transfer calls to a human agent?", a: "Yes. You can set rules for when calls should be transferred — based on caller intent, priority, time of day, or specific keywords." },
    { q: "What happens if FirstVoice doesn't understand a caller?", a: "FirstVoice gracefully escalates to a human agent or takes a detailed message and triggers an immediate WhatsApp/email alert to your team." },
    { q: "How much does FirstVoice cost?", a: "We offer flexible plans starting at ₹4,999/month for startups. Enterprise plans with unlimited calls and custom integrations are available. Book a demo for a custom quote." },
    { q: "How long does it take to set up?", a: "Basic setup takes under 15 minutes. Full customization with your scripts, FAQs, and CRM integration typically takes 1–2 business days with our onboarding team." },
  ],

  images: [
    { filename: "ai-receptionist-dashboard-india.jpg", alt: "AI receptionist dashboard handling business calls in India — FirstVoice by PixoraNest", section: "Hero" },
    { filename: "firstvoice-call-analytics-report.jpg", alt: "FirstVoice call analytics dashboard showing lead quality and call volume for Indian businesses", section: "Features" },
    { filename: "ai-phone-answering-service-india.jpg", alt: "AI phone answering service for small business India — 24/7 automated receptionist", section: "How It Works" },
    { filename: "virtual-receptionist-appointment-booking.jpg", alt: "Virtual receptionist automatically booking appointments for a healthcare clinic in India", section: "Use Cases" },
  ],

  internalLinks: [
    { anchor: "WhatsApp Lead Automation", href: "/solutions/whatsapp-automation" },
    { anchor: "AI Voice Agent", href: "/solutions/ai-voice-agent" },
    { anchor: "CRM Automation", href: "/solutions/crm-automation" },
    { anchor: "View All Solutions", href: "/solutions" },
    { anchor: "Book a Demo", href: "/demo" },
  ],

  schemaService: {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "FirstVoice AI Receptionist",
    "provider": { "@type": "Organization", "name": "PixoraNest" },
    "description": "AI-powered virtual receptionist that answers calls 24/7, qualifies leads, books appointments, and routes calls for Indian businesses.",
    "areaServed": "IN",
    "serviceType": "AI Call Automation",
    "url": "https://pixoranest.com/solutions/ai-receptionist",
  },

  schemaFAQ: {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [],
  },
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. LeadNest – WhatsApp Lead Management
// ─────────────────────────────────────────────────────────────────────────────
export const leadNest: SolutionData = {
  slug: "whatsapp-automation",
  metaTitle: "WhatsApp Lead Automation India | LeadNest by PixoraNest",
  metaDescription:
    "LeadNest automates WhatsApp lead capture, follow-ups, and CRM sync for Indian businesses. Convert 3x more leads on autopilot. Book a free demo today.",
  focusKeyword: "WhatsApp lead automation India",
  secondaryKeywords: [
    "WhatsApp Business automation",
    "automated WhatsApp follow-up",
    "WhatsApp CRM integration India",
    "WhatsApp lead management software",
  ],

  badge: "LeadNest · WhatsApp Lead Management",
  h1: "WhatsApp Lead Automation for Indian Businesses — Convert More, Work Less",
  heroSubtext:
    "98% of WhatsApp messages are read within 3 minutes. LeadNest captures every lead from WhatsApp, automatically qualifies them, nurtures them with personalized follow-ups, and syncs everything to your CRM — without any manual work.",
  heroCTA: "Start Free Trial",
  heroSecondaryCTA: "Watch Demo",

  problemHeading: "WhatsApp Is Your #1 Lead Channel — Are You Wasting It?",
  problemIntro:
    "India has 500M+ WhatsApp users. Yet most businesses still reply to leads manually, follow up inconsistently, and have no system to track or nurture prospects. The result? Leads go cold and revenue leaks away.",
  problemPoints: [
    "Sales teams spend 3–4 hours/day manually replying to WhatsApp inquiries",
    "Leads that don't get a response within 5 minutes convert 80% less",
    "No visibility into which WhatsApp leads converted or dropped off",
    "Inconsistent follow-ups mean 70% of leads are never re-engaged",
    "WhatsApp conversations are siloed — disconnected from CRM and email",
  ],

  solutionHeading: "LeadNest — Your Always-On WhatsApp Sales Assistant",
  solutionSubheading: "Capture. Qualify. Nurture. Convert.",
  solutionDesc:
    "LeadNest connects to your WhatsApp Business account and turns it into a fully automated lead generation engine. It instantly responds to every inquiry, asks qualifying questions, tags and scores leads, sends personalized follow-up sequences, and pushes all data to your CRM — so your sales team only handles warm, ready-to-buy prospects.",

  featuresHeading: "Powerful WhatsApp Automation Features Built for Sales Teams",
  features: [
    { icon: "Zap", title: "Instant Auto-Reply", desc: "Respond to every WhatsApp inquiry within seconds — day or night — with intelligent, context-aware messages." },
    { icon: "Filter", title: "AI Lead Qualification", desc: "LeadNest asks smart qualifying questions (budget, timeline, intent) and scores each lead automatically." },
    { icon: "SendHorizontal", title: "Drip Follow-up Sequences", desc: "Set up automated multi-day follow-up campaigns that nurture cold leads until they're ready to buy." },
    { icon: "Users", title: "Multi-Agent Inbox", desc: "Assign hot leads to the right sales agent automatically. All conversations tracked in a unified inbox." },
    { icon: "Link", title: "CRM Auto-Sync", desc: "Every lead, conversation, and tag syncs to Zoho, HubSpot, Freshsales, or any CRM in real time." },
    { icon: "LayoutTemplate", title: "Approved Template Library", desc: "Pre-built, WABA-approved message templates for follow-ups, offers, reminders, and abandoned inquiries." },
    { icon: "PieChart", title: "Conversion Analytics", desc: "Track open rates, reply rates, conversion rates, and revenue attributed to WhatsApp — per campaign, per agent." },
    { icon: "Globe", title: "Broadcast Campaigns", desc: "Send personalized bulk messages to segmented contact lists — for launches, offers, or re-engagement." },
  ],

  benefitsHeading: "Measurable Results for Your Sales Team",
  benefits: [
    { stat: "5 sec", label: "Response Time", desc: "vs. industry average of 2+ hours" },
    { stat: "3x", label: "Lead Conversion", desc: "Compared to manual WhatsApp sales" },
    { stat: "80%", label: "Time Saved", desc: "For your sales team on follow-ups" },
    { stat: "98%", label: "Message Open Rate", desc: "WhatsApp outperforms email 5x" },
  ],

  useCasesHeading: "LeadNest in Action Across Industries",
  useCases: [
    { industry: "EdTech & Coaching", scenario: "A coaching institute in Pune captures course inquiries from WhatsApp ads, auto-qualifies student intent, and follows up with demo class links — converting 40% more enrollments." },
    { industry: "Real Estate", scenario: "A builder in Gurugram sends instant site-visit invites to every WhatsApp inquiry. LeadNest follows up 3x over 7 days, recovering 60% of cold leads." },
    { industry: "Insurance & BFSI", scenario: "An insurance broker in Chennai automates policy reminders, renewal follow-ups, and new-policy recommendations — saving 15 hours/week of agent time." },
    { industry: "Retail & D2C", scenario: "An online fashion brand in Surat sends abandoned-cart reminders via WhatsApp with personalized discount codes, recovering 25% of lost sales." },
  ],

  howItWorksHeading: "Set Up LeadNest in Under 10 Minutes",
  steps: [
    { num: "01", title: "Connect WhatsApp Business", desc: "Link your WhatsApp Business API account with a single click. No technical setup required." },
    { num: "02", title: "Build Your Automation Flow", desc: "Use our drag-and-drop builder to design qualification flows, follow-up sequences, and routing rules." },
    { num: "03", title: "Sync Your CRM", desc: "Connect Zoho, HubSpot, Freshsales, or any CRM. All leads and conversations flow in automatically." },
    { num: "04", title: "Launch & Scale", desc: "Go live and watch your pipeline fill with qualified leads. Scale campaigns with one-click broadcasts." },
  ],

  whyHeading: "Why LeadNest Is the Best WhatsApp CRM for Indian Businesses",
  whyPoints: [
    "Official WhatsApp Business API partner — fully compliant and reliable",
    "Built for Indian sales workflows with regional language support",
    "No per-message charges — unlimited automation on flat monthly plans",
    "GDPR and TRAI-compliant messaging with opt-in/opt-out management",
    "One inbox for WhatsApp, email, and calls — never lose a conversation",
    "Dedicated onboarding manager for every account",
  ],

  testimonials: [
    { name: "Sneha Joshi", role: "Growth Manager", company: "EduPrime, Pune", quote: "LeadNest transformed our admissions process. We went from manually texting 200 students a day to fully automated follow-ups that convert at 38%.", rating: 5 },
    { name: "Vikram Singh", role: "Sales Director", company: "PropView Realty, Gurugram", quote: "We recovered ₹14 lakhs in site-visit conversions in the first month alone. LeadNest's follow-up sequences are incredible.", rating: 5 },
    { name: "Meera Krishnan", role: "CEO", company: "NestD2C, Bengaluru", quote: "Our WhatsApp abandoned-cart recovery went from 6% to 31% with LeadNest. The ROI is insane for the price we pay.", rating: 5 },
  ],

  faqHeading: "WhatsApp Automation FAQs — LeadNest by PixoraNest",
  faqs: [
    { q: "Is LeadNest an official WhatsApp Business API provider?", a: "Yes. LeadNest operates through Meta's official WhatsApp Business API, ensuring full compliance, high deliverability, and access to verified business features like green tick." },
    { q: "Can I use LeadNest with my existing WhatsApp Business number?", a: "Yes. We can migrate your existing WhatsApp Business number to the API. The process takes 1–2 days and your contacts are not notified of any change." },
    { q: "Will my messages be marked as spam?", a: "No. LeadNest uses only WABA-approved templates for outbound messaging, and all contacts must have opted in. This ensures high deliverability and compliance with Meta's policies." },
    { q: "Can multiple agents use LeadNest simultaneously?", a: "Absolutely. LeadNest supports unlimited agents in a shared inbox. You can assign leads, add notes, and collaborate without conversations overlapping." },
    { q: "Does LeadNest support Hindi messages?", a: "Yes. You can create message templates and flows in Hindi, English, or Hinglish. Regional language templates require WABA pre-approval which we handle for you." },
    { q: "What CRMs does LeadNest integrate with?", a: "LeadNest integrates natively with Zoho CRM, HubSpot, Freshsales, Salesforce, and Pipedrive. Custom API integrations are available on enterprise plans." },
    { q: "Is there a free trial?", a: "Yes. We offer a 14-day free trial with full features — no credit card required. Book a demo and our team will onboard you personally." },
  ],

  images: [
    { filename: "whatsapp-lead-automation-india-leadnest.jpg", alt: "WhatsApp lead automation dashboard for Indian businesses — LeadNest by PixoraNest", section: "Hero" },
    { filename: "whatsapp-crm-integration-india.jpg", alt: "WhatsApp CRM integration showing automated lead sync to Zoho and HubSpot for Indian sales teams", section: "Features" },
    { filename: "whatsapp-follow-up-sequence-builder.jpg", alt: "Drag-and-drop WhatsApp follow-up sequence builder for automated lead nurturing in India", section: "How It Works" },
    { filename: "whatsapp-conversion-analytics-dashboard.jpg", alt: "WhatsApp lead conversion analytics dashboard showing open rates and revenue attributed per campaign", section: "Analytics" },
  ],

  internalLinks: [
    { anchor: "AI Receptionist for Business", href: "/solutions/ai-receptionist" },
    { anchor: "CRM Workflow Automation", href: "/solutions/crm-automation" },
    { anchor: "Social Media Automation", href: "/solutions/social-automation" },
    { anchor: "View Pricing Plans", href: "/pricing" },
    { anchor: "Book a Free Demo", href: "/demo" },
  ],

  schemaService: {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "LeadNest WhatsApp Lead Automation",
    "provider": { "@type": "Organization", "name": "PixoraNest" },
    "description": "WhatsApp Business automation software for lead capture, qualification, follow-up, and CRM sync for Indian businesses.",
    "areaServed": "IN",
    "serviceType": "WhatsApp Marketing Automation",
    "url": "https://pixoranest.com/solutions/whatsapp-automation",
  },

  schemaFAQ: { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [] },
}

// ─────────────────────────────────────────────────────────────────────────────
// 3. CallOrbit – Call Automation & Routing
// ─────────────────────────────────────────────────────────────────────────────
export const callOrbit: SolutionData = {
  slug: "call-automation",
  metaTitle: "Call Automation & Routing Software India | CallOrbit",
  metaDescription:
    "CallOrbit by PixoraNest automates inbound call routing, transcription, and follow-ups for Indian businesses. Cut call handling costs by 60%. Book a demo.",
  focusKeyword: "call automation software India",
  secondaryKeywords: [
    "automated call routing India",
    "AI call handling software",
    "cloud telephony India",
    "smart IVR alternative",
  ],

  badge: "CallOrbit · Call Automation & Routing",
  h1: "Call Automation Software for Indian Businesses — Route Smarter, Convert Faster",
  heroSubtext:
    "CallOrbit replaces your outdated IVR with an AI-powered call automation system that intelligently routes calls, transcribes conversations, triggers follow-ups, and gives your team real-time insights — all from a single dashboard.",
  heroCTA: "Book a Free Demo",
  heroSecondaryCTA: "Explore Features",

  problemHeading: "Your Phone System Is Costing You Customers and Revenue",
  problemIntro:
    "Outdated IVR menus, long hold times, and misrouted calls are silently destroying your customer experience. 67% of customers hang up in frustration and never call back. The problem isn't the volume — it's the system.",
  problemPoints: [
    "Legacy IVR systems frustrate callers with rigid menus and dead ends",
    "Calls regularly get routed to the wrong department, wasting everyone's time",
    "No transcription means critical information is lost after every call",
    "Zero visibility into call outcomes, trends, or agent performance",
    "Manual follow-ups after calls are inconsistent and often forgotten",
  ],

  solutionHeading: "CallOrbit — The Smart Alternative to IVR for Modern Businesses",
  solutionSubheading: "Route Every Call to the Right Person at the Right Time",
  solutionDesc:
    "CallOrbit uses AI to understand caller intent in real time and routes calls intelligently to the right agent, team, or location — without rigid menus. Every call is transcribed, analyzed, and followed up automatically. Your team gets full context before they even say hello.",

  featuresHeading: "Intelligent Call Automation Features That Drive Results",
  features: [
    { icon: "GitBranch", title: "AI-Powered Smart Routing", desc: "Routes calls based on caller intent, history, location, language, and priority — not pre-set menu options." },
    { icon: "FileText", title: "Real-Time Transcription", desc: "Every call is automatically transcribed, summarized, and tagged with key topics, sentiment, and action items." },
    { icon: "Bell", title: "Automated Post-Call Follow-up", desc: "Triggers WhatsApp messages, emails, or CRM tasks automatically after every call based on outcome and intent." },
    { icon: "BarChart", title: "Call Analytics & Reporting", desc: "Visualize call volume, average handle time, missed calls, agent performance, and conversion rates in real time." },
    { icon: "Clock", title: "Business Hours & Overflow Rules", desc: "Set intelligent rules for after-hours routing, overflow to backup agents, and holiday schedules with ease." },
    { icon: "Headphones", title: "Call Recording & Monitoring", desc: "Record all calls for compliance and coaching. Supervisors can listen live or review recordings with smart search." },
    { icon: "Smartphone", title: "Virtual Numbers for Any City", desc: "Get local virtual numbers for Delhi, Mumbai, Bengaluru, and 100+ cities to build local presence nationwide." },
    { icon: "Repeat", title: "IVR → AI Migration", desc: "Seamlessly migrate your existing IVR setup to CallOrbit without changing your current number or disrupting operations." },
  ],

  benefitsHeading: "What CallOrbit Delivers for Your Business",
  benefits: [
    { stat: "60%", label: "Lower Call Handling Cost", desc: "vs. traditional call centers and IVR setup" },
    { stat: "40%", label: "Faster First Response", desc: "AI routing means callers reach the right person instantly" },
    { stat: "100%", label: "Calls Logged & Tracked", desc: "Full audit trail for every interaction" },
    { stat: "2x", label: "Agent Productivity", desc: "With transcripts and context delivered before every call" },
  ],

  useCasesHeading: "CallOrbit Across Indian Industries",
  useCases: [
    { industry: "BFSI & FinTech", scenario: "A bank in Mumbai routes loan inquiry calls to the right product specialist based on loan type and amount — reducing transfer rates by 70%." },
    { industry: "Healthcare", scenario: "A hospital chain uses CallOrbit to route calls to the nearest branch, right specialist, and correct department — cutting average wait time from 4 minutes to 30 seconds." },
    { industry: "Logistics & Delivery", scenario: "A courier company routes driver, customer, and vendor calls separately with real-time transcription for compliance logging and dispute resolution." },
    { industry: "SaaS & Tech Startups", scenario: "A B2B SaaS startup uses CallOrbit's analytics to identify top objections on sales calls and coach reps with AI-generated call summaries." },
  ],

  howItWorksHeading: "How CallOrbit Works — From Setup to First Call",
  steps: [
    { num: "01", title: "Connect Your Numbers", desc: "Port your existing number or get new virtual numbers for any city across India. Takes under 24 hours." },
    { num: "02", title: "Configure AI Routing Rules", desc: "Set up routing logic using our visual builder — by intent, department, location, agent skill, or time of day." },
    { num: "03", title: "Enable Transcription & Follow-ups", desc: "Turn on auto-transcription and configure post-call actions like WhatsApp messages, CRM updates, or email alerts." },
    { num: "04", title: "Monitor & Improve in Real Time", desc: "Use your live dashboard to track call performance, agent metrics, and conversion trends — and optimize with one click." },
  ],

  whyHeading: "Why CallOrbit Outperforms Every IVR and Cloud PBX in India",
  whyPoints: [
    "AI intent routing — not rigid menu trees that frustrate callers",
    "Fully cloud-based — no hardware, PBX boxes, or on-site installation",
    "Integrates with all major CRMs, helpdesks, and business tools",
    "99.9% uptime SLA with redundant Indian data centers",
    "TRAI-compliant with full DND, CLI, and call recording regulations",
    "Dedicated support team available Monday–Saturday, 9 AM–8 PM IST",
  ],

  testimonials: [
    { name: "Deepak Rao", role: "VP Operations", company: "FintechEdge, Mumbai", quote: "We replaced our legacy EPABX with CallOrbit and cut our call routing errors by 85%. Our NPS jumped 22 points in 3 months.", rating: 5 },
    { name: "Ananya Verma", role: "Customer Success Head", company: "HealthFirst Clinics, Bengaluru", quote: "Transcriptions have been a game-changer. Our doctors now get a written summary of every patient call before they walk in.", rating: 5 },
    { name: "Rohit Bhatia", role: "Founder", company: "ShipFast Logistics, Delhi", quote: "CallOrbit's routing intelligence has reduced inter-team call transfers by 60%. Drivers and customers both get through to the right person instantly.", rating: 5 },
  ],

  faqHeading: "CallOrbit Call Automation — Frequently Asked Questions",
  faqs: [
    { q: "Can CallOrbit replace my existing IVR or EPABX system?", a: "Yes. CallOrbit is designed as a direct replacement for legacy IVR and EPABX systems. We handle number porting, configuration, and migration without any downtime." },
    { q: "Does CallOrbit work for inbound and outbound calls?", a: "Yes. CallOrbit handles inbound routing, outbound dialing, click-to-call from CRM, and automated outbound campaigns — all in one platform." },
    { q: "How accurate is the call transcription?", a: "Our AI transcription engine delivers 95%+ accuracy for clear audio in English and Hindi. Accuracy improves over time with your specific vocabulary and call types." },
    { q: "Can I get virtual numbers for different cities in India?", a: "Yes. We offer local virtual numbers for 100+ cities across India, including Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, Pune, and Kolkata." },
    { q: "Is call recording legal in India?", a: "Yes, with consent. CallOrbit automatically plays a consent notice before recording begins, ensuring full TRAI compliance. All recordings are stored encrypted." },
    { q: "What is the uptime guarantee for CallOrbit?", a: "We offer a 99.9% uptime SLA backed by redundant infrastructure across two Indian data centers. Planned maintenance is always communicated 48 hours in advance." },
    { q: "How does the pricing work?", a: "CallOrbit is priced based on the number of agents and call minutes. Plans start at ₹3,999/month for startups. Enterprise plans are custom-priced." },
  ],

  images: [
    { filename: "call-automation-software-india-callorbit.jpg", alt: "AI call automation and routing software dashboard for Indian businesses — CallOrbit by PixoraNest", section: "Hero" },
    { filename: "smart-call-routing-india-dashboard.jpg", alt: "Smart AI call routing dashboard showing real-time call flow for Indian call centers", section: "Features" },
    { filename: "call-transcription-analytics-india.jpg", alt: "Automatic call transcription and analytics report for Indian business call centers", section: "Analytics" },
    { filename: "virtual-numbers-india-callorbit.jpg", alt: "Virtual phone numbers for Delhi Mumbai Bengaluru Chennai — CallOrbit India", section: "Use Cases" },
  ],

  internalLinks: [
    { anchor: "AI Receptionist", href: "/solutions/ai-receptionist" },
    { anchor: "AI Voice Agent", href: "/solutions/ai-voice-agent" },
    { anchor: "CRM Automation", href: "/solutions/crm-automation" },
    { anchor: "Pricing", href: "/pricing" },
    { anchor: "Contact Us", href: "/contact" },
  ],

  schemaService: {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "CallOrbit Call Automation & Routing",
    "provider": { "@type": "Organization", "name": "PixoraNest" },
    "description": "AI-powered call routing, transcription, and automation platform for Indian businesses.",
    "areaServed": "IN",
    "serviceType": "Cloud Telephony & Call Automation",
    "url": "https://pixoranest.com/solutions/call-automation",
  },

  schemaFAQ: { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [] },
}

// ─────────────────────────────────────────────────────────────────────────────
// 4. Socialium – Social Media Automation
// ─────────────────────────────────────────────────────────────────────────────
export const socialium: SolutionData = {
  slug: "social-automation",
  metaTitle: "Social Media Automation India | Socialium by PixoraNest",
  metaDescription:
    "Socialium automates your social media posting, lead capture, and DM responses across Instagram, Facebook & LinkedIn for Indian businesses. Try free today.",
  focusKeyword: "social media automation India",
  secondaryKeywords: [
    "automated social media posting India",
    "Instagram DM automation",
    "social media lead generation India",
    "Facebook automation tool India",
  ],

  badge: "Socialium · Social Media Automation",
  h1: "Social Media Automation for Indian Businesses — Grow Without the Grind",
  heroSubtext:
    "Socialium automates everything from content scheduling and Instagram DM replies to lead capture and competitor tracking — so you can grow your brand on autopilot while your team focuses on strategy, not execution.",
  heroCTA: "Start Free Trial",
  heroSecondaryCTA: "See Features",

  problemHeading: "Social Media Is Your Biggest Growth Channel — and Your Biggest Time Drain",
  problemIntro:
    "Indian businesses spend 3–5 hours daily on social media — posting, replying to DMs, engaging with comments, and tracking competitors. Yet most never have a consistent strategy. The result is sporadic posting, missed leads, and zero ROI from social.",
  problemPoints: [
    "Inconsistent posting destroys algorithm reach and audience trust",
    "DMs from potential customers go unanswered for hours or days",
    "No system to capture and qualify leads from social media comments and DMs",
    "Teams waste hours every week on manual scheduling and reporting",
    "Zero insight into which content drives actual sales vs. just vanity metrics",
  ],

  solutionHeading: "Socialium — Your Complete Social Media Automation Engine",
  solutionSubheading: "Schedule. Engage. Capture Leads. Grow.",
  solutionDesc:
    "Socialium connects to your Instagram, Facebook, LinkedIn, and Twitter accounts and automates the entire social media workflow — from AI-powered content scheduling and DM auto-replies to lead capture from comments and real-time performance analytics. Grow 3x faster without adding headcount.",

  featuresHeading: "Everything You Need to Automate Your Social Media Growth",
  features: [
    { icon: "Calendar", title: "AI Content Scheduling", desc: "Schedule posts for optimal engagement times across all platforms. AI suggests the best posting frequency and formats." },
    { icon: "MessageSquare", title: "DM Auto-Reply Bot", desc: "Automatically reply to Instagram and Facebook DMs with smart, context-aware responses that qualify and capture leads." },
    { icon: "Star", title: "Comment Automation", desc: "Auto-reply to comments with personalized responses, filter spam, and direct engaged users to your lead funnel." },
    { icon: "UserPlus", title: "Social Lead Capture", desc: "Capture leads from DMs, story replies, and ad comments into your CRM automatically — never lose a social lead again." },
    { icon: "BarChart2", title: "Social Analytics Dashboard", desc: "Track reach, engagement, leads generated, and revenue attributed per post and per platform in one place." },
    { icon: "Eye", title: "Competitor Monitoring", desc: "Track competitor posts, engagement, and follower growth. Get weekly reports on what's working in your industry." },
    { icon: "Image", title: "AI Caption Generator", desc: "Generate platform-optimized captions in English, Hindi, or Hinglish with one click using your brand voice." },
    { icon: "Share2", title: "Cross-Platform Publishing", desc: "Publish once, post everywhere. One-click publishing across Instagram, Facebook, LinkedIn, and Twitter simultaneously." },
  ],

  benefitsHeading: "Social Media Growth on Autopilot",
  benefits: [
    { stat: "5 hrs", label: "Saved Per Week", desc: "Per team member on manual social tasks" },
    { stat: "4x", label: "More Leads", desc: "Captured from social DMs and comments" },
    { stat: "60%", label: "Higher Engagement", desc: "With consistent posting and auto-replies" },
    { stat: "30 min", label: "Weekly Management", desc: "Socialium handles the rest automatically" },
  ],

  useCasesHeading: "Socialium Powering Growth Across Industries",
  useCases: [
    { industry: "D2C & E-commerce", scenario: "A fashion brand in Surat automates Instagram DM replies for size queries, auto-captures leads from story polls, and schedules 30 days of content in one sitting." },
    { industry: "Restaurants & F&B", scenario: "A restaurant chain in Hyderabad uses Socialium to auto-reply to table booking DMs, schedule daily menu posts, and run engagement campaigns on festivals." },
    { industry: "Education & EdTech", scenario: "A coaching institute uses Socialium to capture leads from Facebook ad comments, auto-reply to course inquiries on Instagram, and post daily study tips consistently." },
    { industry: "Real Estate", scenario: "A property developer in Pune schedules site launch posts, auto-replies to DM inquiries with brochure links, and captures lead details into their CRM automatically." },
  ],

  howItWorksHeading: "How Socialium Automates Your Social Media in 4 Steps",
  steps: [
    { num: "01", title: "Connect Your Social Accounts", desc: "Link Instagram, Facebook, LinkedIn, and Twitter in one click. Authorization takes under 2 minutes per platform." },
    { num: "02", title: "Build Your Automation Rules", desc: "Set up DM reply flows, comment responses, lead capture forms, and posting schedules using our visual builder." },
    { num: "03", title: "Schedule Content in Bulk", desc: "Upload and schedule 30–90 days of content in one session. AI optimizes posting times for maximum reach." },
    { num: "04", title: "Track Growth & Leads", desc: "Monitor engagement, leads, and revenue from your unified analytics dashboard updated in real time." },
  ],

  whyHeading: "Why Socialium Is the Best Social Media Automation Tool for India",
  whyPoints: [
    "Built for Indian content formats — Reels, Stories, WhatsApp-linked campaigns",
    "Supports Hindi, English, Hinglish, and regional language captions",
    "Meta Business API partner — no risk of account bans or restrictions",
    "Connects directly to WhatsApp and CRM for seamless lead handoff",
    "Affordable flat-rate pricing — no per-post or per-message charges",
    "Dedicated growth strategist included on Professional plans",
  ],

  testimonials: [
    { name: "Pooja Agarwal", role: "Brand Manager", company: "FashionFirst, Surat", quote: "We went from posting 3x/week to 21x/week across all platforms without hiring anyone. Our Instagram followers grew 180% in 4 months.", rating: 5 },
    { name: "Suresh Nair", role: "Marketing Head", company: "SpiceRoute Restaurants, Hyderabad", quote: "Socialium handles all our Instagram DMs and auto-books table reservations. We capture 50+ leads a day from social that we used to miss completely.", rating: 5 },
    { name: "Kavitha Rao", role: "Founder", company: "BrightMinds EdTech, Bengaluru", quote: "Our Facebook ad campaigns used to leak leads from comments. Now Socialium captures every comment, auto-qualifies, and pushes to our CRM. Conversions up 45%.", rating: 5 },
  ],

  faqHeading: "Social Media Automation FAQs — Socialium by PixoraNest",
  faqs: [
    { q: "Which social media platforms does Socialium support?", a: "Socialium currently supports Instagram, Facebook, LinkedIn, and Twitter (X). YouTube and Pinterest support are in our roadmap for Q3 2025." },
    { q: "Will my Instagram account get banned for using automation?", a: "No. Socialium operates exclusively through Meta's official Business API and Twitter's official API. We do not use any unofficial bots or scraping tools that violate platform terms." },
    { q: "Can Socialium generate content for me?", a: "Yes. Our AI caption generator creates platform-optimized captions in your brand voice. You can also use it to repurpose blog posts and product descriptions into social content." },
    { q: "How does the DM lead capture work?", a: "When a user messages your Instagram or Facebook page, Socialium's AI auto-replies, qualifies them with smart questions, captures their contact details, and pushes them to your CRM automatically." },
    { q: "Can I manage multiple brand pages from one account?", a: "Yes. Socialium supports multiple brands and pages per account. You can manage up to 10 social pages on our Professional plan and unlimited on Enterprise." },
    { q: "Does Socialium integrate with WhatsApp?", a: "Yes. Socialium integrates with LeadNest (our WhatsApp automation tool) to hand off social leads directly to WhatsApp follow-up sequences." },
    { q: "Is there a free trial?", a: "Yes. We offer a 14-day free trial with full access to all features — no credit card required. Our team will help you set up your first automation in under 30 minutes." },
  ],

  images: [
    { filename: "social-media-automation-india-socialium.jpg", alt: "Social media automation dashboard for Indian businesses — Socialium by PixoraNest", section: "Hero" },
    { filename: "instagram-dm-automation-india.jpg", alt: "Instagram DM automation tool capturing leads from messages for Indian brands", section: "Features" },
    { filename: "social-media-content-scheduler-india.jpg", alt: "AI social media content scheduler for Instagram Facebook LinkedIn — Indian businesses", section: "How It Works" },
    { filename: "social-lead-capture-crm-integration.jpg", alt: "Social media lead capture syncing to CRM for Indian D2C and e-commerce brands", section: "Use Cases" },
  ],

  internalLinks: [
    { anchor: "WhatsApp Lead Automation", href: "/solutions/whatsapp-automation" },
    { anchor: "CRM Automation", href: "/solutions/crm-automation" },
    { anchor: "AI Receptionist", href: "/solutions/ai-receptionist" },
    { anchor: "Pricing Plans", href: "/pricing" },
    { anchor: "Book a Free Demo", href: "/demo" },
  ],

  schemaService: {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Socialium Social Media Automation",
    "provider": { "@type": "Organization", "name": "PixoraNest" },
    "description": "Social media automation platform for content scheduling, DM auto-reply, lead capture, and analytics for Indian businesses.",
    "areaServed": "IN",
    "serviceType": "Social Media Marketing Automation",
    "url": "https://pixoranest.com/solutions/social-automation",
  },

  schemaFAQ: { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [] },
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. EchoAssist – AI Voice Agent
// ─────────────────────────────────────────────────────────────────────────────
export const echoAssist: SolutionData = {
  slug: "ai-voice-agent",
  metaTitle: "AI Voice Agent for Business India | EchoAssist PixoraNest",
  metaDescription:
    "EchoAssist is an AI voice agent that handles sales calls, support queries, and surveys with human-like conversations in English and Hindi. Book a demo.",
  focusKeyword: "AI voice agent India",
  secondaryKeywords: [
    "conversational AI phone agent",
    "AI sales calling India",
    "automated voice bot India",
    "AI customer support voice agent",
  ],

  badge: "EchoAssist · AI Voice Agent",
  h1: "AI Voice Agent for Indian Businesses — Human-Like Conversations at Scale",
  heroSubtext:
    "EchoAssist makes and receives phone calls with the intelligence of your best sales rep and the availability of a machine. Handle sales outreach, customer support, appointment reminders, and surveys — in English and Hindi — across thousands of calls simultaneously.",
  heroCTA: "Book a Free Demo",
  heroSecondaryCTA: "Hear a Sample Call",

  problemHeading: "Scaling Phone-Based Sales and Support Is Expensive and Inconsistent",
  problemIntro:
    "Growing your phone sales team means hiring, training, and managing agents who get tired, make mistakes, and quit. At the same time, customers expect immediate, personalized responses. The math doesn't add up — until now.",
  problemPoints: [
    "Hiring 10 agents costs ₹5–8L/month including training, tools, and benefits",
    "Agent performance varies — good days and bad days affect your brand",
    "Outbound calling campaigns are slow — one agent can call 50–80 people/day",
    "Support calls at off-hours go unanswered or to voice mail",
    "Zero consistency in pitch, compliance scripting, or data capture across agents",
  ],

  solutionHeading: "EchoAssist — The AI Voice Agent That Sounds Human and Scales Instantly",
  solutionSubheading: "1000 Conversations. Simultaneously. Every Day.",
  solutionDesc:
    "EchoAssist is a conversational AI voice agent built on advanced speech synthesis and natural language processing. It handles inbound support calls, makes outbound sales calls, runs automated surveys, and sends appointment reminders — all with a natural human-like voice in English and Hindi. Scale from 10 calls to 10,000 without adding a single agent.",

  featuresHeading: "EchoAssist's Powerful AI Voice Capabilities",
  features: [
    { icon: "Mic", title: "Human-Like Voice Synthesis", desc: "EchoAssist uses neural TTS to generate natural, expressive voices that sound indistinguishable from a human agent." },
    { icon: "Brain", title: "Contextual Conversation Intelligence", desc: "Remembers context mid-call, handles interruptions, and adapts responses dynamically based on what the caller says." },
    { icon: "Phone", title: "Outbound Sales Calling", desc: "Run outbound calling campaigns at scale. EchoAssist pitches your product, handles objections, and books demos automatically." },
    { icon: "HeadphonesIcon", title: "Inbound Customer Support", desc: "Handle FAQs, order status, complaint logging, and escalation for inbound callers without any human involvement." },
    { icon: "CalendarCheck", title: "Appointment Reminders & Confirmations", desc: "Automatically call patients, clients, or leads to confirm appointments, reduce no-shows by up to 60%." },
    { icon: "ClipboardList", title: "Automated Survey Calls", desc: "Conduct NPS surveys, post-purchase feedback, and market research calls at scale with structured data capture." },
    { icon: "Globe", title: "Multilingual — English & Hindi", desc: "EchoAssist switches between English and Hindi fluidly within the same call based on caller preference." },
    { icon: "Database", title: "Structured Data Capture", desc: "Every call outcome, response, and intent is structured and pushed to your CRM or dashboard automatically." },
  ],

  benefitsHeading: "Scale Without Headcount",
  benefits: [
    { stat: "10,000", label: "Calls Per Day", desc: "Scale instantly — no hiring, no training, no ramp-up" },
    { stat: "85%", label: "Cost Reduction", desc: "vs. equivalent human calling team" },
    { stat: "60%", label: "Fewer No-Shows", desc: "With automated appointment reminder calls" },
    { stat: "95%+", label: "Script Compliance", desc: "Every agent follows the script, every time" },
  ],

  useCasesHeading: "EchoAssist in Action Across Indian Businesses",
  useCases: [
    { industry: "Healthcare & Diagnostics", scenario: "A diagnostic chain in Chennai uses EchoAssist to call 2,000 patients daily for appointment reminders — reducing no-shows from 34% to 8%." },
    { industry: "BFSI & InsurTech", scenario: "An insurance company runs outbound renewal reminder campaigns with EchoAssist, converting 22% of policy renewal calls without a single human agent." },
    { industry: "D2C & E-commerce", scenario: "A skincare brand uses EchoAssist to call customers post-purchase for feedback and upsell recommendation — adding ₹8L in repeat revenue monthly." },
    { industry: "EdTech & Coaching", scenario: "A test-prep startup uses EchoAssist to do outbound calls for webinar registrations, following up with 5,000 leads per day during admission season." },
  ],

  howItWorksHeading: "From Script to First Call in 48 Hours",
  steps: [
    { num: "01", title: "Define Your Call Flow", desc: "Share your use case, call script, and key objection handlers with our team. We design the AI conversation flow." },
    { num: "02", title: "Train the Voice Agent", desc: "EchoAssist is trained on your product, FAQs, and brand voice. We run test calls together until it sounds exactly right." },
    { num: "03", title: "Upload Your Call List", desc: "Upload your contact list or connect to your CRM. Define campaign rules, timing, and frequency limits." },
    { num: "04", title: "Launch & Monitor Live", desc: "EchoAssist dials at scale. Monitor live call outcomes, listen to recordings, and refine scripts in real time." },
  ],

  whyHeading: "Why EchoAssist Is the Most Advanced AI Voice Agent in India",
  whyPoints: [
    "Neural voice synthesis — not robotic TTS — for genuine human-sounding calls",
    "Handles interruptions, objections, and off-script responses intelligently",
    "Built-in DND and TRAI compliance for outbound campaigns in India",
    "Full call recording, transcription, and outcome tagging for every call",
    "Integrates with Zoho, HubSpot, Freshsales, and custom CRMs",
    "99.9% uptime — never a missed call due to system downtime",
  ],

  testimonials: [
    { name: "Dr. Ramesh Kumar", role: "Operations Head", company: "ClearDiag Labs, Chennai", quote: "EchoAssist handles our 2,000 daily reminder calls flawlessly. Our no-show rate dropped from 34% to 8% in 6 weeks. Unbelievable ROI.", rating: 5 },
    { name: "Sanjay Mehta", role: "Growth Lead", company: "PolicyNest Insurance, Mumbai", quote: "We run outbound renewal campaigns with EchoAssist that convert at 22%. Our human agents focus only on complex cases now.", rating: 5 },
    { name: "Anika Bose", role: "Co-founder", company: "GlowUp Skincare, Bengaluru", quote: "Post-purchase feedback calls with EchoAssist led to a 31% increase in repeat orders. The upsell recommendations it makes are spot on.", rating: 5 },
  ],

  faqHeading: "EchoAssist AI Voice Agent — Frequently Asked Questions",
  faqs: [
    { q: "Does EchoAssist sound like a real person?", a: "Yes. EchoAssist uses neural text-to-speech technology trained on natural speech patterns. In internal testing, callers could not distinguish EchoAssist from a human agent in 87% of calls." },
    { q: "Can EchoAssist handle objections mid-call?", a: "Yes. EchoAssist is trained with objection-handling scripts and uses contextual AI to respond dynamically to what the caller says — including unexpected questions and pushback." },
    { q: "Is outbound AI calling legal in India?", a: "Yes, with proper compliance. EchoAssist is built to respect TRAI's DND registry, calling time restrictions, and consent requirements. We handle compliance configuration during onboarding." },
    { q: "What languages does EchoAssist support?", a: "EchoAssist currently supports English and Hindi. Regional language support (Tamil, Telugu, Marathi) is available on Enterprise plans." },
    { q: "How many concurrent calls can EchoAssist handle?", a: "EchoAssist scales to 10,000+ concurrent calls. There is no practical upper limit — campaigns are throttled only by your DNC compliance requirements and calling hour rules." },
    { q: "Can I listen to call recordings?", a: "Yes. Every call is recorded, transcribed, and tagged with outcome, sentiment, and key topics. You can search and filter recordings by date, campaign, and outcome from your dashboard." },
    { q: "What does EchoAssist cost?", a: "Pricing is based on call minutes. Plans start at ₹7,999/month with 5,000 minutes included. Enterprise plans with custom minutes and integrations are available." },
  ],

  images: [
    { filename: "ai-voice-agent-india-echoassist.jpg", alt: "AI voice agent making human-like phone calls for Indian businesses — EchoAssist by PixoraNest", section: "Hero" },
    { filename: "outbound-ai-calling-campaign-india.jpg", alt: "Outbound AI sales calling campaign dashboard for Indian insurance and edtech companies", section: "Features" },
    { filename: "appointment-reminder-ai-calls-india.jpg", alt: "AI voice agent making automated appointment reminder calls for Indian healthcare clinics", section: "Use Cases" },
    { filename: "ai-call-analytics-transcription-india.jpg", alt: "AI call recording transcription and analytics for outbound voice campaigns in India", section: "Analytics" },
  ],

  internalLinks: [
    { anchor: "AI Receptionist for Business", href: "/solutions/ai-receptionist" },
    { anchor: "Call Automation Software", href: "/solutions/call-automation" },
    { anchor: "CRM Automation", href: "/solutions/crm-automation" },
    { anchor: "Pricing Plans", href: "/pricing" },
    { anchor: "Contact Us", href: "/contact" },
  ],

  schemaService: {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "EchoAssist AI Voice Agent",
    "provider": { "@type": "Organization", "name": "PixoraNest" },
    "description": "AI voice agent for outbound sales calling, appointment reminders, and inbound support in English and Hindi for Indian businesses.",
    "areaServed": "IN",
    "serviceType": "AI Voice Automation",
    "url": "https://pixoranest.com/solutions/ai-voice-agent",
  },

  schemaFAQ: { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [] },
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. CRM Automation
// ─────────────────────────────────────────────────────────────────────────────
export const crmAutomation: SolutionData = {
  slug: "crm-automation",
  metaTitle: "CRM Automation Software India | PixoraNest AI Workflows",
  metaDescription:
    "Automate your CRM workflows, lead management, and sales pipeline with PixoraNest CRM Automation. Save 10+ hours/week. Trusted by 500+ Indian businesses.",
  focusKeyword: "CRM automation software India",
  secondaryKeywords: [
    "automated CRM workflow India",
    "Zoho CRM automation",
    "sales pipeline automation India",
    "CRM lead management automation",
  ],

  badge: "CRM Automation · AI-Powered Workflows",
  h1: "CRM Automation for Indian Businesses — Eliminate Manual Data Entry Forever",
  heroSubtext:
    "PixoraNest CRM Automation connects your calls, WhatsApp, social media, and web forms to your CRM — automatically updating lead records, triggering follow-up workflows, assigning tasks, and notifying your team in real time. No data entry. No missed follow-ups. No revenue leakage.",
  heroCTA: "Book a Free Demo",
  heroSecondaryCTA: "Explore Integrations",

  problemHeading: "Your CRM Is Only as Good as the Data in It — and Your Data Is a Mess",
  problemIntro:
    "Sales teams in India spend 3+ hours every day manually updating CRMs, logging calls, and assigning leads. The result? Incomplete records, stale data, missed follow-ups, and a CRM that your team avoids using. You invested in a CRM — it's time to make it actually work.",
  problemPoints: [
    "Sales reps spend 30–40% of their time on manual data entry instead of selling",
    "Leads from calls, WhatsApp, and social media are never logged in the CRM",
    "Follow-up tasks fall through the cracks because they rely on human memory",
    "Stale lead data means inaccurate sales forecasts and missed targets",
    "No automation between inbound channels and CRM workflows",
  ],

  solutionHeading: "PixoraNest CRM Automation — Your CRM on Autopilot",
  solutionSubheading: "Every Lead. Every Interaction. Automatically Logged and Acted On.",
  solutionDesc:
    "PixoraNest CRM Automation connects all your inbound channels — phone, WhatsApp, social media, web forms, and email — to your CRM and builds intelligent automation workflows that assign leads, update records, trigger follow-ups, and alert your team in real time. Your CRM becomes the single source of truth, updated automatically across every touchpoint.",

  featuresHeading: "Complete CRM Automation From Every Lead Source",
  features: [
    { icon: "Zap", title: "Auto Lead Capture & Assignment", desc: "Leads from calls, WhatsApp, forms, and social automatically flow into your CRM and are assigned to the right rep instantly." },
    { icon: "GitBranch", title: "AI-Powered Workflow Builder", desc: "Build complex automation workflows with a drag-and-drop visual builder — no code required. Triggers, conditions, and actions." },
    { icon: "RefreshCw", title: "Real-Time Data Sync", desc: "Every call, message, and interaction syncs to your CRM in real time. Records are always complete and current." },
    { icon: "Bell", title: "Smart Task & Alert System", desc: "Auto-create tasks, set reminders, and send Slack/WhatsApp alerts to reps when a lead reaches a key stage." },
    { icon: "PieChart", title: "Sales Pipeline Automation", desc: "Automatically move leads through pipeline stages based on activity, response, or time triggers — no manual updates." },
    { icon: "FileSearch", title: "Duplicate Detection & Cleanup", desc: "AI detects duplicate records, merges data intelligently, and keeps your CRM clean and accurate automatically." },
    { icon: "Cpu", title: "AI Lead Scoring", desc: "Automatically score every lead based on source, behavior, engagement, and firmographics. Focus your team on the hottest leads." },
    { icon: "Link", title: "50+ Native Integrations", desc: "Works with Zoho CRM, HubSpot, Freshsales, Salesforce, Pipedrive, and 50+ other tools your team already uses." },
  ],

  benefitsHeading: "What CRM Automation Delivers for Your Sales Team",
  benefits: [
    { stat: "10 hrs", label: "Saved Per Week", desc: "Per sales rep on manual CRM updates" },
    { stat: "100%", label: "Lead Capture Rate", desc: "From every channel — zero leads missed" },
    { stat: "40%", label: "Higher Win Rate", desc: "With AI scoring and timely follow-up automation" },
    { stat: "3x", label: "Faster Pipeline Velocity", desc: "From lead capture to closed deal" },
  ],

  useCasesHeading: "CRM Automation Powering Indian Sales Teams",
  useCases: [
    { industry: "B2B SaaS", scenario: "A SaaS startup in Bengaluru syncs every inbound call, trial signup, and demo request to HubSpot automatically. Reps receive a full lead context card before every call — close rates up 40%." },
    { industry: "Real Estate", scenario: "A property firm uses PixoraNest CRM Automation to assign site visit leads from WhatsApp to the nearest sales agent, with follow-up reminders at 24h, 72h, and 7 days — recovering 45% of cold leads." },
    { industry: "Financial Services", scenario: "An investment advisory firm captures leads from 6 channels, auto-assigns based on AUM segment, and triggers SEBI-compliant communication workflows — saving 12 hours/week of compliance admin." },
    { industry: "Healthcare", scenario: "A hospital group auto-logs all patient calls, WhatsApp inquiries, and online bookings to their Zoho CRM. Department managers get daily lead reports without manually pulling any data." },
  ],

  howItWorksHeading: "Automate Your Entire CRM in 4 Steps",
  steps: [
    { num: "01", title: "Connect Your CRM", desc: "Connect Zoho, HubSpot, Freshsales, or any CRM via native integration or API. Takes under 5 minutes." },
    { num: "02", title: "Map Your Lead Sources", desc: "Connect your phone system, WhatsApp, web forms, social media, and email to PixoraNest's unified data layer." },
    { num: "03", title: "Build Your Automation Workflows", desc: "Use our drag-and-drop workflow builder to define assignment rules, follow-up triggers, task creation, and alerts." },
    { num: "04", title: "Launch and Watch Your CRM Populate", desc: "Go live. Every lead, interaction, and update flows into your CRM automatically from day one." },
  ],

  whyHeading: "Why PixoraNest CRM Automation Is Built for Indian Business",
  whyPoints: [
    "Pre-built workflow templates for real estate, healthcare, BFSI, and SaaS",
    "No-code setup — your sales manager can build workflows without IT help",
    "Works with all major CRMs used in India — Zoho, HubSpot, Freshsales",
    "GDPR and Indian data protection compliant with role-based access control",
    "White-glove onboarding — your workflows go live in 72 hours",
    "Transparent pricing — no per-automation or per-workflow charges",
  ],

  testimonials: [
    { name: "Karthik Sundar", role: "VP Sales", company: "CloudStack SaaS, Bengaluru", quote: "Our HubSpot was 60% incomplete data before PixoraNest. Now every lead, call, and email logs automatically. Our forecast accuracy improved from 55% to 89%.", rating: 5 },
    { name: "Nisha Patel", role: "Operations Director", company: "Horizon Realty, Ahmedabad", quote: "Automated lead assignment and 3-touch follow-up workflows recovered ₹32 lakhs in stalled leads in Q1. The ROI speaks for itself.", rating: 5 },
    { name: "Rahul Gupta", role: "Founder", company: "WealthPath Advisory, Delhi", quote: "We're a 12-person team managing 800 clients. PixoraNest CRM Automation handles all the admin work so our advisors can focus on client relationships.", rating: 5 },
  ],

  faqHeading: "CRM Automation FAQs — PixoraNest",
  faqs: [
    { q: "Which CRMs does PixoraNest CRM Automation support?", a: "We natively integrate with Zoho CRM, HubSpot, Freshsales, Salesforce, Pipedrive, and LeadSquared. Custom integrations via REST API are available on Enterprise plans." },
    { q: "Do I need to change my existing CRM to use this?", a: "No. PixoraNest CRM Automation works as a layer on top of your existing CRM. You keep your current system — we just make it smarter and more automated." },
    { q: "Can non-technical team members build automation workflows?", a: "Yes. Our workflow builder is fully drag-and-drop with no coding required. We also provide 50+ pre-built workflow templates for common use cases that you can activate in one click." },
    { q: "What lead sources does the automation support?", a: "We support inbound calls (via FirstVoice and CallOrbit), WhatsApp (via LeadNest), web forms (via Zapier, Webhooks, or native embed), social media (via Socialium), email, and direct API submissions." },
    { q: "How does AI lead scoring work?", a: "Our AI scores leads based on 20+ signals including source, response time, engagement level, firmographic data, and behavioral patterns. Scores update in real time as the lead progresses." },
    { q: "Is my CRM data secure?", a: "Yes. All data is encrypted at rest and in transit. We are SOC2 compliant and operate on Indian data centers. Role-based access control ensures only authorized users can view or edit CRM data." },
    { q: "How long does onboarding take?", a: "Basic CRM connection and first automation workflow typically go live within 48 hours. Complex multi-source setups with custom workflows take 5–7 business days with our dedicated implementation team." },
    { q: "What is the pricing?", a: "Plans start at ₹5,999/month covering up to 3 users, 5 automation workflows, and 2 CRM integrations. Custom enterprise plans are available for larger teams." },
  ],

  images: [
    { filename: "crm-automation-software-india-pixoranest.jpg", alt: "CRM automation software dashboard for Indian sales teams — PixoraNest", section: "Hero" },
    { filename: "automated-crm-workflow-builder-india.jpg", alt: "Drag-and-drop automated CRM workflow builder for Indian businesses — PixoraNest", section: "Features" },
    { filename: "sales-pipeline-automation-india.jpg", alt: "Sales pipeline automation showing automatic lead stage progression for Indian B2B companies", section: "How It Works" },
    { filename: "ai-lead-scoring-crm-dashboard.jpg", alt: "AI lead scoring dashboard in CRM showing hot warm and cold lead classification for Indian sales teams", section: "Features" },
  ],

  internalLinks: [
    { anchor: "AI Receptionist for Business", href: "/solutions/ai-receptionist" },
    { anchor: "WhatsApp Lead Automation", href: "/solutions/whatsapp-automation" },
    { anchor: "Call Automation Software", href: "/solutions/call-automation" },
    { anchor: "Social Media Automation", href: "/solutions/social-automation" },
    { anchor: "Book a Demo", href: "/demo" },
  ],

  schemaService: {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "PixoraNest CRM Automation",
    "provider": { "@type": "Organization", "name": "PixoraNest" },
    "description": "AI-powered CRM automation software that connects all lead sources, auto-logs interactions, and triggers follow-up workflows for Indian businesses.",
    "areaServed": "IN",
    "serviceType": "CRM & Sales Automation",
    "url": "https://pixoranest.com/solutions/crm-automation",
  },

  schemaFAQ: { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [] },
}

// ─── Master solutions map (keyed by slug) ────────────────────────────────────
export const solutionsMap: Record<string, SolutionData> = {
  "ai-receptionist":   firstVoice,
  "whatsapp-automation": leadNest,
  "call-automation":   callOrbit,
  "social-automation": socialium,
  "ai-voice-agent":    echoAssist,
  "crm-automation":    crmAutomation,
}

// ─── Existing solutions array for generateStaticParams compatibility ──────────
export const solutions = Object.values(solutionsMap).map(s => ({
  slug: s.slug,
  icon: "Bot",
}))