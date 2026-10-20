import { findProvince, findWard, provinceLabel } from "@/shared/address/address"
import { normalizePhone } from "@/shared/lib/phone"
import { makeCode } from "@/shared/lib/reference-code"

import type { DeliveryMethod, PricedOrder, ShopConfig } from "../domain/shop"
import { acceptsOrders, handDeliveryAvailable, priceOrder } from "../domain/shop"
import { makeOrderSchema } from "./order-schema"

export type DeliveryAddress = {
  provinceCode: string
  provinceLabel: string
  wardCode: string
  wardName: string
  street: string
}

/** An accepted order: prices fixed by the server, status `new` until finance confirms the transfer. */
export type PlacedOrder = {
  code: string
  campaignCode: string
  recipientName: string
  /** National format, e.g. 0912345678. */
  phone: string
  method: DeliveryMethod
  address?: DeliveryAddress
  note?: string
  priced: PricedOrder
  status: "new"
}

/** Port: stub today, the Go API client later (`POST /v1/public/orders`). */
export interface OrderGateway {
  place(order: PlacedOrder): Promise<void>
}

export interface ShopLookup {
  configFor(campaignCode: string): Promise<ShopConfig | null>
}

export type PlaceOrderResult =
  | { ok: true; order: PlacedOrder }
  | { ok: false; reason: "closed" }
  | { ok: false; reason: "out_of_area"; message: string }
  | { ok: false; reason: "invalid"; fieldErrors: Record<string, string> }

type Deps = { shop: ShopLookup; gateway: OrderGateway; today: () => string; randomInt: (maxExclusive: number) => number }

export function makePlaceOrder({ shop, gateway, today, randomInt }: Deps) {
  return async function placeOrder(raw: { campaignCode?: string } & Record<string, unknown>): Promise<PlaceOrderResult> {
    const config = raw.campaignCode ? await shop.configFor(raw.campaignCode) : null
    if (!config || !acceptsOrders(config, today())) return { ok: false, reason: "closed" }

    const parsed = makeOrderSchema(config).safeParse(raw)
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {}
      for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0] ?? "form")] ??= issue.message
      return { ok: false, reason: "invalid", fieldErrors }
    }
    const v = parsed.data
    // A filled honeypot is a bot: pretend success, store nothing.
    if (v.website) return { ok: true, order: { code: makeCode(config.campaignCode, randomInt), campaignCode: config.campaignCode, recipientName: v.recipientName, phone: "", method: v.method, priced: { lines: [], itemCount: 0, subtotal: 0, discount: 0, shipping: 0, total: 0 }, status: "new" } }

    const priced = priceOrder(config, v.lines)
    if (!priced.ok) return { ok: false, reason: "invalid", fieldErrors: { lines: "Đơn hàng chưa hợp lệ, vui lòng kiểm tra lại số lượng" } }

    let address: DeliveryAddress | undefined
    if (v.method === "hand") {
      const province = findProvince(v.provinceCode as string)
      const ward = province ? await findWard(province.code, v.wardCode as string) : undefined
      if (!province || !ward) return { ok: false, reason: "invalid", fieldErrors: { wardCode: "Phường / xã không thuộc tỉnh / thành phố đã chọn" } }
      if (!handDeliveryAvailable(config, province.code)) {
        const names = config.hand.provinceCodes.map((c) => findProvince(c)).filter((p) => p !== undefined).map(provinceLabel).join(", ")
        return { ok: false, reason: "out_of_area", message: `Tình nguyện viên chỉ giao tận tay tại ${names}. Bạn có thể chọn nhận tại sự kiện.` }
      }
      address = { provinceCode: province.code, provinceLabel: provinceLabel(province), wardCode: ward.code, wardName: ward.name, street: v.street as string }
    }

    const order: PlacedOrder = {
      code: makeCode(config.campaignCode, randomInt),
      campaignCode: config.campaignCode,
      recipientName: v.recipientName,
      phone: normalizePhone(v.phone) as string,
      method: v.method,
      address,
      note: v.note || undefined,
      priced: priced.order,
      status: "new",
    }
    await gateway.place(order)
    return { ok: true, order }
  }
}
