import { Card, CardKicker } from "@/shared/ui/card"

import type { CampaignLead } from "../domain/campaign"

function CampaignContact({ lead }: { lead: CampaignLead }) {
  return (
    <Card padding="none" className="flex flex-col gap-1.5 p-6">
      <CardKicker>Ban tổ chức chương trình</CardKicker>
      <p className="font-head text-lg font-semibold text-navy">{lead.name}</p>
      <p className="text-[13px] text-muted-ink">{lead.role}</p>
    </Card>
  )
}

export { CampaignContact }
