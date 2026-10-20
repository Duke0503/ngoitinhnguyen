/** Vietnamese mobile number, with or without spaces/dots and the +84 prefix → national format `0912345678`; null if invalid. */
export function normalizePhone(input: string): string | null {
  const compact = input.replace(/[\s.\-()]/g, "")
  const national = compact.startsWith("+84") ? `0${compact.slice(3)}` : compact.startsWith("84") && compact.length === 11 ? `0${compact.slice(2)}` : compact
  return /^0[35789]\d{8}$/.test(national) ? national : null
}
