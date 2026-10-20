import { describe, expect, it } from "vitest"

import { benefitsOf, isCashEnough, sharedBenefits, tierSpecificBenefits, type TierPackage } from "./sponsorship"

const pkg: TierPackage = {
  referenceCampaign: "Test",
  minCashShare: 0.7,
  tiers: [
    { key: "gold", name: "Vàng", amount: 10 },
    { key: "bronze", name: "Đồng", amount: 4 },
  ],
  benefits: [
    { label: "Tên trong bảng vàng", short: "Bảng vàng", values: { gold: true, bronze: true } },
    { label: "Logo trên ấn phẩm", short: "Logo", values: { gold: "Bằng logo dự án", bronze: "½ logo dự án" } },
    { label: "Bài cảm ơn riêng", short: "Cảm ơn riêng", values: { gold: true, bronze: null } },
    { label: "Logo trên quà", short: "Logo trên quà", values: { gold: false } },
  ],
}

describe("benefitsOf", () => {
  it("lists included rows, keeps text values, skips null/false/missing", () => {
    expect(benefitsOf(pkg, "gold").map((b) => [b.short, b.value])).toEqual([
      ["Bảng vàng", null],
      ["Logo", "Bằng logo dự án"],
      ["Cảm ơn riêng", null],
    ])
    expect(benefitsOf(pkg, "bronze").map((b) => b.short)).toEqual(["Bảng vàng", "Logo"])
  })
  it("returns nothing for an unknown tier", () => {
    expect(benefitsOf(pkg, "diamond")).toEqual([])
  })
})

describe("shared vs tier-specific benefits", () => {
  it("shared = plain ‘included’ rows every tier has", () => {
    expect(sharedBenefits(pkg).map((b) => b.short)).toEqual(["Bảng vàng"])
  })
  it("tier-specific = the rest of what the tier includes", () => {
    expect(tierSpecificBenefits(pkg, "gold").map((b) => b.short)).toEqual(["Logo", "Cảm ơn riêng"])
    expect(tierSpecificBenefits(pkg, "bronze").map((b) => b.short)).toEqual(["Logo"])
  })
  it("a row whose text differs between tiers is not shared", () => {
    expect(sharedBenefits(pkg).some((b) => b.short === "Logo")).toBe(false)
  })
})

describe("isCashEnough", () => {
  it("needs at least the minimum cash share", () => {
    expect(isCashEnough(7, 10, 0.7)).toBe(true)
    expect(isCashEnough(6.9, 10, 0.7)).toBe(false)
    expect(isCashEnough(0, 0, 0.7)).toBe(false)
  })
})
