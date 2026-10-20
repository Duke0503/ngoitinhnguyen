import { routes } from "@/shared/config/routes"
import Image from "next/image"
import Link from "next/link"
import { Sparkle } from "lucide-react"

import { Section } from "@/shared/layout/section"
import { cn } from "@/shared/lib/utils"
import { Button } from "@/shared/ui/button"
import { SectionHeading } from "@/shared/ui/section-heading"

import { recruitmentProcess, roundStatusLine, type RecruitmentRound } from "../domain/recruitment"

type RecruitmentBandProps = {
  round: RecruitmentRound | null
  /** Department names of the current term (Organisation context). */
  departments: string[]
  theme: string
  slogan: string
}

function RecruitmentBand({ round, departments, theme, slogan }: RecruitmentBandProps) {
  return (
    <Section tone="night" spacing="lg" aria-labelledby="recruit-title" containerClassName="grid gap-8 md:grid-cols-[1fr_500px] md:items-center md:gap-20">
      <div className="flex flex-col gap-6 md:gap-7 max-md:order-2">
        <SectionHeading
          id="recruit-title"
          tone="dark"
          eyebrow={theme}
          title="Mỗi tình nguyện viên là một vì tinh tú"
          description="Ngòi được làm nên bởi học sinh, sinh viên trên khắp cả nước. Tham gia một chương trình theo mùa, hoặc ứng tuyển vào một trong sáu ban của nhiệm kỳ mới."
        />
        <ul className="flex flex-wrap gap-2.5" aria-label="Các ban">
          {departments.map((d) => (
            <li key={d} className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white">
              <Sparkle aria-hidden className="size-3.5 text-flame-gold" />
              {d}
            </li>
          ))}
        </ul>
        <ol className="grid grid-cols-2 gap-x-4 gap-y-4 pt-2 md:grid-cols-4 md:gap-0">
          {recruitmentProcess.map((s, i) => (
            <li key={s.title} className={cn("flex flex-col gap-1 border-t-2 pt-3.5", i === 0 ? "border-flame-gold" : "border-white/20")}>
              <span className={cn("text-xs font-bold tracking-wider", i === 0 ? "text-flame-gold" : "text-white/50")}>0{i + 1}</span>
              <span className="font-head text-lg font-semibold text-white md:text-[19px]">{s.title}</span>
              <span className="text-[13px] text-white/60">{s.detail}</span>
            </li>
          ))}
        </ol>
        <div className="flex flex-col gap-3 pt-2 md:flex-row md:items-center md:gap-5">
          <Button asChild variant="gold" size="lg" className="max-md:w-full">
            <Link href={routes.recruitment}>{round?.state === "open" ? "Nộp đơn ngay" : "Nhận thông báo khi mở đơn"}</Link>
          </Button>
          <p className="max-w-[300px] text-[13px] text-white/60">
            {round ? roundStatusLine(round) : "Đơn tuyển thường mở vào tháng 6 (thành viên) và trước mỗi chương trình."}
          </p>
        </div>
      </div>

      <figure className="relative max-md:order-1">
        <div className="relative aspect-[5/4] overflow-hidden rounded-md md:h-[400px] md:aspect-auto">
          <Image src="/images/photos/ttyt26-volunteer-kids.jpg" alt="Tình nguyện viên Ngòi trò chuyện cùng các em nhỏ" fill sizes="(min-width: 768px) 500px, 100vw" className="object-cover" />
        </div>
        <div className="absolute right-0 -bottom-10 hidden h-[200px] w-[250px] overflow-hidden rounded-md border-8 border-night md:block">
          <Image src="/images/photos/xyt26-banh-chung-team.jpg" alt="Tình nguyện viên gói bánh chưng" fill sizes="250px" className="object-cover" />
        </div>
        <figcaption className="mt-5 hidden max-w-[220px] items-start gap-3 md:mt-14 md:flex">
          <Image src="/images/logo/quill-flame.png" alt="" width={40} height={64} className="h-14 w-auto" />
          <span className="font-head text-[17px] leading-snug text-white/85 italic">“{slogan}”</span>
        </figcaption>
      </figure>
    </Section>
  )
}

export { RecruitmentBand }
