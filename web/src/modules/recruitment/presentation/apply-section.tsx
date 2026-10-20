import { Lock } from "lucide-react"

import { recruitmentApplyId } from "@/shared/config/routes"

import type { RecruitmentRound } from "../domain/recruitment"
import { ApplicationForm } from "./application-form"

/** Shown only while a round is open; the server enforces the window again on submit. Dusk band with a white backing for the slanted edge. */
function ApplySection({ round }: { round: RecruitmentRound }) {
  return (
    <div className="bg-white" id={recruitmentApplyId}>
      <section aria-labelledby="apply-title" className="w-full bg-dusk-gradient px-5 py-[calc(var(--slant)+48px)] text-white [--slant:clamp(28px,4.5vw,72px)] [clip-path:polygon(0_var(--slant),100%_0,100%_100%,0_100%)] md:px-10 md:py-[calc(var(--slant)+88px)] xl:px-0">
        <div className="mx-auto grid w-full max-w-[1200px] gap-6 md:grid-cols-[480px_1fr] md:gap-16">
          <div className="flex flex-col gap-4 md:gap-5 md:self-start">
            <h2 id="apply-title" className="font-head text-[30px] leading-[1.12] font-semibold md:text-[46px]">
              Một lá đơn, ngay trên website
            </h2>
            <p className="text-[17px] leading-relaxed text-white/90 md:text-xl">Bạn nộp đơn, nhận email xác nhận và theo dõi kết quả tại một nơi.</p>
            <p className="flex items-start gap-2.5 text-sm leading-normal text-white/80">
              <Lock aria-hidden className="mt-0.5 size-[18px] shrink-0 text-flame-gold" />
              Thông tin của bạn chỉ ban nhân sự xem được và được xoá sau khi kết thúc đợt tuyển.
            </p>
          </div>
          <div className="rounded-[14px] bg-white p-1 text-ink shadow-[0_24px_48px_-16px_rgba(0,0,0,0.5)]">
            <ApplicationForm round={round} />
          </div>
        </div>
      </section>
    </div>
  )
}

export { ApplySection }
