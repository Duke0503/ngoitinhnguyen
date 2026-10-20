import { Section } from "@/shared/layout/section"
import { SectionHeading } from "@/shared/ui/section-heading"

import type { Pillar } from "../domain/organisation"

function Mission({ pillars }: { pillars: Pillar[] }) {
  const title = pillars.map((p) => p.word).join(" — ")
  const subjects = pillars.map((p) => p.subject)
  return (
    <Section tone="white" spacing="lg" aria-labelledby="mission-title" containerClassName="flex flex-col gap-8 md:gap-10">
      <SectionHeading
        id="mission-title"
        eyebrow="Sứ mệnh"
        title={title}
        description={`Ba chữ theo Ngòi từ những ngày đầu: ${subjects.slice(0, -1).join(", ")} và ${subjects.at(-1)}.`}
        className="max-w-[720px]"
      />
      <ol className="grid md:grid-cols-3">
        {pillars.map((p, i) => (
          <li key={p.word} className="flex flex-col gap-2 border-t border-line py-4 first:border-t-0 first:pt-0 md:gap-3 md:border-t-0 md:border-l md:px-10 md:py-2 md:first:border-l-0 md:first:pl-0">
            <p className="flex items-end gap-3">
              <span className="font-head text-[28px] leading-none font-semibold text-navy md:text-[40px]">{p.word}</span>
              <span className="pb-0.5 text-[11px] font-bold tracking-[0.14em] text-orange-ink uppercase md:text-[13px]">{p.subject}</span>
            </p>
            <p className="text-[15px] leading-relaxed text-muted-ink md:text-base">{p.description}</p>
            <span className="sr-only">Trụ cột {i + 1} trên {pillars.length}</span>
          </li>
        ))}
      </ol>
    </Section>
  )
}

export { Mission }
