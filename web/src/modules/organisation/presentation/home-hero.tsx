import { routes } from "@/shared/config/routes"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"

import { donateHref } from "@/shared/config/site"
import { Section } from "@/shared/layout/section"
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

const photos = {
  main: { src: "/images/photos/ttyt26-lantern-gift.jpg", alt: "Tình nguyện viên trao lồng đèn Trung thu cho các em ở ấp đảo Thiềng Liềng" },
  top: { src: "/images/photos/ttyt25-gialai-children.jpg", alt: "Các em nhỏ ở xã Ia Băng, Gia Lai" },
  bottom: { src: "/images/photos/xyt26-gialai-children.jpg", alt: "Học sinh Gia Lai trong chương trình Xuân Yêu Thương" },
}

function HomeHero({ profile, campaignCount }: HomeHeroProps) {
  return (
    <Section spacing="none" className="pt-8 pb-12 md:pt-16 md:pb-[88px]" containerClassName="grid gap-8 md:grid-cols-[minmax(0,560px)_1fr] md:items-center md:gap-16">
      <div className="flex flex-col gap-5 md:gap-7">
        <Eyebrow marker="dash" tone="muted" className="tracking-normal normal-case max-md:[&>span]:hidden">
          Dự án thiện nguyện từ năm {profile.volunteerSince} · {profile.affiliation}
        </Eyebrow>
        <div className="flex flex-col gap-3.5">
          <h1 className="font-head text-[38px] leading-[1.1] font-semibold tracking-tight text-balance text-navy md:text-hero">
            Vì nụ cười của các em trên con đường tìm con chữ.
          </h1>
          <FlameRule />
        </div>
        <p className="text-base leading-relaxed text-ink md:text-lede">
          Ngòi bắt đầu từ những cây bút học trò ở Gia Lai năm {profile.foundedYear}. Hôm nay, chúng mình mang sách vở, học bổng, quà
          Trung thu và Tết đến các em nhỏ, các mái ấm và những mảnh đời còn vất vả — từ Ia Băng đến ấp đảo Thiềng Liềng.
        </p>

        {/* Mobile: photos sit between the story and the actions (as in the mobile design). */}
        <HeroPhotos className="md:hidden" />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3.5">
          <Button asChild size="lg" className="max-sm:w-full">
            <Link href={donateHref}>
              Ủng hộ chương trình
              <ArrowRight aria-hidden />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="max-sm:w-full">
            <Link href={routes.recruitment}>Trở thành tình nguyện viên</Link>
          </Button>
        </div>
        <dl className="grid grid-cols-3 gap-4 pt-2 md:flex md:gap-7">
          {[
            { value: String(profile.foundedYear), label: "Ngòi Bút Nhỏ ra đời" },
            { value: String(campaignCount), label: "chương trình đã tổ chức" },
            { value: profile.followers, label: "người theo dõi fanpage" },
          ].map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <Stat size="md" value={s.value} label={s.label} className="[&_[data-value]]:text-[26px] md:[&_[data-value]]:text-[30px]" />
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <HeroPhotos className="max-md:hidden" />
    </Section>
  )
}

function HeroPhotos({ className }: { className?: string }) {
  return (
    <figure className={className}>
      {/* Mobile: main photo + a row of two. Desktop: main photo + a column of two, offset down 40px. */}
      <div className="flex flex-col gap-2 md:flex-row md:gap-5">
        <div className="relative aspect-[7/6] overflow-hidden rounded-md md:aspect-auto md:h-[520px] md:flex-1">
          <Image src={photos.main.src} alt={photos.main.alt} fill preload sizes="(min-width: 768px) 430px, 100vw" className="object-cover" />
        </div>
        <div className="grid grid-cols-2 gap-2 md:flex md:w-[146px] md:flex-col md:gap-5 md:pt-10">
          {[photos.top, photos.bottom].map((p) => (
            <div key={p.src} className="relative h-[110px] overflow-hidden rounded-md md:h-[200px]">
              <Image src={p.src} alt={p.alt} fill sizes="(min-width: 768px) 146px, 50vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
      <figcaption className="mt-3 flex items-center gap-2 text-[13px] text-muted-ink">
        <MapPin aria-hidden className="size-3.5 shrink-0 text-flame-orange" />
        Trung Thu Yêu Thương 2026 · Ấp đảo Thiềng Liềng, TP. Hồ Chí Minh
      </figcaption>
    </figure>
  )
}

export { HomeHero }
