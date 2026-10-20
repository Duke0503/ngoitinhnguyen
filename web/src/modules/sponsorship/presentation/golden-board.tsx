import { Section } from "@/shared/layout/section"
import { LogoTile } from "@/shared/ui/logo-tile"
import { SectionHeading } from "@/shared/ui/section-heading"

import type { Partner } from "../domain/sponsorship"

/** “Bảng vàng tri ân”: every sponsor and partner across all campaigns, with the campaigns they supported. */
function GoldenBoard({ partners }: { partners: Partner[] }) {
  return (
    <Section tone="white" spacing="lg" aria-labelledby="board-title" containerClassName="flex flex-col gap-6 md:gap-8">
      <SectionHeading id="board-title" eyebrow="Bảng vàng tri ân" title="Những đơn vị đã đồng hành cùng Ngòi" className="max-w-[760px]" />
      <ul className="grid grid-cols-2 gap-x-3 gap-y-5 md:grid-cols-4 md:gap-5">
        {partners.map((p) => (
          <li key={p.name} className="rounded-xl md:border md:border-line md:p-5">
            <LogoTile name={p.name} role={p.title} note={p.supported} logoSrc={p.logoSrc} />
          </li>
        ))}
      </ul>
    </Section>
  )
}

export { GoldenBoard }
