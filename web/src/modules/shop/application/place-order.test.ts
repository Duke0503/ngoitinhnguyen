import { describe, expect, it, vi } from "vitest"

import { loadWards } from "@/shared/address/address"

import type { ShopConfig } from "../domain/shop"
import { makePlaceOrder } from "./place-order"

const img = { src: "/x.jpg", alt: "x" }
const config: ShopConfig = {
  campaignCode: "HT10",
  maxPerProduct: 10,
  promotion: { minItems: 3, discount: 5000, label: "Combo 3 món" },
  hand: { provinceCodes: ["79"] },
  pickup: { label: "Nhận tại sự kiện" },
  opensOn: "2026-10-12",
  closesOn: "2026-10-20",
  products: [
    { slug: "tulip", name: "Thẻ hoa Tulip", detail: "30cm", price: 35_000, image: img },
    { slug: "sao", name: "Móc khoá Ngôi sao", detail: "14cm", price: 25_000, image: img },
  ],
}

async function setup(today = "2026-10-18", cfg: ShopConfig | null = config) {
  const gateway = { place: vi.fn(async () => {}) }
  const place = makePlaceOrder({ shop: { configFor: async () => cfg }, gateway, today: () => today, randomInt: () => 0 })
  const hcm = await loadWards("79")
  const hn = await loadWards("01")
  const ward = hcm.find((w) => w.name === "Phường An Phú Đông")!
  const base = {
    campaignCode: "HT10",
    lines: [{ slug: "tulip", quantity: 2 }, { slug: "sao", quantity: 1 }],
    recipientName: "Lê Thu Hà",
    phone: "0912 345 678",
    method: "hand",
    provinceCode: "79",
    wardCode: ward.code,
    street: "Số 12, đường số 5",
  }
  return { place, gateway, base, ward, hnWard: hn[0] }
}

describe("placeOrder", () => {
  it("accepts a hand-delivered order in the delivery area and fixes prices on the server", async () => {
    const { place, gateway, base } = await setup()
    const r = await place(base)
    expect(r.ok).toBe(true)
    if (r.ok) {
      expect(r.order).toMatchObject({ code: "HT10-AAAA", status: "new", phone: "0912345678", method: "hand" })
      expect(r.order.priced).toMatchObject({ subtotal: 95_000, discount: 5_000, total: 90_000 })
      expect(r.order.address).toMatchObject({ provinceLabel: "TP. Hồ Chí Minh", wardName: "Phường An Phú Đông", street: "Số 12, đường số 5" })
    }
    expect(gateway.place).toHaveBeenCalledOnce()
  })

  it("ignores any price the client sends", async () => {
    const { place, base } = await setup()
    const r = await place({ ...base, total: 1, lines: [{ slug: "tulip", quantity: 1, unitPrice: 1 }] })
    expect(r.ok && r.order.priced.total).toBe(35_000)
  })

  it("accepts pickup with no address", async () => {
    const { place, base } = await setup()
    const { provinceCode: _p, wardCode: _w, street: _s, ...rest } = base
    void _p; void _w; void _s
    const r = await place({ ...rest, method: "pickup" })
    expect(r.ok && r.order.address).toBeUndefined()
  })

  it("requires a full address for hand delivery, with one message per missing field", async () => {
    const { place, gateway, base } = await setup()
    const r = await place({ ...base, provinceCode: undefined, wardCode: undefined, street: "" })
    expect(r.ok).toBe(false)
    if (!r.ok && r.reason === "invalid") expect(Object.keys(r.fieldErrors).sort()).toEqual(["provinceCode", "street", "wardCode"])
    expect(gateway.place).not.toHaveBeenCalled()
  })

  it("rejects a ward that does not belong to the chosen province", async () => {
    const { place, base, hnWard } = await setup()
    const r = await place({ ...base, wardCode: hnWard.code })
    expect(r).toMatchObject({ ok: false, reason: "invalid", fieldErrors: { wardCode: expect.stringContaining("không thuộc") } })
  })

  it("refuses hand delivery outside the delivery provinces and says where it does deliver", async () => {
    const { place, gateway, base, hnWard } = await setup()
    const r = await place({ ...base, provinceCode: "01", wardCode: hnWard.code })
    expect(r).toMatchObject({ ok: false, reason: "out_of_area", message: expect.stringContaining("TP. Hồ Chí Minh") })
    expect(gateway.place).not.toHaveBeenCalled()
  })

  it("is closed before the shop opens, after it closes, or for an unknown campaign", async () => {
    expect(await (await setup("2026-10-11")).place((await setup()).base)).toEqual({ ok: false, reason: "closed" })
    expect(await (await setup("2026-10-21")).place((await setup()).base)).toEqual({ ok: false, reason: "closed" })
    const { place, base } = await setup("2026-10-18", null)
    expect(await place(base)).toEqual({ ok: false, reason: "closed" })
  })

  it("rejects bad phones, empty carts, unknown products and too many units", async () => {
    const { place, base } = await setup()
    for (const bad of [{ phone: "123" }, { lines: [] }, { lines: [{ slug: "ghost", quantity: 1 }] }, { lines: [{ slug: "tulip", quantity: 11 }] }, { recipientName: "A" }]) {
      expect((await place({ ...base, ...bad })).ok).toBe(false)
    }
  })

  it("silently drops honeypot submissions", async () => {
    const { place, gateway, base } = await setup()
    expect((await place({ ...base, website: "http://spam" })).ok).toBe(true)
    expect(gateway.place).not.toHaveBeenCalled()
  })
})
