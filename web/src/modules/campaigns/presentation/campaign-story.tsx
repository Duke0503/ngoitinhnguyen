import { countWord, formatShortRange } from "@/shared/lib/format"
import { cn } from "@/shared/lib/utils"
import { SectionHeading } from "@/shared/ui/section-heading"

import type { CampaignPhase } from "../domain/campaign"

function CampaignStory({ paragraphs, title }: { paragraphs: string[]; title: string }) {
  return (
    <div className="flex flex-col gap-4 md:gap-5">
      <SectionHeading size="sm" eyebrow="Câu chuyện" title={title} />
      {paragraphs.map((p) => (
        <p key={p} className="text-base leading-[1.7] text-ink md:text-[17px]">
          {p}
        </p>
      ))}
    </div>
  )
}

/** The named stages of a campaign (e.g. Gói đèn → Ngòi dệt → Trông trăng). */
function PhaseTimeline({ phases }: { phases: CampaignPhase[] }) {
  return (
    <div className="flex flex-col gap-5 md:gap-6">
      <SectionHeading size="sm" eyebrow={`${countWord(phases.length)} chặng hành trình`} title={phases.map((p) => p.name).join(" → ")} />
      <ol className="flex flex-col md:grid md:grid-cols-3 md:gap-4">
        {phases.map((p, i) => {
          const last = i === phases.length - 1
          return (
            <li
              key={p.name}
              className={cn(
                "flex items-center gap-3.5 border-t border-line py-3 md:flex-col md:items-start md:gap-2 md:border-t-[3px] md:py-0 md:pt-4",
                last && "md:border-moon"
              )}
            >
              <span className="text-xs font-bold text-orange-ink md:order-first md:tracking-wide">
                {String(i + 1).padStart(2, "0")}
                <span className="max-md:hidden"> · {formatShortRange(p.startsOn, p.endsOn)}</span>
              </span>
              <span className="flex-1 font-head text-[19px] font-semibold text-navy md:flex-none md:text-[22px]">{p.name}</span>
              <span className="text-[13px] text-muted-ink md:hidden">{formatShortRange(p.startsOn, p.endsOn)}</span>
              <span className="hidden text-sm leading-normal text-muted-ink md:block">{p.description}</span>
            </li>
          )
        })}
      </ol>
    </div>
  )
}

export { CampaignStory, PhaseTimeline }
