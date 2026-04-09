"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight, Sparkles } from "lucide-react";
import { navLinks, industries } from "@/lib/data";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const pathname = usePathname();

  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="fixed top-[40px] left-0 w-full h-[80px] z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">

      {/* NAV */}
      <nav className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* LOGO */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/images/logo-pixoranest.png"
            alt="PixoraNest"
            width={180}
            height={50}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* DESKTOP MENU — unchanged */}
        <div className="hidden items-center gap-4 lg:flex">
          {navLinks.map((link) =>
            link.label === "Industries" ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setIndustriesOpen(true)}
                onMouseLeave={() => setTimeout(() => setIndustriesOpen(false), 150)}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1 text-sm font-medium hover:text-primary",
                    pathname.startsWith("/industries") ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </Link>

                <AnimatePresence>
                  {industriesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute left-1/2 top-full z-50 mt-2 w-56 -translate-x-1/2 rounded-xl border bg-white p-2 shadow-xl"
                    >
                      {industries.slice(0, 10).map((ind) => (
                        <Link
                          key={ind.slug}
                          href={`/industries/${ind.slug}`}
                          className="block rounded-lg px-3 py-2 text-sm hover:bg-gray-100"
                        >
                          {ind.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium hover:text-primary text-muted-foreground"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  "text-sm font-medium hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        {/* RIGHT SIDE BUTTON — desktop only */}
        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/contact"
            className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary/90"
          >
            Book a Demo
          </Link>
        </div>

        {/* MOBILE HAMBURGER */}
        <button
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle mobile menu"
          className="lg:hidden flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700 transition-all hover:bg-slate-200 active:scale-95"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* ============================================================
          MOBILE MENU
          FIX: inline styles used for structural layout so Tailwind
          purge / JIT never strips them at runtime. Nav items are
          rendered directly from navLinks with NO filter / condition.
      ============================================================ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMobile}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 90,
                backgroundColor: "rgba(0,0,0,0.45)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
              }}
            />

            {/* Panel */}
            <motion.div
              key="mobile-panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                zIndex: 100,
                height: "100dvh",
                width: "85vw",
                maxWidth: 340,
                backgroundColor: "#ffffff",
                boxShadow: "0 25px 60px rgba(0,0,0,0.18)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* ── HEADER ── */}
              <div
                style={{
                  flexShrink: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  borderBottom: "1px solid #f1f5f9",
                }}
              >
                <Link href="/" onClick={closeMobile}>
                  <Image
                    src="/images/logo-pixoranest.png"
                    alt="PixoraNest"
                    width={140}
                    height={40}
                    style={{ height: 32, width: "auto" }}
                  />
                </Link>
                <button
                  onClick={closeMobile}
                  aria-label="Close menu"
                  style={{
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    backgroundColor: "#f1f5f9",
                    color: "#475569",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <X size={18} />
                </button>
              </div>

              {/* ── NAV LINKS ── */}
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "16px 12px",
                }}
              >
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "#94a3b8",
                    padding: "0 8px 10px",
                    margin: 0,
                  }}
                >
                  Navigation
                </p>

                {/* ALL links — no filter, no condition, guaranteed visible */}
                {navLinks.map((link) => {
                  const isActive =
                    link.label === "Industries"
                      ? pathname.startsWith("/industries")
                      : pathname === link.href;

                  const baseItemStyle: React.CSSProperties = {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 16px",
                    borderRadius: 12,
                    marginBottom: 2,
                    fontSize: 15,
                    fontWeight: 500,
                    textDecoration: "none",
                    cursor: "pointer",
                    backgroundColor: isActive ? "#eff6ff" : "transparent",
                    color: isActive ? "#2563eb" : "#1e293b",
                    transition: "background-color 0.15s, color 0.15s",
                  };

                  const handleHoverIn = (e: React.MouseEvent<HTMLElement>) => {
                    e.currentTarget.style.backgroundColor = "#eff6ff";
                    e.currentTarget.style.color = "#2563eb";
                  };
                  const handleHoverOut = (e: React.MouseEvent<HTMLElement>) => {
                    e.currentTarget.style.backgroundColor = isActive ? "#eff6ff" : "transparent";
                    e.currentTarget.style.color = isActive ? "#2563eb" : "#1e293b";
                  };

                  const chevron = isActive
                    ? <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#2563eb", display: "block" }} />
                    : <ArrowRight size={15} color="#cbd5e1" />;

                  if (link.external) {
                    return (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeMobile}
                        style={baseItemStyle}
                        onMouseEnter={handleHoverIn}
                        onMouseLeave={handleHoverOut}
                      >
                        <span>{link.label}</span>
                        {chevron}
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={closeMobile}
                      style={baseItemStyle}
                      onMouseEnter={handleHoverIn}
                      onMouseLeave={handleHoverOut}
                    >
                      <span>{link.label}</span>
                      {chevron}
                    </Link>
                  );
                })}
              </div>

              {/* ── BOTTOM CTA ── */}
              <div
                style={{
                  flexShrink: 0,
                  padding: 16,
                  borderTop: "1px solid #f1f5f9",
                }}
              >
                {/* Brand pill */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    backgroundColor: "#eff6ff",
                    borderRadius: 12,
                    padding: "10px 14px",
                    marginBottom: 12,
                  }}
                >
                  <Sparkles size={13} color="#2563eb" />
                  <span style={{ fontSize: 12, fontWeight: 500, color: "#1d4ed8" }}>
                    AI-powered automation for modern businesses
                  </span>
                </div>

                {/* CTA Button */}
                <Link
                  href="/contact"
                  onClick={closeMobile}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    width: "100%",
                    padding: "14px 20px",
                    borderRadius: 14,
                    background: "linear-gradient(to right, #2563eb, #4f46e5)",
                    color: "#ffffff",
                    fontSize: 15,
                    fontWeight: 600,
                    textDecoration: "none",
                    boxShadow: "0 4px 20px rgba(37,99,235,0.3)",
                    boxSizing: "border-box",
                  }}
                >
                  Book a Demo
                  <ArrowRight size={16} color="#ffffff" />
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}