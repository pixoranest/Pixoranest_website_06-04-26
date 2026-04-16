/**
 * lib/animations.ts
 *
 * Previously exported framer-motion variants (fadeInUp, staggerContainer).
 * Now exports CSS-compatible helpers — drop-in replacements.
 *
 * Components that imported these no longer need framer-motion at all.
 * They just apply the returned className strings.
 */

// ─── CSS animation class names ────────────────────────────────────────────────
// These match the keyframes defined in globals.css (added below)

/** Fade up animation — replaces `fadeInUp` framer-motion variant */
export const fadeInUp = {
  className: "animate-fade-up",
  /** For staggered children, pass the index: style={{ animationDelay: `${index * 80}ms` }} */
}

/** Stagger container — replaces `staggerContainer` framer-motion variant */
export const staggerContainer = {
  className: "stagger-container",
}

/**
 * Helper: get the inline style for a staggered child
 * Usage: <div style={staggerChild(index)}>
 */
export function staggerChild(index: number): React.CSSProperties {
  return {
    animationDelay:    `${index * 80}ms`,
    animationFillMode: "both",
  }
}

/**
 * ADD THESE KEYFRAMES TO globals.css:
 *
 * @keyframes fade-up {
 *   from { opacity: 0; transform: translateY(20px); }
 *   to   { opacity: 1; transform: translateY(0); }
 * }
 * .animate-fade-up {
 *   animation: fade-up 0.5s ease-out both;
 * }
 * .stagger-container > * {
 *   animation: fade-up 0.5s ease-out both;
 * }
 * .stagger-container > *:nth-child(1) { animation-delay:   0ms; }
 * .stagger-container > *:nth-child(2) { animation-delay:  80ms; }
 * .stagger-container > *:nth-child(3) { animation-delay: 160ms; }
 * .stagger-container > *:nth-child(4) { animation-delay: 240ms; }
 * .stagger-container > *:nth-child(5) { animation-delay: 320ms; }
 * .stagger-container > *:nth-child(6) { animation-delay: 400ms; }
 *
 * @media (prefers-reduced-motion: reduce) {
 *   .animate-fade-up, .stagger-container > * {
 *     animation: none;
 *     opacity: 1;
 *     transform: none;
 *   }
 * }
 */