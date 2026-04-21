"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, ArrowRight, Sparkles } from "lucide-react";
import { navLinks, industries } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const pathname = usePathname();
  const industriesTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  const handleIndustriesEnter = () => {
    if (industriesTimer.current) clearTimeout(industriesTimer.current);
    setIndustriesOpen(true);
  };
  const handleIndustriesLeave = () => {
    industriesTimer.current = setTimeout(() => setIndustriesOpen(false), 150);
  };

  return (
    // FIX: Added role="banner" for semantic HTML (accessibility + SEO)
    <header
      role="banner"
      className="fixed top-[40px] left-0 w-full h-[80px] z-50 bg-white/80 backdrop-blur-md border-b shadow-sm"
    >
      {/* FIX: aria-label on nav for accessibility */}
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >

        {/* LOGO — FIX: Added title attribute for SEO */}
        <Link
          href="/"
          className="flex items-center gap-2 shrink-0"
          aria-label="PixoraNest — AI Automation Agency India — Home"
        >
          <Image
            src="/images/logo-pixoranest.png"
            alt="PixoraNest AI Automation Agency India"
            width={180}
            height={50}
            className="h-10 w-auto"
            priority
            // FIX: fetchPriority ensures logo loads first (LCP improvement)
            fetchPriority="high"
          />
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden items-center gap-4 lg:flex">
          {navLinks.map((link) =>
            link.label === "Industries" ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={handleIndustriesEnter}
                onMouseLeave={handleIndustriesLeave}
              >
                <Link
                  href={link.href}
                  aria-expanded={industriesOpen}
                  aria-haspopup="true"
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors",
                    pathname.startsWith("/industries") ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                  <ChevronDown
                    className={cn(
                      "h-3.5 w-3.5 transition-transform duration-200",
                      industriesOpen && "rotate-180"
                    )}
                    aria-hidden="true"
                  />
                </Link>

                {/* Dropdown */}
                <div
                  role="menu"
                  aria-label="Industry solutions"
                  className={cn(
                    "absolute left-1/2 top-full z-50 mt-2 w-56 -translate-x-1/2 rounded-xl border bg-white p-2 shadow-xl",
                    "transition-all duration-200 origin-top",
                    industriesOpen
                      ? "opacity-100 scale-100 pointer-events-auto"
                      : "opacity-0 scale-95 pointer-events-none"
                  )}
                >
                  {industries.slice(0, 10).map((ind) => (
                    <Link
                      key={ind.slug}
                      href={`/industries/${ind.slug}`}
                      role="menuitem"
                      className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100 transition-colors"
                      onClick={() => setIndustriesOpen(false)}
                    >
                      {ind.title}
                    </Link>
                  ))}
                </div>
              </div>
            ) : link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium hover:text-primary text-muted-foreground transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-sm font-medium hover:text-primary transition-colors",
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                )}
                // FIX: aria-current for active page (accessibility + SEO)
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* RIGHT SIDE BUTTON */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/contact"
            className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary/90 transition-colors"
            aria-label="Book a free AI automation demo with PixoraNest"
          >
            Book a Demo
          </Link>
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-all hover:bg-slate-200 active:scale-95"
        >
          {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </nav>

      {/* ── MOBILE MENU ── */}
      {/* Backdrop — FIX: replaced inline style object with Tailwind classes */}
      <div
        onClick={closeMobile}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-[90] bg-black/45 backdrop-blur-[4px] transition-opacity duration-200",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      />

      {/* Panel — FIX: replaced style object with Tailwind + CSS custom classes */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        className={cn(
          "fixed top-0 right-0 z-[100] flex h-dvh w-[85vw] max-w-[340px] flex-col bg-white shadow-2xl",
          "transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* HEADER */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4">
          <Link href="/" onClick={closeMobile} aria-label="PixoraNest Home">
            <Image
              src="/images/logo-pixoranest.png"
              alt="PixoraNest"
              width={140}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
          <button
            onClick={closeMobile}
            aria-label="Close navigation menu"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200 border-0 cursor-pointer"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* NAV LINKS */}
        <div className="flex-1 overflow-y-auto p-3">
          <p className="mb-2.5 px-2 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
            Navigation
          </p>

          {navLinks.map((link) => {
            const isActive =
              link.label === "Industries"
                ? pathname.startsWith("/industries")
                : pathname === link.href;

            const itemClass = cn(
              "flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium no-underline mb-0.5",
              "transition-colors duration-150",
              isActive
                ? "bg-blue-50 text-blue-600"
                : "text-slate-800 hover:bg-blue-50 hover:text-blue-600"
            );

            const indicator = isActive
              ? <span className="h-2 w-2 rounded-full bg-blue-600" aria-hidden="true" />
              : <ArrowRight size={15} className="text-slate-300" aria-hidden="true" />;

            if (link.external) {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobile}
                  className={itemClass}
                >
                  <span>{link.label}</span>
                  {indicator}
                </a>
              );
            }

            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMobile}
                className={itemClass}
                aria-current={isActive ? "page" : undefined}
              >
                <span>{link.label}</span>
                {indicator}
              </Link>
            );
          })}
        </div>

        {/* BOTTOM CTA */}
        <div className="shrink-0 border-t border-slate-100 p-4">
          <div className="mb-3 flex items-center gap-2 rounded-xl bg-blue-50 px-3.5 py-2.5">
            <Sparkles size={13} className="text-blue-600 shrink-0" aria-hidden="true" />
            <span className="text-xs font-medium text-blue-800">
              AI-powered automation for modern businesses
            </span>
          </div>

          <Link
            href="/contact"
            onClick={closeMobile}
            className="flex w-full items-center justify-center gap-2 rounded-[14px] bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 text-[15px] font-semibold text-white no-underline shadow-[0_4px_20px_rgba(37,99,235,0.3)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
            aria-label="Book a free AI automation demo"
          >
            Book a Demo
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </header>
  );
}