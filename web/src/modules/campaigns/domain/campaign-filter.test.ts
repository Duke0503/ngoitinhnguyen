import { describe, expect, it } from "vitest"

import type { Campaign } from "./campaign"
import { filterCampaigns, pageCount, pageWindow } from "./campaign-filter"

const make = (over: Partial<Campaign>): Campaign => ({
  slug: "x", code: "X", title: "X", series: "xuan", status: "closed", startsOn: "2026-01-01", endsOn: "2026-02-01", onSiteDates: ["2026-02-01"],
  locations: [{ name: "A", province: "Gia Lai" }], results: [], highlight: "h", cover: { src: "/a.jpg", alt: "" }, ...over,
})
const list = [
  make({ slug: "a", title: "Xuân yêu thương 2026" }),
  make({ slug: "b", title: "Trung thu 2025", series: "trung-thu", onSiteDates: ["2025-10-04"], locations: [{ name: "B", province: "Hà Nội" }] }),
  make({ slug: "c", title: "Trang sách nhỏ", series: "doc-sach", onSiteDates: ["2024-04-20"] }),
]

describe("filterCampaigns", () => {
  it("sorts newest first and filters by series, year and province", () => {
    expect(filterCampaigns(list, {}).map((c) => c.slug)).toEqual(["a", "b", "c"])
    expect(filterCampaigns(list, { series: "trung-thu" }).map((c) => c.slug)).toEqual(["b"])
    expect(filterCampaigns(list, { year: "2024" }).map((c) => c.slug)).toEqual(["c"])
    expect(filterCampaigns(list, { province: "Hà Nội" }).map((c) => c.slug)).toEqual(["b"])
  })
  it("searches without diacritics", () => {
    expect(filterCampaigns(list, { q: "xuan yeu" }).map((c) => c.slug)).toEqual(["a"])
    expect(filterCampaigns(list, { q: "khong co" })).toEqual([])
  })
})

describe("pagination", () => {
  it("counts pages", () => {
    expect(pageCount(0)).toBe(1)
    expect(pageCount(126)).toBe(14)
  })
  it("windows page numbers with gaps", () => {
    expect(pageWindow(1, 14)).toEqual([1, 2, 0, 14])
    expect(pageWindow(7, 14)).toEqual([1, 2, 0, 6, 7, 8, 0, 14])
    expect(pageWindow(1, 3)).toEqual([1, 2, 3])
  })
})
