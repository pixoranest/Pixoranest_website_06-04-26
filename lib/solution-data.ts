// lib/solution-data.ts — KEY FIX
// solutionsMap keys now match the actual folder names under /app/solutions/
// Folders:  firstvoice | leadnest | callorbit | socialium | echoassist
// OLD keys: ai-receptionist | whatsapp-automation | call-automation | social-automation | ai-voice-agent
// NEW keys: firstvoice | leadnest | callorbit | socialium | echoassist

// ─── All interfaces and solution data objects are UNCHANGED ──────────────────
// Only the solutionsMap export at the bottom has been updated.
// Copy-paste this entire file over your existing lib/solution-data.ts

export interface FAQ { q: string; a: string }
export interface Step { num: string; title: string; desc: string }
export interface Feature { icon: string; title: string; desc: string }
export interface Benefit { stat: string; label: string; desc: string }
export interface UseCase { industry: string; scenario: string }
export interface Testimonial { name: string; role: string; company: string; quote: string; rating: number }
export interface ImageSuggestion { filename: string; alt: string; section: string }

export interface SolutionData {
  slug: string
  metaTitle: string
  metaDescription: string
  focusKeyword: string
  secondaryKeywords: string[]
  badge: string
  h1: string
  heroSubtext: string
  heroCTA: string
  heroSecondaryCTA: string
  problemHeading: string
  problemIntro: string
  problemPoints: string[]
  solutionHeading: string
  solutionSubheading: string
  solutionDesc: string
  featuresHeading: string
  features: Feature[]
  benefitsHeading: string
  benefits: Benefit[]
  useCasesHeading: string
  useCases: UseCase[]
  howItWorksHeading: string
  steps: Step[]
  whyHeading: string
  whyPoints: string[]
  testimonials: Testimonial[]
  faqHeading: string
  faqs: FAQ[]
  images: ImageSuggestion[]
  internalLinks: { anchor: string; href: string }[]
  schemaService: object
  schemaFAQ: object
}

