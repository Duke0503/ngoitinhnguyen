import Image from "next/image"
import { SquareCheck } from "lucide-react"

import { Section } from "@/shared/layout/section"

import { sharedBenefits, type TierPackage } from "../domain/sponsorship"

/** Benefits every tier includes, listed once next to a photo. */
function CommonBenefits({ pkg }: { pkg: TierPackage }) {
  const shared = sharedBenefits(pkg)
  return (
    <Section tone="paper" spacing="lg" aria-labelledby="common-title" containerClassName="grid items-center gap-8 md:grid-cols-[520px_1fr] md:gap-[72px]">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-[0_16px_34px_-12px_rgba(11,18,51,0.4)] md:aspect-auto md:h-[380px] md:rounded-[14px]">
        <Image src="/images/photos2/ttyt26-vol-snacks.jpg" alt="Tình nguyện viên trao quà cho các em nhỏ" fill sizes="(min-width: 768px) 520px, 100vw" className="object-cover" />
      </div>
      <div className="flex flex-col gap-4 md:gap-[18px]">
        <h2 id="common-title" className="font-head text-[26px] leading-[1.2] font-semibold text-navy md:text-[38px] md:leading-[1.15]">
          Mọi đơn vị đồng hành đều được
        </h2>
        <ul className="flex flex-col gap-3 md:gap-3.5">
          {shared.map((b) => (
            <li key={b.label} className="flex items-start gap-3 text-base leading-snug md:items-center md:gap-3.5 md:text-lg">
              <SquareCheck aria-hidden className="mt-0.5 size-[22px] shrink-0 text-navy md:mt-0 md:size-[26px]" />
              <span>{b.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

export { CommonBenefits }
