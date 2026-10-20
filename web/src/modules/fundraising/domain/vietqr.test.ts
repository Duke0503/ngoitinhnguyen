import { describe, expect, it } from "vitest"

import { buildVietQrPayload, crc16, sanitizeMemo } from "./vietqr"

// Minimal EMV TLV reader, used to check the payload structurally.
function parse(payload: string): Record<string, string> {
  const out: Record<string, string> = {}
  for (let i = 0; i < payload.length; ) {
    const tag = payload.slice(i, i + 2)
    const len = Number(payload.slice(i + 2, i + 4))
    out[tag] = payload.slice(i + 4, i + 4 + len)
    i += 4 + len
  }
  return out
}

describe("crc16", () => {
  it("matches the CRC-16/CCITT-FALSE check value", () => {
    expect(crc16("123456789")).toBe("29B1")
  })
})

describe("buildVietQrPayload", () => {
  const input = { bankBin: "970418", accountNumber: "8883309229", amount: 25_000, memo: "HT10-7K3Q" }

  it("produces a payload whose trailing CRC is valid", () => {
    const payload = buildVietQrPayload(input)
    expect(payload.slice(-4)).toBe(crc16(payload.slice(0, -4)))
    expect(payload.slice(-8, -4)).toBe("6304")
  })

  it("encodes bank, account, amount and memo in the right tags", () => {
    const f = parse(buildVietQrPayload(input))
    expect(f["00"]).toBe("01")
    expect(f["01"]).toBe("12")
    expect(f["53"]).toBe("704")
    expect(f["54"]).toBe("25000")
    expect(f["58"]).toBe("VN")
    const napas = parse(f["38"])
    expect(napas["00"]).toBe("A000000727")
    expect(napas["02"]).toBe("QRIBFTTA")
    expect(parse(napas["01"])).toEqual({ "00": "970418", "01": "8883309229" })
    expect(parse(f["62"])["08"]).toBe("HT10-7K3Q")
  })

  it("is static (no amount tag) when no amount is given", () => {
    const f = parse(buildVietQrPayload({ ...input, amount: undefined }))
    expect(f["01"]).toBe("11")
    expect(f["54"]).toBeUndefined()
  })

  it("rejects malformed bank or account data", () => {
    expect(() => buildVietQrPayload({ ...input, bankBin: "BIDV" })).toThrow()
    expect(() => buildVietQrPayload({ ...input, accountNumber: "12 34" })).toThrow()
    expect(() => buildVietQrPayload({ ...input, amount: 1.5 })).toThrow()
  })
})

describe("sanitizeMemo", () => {
  it("strips diacritics, upper-cases and limits length", () => {
    expect(sanitizeMemo("Nguyễn Văn Đức - ủng hộ")).toBe("NGUYEN VAN DUC - UNG HO")
    expect(sanitizeMemo("a".repeat(40))).toHaveLength(25)
  })
})
