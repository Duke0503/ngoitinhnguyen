import { formatVnd } from "@/shared/lib/format"
import { SectionHeading } from "@/shared/ui/section-heading"

import { donorDisplayName, type DonorEntry } from "../domain/fundraising"

type DonorListProps = {
  donors: DonorEntry[]
  illustrative?: boolean
}

/** Public list of confirmed donations. Donors can hide their name (“Ẩn danh”). */
function DonorList({ donors, illustrative }: DonorListProps) {
  if (donors.length === 0) return null
  return (
    <div className="flex flex-col gap-5">
      <SectionHeading
        size="sm"
        eyebrow="Những tấm lòng"
        title="Danh sách ủng hộ"
        description={`Chỉ hiển thị khoản đã được ban tổ chức xác nhận. Người ủng hộ có thể chọn ẩn danh.${illustrative ? " (Số liệu minh hoạ)" : ""}`}
      />
      <div className="overflow-hidden rounded-xl border border-line bg-white">
        <div
          aria-hidden
          className="hidden grid-cols-[200px_1fr_auto] gap-4 border-b border-line px-5 py-3.5 text-xs font-semibold tracking-wider text-muted-ink uppercase md:grid"
        >
          <span>Người ủng hộ</span>
          <span>Lời nhắn</span>
          <span className="text-right">Số tiền</span>
        </div>
        <ul>
          {donors.map((d, i) => (
            <li
              key={`${donorDisplayName(d)}-${i}`}
              className="flex items-start justify-between gap-4 border-b border-line px-4 py-3.5 last:border-b-0 md:grid md:grid-cols-[200px_1fr_auto] md:items-center md:px-5"
            >
              <div className="flex min-w-0 flex-col gap-0.5 md:contents">
                <span className="text-sm font-semibold text-ink">{donorDisplayName(d)}</span>
                <span className="text-[13px] text-muted-ink md:text-sm">{d.message}</span>
              </div>
              <span className="text-sm font-bold whitespace-nowrap text-navy tabular-nums md:text-right">{formatVnd(d.amount)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export { DonorList }
