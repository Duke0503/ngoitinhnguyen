import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { routes } from "@/shared/config/routes"
import { Section } from "@/shared/layout/section"
import { Button } from "@/shared/ui/button"
import { Eyebrow } from "@/shared/ui/eyebrow"
import { SnapRow } from "@/shared/ui/snap-row"

import { seriesLabel, type CampaignSeries } from "../domain/campaign"

type Programme = { series: CampaignSeries; when: string; title: string; description: string; photo: { src: string; alt: string } }

// Figures come from the campaigns' own results (see seed data); dates are the on-site months.
const programmes: Programme[] = [
  {
    series: "doc-sach",
    when: "04.2024",
    title: "Trang sách nhỏ",
    description: "Ngày hội đọc sách và “Trạm gửi tri thức” — chương trình đầu tiên của Ngòi ở Gia Lai.",
    photo: { src: "/images/photos2/ct01-tram-gui-tri-thuc.jpg", alt: "Ngày hội đọc sách và Trạm gửi tri thức của Ngòi ở Gia Lai" },
  },
  {
    series: "trung-thu",
    when: "2026",
    title: "Trung thu yêu thương",
    description: "Đèn Trăng 2 mang 100 lồng đèn và 163 phần quà đến TP.HCM, Hà Nội, Hưng Yên.",
    photo: { src: "/images/photos2/ttyt26-gift-handover.jpg", alt: "Tình nguyện viên trao quà Trung thu tận nhà ở ấp đảo Thiềng Liềng" },
  },
  {
    series: "xuan",
    when: "02.2026",
    title: "Xuân yêu thương",
    description: "3 đội hình, 35 tình nguyện viên, 51 phần quà Tết và buổi rung chuông vàng ở trường THCS Lê Lợi.",
    photo: { src: "/images/photos2/xyt26-chalkboard-class.jpg", alt: "Học sinh giơ bảng trong hội thi Rung chuông vàng" },
  },
  {
    series: "20-10",
    when: "đang gây quỹ",
    title: "Hoa Tháng 10",
    description: "Hoa kẽm nhung do tình nguyện viên làm, góp từ 25.000đ nhận giấy chứng nhận online.",
    photo: { src: "/images/campaigns/ht10-keyvisual.jpg", alt: "Hình ảnh chương trình Hoa Tháng 10" },
  },
]

/** “Ngòi làm gì”: statement + a real quote, then one photo card per programme series with the caption on the picture. */
function ProgrammeCards() {
  return (
    <Section tone="paper" spacing="lg" aria-labelledby="programmes-title" containerClassName="flex flex-col gap-10 md:gap-16">
      <div className="grid gap-8 md:grid-cols-[1fr_340px] md:items-end md:gap-24">
        <div className="flex flex-col gap-4 md:gap-5">
          <Eyebrow tone="cta">Ngòi làm gì</Eyebrow>
          <h2 id="programmes-title" className="font-head text-[30px] leading-[1.2] font-semibold text-balance text-navy md:text-[44px] md:leading-[1.18]">
            Mỗi em nhỏ đều xứng đáng được đến trường, được đọc sách và được yêu thương.
          </h2>
          <p className="max-w-[62ch] text-base leading-relaxed text-muted-ink md:text-[17px]">
            Bốn mùa trong năm, Ngòi đi những chuyến rất cụ thể: một ngày hội đọc sách, một đêm Trung thu trên ấp đảo, một cái Tết ở điểm trường.
          </p>
        </div>
        <figure className="border-l-[3px] border-flame-orange pl-4 md:pl-7">
          <blockquote className="font-head text-[19px] leading-snug font-medium text-navy italic md:text-[26px]">“Vì nụ cười của em trên con đường tìm con chữ.”</blockquote>
          <figcaption className="mt-2 text-[13px] text-muted-ink">Giới thiệu logo · 12.08.2024</figcaption>
        </figure>
      </div>

      <SnapRow aria-label="Các dòng chương trình" gridClassName="md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
        {programmes.map((p) => (
          <Link key={p.title} href={routes.campaigns} className="group/card relative block h-[380px] md:h-[390px]">
            <div className="absolute inset-0 overflow-hidden rounded-2xl bg-night shadow-[0_14px_30px_-12px_rgba(11,18,51,0.4)] md:rounded-[14px]">
              <Image src={p.photo.src} alt={p.photo.alt} fill sizes="(min-width: 1200px) 584px, (min-width: 768px) 50vw, 300px" className="object-cover transition-transform duration-700 group-hover/card:scale-[1.04] motion-reduce:transition-none" />
            </div>
            <span className="absolute top-4 left-3.5 rounded-[4px] bg-flame-gold px-3 py-1.5 text-xs font-bold tracking-[0.1em] text-night uppercase md:top-[26px] md:-left-3.5">
              {seriesLabel(p.series)} · {p.when}
            </span>
            <div className="absolute inset-x-3 bottom-3 flex flex-col gap-1 rounded-[10px] bg-white/95 px-4 py-3.5 md:inset-x-6 md:bottom-6 md:px-[22px] md:py-4">
              <h3 className="font-head text-[21px] leading-tight font-semibold text-navy transition-colors group-hover/card:text-cta md:text-2xl">{p.title}</h3>
              <p className="text-sm leading-normal text-muted-ink">{p.description}</p>
            </div>
          </Link>
        ))}
      </SnapRow>

      <div className="flex justify-center">
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
