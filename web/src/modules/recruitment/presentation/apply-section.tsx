import { Lock } from "lucide-react"

import { recruitmentApplyId } from "@/shared/config/routes"
import { Section } from "@/shared/layout/section"
import { Callout } from "@/shared/ui/callout"
import { SectionHeading } from "@/shared/ui/section-heading"

import type { RecruitmentRound } from "../domain/recruitment"
import { ApplicationForm } from "./application-form"

/** Shown only while a round is open; the server enforces the window again on submit. */
function ApplySection({ round }: { round: RecruitmentRound }) {
  return (
    <Section id={recruitmentApplyId} tone="white" spacing="lg" aria-labelledby="apply-title" containerClassName="flex flex-col gap-8 md:grid md:grid-cols-[400px_1fr] md:gap-[72px]">
      <div className="flex flex-col gap-5 md:gap-6 md:self-start">
        <SectionHeading
          id="apply-title"
          eyebrow="Đơn ứng tuyển"
          title="Một lá đơn, ngay trên website"
          size="md"
          description="Không còn nhiều đường link rời rạc. Bạn nộp đơn, nhận email xác nhận và theo dõi kết quả tại một nơi."
        />
        <Callout tone="navy" icon={Lock}>
          Thông tin của bạn chỉ ban nhân sự xem được và được xoá sau khi kết thúc đợt tuyển.
        </Callout>
      </div>
      <ApplicationForm round={round} />
    </Section>
  )
}

export { ApplySection }
