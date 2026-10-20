"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

import { routes } from "@/shared/config/routes"
import { Section } from "@/shared/layout/section"
import { formatMonthYear } from "@/shared/lib/format"
import { cn } from "@/shared/lib/utils"
import { Chip } from "@/shared/ui/chip"

import { displayTitle, isActive, provinceLine, seriesLabel, statusLabel, type Campaign, type CampaignSeries } from "../domain/campaign"

const ALL = "all"

/** Every campaign, newest first, with a series filter (reading, mid-autumn, spring, 20/10). */
function CampaignList({ campaigns }: { campaigns: Campaign[] }) {
  const [series, setSeries] = useState<CampaignSeries | typeof ALL>(ALL)
  const present = [...new Set(campaigns.map((c) => c.series))]
  const options = [{ key: ALL, label: "Tất cả", count: campaigns.length }, ...present.map((s) => ({ key: s, label: seriesLabel(s), count: campaigns.filter((c) => c.series === s).length }))]
  const visible = campaigns.filter((c) => series === ALL || c.series === series)

  return (
    <Section spacing="none" tone="white" className="pt-8 pb-14 md:pt-12 md:pb-24" aria-label="Danh sách chương trình" containerClassName="flex flex-col gap-8 md:gap-12">
      <div role="group" aria-label="Lọc theo dòng chương trình" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:pb-0">
        {options.map((o) => {
          const on = o.key === series
          return (
            <button
              key={o.key}
              type="button"
              aria-pressed={on}
              onClick={() => setSeries(o.key as typeof series)}
              className={cn(
                "inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-4 text-sm font-medium transition-colors outline-none focus-visible:ring-3 focus-visible:ring-navy/20",
                on ? "border-navy bg-navy text-white" : "border-field bg-white text-navy hover:border-navy/50"
              )}
            >
              {o.label}
              <span className={cn("text-xs tabular-nums", on ? "text-white/70" : "text-muted-ink")}>{o.count}</span>
            </button>
          )
        })}
      </div>

      <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 md:gap-y-14">
        {visible.map((c, i) => (
          <li key={c.slug}>
            <Link href={routes.campaign(c.slug)} className="group/campaign flex h-full flex-col gap-3.5 md:gap-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-navy/5">
                <Image
                  src={c.cover.src}
                  alt={c.cover.alt}
                  fill
                  priority={i < 3}
                  sizes="(min-width: 1200px) 384px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover/campaign:scale-[1.03] motion-reduce:transition-none"
                />
                <Chip tone={isActive(c) ? "navy" : "outline"} size="sm" className="absolute top-3 left-3">
                  {statusLabel(c)}
                </Chip>
              </div>
              <p className="flex items-center gap-2.5 text-xs">
                <span className="font-bold tracking-[0.08em] text-flame-orange uppercase">{seriesLabel(c.series)}</span>
                <span aria-hidden className="size-[3px] rounded-full bg-muted-ink" />
                <time className="text-muted-ink">{formatMonthYear(c.onSiteDates[0] ?? c.startsOn)}</time>
              </p>
              <h3 className="font-head text-xl leading-snug font-semibold text-navy transition-colors group-hover/campaign:text-cta md:text-[22px]">{displayTitle(c)}</h3>
              <p className="text-sm text-muted-ink">{provinceLine(c)}</p>
              <p className="text-[15px] leading-relaxed text-ink">{c.highlight}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export { CampaignList }
