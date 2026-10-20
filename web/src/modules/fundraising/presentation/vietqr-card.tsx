import { CardKicker, Card } from "@/shared/ui/card"
import { CopyField } from "@/shared/ui/copy-field"
import { formatVnd } from "@/shared/lib/format"

import type { Fund } from "../domain/fund"
import { buildVietQrPayload } from "../domain/vietqr"
import { QrCode } from "./qr-code"

type VietQrCardProps = {
  fund: Fund
  /** Chosen amount; null → a static QR where the donor types the amount in the banking app. */
  amount: number | null
  /** Transfer memo (the donation's reference code); null until it has been issued. */
  reference: string | null
}

function payloadFor(fund: Fund, amount: number | null, reference: string | null): string | null {
  if (!reference) return null
  try {
    return buildVietQrPayload({
      bankBin: fund.bankBin,
      accountNumber: fund.accountNumber,
      amount: amount ?? undefined,
      memo: reference,
    })
  } catch {
    return null // bad fund data: fall back to manual transfer details, which stay visible
  }
}

/** QR with amount + memo prefilled, plus the same details to copy for manual transfers. */
function VietQrCard({ fund, amount, reference }: VietQrCardProps) {
  const payload = payloadFor(fund, amount, reference)

  return (
    <Card padding="none" className="flex flex-col gap-6 p-5 md:flex-row md:gap-7 md:p-7">
      <div className="flex flex-col items-center gap-3 md:items-start">
        <div className="flex flex-col items-center gap-2.5 rounded-xl border border-line p-3.5">
          <p className="flex items-baseline gap-1.5">
            <span className="text-[13px] font-extrabold text-cta">VietQR</span>
            <span className="text-xs text-muted-ink">· Napas 247</span>
          </p>
          {payload ? (
            <QrCode value={payload} label={`Mã VietQR chuyển ${amount ? formatVnd(amount) : "số tiền tuỳ chọn"} tới ${fund.accountOwner}`} className="size-[200px] md:size-[188px]" />
          ) : (
            <div aria-hidden className="size-[200px] animate-pulse rounded-md bg-sand md:size-[188px]" />
          )}
        </div>
        <p className="max-w-[220px] text-center text-xs text-muted-ink md:text-left">Quét bằng ứng dụng ngân hàng hoặc ví điện tử</p>
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <CardKicker>2 · Quét mã hoặc chuyển khoản</CardKicker>
        <CopyField label="Ngân hàng" value={fund.bankName} copyable={false} />
        <CopyField label="Số tài khoản" value={fund.accountNumber} emphasis="large" />
        <CopyField label="Chủ tài khoản" value={fund.accountOwner} copyable={false} />
        <CopyField
          label="Số tiền"
          value={amount ? formatVnd(amount) : "Nhập khi chuyển khoản"}
          copyValue={amount ? String(amount) : undefined}
          copyable={Boolean(amount)}
        />
        <CopyField label="Nội dung chuyển khoản" value={reference ?? "Đang tạo mã…"} copyable={Boolean(reference)} emphasis="highlight" />
      </div>
    </Card>
  )
}

export { VietQrCard }
