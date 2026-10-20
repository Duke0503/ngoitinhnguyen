import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { routes } from "@/shared/config/routes"
import { Section } from "@/shared/layout/section"
import { Button } from "@/shared/ui/button"
import { Eyebrow } from "@/shared/ui/eyebrow"

import { PinnedPrints, type Print } from "./pinned-prints"

// In calendar order. Figures come from the campaigns' own results (seed data).
const prints: Print[] = [
  {
    when: "Tháng 2 · Gia Lai, Hưng Yên, Hà Nội",
    title: "Xuân yêu thương",
    figure: "51 phần quà Tết",
    photo: { src: "/images/photos2/xyt26-chalkboard-class.jpg", alt: "Học sinh giơ bảng trong hội thi Rung chuông vàng" },
  },
  {
    when: "Tháng 4 · THCS Lê Lợi, Gia Lai",
    title: "Trang sách nhỏ",
    figure: "Chương trình đầu tiên",
    photo: { src: "/images/photos2/ct01-tram-gui-tri-thuc.jpg", alt: "Ngày hội đọc sách và Trạm gửi tri thức của Ngòi ở Gia Lai" },
  },
  {
    when: "Tháng 9–10 · Ba miền và ấp đảo",
    title: "Trung thu yêu thương",
    figure: "100 lồng đèn · 163 phần quà",
    photo: { src: "/images/photos2/ttyt26-gift-handover.jpg", alt: "Tình nguyện viên trao quà Trung thu tận nhà ở ấp đảo Thiềng Liềng" },
  },
  {
    when: "Tháng 10 · Mái ấm Thiên Phước",
    title: "Hoa Tháng 10",
    figure: "Góp từ 25.000đ",
    photo: { src: "/images/campaigns/ht10-keyvisual.jpg", alt: "Hình hoa vẽ tay của chương trình Hoa Tháng 10" },
  },
]

/** “Một năm của Ngòi”: the four programmes as prints pinned on a rope, in the order the year runs. */
function ProgrammeCards() {
  return (
    <Section tone="paper" spacing="lg" aria-labelledby="programmes-title" containerClassName="flex flex-col gap-8 md:gap-12">
      <div className="grid gap-4 md:grid-cols-[640px_1fr] md:items-end md:gap-24">
        <div className="flex flex-col gap-3 md:gap-4">
          <Eyebrow tone="orange">Ngòi làm gì</Eyebrow>
          <h2 id="programmes-title" className="font-head text-[32px] leading-[1.12] font-semibold text-balance text-navy md:text-[46px] md:leading-[1.1]">
            Một năm của Ngòi, từ Tết đến 20/10.
          </h2>
        </div>
        <p className="text-base leading-relaxed text-muted-ink md:max-w-[380px] md:text-[17px] md:leading-[1.65]">
          Bốn chương trình, bốn mùa. Mỗi tấm ảnh là một chuyến đi có ngày, có nơi và có kết quả thật.
        </p>
      </div>

      <PinnedPrints prints={prints} />

      <div className="flex">
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
