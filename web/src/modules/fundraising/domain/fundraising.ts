// Fundraising bounded context: money in (donations, products, sponsors) and out (expenses).
// Amounts are integer VND.

export type FundProgress = {
  campaignCode: string
  /** Confirmed donations only (BR-23). */
  raised: number
  goal: number
  donorCount: number
  /** Smallest amount that earns a certificate, if the campaign offers one. */
  certificateFrom?: number
  /** True while figures are placeholders (no confirmed ledger yet). */
  illustrative: boolean
}

/** Totals shown for a campaign whose fundraising has closed. */
export type FundSummary = {
  campaignCode: string
  raised: number
  donorCount: number
  illustrative: boolean
}

/** A confirmed donation as shown publicly. Donors may opt out of showing their name. */
export type DonorEntry = {
  name: string
  anonymous: boolean
  message?: string
  amount: number
}

export const ANONYMOUS_NAME = "Ẩn danh"

export const donorDisplayName = (d: DonorEntry) => (d.anonymous ? ANONYMOUS_NAME : d.name)

export type ReportLine = { label: string; amount: number }

export type FinancialReport = {
  campaignTitle: string
  income: ReportLine[]
  expenses: ReportLine[]
  status: "draft" | "published"
  illustrative: boolean
}

export function progressRatio(p: FundProgress): number {
  return p.goal > 0 ? Math.min(1, p.raised / p.goal) : 0
}

export const total = (lines: ReportLine[]) => lines.reduce((s, l) => s + l.amount, 0)

/** Money carried over to the next campaign. */
export function balance(r: FinancialReport): number {
  return total(r.income) - total(r.expenses)
}

/** Bar length of a line relative to the largest line in the same column. */
export function shareOfLargest(lines: ReportLine[], line: ReportLine): number {
  const max = Math.max(...lines.map((l) => l.amount))
  return max > 0 ? line.amount / max : 0
}