export const firstVoice: SolutionData = {
  slug: "firstvoice",  // ← UPDATED: was "ai-receptionist"
  metaTitle: "AI Receptionist for Business India | FirstVoice by PixoraNest",
  metaDescription: "FirstVoice by PixoraNest answers every business call 24/7, qualifies leads, books appointments, and routes calls — without a human receptionist. Try free demo.",
  focusKeyword: "AI receptionist for business India",
  secondaryKeywords: ["automated call answering India", "virtual receptionist India", "AI phone answering service", "24/7 business call automation"],
  badge: "FirstVoice · AI Receptionist",
  h1: "AI Receptionist for Business India — Answer Every Call, 24/7",
  heroSubtext: "Stop losing customers to missed calls. FirstVoice answers every incoming call instantly, qualifies your leads, books appointments, and routes the right calls to the right team — all without a single human receptionist.",
  heroCTA: "Book a Free Demo",
  heroSecondaryCTA: "See How It Works",
  problemHeading: "Your Business Loses Money Every Time a Call Goes Unanswered",
  problemIntro: "Studies show that 62% of callers never call back after a missed call. For small businesses and startups in India, every missed call is a missed sale. Traditional receptionists are expensive, take sick days, and can only handle one call at a time.",
  problemPoints: [
    "Receptionists cost ₹25,000–₹50,000/month — plus training, leaves, and turnover",
    "Calls outside working hours go to voicemail and are never returned",
    "High call volumes lead to long hold times and poor customer experience",
    "Manual lead qualification wastes your sales team's valuable time",
    "No structured data captured from inbound calls",
  ],
  solutionHeading: "Meet FirstVoice — Your AI Receptionist That Never Sleeps",
  solutionSubheading: "Intelligent. Instant. Always Available.",
  solutionDesc: "FirstVoice is an AI-powered receptionist that picks up every call within 2 rings, holds natural conversations in English and Hindi, captures lead details, qualifies prospects, books appointments directly into your calendar, and routes priority calls to your team — all in real time.",
  featuresHeading: "Everything a Human Receptionist Does — and More",
  features: [
    { icon: "Phone", title: "24/7 Instant Call Answering", desc: "FirstVoice picks up every call within 2 rings — at 2 AM or 2 PM. Zero hold times, zero missed calls." },
    { icon: "Bot", title: "Natural AI Conversations", desc: "Powered by advanced NLP, FirstVoice holds human-like conversations in English and Hindi, adapting tone and context dynamically." },
    { icon: "Calendar", title: "Automatic Appointment Booking", desc: "Syncs with Google Calendar, Calendly, and CRMs to book meetings on the spot without manual intervention." },
    { icon: "Filter", title: "Smart Lead Qualification", desc: "Asks the right questions to score and qualify leads before passing them to your sales team." },
    { icon: "GitBranch", title: "Intelligent Call Routing", desc: "Routes high-priority calls to the right department or executive instantly based on intent and context." },
    { icon: "BarChart2", title: "Call Analytics Dashboard", desc: "Detailed reports on call volume, peak hours, lead quality, and conversion rates — all in one dashboard." },
    { icon: "MessageSquare", title: "Instant WhatsApp Follow-up", desc: "After every call, FirstVoice automatically sends a WhatsApp message with next steps or appointment confirmations." },
    { icon: "Shield", title: "GDPR & Data Privacy Compliant", desc: "All call data is encrypted and stored securely in compliance with Indian data protection standards." },
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
    { industry: "Healthcare Clinics", scenario: "A multi-specialty clinic in Hyderabad was missing 40% of appointment calls during peak OPD hours. FirstVoice answered every call, auto-booked slots into the doctor's calendar, and sent confirmation WhatsApp messages. Appointment bookings rose 55% and no-shows dropped 30% in the first month." },
    { industry: "Real Estate Agencies", scenario: "A property brokerage in Mumbai had inquiry calls coming in late evenings and weekends when agents were unavailable. FirstVoice captured every caller's name, budget, preferred location, and timeline — and emailed a qualified lead summary to agents every morning. Site visit conversions improved by 40%." },
    { industry: "Legal Firms", scenario: "A 4-partner law firm in Delhi was missing new client intake calls while in court. FirstVoice filtered calls, captured case type, urgency level, and contact details, and routed only urgent matters to the duty advocate's mobile. Intake efficiency improved by 3x without adding staff." },
    { industry: "E-commerce & D2C Brands", scenario: "A Bengaluru D2C skincare brand received hundreds of daily calls for order status, return requests, and product queries. FirstVoice automated 80% of these with real-time order lookup integration, freeing their 5-person team for escalations only and cutting call handling cost by ₹1.8 lakh/month." },
  ],
  howItWorksHeading: "How FirstVoice Works in 4 Simple Steps",
  steps: [
    { num: "01", title: "Connect Your Number", desc: "Forward your existing business number or get a new virtual number. Setup takes under 2 minutes." },
    { num: "02", title: "Train with Your Business Logic", desc: "Feed FirstVoice your FAQs, products, team structure, and call scripts. It learns your business in minutes." },
    { num: "03", title: "Go Live Instantly", desc: "FirstVoice starts answering calls immediately — greetings, qualification, bookings, and routing all automated." },
    { num: "04", title: "Monitor & Optimize", desc: "Track every conversation, lead score, and booking from your real-time dashboard. Improve scripts with one click." },
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
    { q: "Does FirstVoice work with my existing phone number?", a: "Yes. You can forward your existing business landline or mobile to FirstVoice, or get a new dedicated virtual number. No number porting needed." },
    { q: "Can FirstVoice speak in Hindi and regional languages?", a: "Currently FirstVoice supports English and Hindi fluently. Tamil, Telugu, Marathi, and Bengali are in beta — contact us to join the waitlist." },
    { q: "How is this different from a traditional IVR system?", a: "IVR systems follow rigid menus and frustrate callers. FirstVoice holds natural two-way conversations, understands intent, and responds intelligently — giving callers the feeling of talking to a real person." },
    { q: "Is my call data secure?", a: "All call recordings and data are encrypted at rest and in transit. We are SOC2 Type II certified and comply with Indian data protection regulations." },
    { q: "Can FirstVoice transfer calls to a human agent?", a: "Yes. You can set rules for when calls should be transferred — based on caller intent, priority, time of day, or specific keywords." },
    { q: "What happens if FirstVoice doesn't understand a caller?", a: "FirstVoice gracefully escalates to a human agent or takes a detailed message and triggers an immediate WhatsApp/email alert to your team." },
    { q: "How much does FirstVoice cost?", a: "Plans start at ₹4,999/month for startups. Enterprise plans with unlimited calls and custom integrations are available. Book a demo for a custom quote." },
    { q: "How long does it take to set up?", a: "Basic setup takes under 15 minutes. Full customization with your scripts, FAQs, and CRM integration typically takes 1–2 business days with our onboarding team." },
  ],
  images: [
    { filename: "ai-receptionist-dashboard-india.jpg", alt: "AI receptionist dashboard handling business calls in India — FirstVoice by PixoraNest", section: "Hero" },
    { filename: "firstvoice-call-analytics-report.jpg", alt: "FirstVoice call analytics dashboard showing lead quality and call volume", section: "Features" },
    { filename: "ai-phone-answering-service-india.jpg", alt: "AI phone answering service for small business India — 24/7 automated receptionist", section: "How It Works" },
    { filename: "virtual-receptionist-appointment-booking.jpg", alt: "Virtual receptionist automatically booking appointments for a healthcare clinic in India", section: "Use Cases" },
  ],
  internalLinks: [
    { anchor: "WhatsApp Lead Automation", href: "/solutions/leadnest" },
    { anchor: "AI Voice Agent", href: "/solutions/echoassist" },
    { anchor: "CRM Automation", href: "/solutions/crm-automation" },
    { anchor: "View All Solutions", href: "/solutions" },
    { anchor: "Book a Demo", href: "/contact" },
  ],
  schemaService: {
    "@context": "https://schema.org", "@type": "Service",
    "name": "FirstVoice AI Receptionist",
    "provider": { "@type": "Organization", "name": "PixoraNest" },
    "description": "AI-powered virtual receptionist that answers calls 24/7, qualifies leads, books appointments, and routes calls for Indian businesses.",
    "areaServed": "IN", "serviceType": "AI Call Automation",
    "url": "https://pixoranest.com/solutions/firstvoice",
  },
  schemaFAQ: { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [] },
}

