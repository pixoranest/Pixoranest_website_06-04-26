// FILE: postcss.config.js
// ─────────────────────────────────────────────────────────────────────────────
// ROOT CAUSE OF MISSING CSS:
//
// Your old file was named postcss.config.mjs and used ESM syntax:
//   export default config
//
// PostCSS's config loader uses require() internally — it CANNOT load .mjs
// files or ESM syntax. It silently fails to load the config, meaning
// @tailwindcss/postcss never runs, Tailwind classes are never generated,
// and the CSS file in /out/_next/static/css/ is empty.
//
// WHAT TO DO:
//   1. DELETE postcss.config.mjs from your project root
//   2. CREATE this file as postcss.config.js (CommonJS, no .mjs extension)
//   3. Run: pnpm build
//   4. Check /out/_next/static/css/ — the .css file should now have content
// ─────────────────────────────────────────────────────────────────────────────

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}

module.exports = config