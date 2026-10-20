"use client"

import * as React from "react"
import Link from "next/link"
import { Check } from "lucide-react"

import { Button } from "@/shared/ui/button"
import { CopyField } from "@/shared/ui/copy-field"

type DonationSuccessProps = {
  donorName: string
  referenceCode: string
  campaignTitle: string
  campaignHref: string
  onDonateAgain: () => void
}

/** Shown after the donor confirms their transfer; the donation is `pending` until finance confirms it. */
function DonationSuccess({ donorName, referenceCode, campaignTitle, campaignHref, onDonateAgain }: DonationSuccessProps) {
  // Move focus here when it appears: screen readers announce it and the donor is brought to it.
  const ref = React.useRef<HTMLElement>(null)
  React.useEffect(() => {
    ref.current?.focus()
    ref.current?.scrollIntoView({ block: "nearest", behavior: "smooth" })
  }, [])

  return (
    <section ref={ref} tabIndex={-1} aria-labelledby="donation-success-title" className="flex flex-col gap-5 rounded-xl bg-night p-6 text-white outline-none md:p-8">
      <div className="flex items-start gap-3">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-leaf">
          <Check aria-hidden className="size-[18px]" strokeWidth={3} />
        </span>
        <h2 id="donation-success-title" className="font-head text-[22px] leading-snug font-semibold">
          Cảm ơn bạn, {donorName}!
        </h2>
      </div>
      <p className="text-[15px] leading-relaxed text-white/80">
        Khoản ủng hộ của bạn đang chờ ban tổ chức đối soát và xác nhận. Khi được xác nhận, khoản ủng hộ sẽ hiện trong danh sách
        và tiến độ của {campaignTitle}.
      </p>
      <div className="rounded-lg bg-white/8 px-4 py-1">
        <CopyField tone="dark" label="Mã tra cứu của bạn" value={referenceCode} emphasis="large" />
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button variant="gold" size="sm" className="h-12" onClick={onDonateAgain}>
          Ủng hộ thêm
        </Button>
        <Button asChild variant="outline-light" size="sm" className="h-12">
          <Link href={campaignHref}>Xem chương trình</Link>
        </Button>
      </div>
    </section>
  )
}

export { DonationSuccess }
