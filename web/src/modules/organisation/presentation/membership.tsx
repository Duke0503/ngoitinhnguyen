import Image from "next/image"

import { Section } from "@/shared/layout/section"
import { formatRange } from "@/shared/lib/format"
import { FactList } from "@/shared/ui/fact-list"
import { SectionHeading } from "@/shared/ui/section-heading"

import type { Membership } from "../domain/organisation"

/** Legal basis: the parent organisation and the decision that makes Ngòi a member unit. */
function MembershipSection({ membership: m }: { membership: Membership }) {
  return (
    <Section spacing="lg" aria-labelledby="membership-title" containerClassName="flex flex-col gap-8 md:grid md:grid-cols-[360px_1fr] md:items-center md:gap-[72px]">
      <div className="relative mx-auto aspect-[430/635] w-[240px] overflow-hidden rounded-sm shadow-[0_18px_40px_rgb(31_42_92/0.15)] md:w-full">
        <Image src={m.document.src} alt={m.document.alt} fill sizes="(min-width: 768px) 360px, 240px" quality={90} className="object-cover" />
      </div>
      <div className="flex flex-col gap-5 md:gap-6">
        <SectionHeading
          id="membership-title"
          size="md"
          eyebrow="Cơ sở pháp lý"
          title={`Đơn vị trực thuộc ${m.organisation}`}
          description="Từ tháng 6/2026, Ngòi chính thức là thành viên trực thuộc VNV — cơ sở để mỗi chương trình được tổ chức chỉn chu và minh bạch hơn."
        />
        <FactList
          facts={[
            { label: "Quyết định", value: `Số ${m.decision.number}` },
            { label: "Hiệu lực", value: formatRange(m.decision.validFrom, m.decision.validTo) },
            { label: "Đại diện dự án", value: m.decision.representative },
            { label: "Trong các chương trình", value: m.role },
          ]}
        />
      </div>
    </Section>
  )
}

export { MembershipSection }
