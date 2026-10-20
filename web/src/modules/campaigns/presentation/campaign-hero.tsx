import { routes } from "@/shared/config/routes"
import Image from "next/image"

import { Breadcrumb } from "@/shared/layout/breadcrumb"
import { Section } from "@/shared/layout/section"
import { formatRange } from "@/shared/lib/format"
import { Chip } from "@/shared/ui/chip"
import { Stat } from "@/shared/ui/stat"
import { CalendarDays, Check, Radio } from "lucide-react"

import { displayTitle, isFinished, keyStats, statusLabel, type Campaign } from "../domain/campaign"

/** Night hero of a campaign page: breadcrumb, status, title, slogan, headline figures and photo. */
function CampaignHero({ campaign }: { campaign: Campaign }) {
  const photo = campaign.hero ?? campaign.cover
  const stats = keyStats(campaign)
  const finished = isFinished(campaign)

  return (
    <Section
      tone="night"
      spacing="none"
      className="pt-7 pb-10 md:pt-14 md:pb-[72px]"
      aria-labelledby="campaign-title"
      containerClassName="grid gap-5 md:grid-cols-[1fr_540px] md:items-center md:gap-16 md:gap-y-0"
    >
      <div className="flex flex-col gap-5 md:gap-6 max-md:contents">
        <Breadcrumb
          tone="dark"
          className="max-md:hidden"
          items={[{ label: "Trang chủ", href: "/" }, { label: "Chương trình", href: routes.campaigns }, { label: displayTitle(campaign) }]}
        />
        <div className="flex flex-wrap gap-2 md:gap-2.5">
          <Chip tone={finished ? "success-dark" : "translucent"} icon={finished ? <Check aria-hidden /> : <Radio aria-hidden />}>
            {statusLabel(campaign)}
          </Chip>
          <Chip tone="translucent" icon={<CalendarDays aria-hidden />}>
            {formatRange(campaign.startsOn, campaign.endsOn)}
          </Chip>
        </div>
        <h1 id="campaign-title" className="font-head text-[32px] leading-[1.12] font-semibold text-balance text-white md:text-[54px] md:leading-[1.08]">
          {campaign.title}
        </h1>
        {campaign.slogan && <p className="font-head text-[17px] text-moon italic md:text-[22px]">“{campaign.slogan}”</p>}

        <dl className="grid grid-cols-2 gap-x-4 gap-y-4 max-md:order-last md:flex md:pt-3">
          {stats.map((s, i) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <Stat
                  tone="dark"
                  size="md"
                  divider="responsive"
                  value={s.value}
                  label={s.label}
                  className={i === 0 ? "md:border-l-0 md:pr-7 md:pl-0" : "md:px-7"}
                />
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="relative aspect-[5/3] overflow-hidden rounded-md md:aspect-[27/20]">
        <Image src={photo.src} alt={photo.alt} fill preload sizes="(min-width: 768px) 540px, 100vw" className="object-cover" />
      </div>
    </Section>
  )
}

export { CampaignHero }
