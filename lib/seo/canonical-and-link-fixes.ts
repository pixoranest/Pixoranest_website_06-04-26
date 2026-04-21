// ─────────────────────────────────────────────────────────────────────────────
// FILE: app/solutions/callorbit/page.tsx  (and all other solution pages)
// FIX 1: Canonical URLs must have trailing slash to match trailingSlash: true
// ─────────────────────────────────────────────────────────────────────────────

// BEFORE (wrong — will cause duplicate URL issues):
// canonical: "https://pixoranest.com/solutions/callorbit"

// AFTER (correct — matches trailingSlash: true):
// canonical: "https://pixoranest.com/solutions/callorbit/"

// Apply this fix to ALL solution pages:
// /solutions/callorbit/     → canonical: "https://pixoranest.com/solutions/callorbit/"
// /solutions/firstvoice/    → canonical: "https://pixoranest.com/solutions/firstvoice/"
// /solutions/leadnest/      → canonical: "https://pixoranest.com/solutions/leadnest/"
// /solutions/echoassist/    → canonical: "https://pixoranest.com/solutions/echoassist/"
// /solutions/socialium/     → canonical: "https://pixoranest.com/solutions/socialium/"
// /solutions/crm-automation/ → canonical: "https://pixoranest.com/solutions/crm-automation/"
// /solutions/               → canonical: "https://pixoranest.com/solutions/"

// Also fix in openGraph.url and twitter cards — same trailing slash rule.


// ─────────────────────────────────────────────────────────────────────────────
// FILE: app/solutions/page.tsx
// FIX 2: Same canonical trailing slash fix
// ─────────────────────────────────────────────────────────────────────────────

// BEFORE:
// canonical: "https://pixoranest.com/solutions"
// AFTER:
// canonical: "https://pixoranest.com/solutions/"


// ─────────────────────────────────────────────────────────────────────────────
// BROKEN LINK FIX — search and replace across entire codebase
// ─────────────────────────────────────────────────────────────────────────────
// The homepage links to /case-studies/ but the actual route is /customer-stories/
// Run this search in VS Code:
//   Ctrl+Shift+H (Find & Replace in files)
//   Search:  /case-studies
//   Replace: /customer-stories
//   Scope: all files
//
// Common locations to check:
//   - app/page.tsx (homepage)
//   - components/footer.tsx
//   - components/navbar.tsx
//   - Any page with "Read full case studies" or similar CTA links

// ─────────────────────────────────────────────────────────────────────────────
// package.json — ADD postbuild script
// ─────────────────────────────────────────────────────────────────────────────

// CHANGE your scripts section to:
const packageJsonScriptsFix = {
  scripts: {
    dev: "next dev",
    build: "next build",
    postbuild: "next-sitemap",   // ← ADD THIS LINE
    export: "next build",
    start: "next start",
    lint: "eslint .",
    deploy: "next build && echo 'Build complete. Upload the out/ folder to Hostinger.'"
  }
}

// postbuild runs automatically after `next build`
// So `pnpm build` will: build → then generate sitemap + robots.txt into /out/