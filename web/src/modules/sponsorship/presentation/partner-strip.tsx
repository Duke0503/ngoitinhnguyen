import { routes } from "@/shared/config/routes"
import { Section } from "@/shared/layout/section"
import { LogoTile } from "@/shared/ui/logo-tile"
import { TextLink } from "@/shared/ui/text-link"

import type { Partner } from "../domain/sponsorship"

/** Proof strip right under the impact numbers (trust pattern: hero → proof). */
function PartnerStrip({ partners }: { partners: Partner[] }) {
  return (
    <Section tone="white" spacing="sm" aria-labelledby="partners-title" containerClassName="flex flex-col gap-6 md:gap-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <h2 id="partners-title" className="font-head text-[22px] font-semibold text-navy">
          Được bảo trợ và đồng hành bởi
        </h2>
        <TextLink href={routes.sponsors} tone="cta" className="max-md:hidden">
          Trở thành nhà đồng hành
        </TextLink>
      </div>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-4 md:grid-cols-6 md:gap-5">
        {partners.map((p) => (
          <li key={p.name}>
            <LogoTile name={p.name} role={p.title} logoSrc={p.logoSrc} size="md" />
          </li>
        ))}
      </ul>
      <TextLink href={routes.sponsors} tone="cta" className="md:hidden">
        Trở thành nhà đồng hành
      </TextLink>
    </Section>
  )
}

export { PartnerStrip }
