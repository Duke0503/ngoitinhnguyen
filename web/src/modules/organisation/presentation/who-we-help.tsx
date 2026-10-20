import { Section } from "@/shared/layout/section"
import { Chip } from "@/shared/ui/chip"
import { Photo } from "@/shared/ui/photo"
import { SectionHeading } from "@/shared/ui/section-heading"

import type { BeneficiaryGroup } from "../domain/organisation"

function WhoWeHelp({ groups, alsoHelps }: { groups: BeneficiaryGroup[]; alsoHelps: string[] }) {
  return (
    <Section tone="white" spacing="lg" aria-labelledby="help-title" containerClassName="flex flex-col gap-8 md:gap-10">
      <SectionHeading
        id="help-title"
        eyebrow="Chúng mình đồng hành cùng"
        title="Không chỉ các em nhỏ"
        description="Mỗi chương trình tìm đến những nơi còn thiếu: điểm trường vùng xa, mái ấm, bệnh viện và cả những con phố về đêm."
        className="max-w-[760px]"
      />
      <ul className="flex flex-col gap-5 md:grid md:grid-cols-3 md:gap-5">
        {groups.map((g) => (
          <li key={g.title} className="flex gap-4 md:flex-col md:gap-3">
            <Photo
              src={g.photo.src}
              alt={g.photo.alt}
              ratio={null}
              frameClassName="h-[72px] w-24 shrink-0 md:h-[240px] md:w-full"
              sizes="(min-width: 768px) 400px, 96px"
            />
            <div className="flex flex-col justify-center gap-1 md:justify-start">
              <h3 className="font-head text-[17px] leading-snug font-semibold text-navy md:text-[21px]">{g.title}</h3>
              <p className="text-[13px] text-muted-ink md:text-sm">{g.place}</p>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center gap-2.5">
        <span className="text-sm text-muted-ink">Và:</span>
        {alsoHelps.map((t) => (
          <Chip key={t} tone="neutral">
            {t}
          </Chip>
        ))}
      </div>
    </Section>
  )
}

export { WhoWeHelp }
