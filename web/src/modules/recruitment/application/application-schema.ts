import { z } from "zod"

import { provinceLabels } from "@/shared/address/address"
import { normalizePhone } from "@/shared/lib/phone"

import type { RecruitmentRound } from "../domain/recruitment"

const MIN_BIRTH_YEAR = 1980

export function isPlausibleBirthDate(iso: string, today: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return false
  const d = new Date(`${iso}T00:00:00Z`)
  if (Number.isNaN(d.getTime()) || d.toISOString().slice(0, 10) !== iso) return false
  return iso <= today && Number(iso.slice(0, 4)) >= MIN_BIRTH_YEAR
}

/** One schema for browser and server (the server action validates again). */
export function makeApplicationSchema(round: RecruitmentRound, today: string) {
  const allowed = new Set(round.options.map((o) => o.value))
  return z.object({
    roundId: z.literal(round.id),
    fullName: z.string().trim().min(2, "Vui lòng nhập họ và tên").max(80, "Họ và tên quá dài"),
    birthDate: z.string().refine((v) => isPlausibleBirthDate(v, today), "Ngày sinh chưa hợp lệ"),
    school: z.string().trim().min(2, "Vui lòng nhập trường đang học").max(120, "Tên trường quá dài"),
    province: z.string().refine((p) => provinceLabels.includes(p), "Vui lòng chọn tỉnh / thành phố"),
    phone: z.string().refine((p) => normalizePhone(p) !== null, "Số điện thoại chưa đúng định dạng"),
    email: z.email("Email chưa đúng định dạng"),
    options: z
      .array(z.string())
      .min(1, "Vui lòng chọn ít nhất một lựa chọn")
      .max(round.maxOptions, `Chọn tối đa ${round.maxOptions}`)
      .refine((vals) => vals.every((v) => allowed.has(v)), "Lựa chọn không hợp lệ"),
    motivation: z.string().trim().min(20, "Hãy chia sẻ thêm một chút (ít nhất 20 ký tự)").max(1000, "Tối đa 1000 ký tự"),
    consent: z.literal(true, { error: "Vui lòng đồng ý để tiếp tục" }),
    // Honeypot: accepted here, dropped silently in the use case so bots get no signal.
    website: z.string().optional(),
  })
}

type ApplicationSchema = ReturnType<typeof makeApplicationSchema>

/** What the form holds while it is being filled in. */
export type ApplicationFormFields = Omit<z.input<ApplicationSchema>, "consent" | "roundId" | "options"> & {
  roundId: string
  options: string[]
  consent?: true
}

export type ApplicationValues = z.output<ApplicationSchema>

export const notifySchema = z.object({
  email: z.email("Email chưa đúng định dạng"),
  consent: z.literal(true, { error: "Vui lòng đồng ý để nhận thông báo" }),
  website: z.string().optional(),
})
