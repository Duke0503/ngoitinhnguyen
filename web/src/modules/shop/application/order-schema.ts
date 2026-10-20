import { z } from "zod"

import { normalizePhone } from "@/shared/lib/phone"

import type { ShopConfig } from "../domain/shop"

/** One schema for the browser and the server action (the server validates again). */
export function makeOrderSchema(config: ShopConfig) {
  const slugs = new Set(config.products.map((p) => p.slug))
  return z
    .object({
      campaignCode: z.literal(config.campaignCode),
      lines: z
        .array(
          z.object({
            slug: z.string().refine((s) => slugs.has(s), "Sản phẩm không hợp lệ"),
            quantity: z.number().int("Số lượng phải là số nguyên").min(0).max(config.maxPerProduct, `Tối đa ${config.maxPerProduct} sản phẩm mỗi loại`),
          })
        )
        .refine((ls) => ls.some((l) => l.quantity > 0), "Vui lòng chọn ít nhất một sản phẩm"),
      recipientName: z.string().trim().min(2, "Vui lòng nhập họ và tên người nhận").max(80, "Họ và tên quá dài"),
      phone: z.string().refine((p) => normalizePhone(p) !== null, "Số điện thoại chưa đúng định dạng"),
      method: z.enum(["hand", "pickup"], { error: "Vui lòng chọn cách nhận hàng" }),
      provinceCode: z.string().optional(),
      wardCode: z.string().optional(),
      street: z.string().trim().max(120, "Địa chỉ quá dài").optional(),
      note: z.string().trim().max(200, "Ghi chú tối đa 200 ký tự").optional(),
      // Honeypot: accepted here and dropped silently in the use case.
      website: z.string().optional(),
    })
    .superRefine((v, ctx) => {
      if (v.method !== "hand") return
      if (!v.provinceCode) ctx.addIssue({ code: "custom", path: ["provinceCode"], message: "Vui lòng chọn tỉnh / thành phố" })
      if (!v.wardCode) ctx.addIssue({ code: "custom", path: ["wardCode"], message: "Vui lòng chọn phường / xã" })
      if (!v.street || v.street.length < 3) ctx.addIssue({ code: "custom", path: ["street"], message: "Vui lòng nhập số nhà, tên đường" })
    })
}

type OrderSchema = ReturnType<typeof makeOrderSchema>

/** What the form holds while it is being filled in. */
export type OrderFormFields = Omit<z.input<OrderSchema>, "method" | "campaignCode" | "lines"> & {
  campaignCode: string
  method: "hand" | "pickup"
  lines: { slug: string; quantity: number }[]
}

export type OrderValues = z.output<OrderSchema>
