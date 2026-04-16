"use client"

// ─── section-wrapper.tsx ──────────────────────────────────────────────────────
// Uses CSS transitions + IntersectionObserver for scroll reveal (no framer-motion)

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

// ─── Types ────────────────────────────────────────────────────────────────────
interface SectionWrapperProps {
  children: React.ReactNode
  className?: string
  innerClassName?: string   // NEW: lets callers style the inner max-w container
  delay?: number
  id?: string
  noPadding?: boolean       // NEW: opt-out for sections that manage their own py
}

interface SectionHeaderProps {
  label?: string
  title: string
  subtitle?: string
  center?: boolean
  className?: string
}

// ─── Scroll-reveal hook ───────────────────────────────────────────────────────
function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity   = "1"
      el.style.transform = "none"
      return
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.opacity   = "1"
            el.style.transform = "translateY(0)"
          }, delay)
          io.disconnect()
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delay])

  return ref
}

// ─── SectionWrapper ───────────────────────────────────────────────────────────
// Outer div  → w-full (allows full-bleed backgrounds)
// Inner div  → max-w-7xl + responsive horizontal padding + vertical padding
//
// Spacing scale (matches Stripe / Vercel / Linear):
//   px-4          → 16px   (mobile)
//   sm:px-6       → 24px   (≥640px)
//   lg:px-12      → 48px   (≥1024px)
//   xl:px-16      → 64px   (≥1280px)
//   max-w-7xl     → 1280px max, always centered
//   py-16 lg:py-20 → consistent vertical rhythm
export function SectionWrapper({
  children,
  className,
  innerClassName,
  delay = 0,
  id,
  noPadding = false,
}: SectionWrapperProps) {
  const ref = useReveal(delay)

  return (
    <section
      ref={ref}
      id={id}
      className={cn("w-full", className)}
      style={{
        opacity:    0,
        transform:  "translateY(20px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      <div
        className={cn(
          "mx-auto w-full max-w-7xl",
          // Horizontal padding — same on every section, no exceptions
          "px-4 sm:px-6 lg:px-12 xl:px-16",
          // Vertical padding — skip only when the caller passes noPadding
          !noPadding && "py-16 lg:py-20",
          innerClassName
        )}
      >
        {children}
      </div>
    </section>
  )
}

// ─── SectionHeader ────────────────────────────────────────────────────────────
export function SectionHeader({
  label,
  title,
  subtitle,
  center = true,
  className,
}: SectionHeaderProps) {
  const ref = useReveal(0)

  return (
    <div
      ref={ref}
      className={cn("mb-12", center && "text-center", className)}
      style={{
        opacity:    0,
        transform:  "translateY(16px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      {label && (
        <span className="mb-3 inline-block rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-400">
          {label}
        </span>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  )
}