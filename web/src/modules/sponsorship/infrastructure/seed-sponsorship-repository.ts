import type { SponsorshipRepository } from "../application/sponsorship-queries"
import type { Partner, TierPackage } from "../domain/sponsorship"

// Sources: noQDJcPl (TTYT26 thank-you), om4psd53 (TTYT25), CLYZTW4l (Độc giả tử tế 2024).
const partners: Partner[] = [
  { name: "Cộng đồng Tình nguyện Việt Nam", title: "Bảo trợ pháp lý & truyền thông", relation: "partner", logoSrc: "/images/partners/vnv.jpg", supported: "Đèn Trăng 2 · 2026" },
  { name: "Đồng phục H&P", title: "Nhà tài trợ Đồng", relation: "sponsor", logoSrc: "/images/partners/hp-event-wear.jpg", supported: "Đèn Trăng 2 · 2026" },
  { name: "Nhóm Thiện nguyện Vọng", title: "Nhà tài trợ Gấu bông", relation: "sponsor", logoSrc: "/images/partners/vong.jpg", supported: "Đèn Trăng 2 · 2026" },
  { name: "Vàng Studio", title: "Nhà tài trợ", relation: "sponsor", logoSrc: "/images/partners/vang-studio.jpg", supported: "Đèn Trăng 2025 · Độc giả tử tế 2024" },
  { name: "MXH Duyên dáng Việt Nam", title: "Bảo trợ truyền thông", relation: "partner", supported: "Đèn Trăng 2 · 2026" },
  { name: "Cơm nắm Mei Mei", title: "Độc giả tử tế", relation: "sponsor", supported: "2024" },
  { name: "Mộc An Nhiên", title: "Độc giả tử tế", relation: "sponsor", supported: "2024" },
  { name: "Đoàn xã Ia Băng", title: "Đơn vị phối hợp", relation: "partner", supported: "Đèn Trăng 2025 · Xuân 2026" },
]

// Titles as credited in each campaign's thank-you post (noQDJcPl for TTYT26).
const byCampaign: Record<string, Partner[]> = {
  TTYT26: [
    { name: "Cộng đồng Tình nguyện Việt Nam", title: "Bảo trợ pháp lý & truyền thông", relation: "partner", logoSrc: "/images/partners/vnv.jpg" },
    { name: "Đồng phục H&P", title: "Nhà tài trợ Đồng", relation: "sponsor", logoSrc: "/images/partners/hp-event-wear.jpg" },
    { name: "Nhóm Thiện nguyện Vọng", title: "Nhà tài trợ Gấu bông", relation: "sponsor", logoSrc: "/images/partners/vong.jpg" },
    { name: "MXH Duyên dáng Việt Nam", title: "Bảo trợ truyền thông", relation: "partner" },
  ],
}

// Reference package: the HT10 proposal, pages 23–25 (tiers, 70% cash rule, benefits matrix).
const Y = true
const tierPackage: TierPackage = {
  referenceCampaign: "Hoa Tháng 10 (2026)",
  minCashShare: 0.7,
  tiers: [
    { key: "kim-cuong", name: "Kim cương", amount: 15_000_000 },
    { key: "vang", name: "Vàng", amount: 10_000_000 },
    { key: "bac", name: "Bạc", amount: 8_000_000 },
    { key: "dong", name: "Đồng", amount: 4_000_000 },
    { key: "dong-hanh", name: "Đồng hành", amount: 2_000_000 },
  ],
  benefits: [
    { label: "Sử dụng hình ảnh tại địa bàn để quảng bá cho đơn vị", short: "Dùng hình ảnh tại địa bàn", values: { "kim-cuong": Y, vang: Y, bac: Y, dong: Y, "dong-hanh": Y } },
    { label: "MC xướng danh, nhận hoa và thư cảm ơn trên sân khấu", short: "Xướng danh, hoa và thư cảm ơn trên sân khấu", values: { "kim-cuong": Y, vang: Y, bac: Y, dong: Y, "dong-hanh": Y } },
    { label: "Logo trên tất cả ấn phẩm truyền thông", short: "Logo trên ấn phẩm truyền thông", values: { "kim-cuong": "Bằng logo dự án", vang: "Bằng logo dự án", bac: "Bằng logo dự án", dong: "½ logo dự án", "dong-hanh": "½ logo dự án" } },
    { label: "Tên đơn vị trong bảng vàng của dự án", short: "Tên trong bảng vàng của dự án", values: { "kim-cuong": Y, vang: Y, bac: Y, dong: Y, "dong-hanh": Y } },
    { label: "Bài cảm ơn chung trên fanpage", short: "Bài cảm ơn chung trên fanpage", values: { "kim-cuong": Y, vang: Y, bac: Y, dong: Y, "dong-hanh": Y } },
    { label: "Hỗ trợ tương tác bài trên fanpage đơn vị", short: "Tương tác bài trên fanpage đơn vị", values: { "kim-cuong": "4 bài × 50 likes", vang: "3 bài × 40 likes", bac: "2 bài × 25 likes", dong: "2 bài × 20 likes", "dong-hanh": "1 bài × 20 likes" } },
    { label: "Bài truyền thông cho đơn vị (đơn vị gửi nội dung)", short: "Bài truyền thông cho đơn vị", values: { "kim-cuong": "4 bài", vang: "3 bài", bac: "2 bài", dong: "1 bài", "dong-hanh": null } },
    { label: "Bài cảm ơn riêng trên fanpage Ngòi", short: "Bài cảm ơn riêng trên fanpage Ngòi", values: { "kim-cuong": Y, vang: Y, bac: Y, dong: null, "dong-hanh": null } },
    { label: "Logo trên các phần quà được trao tặng", short: "Logo trên phần quà trao tặng", values: { "kim-cuong": Y, vang: null, bac: null, dong: null, "dong-hanh": null } },
  ],
}

export const seedSponsorshipRepository: SponsorshipRepository = {
  async featuredPartners() {
    return partners
  },
  async forCampaign(code) {
    return byCampaign[code] ?? []
  },
  async tierPackage() {
    return tierPackage
  },
}
