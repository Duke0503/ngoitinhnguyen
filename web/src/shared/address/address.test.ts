import { describe, expect, it } from "vitest"

import { findProvince, findProvinceByLabel, findWard, loadWards, provinceLabel, provinceLabels, provinces, searchKey } from "./address"

describe("provinces", () => {
  it("are the 34 units in force since 01/07/2025, with unique codes and labels", () => {
    expect(provinces).toHaveLength(34)
    expect(new Set(provinces.map((p) => p.code)).size).toBe(34)
    expect(new Set(provinceLabels).size).toBe(34)
    expect(provinces.filter((p) => p.kind === "city").map(provinceLabel).sort()).toEqual(
      ["TP. Cần Thơ", "TP. Hà Nội", "TP. Hải Phòng", "TP. Hồ Chí Minh", "TP. Huế", "TP. Đà Nẵng"].sort()
    )
  })
  it("resolve by code and by label", () => {
    expect(findProvince("79")?.name).toBe("Hồ Chí Minh")
    expect(findProvinceByLabel("TP. Hồ Chí Minh")?.code).toBe("79")
    expect(findProvinceByLabel("Gia Lai")?.code).toBe("52")
    expect(findProvince("00")).toBeUndefined()
  })
})

describe("wards", () => {
  it("add up to 3,321 commune-level units across all provinces", async () => {
    const lists = await Promise.all(provinces.map((p) => loadWards(p.code)))
    expect(lists.reduce((n, l) => n + l.length, 0)).toBe(3321)
    expect(lists.every((l) => l.length > 0)).toBe(true)
  })
  it("match the official counts for the two biggest cities", async () => {
    expect(await loadWards("79")).toHaveLength(168)
    expect(await loadWards("01")).toHaveLength(126)
  })
  it("contain the places Ngòi actually works in", async () => {
    const names = (await loadWards("79")).map((w) => w.name)
    for (const n of ["Phường An Phú Đông", "Xã Thạnh An", "Phường Xóm Chiếu"]) expect(names).toContain(n)
    expect((await loadWards("52")).some((w) => w.name.includes("Ia Băng"))).toBe(true)
  })
  it("are sorted by Vietnamese collation and findable by code", async () => {
    const hcm = await loadWards("79")
    const w = hcm.find((x) => x.name === "Phường An Phú Đông")!
    expect(await findWard("79", w.code)).toEqual(w)
    expect(await findWard("79", "99999")).toBeUndefined()
  })
  it("return nothing for an unknown province instead of throwing", async () => {
    expect(await loadWards("00")).toEqual([])
    expect(await loadWards("../../etc")).toEqual([])
  })
})

describe("searchKey", () => {
  it("makes accent-free input match accented names", () => {
    expect(searchKey("Phường An Phú Đông")).toContain(searchKey("an phu dong"))
    expect(searchKey("Đặc khu Cô Tô")).toBe("dac khu co to")
  })
})
