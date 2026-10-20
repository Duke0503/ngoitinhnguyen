import Link from "next/link"

import { donateHref } from "@/shared/config/site"
import { formatVnd } from "@/shared/lib/format"
import { Button } from "@/shared/ui/button"
import { ProgressBar } from "@/shared/ui/progress-bar"
import { TextLink } from "@/shared/ui/text-link"

import { type FundProgress as FundProgressData } from "../domain/fundraising"

/** Raised / goal, progress bar and the donate action for one campaign fund. */
function FundProgress({ progress, campaignTitle }: { progress: FundProgressData; campaignTitle: string }) {
  return (
    <div className="flex flex-col gap-5 md:gap-6">
      <div className="flex flex-col gap-2.5">
        <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1">
          <p className="flex items-baseline gap-1.5">
            <span className="font-head text-2xl font-semibold text-navy tabular-nums md:text-[28px]">{formatVnd(progress.raised)}</span>
            <span className="text-sm text-muted-ink md:text-[15px]">/ {formatVnd(progress.goal)}</span>
          </p>
          <p className="text-[13px] text-muted-ink">{progress.donorCount} lượt ủng hộ</p>
        </div>
        <ProgressBar value={progress.raised} max={progress.goal} label={`Tiến độ gây quỹ ${campaignTitle}`} />
        {progress.illustrative && (
          <p className="text-xs text-muted-ink">Số liệu minh hoạ — sẽ cập nhật tự động khi ban tổ chức xác nhận khoản ủng hộ.</p>
        )}
      </div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-5">
        <Button asChild size="lg" className="max-md:w-full">
          <Link href={donateHref}>Góp {formatVnd(progress.certificateFrom ?? 50_000)}</Link>
        </Button>
        {progress.certificateFrom && (
          <TextLink href={donateHref} icon="none" underline size="sm" className="min-h-11">
            Nhận giấy chứng nhận có mộc đỏ
          </TextLink>
        )}
      </div>
    </div>
  )
}

export { FundProgress }
