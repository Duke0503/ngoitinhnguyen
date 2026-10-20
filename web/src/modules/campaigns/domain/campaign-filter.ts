// Pure list logic for the Campaigns page: filter by series / year / province / text, then paginate.
import { pageCount as sharedPageCount } from "@/shared/lib/pagination"
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

export const pageCount = (total: number) => sharedPageCount(total, PER_PAGE)
export { pageWindow } from "@/shared/lib/pagination"

export const filterOptions = (list: Campaign[]) => ({
  series: [...new Set(list.map((c) => c.series))],
  years: [...new Set(list.map(yearOf))].sort().reverse(),
  provinces: [...new Set(list.flatMap((c) => c.locations.map((l) => l.province)))].sort(),
})
