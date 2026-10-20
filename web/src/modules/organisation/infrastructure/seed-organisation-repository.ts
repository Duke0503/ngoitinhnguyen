import type { OrganisationRepository } from "../application/organisation-queries"
import type { OrganisationProfile } from "../domain/organisation"

// Sources: proposal p.4–7, posts ommnsee8 (origin), omgokzif (logo + mission wording),
// aYU9uPYl (BTC 26–27), CTcoEXal (28 members, 6 departments), A5BM3pNl + the VNV decision image (membership).
const profile: OrganisationProfile = {
  foundedYear: 2020,
  volunteerSince: 2024,
  followers: "3,1K",
  affiliation: "Trực thuộc Cộng đồng Tình nguyện Việt Nam",
  origin: [
    "Ngòi bắt đầu năm 2020 ở Gia Lai — một dự án viết lách phi lợi nhuận do các bạn học sinh cấp ba lập nên, mang tên Ngòi Bút Nhỏ – Trà Thư Quán.",
    "Từ năm 2024, những cây bút ấy quyết định viết vì cộng đồng. Ngòi Tình Nguyện – Viết Cho Em ra đời, hướng đến các em học sinh còn nhiều khó khăn trên con đường tìm con chữ.",
  ],
  logo: {
    publishedOn: "2024-08-12",
    // Quoted from the logo announcement (omgokzif).
    meaning:
      "Cây bút mang dáng hình ngọn lửa thể hiện sự khát khao của những người trẻ mang trong mình ước vọng cống hiến, sắc đỏ tô điểm thêm cho sự kiên cường, dũng cảm, sự tâm huyết cho một sứ mệnh chung của cộng đồng.",
  },
  // The words are Ngòi's own; the descriptions tie each one to something the posts show them doing.
  // Wording to be confirmed with the BTC (docs/BUSINESS.md §14).
  pillars: [
    { word: "Viết", subject: "Văn", description: "Ngòi bắt đầu từ những cây bút học trò. Đến nay tình nguyện viên vẫn viết thư tay, lời chúc và kể lại từng hành trình." },
    { word: "Đọc", subject: "Sách", description: "Ngày hội đọc sách và “Trạm gửi tri thức” mang sách đến các điểm trường." },
    { word: "Ghi nhớ", subject: "Sử", description: "Mỗi chương trình được lưu lại bằng ảnh và bài tổng kết, để những mùa sau đi tiếp." },
  ],
  milestones: [
    { on: "2020-01-22", precision: "day", title: "Ngòi Bút Nhỏ – Trà Thư Quán ra đời", description: "Dự án viết lách phi lợi nhuận cho học sinh, khởi đầu ở Gia Lai." },
    { on: "2024-01-01", precision: "month", title: "Ngòi Tình Nguyện – Viết Cho Em", description: "Chuyển từ viết lách sang “viết vì cộng đồng”." },
    { on: "2024-04-20", precision: "day", title: "Trang sách nhỏ — Gửi cho em", description: "Chương trình đầu tiên: ngày hội đọc sách tại THCS Lê Lợi." },
    { on: "2024-08-12", precision: "day", title: "Logo chính thức", description: "Cây bút hình ngọn lửa." },
    { on: "2025-10-01", precision: "month", title: "Trung Thu Yêu Thương: Đèn Trăng", description: "Gia Lai, TP. Hồ Chí Minh, Hà Nội." },
    { on: "2026-02-01", precision: "month", title: "Xuân Yêu Thương", description: "Ba đội hình Xuân tại Gia Lai, Hưng Yên – Hà Nội và TP. Hồ Chí Minh." },
    { on: "2026-06-05", precision: "month", title: "Đơn vị trực thuộc VNV", description: "Gia nhập Cộng đồng Tình nguyện Việt Nam.", emphasis: true },
    { on: "2026-09-01", precision: "month", title: "Đèn Trăng 2", description: "Mùa trăng thứ hai, từ ấp đảo Thiềng Liềng đến Hưng Yên." },
  ],
  beneficiaries: [
    { title: "Học sinh vùng sâu, vùng xa", place: "Ia Băng, Đak Đoa — Gia Lai", photo: { src: "/images/photos/xyt26-gialai-children.jpg", alt: "Học sinh Gia Lai cùng tình nguyện viên" } },
    { title: "Ông bà neo đơn", place: "Mái ấm Vị Hoàng, TP. Hồ Chí Minh", photo: { src: "/images/photos/ttyt25-vihoang-elderly.jpg", alt: "Các cụ già ở Mái ấm Vị Hoàng làm lồng đèn cùng tình nguyện viên" } },
    { title: "Những mảnh đời còn vất vả", place: "Đêm Trung thu trên phố Hà Nội", photo: { src: "/images/photos/ttyt25-hanoi-street.jpg", alt: "Trao quà Trung thu cho người lao động trên phố Hà Nội" } },
  ],
  alsoHelps: ["Trẻ em tại các mái ấm", "Gia đình chính sách", "Bệnh nhân Bệnh viện K", "Các sơ, các cô ở mái ấm", "Môi trường ấp đảo"],
  membership: {
    organisation: "Cộng đồng Tình nguyện Việt Nam",
    // Read from the decision itself (A1006/2026/QĐ-VNV, issued 10.06.2026).
    decision: { number: "A1006/2026/QĐ-VNV", validFrom: "2026-06-05", validTo: "2028-06-05", representative: "Trương Thị Mỹ Tuyết, Trưởng ban tổ chức" },
    document: { src: "/images/docs/vnv-quyet-dinh.jpg", alt: "Quyết định công nhận Ngòi Tình Nguyện – Viết Cho Em là thành viên trực thuộc Cộng đồng Tình nguyện Việt Nam" },
    role: "VNV là đơn vị bảo trợ pháp lý và truyền thông",
  },
  // 0961 494 092 is the project lead's number in the 2025–26 posts (Trưởng BTC); confirm it is still current.
  contact: {
    email: "ngoibutnhotrathuquan@gmail.com",
    phone: "0961 494 092",
    phoneHolder: "Trưởng ban tổ chức",
    fanpage: { label: "Ngòi Tình Nguyện – Viết Cho Em", href: "https://www.facebook.com/ngoitinhnguyenvolunteer" },
  },
  currentTerm: {
    name: "Mùa 2",
    label: "2026 — 2027",
    theme: "Hành trình của những vì sao",
    slogan: "Gieo Ngòi tinh tú — Gặt vạn vì sao",
    memberCount: 28,
    // Artwork: posts rDvgzful / CTcoEXal. Summaries are short plain descriptions to be confirmed with the BTC.
    departments: [
      { slug: "truyen-thong", name: "Truyền thông", summary: "Nội dung, hình ảnh và fanpage.", art: { src: "/images/departments/truyen-thong.jpg", alt: "Cô bé có đôi cánh lông vũ bay giữa bầu trời sao, hình đại diện ban Truyền thông" } },
      { slug: "su-kien", name: "Sự kiện", summary: "Tổ chức hoạt động tại các địa bàn.", art: { src: "/images/departments/su-kien.jpg", alt: "Sao Hỏa và cây bút lông vũ, hình đại diện ban Sự kiện" } },
      { slug: "nhan-su", name: "Nhân sự", summary: "Tuyển chọn, đồng hành và gắn kết thành viên.", art: { src: "/images/departments/nhan-su.jpg", alt: "Trái Đất và cây bút lông vũ, hình đại diện ban Nhân sự" } },
      { slug: "thiet-ke", name: "Thiết kế", summary: "Ấn phẩm, nhận diện cho từng mùa chương trình.", art: { src: "/images/departments/thiet-ke.jpg", alt: "Sao Kim vàng và cây bút lông vũ, hình đại diện ban Thiết kế" } },
      { slug: "tai-chinh-doi-ngoai", name: "Tài chính — Đối ngoại", summary: "Gây quỹ, kết nối nhà tài trợ và đối tác.", art: { src: "/images/departments/tai-chinh-doi-ngoai.jpg", alt: "Sao Mộc có vành đai và cây bút lông vũ, hình đại diện ban Tài chính — Đối ngoại" } },
      { slug: "quan-ly-ke-hoach", name: "Quản lý kế hoạch dự án", summary: "Lập kế hoạch, theo dõi tiến độ từng chương trình.", art: { src: "/images/departments/quan-ly-ke-hoach.jpg", alt: "Sao Thổ có vành đai và cây bút lông vũ, hình đại diện ban Quản lý kế hoạch dự án" } },
    ],
    introBanner: { src: "/images/team/btc-2026-2027-intro-wide.jpg", alt: "Banner “Giới thiệu Ban tổ chức” nhiệm kỳ 2026 – 2027 của Ngòi Tình Nguyện" },
  },
}

export const seedOrganisationRepository: OrganisationRepository = {
  async profile() {
    return profile
  },
}
