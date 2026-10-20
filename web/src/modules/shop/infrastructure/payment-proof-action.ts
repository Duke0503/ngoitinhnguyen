"use server"

import { makeSubmitPaymentProof, type SubmitPaymentProofResult } from "../application/payment-proof"

// Placeholder until the Go API exists: validates the proof but PERSISTS NOTHING.
const submitPaymentProof = makeSubmitPaymentProof({ gateway: { async submit() {} } })

const text = (v: FormDataEntryValue | null) => (typeof v === "string" ? v : undefined)

/** Driving adapter for the “Tôi đã chuyển khoản” form; validation runs again inside the use case. */
export async function submitPaymentProofAction(formData: FormData): Promise<SubmitPaymentProofResult> {
  return submitPaymentProof(text(formData.get("campaignCode")) ?? "", {
    orderCode: text(formData.get("orderCode")),
    message: text(formData.get("message")),
    proof: formData.get("proof") ?? undefined,
    website: text(formData.get("website")),
  })
}
