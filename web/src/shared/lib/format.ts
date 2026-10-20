const vnd = new Intl.NumberFormat("vi-VN")

/** 3120000 → "3.120.000đ" (house style: dot separators, no space before đ). */
export function formatVnd(amount: number): string {
  return `${vnd.format(amount)}đ`
}

const pad = (n: number) => String(n).padStart(2, "0")

/** ISO date ("2026-09-21") → parts without timezone shifts. */
function parts(iso: string) {
  const [y, m, d] = iso.split("-").map(Number)
  return { y, m, d }
}

/** "2026-09-21" → "21.09.2026" (the style used across Ngòi's posts). */
export function formatDate(iso: string): string {
  const { y, m, d } = parts(iso)
  return `${pad(d)}.${pad(m)}.${y}`
}

/** "2024-04-20" → "04.2024". */
export function formatMonthYear(iso: string): string {
  const { y, m } = parts(iso)
  return `${pad(m)}.${y}`
}

/** ["2026-10-18","2026-10-20"] → "18 & 20.10.2026"; falls back to full dates across months. */
export function formatDayList(isoDates: string[]): string {
  if (isoDates.length === 0) return ""
  if (isoDates.length === 1) return formatDate(isoDates[0])
  const ps = isoDates.map(parts)
  const sameMonth = ps.every((p) => p.m === ps[0].m && p.y === ps[0].y)
  if (!sameMonth) return isoDates.map(formatDate).join(" & ")
  const days = ps.map((p) => pad(p.d))
  return `${days.slice(0, -1).join(", ")} & ${days.at(-1)}.${pad(ps[0].m)}.${ps[0].y}`
}

/** ["2026-08-21","2026-09-26"] → "21.08 — 26.09.2026"; one day → "21.09.2026". */
export function formatRange(startIso: string, endIso: string): string {
  if (startIso === endIso) return formatDate(startIso)
  const a = parts(startIso)
  const b = parts(endIso)
  if (a.y !== b.y) return `${formatDate(startIso)} — ${formatDate(endIso)}`
  return `${pad(a.d)}.${pad(a.m)} — ${pad(b.d)}.${pad(b.m)}.${b.y}`
}

/** Same range without the year: "21.08 — 07.09". */
export function formatShortRange(startIso: string, endIso: string): string {
  const a = parts(startIso)
  const b = parts(endIso)
  return `${pad(a.d)}.${pad(a.m)} — ${pad(b.d)}.${pad(b.m)}`
}

const countWords = ["Không", "Một", "Hai", "Ba", "Bốn", "Năm", "Sáu", "Bảy", "Tám", "Chín", "Mười"]

/** 4 → "Bốn" (headlines such as “Bốn nơi chúng mình đã đến”); larger numbers stay numeric. */
export function countWord(n: number): string {
  return countWords[n] ?? String(n)
}

/** "25.000đ", "25000" → 25000; empty or non-numeric input → undefined. */
export function parseVnd(text: string): number | undefined {
  const digits = text.replace(/\D/g, "")
  return digits ? Number(digits) : undefined
}

/** Today's date in Vietnam as "2026-10-20", whatever timezone the server or browser runs in. */
export function todayIso(now: Date = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Ho_Chi_Minh", year: "numeric", month: "2-digit", day: "2-digit" }).format(now)
}
