import Image from "next/image"

import { Section } from "@/shared/layout/section"
import { SectionHeading } from "@/shared/ui/section-heading"

import type { LeadershipMember } from "../domain/people"

type LeadershipSectionProps = {
  eyebrow: string
  title: string
  description: string
  banner: { src: string; alt: string }
  members: LeadershipMember[]
}

/** The term's board: announcement banner above, then names and titles in two columns. */
function LeadershipSection({ eyebrow, title, description, banner, members }: LeadershipSectionProps) {
  return (
    <Section tone="night" spacing="lg" aria-labelledby="leadership-title" containerClassName="flex flex-col gap-8 md:gap-14">
      <div className="relative aspect-[2/1] overflow-hidden rounded-lg md:aspect-auto md:h-[480px]">
        <Image src={banner.src} alt={banner.alt} fill sizes="(min-width: 1280px) 1200px, 100vw" quality={90} className="object-cover" />
      </div>
      <div className="flex flex-col gap-6 md:gap-8">
        <SectionHeading id="leadership-title" tone="dark" eyebrow={eyebrow} title={title} description={description} className="max-w-[760px]" />
        <ul className="grid md:grid-cols-2 md:gap-x-8">
          {members.map((m) => (
            <li key={m.name} className="flex flex-col gap-1 border-t border-white/15 py-4">
              <span className="font-head text-[17px] font-semibold text-white md:text-xl">{m.name}</span>
              <span className="text-[13px] text-white/65 md:text-sm">{m.role}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

export { LeadershipSection }
