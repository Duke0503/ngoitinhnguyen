import { Check } from "lucide-react"

import { Section } from "@/shared/layout/section"
import { formatVnd } from "@/shared/lib/format"
import { cn } from "@/shared/lib/utils"
import { CompareTable, type CompareRow } from "@/shared/ui/compare-table"
import { SectionHeading } from "@/shared/ui/section-heading"

import { sharedBenefits, tierSpecificBenefits, type TierPackage } from "../domain/sponsorship"

/** Tier benefits: a comparison table from `md`, cards with the shared benefits listed once on mobile. */
function TierSection({ pkg }: { pkg: TierPackage }) {
  const columns = pkg.tiers.map((t, i) => ({ key: t.key, title: t.name, subtitle: formatVnd(t.amount), highlight: i === 0 }))
  const rows: CompareRow[] = pkg.benefits.map((b) => ({ label: b.label, values: b.values }))
  const shared = sharedBenefits(pkg)
  const cashPercent = Math.round(pkg.minCashShare * 100)

  return (
    <Section spacing="lg" aria-labelledby="tiers-title" containerClassName="flex flex-col gap-6 md:gap-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-10">
        <SectionHeading
          id="tiers-title"
          eyebrow="Gói tài trợ"
          title="Quyền lợi theo từng gói"
          description={`Tham khảo từ chương trình ${pkg.referenceCampaign}. Mỗi chương trình có hồ sơ riêng.`}
          className="max-w-[640px]"
        />
        <p className="text-[13px] leading-normal text-muted-ink md:max-w-[320px]">
          Mức tài trợ được tính khi ≥ {cashPercent}% là hiện kim · có thể trao đổi thêm
        </p>
      </div>

      <div className="max-md:hidden">
        <CompareTable caption={`Quyền lợi theo gói tài trợ ${pkg.referenceCampaign}`} columns={columns} rows={rows} />
      </div>

      <ol className="flex flex-col gap-3 md:hidden">
        {pkg.tiers.map((t, i) => {
          const featured = i === 0
          return (
            <li key={t.key} className={cn("flex flex-col gap-2.5 rounded-xl p-[18px]", featured ? "bg-night" : "border border-line bg-white")}>
              <div className="flex items-end justify-between gap-3">
                <h3 className={cn("font-head text-xl font-semibold", featured ? "text-flame-gold" : "text-navy")}>{t.name}</h3>
                <p className={cn("text-sm font-bold tabular-nums", featured ? "text-white" : "text-navy")}>{formatVnd(t.amount)}</p>
              </div>
              <ul className="flex flex-col gap-2">
                {tierSpecificBenefits(pkg, t.key).map((b) => (
                  <li key={b.label} className="flex items-start gap-2 text-sm leading-snug">
                    <Check aria-hidden className={cn("mt-0.5 size-[15px] shrink-0", featured ? "text-flame-gold" : "text-cta")} />
                    <span className={featured ? "text-white/90" : "text-ink"}>
                      {b.short}
                      {b.value && <span className={cn("font-semibold", featured ? "text-white" : "text-navy")}>: {b.value}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          )
        })}
      </ol>

      <div className="rounded-lg bg-navy/5 p-4 md:hidden">
        <p className="mb-2 text-sm font-semibold text-navy">Mọi gói đều có:</p>
        <ul className="flex flex-col gap-1.5">
          {shared.map((b) => (
            <li key={b.label} className="flex items-start gap-2 text-[13px] leading-snug text-muted-ink">
              <Check aria-hidden className="mt-0.5 size-3.5 shrink-0 text-cta" />
              {b.short}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

export { TierSection }
