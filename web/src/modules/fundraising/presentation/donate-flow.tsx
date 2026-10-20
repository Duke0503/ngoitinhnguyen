"use client"

import * as React from "react"
import { Dot } from "lucide-react"

import { cryptoRandomInt } from "@/shared/lib/reference-code"
import { Card } from "@/shared/ui/card"
import { Steps } from "@/shared/ui/steps"

import { makeReferenceCode, type Fund } from "../domain/fund"
import { AmountPicker } from "./amount-picker"
import { ConfirmForm } from "./confirm-form"
import { DonationSuccess } from "./donation-success"
import { VietQrCard } from "./vietqr-card"

type DonateFlowProps = {
  fund: Fund
  /** Server-rendered page heading (title + intro); the step indicator sits beside it. */
  heading: React.ReactNode
  campaignTitle: string
  campaignHref: string
}

const stepLabels = ["Chọn số tiền", "Chuyển khoản", "Xác nhận"]

const tips = [
  "Giữ nguyên nội dung chuyển khoản (mã của bạn) để ban tổ chức đối soát nhanh hơn.",
  "Đã gửi rồi? Bạn có thể tra cứu trạng thái bằng mã của mình.",
]

/**
 * Client-side donation flow: choose amount → scan QR / copy details → confirm.
 * The reference code is random per visitor, so it is created after mount
 * (not during prerender) and renewed after each donation.
 */
function DonateFlow({ fund, heading, campaignTitle, campaignHref }: DonateFlowProps) {
  const [amount, setAmount] = React.useState<number | null>(fund.presets[0] ?? null)
  const [reference, setReference] = React.useState<string | null>(null)
  const [done, setDone] = React.useState<{ referenceCode: string; donorName: string } | null>(null)

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- random value must not exist during prerender
    setReference(makeReferenceCode(fund.campaignCode, cryptoRandomInt))
  }, [fund.campaignCode])

  function donateAgain() {
    setDone(null)
    setAmount(fund.presets[0] ?? null)
    setReference(makeReferenceCode(fund.campaignCode, cryptoRandomInt))
  }

  return (
    <div className="flex flex-col gap-6 md:gap-10">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        {heading}
        <Steps steps={stepLabels} current={done ? 2 : 1} className="shrink-0 md:pb-2" />
      </div>

      <div className="flex flex-col gap-4 md:grid md:grid-cols-[1fr_460px] md:items-start md:gap-8">
        <div className="flex flex-col gap-4 max-md:contents md:gap-6">
          <div className="max-md:order-1">
            <AmountPicker presets={fund.presets} value={amount} onValueChange={setAmount} certificateFrom={fund.certificateFrom} />
          </div>
          <div className="max-md:order-2">
            <VietQrCard fund={fund} amount={amount} reference={reference} />
          </div>
          <Card tone="amber" padding="none" className="flex flex-col gap-2.5 px-6 py-5 max-md:order-4">
            <p className="text-[11px] font-bold tracking-[0.14em] text-amber-ink uppercase">Lưu ý</p>
            <ul className="flex flex-col gap-2.5">
              {[...tips, "Đã gửi rồi? Bạn có thể tra cứu trạng thái bằng mã của mình."].map((t) => (
                <li key={t} className="flex items-start gap-1 text-sm leading-normal">
                  <Dot aria-hidden className="mt-px size-5 shrink-0 text-amber-ink" />
                  {t}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="max-md:order-3">
          {done ? (
            <DonationSuccess
              donorName={done.donorName}
              referenceCode={done.referenceCode}
              campaignTitle={campaignTitle}
              campaignHref={campaignHref}
              onDonateAgain={donateAgain}
            />
          ) : (
            <ConfirmForm fund={fund} reference={reference} suggestedAmount={amount} onSubmitted={setDone} />
          )}
        </div>
      </div>
    </div>
  )
}

export { DonateFlow }
