import Link from "next/link"

import { routes } from "@/shared/config/routes"
import { Section } from "@/shared/layout/section"
import { formatMonthYear } from "@/shared/lib/format"
import { Chip } from "@/shared/ui/chip"
import { SectionHeading } from "@/shared/ui/section-heading"

import { displayTitle, isActive, provinceLine, resultFigures, statusLabel, type Campaign } from "../domain/campaign"

type ResultsTableProps = {
  campaigns: Campaign[]
  /** Campaign codes whose financial report is published; others show “chưa công bố”. */
  reportedCodes: string[]
}

/** Per-campaign outcome ledger: when, where, what was counted, and whether the financial report is out. */
function ResultsTable({ campaigns, reportedCodes }: ResultsTableProps) {
  return (
    <Section spacing="md" tone="white" aria-labelledby="results-title" containerClassName="flex flex-col gap-8 md:gap-10">
      <SectionHeading
        id="results-title"
        as="h2"
        size="md"
        eyebrow="Từng chương trình"
        title="Kết quả theo mùa"
        description="Số liệu lấy từ các bài tổng kết đã đăng trên fanpage. Chương trình chưa tổng kết chưa có số liệu."
      />
      <ul className="flex flex-col border-t border-line">
        {campaigns.map((c) => {
          const figures = resultFigures(c)
          const reported = reportedCodes.includes(c.code)
          return (
            <li key={c.slug} className="border-b border-line">
              <Link
                href={routes.campaign(c.slug)}
                className="group/row grid gap-3 py-5 md:grid-cols-[1.3fr_1fr_1.2fr_auto] md:items-center md:gap-8 md:py-6"
              >
                <div className="flex flex-col gap-1">
                  <time className="text-xs font-bold tracking-wider text-orange-ink">{formatMonthYear(c.onSiteDates[0] ?? c.startsOn)}</time>
                  <h3 className="font-head text-lg leading-snug font-semibold text-navy transition-colors group-hover/row:text-cta md:text-xl">{displayTitle(c)}</h3>
                </div>
                <p className="text-sm text-muted-ink">{provinceLine(c)}</p>
                <p className="text-[15px] leading-relaxed text-ink">{figures.length ? figures.join(" · ") : isActive(c) ? statusLabel(c) : "Chưa có số liệu"}</p>
                <Chip tone={reported ? "success" : "neutral"} size="sm" className="self-start md:self-center">
                  {reported ? "Báo cáo tài chính đã công khai" : "Báo cáo tài chính chưa công bố"}
                </Chip>
              </Link>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}

export { ResultsTable }
