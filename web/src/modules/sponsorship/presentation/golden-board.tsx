import { Section } from "@/shared/layout/section"
import { LogoTile } from "@/shared/ui/logo-tile"

import type { Partner } from "../domain/sponsorship"

/** “Bảng vàng”: partners with a logo as tiles, the rest named underneath. */
function GoldenBoard({ partners }: { partners: Partner[] }) {
  const withLogo = partners.filter((p) => p.logoSrc)
  const others = partners.filter((p) => !p.logoSrc)
  return (
    <Section tone="white" spacing="lg" aria-labelledby="board-title" containerClassName="flex flex-col items-center gap-8 md:gap-11">
      <div className="flex flex-col gap-3 max-md:self-start md:items-center md:text-center">
        <p className="text-xs font-bold tracking-[0.2em] text-orange-ink uppercase">Bảng vàng</p>
        <h2 id="board-title" className="font-head text-[28px] leading-[1.15] font-semibold text-navy md:text-[44px]">
          Những đơn vị đã đồng hành
        </h2>
      </div>
      <ul className="grid w-full grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
        {withLogo.map((p) => (
          <li key={p.name} className="flex rounded-xl border border-line bg-paper p-3.5 md:p-6">
            <LogoTile name={p.name} role={p.title} logoSrc={p.logoSrc} className="w-full text-center [&_figcaption]:items-center" />
          </li>
        ))}
      </ul>
      {others.length > 0 && (
        <p className="max-w-[820px] text-center text-sm leading-relaxed text-muted-ink md:text-[15px]">
          Và nhiều nhà hảo tâm, đơn vị phối hợp khác: {others.map((p) => p.name).join(", ")}…
        </p>
      )}
    </Section>
  )
}

export { GoldenBoard }
