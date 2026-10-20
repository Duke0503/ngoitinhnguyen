import Image from "next/image"

import { Section } from "@/shared/layout/section"
import { Eyebrow } from "@/shared/ui/eyebrow"

import type { LeadershipMember } from "../domain/people"

type LeadershipSectionProps = {
  eyebrow: string
  title: string
  description: string
  /** Term announcement artwork (kept for the page contract; the portraits carry the section now). */
  banner: { src: string; alt: string }
  members: LeadershipMember[]
  memberCount: number
}

// Portrait cards posted by the organisation for the first three board members, in board order.
const portraits = ["/images/photos3/btc-tuyet.jpg", "/images/photos3/btc-nhi.jpg", "/images/photos3/btc-hang.jpg"]

/** The term's board: portrait cards for the first three (as the page published them), the rest by name below. */
function LeadershipSection({ eyebrow, title, description, members, memberCount }: LeadershipSectionProps) {
  const featured = members.slice(0, portraits.length)
  const others = members.slice(portraits.length)
  return (
    <Section tone="white" spacing="lg" aria-labelledby="leadership-title" className="bg-[#e8f0f7]" containerClassName="flex flex-col items-center gap-8 md:gap-12">
      <div className="flex flex-col gap-3 md:items-center md:text-center">
        <Eyebrow tone="orange">{eyebrow}</Eyebrow>
        <h2 id="leadership-title" className="font-head text-[28px] leading-[1.15] font-semibold text-balance text-navy md:text-5xl">
          {title}
        </h2>
        <p className="max-w-[820px] text-[15px] leading-relaxed text-muted-ink md:text-lg">{description}</p>
      </div>
      <ul className="-mx-5 flex w-[calc(100%+40px)] snap-x scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] md:mx-0 md:grid md:w-full md:grid-cols-4 md:gap-6 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
        {featured.map((m, i) => (
          <li key={m.name} className="flex w-[200px] shrink-0 snap-start flex-col gap-2 md:w-auto md:gap-3.5">
            <div className="relative aspect-[240/252] overflow-hidden rounded-xl shadow-[0_12px_28px_-10px_rgba(11,18,51,0.35)] md:aspect-auto md:h-[340px] md:rounded-[14px]">
              <Image src={portraits[i]} alt={`${m.name}, ${m.role}`} fill sizes="(min-width: 768px) 276px, 200px" className="object-cover" />
            </div>
            <p className="font-head text-[17px] font-semibold text-navy md:text-[22px]">{m.name}</p>
            <p className="-mt-1 text-[13px] text-muted-ink md:-mt-2 md:text-sm">{m.role}</p>
          </li>
        ))}
        <li className="hidden flex-col items-center justify-center gap-2 rounded-[14px] bg-navy p-6 text-center text-white md:flex md:h-[340px]">
          <p className="font-head text-[110px] leading-none font-medium text-flame-gold">{memberCount}</p>
          <p className="text-[17px] font-semibold">thành viên ở 6 ban</p>
          <p className="text-sm text-white/70">cùng đồng hành mỗi chương trình</p>
        </li>
      </ul>
      {others.length > 0 && (
        <p className="max-w-[820px] text-center text-sm leading-relaxed text-muted-ink md:text-base">
          <span className="font-semibold text-ink">Cùng ban tổ chức: </span>
          {others.map((m) => `${m.name} (${m.role.replace(/^Phó ban · /, "")})`).join(" · ")}
        </p>
      )}
    </Section>
  )
}

export { LeadershipSection }
