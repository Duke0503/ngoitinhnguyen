import { routes } from "@/shared/config/routes"
import { Check } from "lucide-react"

import { Section } from "@/shared/layout/section"
import { formatVnd } from "@/shared/lib/format"
import { Card, CardKicker } from "@/shared/ui/card"
import { Chip } from "@/shared/ui/chip"
import { MeterRow } from "@/shared/ui/meter-row"
import { SectionHeading } from "@/shared/ui/section-heading"
import { TextLink } from "@/shared/ui/text-link"

import { balance, shareOfLargest, total, type FinancialReport, type ReportLine } from "../domain/fundraising"

function Column({ title, lines, tone }: { title: string; lines: ReportLine[]; tone: "navy" | "orange" }) {
  return (
    <div className="flex flex-col gap-3 md:gap-4">
      <div className="flex justify-between text-sm">
        <span className="font-semibold text-ink">{title}</span>
        <span className="font-bold text-navy tabular-nums">{formatVnd(total(lines))}</span>
      </div>
      {lines.map((l) => (
        <MeterRow key={l.label} label={l.label} value={formatVnd(l.amount)} ratio={shareOfLargest(lines, l)} tone={tone} />
      ))}
    </div>
  )
}

/** “Minh bạch từng đồng”: money in by source, money out by item, balance carried over. */
function Transparency({ report, archiveLink = true }: { report: FinancialReport; archiveLink?: boolean }) {
  return (
    <Section spacing="lg" tone="paper" className="bg-[#e8f0f7]" aria-labelledby="transparency-title" containerClassName="grid gap-8 md:grid-cols-[440px_1fr] md:items-center md:gap-[72px]">
      <div className="flex flex-col gap-5 md:gap-6">
        <SectionHeading
          id="transparency-title"
          eyebrow="Minh bạch từng đồng"
          title="Mỗi khoản góp đều có nơi để đến"
          description="Sau mỗi chương trình, Ngòi công khai tổng thu theo từng nguồn và từng khoản chi theo dự trù — để bạn biết món quà của mình đã thành điều gì."
        />
        {archiveLink && (
          <TextLink href={routes.impact} icon="none" underline className="max-md:hidden">
            Xem báo cáo các chương trình
          </TextLink>
        )}
      </div>

      <Card padding="none" className="flex flex-col gap-6 p-5 md:gap-7 md:p-10">
        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-1">
            <CardKicker>Báo cáo tài chính{report.illustrative && " · minh hoạ"}</CardKicker>
            <p className="font-head text-xl font-semibold text-navy md:text-[22px]">{report.campaignTitle}</p>
          </div>
          {report.status === "published" && (
            <Chip tone="success" icon={<Check aria-hidden />} className="self-start">
              Đã công khai
            </Chip>
          )}
        </div>
        <div className="grid gap-6 md:grid-cols-2 md:gap-10">
          <Column title="Tiền vào" lines={report.income} tone="navy" />
          <Column title="Tiền ra" lines={report.expenses} tone="orange" />
        </div>
        <div className="flex items-baseline justify-between border-t border-line pt-4">
          <span className="text-[13px] text-muted-ink md:text-sm">Chuyển sang chương trình kế tiếp</span>
          <span className="font-head text-lg font-semibold text-navy tabular-nums md:text-xl">{formatVnd(balance(report))}</span>
        </div>
      </Card>
    </Section>
  )
}

export { Transparency }