export const leadNest: SolutionData = {
  slug: "leadnest",  // ← UPDATED: was "whatsapp-automation"
  metaTitle: "WhatsApp Lead Automation India | LeadNest by PixoraNest",
  metaDescription: "LeadNest automates WhatsApp lead capture, follow-ups, and CRM sync for Indian businesses. Convert 3x more leads on autopilot. Book a free demo today.",
  focusKeyword: "WhatsApp lead automation India",
  secondaryKeywords: ["WhatsApp Business automation", "automated WhatsApp follow-up", "WhatsApp CRM integration India", "WhatsApp lead management software"],
  badge: "LeadNest · WhatsApp Lead Management",
  h1: "WhatsApp Lead Automation for Indian Businesses — Convert More, Work Less",
  heroSubtext: "98% of WhatsApp messages are read within 3 minutes. LeadNest captures every lead from WhatsApp, automatically qualifies them, nurtures them with personalized follow-ups, and syncs everything to your CRM — without any manual work.",
  heroCTA: "Start Free Trial",
  heroSecondaryCTA: "Watch Demo",
  problemHeading: "WhatsApp Is Your #1 Lead Channel — Are You Wasting It?",
  problemIntro: "India has 500M+ WhatsApp users. Yet most businesses still reply to leads manually, follow up inconsistently, and have no system to track or nurture prospects. The result? Leads go cold and revenue leaks away.",
  problemPoints: [
    "Sales teams spend 3–4 hours/day manually replying to WhatsApp inquiries",
    "Leads that don't get a response within 5 minutes convert 80% less",
    "No visibility into which WhatsApp leads converted or dropped off",
    "Inconsistent follow-ups mean 70% of leads are never re-engaged",
    "WhatsApp conversations are siloed — disconnected from CRM and email",
  ],
  solutionHeading: "LeadNest — Your Always-On WhatsApp Sales Assistant",
  solutionSubheading: "Capture. Qualify. Nurture. Convert.",
  solutionDesc: "LeadNest connects to your WhatsApp Business account and turns it into a fully automated lead generation engine. It instantly responds to every inquiry, asks qualifying questions, tags and scores leads, sends personalized follow-up sequences, and pushes all data to your CRM.",
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
    { industry: "EdTech & Coaching Institutes", scenario: "A UPSC coaching centre in Pune ran WhatsApp ads for a free demo class. LeadNest instantly replied to every inquiry, asked 3 qualifying questions (subject, exam year, city), and sent a demo class booking link. 38% of inquiries converted to paid enrolments — up from 11% with manual handling." },
    { industry: "Real Estate Developers", scenario: "A builder in Gurugram had 200+ daily WhatsApp inquiries for a new launch. LeadNest auto-replied with floor plans, pricing PDFs, and a site-visit booking link within 5 seconds of each message. The 7-day drip follow-up recovered 60% of leads who didn't respond initially." },
    { industry: "Insurance & BFSI", scenario: "An insurance broker in Chennai automated policy renewal reminders via WhatsApp 30 days, 7 days, and 1 day before expiry. LeadNest's drip sequences saved 15 hours/week of manual calling and improved renewal rates by 28% in the first quarter." },
    { industry: "Retail & D2C E-commerce", scenario: "A fashion brand in Surat integrated LeadNest with Shopify to trigger abandoned-cart WhatsApp messages with product images and a personalised 10% discount code. Cart recovery improved from 6% to 31%, adding ₹4.2 lakh in monthly revenue from carts that would have been lost." },
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
  images: [],
  internalLinks: [
    { anchor: "AI Receptionist for Business", href: "/solutions/firstvoice" },
    { anchor: "CRM Workflow Automation", href: "/solutions/crm-automation" },
    { anchor: "Social Media Automation", href: "/solutions/socialium" },
    { anchor: "View Pricing Plans", href: "/pricing" },
    { anchor: "Book a Free Demo", href: "/contact" },
  ],
  schemaService: {
    "@context": "https://schema.org", "@type": "Service",
    "name": "LeadNest WhatsApp Lead Automation",
    "provider": { "@type": "Organization", "name": "PixoraNest" },
    "description": "WhatsApp Business automation software for lead capture, qualification, follow-up, and CRM sync for Indian businesses.",
    "areaServed": "IN", "serviceType": "WhatsApp Marketing Automation",
    "url": "https://pixoranest.com/solutions/leadnest",
  },
  schemaFAQ: { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [] },
}

