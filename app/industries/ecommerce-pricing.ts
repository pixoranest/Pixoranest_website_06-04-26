// ─────────────────────────────────────────────────────────────────────────────
// PixoraNest — E-Commerce Plan Pricing
// Source of truth for the E-Commerce industry page calculator.
// DO NOT import FOUNDATION_TIERS here. These are Ecommerce-specific tiers.
// ─────────────────────────────────────────────────────────────────────────────

export type EcommerceTier = {
  /** Display label shown on the term selector button */
  label: string
  /** Contract length in months */
  months: number
  /** Per-store monthly rate (INR, excl. GST) */
  monthlyRate: number
  /** One-time setup fee (INR, excl. GST) */
  setupFee: number
  /**
   * Pre-GST total for 1 store:
   *   setupFee + (monthlyRate × months)
   * Verify: these match manager-approved quoted figures.
   */
  preGSTTotal: number
  /** Percentage discount vs. 3-month rate (for badge display) */
  discount: number
  /** Whether to show "Most Popular" badge */
  popular: boolean
}

/**
 * Manager-approved Ecommerce plan pricing (updated June 2025).
 *
 * Pre-GST totals (1 store):
 *   3M  → ₹1,47,500   (setup ₹87,500  + 3  × ₹20,000)
 *   6M  → ₹2,11,220   (setup ₹97,220  + 6  × ₹19,000)
 *   12M → ₹3,31,580   (setup ₹1,15,580 + 12 × ₹18,000)
 *   24M → ₹5,58,140   (setup ₹1,50,140 + 24 × ₹17,000)
 *
 * GST 18% is added on top at quote time.
 * Multi-store: only monthlyRate × stores is multiplied; setupFee stays flat.
 */
export const ECOMMERCE_TIERS: EcommerceTier[] = [
 
  {
    label: "3 Months",
    months: 3,
    monthlyRate: 20_000,
    setupFee: 65_000,
    preGSTTotal: 125_000,
    discount: 0,
    popular: false,
  },
  {
    label: "6 Months",
    months: 6,
    monthlyRate: 19_000,
    setupFee: 65_000,
    preGSTTotal: 179_000,
    discount: 5,
    popular: false,
  },
  {
    label: "12 Months",
    months: 12,
    monthlyRate: 18_000,
    setupFee: 65_000,
    preGSTTotal: 281_000,
    discount: 10,
    popular: true,
  },
  {
    label: "24 Months",
    months: 24,
    monthlyRate: 17_000,
    setupFee: 65_000,
    preGSTTotal: 473_000,
    discount: 15,
    popular: false,
  },

]