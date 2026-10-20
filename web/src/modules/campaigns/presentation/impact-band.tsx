import Link from "next/link"

import { donateHref } from "@/shared/config/site"
import { Section } from "@/shared/layout/section"
import { Button } from "@/shared/ui/button"
import { CountUp } from "@/shared/ui/count-up"
import { SectionHeading } from "@/shared/ui/section-heading"

import { formatImpact, type ImpactSummary } from "../domain/campaign"

type ImpactBandProps = {
  impact: ImpactSummary
  /** Members of the current term; owned by the Organisation context, passed in by the page. */
  termMembers?: { count: number; label: string }
}

/** Centred counters on white, then the ask: proof first, action right after. */
function ImpactBand({ impact, termMembers }: ImpactBandProps) {
  const stats = [
    { value: formatImpact(impact.gifts), label: "phần quà trao tận tay" },
    { value: formatImpact(impact.lanterns), label: "lồng đèn Trung thu cho ấp đảo" },
    { value: formatImpact(impact.scholarships), label: "suất học bổng Ngòi Bút Nhỏ & Hoa Hướng Dương" },
    { value: String(impact.provinces), label: "tỉnh, thành phố có địa bàn" },
    ...(termMembers ? [{ value: String(termMembers.count), label: termMembers.label }] : []),
  ]

  return (
    <Section tone="white" spacing="lg" aria-labelledby="impact-title" containerClassName="flex flex-col items-center gap-10 md:gap-14">
      <SectionHeading
        id="impact-title"
        eyebrow="Dấu ấn 2024 — 2026"
        title="Những điều chúng mình đã cùng nhau viết nên"
        description="Mỗi con số được cộng từ kết quả các chương trình đã tổng kết trên fanpage."
        className="max-w-[820px] items-center text-center"
      />
      <dl className="grid w-full grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-5 md:gap-6">
        {stats.map((s, i) => (
          <div key={s.label} className={`flex flex-col items-center gap-3 text-center ${i === stats.length - 1 && stats.length % 2 === 1 ? "col-span-2 md:col-span-1" : ""}`}>
            <dd className="order-1 font-head text-[48px] leading-none font-medium text-flame-orange tabular-nums md:text-[64px]">
              <CountUp value={s.value} />
            </dd>
            <dt className="order-2 max-w-[22ch] text-[15px] leading-snug font-semibold text-ink md:text-base">{s.label}</dt>
          </div>
        ))}
      </dl>
      <Button asChild size="lg">
        <Link href={donateHref}>Ủng hộ ngay</Link>
      </Button>
    </Section>
  )
}

export { ImpactBand }