export const callOrbit: SolutionData = {
  slug: "callorbit",  // ← UPDATED: was "call-automation"
  metaTitle: "Call Automation & Routing Software India | CallOrbit by PixoraNest",
  metaDescription: "CallOrbit by PixoraNest automates inbound call routing, transcription, and follow-ups for Indian businesses. Cut call handling costs by 60%. Book a demo.",
  focusKeyword: "call automation software India",
  secondaryKeywords: ["automated call routing India", "AI call handling software", "cloud telephony India", "smart IVR alternative"],
  badge: "CallOrbit · Call Automation & Routing",
  h1: "Call Automation Software for Indian Businesses — Route Smarter, Convert Faster",
  heroSubtext: "CallOrbit replaces your outdated IVR with an AI-powered call automation system that intelligently routes calls, transcribes conversations, triggers follow-ups, and gives your team real-time insights — all from a single dashboard.",
  heroCTA: "Book a Free Demo",
  heroSecondaryCTA: "Explore Features",
  problemHeading: "Your Phone System Is Costing You Customers and Revenue",
  problemIntro: "Outdated IVR menus, long hold times, and misrouted calls are silently destroying your customer experience. 67% of customers hang up in frustration and never call back.",
  problemPoints: [
    "Legacy IVR systems frustrate callers with rigid menus and dead ends",
    "Calls regularly get routed to the wrong department, wasting everyone's time",
    "No transcription means critical information is lost after every call",
    "Zero visibility into call outcomes, trends, or agent performance",
    "Manual follow-ups after calls are inconsistent and often forgotten",
  ],
  solutionHeading: "CallOrbit — The Smart Alternative to IVR for Modern Businesses",
  solutionSubheading: "Route Every Call to the Right Person at the Right Time",
  solutionDesc: "CallOrbit uses AI to understand caller intent in real time and routes calls intelligently to the right agent, team, or location — without rigid menus. Every call is transcribed, analyzed, and followed up automatically.",
  featuresHeading: "Intelligent Call Automation Features That Drive Results",
  features: [
    { icon: "GitBranch", title: "AI-Powered Smart Routing", desc: "Routes calls based on caller intent, history, location, language, and priority — not pre-set menu options." },
    { icon: "FileText", title: "Real-Time Transcription", desc: "Every call is automatically transcribed, summarized, and tagged with key topics, sentiment, and action items." },
    { icon: "Bell", title: "Automated Post-Call Follow-up", desc: "Triggers WhatsApp messages, emails, or CRM tasks automatically after every call based on outcome and intent." },
    { icon: "BarChart", title: "Call Analytics & Reporting", desc: "Visualize call volume, handle time, missed calls, agent performance, and conversion rates in real time." },
    { icon: "Clock", title: "Business Hours & Overflow Rules", desc: "Set intelligent rules for after-hours routing, overflow to backup agents, and holiday schedules." },
    { icon: "Headphones", title: "Call Recording & Monitoring", desc: "Record all calls for compliance and coaching. Supervisors can listen live or review recordings with smart search." },
    { icon: "Smartphone", title: "Virtual Numbers for Any City", desc: "Get local virtual numbers for Delhi, Mumbai, Bengaluru, and 100+ cities to build a local presence nationwide." },
    { icon: "Repeat", title: "IVR → AI Migration", desc: "Seamlessly migrate your existing IVR setup to CallOrbit without changing your number or disrupting operations." },
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
    { industry: "BFSI & FinTech", scenario: "A private bank in Mumbai was routing all loan inquiry calls through a generic IVR, causing 45% of callers to drop off before speaking to an agent. CallOrbit's AI intent detection identified loan type from the first sentence and routed directly to the right product specialist — transfer rates dropped by 70% and loan application starts increased by 35%." },
    { industry: "Hospital Chains & Healthcare", scenario: "A 5-branch hospital network in Bengaluru received 800+ calls daily across specialties. CallOrbit routed calls to the nearest branch and correct department using caller location and spoken intent. Average wait time dropped from 4 minutes to 28 seconds, and patient satisfaction scores improved by 40 points." },
    { industry: "Logistics & Supply Chain", scenario: "A courier company in Delhi had drivers, vendors, and customers all calling the same number, creating chaos. CallOrbit separated caller types using voice biometrics and intent, routing each to dedicated queues. Dispute resolution time dropped by 50% and driver on-time delivery improved due to faster support access." },
    { industry: "B2B SaaS & Tech Startups", scenario: "A Hyderabad SaaS startup used CallOrbit's AI-generated call summaries to coach sales reps on objection handling. Reps received a 3-line summary and sentiment score before every follow-up call. Deal close rates improved by 28% in 60 days without any additional hiring." },
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
    { q: "How accurate is the call transcription?", a: "Our AI transcription delivers 95%+ accuracy for clear audio in English and Hindi. Accuracy improves over time with your specific vocabulary and call types." },
    { q: "Can I get virtual numbers for different cities in India?", a: "Yes. We offer local virtual numbers for 100+ cities across India, including Delhi, Mumbai, Bengaluru, Chennai, Hyderabad, Pune, and Kolkata." },
    { q: "Is call recording legal in India?", a: "Yes, with consent. CallOrbit automatically plays a consent notice before recording begins, ensuring full TRAI compliance. All recordings are stored encrypted." },
    { q: "What is the uptime guarantee for CallOrbit?", a: "We offer a 99.9% uptime SLA backed by redundant infrastructure across two Indian data centers. Planned maintenance is always communicated 48 hours in advance." },
    { q: "How does the pricing work?", a: "CallOrbit is priced based on the number of agents and call minutes. Plans start at ₹3,999/month for startups. Enterprise plans are custom-priced." },
  ],
  images: [],
  internalLinks: [
    { anchor: "AI Receptionist", href: "/solutions/firstvoice" },
    { anchor: "AI Voice Agent", href: "/solutions/echoassist" },
    { anchor: "CRM Automation", href: "/solutions/crm-automation" },
    { anchor: "Pricing", href: "/pricing" },
    { anchor: "Contact Us", href: "/contact" },
  ],
  schemaService: {
    "@context": "https://schema.org", "@type": "Service",
    "name": "CallOrbit Call Automation & Routing",
    "provider": { "@type": "Organization", "name": "PixoraNest" },
    "description": "AI-powered call routing, transcription, and automation platform for Indian businesses.",
    "areaServed": "IN", "serviceType": "Cloud Telephony & Call Automation",
    "url": "https://pixoranest.com/solutions/callorbit",
  },
  schemaFAQ: { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [] },
}

