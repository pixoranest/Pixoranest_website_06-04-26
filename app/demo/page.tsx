// FILE: app/demo/page.tsx  — REPLACE ENTIRE FILE

import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Products from "./components/products";
import HowItWorks from "./components/Howitworks";
import Industries from "./components/Industries";
import WhyUs from "./components/Whyus";
import BookingSection from "./components/BookingSection";
import WhatsAppCTA from "./components/WhatsAppCTA";
import Footer from "./components/footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

export const metadata: Metadata = {
  title: "PixoraNest – AI Automation Demo | Jaipur",
  description:
    "Book a free 30-minute demo. See PixoraNest AI handle your calls, WhatsApp follow-ups and CRM live — built for Indian SMBs.",
};

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-[#0A0F1E] text-[#F1F5F9] font-sans overflow-x-hidden">
      <Navbar />
      <Hero />
      <Stats />
      <Products />
      <HowItWorks />
      <Industries />
      <WhyUs />
      <BookingSection />
      <WhatsAppCTA />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}