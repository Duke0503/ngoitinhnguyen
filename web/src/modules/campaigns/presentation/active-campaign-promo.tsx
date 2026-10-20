import Link from "next/link"

import { donateHref } from "@/shared/config/site"
import { Button } from "@/shared/ui/button"
import { Eyebrow } from "@/shared/ui/eyebrow"

import { displayTitle, type Campaign } from "../domain/campaign"

type ActiveCampaignPromoProps = {
  campaign: Campaign
  /** Optional offer text supplied by Fundraising, e.g. “góp 25.000đ, nhận giấy chứng nhận”. */
  offer?: string
  className?: string
}

/** Points visitors of a finished campaign to the one currently running. */
function ActiveCampaignPromo({ campaign, offer, className }: ActiveCampaignPromoProps) {
  const name = displayTitle(campaign)
  return (
    <aside aria-label="Chương trình đang diễn ra" className={`flex flex-col gap-3.5 rounded-xl bg-night p-6 ${className ?? ""}`}>
      <Eyebrow tone="gold" className="text-[11px]">
        Đang diễn ra
      </Eyebrow>
      <p className="font-head text-xl leading-snug font-semibold text-white">{offer ? `${name} — ${offer}` : name}</p>
      <Button asChild fullWidth size="sm" className="h-12 text-[15px]">
        <Link href={donateHref}>Ủng hộ {name}</Link>
      </Button>
    </aside>
  )
}

export { ActiveCampaignPromo }