export const socialium: SolutionData = {
  slug: "socialium",  // ← UPDATED: was "social-automation"
  metaTitle: "Social Media Automation India | Socialium by PixoraNest",
  metaDescription: "Socialium automates your social media posting, lead capture, and DM responses across Instagram, Facebook & LinkedIn for Indian businesses. Try free today.",
  focusKeyword: "social media automation India",
  secondaryKeywords: ["automated social media posting India", "Instagram DM automation", "social media lead generation India", "Facebook automation tool India"],
  badge: "Socialium · Social Media Automation",
  h1: "Social Media Automation for Indian Businesses — Grow Without the Grind",
  heroSubtext: "Socialium automates everything from content scheduling and Instagram DM replies to lead capture and competitor tracking — so you can grow your brand on autopilot while your team focuses on strategy, not execution.",
  heroCTA: "Start Free Trial",
  heroSecondaryCTA: "See Features",
  problemHeading: "Social Media Is Your Biggest Growth Channel — and Your Biggest Time Drain",
  problemIntro: "Indian businesses spend 3–5 hours daily on social media — posting, replying to DMs, engaging with comments, and tracking competitors. Yet most never have a consistent strategy.",
  problemPoints: [
    "Inconsistent posting destroys algorithm reach and audience trust",
    "DMs from potential customers go unanswered for hours or days",
    "No system to capture and qualify leads from social media comments and DMs",
    "Teams waste hours every week on manual scheduling and reporting",
    "Zero insight into which content drives actual sales vs. just vanity metrics",
  ],
  solutionHeading: "Socialium — Your Complete Social Media Automation Engine",
  solutionSubheading: "Schedule. Engage. Capture Leads. Grow.",
  solutionDesc: "Socialium connects to your Instagram, Facebook, LinkedIn, and Twitter accounts and automates the entire social media workflow — from AI-powered content scheduling and DM auto-replies to lead capture from comments and real-time performance analytics.",
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
    { industry: "D2C Fashion & E-commerce", scenario: "A women's fashion brand in Surat was posting 3 times a week manually and missing hundreds of Instagram DM inquiries for size availability and pricing. Socialium automated 21 weekly posts, instantly replied to all DMs with size charts and checkout links, and captured 50+ qualified leads daily. Instagram revenue contribution grew from 8% to 31% of total sales in 90 days." },
    { industry: "Restaurants & F&B Chains", scenario: "A 6-outlet restaurant chain in Hyderabad struggled with inconsistent social posting and missed table-booking DMs on weekends. Socialium scheduled daily menu and offer posts, auto-replied to booking requests with a reservation link, and ran festival engagement campaigns on autopilot. Walk-in bookings from social increased by 44% in the first month." },
    { industry: "EdTech & Coaching Centres", scenario: "A JEE/NEET coaching institute in Kota ran Facebook ads and got hundreds of comment inquiries every day that went unresponded. Socialium auto-commented with a course link and DM'd every commenter with a free mock test offer. Qualified lead cost dropped from ₹320 to ₹85, and batch enrollments increased 45% during admission season." },
    { industry: "Real Estate Marketing", scenario: "A property developer in Pune launched a new township on Instagram with boosted Reels. Socialium auto-replied to every story reply and comment with a project brochure link and site-visit scheduler. The launch captured 380 qualified leads in 5 days without any manual social media effort from the marketing team." },
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
    { q: "Will my Instagram account get banned for using automation?", a: "No. Socialium operates exclusively through Meta's official Business API and Twitter's official API. We do not use any unofficial bots or scraping tools." },
    { q: "Can Socialium generate content for me?", a: "Yes. Our AI caption generator creates platform-optimized captions in your brand voice. You can also repurpose blog posts and product descriptions into social content." },
    { q: "How does the DM lead capture work?", a: "When a user messages your Instagram or Facebook page, Socialium's AI auto-replies, qualifies them with smart questions, captures their contact details, and pushes them to your CRM automatically." },
    { q: "Can I manage multiple brand pages from one account?", a: "Yes. Socialium supports multiple brands and pages per account. You can manage up to 10 social pages on our Professional plan and unlimited on Enterprise." },
    { q: "Does Socialium integrate with WhatsApp?", a: "Yes. Socialium integrates with LeadNest to hand off social leads directly to WhatsApp follow-up sequences." },
    { q: "Is there a free trial?", a: "Yes. We offer a 14-day free trial with full access to all features — no credit card required. Our team will help you set up your first automation in under 30 minutes." },
  ],
  images: [],
  internalLinks: [
    { anchor: "WhatsApp Lead Automation", href: "/solutions/leadnest" },
    { anchor: "CRM Automation", href: "/solutions/crm-automation" },
    { anchor: "AI Receptionist", href: "/solutions/firstvoice" },
    { anchor: "Pricing Plans", href: "/pricing" },
    { anchor: "Book a Free Demo", href: "/contact" },
  ],
  schemaService: {
    "@context": "https://schema.org", "@type": "Service",
    "name": "Socialium Social Media Automation",
    "provider": { "@type": "Organization", "name": "PixoraNest" },
    "description": "Social media automation platform for content scheduling, DM auto-reply, lead capture, and analytics for Indian businesses.",
    "areaServed": "IN", "serviceType": "Social Media Marketing Automation",
    "url": "https://pixoranest.com/solutions/socialium",
  },
  schemaFAQ: { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [] },
}

