import { LogoTile } from "@/shared/ui/logo-tile"
import { SectionHeading } from "@/shared/ui/section-heading"

import type { Partner } from "../domain/sponsorship"

/** Sponsors and partners credited on one campaign, with their free-form titles. */
function CampaignPartners({ partners, title }: { partners: Partner[]; title: string }) {
  if (partners.length === 0) return null
  return (
    <div className="flex flex-col gap-5">
      <SectionHeading size="sm" eyebrow="Đồng hành" title={title} />
      <ul className="grid grid-cols-2 gap-x-3 gap-y-5 md:grid-cols-4 md:gap-4">
        {partners.map((p) => (
          <li key={p.name}>
            <LogoTile name={p.name} role={p.title} logoSrc={p.logoSrc} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export { CampaignPartners }
