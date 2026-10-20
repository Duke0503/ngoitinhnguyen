import { Download } from "lucide-react"

import { Section } from "@/shared/layout/section"
import { Button } from "@/shared/ui/button"
import { Eyebrow } from "@/shared/ui/eyebrow"
import { FlameRule } from "@/shared/ui/flame-rule"

export type ProofPoint = { value: string; label: string }

type SponsorsHeroProps = {
  email: string
  /** Figures owned by other contexts (campaign count, provinces, followers, legal patron), passed in by the page. */
  proof: ProofPoint[]
}

const requestHref = (email: string) => `mailto:${email}?subject=${encodeURIComponent("Xin hồ sơ tài trợ chương trình Ngòi Tình Nguyện")}`

function SponsorsHero({ email, proof }: SponsorsHeroProps) {
  return (
    <Section spacing="none" className="pt-9 pb-10 md:pt-20 md:pb-20" aria-labelledby="sponsors-title" containerClassName="grid gap-8 md:grid-cols-[1fr_480px] md:items-center md:gap-[72px]">
      <div className="flex flex-col gap-5 md:gap-6">
        <Eyebrow tone="orange" className="tracking-[0.14em] md:tracking-[0.18em]">
          Dành cho doanh nghiệp, tổ chức &amp; mạnh thường quân
        </Eyebrow>
        <h1 id="sponsors-title" className="font-head text-[32px] leading-[1.12] font-semibold text-balance text-navy md:text-[52px] md:leading-[1.1]">
          Đồng hành cùng Ngòi, để món quà đến đúng nơi cần
        </h1>
        <FlameRule />
        <p className="text-base leading-relaxed text-muted-ink md:text-lg">
          Mỗi đóng góp của đơn vị bạn được ghi nhận công khai, sử dụng đúng mục đích và báo cáo lại sau mỗi chương trình.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3.5">
          <Button asChild size="lg" className="max-sm:w-full">
            <a href={requestHref(email)}>
              Nhận hồ sơ tài trợ
              <Download aria-hidden />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="max-sm:w-full">
            <a href="#contact">Liên hệ ban tổ chức</a>
          </Button>
        </div>
      </div>

      <dl className="flex flex-col rounded-xl bg-night px-5 py-1 md:px-8 md:py-3">
        {proof.map((p, i) => (
          <div key={p.label} className={`flex items-center gap-4 py-3.5 md:gap-5 md:py-5 ${i > 0 ? "border-t border-white/12" : ""}`}>
            <dt className="order-2 text-sm leading-normal text-white/80 md:text-[15px]">{p.label}</dt>
            <dd className="order-1 w-20 shrink-0 font-head text-[26px] font-medium text-flame-gold tabular-nums md:w-[110px] md:text-4xl">{p.value}</dd>
          </div>
        ))}
      </dl>
    </Section>
  )
}

export { SponsorsHero }
