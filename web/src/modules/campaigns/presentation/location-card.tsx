import Image from "next/image"
import { CalendarDays, MapPin } from "lucide-react"

import { formatDayList } from "@/shared/lib/format"

import { formatImpact, resultNoun, type CampaignLocation } from "../domain/campaign"

type LocationCardProps = {
  location: CampaignLocation
  /** True when this campaign records results per location and this one has none yet. */
  resultsPending: boolean
}

function LocationCard({ location: l, resultsPending }: LocationCardProps) {
  const results = l.results ?? []
  return (
    <article className="flex flex-col overflow-hidden rounded-[10px] border border-line bg-white">
      {l.photo && (
        <div className="relative aspect-[16/9] md:aspect-auto md:h-[180px]">
          <Image src={l.photo.src} alt={l.photo.alt} fill sizes="(min-width: 768px) 400px, 100vw" className="object-cover" />
          {l.photo.caption && (
            <span className="absolute bottom-2.5 left-2.5 rounded-full bg-night/75 px-2.5 py-1 text-xs font-medium text-white">{l.photo.caption}</span>
          )}
        </div>
      )}
      <div className="flex flex-1 flex-col gap-3 p-[18px] md:p-5">
        <h4 className="font-head text-xl font-semibold text-navy md:text-[21px]">{l.name}</h4>
        <ul className="flex flex-col gap-1 text-[13px] text-muted-ink">
          <li className="flex items-start gap-2">
            <MapPin aria-hidden className="mt-0.5 size-3.5 shrink-0 text-flame-orange" />
            {[l.address, l.province].filter(Boolean).join(", ")}
          </li>
          {l.dates && l.dates.length > 0 && (
            <li className="flex items-start gap-2">
              <CalendarDays aria-hidden className="mt-0.5 size-3.5 shrink-0 text-flame-orange" />
              {formatDayList(l.dates)}
            </li>
          )}
        </ul>
        {results.length > 0 ? (
          <dl className="grid grid-cols-2 gap-x-6 gap-y-3.5 pt-1">
            {results.map((r) => (
              <div key={`${r.metric}-${resultNoun(r)}`} className="flex flex-col gap-0.5">
                <dd className="font-head text-[22px] leading-none font-semibold text-navy tabular-nums md:text-2xl">
                  {formatImpact({ quantity: r.quantity, atLeast: Boolean(r.atLeast) })}
                </dd>
                <dt className="text-xs leading-snug text-muted-ink">{resultNoun(r)}</dt>
              </div>
            ))}
          </dl>
        ) : (
          resultsPending && <p className="text-[13px] text-muted-ink italic">Kết quả đang được cập nhật.</p>
        )}
        {l.note && <p className="text-[13px] leading-normal text-muted-ink italic">{l.note}</p>}
      </div>
    </article>
  )
}

export { LocationCard }
