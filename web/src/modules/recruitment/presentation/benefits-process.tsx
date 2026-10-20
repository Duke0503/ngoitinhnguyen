import { Award, Map, Star, Users, type LucideIcon } from "lucide-react"

import { Section } from "@/shared/layout/section"
import { ProcessList } from "@/shared/ui/process-list"
import { SectionHeading } from "@/shared/ui/section-heading"

import { benefits, recruitmentProcess } from "../domain/recruitment"

const benefitIcons: LucideIcon[] = [Award, Star, Users, Map]

const processCopy = [
  "Điền đơn ngay trên website, chọn ban hoặc đội hình. Nhận email xác nhận.",
  "Với các đợt tuyển lớn, ban nhân sự hẹn lịch phỏng vấn trực tuyến.",
  "Kết quả gửi qua email. Đợt tuyển có thể đóng sớm khi đủ số lượng.",
  "Bấm xác nhận trong email để chính thức gia nhập nhà Ngòi.",
]

function BenefitsAndProcess() {
  return (
    <Section spacing="lg" className="border-t border-line" aria-label="Quyền lợi và quy trình" containerClassName="grid gap-12 md:grid-cols-2 md:gap-[72px]">
      <div className="flex flex-col gap-6">
        <SectionHeading eyebrow="Bạn nhận được" title="Những điều ở lại sau mỗi mùa" size="md" />
        <ul className="flex flex-col gap-5">
          {benefits.map((b, i) => {
            const Icon = benefitIcons[i] ?? Award
            return (
              <li key={b.title} className="flex gap-4">
                <span aria-hidden className="grid size-10 shrink-0 place-items-center rounded-full bg-navy/6">
                  <Icon className="size-[18px] text-navy" />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-head text-[19px] font-semibold text-navy">{b.title}</h3>
                  <p className="text-[15px] leading-normal text-muted-ink">{b.description}</p>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="flex flex-col gap-6">
        <SectionHeading eyebrow="Quy trình" title="Từ lá đơn đến ngày gia nhập" size="md" />
        <ProcessList items={recruitmentProcess.map((s, i) => ({ title: s.title, description: processCopy[i] }))} />
      </div>
    </Section>
  )
}

export { BenefitsAndProcess }
