// Sponsorship bounded context: sponsors, partners, their titles, and the tier package offered to sponsors.

export type PartnerRelation = "sponsor" | "partner"

export type Partner = {
  name: string
  /** Free-form title as the organisation credits it (“Nhà tài trợ Gấu bông”, “Bảo trợ pháp lý”). */
  title: string
  relation: PartnerRelation
  logoSrc?: string
  /** Campaigns or programmes this partner supported, as written in the thank-you posts. */
  supported?: string
}

/** One sponsor tier, e.g. Kim cương = 15.000.000đ. */
export type Tier = { key: string; name: string; amount: number }

/** What a tier gets for one benefit row: included, a quantity/text, or not included. */
export type TierValue = boolean | string | null

export type BenefitRow = {
  /** Full wording from the proposal. */
  label: string
  /** Compact wording for narrow screens. */
  short: string
  values: Record<string, TierValue>
}

/** The package offered for a campaign. The reference package comes from the HT10 proposal. */
export type TierPackage = {
  referenceCampaign: string
  /** Share of a package that must be cash for the tier to count (the proposal says 70%). */
  minCashShare: number
  tiers: Tier[]
  benefits: BenefitRow[]
}

export type TierBenefit = { short: string; label: string; value: string | null }

/** Benefits a tier includes, in table order. `value` is null for a plain “included”. */
export function benefitsOf(pkg: TierPackage, tierKey: string): TierBenefit[] {
  const out: TierBenefit[] = []
  for (const row of pkg.benefits) {
    const v = row.values[tierKey]
    if (v === true) out.push({ short: row.short, label: row.label, value: null })
    else if (typeof v === "string" && v.length > 0) out.push({ short: row.short, label: row.label, value: v })
  }
  return out
}

/** Benefits every tier includes (shown once instead of repeating them in each tier card). */
export function sharedBenefits(pkg: TierPackage): TierBenefit[] {
  const [first, ...rest] = pkg.tiers
  if (!first) return []
  return benefitsOf(pkg, first.key).filter((b) => b.value === null && rest.every((t) => benefitsOf(pkg, t.key).some((x) => x.label === b.label && x.value === null)))
}

/** Benefits specific to a tier: everything it includes except the ones every tier shares. */
export function tierSpecificBenefits(pkg: TierPackage, tierKey: string): TierBenefit[] {
  const shared = new Set(sharedBenefits(pkg).map((b) => b.label))
  return benefitsOf(pkg, tierKey).filter((b) => !shared.has(b.label))
}

/** A package counts toward a tier only when enough of it is cash (the proposal requires 70%). */
export const isCashEnough = (cash: number, total: number, minShare: number) => total > 0 && cash / total >= minShare
