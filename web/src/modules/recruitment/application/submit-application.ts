import type { RecruitmentRound } from "../domain/recruitment"
import { acceptsApplications, acceptsProvince } from "../domain/recruitment"
import { normalizePhone } from "@/shared/lib/phone"

import { makeApplicationSchema } from "./application-schema"

export type ApplicationRecord = {
  roundId: string
  fullName: string
  birthDate: string
  school: string
  province: string
  /** National format, e.g. 0912345678. */
  phone: string
  email: string
  options: string[]
  motivation: string
}

/** Port: stub today, the Go API client later (`POST /v1/public/rounds/{slug}/applications`). */
export interface ApplicationGateway {
  submit(application: ApplicationRecord): Promise<{ id: string }>
}

export interface RoundLookup {
  roundById(id: string): Promise<RecruitmentRound | null>
}

export type SubmitApplicationResult =
  | { ok: true; email: string }
  | { ok: false; reason: "closed" }
  | { ok: false; reason: "ineligible"; message: string }
  | { ok: false; reason: "invalid"; fieldErrors: Record<string, string> }

type Deps = { rounds: RoundLookup; gateway: ApplicationGateway; today: () => string }

/** Validates an application and hands it to the gateway; the round's rules decide who may apply. */
export function makeSubmitApplication({ rounds, gateway, today }: Deps) {
  return async function submitApplication(raw: { roundId?: string } & Record<string, unknown>): Promise<SubmitApplicationResult> {
    const round = raw.roundId ? await rounds.roundById(raw.roundId) : null
    const day = today()
    if (!round || !acceptsApplications(round, day)) return { ok: false, reason: "closed" }

    const parsed = makeApplicationSchema(round, day).safeParse(raw)
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {}
      for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0] ?? "form")] ??= issue.message
      return { ok: false, reason: "invalid", fieldErrors }
    }
    const v = parsed.data
    if (v.website) return { ok: true, email: v.email } // honeypot

    if (!acceptsProvince(round, v.province)) {
      return { ok: false, reason: "ineligible", message: `Đợt tuyển này chỉ nhận đơn từ: ${round.eligibleProvinces?.join(", ")}.` }
    }

    await gateway.submit({
      roundId: round.id,
      fullName: v.fullName,
      birthDate: v.birthDate,
      school: v.school,
      province: v.province,
      phone: normalizePhone(v.phone) as string,
      email: v.email,
      options: v.options,
      motivation: v.motivation,
    })
    return { ok: true, email: v.email }
  }
}
