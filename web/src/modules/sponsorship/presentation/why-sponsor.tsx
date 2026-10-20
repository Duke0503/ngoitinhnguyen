import Image from "next/image"
import { CircleCheck } from "lucide-react"

import { Section } from "@/shared/layout/section"

const reasons = [
  { title: "Trao tận tay", description: "Tình nguyện viên trực tiếp mang quà đến điểm trường, mái ấm, ấp đảo — có ảnh và bài tổng kết." },
  { title: "Minh bạch từng đồng", description: "Danh sách ủng hộ và báo cáo thu — chi được công khai trên website sau mỗi chương trình." },
  { title: "Cộng đồng người trẻ", description: "Học sinh, sinh viên cả nước — lan toả thông điệp của đơn vị đến thế hệ trẻ." },
]

/** “Vì sao đồng hành”: the line from the logo announcement beside three promises. */
function WhySponsor() {
  return (
    <Section tone="paper" spacing="lg" aria-labelledby="why-title" containerClassName="flex flex-col items-center gap-8 md:gap-11">
      <h2 id="why-title" className="font-head text-[30px] leading-[1.15] font-semibold text-navy max-md:self-start md:text-[44px]">
        Vì sao đồng hành cùng Ngòi?
      </h2>
      <div className="grid w-full items-center gap-4 md:grid-cols-[560px_1fr] md:gap-10">
        <figure className="flex flex-col items-center gap-3.5 rounded-[14px] bg-sand p-5 text-center md:flex-row md:gap-6 md:p-8 md:text-left">
          <div className="relative size-[90px] shrink-0 overflow-hidden rounded-full border-4 border-white bg-white md:size-[130px] md:border-[5px]">
            <Image src="/images/logo/quill-flame.png" alt="Logo Ngòi Tình Nguyện: cây bút hình ngọn lửa" fill sizes="130px" className="object-contain p-3" />
          </div>
          <div className="flex flex-col gap-2.5">
            <blockquote className="font-head text-xl leading-snug font-medium text-navy italic md:text-2xl">“Vì nụ cười của em trên con đường tìm con chữ.”</blockquote>
            <figcaption className="text-sm text-muted-ink">— Ngòi Tình Nguyện, khi công bố logo · 12.08.2024</figcaption>
          </div>
        </figure>
        <ul className="flex flex-col gap-3 md:gap-4">
          {reasons.map((r) => (
            <li key={r.title} className="flex items-center gap-3.5 rounded-full bg-navy px-[18px] py-3.5 text-white md:gap-4 md:px-[26px] md:py-[18px]">
              <CircleCheck aria-hidden className="size-[26px] shrink-0 text-flame-gold md:size-[34px]" />
              <div className="flex flex-col gap-0.5">
                <h3 className="font-head text-[17px] font-semibold md:text-xl">{r.title}</h3>
                <p className="text-[13px] leading-snug text-white/85 md:text-sm">{r.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

export { WhySponsor }
