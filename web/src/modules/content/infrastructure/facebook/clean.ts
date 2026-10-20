// Turns a crawled Facebook post (markdown) into clean site content. Pure functions, no imports, so the
// import script (scripts/import-posts.mjs) and the unit tests can both load this file directly.

export type Block = { type: "p"; text: string } | { type: "hr" }

export type ParsedPost = {
  id: string
  /** Vietnam-local date, "2026-09-21". */
  date: string
  rawFirstLine: string
  title: string
  blocks: Block[]
  /** Image paths relative to the post file, in order. */
  images: string[]
}

export type Classification = { topic: string; campaignSlug?: string }

export const slugify = (s: string, max = 72): string => {
  const base = s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/đ/gi, "d")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
  if (base.length <= max) return base
  const cut = base.slice(0, max)
  return cut.slice(0, Math.max(cut.lastIndexOf("-"), 20))
}

/** Date in Vietnam from an ISO instant: "2026-09-20T17:30:00Z" → "2026-09-21". */
export const vietnamDate = (iso: string): string =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Ho_Chi_Minh", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(iso))

const KEEP_UPPER = ["TNV", "CTV", "BTC", "HCM", "TP", "HT10", "TTYT26", "TTYT25", "XYT26", "CT01", "NHDS", "HTTT", "THPT", "THCS", "UBND", "VTV", "NTN"]

// Proper nouns restored after lower-casing an ALL-CAPS title.
const PROPER = [
  "Ngòi Tình Nguyện - Viết Cho Em", "Ngòi Tình Nguyện", "Ngòi Bút Nhỏ - Trà Thư Quán", "Ngòi", "Viết Cho Em",
  "Hà Nội", "Gia Lai", "TP. Hồ Chí Minh", "TP. HCM", "Hồ Chí Minh", "Việt Nam", "Thiềng Liềng", "Ia Băng", "Kinh Hiến", "Thành Phố Bác",
  "Mái Ấm Vị Hoàng", "Mái Ấm Thánh Tâm", "Chùa Thiên Hương", "Bệnh Viện K",
  "Trung Thu Yêu Thương", "Xuân Yêu Thương", "Xuân Tình Nguyện", "Đèn Trăng", "Hoa Tháng 10", "Mùa Trăng Yêu Thương", "Mùa Trăng Trao Tay",
  "Hành Trình Của Những Vì Sao", "Độc Giả Tử Tế", "Nguyện Cùng Ngòi", "Trang Sách Nhỏ", "Ngày Phụ Nữ Việt Nam", "Rung Chuông Vàng", "Kết Vòng Đan Tâm",
  "Đội Hình Xuân", "Adơk", "Lê Lợi", "Nguyễn Thị Minh Khai", "Trường Tiểu Học", "Trường THCS", "Trường THPT", "Gia Lai", "Kinh Hiến",
]

const isMostlyUpper = (s: string) => {
  const letters = [...s].filter((c) => c.toLowerCase() !== c.toUpperCase())
  return letters.length > 0 && letters.filter((c) => c === c.toUpperCase()).length / letters.length > 0.6
}

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

/** Vietnamese headlines use sentence case: “CHỈ CÒN 1 NGÀY GÓP QUỸ HOA THÁNG 10” → “Chỉ còn 1 ngày góp quỹ Hoa Tháng 10”. Mixed-case titles are kept. */
export function sentenceCase(s: string): string {
  if (!isMostlyUpper(s)) return capitalize(s)
  let out = s.toLowerCase()
  for (const k of KEEP_UPPER) out = out.replace(new RegExp(`(?<![\\p{L}\\d])${k.toLowerCase()}(?![\\p{L}\\d])`, "gu"), k)
  for (const p of PROPER) out = out.replace(new RegExp(`(?<![\\p{L}\\d])${escapeRegExp(p.toLowerCase())}(?![\\p{L}\\d])`, "giu"), p)
  return capitalize(out)
}

const capitalize = (s: string) => s.replace(/^(\P{L}*)(\p{L})/u, (_, pre: string, ch: string) => pre + ch.toUpperCase())

/** Heavily-cased titles (Title Case written by the page) are normalised too, so the list reads evenly. */
const normaliseTitleCase = (s: string) => {
  const words = s.split(/\s+/).filter((w) => /\p{L}/u.test(w))
  const capped = words.filter((w) => /^\P{L}*\p{Lu}/u.test(w)).length
  return words.length > 3 && capped / words.length > 0.7 ? sentenceCase(s.toUpperCase()) : s
}

const TITLE_PREFIXES = /^(?:NGÒI|NTN|ĐGTT|HCM|HN|GL|TP\.?\s*HCM|Ngòi Tình Nguyện\s*-\s*Viết cho Em)\s*\|\s*/i