export const echoAssist: SolutionData = {
  slug: "echoassist",  // ← UPDATED: was "ai-voice-agent"
  metaTitle: "AI Voice Agent for Business India | EchoAssist by PixoraNest",
  metaDescription: "EchoAssist is an AI voice agent that handles sales calls, support queries, and surveys with human-like conversations in English and Hindi. Book a demo.",
  focusKeyword: "AI voice agent India",
  secondaryKeywords: ["conversational AI phone agent India", "AI sales calling India", "automated voice bot India", "AI customer support voice agent"],
  badge: "EchoAssist · AI Voice Agent",
  h1: "AI Voice Agent for Indian Businesses — Human-Like Conversations at Scale",
  heroSubtext: "EchoAssist makes and receives phone calls with the intelligence of your best sales rep and the availability of a machine. Handle sales outreach, customer support, appointment reminders, and surveys — in English and Hindi — across thousands of calls simultaneously.",
  heroCTA: "Book a Free Demo",
  heroSecondaryCTA: "Hear a Sample Call",
  problemHeading: "Scaling Phone-Based Sales and Support Is Expensive and Inconsistent",
  problemIntro: "Growing your phone sales team means hiring, training, and managing agents who get tired, make mistakes, and quit. At the same time, customers expect immediate, personalized responses. The math doesn't add up — until now.",
  problemPoints: [
    "Hiring 10 agents costs ₹5–8L/month including training, tools, and benefits",
    "Agent performance varies — good days and bad days affect your brand",
    "Outbound calling campaigns are slow — one agent can call 50–80 people/day",
    "Support calls at off-hours go unanswered or to voicemail",
    "Zero consistency in pitch, compliance scripting, or data capture across agents",
  ],
  solutionHeading: "EchoAssist — The AI Voice Agent That Sounds Human and Scales Instantly",
  solutionSubheading: "1000 Conversations. Simultaneously. Every Day.",
  solutionDesc: "EchoAssist is a conversational AI voice agent built on advanced speech synthesis and natural language processing. It handles inbound support calls, makes outbound sales calls, runs automated surveys, and sends appointment reminders — all with a natural human-like voice in English and Hindi.",
  featuresHeading: "EchoAssist's Powerful AI Voice Capabilities",
  features: [
    { icon: "Mic", title: "Human-Like Voice Synthesis", desc: "EchoAssist uses neural TTS to generate natural, expressive voices that sound indistinguishable from a human agent." },
    { icon: "Brain", title: "Contextual Conversation Intelligence", desc: "Remembers context mid-call, handles interruptions, and adapts responses dynamically based on what the caller says." },
    { icon: "Phone", title: "Outbound Sales Calling", desc: "Run outbound calling campaigns at scale. EchoAssist pitches your product, handles objections, and books demos automatically." },
    { icon: "Headphones", title: "Inbound Customer Support", desc: "Handle FAQs, order status, complaint logging, and escalation for inbound callers without any human involvement." },
    { icon: "CalendarCheck", title: "Appointment Reminders & Confirmations", desc: "Automatically call patients, clients, or leads to confirm appointments — reduce no-shows by up to 60%." },
    { icon: "ClipboardList", title: "Automated Survey Calls", desc: "Conduct NPS surveys, post-purchase feedback, and market research calls at scale with structured data capture." },
    { icon: "Globe", title: "Multilingual — English & Hindi", desc: "EchoAssist switches between English and Hindi fluently within the same call based on caller preference." },
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
    { industry: "Diagnostics & Healthcare", scenario: "A diagnostic chain with 12 collection centres in Chennai used EchoAssist to call 2,000 patients daily for appointment reminders, fasting instructions, and home-visit confirmations. No-show rates dropped from 34% to 8% in 6 weeks — saving ₹6 lakh/month in wasted lab slot costs and eliminating a 4-person calling team." },
    { industry: "Insurance & Renewals", scenario: "An insurance distribution company in Mumbai ran annual policy renewal campaigns manually — reaching only 30% of their book in time. EchoAssist called the entire renewal book of 18,000 customers in 3 days, identified warm leads, and scheduled agent callbacks only for interested customers. Renewal conversion improved from 19% to 31%." },
    { industry: "D2C & Post-Purchase Feedback", scenario: "A premium skincare brand in Bengaluru used EchoAssist to call every customer 7 days after delivery with a personalised feedback script and product recommendation. 23% of called customers made a repeat purchase within 14 days based on AI-recommended bundles — adding ₹8 lakh in monthly repeat revenue." },
    { industry: "EdTech & Webinar Registration", scenario: "A test-prep startup in Noida needed to drive 5,000 webinar registrations for its admission season launch. EchoAssist called their entire lead database of 22,000 in 4 hours, confirmed interest, and pushed registrations directly to their CRM. Cost per confirmed registration dropped from ₹180 to ₹22 vs. manual outreach." },
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
    { q: "Is outbound AI calling legal in India?", a: "Yes, with proper compliance. EchoAssist respects TRAI's DND registry, calling time restrictions, and consent requirements. We handle compliance configuration during onboarding." },
    { q: "What languages does EchoAssist support?", a: "EchoAssist currently supports English and Hindi. Regional language support (Tamil, Telugu, Marathi) is available on Enterprise plans." },
    { q: "How many concurrent calls can EchoAssist handle?", a: "EchoAssist scales to 10,000+ concurrent calls. Campaigns are throttled only by your DNC compliance requirements and calling hour rules." },
    { q: "Can I listen to call recordings?", a: "Yes. Every call is recorded, transcribed, and tagged with outcome, sentiment, and key topics. You can search and filter recordings by date, campaign, and outcome from your dashboard." },
    { q: "What does EchoAssist cost?", a: "Pricing is based on call minutes. Plans start at ₹7,999/month with 5,000 minutes included. Enterprise plans with custom minutes and integrations are available." },
  ],
  images: [],
  internalLinks: [
    { anchor: "AI Receptionist for Business", href: "/solutions/firstvoice" },
    { anchor: "Call Automation Software", href: "/solutions/callorbit" },
    { anchor: "CRM Automation", href: "/solutions/crm-automation" },
    { anchor: "Pricing Plans", href: "/pricing" },
    { anchor: "Contact Us", href: "/contact" },
  ],
  schemaService: {
    "@context": "https://schema.org", "@type": "Service",
    "name": "EchoAssist AI Voice Agent",
    "provider": { "@type": "Organization", "name": "PixoraNest" },
    "description": "AI voice agent for outbound sales calling, appointment reminders, and inbound support in English and Hindi for Indian businesses.",
    "areaServed": "IN", "serviceType": "AI Voice Automation",
    "url": "https://pixoranest.com/solutions/echoassist",
  },
  schemaFAQ: { "@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [] },
}

// ─── Master solutions map — keys match folder names ──────────────────────────
export const solutionsMap: Record<string, SolutionData> = {
  "firstvoice":  firstVoice,   // /app/solutions/firstvoice/
  "leadnest":    leadNest,     // /app/solutions/leadnest/
  "callorbit":   callOrbit,    // /app/solutions/callorbit/
  "socialium":   socialium,    // /app/solutions/socialium/
  "echoassist":  echoAssist,   // /app/solutions/echoassist/
}

export const solutions = Object.values(solutionsMap).map((s) => ({
  slug: s.slug,
  icon: "Bot",
}))