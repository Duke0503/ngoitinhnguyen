import Image from "next/image"
import Link from "next/link"

import { routes } from "@/shared/config/routes"
import { Section } from "@/shared/layout/section"
import { Button } from "@/shared/ui/button"
import { SectionHeading } from "@/shared/ui/section-heading"

import { seriesLabel, type CampaignSeries } from "../domain/campaign"

type Programme = { series: CampaignSeries; title: string; description: string; photo: { src: string; alt: string } }

const programmes: Programme[] = [
  {
    series: "doc-sach",
    title: "Trang sách nhỏ",
    description: "Ngày hội đọc sách và “Trạm gửi tri thức” mang sách đến học sinh vùng khó.",
    photo: { src: "/images/photos/ct01-reading-day.jpg", alt: "Ngày hội đọc sách của Ngòi tại Gia Lai" },
  },
  {
    series: "trung-thu",
    title: "Trung thu yêu thương",
    description: "Lồng đèn, quà và sân chơi cho các em ở Gia Lai, TP.HCM, Hà Nội và ấp đảo Thiềng Liềng.",
    photo: { src: "/images/photos/ttyt26-hanoi-kids.jpg", alt: "Các em nhỏ nhận lồng đèn Trung thu" },
  },
  {
    series: "xuan",
    title: "Xuân yêu thương",
    description: "Gói bánh chưng xanh, trao quà Tết và sửa sang điểm trường ở Gia Lai, Hưng Yên, Hà Nội.",
    photo: { src: "/images/photos/xyt26-banh-chung.jpg", alt: "Tình nguyện viên gói bánh chưng xanh" },
  },
  {
    series: "20-10",
    title: "Hoa Tháng 10",
    description: "Những đoá hoa handmade gây quỹ, gửi tặng nhân Ngày Phụ nữ Việt Nam 20/10.",
    photo: { src: "/images/campaigns/ht10-keyvisual.jpg", alt: "Hình ảnh chương trình Hoa Tháng 10" },
  },
]

/** “Ngòi làm gì”: one photo card per programme series, captions on the picture. */
function ProgrammeCards() {
  return (
    <Section tone="white" spacing="lg" aria-labelledby="programmes-title" containerClassName="flex flex-col items-center gap-10 text-center md:gap-14">
      <SectionHeading
        id="programmes-title"
        eyebrow="Ngòi làm gì"
        title="Bốn mùa, một lời hứa"
        description="Mỗi năm Ngòi đi qua bốn dòng chương trình — sách, Trung thu, Tết và 20/10 — để món quà đến đúng nơi, đúng lúc các em cần."
        className="max-w-[720px] items-center"
      />
      <ul className="grid w-full gap-4 text-left sm:grid-cols-2 md:gap-6">
        {programmes.map((p, i) => (
          <li key={p.series} className="reveal" style={{ "--i": i % 2 } as React.CSSProperties}>
            <Link href={routes.campaigns} className="group/card relative flex aspect-[16/10] overflow-hidden rounded-lg bg-night shadow-[0_10px_30px_-12px_rgba(11,18,51,0.45)] md:aspect-[16/9]">
              <Image src={p.photo.src} alt={p.photo.alt} fill sizes="(min-width: 1200px) 588px, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover/card:scale-[1.04] motion-reduce:transition-none" />
              <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/25 to-transparent" />
              <span className="relative mt-auto flex flex-col gap-1.5 p-5 md:p-7">
                <span className="text-[11px] font-bold tracking-[0.14em] text-flame-gold uppercase">{seriesLabel(p.series)}</span>
                <span className="font-head text-2xl leading-tight font-semibold text-white md:text-[28px]">{p.title}</span>
                <span className="max-w-[460px] text-sm leading-relaxed text-white/85 md:text-[15px]">{p.description}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <Button asChild size="lg">
        <Link href={routes.campaigns}>Xem tất cả chương trình</Link>
      </Button>
    </Section>
  )
}

export { ProgrammeCards }