/** Strips the `[TAG]` and `PREFIX |` noise, then fixes casing. */
export function cleanTitle(raw: string): string {
  const noTag = raw.replace(/^\s*\[[^\]]+\]\s*/, "").trim()
  const noPrefix = noTag.replace(TITLE_PREFIXES, "").replace(/^(?:CT01\/NHDS)\s*:\s*/i, "")
  const flat = noPrefix.replace(/\s+/g, " ").replace(/\|\s*$/, "").trim()
  return normaliseTitleCase(flat)
}

export const parseTag = (firstLine: string): string | null => firstLine.match(/^\s*\[([^\]]+)\]/)?.[1].trim() ?? null

const CAMPAIGN_BY_TAG: Record<string, string> = {
  XYT26: "xuan-yeu-thuong-2026",
  XYT2026: "xuan-yeu-thuong-2026",
  TTYT25: "trung-thu-yeu-thuong-2025-den-trang",
  "TTYT25-RECAP": "trung-thu-yeu-thuong-2025-den-trang",
  "TTYT 2025": "trung-thu-yeu-thuong-2025-den-trang",
  TTYT26: "trung-thu-yeu-thuong-2026-den-trang-2",
  "TTYT26-RECAP": "trung-thu-yeu-thuong-2026-den-trang-2",
  HT10: "hoa-thang-10-2026",
}

const TOPIC_BY_TAG: Record<string, string> = {
  HTCNVS: "Hành trình của những vì sao",
  "NTN 26 - 27": "Hành trình của những vì sao",
  "NTN 26-27": "Hành trình của những vì sao",
  "NGÒI 26-27": "Ban tổ chức",
  "NGÒI 25-26": "Ban tổ chức",
  HTTT: "Hoạt động",
  "CHÍNH THỨC": "Thông báo",
}

export const CAMPAIGN_TOPIC: Record<string, string> = {
  "xuan-yeu-thuong-2026": "Xuân Yêu Thương",
  "trung-thu-yeu-thuong-2025-den-trang": "Đèn Trăng",
  "trung-thu-yeu-thuong-2026-den-trang-2": "Đèn Trăng 2",
  "hoa-thang-10-2026": "Hoa Tháng 10",
  "trang-sach-nho-gui-cho-em-2024": "Trang sách nhỏ",
}

const has = (s: string, ...words: string[]) => words.some((w) => s.includes(w))

/**
 * Decides a post's campaign/topic. The `[TAG]` in the post's own title is trusted; the crawler's `campaign`
 * field is not (it mislabels many posts). Untagged posts fall back to date and title keywords.
 */
export function classify(tag: string | null, title: string, date: string): Classification {
  if (tag && CAMPAIGN_BY_TAG[tag]) return { topic: CAMPAIGN_TOPIC[CAMPAIGN_BY_TAG[tag]], campaignSlug: CAMPAIGN_BY_TAG[tag] }
  if (tag && TOPIC_BY_TAG[tag]) return { topic: TOPIC_BY_TAG[tag] }

  const t = title.toLowerCase()
  const byCampaign = (slug: string): Classification => ({ topic: CAMPAIGN_TOPIC[slug], campaignSlug: slug })
  if (has(t, "ct01", "trang sách nhỏ")) return byCampaign("trang-sach-nho-gui-cho-em-2024")
  if (has(t, "đèn trăng 2")) return byCampaign("trung-thu-yeu-thuong-2026-den-trang-2")
  if (has(t, "trung thu yêu thương 2026")) return byCampaign("trung-thu-yeu-thuong-2026-den-trang-2")
  if (has(t, "đèn trăng") || has(t, "trung thu yêu thương 2025")) return byCampaign("trung-thu-yeu-thuong-2025-den-trang")
  if (has(t, "xuân tình nguyện", "xuân yêu thương", "khoác áo mới")) return byCampaign("xuan-yeu-thuong-2026")
  if (has(t, "hoa tháng 10")) return byCampaign("hoa-thang-10-2026")
  if (has(t, "độc giả tử tế", "đgtt")) return { topic: "Độc giả tử tế" }
  if (has(t, "tuyển", "đồng đội", "đợt tuyển")) return { topic: "Tuyển thành viên" }
  if (has(t, "logo", "debut", "btc", "hướng tới 4 năm", "nụ cười", "ngòi đã không phải")) return { topic: "Giới thiệu Ngòi" }
  if (date.startsWith("2024-08") && has(t, "httt")) return { topic: "Hoạt động" }
  return { topic: "Tin Ngòi" }
}

const PHONE = /(?<![\d])(?:\+?84|0)(?:[\s.\-]?\d){8,10}(?![\d])/g

