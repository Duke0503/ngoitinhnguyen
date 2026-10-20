import { z } from "zod"

import { MAX_DONATION, MIN_DONATION, PROOF_MAX_BYTES, PROOF_TYPES } from "../domain/donation"
import { isReferenceCode } from "../domain/fund"

const isFile = (v: unknown): v is File => typeof File !== "undefined" && v instanceof File

// HEIC photos often arrive with an empty MIME type, so the extension is accepted too.
const looksLikeAllowedImage = (f: File) =>
  (PROOF_TYPES as readonly string[]).includes(f.type) || /\.(heic|heif|jpe?g|png|webp)$/i.test(f.name)

/**
 * One schema for both ends: the confirm form validates with it in the browser,
 * and the server action validates again (never trust the client).
 */
export function makeDonationSchema(fundCode: string) {
  return z.object({
    referenceCode: z.string().refine((c) => isReferenceCode(c, fundCode), "Mã tham chiếu không hợp lệ, vui lòng tải lại trang"),
    donorName: z.string().trim().min(2, "Vui lòng nhập họ và tên").max(80, "Họ và tên quá dài"),
    amount: z
      .number({ error: "Vui lòng nhập số tiền đã chuyển" })
      .int("Số tiền phải là số nguyên")
      .min(MIN_DONATION, "Số tiền tối thiểu là 1.000đ")
      .max(MAX_DONATION, "Số tiền vượt quá giới hạn"),
    email: z.union([z.literal(""), z.email("Email chưa đúng định dạng")]).optional(),
    message: z.string().trim().max(300, "Lời nhắn tối đa 300 ký tự").optional(),
    proof: z
      .custom<File>(isFile, "Vui lòng tải ảnh minh chứng chuyển khoản")
      .refine((f) => !isFile(f) || looksLikeAllowedImage(f), "Chỉ nhận ảnh JPG, PNG, WebP hoặc HEIC")
      .refine((f) => !isFile(f) || f.size <= PROOF_MAX_BYTES, "Ảnh vượt quá 10MB"),
    isPublic: z.boolean(),
    consent: z.literal(true, { error: "Vui lòng đồng ý để tiếp tục" }),
    // Honeypot: real people never see or fill this field. It is accepted here and dropped
    // silently in the use case, so a bot gets no validation error that reveals the trap.
    website: z.string().optional(),
  })
}

type DonationSchema = ReturnType<typeof makeDonationSchema>

/** What the form holds while it is being filled in: some required fields start empty. */
export type DonationFormFields = Omit<z.input<DonationSchema>, "amount" | "proof" | "consent"> & {
  amount?: number
  proof?: File
  consent?: true
}

/** A submission that passed validation. */
export type DonationValues = z.output<DonationSchema>
