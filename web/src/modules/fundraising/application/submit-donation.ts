import { makeDonationSchema } from "./donation-schema"
import type { DonationSubmission, SubmittedDonation } from "../domain/donation"
import type { Fund } from "../domain/fund"

/** Port: stub today, the Go API client later (`POST /v1/public/funds/{id}/donations`). */
export interface DonationGateway {
  submit(donation: DonationSubmission): Promise<SubmittedDonation>
}

export interface FundLookup {
  fundFor(campaignCode: string): Promise<Fund | null>
}

export type SubmitDonationResult =
  | { ok: true; donation: SubmittedDonation }
  | { ok: false; reason: "invalid"; fieldErrors: Record<string, string> }
  | { ok: false; reason: "closed" }

type Deps = { funds: FundLookup; gateway: DonationGateway }

/** Validates a donor's confirmation and hands a `pending` donation to the gateway. */
export function makeSubmitDonation({ funds, gateway }: Deps) {
  return async function submitDonation(fundCode: string, raw: unknown): Promise<SubmitDonationResult> {
    const fund = await funds.fundFor(fundCode)
    if (!fund || !fund.open) return { ok: false, reason: "closed" }

    const parsed = makeDonationSchema(fund.campaignCode).safeParse(raw)
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {}
      for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0] ?? "form")] ??= issue.message
      return { ok: false, reason: "invalid", fieldErrors }
    }

    const v = parsed.data
    // A filled honeypot is a bot: pretend success so it learns nothing.
    if (v.website) return { ok: true, donation: { referenceCode: v.referenceCode, status: "pending" } }

    const donation = await gateway.submit({
      fundCode: fund.campaignCode,
      referenceCode: v.referenceCode,
      donorName: v.donorName,
      amount: v.amount,
      email: v.email || undefined,
      message: v.message || undefined,
      isPublic: v.isPublic,
      proof: { name: v.proof.name, type: v.proof.type, size: v.proof.size },
    })
    return { ok: true, donation }
  }
}
