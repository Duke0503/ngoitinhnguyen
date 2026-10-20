import Image from "next/image"
import { Check, Radio } from "lucide-react"

import { routes } from "@/shared/config/routes"
import { Breadcrumb } from "@/shared/layout/breadcrumb"
import { formatRange } from "@/shared/lib/format"
import { Chip } from "@/shared/ui/chip"

import { displayTitle, isFinished, keyStats, statusLabel, type Campaign } from "../domain/campaign"

/** Photo hero of a campaign page: breadcrumb, status, title, slogan, and the headline figures in a strip over the slanted edge. */
function CampaignHero({ campaign }: { campaign: Campaign }) {
  const photo = campaign.hero ?? campaign.cover
  const stats = keyStats(campaign)
  const finished = isFinished(campaign)

  return (
    <section aria-labelledby="campaign-title" className="relative isolate overflow-hidden bg-night text-white">
      <Image src={photo.src} alt="" fill preload sizes="100vw" className="hero-settle -z-20 object-cover object-[50%_35%]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-night/80" />
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-4 px-5 pt-8 pb-44 text-center md:gap-4 md:px-10 md:pt-14 md:pb-52">
        <Breadcrumb tone="dark" className="max-md:hidden" items={[{ label: "Trang chủ", href: routes.home }, { label: "Chương trình", href: routes.campaigns }, { label: displayTitle(campaign) }]} />
        <div className="flex flex-wrap justify-center gap-2 md:gap-2.5">
          <Chip tone={finished ? "success-dark" : "translucent"} icon={finished ? <Check aria-hidden /> : <Radio aria-hidden />}>
            {statusLabel(campaign)}
          </Chip>
          <Chip tone="translucent">{formatRange(campaign.startsOn, campaign.endsOn)}</Chip>
        </div>
        <h1 id="campaign-title" className="max-w-[1000px] font-head text-[34px] leading-[1.08] font-semibold text-balance md:text-[60px] md:leading-[1.07]">
          {campaign.title}
        </h1>
        {campaign.slogan && <p className="max-w-[800px] font-head text-lg font-medium text-flame-gold italic md:text-2xl">“{campaign.slogan}”</p>}
      </div>

      <dl className="absolute inset-x-5 bottom-14 mx-auto flex max-w-[1100px] justify-between rounded-xl bg-white/12 px-3.5 py-4 backdrop-blur-sm md:bottom-24 md:px-8">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col items-center gap-0.5">
            <dd className="order-1 font-head text-[26px] leading-none font-medium text-flame-gold tabular-nums md:text-[38px]">{s.value}</dd>
            <dt className="order-2 text-xs text-white/85 md:text-sm">{s.label}</dt>
          </div>
        ))}
      </dl>
      <div aria-hidden className="absolute inset-x-0 bottom-[-1px] h-11 bg-paper [clip-path:polygon(0_100%,100%_100%,100%_0)] md:h-[74px]" />
    </section>
  )
}

export { CampaignHero }
