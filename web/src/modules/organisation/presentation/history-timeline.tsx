import { Section } from "@/shared/layout/section"
import { formatDate, formatMonthYear } from "@/shared/lib/format"
import { cn } from "@/shared/lib/utils"
import { Photo } from "@/shared/ui/photo"
import { SectionHeading } from "@/shared/ui/section-heading"

import { chronological, type Milestone } from "../domain/organisation"

type HistoryTimelineProps = {
  milestones: Milestone[]
  /** Optional photo beside the heading, with a caption (supplied by the page from Campaigns). */
  photo?: { src: string; alt: string; caption: string }
}

const when = (m: Milestone) => (m.precision === "day" ? formatDate(m.on) : formatMonthYear(m.on))

function HistoryTimeline({ milestones, photo }: HistoryTimelineProps) {
  const events = chronological(milestones)
  return (
    <Section spacing="lg" aria-labelledby="history-title" containerClassName="flex flex-col gap-6 md:grid md:grid-cols-[380px_1fr] md:gap-[72px]">
      <div className="flex flex-col gap-5 md:self-start md:gap-6">
        <SectionHeading id="history-title" size="md" eyebrow="Chặng đường" title="Từ Ngòi Bút Nhỏ đến Viết Cho Em" />
        {photo && (
          <div className="max-md:hidden">
            <Photo src={photo.src} alt={photo.alt} ratio="4/3" caption={photo.caption} sizes="380px" />
          </div>
        )}
      </div>
      <ol>
        {events.map((m, i) => (
          <li key={m.title} className={cn("flex gap-4 border-t border-line py-3.5 md:gap-7 md:py-[18px]", i === events.length - 1 && "border-b")}>
            <time className={cn("w-[84px] shrink-0 pt-0.5 text-[13px] font-bold md:w-[110px] md:text-sm", m.emphasis ? "text-cta" : "text-flame-orange")}>{when(m)}</time>
            <div className="flex flex-col gap-1">
              <h3 className="font-head text-[17px] leading-snug font-semibold text-navy md:text-xl">{m.title}</h3>
              <p className="text-sm leading-normal text-muted-ink max-md:hidden md:text-[15px]">{m.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  )
}

export { HistoryTimeline }
