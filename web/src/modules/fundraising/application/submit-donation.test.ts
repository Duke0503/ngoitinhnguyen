import { describe, expect, it, vi } from "vitest"

import type { Fund } from "../domain/fund"
import { makeSubmitDonation } from "./submit-donation"

const fund: Fund = {
  campaignCode: "HT10",
  name: "Quỹ Hoa Tháng 10",
  bankName: "BIDV",
  bankBin: "970418",
  accountNumber: "8883309229",
  accountOwner: "TRUONG THI MY TUYET",
  presets: [25_000],
  open: true,
}

const proof = new File(["x"], "bill.png", { type: "image/png" })
const valid = { referenceCode: "HT10-7K3Q", donorName: "Nguyễn Minh Anh", amount: 25_000, isPublic: true, consent: true, proof }

function setup(f: Fund | null = fund) {
  const gateway = { submit: vi.fn(async (d) => ({ referenceCode: d.referenceCode, status: "pending" as const })) }
  const submit = makeSubmitDonation({ funds: { fundFor: async () => f }, gateway })
  return { submit, gateway }
}

describe("submitDonation", () => {
  it("passes a valid donation to the gateway as pending", async () => {
    const { submit, gateway } = setup()
    const result = await submit("HT10", valid)
    expect(result).toEqual({ ok: true, donation: { referenceCode: "HT10-7K3Q", status: "pending" } })
    expect(gateway.submit).toHaveBeenCalledOnce()
    expect(gateway.submit.mock.calls[0][0]).toMatchObject({ fundCode: "HT10", amount: 25_000, proof: { name: "bill.png" } })
  })

  it("refuses closed or unknown funds", async () => {
    expect(await setup({ ...fund, open: false }).submit("HT10", valid)).toEqual({ ok: false, reason: "closed" })
    expect(await setup(null).submit("HT10", valid)).toEqual({ ok: false, reason: "closed" })
  })

  it("reports a message per invalid field", async () => {
    const { submit, gateway } = setup()
    const result = await submit("HT10", { ...valid, donorName: "A", amount: 10, consent: false })
    expect(result.ok).toBe(false)
    if (!result.ok && result.reason === "invalid") {
      expect(Object.keys(result.fieldErrors).sort()).toEqual(["amount", "consent", "donorName"])
    }
    expect(gateway.submit).not.toHaveBeenCalled()
  })

  it("rejects a reference code from another campaign and a non-image proof", async () => {
    const { submit } = setup()
    const wrongRef = await submit("HT10", { ...valid, referenceCode: "TTYT26-7K3Q" })
    const wrongFile = await submit("HT10", { ...valid, proof: new File(["x"], "notes.pdf", { type: "application/pdf" }) })
    expect(wrongRef.ok).toBe(false)
    expect(wrongFile.ok).toBe(false)
  })

  it("silently drops honeypot submissions", async () => {
    const { submit, gateway } = setup()
    const result = await submit("HT10", { ...valid, website: "http://spam.example" })
    expect(result.ok).toBe(true)
    expect(gateway.submit).not.toHaveBeenCalled()
  })
})
