import { routes } from "@/shared/config/routes"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronDown } from "lucide-react"

import { donateHref } from "@/shared/config/site"
import { Button } from "@/shared/ui/button"
import { Eyebrow } from "@/shared/ui/eyebrow"

import type { OrganisationProfile } from "../domain/organisation"

type HomeHeroProps = {
  profile: OrganisationProfile
  /** Kept for the page contract: the campaign count lives in the impact band below. */
  campaignCount: number
}

const photo = { src: "/images/photos2/ttyt26-group-kids.jpg", alt: "Tình nguyện viên Ngòi cùng các em nhỏ và những chiếc lồng đèn Trung thu" }

/** Full-width photo, one centred headline, one ask. The wash keeps white text readable over a busy crowd. */
function HomeHero({ profile }: HomeHeroProps) {
  return (
    <section className="relative isolate overflow-hidden bg-night text-white" aria-labelledby="home-title">
      <Image src={photo.src} alt={photo.alt} fill preload sizes="100vw" className="hero-settle -z-20 object-cover object-[50%_30%]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-night/65" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-b from-transparent to-night/70" />

      <div className="mx-auto flex min-h-[640px] w-full max-w-[1100px] flex-col items-center justify-center gap-5 px-5 pt-20 pb-52 text-center md:min-h-[760px] md:gap-6 md:px-10 md:pt-24 md:pb-44">
        <Eyebrow tone="gold" className="justify-center text-xs leading-relaxed tracking-[0.12em] md:text-[13px] md:tracking-[0.16em]">
          Dự án thiện nguyện từ năm {profile.volunteerSince} · {profile.affiliation}
        </Eyebrow>
        <h1 id="home-title" className="max-w-[16ch] font-head text-[40px] leading-[1.08] font-semibold tracking-tight text-balance md:max-w-[1000px] md:text-[72px]">
          Vì nụ cười của các em trên con đường tìm con chữ.
        </h1>
        <p className="max-w-[720px] text-base leading-relaxed text-white/90 md:text-xl">
          Từ những cây bút học trò ở Gia Lai năm {profile.foundedYear} đến những chuyến đi Trung thu, Tết và ngày hội đọc sách.
        </p>
        <div className="mt-2 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
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

      <a href="#programmes-title" aria-label="Cuộn xuống" className="absolute bottom-24 left-1/2 flex size-[52px] -translate-x-1/2 items-center justify-center rounded-full border-[1.5px] border-white/70 text-white transition-colors hover:bg-white/10 md:bottom-28 md:size-[60px]">
        <ChevronDown aria-hidden className="size-6" />
      </a>
      <div aria-hidden className="absolute inset-x-0 bottom-[-1px] h-14 bg-paper [clip-path:polygon(0_100%,100%_100%,100%_0)] md:h-[88px]" />
    </section>
  )
}

export { HomeHero }
