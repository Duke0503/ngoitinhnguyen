import Image from "next/image"
import Link from "next/link"

import { recruitmentApplyId } from "@/shared/config/routes"
import { Button } from "@/shared/ui/button"

import { roundStatusLine, type RecruitmentRound } from "../domain/recruitment"
import { NotifyForm } from "./notify-form"

type RecruitmentHeroProps = { round: RecruitmentRound | null; slogan: string }

/** Photo hero: slogan, one status line, then the form link (round open) or an email sign-up for the next round. */
function RecruitmentHero({ round, slogan }: RecruitmentHeroProps) {
  const open = round?.state === "open"
  return (
    <section aria-labelledby="recruit-title" className="relative isolate overflow-hidden bg-night text-white">
      <Image src="/images/photos3/volunteers-steps.jpg" alt="" fill preload sizes="100vw" className="hero-settle -z-20 object-cover object-[50%_30%]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-night/80" />
      <div className="mx-auto flex min-h-[520px] w-full max-w-[1100px] flex-col items-center justify-center gap-4 px-5 pt-14 pb-24 text-center md:min-h-[560px] md:gap-[18px] md:px-10 md:pb-28">
        <p className="text-[11px] font-bold tracking-[0.18em] text-flame-gold uppercase md:text-[13px] md:tracking-[0.2em]">Tuyển thành viên &amp; tình nguyện viên</p>
        <h1 id="recruit-title" className="font-head text-[36px] leading-[1.08] font-semibold text-balance md:text-[64px]">
          {slogan}
        </h1>
        <p className="max-w-[760px] text-[15px] leading-relaxed text-white/90 md:text-[19px]">Ngòi được làm nên bởi học sinh, sinh viên trên khắp cả nước. Không cần kinh nghiệm — chỉ cần một trái tim muốn viết tiếp những câu chuyện tử tế.</p>
        <p className="mt-1 inline-flex items-center gap-2.5 rounded-full bg-white/12 px-4 py-2 text-sm font-semibold">
          <span aria-hidden className={`size-2 shrink-0 rounded-full ${open ? "bg-leaf" : "bg-flame-gold"}`} />
          {round ? roundStatusLine(round) : "Hiện chưa có đợt tuyển nào đang mở"}
        </p>
        {open ? (
          <Button asChild size="lg" className="max-sm:w-full">
            <Link href={`#${recruitmentApplyId}`}>Ứng tuyển ngay</Link>
          </Button>
        ) : (
          <div className="w-full max-w-[460px] rounded-xl bg-white/10 p-4 text-left md:p-5">
            <NotifyForm />
          </div>
        )}
      </div>
      <div aria-hidden className="absolute inset-x-0 bottom-[-1px] h-11 bg-paper [clip-path:polygon(0_100%,100%_100%,100%_0)] md:h-20" />
    </section>
  )
}

export { RecruitmentHero }
