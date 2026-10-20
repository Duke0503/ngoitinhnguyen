import { z } from "zod"

import { isCode } from "@/shared/lib/reference-code"

export const PROOF_MAX_BYTES = 10 * 1024 * 1024
const PROOF_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"]

const isFile = (v: unknown): v is File => typeof File !== "undefined" && v instanceof File
// HEIC photos often arrive with an empty MIME type, so the extension is accepted too.
const allowedImage = (f: File) => PROOF_TYPES.includes(f.type) || /\.(heic|heif|jpe?g|png|webp)$/i.test(f.name)

/** One schema for both ends: the form validates with it, and the server action validates again. */
export function makePaymentProofSchema(campaignCode: string) {
  return z.object({
    orderCode: z.string().refine((c) => isCode(c, campaignCode), "Mã đơn không hợp lệ"),
    message: z.string().trim().max(300, "Lời nhắn tối đa 300 ký tự").optional(),
    proof: z
      .custom<File>(isFile, "Vui lòng tải ảnh minh chứng chuyển khoản")
      .refine((f) => !isFile(f) || allowedImage(f), "Chỉ nhận ảnh JPG, PNG, WebP hoặc HEIC")
      .refine((f) => !isFile(f) || f.size <= PROOF_MAX_BYTES, "Ảnh vượt quá 10MB"),
    /** Honeypot: accepted and dropped silently so a bot learns nothing. */
    website: z.string().optional(),
  })
}

export type PaymentProofValues = z.output<ReturnType<typeof makePaymentProofSchema>>

export type PaymentProof = { orderCode: string; message?: string; proof: { name: string; type: string; size: number } }

/** Port: stub today, the Go API client later (`POST /v1/public/orders/{code}/payment-proof`). */
export interface PaymentProofGateway {
  submit(proof: PaymentProof): Promise<void>
}

export type SubmitPaymentProofResult = { ok: true } | { ok: false; fieldErrors: Record<string, string> }

export function makeSubmitPaymentProof(deps: { gateway: PaymentProofGateway }) {
  return async function submitPaymentProof(campaignCode: string, input: unknown): Promise<SubmitPaymentProofResult> {
    const parsed = makePaymentProofSchema(campaignCode).safeParse(input)
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {}
      for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0] ?? "form")] ??= issue.message
      return { ok: false, fieldErrors }
    }
    const v = parsed.data
    if (v.website) return { ok: true }
    await deps.gateway.submit({ orderCode: v.orderCode, message: v.message || undefined, proof: { name: v.proof.name, type: v.proof.type, size: v.proof.size } })
    return { ok: true }
  }
}
