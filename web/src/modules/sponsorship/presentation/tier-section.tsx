import { Check } from "lucide-react"

import { Section } from "@/shared/layout/section"
import { formatVnd } from "@/shared/lib/format"
import { cn } from "@/shared/lib/utils"
import { CompareTable, type CompareRow } from "@/shared/ui/compare-table"
import { SnapRow } from "@/shared/ui/snap-row"

import { tierSpecificBenefits, type TierPackage } from "../domain/sponsorship"

// One colour per tier, darkest first. Text on all of them is white (≥ 4.5:1).
const headColours = ["bg-navy", "bg-[#8a6100]", "bg-[#5b6075]", "bg-[#a2481f]", "bg-[#2f5c17]"]

/** Five tier cards of equal height (key benefits only), with the full comparison table folded underneath. */
function TierSection({ pkg }: { pkg: TierPackage }) {
  const cashPercent = Math.round(pkg.minCashShare * 100)
  const rows: CompareRow[] = pkg.benefits.map((b) => ({ label: b.label, values: b.values }))
  const columns = pkg.tiers.map((t, i) => ({ key: t.key, title: t.name, subtitle: formatVnd(t.amount), highlight: i === 0 }))

  return (
    <Section tone="paper" spacing="lg" className="bg-sand" aria-labelledby="tiers-title" containerClassName="flex flex-col items-center gap-8 md:gap-11">
      <div className="flex flex-col gap-2.5 max-md:self-start md:items-center md:text-center">
        <h2 id="tiers-title" className="font-head text-[30px] leading-[1.15] font-semibold text-navy md:text-[44px]">
          Các cách đồng hành
        </h2>
        <p className="text-[15px] text-muted-ink md:text-lg">
          Năm mức tài trợ cho chương trình {pkg.referenceCampaign}; mức tài trợ tính khi ≥ {cashPercent}% bằng tiền mặt.
        </p>
      </div>

      <div className="w-full">
        <SnapRow aria-label="Các gói tài trợ" gridClassName="md:grid md:grid-cols-5 md:gap-5">
          {pkg.tiers.map((t, i) => {
            const benefits = tierSpecificBenefits(pkg, t.key).slice(0, 4)
            return (
              <div key={t.key} className={cn("flex h-full flex-col overflow-hidden rounded-[10px] bg-white md:min-h-[290px]", i === 0 ? "border-2 border-flame-orange" : "border border-line")}>
                <div className={cn("flex flex-col gap-1 px-5 py-[18px] text-white md:py-[22px]", headColours[i % headColours.length])}>
                  <p className="text-xs font-bold tracking-[0.16em] text-white/80 uppercase">{t.name}</p>
                  <p className="font-head text-[22px] font-semibold md:text-[26px]">{formatVnd(t.amount)}</p>
                </div>
                <ul className="flex flex-col gap-3 p-5">
                  {benefits.map((b) => (
                    <li key={b.label} className="flex items-start gap-2.5 text-sm leading-snug">
                      <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-leaf" />
                      <span>{b.value ? `${b.short}: ${b.value}` : b.short}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </SnapRow>
      </div>

      <details className="group/compare w-full">
        <summary className="mx-auto flex w-fit cursor-pointer list-none items-center gap-2 text-[15px] font-semibold text-navy underline underline-offset-4 outline-none focus-visible:ring-3 focus-visible:ring-navy/25 [&::-webkit-details-marker]:hidden">Xem bảng so sánh đầy đủ quyền lợi</summary>
        <div className="mt-6 overflow-x-auto rounded-lg bg-white">
          <CompareTable caption={`Quyền lợi theo gói tài trợ ${pkg.referenceCampaign}`} columns={columns} rows={rows} />
        </div>
      </details>
    </Section>
  )
}

export { TierSection }
