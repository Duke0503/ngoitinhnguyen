import { describe, expect, it } from "vitest"

import { classify, cleanBody, cleanTitle, excerptOf, parsePost, parseTag, redactPhones, sentenceCase, slugify, vietnamDate } from "./clean"

describe("titles", () => {
  it("turns ALL-CAPS into sentence case, keeping acronyms and proper nouns", () => {
    expect(sentenceCase("TRUNG THU YÊU THƯƠNG 2026 - ĐÈN TRĂNG 2")).toBe("Trung Thu Yêu Thương 2026 - Đèn Trăng 2")
    expect(sentenceCase("TUYỂN TNV VÀ CTV TẠI TP. HỒ CHÍ MINH")).toBe("Tuyển TNV và CTV tại TP. Hồ Chí Minh")
  })
  it("leaves mixed-case titles alone", () => {
    expect(sentenceCase("Ngòi đã không phải là dự án")).toBe("Ngòi đã không phải là dự án")
  })
  it("normalises Title Case and drops location prefixes", () => {
    expect(cleanTitle("HCM | Thiềng Liềng Đón Ngòi Và Mùa Trăng")).toBe("Thiềng Liềng đón Ngòi và mùa trăng")
    expect(cleanTitle("Gia Lai - Trao Tay 60 Suất Quà Tại Ia Băng")).toBe("Gia Lai - trao tay 60 suất quà tại Ia Băng")
  })
  it("strips [TAG] and PREFIX | noise", () => {
    expect(cleanTitle("[HT10] CHỈ CÒN 1 NGÀY GÓP QUỸ “HOA THÁNG 10”")).toBe("Chỉ còn 1 ngày góp quỹ “Hoa Tháng 10”")
    expect(cleanTitle("NGÒI | GIỚI THIỆU LOGO CHÍNH THỨC")).toBe("Giới thiệu logo chính thức")
    expect(cleanTitle("NTN | KẾT QUẢ ĐỢT TUYỂN")).toBe("Kết quả đợt tuyển")
  })
  it("slugifies Vietnamese into short ASCII", () => {
    expect(slugify("Đội Hình Xuân Gia Lai — Lễ tổng kết")).toBe("doi-hinh-xuan-gia-lai-le-tong-ket")
    expect(slugify("a".repeat(30) + " " + "b".repeat(50)).length).toBeLessThanOrEqual(72)
  })
})

describe("classification", () => {
  it("trusts the post's own [TAG]", () => {
    expect(classify("TTYT26", "x", "2026-09-01")).toEqual({ topic: "Đèn Trăng 2", campaignSlug: "trung-thu-yeu-thuong-2026-den-trang-2" })
    expect(classify("TTYT25-RECAP", "x", "2025-10-01").campaignSlug).toBe("trung-thu-yeu-thuong-2025-den-trang")
    expect(classify("HTCNVS", "x", "2026-06-01")).toEqual({ topic: "Hành trình của những vì sao" })
  })
  it("falls back to title keywords for untagged posts", () => {
    expect(classify(null, "ĐGTT | Nguyện cùng Ngòi", "2024-06-04").topic).toBe("Độc giả tử tế")
    expect(classify(null, "CT01/NHDS: Trang sách nhỏ", "2024-05-05").campaignSlug).toBe("trang-sach-nho-gui-cho-em-2024")
    expect(classify(null, "Trung Thu Yêu Thương 2026 - Đèn Trăng 2", "2026-08-22").campaignSlug).toBe("trung-thu-yeu-thuong-2026-den-trang-2")
    expect(classify(null, "Trung Thu Yêu Thương 2025 - Đèn Trăng", "2025-09-21").campaignSlug).toBe("trung-thu-yeu-thuong-2025-den-trang")
    expect(classify(null, "Giới thiệu logo chính thức", "2024-08-12").topic).toBe("Giới thiệu Ngòi")
    expect(classify(null, "Điều gì đó khác", "2024-02-01").topic).toBe("Tin Ngòi")
  })
  it("reads the tag from the first line", () => {
    expect(parseTag("[XYT26] ĐỘI HÌNH")).toBe("XYT26")
    expect(parseTag("Không có thẻ")).toBeNull()
  })
})