/** Personal phone numbers are not published on the website. */
export function redactPhones(text: string): string {
  return text
    .replace(PHONE, "")
    .replace(/\(\s*\)/g, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([,.;:)])/g, "$1")
    .replace(/([(:])\s+/g, "$1 ")
    .trim()
}

const FOOTER_START = /^\s*Mọi thông tin chi tiết/i
const FOOTER_LINE = /^\s*(Fanpage|Email|Liên hệ|SĐT|Hotline|Zalo)\s*:/i
const SEPARATOR = /^[\s_\-–—=*]{4,}$/
const HASHTAGS = /^(\s*#\S+)+\s*$/

/** Body text → paragraphs and section breaks, minus title echo, contact footers, hashtags and phone numbers. */
export function cleanBody(lines: string[], titleRaw: string): Block[] {
  const blocks: Block[] = []
  let footer = false
  const norm = (s: string) => s.replace(/\s+/g, " ").trim().toLowerCase()
  for (const raw of lines) {
    const line = raw.trim()
    if (!line) continue
    if (SEPARATOR.test(line)) {
      if (blocks.length && blocks.at(-1)?.type !== "hr") blocks.push({ type: "hr" })
      continue
    }
    if (norm(line) === norm(titleRaw)) continue
    if (FOOTER_START.test(line)) {
      footer = true
      continue
    }
    if (footer && (FOOTER_LINE.test(line) || HASHTAGS.test(line) || /^[|\-\s]*(Thiết kế|Nội dung)\s*:/i.test(line))) continue
    if (HASHTAGS.test(line)) continue
    if (/^\|?\s*[-–]\s*(Thiết kế|Nội dung)\s*:/i.test(line)) continue
    const text = redactPhones(line.replace(/^[|]\s*/, ""))
    if (text) blocks.push({ type: "p", text })
  }
  while (blocks.at(-1)?.type === "hr") blocks.pop()
  while (blocks[0]?.type === "hr") blocks.shift()
  return blocks
}

const wordCount = (blocks: Block[]) => blocks.reduce((n, b) => n + (b.type === "p" ? b.text.split(/\s+/).length : 0), 0)
export { wordCount }

/** First paragraph, cut at a sentence or word boundary near `max` characters. */
export function excerptOf(blocks: Block[], max = 180): string | undefined {
  const upperShare = (t: string) => {
    const letters = [...t].filter((c) => c.toLowerCase() !== c.toUpperCase())
    return letters.length ? letters.filter((c) => c === c.toUpperCase()).length / letters.length : 0
  }
  const first = blocks.find(
    (b) => b.type === "p" && b.text.length > 60 && upperShare(b.text) < 0.5 && !/https?:|^(Link|Đối tượng|Hạn|Thời gian|Địa điểm|Địa bàn)\b/i.test(b.text)
  )
  if (!first || first.type !== "p") return undefined
  const text = first.text.replace(/\s+/g, " ")
  if (text.length <= max) return text
  const cut = text.slice(0, max)
  const sentence = cut.lastIndexOf(". ")
  if (sentence >= 30) return cut.slice(0, sentence + 1)
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:\-–—\s]+$/, "")}…`
}

/** The crawler cuts the H1 at ~85 characters; the post's first line carries the whole title. */
const fullTitle = (h1: string, firstLine: string) => {
  const strip = (x: string) => x.replace(/^\s*\[[^\]]+\]\s*/, "").replace(/\s+/g, " ").trim()
  const a = strip(h1)
  const b = strip(firstLine)
  return b.length > a.length && b.toLowerCase().startsWith(a.toLowerCase().slice(0, Math.max(a.length - 2, 10))) ? b : a
}

/** Parses one crawled post file. */
export function parsePost(markdown: string): ParsedPost {
  const [, front, rest] = markdown.split(/^---$/m)
  const meta = (key: string) => front.match(new RegExp(`^${key}:\\s*(.*)$`, "m"))?.[1].trim() ?? ""
  const afterImages = rest.split(/^## Images\s*$/m)
  const bodyPart = afterImages[0]
  const images = [...(afterImages[1] ?? "").matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)].map((m) => m[1])
  const lines = bodyPart.split("\n")
  const h1 = lines.findIndex((l) => l.startsWith("# "))
  const titleRaw = h1 >= 0 ? lines[h1].slice(2).trim() : ""
  const content = lines.slice(h1 + 1).filter((l) => !/^\*[^*]+\*\s*—\s*\d+ reactions/.test(l.trim()))
  const firstLine = content.find((l) => l.trim())?.trim() ?? titleRaw
  return {
    id: meta("post_id"),
    date: vietnamDate(meta("date")),
    rawFirstLine: firstLine,
    title: cleanTitle(fullTitle(titleRaw, firstLine)),
    blocks: cleanBody(content, firstLine),
    images,
  }
}
