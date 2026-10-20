// A donor's "Tôi đã chuyển khoản" submission: it stays `pending` until finance confirms it.

export const MIN_DONATION = 1_000
export const MAX_DONATION = 500_000_000

export type DonationStatus = "pending" | "confirmed" | "rejected"

export type ProofImage = { name: string; type: string; size: number }

export type DonationSubmission = {
  fundCode: string
  referenceCode: string
  donorName: string
  amount: number
  email?: string
  message?: string
  /** False → shown as “Ẩn danh” in the public donor list. */
  isPublic: boolean
  proof: ProofImage
}

export const PROOF_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"] as const
export const PROOF_MAX_BYTES = 10 * 1024 * 1024

export type SubmittedDonation = {
  referenceCode: string
  status: "pending"
}
