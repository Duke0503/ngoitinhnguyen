import Image from "next/image"

import { Section } from "@/shared/layout/section"
import { SectionHeading } from "@/shared/ui/section-heading"

import type { Department } from "../domain/organisation"

type DepartmentCardsProps = {
  departments: Department[]
  theme: string
}

/** The term's departments as “planets”: each card shows the department's own artwork. */
function DepartmentCards({ departments, theme }: DepartmentCardsProps) {
  return (
    <Section tone="night" spacing="lg" aria-labelledby="departments-title" containerClassName="flex flex-col gap-8 md:gap-10">
      <SectionHeading
        id="departments-title"
        tone="dark"
        eyebrow={theme}
        title="Mỗi ban là một hành tinh"
        description={`${departments.length} ban của nhiệm kỳ hiện tại. Chọn tần số phù hợp với bạn.`}
        className="max-w-[720px]"
      />
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
        {departments.map((d) => (
          <li key={d.slug} className="flex flex-col overflow-hidden rounded-[10px] border border-white/12 bg-white/5 md:rounded-xl">
            <div className="relative aspect-[47/36] md:aspect-auto md:h-[200px]">
              {d.art && <Image src={d.art.src} alt={d.art.alt} fill sizes="(min-width: 768px) 380px, 50vw" quality={90} className="object-cover" />}
            </div>
            <div className="flex flex-col gap-1.5 p-3 md:gap-2 md:p-[22px]">
              <h3 className="font-head text-[15px] leading-snug font-semibold text-white md:text-[22px]">{d.name}</h3>
              {d.summary && <p className="text-sm leading-normal text-white/70 max-md:hidden">{d.summary}</p>}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}

export { DepartmentCards }
