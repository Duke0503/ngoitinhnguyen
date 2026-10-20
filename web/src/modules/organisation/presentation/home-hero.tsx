import { routes } from "@/shared/config/routes"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"

import { donateHref } from "@/shared/config/site"
import { Container } from "@/shared/layout/section"
import { Button } from "@/shared/ui/button"
import { Eyebrow } from "@/shared/ui/eyebrow"
import { FlameRule } from "@/shared/ui/flame-rule"
import { Stat } from "@/shared/ui/stat"

import type { OrganisationProfile } from "../domain/organisation"

type HomeHeroProps = {
  profile: OrganisationProfile
  /** Campaign count comes from the Campaigns context; the page passes it in. */
  campaignCount: number
}

const photo = { src: "/images/photos/ttyt26-lantern-gift.jpg", alt: "Tình nguyện viên trao lồng đèn Trung thu cho các em ở ấp đảo Thiềng Liềng" }

/** Photo-led opening: the picture fills the right of the screen and dissolves into night navy behind the headline. */
function HomeHero({ profile, campaignCount }: HomeHeroProps) {
  const stats = [
    { value: String(profile.foundedYear), label: "Ngòi Bút Nhỏ ra đời" },
    { value: String(campaignCount), label: "chương trình đã tổ chức" },
    { value: profile.followers, label: "người theo dõi fanpage" },
  ]
  return (
    <section className="relative isolate overflow-hidden bg-night text-white" aria-labelledby="home-title">
      <div className="absolute inset-y-0 right-0 -z-10 w-full overflow-hidden md:w-[72%]">
        <Image src={photo.src} alt={photo.alt} fill preload sizes="(min-width: 768px) 72vw, 100vw" className="hero-settle object-cover object-[50%_35%]" />
      </div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-night via-night/80 to-night/25 md:bg-gradient-to-r md:from-night md:from-30% md:via-night/75 md:via-55% md:to-night/5" />

      <Container className="flex min-h-[600px] flex-col justify-end gap-10 px-5 pt-24 pb-8 md:min-h-[700px] md:justify-center md:gap-14 md:px-10 md:pt-20 md:pb-10 xl:px-0">
        <div className="flex max-w-[700px] flex-col gap-5 md:gap-7">
          <Eyebrow marker="dash" tone="gold" className="tracking-[0.14em] normal-case max-md:[&>span]:hidden md:tracking-[0.16em]">
            Dự án thiện nguyện từ năm {profile.volunteerSince} · {profile.affiliation}
          </Eyebrow>
          <div className="flex flex-col gap-4">
            <h1 id="home-title" className="max-w-[580px] font-head text-[40px] leading-[1.08] font-semibold tracking-tight text-balance md:text-hero">
              Vì nụ cười của các em trên con đường tìm con chữ.
            </h1>
            <FlameRule />
          </div>
          <p className="text-base leading-relaxed text-white/85 md:text-lede">
            Ngòi bắt đầu từ những cây bút học trò ở Gia Lai năm {profile.foundedYear}. Hôm nay, chúng mình mang sách vở, học bổng, quà Trung thu và Tết
            đến các em nhỏ, các mái ấm và những mảnh đời còn vất vả — từ Ia Băng đến ấp đảo Thiềng Liềng.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3.5">
            <Button asChild size="lg" className="max-sm:w-full">
              <Link href={donateHref}>
                Ủng hộ chương trình
                <ArrowRight aria-hidden />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline-light" className="max-sm:w-full">
              <Link href={routes.recruitment}>Trở thành tình nguyện viên</Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-white/15 pt-6 md:flex-row md:items-end md:justify-between">
          <dl className="grid grid-cols-3 gap-4 md:flex md:gap-12">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <Stat size="md" tone="dark" value={s.value} label={s.label} className="[&_[data-value]]:text-[26px] md:[&_[data-value]]:text-[34px]" />
                </dd>
              </div>
            ))}
          </dl>
          <p className="flex items-center gap-2 text-[13px] text-white/65">
            <MapPin aria-hidden className="size-3.5 shrink-0 text-flame-gold" />
            Trung Thu Yêu Thương 2026 · Ấp đảo Thiềng Liềng, TP. Hồ Chí Minh
          </p>
        </div>
      </Container>
    </section>
  )
}

export { HomeHero }
