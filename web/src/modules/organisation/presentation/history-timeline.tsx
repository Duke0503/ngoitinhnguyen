import Image from "next/image"

import { Section } from "@/shared/layout/section"
import { Eyebrow } from "@/shared/ui/eyebrow"

const chapters = [
  {
    year: "2020",
    title: "Ngòi Bút Nhỏ – Trà Thư Quán",
    body: "Ngày 22.01.2020, một nhóm học sinh cấp ba ở Gia Lai lập ra dự án viết lách phi lợi nhuận. Từ những trang viết ấy, Ngòi bắt đầu lớn lên.",
    quote: "Ngày 22.01.2020 — những trang viết đầu tiên.",
    photo: { src: "/images/photos3/volunteers-floor.jpg", alt: "Các bạn trẻ ngồi quây quần viết cùng nhau trên sàn nhà" },
  },
  {
    year: "2024",
    title: "Viết vì cộng đồng",
    body: "Tháng 01.2024, Ngòi chuyển từ viết lách sang viết vì cộng đồng. Ngày 20.04, ngày hội đọc sách “Trang sách nhỏ” diễn ra ở THCS Lê Lợi, Gia Lai — chương trình đầu tiên.",
    quote: "Ngày 12.08.2024 — logo chính thức ra đời.",
    photo: { src: "/images/photos3/ct01-crowd.jpg", alt: "Học sinh ngồi kín sân dự ngày hội đọc sách" },
  },
  {
    year: "2025–26",
    title: "Mỗi mùa một hành trình",
    body: "Trung thu Đèn Trăng, Xuân Yêu Thương, Hoa Tháng 10: ba miền, bốn dòng chương trình. Tháng 06.2026, Ngòi trở thành đơn vị trực thuộc Cộng đồng Tình nguyện Việt Nam.",
    quote: "Đèn Trăng 2 đến cả ấp đảo Thiềng Liềng.",
    photo: { src: "/images/photos3/island-cleanup.jpg", alt: "Tình nguyện viên dọn rác ven ấp đảo Thiềng Liềng" },
  },
]

/** Three chapters: a ghost year behind the title, a pull-quote with the key date, photo alternating sides. */
function HistoryTimeline() {
  return (
    <Section tone="white" spacing="lg" aria-labelledby="story-title" containerClassName="flex flex-col gap-8 md:gap-10">
      <div className="flex flex-col gap-3 md:items-center md:gap-4">
        <Eyebrow tone="orange">Câu chuyện của Ngòi</Eyebrow>
        <h2 id="story-title" className="font-head text-[30px] font-semibold text-navy md:text-5xl">
          Ba chặng đường
        </h2>
      </div>
      <ol className="flex flex-col md:gap-8">
        {chapters.map((c, i) => (
          <li key={c.year} className="flex flex-col md:items-center">
            <div className="grid items-center gap-4 border-t border-line py-4 max-md:grid-cols-[104px_1fr] max-md:gap-3.5 md:w-full md:grid-cols-2 md:gap-14 md:rounded-2xl md:border-0 md:bg-paper md:p-12">
              <div className={`relative h-[116px] overflow-hidden rounded-[10px] md:aspect-[500/360] md:h-auto md:rounded-xl md:shadow-[0_16px_34px_-12px_rgba(11,18,51,0.4)] ${i % 2 ? "md:order-first" : "md:order-last"}`}>
                <Image src={c.photo.src} alt={c.photo.alt} fill sizes="(min-width: 768px) 500px, 104px" className="object-cover" />
              </div>
              <div className="flex flex-col gap-1 md:gap-3.5">
                <p aria-hidden className="font-head text-[26px] leading-none font-bold text-flame-orange md:-mb-3 md:text-[120px] md:leading-[0.9] md:text-flame-orange/20">
                  {c.year}
                </p>
                <p className="hidden text-xs font-bold tracking-[0.16em] text-orange-ink uppercase md:block">Chặng {i + 1}</p>
                <h3 className="font-head text-[17px] leading-tight font-semibold text-navy md:text-[34px]">
                  <span className="sr-only">{c.year}: </span>
                  {c.title}
                </h3>
                <p className="text-sm leading-normal text-muted-ink md:text-[17px] md:leading-relaxed md:text-ink">{c.body}</p>
                <p className="hidden font-head text-xl leading-snug font-medium text-cta italic md:block">{c.quote}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}

export { HistoryTimeline }
