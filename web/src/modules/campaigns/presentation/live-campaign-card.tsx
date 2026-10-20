import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import { routes } from "@/shared/config/routes"
import { Section } from "@/shared/layout/section"
import { formatDayList } from "@/shared/lib/format"

import type { Campaign } from "../domain/campaign"

/** Pinned above the list for every campaign whose status is active; the page renders none when there is none. */
function LiveCampaignCard({ campaign, fundraising }: { campaign: Campaign; fundraising?: React.ReactNode }) {
  return (
    <Section spacing="none" tone="paper" className="pt-8 pb-4 md:pt-10" aria-labelledby={`live-${campaign.slug}`} containerClassName="flex flex-col gap-3">
      <p className="flex items-center gap-2.5 text-xs font-bold tracking-[0.16em] text-cta uppercase">
        <span aria-hidden className="size-2 rounded-full bg-ember" />
        Đang gây quỹ
      </p>
      <article className="grid overflow-hidden rounded-[18px] bg-navy text-white shadow-[0_20px_44px_-16px_rgba(11,18,51,0.5)] md:grid-cols-[520px_1fr]">
        <Link href={routes.campaign(campaign.slug)} className="relative block aspect-[4/3] md:aspect-auto md:min-h-[440px]">
          <Image src={campaign.cover.src} alt={campaign.cover.alt} fill sizes="(min-width: 768px) 520px, 100vw" className="object-cover" />
        </Link>
        <div className="flex flex-col justify-center gap-4 p-6 md:gap-5 md:p-12">
          <p className="text-xs font-bold tracking-[0.16em] text-flame-gold uppercase">
            {campaign.occasion ? `${campaign.occasion} · ` : ""}
            {formatDayList(campaign.onSiteDates)}
          </p>
          <h2 id={`live-${campaign.slug}`} className="font-head text-[30px] leading-tight font-semibold md:text-5xl">
            {campaign.shortTitle ?? campaign.title}
          </h2>
          {campaign.slogan && <p className="font-head text-lg leading-snug text-flame-gold italic md:text-[22px]">“{campaign.slogan}”</p>}
          {campaign.summary && <p className="text-[15px] leading-relaxed text-white/85 md:text-base">{campaign.summary}</p>}
          {fundraising && <div className="rounded-xl bg-white p-4 md:p-5">{fundraising}</div>}
        </div>
      </article>
    </Section>
  )
}

export { LiveCampaignCard }
