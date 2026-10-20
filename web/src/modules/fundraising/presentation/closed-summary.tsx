import Link from "next/link"

import { routes } from "@/shared/config/routes"
import { FileText } from "lucide-react"

import { formatVnd } from "@/shared/lib/format"
import { Button } from "@/shared/ui/button"
import { Card, CardKicker } from "@/shared/ui/card"
import { TextLink } from "@/shared/ui/text-link"

import type { FundSummary } from "../domain/fundraising"

const reportHref = routes.impact

function note(s: FundSummary) {
  return `đã nhận từ ${s.donorCount} lượt ủng hộ${s.illustrative ? " · minh hoạ" : ""}`
}

/** Sidebar card of a closed campaign: what was raised and where to read the report. */
function ClosedSummary({ summary }: { summary: FundSummary }) {
  return (
    <Card padding="none" className="flex flex-col gap-4 p-6">
      <CardKicker>Tổng kết</CardKicker>
      <p className="font-head text-[30px] leading-none font-semibold text-navy tabular-nums">{formatVnd(summary.raised)}</p>
      <p className="text-[13px] text-muted-ink">{note(summary)}</p>
      <span aria-hidden className="block h-2 rounded-full bg-flame" />
      <div className="border-t border-line pt-3">
        <TextLink href={reportHref} icon="none" underline size="sm" leading={<FileText aria-hidden className="size-4" />}>
          Xem báo cáo thu — chi
        </TextLink>
      </div>
    </Card>
  )
}

/** Mobile counterpart: a compact bar under the hero. */
function SummaryBar({ summary }: { summary: FundSummary }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-line bg-white px-5 py-4">
      <div className="flex flex-col gap-0.5">
        <p className="font-head text-xl font-semibold text-navy tabular-nums">{formatVnd(summary.raised)}</p>
        <p className="text-xs text-muted-ink">{note(summary)}</p>
      </div>
      <Button asChild variant="outline" size="sm" className="h-11 shrink-0">
        <Link href={reportHref}>
          <FileText aria-hidden />
          Báo cáo
        </Link>
      </Button>
    </div>
  )
}

export { ClosedSummary, SummaryBar }
