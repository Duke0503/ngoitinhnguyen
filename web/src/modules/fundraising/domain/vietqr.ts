// VietQR / NAPAS 247 payload (EMVCo merchant-presented QR, "to account" service).
// Pure functions: the QR *image* is drawn by presentation.

/** CRC-16/CCITT-FALSE (poly 0x1021, init 0xFFFF) as required by EMV QR tag 63. */
export function crc16(input: string): string {
  let crc = 0xffff
  for (let i = 0; i < input.length; i++) {
    crc ^= input.charCodeAt(i) << 8
    for (let bit = 0; bit < 8; bit++) {
      crc = crc & 0x8000 ? ((crc << 1) ^ 0x1021) & 0xffff : (crc << 1) & 0xffff
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0")
}

function tlv(tag: string, value: string): string {
  if (value.length > 99) throw new Error(`VietQR field ${tag} is longer than 99 characters`)
  return `${tag}${String(value.length).padStart(2, "0")}${value}`
}

/** Banks truncate long memos; NAPAS guidance is ≤ 25 ASCII characters. */
export const MEMO_MAX_LENGTH = 25

/** Upper-case ASCII letters, digits, space and hyphen only. */
export function sanitizeMemo(memo: string): string {
  return memo
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/đ/gi, "d")
    .toUpperCase()
    .replace(/[^A-Z0-9 -]/g, "")
    .trim()
    .slice(0, MEMO_MAX_LENGTH)
}

export type VietQrInput = {
  bankBin: string
  accountNumber: string
  /** Integer VND; omit for a static QR where the donor types the amount. */
  amount?: number
  memo?: string
}

export function buildVietQrPayload({ bankBin, accountNumber, amount, memo }: VietQrInput): string {
  if (!/^\d{6}$/.test(bankBin)) throw new Error("bankBin must be 6 digits")
  if (!/^[0-9A-Za-z]{4,19}$/.test(accountNumber)) throw new Error("accountNumber must be 4–19 letters or digits")
  const hasAmount = amount !== undefined && amount > 0
  if (hasAmount && !Number.isInteger(amount)) throw new Error("amount must be an integer number of VND")

  const consumerAccount = tlv("00", bankBin) + tlv("01", accountNumber)
  const cleanMemo = memo ? sanitizeMemo(memo) : ""

  const body =
    tlv("00", "01") + // payload format indicator
    tlv("01", hasAmount ? "12" : "11") + // 12 = dynamic (amount fixed), 11 = static
    tlv("38", tlv("00", "A000000727") + tlv("01", consumerAccount) + tlv("02", "QRIBFTTA")) +
    tlv("53", "704") + // VND
    (hasAmount ? tlv("54", String(amount)) : "") +
    tlv("58", "VN") +
    (cleanMemo ? tlv("62", tlv("08", cleanMemo)) : "") +
    "6304"

  return body + crc16(body)
}
