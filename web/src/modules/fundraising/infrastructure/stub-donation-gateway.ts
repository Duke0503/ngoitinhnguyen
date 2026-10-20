import type { DonationGateway } from "../application/submit-donation"

/**
 * Placeholder until the Go API exists: accepts the donation and reports it as
 * pending, but PERSISTS NOTHING. Swap for an HTTP client of
 * `POST /v1/public/funds/{id}/donations` (multipart, with the proof image).
 */
export const stubDonationGateway: DonationGateway = {
  async submit(donation) {
    return { referenceCode: donation.referenceCode, status: "pending" }
  },
}
