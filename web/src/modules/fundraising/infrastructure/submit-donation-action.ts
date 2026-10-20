"use server"

import { makeSubmitDonation, type SubmitDonationResult } from "../application/submit-donation"
import { seedFundraisingRepository } from "./seed-fundraising-repository"
import { stubDonationGateway } from "./stub-donation-gateway"

const submitDonation = makeSubmitDonation({ funds: seedFundraisingRepository, gateway: stubDonationGateway })

const text = (v: FormDataEntryValue | null) => (typeof v === "string" ? v : undefined)

/**
 * Driving adapter: the confirm form posts here. Validation happens again inside the
 * use case, so nothing the browser sends is trusted.
 */
export async function submitDonationAction(formData: FormData): Promise<SubmitDonationResult> {
  const amount = text(formData.get("amount"))
  return submitDonation(text(formData.get("fundCode")) ?? "", {
    referenceCode: text(formData.get("referenceCode")),
    donorName: text(formData.get("donorName")),
    amount: amount ? Number(amount) : undefined,
    email: text(formData.get("email")),
    message: text(formData.get("message")),
    proof: formData.get("proof") ?? undefined,
    isPublic: formData.get("isPublic") === "true",
    consent: formData.get("consent") === "true",
    website: text(formData.get("website")),
  })
}