describe("privacy and boilerplate", () => {
  it("removes personal phone numbers but keeps names", () => {
    expect(redactPhones("Tại TP.HCM: 0332982691 (Tú Quyên) | 0353943793 (Ngọc Thảo)")).toBe("Tại TP.HCM: (Tú Quyên) | (Ngọc Thảo)")
    expect(redactPhones("Liên hệ +84 912 345 678 nhé")).toBe("Liên hệ nhé")
    expect(redactPhones("STK: 8883309229 - BIDV")).toContain("8883309229")
  })
  it("drops the repeated contact footer, hashtags and design credits", () => {
    const blocks = cleanBody(
      [" Nội dung chính của bài viết.", "_____________", " Mọi thông tin chi tiết xin vui lòng liên hệ:", " Fanpage: Ngòi", " Email: a@b.vn", " Liên hệ: 0961494092 (Tuyết)", "#NgoiTinhNguyen #tinhnguyen"],
      "[X] Tiêu đề"
    )
    expect(blocks).toEqual([{ type: "p", text: "Nội dung chính của bài viết." }])
  })
  it("keeps section breaks between content, not at the ends", () => {
    const blocks = cleanBody(["____", "Một", "____", "____", "Hai", "____"], "t")
    expect(blocks.map((b) => b.type)).toEqual(["p", "hr", "p"])
  })
})

describe("excerpts", () => {
  it("cuts at a sentence when one is near, else at a word", () => {
    const long = "Câu đầu tiên khá dài và đầy đủ ý nghĩa cho bạn đọc. " + "từ ".repeat(80)
    expect(excerptOf([{ type: "p", text: long }], 120)).toBe("Câu đầu tiên khá dài và đầy đủ ý nghĩa cho bạn đọc.")
    expect(excerptOf([{ type: "p", text: "từ ".repeat(80) }], 60)?.endsWith("…")).toBe(true)
  })
  it("skips short lead lines", () => {
    expect(excerptOf([{ type: "p", text: "Ngắn" }])).toBeUndefined()
  })
})

describe("parsePost", () => {
  const md = `---
post_id: abc123
date: 2026-09-20T17:30:00.000Z
campaign: OTHER
---

# [TTYT26] HÀ NỘI VIẾT NÊN HÀNH TRÌNH

*21/09/2026, 00:30:00* — 12 reactions · 1 comments · 0 shares

[TTYT26] HÀ NỘI VIẾT NÊN HÀNH TRÌNH
 Chuyến đi đầu tiên của đoàn Hà Nội tới chùa Thiên Hương, phường Thượng Hồng.

## Images

![Image 1](../../media/abc/01.jpg)
![Image 2](../../media/abc/02.jpg)
`
  it("parses date (Vietnam time), title, body and images", () => {
    const p = parsePost(md)
    expect(p.id).toBe("abc123")
    expect(p.date).toBe("2026-09-21")
    expect(p.title).toBe("Hà Nội viết nên hành trình")
    expect(parseTag(p.rawFirstLine)).toBe("TTYT26")
    expect(p.blocks).toEqual([{ type: "p", text: "Chuyến đi đầu tiên của đoàn Hà Nội tới chùa Thiên Hương, phường Thượng Hồng." }])
    expect(p.images).toEqual(["../../media/abc/01.jpg", "../../media/abc/02.jpg"])
  })
  it("converts a late-evening UTC instant to the next Vietnam day", () => {
    expect(vietnamDate("2026-09-20T17:30:00.000Z")).toBe("2026-09-21")
    expect(vietnamDate("2026-09-20T16:59:00.000Z")).toBe("2026-09-20")
  })
})
