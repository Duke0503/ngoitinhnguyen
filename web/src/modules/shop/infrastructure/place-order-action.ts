"use server"

import { cryptoRandomInt } from "@/shared/lib/reference-code"
import { todayIso } from "@/shared/lib/format"

import { makePlaceOrder, type PlaceOrderResult } from "../application/place-order"
import { seedShopRepository } from "./seed-shop-repository"
import { stubOrderGateway } from "./stub-order-gateway"

const placeOrder = makePlaceOrder({ shop: seedShopRepository, gateway: stubOrderGateway, today: () => todayIso(), randomInt: cryptoRandomInt })

const text = (v: FormDataEntryValue | null) => (typeof v === "string" ? v : undefined)

function parseLines(raw: string | undefined): unknown {
  try {
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

/** Driving adapter for the order form. Validation and pricing run again inside the use case. */
export async function placeOrderAction(formData: FormData): Promise<PlaceOrderResult> {
  return placeOrder({
    campaignCode: text(formData.get("campaignCode")),
    lines: parseLines(text(formData.get("lines"))),
    recipientName: text(formData.get("recipientName")),
    phone: text(formData.get("phone")),
    method: text(formData.get("method")),
    provinceCode: text(formData.get("provinceCode")) || undefined,
    wardCode: text(formData.get("wardCode")) || undefined,
    street: text(formData.get("street")),
    note: text(formData.get("note")),
    website: text(formData.get("website")),
  })
}
