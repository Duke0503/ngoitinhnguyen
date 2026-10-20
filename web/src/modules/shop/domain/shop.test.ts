import { describe, expect, it } from "vitest"

import { canTransition, orderSteps, stepIndex } from "./order"
import { acceptsOrders, handDeliveryAvailable, itemsToPromotion, priceOrder, type ShopConfig } from "./shop"

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
    { slug: "ly", name: "Thẻ hoa Ly", detail: "30cm", price: 35_000, image: img },
    { slug: "sao", name: "Móc khoá Ngôi sao", detail: "14cm", price: 25_000, image: img },
  ],
}

describe("priceOrder", () => {
  it("prices lines from the catalogue, never from the request", () => {
    const r = priceOrder(config, [{ slug: "tulip", quantity: 2 }])
    expect(r.ok && r.order).toMatchObject({ itemCount: 2, subtotal: 70_000, discount: 0, shipping: 0, total: 70_000 })
  })

  it("takes 5.000đ off the whole order from 3 items, whatever the mix (the HT10 menu example: 2 + 1 = 90.000đ)", () => {
    const r = priceOrder(config, [
      { slug: "tulip", quantity: 2 },
      { slug: "sao", quantity: 1 },
    ])
    expect(r.ok && r.order).toMatchObject({ itemCount: 3, subtotal: 95_000, discount: 5_000, total: 90_000 })
  })

  it("gives no discount at 2 items and a single discount (not per item) at 6", () => {
    const two = priceOrder(config, [{ slug: "sao", quantity: 2 }])
    const six = priceOrder(config, [{ slug: "sao", quantity: 6 }])
    expect(two.ok && two.order.discount).toBe(0)
    expect(six.ok && six.order.discount).toBe(5_000)
  })

  it("ignores zero-quantity lines and rejects an empty order", () => {
    expect(priceOrder(config, [{ slug: "tulip", quantity: 0 }])).toEqual({ ok: false, error: { code: "empty" } })
    expect(priceOrder(config, [])).toEqual({ ok: false, error: { code: "empty" } })
    const r = priceOrder(config, [{ slug: "tulip", quantity: 0 }, { slug: "sao", quantity: 1 }])
    expect(r.ok && r.order.lines).toHaveLength(1)
  })

  it("rejects unknown products, fractional or negative quantities, and quantities over the limit", () => {
    expect(priceOrder(config, [{ slug: "ghost", quantity: 1 }])).toMatchObject({ ok: false, error: { code: "unknown_product" } })
    expect(priceOrder(config, [{ slug: "ly", quantity: 1.5 }])).toMatchObject({ ok: false, error: { code: "bad_quantity" } })
    expect(priceOrder(config, [{ slug: "ly", quantity: -1 }])).toMatchObject({ ok: false, error: { code: "bad_quantity" } })
    expect(priceOrder(config, [{ slug: "ly", quantity: 11 }])).toMatchObject({ ok: false, error: { code: "too_many", max: 10 } })
  })

  it("never lets the discount exceed the subtotal", () => {
    const cheap = { ...config, promotion: { minItems: 1, discount: 99_999, label: "x" } }
    const r = priceOrder(cheap, [{ slug: "sao", quantity: 1 }])
    expect(r.ok && r.order.total).toBe(0)
  })
})

describe("shop window and delivery", () => {
  it("accepts orders inside its window, inclusive of both ends", () => {
    expect(acceptsOrders(config, "2026-10-12")).toBe(true)
    expect(acceptsOrders(config, "2026-10-20")).toBe(true)
    expect(acceptsOrders(config, "2026-10-11")).toBe(false)
    expect(acceptsOrders(config, "2026-10-21")).toBe(false)
  })
  it("offers hand delivery only inside the delivery provinces", () => {
    expect(handDeliveryAvailable(config, "79")).toBe(true)
    expect(handDeliveryAvailable(config, "01")).toBe(false)
  })
  it("tells the buyer how many more items earn the promotion", () => {
    expect(itemsToPromotion(config, 1)).toBe(2)
    expect(itemsToPromotion(config, 3)).toBe(0)
  })
})

describe("order status", () => {
  it("moves forward one step at a time, can be cancelled before delivery, and ends at delivered/cancelled", () => {
    expect(canTransition("new", "paid")).toBe(true)
    expect(canTransition("new", "delivered")).toBe(false)
    expect(canTransition("paid", "new")).toBe(false)
    expect(canTransition("delivering", "cancelled")).toBe(true)
    expect(canTransition("delivered", "cancelled")).toBe(false)
    expect(canTransition("cancelled", "paid")).toBe(false)
  })
  it("has a five-step happy path", () => {
    expect(orderSteps).toHaveLength(5)
    expect(stepIndex("preparing")).toBe(2)
    expect(stepIndex("cancelled")).toBe(-1)
  })
})
