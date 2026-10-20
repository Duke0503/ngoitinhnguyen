import type { CampaignRepository } from "../application/campaign-queries"
import type { Campaign } from "../domain/campaign"

// Seed data until the Go API exists. Every figure is taken from the fanpage
// wrap-up posts (see docs/BUSINESS.md §2, post ids in comments).
const campaigns: Campaign[] = [
  {
    slug: "trang-sach-nho-gui-cho-em-2024",
    code: "CT01",
    title: "Trang sách nhỏ — Gửi cho em",
    series: "doc-sach",
    status: "closed",
    startsOn: "2024-04-20",
    endsOn: "2024-04-20",
    onSiteDates: ["2024-04-20"],
    locations: [{ name: "THCS Lê Lợi, Đak Đoa", province: "Gia Lai" }],
    results: [{ metric: "books", quantity: 10 }], // ikGoTkbl
    highlight: "Ngày hội đọc sách và “Trạm gửi tri thức”",
    cover: { src: "/images/photos/ct01-reading-day.jpg", alt: "Ngày hội đọc sách tại THCS Lê Lợi, Gia Lai" },
  },
  {
    slug: "trung-thu-yeu-thuong-2025-den-trang",
    code: "TTYT25",
    title: "Trung Thu Yêu Thương: Đèn Trăng",
    series: "trung-thu",
    slogan: "Gói đèn mơ ước — Ngòi dệt mùa trăng",
    status: "closed",
    startsOn: "2025-09-21",
    endsOn: "2025-10-10",
    onSiteDates: ["2025-10-04", "2025-10-05"],
    locations: [
      { name: "Xã Ia Băng", province: "Gia Lai" },
      { name: "Mái ấm Vị Hoàng", province: "TP.HCM" },
      { name: "Phố Hà Nội", province: "Hà Nội" },
    ],
    results: [
      { metric: "gifts", quantity: 60 }, // zYw8T77l
      { metric: "gifts", quantity: 100 }, // om4psd53
      { metric: "gifts", quantity: 100 }, // omg2xjl9
      { metric: "gifts", quantity: 75 }, // H9S7UGZl
    ],
    highlight: "Hơn 330 phần quà trao tận tay",
    cover: { src: "/images/photos/ttyt25-hanoi-street.jpg", alt: "Trao quà Trung thu cho người lao động trên phố Hà Nội" },
  },
  {
    slug: "xuan-yeu-thuong-2026",
    code: "XYT26",
    title: "Xuân Yêu Thương",
    series: "xuan",
    status: "closed",
    startsOn: "2025-12-20",
    endsOn: "2026-02-10",
    onSiteDates: ["2026-02-01", "2026-02-02", "2026-02-03", "2026-02-04"],
    locations: [
      { name: "Xã Ia Băng", province: "Gia Lai" },
      { name: "Xã Triệu Việt Vương", province: "Hưng Yên" },
      { name: "Phường Thanh Liệt", province: "Hà Nội" },
      { name: "Phường Xóm Chiếu", province: "TP.HCM" },
    ],
    results: [
      { metric: "gifts", quantity: 30 }, // oma16lr8
      { metric: "gifts", quantity: 21 }, // sXbuqfql (5 + 16)
      { metric: "scholarships", quantity: 30 }, // dGvoXKEl: 10 per school, 3 schools
    ],
    highlight: "3 đội hình, 35 tình nguyện viên",
    cover: { src: "/images/photos/xyt26-banh-chung.jpg", alt: "Tình nguyện viên gói bánh chưng cùng người dân" },
  },
  {
    slug: "trung-thu-yeu-thuong-2026-den-trang-2",
    code: "TTYT26",
    title: "Trung Thu Yêu Thương 2026: Đèn Trăng 2",
    shortTitle: "Đèn Trăng 2",
    series: "trung-thu",
    slogan: "Gói đèn mơ ước — Ngòi dệt mùa trăng",
    storyTitle: "Một mùa trăng cho những em nhỏ ở xa ánh đèn",
    story: [
      "Tiếp nối mùa trăng đầu tiên năm 2025, Đèn Trăng 2 mang Trung thu đến hai điểm cầu: ấp đảo Thiềng Liềng và Mái ấm Vị Hoàng ở TP. Hồ Chí Minh; Mái ấm Thánh Tâm và Chùa Thiên Hương ở phía Bắc.",
      "Mỗi phần quà gồm những món thiết thực như bánh kẹo, sữa, dụng cụ học tập, cùng một sân chơi Trung thu thật sự dành cho các em.",
    ],
    status: "closed",
    startsOn: "2026-08-21",
    endsOn: "2026-09-26",
    onSiteDates: ["2026-09-20", "2026-09-21"],
    phases: [
      { name: "Gói đèn", startsOn: "2026-08-21", endsOn: "2026-09-07", description: "Tuyển tình nguyện viên, gây quỹ, chuẩn bị quà và hoạt động." }, // 6uGdf6kl
      { name: "Ngòi dệt", startsOn: "2026-09-07", endsOn: "2026-09-18", description: "Hoàn thiện công tác tổ chức, chuẩn bị quà tặng và các hoạt động trước Trung thu." },
      { name: "Trông trăng", startsOn: "2026-09-19", endsOn: "2026-09-26", description: "Tổ chức Trung thu tại các địa bàn, trao quà và vui chơi cùng các em." },
    ],
    notices: [
      { text: "Cập nhật 09/2026: điểm Chùa Linh Ứng (Hà Nội) được chuyển sang Chùa Thiên Hương, phường Thượng Hồng, Hưng Yên." }, // oma1rxik
    ],
    locations: [
      {
        name: "Ấp đảo Thiềng Liềng",
        province: "TP.HCM",
        branch: "TP. Hồ Chí Minh",
        address: "Xã đảo Thạnh An, Cần Giờ",
        dates: ["2026-09-20", "2026-09-21"],
        results: [
          { metric: "gifts", quantity: 100 }, // omxv3mck
          { metric: "lanterns", quantity: 100, atLeast: true }, // omxv3mck “hơn 100”
          { metric: "scholarships", quantity: 5, label: "học bổng Ngòi Bút Nhỏ" }, // H3HAe7dl
          { metric: "gifts", quantity: 3, label: "suất quà hộ chính sách" }, // H3HAe7dl (4 triệu đồng)
        ],
        note: "Đi đò ra đảo · công trình “Ấp Đảo Xanh”",
        photo: { src: "/images/photos/ttyt26-volunteer-kids.jpg", alt: "Tình nguyện viên trò chuyện cùng các em ở ấp đảo Thiềng Liềng" },
      },
      {
        name: "Mái ấm Vị Hoàng",
        province: "TP.HCM",
        branch: "TP. Hồ Chí Minh",
        address: "Quận 12",
        note: "Mái ấm dành cho ông bà neo đơn",
        photo: {
          src: "/images/photos/ttyt25-vihoang-elderly.jpg",
          alt: "Các cụ già ở Mái ấm Vị Hoàng cùng tình nguyện viên làm lồng đèn",
          caption: "Ảnh mùa trăng 2025",
        },
      },
      {
        name: "Mái ấm Thánh Tâm",
        province: "Hà Nội",
        branch: "Hà Nội & Hưng Yên",
        address: "Thôn Nghĩa, Xuy Xá, Mỹ Đức",
        dates: ["2026-09-20"],
        note: "Cùng một chuyến đi với Chùa Thiên Hương: 60 suất quà cho hai điểm", // omp4vxtn
        photo: { src: "/images/photos/ttyt26-hanoi-kids.jpg", alt: "Các em nhỏ nhận lồng đèn Trung thu", caption: "Đoàn Hà Nội, 20.09" },
      },
      {
        name: "Chùa Thiên Hương",
        province: "Hưng Yên",
        branch: "Hà Nội & Hưng Yên",
        address: "Phường Thượng Hồng",
        dates: ["2026-09-20"],
        results: [{ metric: "gifts", quantity: 60, label: "suất quà (cả hai điểm)" }], // omp4vxtn
        photo: { src: "/images/photos/ttyt26-hanoi-kids.jpg", alt: "Các em nhỏ nhận lồng đèn Trung thu", caption: "Đoàn Hà Nội, 20.09" },
      },
    ],
    results: [],
    highlight: "100 lồng đèn và công trình “Ấp Đảo Xanh”",
    cover: { src: "/images/photos/ttyt26-island-cleanup.jpg", alt: "Tình nguyện viên dọn rác ở ấp đảo Thiềng Liềng" },
    hero: { src: "/images/photos/ttyt26-thiengliengroup.jpg", alt: "Các em nhỏ và tình nguyện viên chụp ảnh chung ở ấp đảo Thiềng Liềng" },
    gallery: [
      { src: "/images/photos/ttyt26-lantern-gift.jpg", alt: "Tình nguyện viên trao lồng đèn cho các em" },
      { src: "/images/photos/ttyt26-hanoi-kids.jpg", alt: "Các em nhỏ nhận lồng đèn Trung thu" },
      { src: "/images/photos/ttyt26-island-cleanup.jpg", alt: "Dọn rác ở ấp đảo Thiềng Liềng" },
    ],
    lead: { name: "Đỗ Thị Thảo Nhi", role: "Trưởng ban tổ chức" }, // 08-09-26 post
  },
  {
    slug: "hoa-thang-10-2026",
    code: "HT10",
    title: "Hoa Tháng 10",
    series: "20-10",
    slogan: "Hoa xinh trao người — Tháng mười thơm ngát",
    summary:
      "Những món quà nhỏ, những đóa hoa và một buổi chiều vui chơi dành cho các sơ, các cô và các em nhỏ tại Mái ấm Thiên Phước.",
    occasion: "Chào mừng Ngày Phụ nữ Việt Nam 20/10",
    status: "on_site",
    startsOn: "2026-10-08",
    endsOn: "2026-10-25",
    onSiteDates: ["2026-10-18", "2026-10-20"],
    locations: [{ name: "Mái ấm Thiên Phước, An Phú Đông", province: "TP.HCM" }],
    results: [],
    highlight: "Đang diễn ra",
    cover: { src: "/images/campaigns/ht10-keyvisual-square.jpg", alt: "Key visual chương trình Hoa Tháng 10" },
  },
]

export const seedCampaignRepository: CampaignRepository = {
  async list() {
    return campaigns
  },
}
