import Image from "next/image"

import { Button } from "@/shared/ui/button"

export type ProofPoint = { value: string; label: string }

const requestHref = (email: string) => `mailto:${email}?subject=${encodeURIComponent("Xin hồ sơ tài trợ chương trình Ngòi Tình Nguyện")}`

/** Photo hero: one headline, two actions. (Proof figures now live in the track-record strip below.) */
function SponsorsHero({ email }: { email: string; proof?: ProofPoint[] }) {
  return (
    <section aria-labelledby="sponsors-title" className="relative isolate overflow-hidden bg-night text-white">
      <Image src="/images/photos3/iabang-volunteers.jpg" alt="" fill preload sizes="100vw" className="hero-settle -z-20 object-cover object-[50%_30%]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-night/80" />
      <div className="mx-auto flex min-h-[440px] w-full max-w-[1100px] flex-col items-center justify-center gap-4 px-5 pt-14 pb-24 text-center md:min-h-[520px] md:gap-5 md:px-10 md:pb-28">
        <p className="max-w-[28ch] text-[11px] leading-relaxed font-bold tracking-[0.18em] text-flame-gold uppercase md:max-w-none md:text-[13px] md:tracking-[0.2em]">Dành cho doanh nghiệp, tổ chức &amp; mạnh thường quân</p>
        <h1 id="sponsors-title" className="font-head text-[40px] leading-[1.05] font-semibold text-balance md:text-[68px]">
          Đồng hành cùng Ngòi.
        </h1>
        <p className="max-w-[700px] text-[15px] leading-relaxed text-white/90 md:text-[19px]">Món quà của đơn vị bạn đến đúng nơi, được ghi nhận công khai và báo cáo lại sau mỗi chương trình.</p>
        <div className="mt-2 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-3.5">
          <Button asChild size="lg" className="max-sm:w-full">
            <a href={requestHref(email)}>Nhận hồ sơ tài trợ</a>
          </Button>
          <Button asChild size="lg" variant="outline-light" className="max-sm:w-full">
            <a href="#contact">Liên hệ ban tổ chức</a>
          </Button>
        </div>
      </div>
      <div aria-hidden className="absolute inset-x-0 bottom-[-1px] h-11 bg-paper [clip-path:polygon(0_100%,100%_100%,100%_0)] md:h-20" />
    </section>
  )
}

export { SponsorsHero }
