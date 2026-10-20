// Campaigns bounded context: pure domain model (no React, no I/O).

export type CampaignStatus = "draft" | "announced" | "fundraising" | "on_site" | "closing" | "closed"

export type CampaignSeries = "doc-sach" | "trung-thu" | "xuan" | "20-10"

export type ResultMetric = "gifts" | "lanterns" | "scholarships" | "books"

/** A counted outcome. `atLeast` = the source says “hơn …”; `label` overrides the metric's default noun. */
export type ActivityResult = {
  metric: ResultMetric
  quantity: number
  atLeast?: boolean
  label?: string
}

export type ImageRef = { src: string; alt: string; caption?: string }

export type CampaignLocation = {
  name: string
  /** Province/city after the 01/07/2025 reform (e.g. "Gia Lai", "TP.HCM"). */
  province: string
  /** Team/branch that ran this location (“Hà Nội & Hưng Yên”); regions are not provinces. */
  branch?: string
  address?: string
  dates?: string[]
  results?: ActivityResult[]
  note?: string
  photo?: ImageRef
}

export type CampaignPhase = { name: string; startsOn: string; endsOn: string; description: string }

/** Public change notice, e.g. a venue that moved after the first announcement. */
export type CampaignNotice = { text: string }

export type CampaignLead = { name: string; role: string }

export type Campaign = {
  slug: string
  code: string
  title: string
  /** Compact name for lists and timelines (“Đèn Trăng 2”); falls back to `title`. */
  shortTitle?: string
  series: CampaignSeries
  slogan?: string
  summary?: string
  storyTitle?: string
  story?: string[]
  status: CampaignStatus
  startsOn: string
  endsOn: string
  /** Days the team was on site; drives the timeline date. */
  onSiteDates: string[]
  phases?: CampaignPhase[]
  notices?: CampaignNotice[]
  locations: CampaignLocation[]
  /** Campaign-level results; location results are added on top (see `campaignResults`). */
  results: ActivityResult[]
  /** One-line outcome shown on the journey timeline. */
  highlight: string
  cover: ImageRef
  hero?: ImageRef
  gallery?: ImageRef[]
  lead?: CampaignLead
  /** Short tag for the campaign's occasion, e.g. “Chào mừng Ngày Phụ nữ Việt Nam 20/10”. */
  occasion?: string
}

const ACTIVE: CampaignStatus[] = ["announced", "fundraising", "on_site"]

export function isActive(c: Campaign): boolean {
  return ACTIVE.includes(c.status)
}

export function isFinished(c: Campaign): boolean {
  return c.status === "closing" || c.status === "closed"
}

const statusLabels: Record<CampaignStatus, string> = {
  draft: "Bản nháp",
  announced: "Sắp diễn ra",
  fundraising: "Đang gây quỹ",
  on_site: "Đang diễn ra",
  closing: "Đang tổng kết",
  closed: "Đã hoàn thành",
}

const seriesLabels: Record<CampaignSeries, string> = { "doc-sach": "Đọc sách", "trung-thu": "Trung thu", xuan: "Xuân", "20-10": "20/10" }

export const seriesLabel = (s: CampaignSeries) => seriesLabels[s]

export const displayTitle = (c: Campaign) => c.shortTitle ?? c.title

export const statusLabel = (c: Campaign) => statusLabels[c.status]

/** All results of a campaign: its own plus those recorded per location. */
export function campaignResults(c: Campaign): ActivityResult[] {
  return [...c.results, ...c.locations.flatMap((l) => l.results ?? [])]
}

export type ImpactFigure = { quantity: number; atLeast: boolean }

export type ImpactSummary = {
  campaigns: number
  gifts: ImpactFigure
  lanterns: ImpactFigure
  scholarships: ImpactFigure
  provinces: number
}

function sum(campaigns: Campaign[], metric: ResultMetric): ImpactFigure {
  let quantity = 0
  let atLeast = false
  for (const c of campaigns) {
    for (const r of campaignResults(c)) {
      if (r.metric !== metric) continue
      quantity += r.quantity
      atLeast ||= Boolean(r.atLeast)
    }
  }
  return { quantity, atLeast }
}

/** Impact is computed from recorded results, never typed by hand (BUSINESS.md BR-03). */
export function summarizeImpact(campaigns: Campaign[]): ImpactSummary {
  const counted = campaigns.filter((c) => c.status !== "draft")
  return {
    campaigns: counted.length,
    gifts: sum(counted, "gifts"),
    lanterns: sum(counted, "lanterns"),
    scholarships: sum(counted, "scholarships"),
    provinces: new Set(counted.flatMap((c) => c.locations.map((l) => l.province))).size,
  }
}

/**
 * Display rule for public figures: round large numbers down to the hundred
 * and add “+” (549 → “500+”), keep small exact counts exact.
 */
export function formatImpact({ quantity, atLeast }: ImpactFigure): string {
  if (quantity >= 200) return `${Math.floor(quantity / 100) * 100}+`
  return atLeast ? `${quantity}+` : String(quantity)
}

/** Distinct place names in order of first appearance: “Gia Lai · TP.HCM · Hà Nội”. */
export function provinceLine(c: Campaign): string {
  return [...new Set(c.locations.map((l) => l.province))].join(" · ")
}

export type BranchGroup = { name: string; locations: CampaignLocation[] }

/** Locations grouped by the team that ran them; empty when no location names a branch. */
export function branchGroups(c: Campaign): BranchGroup[] {
  if (!c.locations.some((l) => l.branch)) return []
  const groups = new Map<string, CampaignLocation[]>()
  for (const l of c.locations) {
    const key = l.branch ?? l.province
    groups.set(key, [...(groups.get(key) ?? []), l])
  }
  return [...groups].map(([name, locations]) => ({ name, locations }))
}

const metricNoun: Record<ResultMetric, string> = {
  gifts: "suất quà",
  lanterns: "lồng đèn",
  scholarships: "suất học bổng",
  books: "quyển sách",
}

export const resultNoun = (r: ActivityResult) => r.label ?? metricNoun[r.metric]

export type KeyStat = { value: string; label: string }

/** Up to four headline figures for a campaign hero, computed from its data. */
export function keyStats(c: Campaign): KeyStat[] {
  const stats: KeyStat[] = [{ value: String(c.locations.length), label: "địa bàn" }]
  const branches = branchGroups(c)
  if (branches.length > 1) stats.push({ value: String(branches.length), label: "điểm cầu" })
  for (const metric of ["gifts", "lanterns", "scholarships", "books"] as const) {
    const figure = sum([c], metric)
    if (figure.quantity > 0) stats.push({ value: formatImpact(figure), label: metricNoun[metric] })
  }
  return stats.slice(0, 4)
}

/** Counted outcomes of one campaign as text, e.g. “500+ suất quà”; empty when nothing was counted yet. */
export function resultFigures(c: Campaign): string[] {
  const out: string[] = []
  for (const metric of ["gifts", "lanterns", "scholarships", "books"] as const) {
    const figure = sum([c], metric)
    if (figure.quantity > 0) out.push(`${formatImpact(figure)} ${metricNoun[metric]}`)
  }
  return out
}
