import { Section } from "@/shared/layout/section"
import { CountUp } from "@/shared/ui/count-up"
import { SectionHeading } from "@/shared/ui/section-heading"
import { Stat } from "@/shared/ui/stat"

import { formatImpact, type ImpactSummary } from "../domain/campaign"

type ImpactBandProps = {
  impact: ImpactSummary
  /** Members of the current term; owned by the Organisation context, passed in by the page. */
  termMembers?: { count: number; label: string }
}

function ImpactBand({ impact, termMembers }: ImpactBandProps) {
  const stats = [
    { value: formatImpact(impact.gifts), label: "phần quà đã trao tận tay" },
    { value: formatImpact(impact.lanterns), label: "lồng đèn Trung thu cho ấp đảo" },
    { value: formatImpact(impact.scholarships), label: "suất học bổng Ngòi Bút Nhỏ & Hoa Hướng Dương" },
    { value: String(impact.provinces), label: "tỉnh, thành phố có địa bàn" },
    ...(termMembers ? [{ value: String(termMembers.count), label: termMembers.label }] : []),
  ]

  return (
    <Section tone="night" spacing="md" aria-labelledby="impact-title" containerClassName="flex flex-col gap-10 md:gap-14">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          id="impact-title"
          tone="dark"
          eyebrow="Dấu ấn 2024 — 2026"
          title="Những điều chúng mình đã cùng nhau viết nên"
          className="max-w-[640px]"
        />
        <p className="max-w-[300px] text-xs text-white/60 md:text-sm">Tổng hợp từ các bài tổng kết trên fanpage Ngòi Tình Nguyện.</p>
      </div>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-5 md:gap-0">
        {stats.map((s, i) => (
          <div key={s.label} className={i === stats.length - 1 && stats.length % 2 === 1 ? "col-span-2 md:col-span-1" : undefined}>
            <dt className="sr-only">{s.label}</dt>
            <dd>
              <Stat
                size="lg"
                tone="dark"
                divider={i === 0 ? "none" : "responsive"}
                value={<CountUp value={s.value} />}
                label={s.label}
                className={i === 0 ? "max-md:border-t max-md:border-white/15 max-md:pt-4 md:pr-7" : "md:px-7"}
              />
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}

export { ImpactBand }
