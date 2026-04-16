"use client"

import React, { useEffect, useRef } from "react"

// ── Hook ──────────────────────────────────────────────────────────────────
export function useReveal() {
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("sol-revealed")
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("sol-revealed")
          io.disconnect()
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

// ── Reveal wrapper ────────────────────────────────────────────────────────
export function Reveal({
  children,
  className = "",
  tag: Tag = "div",
  style,
}: {
  children: React.ReactNode
  className?: string
  tag?: keyof React.JSX.IntrinsicElements
  style?: React.CSSProperties
}) {
  const ref = useReveal()
  const El = Tag as React.ElementType
  return (
    <El ref={ref} className={`sol-reveal ${className}`} style={style}>
      {children}
    </El>
  )
}