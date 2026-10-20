import Image from "next/image"
import Link from "next/link"

import { recruitmentApplyId } from "@/shared/config/routes"
import { Section } from "@/shared/layout/section"
import { Button } from "@/shared/ui/button"
import { Eyebrow } from "@/shared/ui/eyebrow"
import { FlameRule } from "@/shared/ui/flame-rule"

import { roundStatusLine, type RecruitmentRound } from "../domain/recruitment"
import { NotifyForm } from "./notify-form"

type RecruitmentHeroProps = {
  round: RecruitmentRound | null
  slogan: string
}

/** Night hero: when a round is open it links to the form, otherwise it collects an email for the next one. */
function RecruitmentHero({ round, slogan }: RecruitmentHeroProps) {
  const open = round?.state === "open"
  return (
    <Section tone="night" spacing="none" className="py-10 md:py-20" aria-labelledby="recruit-title" containerClassName="grid gap-8 md:grid-cols-[1fr_520px] md:items-center md:gap-[72px]">
      <div className="flex flex-col gap-5 md:gap-6">
        <Eyebrow tone="gold">Tuyển thành viên &amp; tình nguyện viên</Eyebrow>
        <h1 id="recruit-title" className="font-head text-[36px] leading-[1.1] font-semibold text-balance text-white md:text-hero">
          {slogan}
        </h1>
        <FlameRule />
        <p className="text-base leading-relaxed text-white/80 md:text-lg">
          Ngòi được làm nên bởi học sinh, sinh viên trên khắp cả nước. Không cần kinh nghiệm — chỉ cần một trái tim muốn viết tiếp những câu chuyện tử tế.
        </p>
        <div className="flex flex-col gap-3.5 rounded-xl border border-white/12 bg-white/6 p-4 md:p-5">
          <p className="flex items-center gap-2.5 text-sm font-semibold text-white">
            <span aria-hidden className="size-2 shrink-0 rounded-full bg-flame-gold" />
            {round ? roundStatusLine(round) : "Hiện chưa có đợt tuyển nào đang mở"}
          </p>
          {open ? (
            <Button asChild variant="gold" className="self-start max-sm:w-full">
              <Link href={`#${recruitmentApplyId}`}>Nộp đơn ngay</Link>
            </Button>
          ) : (
            <NotifyForm />
          )}
        </div>
      </div>

      <div className="relative md:h-[500px]">
        <div className="relative aspect-[5/4] overflow-hidden rounded-md md:absolute md:inset-x-0 md:top-0 md:aspect-auto md:h-[340px]">
          <Image src="/images/photos/xyt26-banh-chung-team.jpg" alt="Các tình nguyện viên Ngòi gói bánh chưng trong chương trình Xuân Yêu Thương" fill preload sizes="(min-width: 768px) 520px, 100vw" className="object-cover" />
        </div>
        <div className="relative hidden overflow-hidden rounded-md border-8 border-night md:absolute md:top-[250px] md:right-0 md:block md:h-[250px] md:w-[320px]">
          <Image src="/images/photos/ttyt26-hanoi-kids.jpg" alt="Tình nguyện viên trao lồng đèn cho các em nhỏ" fill sizes="320px" className="object-cover" />
        </div>
      </div>
    </Section>
  )
}

export { RecruitmentHero }
