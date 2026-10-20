import Image from "next/image"
import { SquareCheck } from "lucide-react"

import { Section } from "@/shared/layout/section"
import { Eyebrow } from "@/shared/ui/eyebrow"

import { benefits, recruitmentProcess } from "../domain/recruitment"

const processCopy = [
  "Điền đơn ngay trên website, chọn ban hoặc đội hình. Nhận email xác nhận.",
  "Với các đợt tuyển lớn, ban nhân sự hẹn lịch phỏng vấn trực tuyến.",
  "Kết quả gửi qua email. Đợt tuyển có thể đóng sớm khi đủ số lượng.",
  "Bấm xác nhận trong email để chính thức gia nhập nhà Ngòi.",
]

/** What you get (photo + checks), then the four steps with large ghost numerals. */
function BenefitsAndProcess() {
  return (
    <>
      <Section tone="paper" spacing="lg" aria-labelledby="benefits-title" containerClassName="grid items-center gap-8 md:grid-cols-[520px_1fr] md:gap-[72px]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-[0_16px_34px_-12px_rgba(11,18,51,0.4)] md:aspect-auto md:h-[400px] md:rounded-[14px]">
          <Image src="/images/photos3/banh-chung-pair.jpg" alt="Hai tình nguyện viên khoe bánh chưng xanh vừa gói" fill sizes="(min-width: 768px) 520px, 100vw" className="object-cover" />
        </div>
        <div className="flex flex-col gap-4 md:gap-[18px]">
          <Eyebrow tone="orange">Bạn nhận được</Eyebrow>
          <h2 id="benefits-title" className="font-head text-[26px] leading-[1.15] font-semibold text-navy md:text-[40px]">
            Những điều ở lại sau mỗi mùa
          </h2>
          <ul className="flex flex-col gap-3.5 md:gap-4">
            {benefits.map((b) => (
              <li key={b.title} className="flex items-start gap-3.5">
                <SquareCheck aria-hidden className="mt-0.5 size-[22px] shrink-0 text-navy md:size-[26px]" />
                <div className="flex flex-col gap-0.5">
                  <h3 className="font-head text-lg font-semibold text-navy md:text-xl">{b.title}</h3>
                  <p className="text-[15px] leading-normal text-muted-ink">{b.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="white" spacing="lg" aria-labelledby="process-title" containerClassName="flex flex-col gap-6 md:items-center md:gap-11">
        <div className="flex flex-col gap-3 md:items-center md:text-center">
          <Eyebrow tone="orange">Quy trình</Eyebrow>
          <h2 id="process-title" className="font-head text-[26px] leading-[1.15] font-semibold text-navy md:text-[44px]">
            Từ lá đơn đến ngày gia nhập
          </h2>
        </div>
        <ol className="flex w-full flex-col md:grid md:grid-cols-4 md:gap-7">
          {recruitmentProcess.map((s, i) => (
            <li key={s.title} className="flex items-center gap-4 border-t border-line py-3 first:border-t-0 md:flex-col md:items-start md:gap-2.5 md:border-t-0 md:py-0">
              <span aria-hidden className="w-14 shrink-0 font-head text-[44px] leading-none font-bold text-flame-orange/35 md:w-auto md:text-[84px] md:leading-[0.9] md:text-flame-orange/20">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-0.5 md:gap-2">
                <h3 className="font-head text-xl font-semibold text-navy md:text-2xl">{s.title}</h3>
                <p className="text-sm leading-normal text-muted-ink md:text-[15px] md:leading-[1.55]">{processCopy[i]}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>
    </>
  )
}

export { BenefitsAndProcess }
