import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { routes } from "@/shared/config/routes"
import { Section } from "@/shared/layout/section"
import { Button } from "@/shared/ui/button"
import { Eyebrow } from "@/shared/ui/eyebrow"

import { SeasonPanels, type Season } from "./season-panels"

// Figures come from the campaigns' own results (seed data); dates are the on-site months.
const seasons: Season[] = [
  {
    tag: "Đọc sách",
    when: "04.2024",
    title: "Trang sách nhỏ",
    description: "Ngày hội đọc sách và “Trạm gửi tri thức” — chương trình đầu tiên của Ngòi, ở THCS Lê Lợi, Gia Lai.",
    figure: "Chương trình đầu tiên",
    href: routes.campaigns,
    photo: { src: "/images/photos2/ct01-tram-gui-tri-thuc.jpg", alt: "Ngày hội đọc sách và Trạm gửi tri thức của Ngòi ở Gia Lai" },
  },
  {
    tag: "Trung thu",
    when: "2025 · 2026",
    title: "Trung thu yêu thương",
    description: "Đèn Trăng mang lồng đèn, quà và sân chơi đến Gia Lai, TP.HCM, Hà Nội và ấp đảo Thiềng Liềng.",
    figure: "100 lồng đèn · 163 phần quà",
    href: routes.campaigns,
    photo: { src: "/images/photos2/ttyt26-gift-handover.jpg", alt: "Tình nguyện viên trao quà Trung thu tận nhà ở ấp đảo Thiềng Liềng" },
  },
  {
    tag: "Xuân",
    when: "02.2026",
    title: "Xuân yêu thương",
    description: "Gói bánh chưng xanh, trao quà Tết, sửa điểm trường và rung chuông vàng ở Gia Lai, Hưng Yên, Hà Nội.",
    figure: "35 tình nguyện viên · 51 phần quà",
    href: routes.campaigns,
    photo: { src: "/images/photos2/xyt26-chalkboard-class.jpg", alt: "Học sinh giơ bảng trong hội thi Rung chuông vàng" },
  },
  {
    tag: "20/10",
    when: "đang gây quỹ",
    title: "Hoa Tháng 10",
    description: "Hoa kẽm nhung do tình nguyện viên làm, góp từ 25.000đ nhận giấy chứng nhận online.",
    figure: "Từ 25.000đ",
    href: routes.donate,
    photo: { src: "/images/campaigns/ht10-keyvisual.jpg", alt: "Hình ảnh chương trình Hoa Tháng 10" },
  },
]

/** “Ngòi làm gì”: heading, then the four seasons as expanding photo panels (one idea per season, short on every screen). */
function ProgrammeCards() {
  return (
    <Section tone="paper" spacing="lg" aria-labelledby="programmes-title" containerClassName="flex flex-col gap-8 md:gap-12">
      <div className="grid gap-4 md:grid-cols-[1fr_420px] md:items-end md:gap-24">
        <div className="flex flex-col gap-3 md:gap-4">
          <Eyebrow tone="orange">Ngòi làm gì</Eyebrow>
          <h2 id="programmes-title" className="font-head text-[32px] leading-[1.12] font-semibold text-balance text-navy md:text-[46px] md:leading-[1.1]">
            Bốn mùa, bốn kiểu đi cùng các em.
          </h2>
        </div>
        <p className="text-base leading-relaxed text-muted-ink md:text-[17px] md:leading-[1.65]">
          Mỗi mùa một chuyến rất cụ thể: một ngày hội đọc sách, một đêm Trung thu trên ấp đảo, một cái Tết ở điểm trường, một đoá hoa tháng 10.
        </p>
      </div>

      <SeasonPanels seasons={seasons} />

      <div>
        <Button asChild size="lg" className="bg-navy hover:bg-night max-sm:w-full">
          <Link href={routes.campaigns}>
            Xem tất cả chương trình
            <ArrowRight aria-hidden />
          </Link>
        </Button>
      </div>
    </Section>
  )
}

export { ProgrammeCards }
