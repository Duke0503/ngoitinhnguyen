// Pure list logic for the Campaigns page: filter by series / year / province / text, then paginate.
import { provinceLine, seriesLabel, type Campaign, type CampaignSeries } from "./campaign"

export const PER_PAGE = 9

export type CampaignFilter = { series?: CampaignSeries; year?: string; province?: string; q?: string }

const fold = (s: string) =>
  s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/đ/gi, "d")
    .toLowerCase()

export const yearOf = (c: Campaign) => (c.onSiteDates[0] ?? c.startsOn).slice(0, 4)

export function filterCampaigns(list: Campaign[], f: CampaignFilter): Campaign[] {
  const q = f.q ? fold(f.q.trim()) : ""
  return list
    .filter((c) => !f.series || c.series === f.series)
    .filter((c) => !f.year || yearOf(c) === f.year)
    .filter((c) => !f.province || c.locations.some((l) => l.province === f.province))
    .filter((c) => !q || fold([c.title, c.shortTitle, c.highlight, seriesLabel(c.series), provinceLine(c)].filter(Boolean).join(" ")).includes(q))
    .sort((a, b) => (b.onSiteDates[0] ?? b.startsOn).localeCompare(a.onSiteDates[0] ?? a.startsOn))
}

export const pageCount = (total: number) => Math.max(1, Math.ceil(total / PER_PAGE))

/** Page numbers to show: 1 … current±1 … last, with gaps marked by 0. */
export function pageWindow(current: number, last: number): number[] {
  const set = new Set([1, 2, current - 1, current, current + 1, last])
  const nums = [...set].filter((n) => n >= 1 && n <= last).sort((a, b) => a - b)
  return nums.flatMap((n, i) => (i > 0 && n - nums[i - 1] > 1 ? [0, n] : [n]))
}

export const filterOptions = (list: Campaign[]) => ({
  series: [...new Set(list.map((c) => c.series))],
  years: [...new Set(list.map(yearOf))].sort().reverse(),
  provinces: [...new Set(list.flatMap((c) => c.locations.map((l) => l.province)))].sort(),
})
