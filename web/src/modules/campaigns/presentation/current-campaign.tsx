import { routes } from "@/shared/config/routes"
import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, MapPin } from "lucide-react"

import { Section } from "@/shared/layout/section"
import { formatDayList } from "@/shared/lib/format"
import { Chip } from "@/shared/ui/chip"
import { Eyebrow } from "@/shared/ui/eyebrow"
import { MetaItem } from "@/shared/ui/meta"

import type { Campaign } from "../domain/campaign"

type CurrentCampaignProps = {
  campaign: Campaign
  /** Rendered by the Fundraising module (progress + donate actions); this context does not know about money. */
  fundraising?: React.ReactNode
}

function CurrentCampaign({ campaign, fundraising }: CurrentCampaignProps) {
  return (
    <Section spacing="lg" aria-labelledby="current-title" containerClassName="flex flex-col gap-8 md:gap-10">
      <div className="flex flex-col gap-2.5 md:gap-3">
        <Eyebrow tone="cta" marker="dot">
          Chương trình đang diễn ra
        </Eyebrow>
        <h2 id="current-title" className="font-head text-[30px] leading-tight font-semibold text-navy md:text-h1">
          {campaign.title}
        </h2>
      </div>

      <article className="grid overflow-hidden rounded-xl border border-line bg-white md:grid-cols-[600px_1fr]">
        <Link href={routes.campaign(campaign.slug)} className="relative block aspect-[5/3] md:aspect-auto md:min-h-[420px]">
          <Image src={campaign.cover.src} alt={campaign.cover.alt} fill sizes="(min-width: 768px) 600px, 100vw" className="object-cover" />
        </Link>
        <div className="flex flex-col gap-5 p-5 md:gap-6 md:px-12 md:py-11">
          {campaign.occasion && (
            <Chip tone="blossom" className="self-start">
              {campaign.occasion}
            </Chip>
          )}
          {campaign.slogan && (
            <p className="font-head text-[21px] leading-snug text-navy italic md:text-[26px]">“{campaign.slogan}”</p>
          )}
          {campaign.summary && <p className="text-[15px] leading-relaxed text-muted-ink md:text-base">{campaign.summary}</p>}
          <div className="flex flex-col gap-2 md:flex-row md:flex-wrap md:gap-7">
            <MetaItem icon={Calendar}>{formatDayList(campaign.onSiteDates)}</MetaItem>
            {campaign.locations.map((l) => (
              <MetaItem key={l.name} icon={MapPin}>
                {l.name}, {l.province}
              </MetaItem>
            ))}
          </div>
          {fundraising}
        </div>
      </article>
    </Section>
  )
}

export { CurrentCampaign }
