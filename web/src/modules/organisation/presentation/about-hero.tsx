import Image from "next/image"

import { Section } from "@/shared/layout/section"
import { formatDate } from "@/shared/lib/format"
import { FlameRule } from "@/shared/ui/flame-rule"
import { SectionHeading } from "@/shared/ui/section-heading"

import type { OrganisationProfile } from "../domain/organisation"

/** Origin story on the left, the flame-quill logo and its meaning on a night panel on the right. */
function AboutHero({ profile }: { profile: OrganisationProfile }) {
  return (
    <Section spacing="none" className="pt-8 pb-12 md:pt-[72px] md:pb-[88px]" aria-labelledby="about-title" containerClassName="grid gap-8 md:grid-cols-[1fr_460px] md:items-center md:gap-[72px]">
      <div className="flex flex-col gap-5 md:gap-6">
        <SectionHeading id="about-title" as="h1" size="xl" eyebrow="Về chúng mình" title="Những cây bút nhỏ, viết cho các em" />
        <FlameRule />
        {profile.origin.map((p, i) => (
          <p key={p} className={i === 0 ? "text-base leading-[1.65] text-ink md:text-lg" : "text-base leading-[1.65] text-muted-ink md:text-lg"}>
            {p}
          </p>
        ))}
      </div>

      <figure className="flex flex-col items-center gap-5 rounded-xl bg-night p-7 text-center md:gap-6 md:p-10">
        <Image src="/images/logo/quill-flame.png" alt="Logo chính thức của Ngòi Tình Nguyện: cây bút mang dáng ngọn lửa" width={258} height={422} className="h-[146px] w-auto md:h-[244px]" />
        <blockquote className="font-head text-base leading-normal text-white/90 italic md:text-lg">“{profile.logo.meaning}”</blockquote>
        <figcaption className="text-xs text-white/60">Logo chính thức · công bố {formatDate(profile.logo.publishedOn)}</figcaption>
      </figure>
    </Section>
  )
}

export { AboutHero }
