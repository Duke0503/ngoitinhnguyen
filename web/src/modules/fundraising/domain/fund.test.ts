import { describe, expect, it } from "vitest"

import { isReferenceCode, makeReferenceCode } from "./fund"

describe("reference codes", () => {
  it("are built from the campaign code and an unambiguous suffix", () => {
    const code = makeReferenceCode("HT10", () => 0)
    expect(code).toBe("HT10-AAAA")
    expect(isReferenceCode(code, "HT10")).toBe(true)
  })

  it("never use look-alike characters", () => {
    const seen = new Set<string>()
    for (let n = 0; n < 32; n++) seen.add(makeReferenceCode("X", () => n).slice(2, 3))
    for (const c of ["0", "O", "1", "I"]) expect(seen.has(c)).toBe(false)
  })

  it("are only valid for their own campaign", () => {
    expect(isReferenceCode("HT10-7K3Q", "HT10")).toBe(true)
    expect(isReferenceCode("HT10-7K3Q", "TTYT26")).toBe(false)
    expect(isReferenceCode("HT10-7K3", "HT10")).toBe(false)
    expect(isReferenceCode("HT10-7K30", "HT10")).toBe(false)
  })
})
