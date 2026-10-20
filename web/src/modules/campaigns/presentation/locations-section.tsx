import { countWord } from "@/shared/lib/format"
import { Callout } from "@/shared/ui/callout"
import { SectionHeading } from "@/shared/ui/section-heading"
import { BrandTabs, BrandTabsContent, BrandTabsList, BrandTabsTrigger } from "@/shared/ui/brand-tabs"

import { branchGroups, isFinished, type Campaign, type CampaignLocation } from "../domain/campaign"
import { LocationCard } from "./location-card"

function Grid({ locations, tracked }: { locations: CampaignLocation[]; tracked: boolean }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-5">
      {locations.map((l) => (
        <LocationCard key={l.name} location={l} resultsPending={tracked && !l.results?.length} />
      ))}
    </div>
  )
}

/** Locations of a campaign, grouped by branch (team) when the campaign had several. */
function LocationsSection({ campaign }: { campaign: Campaign }) {
  const count = campaign.locations.length
  const groups = branchGroups(campaign)
  const finished = isFinished(campaign)
  // Only flag a location as “pending” when the campaign records results per location at all.
  const tracked = finished && campaign.locations.some((l) => l.results?.length)
  const heading = `${countWord(count)} nơi chúng mình ${finished ? "đã đến" : "sẽ đến"}`

  return (
    <div className="flex flex-col gap-5 md:gap-6">
      <SectionHeading size="sm" eyebrow="Địa bàn" title={heading} />
      {campaign.notices?.map((n) => (
        <Callout key={n.text} tone="info">
          {n.text}
        </Callout>
      ))}
      {groups.length > 1 ? (
        <BrandTabs defaultValue={groups[0].name}>
          <BrandTabsList variant="responsive" aria-label="Chọn điểm cầu">
            {groups.map((g) => (
              <BrandTabsTrigger key={g.name} value={g.name}>
                {g.name}
              </BrandTabsTrigger>
            ))}
          </BrandTabsList>
          {groups.map((g) => (
            <BrandTabsContent key={g.name} value={g.name}>
              <Grid locations={g.locations} tracked={tracked} />
            </BrandTabsContent>
          ))}
        </BrandTabs>
      ) : (
        <Grid locations={campaign.locations} tracked={tracked} />
      )}
    </div>
  )
}

export { LocationsSection }
