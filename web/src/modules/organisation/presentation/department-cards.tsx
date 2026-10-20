import Image from "next/image"

import { Section } from "@/shared/layout/section"
import { Eyebrow } from "@/shared/ui/eyebrow"
import { SnapRow } from "@/shared/ui/snap-row"

import type { Department } from "../domain/organisation"

type DepartmentCardsProps = { departments: Department[]; theme: string }

/** Each department as a “planet”: its own artwork, motto and one line. Equal cards, a swipe row on phones. */
function DepartmentCards({ departments, theme }: DepartmentCardsProps) {
  return (
    <Section tone="paper" spacing="lg" className="bg-[#e8f0f7]" aria-labelledby="departments-title" containerClassName="flex flex-col items-center gap-8 md:gap-11">
      <div className="flex flex-col gap-3 max-md:self-start md:items-center md:text-center">
        <Eyebrow tone="orange">{theme}</Eyebrow>
        <h2 id="departments-title" className="font-head text-[28px] leading-[1.15] font-semibold text-navy md:text-[44px]">
          Mỗi ban là một hành tinh
        </h2>
        <p className="text-[15px] text-muted-ink md:text-lg">{departments.length} ban của nhiệm kỳ hiện tại. Chọn tần số phù hợp với bạn.</p>
      </div>
      <div className="w-full">
        <SnapRow aria-label="Các ban" gridClassName="md:grid md:grid-cols-3 md:gap-7">
          {departments.map((d) => (
            <div key={d.slug} className="flex h-[260px] flex-col items-center gap-2 rounded-md bg-white p-3.5 text-center shadow-[0_8px_22px_-8px_rgba(11,18,51,0.2)] md:h-[400px] md:gap-2.5 md:p-5">
              <div className="relative h-[130px] w-full overflow-hidden md:h-[190px]">{d.art && <Image src={d.art.src} alt={d.art.alt} fill sizes="(min-width: 768px) 340px, 240px" quality={90} className="object-cover" />}</div>
              <h3 className="font-head text-xl leading-tight font-semibold text-navy md:text-2xl">{d.name}</h3>
              {d.motto && <p className="text-[13px] leading-snug font-bold text-orange-ink">{d.motto}</p>}
              {d.summary && <p className="text-[15px] leading-normal text-muted-ink max-md:hidden">{d.summary}</p>}
            </div>
          ))}
        </SnapRow>
      </div>
    </Section>
  )
}

export { DepartmentCards }
