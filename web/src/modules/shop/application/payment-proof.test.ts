import { describe, expect, it, vi } from "vitest"

import { makeSubmitPaymentProof } from "./payment-proof"

const file = (name = "ck.jpg", type = "image/jpeg", size = 1000) => new File([new Uint8Array(size)], name, { type })
const setup = () => {
  const gateway = { submit: vi.fn(async () => {}) }
  return { gateway, submit: makeSubmitPaymentProof({ gateway }) }
}
const code = "HT10-7K3Q"

describe("submitPaymentProof", () => {
  it("accepts a proof with an optional message", async () => {
    const { gateway, submit } = setup()
    expect(await submit("HT10", { orderCode: code, message: "Cảm ơn các bạn", proof: file() })).toEqual({ ok: true })
    expect(gateway.submit).toHaveBeenCalledWith({ orderCode: code, message: "Cảm ơn các bạn", proof: { name: "ck.jpg", type: "image/jpeg", size: 1000 } })
  })
  it("requires the proof image", async () => {
    const { gateway, submit } = setup()
    const r = await submit("HT10", { orderCode: code })
    expect(r).toMatchObject({ ok: false, fieldErrors: { proof: expect.stringContaining("minh chứng") } })
    expect(gateway.submit).not.toHaveBeenCalled()
  })
  it("rejects non-images, big files and long messages", async () => {
    const { submit } = setup()
    expect(await submit("HT10", { orderCode: code, proof: file("a.pdf", "application/pdf") })).toMatchObject({ ok: false, fieldErrors: { proof: expect.stringContaining("JPG") } })
    expect(await submit("HT10", { orderCode: code, proof: file("a.jpg", "image/jpeg", 11 * 1024 * 1024) })).toMatchObject({ ok: false, fieldErrors: { proof: expect.stringContaining("10MB") } })
    expect(await submit("HT10", { orderCode: code, proof: file(), message: "x".repeat(301) })).toMatchObject({ ok: false, fieldErrors: { message: expect.any(String) } })
  })
  it("accepts HEIC with an empty MIME type", async () => {
    const { submit } = setup()
    expect(await submit("HT10", { orderCode: code, proof: file("anh.HEIC", "") })).toEqual({ ok: true })
  })
  it("rejects a code that does not belong to the campaign", async () => {
    const { submit } = setup()
    expect(await submit("HT10", { orderCode: "TTYT26-7K3Q", proof: file() })).toMatchObject({ ok: false, fieldErrors: { orderCode: expect.any(String) } })
  })
  it("drops honeypot submissions silently", async () => {
    const { gateway, submit } = setup()
    expect(await submit("HT10", { orderCode: code, proof: file(), website: "http://spam" })).toEqual({ ok: true })
    expect(gateway.submit).not.toHaveBeenCalled()
  })
})
