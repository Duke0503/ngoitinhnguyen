import { routes } from "@/shared/config/routes"
import Image from "next/image"
import Link from "next/link"

import { Section } from "@/shared/layout/section"
import { formatMonthYear } from "@/shared/lib/format"
import { SectionHeading } from "@/shared/ui/section-heading"
import { TextLink } from "@/shared/ui/text-link"

import { displayTitle, provinceLine, type Campaign } from "../domain/campaign"

/** “Mỗi mùa một trang viết mới” timeline of finished campaigns. */
function Journey({ campaigns }: { campaigns: Campaign[] }) {
  return (
    <Section spacing="none" className="pb-14 md:pb-[104px]" aria-labelledby="journey-title" containerClassName="flex flex-col gap-8 md:gap-12">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <SectionHeading id="journey-title" eyebrow="Hành trình của Ngòi" title="Mỗi mùa một trang viết mới" className="max-w-[640px]" />
        <TextLink href={routes.campaigns} className="max-md:hidden">
          Xem tất cả chương trình
        </TextLink>
      </div>

      <ol className="flex flex-col md:grid md:grid-cols-4 md:gap-6">
        {campaigns.map((c, i) => (
          <li key={c.slug}>
            <Link
              href={routes.campaign(c.slug)}
              className="group/stop flex items-center gap-4 border-t border-line py-4 md:flex-col md:items-stretch md:gap-4 md:border-t-0 md:py-0"
            >
              <div className="relative h-20 w-[104px] shrink-0 overflow-hidden rounded-md md:h-[220px] md:w-full">
                <Image
                  src={c.cover.src}
                  alt={c.cover.alt}
                  fill
                  sizes="(min-width: 768px) 282px, 104px"
                  className="object-cover transition-transform duration-500 group-hover/stop:scale-[1.03]"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1 md:gap-3">
                <div className="flex items-center gap-2.5">
                  <time className="text-xs font-bold tracking-wider text-orange-ink md:text-[13px]">{formatMonthYear(c.onSiteDates[0])}</time>
                  <span aria-hidden className="hidden h-px flex-1 bg-line md:block" />
                </div>
                <h3 className="font-head text-[17px] leading-snug font-semibold text-navy transition-colors group-hover/stop:text-cta md:text-[21px]">
                  {displayTitle(c)}
                </h3>
                <p className="hidden text-sm text-muted-ink md:block">{provinceLine(c)}</p>
                <p className="text-[13px] text-muted-ink md:text-[15px] md:leading-snug md:font-medium md:text-ink">{c.highlight}</p>
              </div>
            </Link>
            {i === campaigns.length - 1 && <span aria-hidden className="block border-b border-line md:hidden" />}
          </li>
        ))}
      </ol>

      <TextLink href={routes.campaigns} className="md:hidden">
        Xem tất cả chương trình
      </TextLink>
    </Section>
  )
}

export { Journey }
