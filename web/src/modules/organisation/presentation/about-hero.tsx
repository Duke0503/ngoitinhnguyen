import Image from "next/image"

import { Eyebrow } from "@/shared/ui/eyebrow"

import type { OrganisationProfile } from "../domain/organisation"

const hero = { src: "/images/photos3/volunteers-steps.jpg", alt: "Các bạn tình nguyện viên của Ngòi ngồi cùng nhau trên bậc thềm sau chuyến đi" }

const polaroids = [
  { src: "/images/photos3/gialai-students-group.jpg", alt: "Học sinh Gia Lai chụp ảnh cùng tình nguyện viên", caption: "Gia Lai · 2024", rotate: -5 },
  { src: "/images/photos3/ct01-crowd.jpg", alt: "Học sinh dự ngày hội đọc sách Trang sách nhỏ", caption: "Trang sách nhỏ · 04.2024", rotate: 3 },
  { src: "/images/photos3/night-smile.jpg", alt: "Các em nhỏ cười tươi trong chương trình Xuân Yêu Thương", caption: "Xuân Yêu Thương · 02.2026", rotate: -3 },
  { src: "/images/photos3/elders-lanterns.jpg", alt: "Tình nguyện viên cùng ông bà làm lồng đèn", caption: "Đèn Trăng · 10.2025", rotate: 5 },
]

/** Full-bleed photo, a two-colour headline and a row of tilted prints that settle in one by one. */
function AboutHero({ profile }: { profile: OrganisationProfile }) {
  return (
    <section aria-labelledby="about-title" className="relative isolate overflow-hidden bg-night text-white">
      <Image src={hero.src} alt={hero.alt} fill preload sizes="100vw" className="hero-settle -z-20 object-cover object-[50%_30%]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-night/85" />
      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-10 px-5 pt-16 pb-14 text-center md:gap-14 md:px-10 md:pt-24 md:pb-24">
        <div className="flex flex-col items-center gap-4 md:gap-5">
          <Eyebrow tone="gold" className="tracking-[0.2em] md:tracking-[0.24em]">
            Về chúng mình
          </Eyebrow>
          <h1 id="about-title" className="font-head text-[38px] leading-[1.05] font-semibold text-balance md:text-[84px] md:leading-[1.02]">
            Những cây bút nhỏ,
            <br />
            <span className="text-flame-gold italic">viết cho các em.</span>
          </h1>
          <p className="max-w-[720px] text-[15px] leading-relaxed text-white/90 md:text-xl">
            Từ một dự án viết lách của học trò ở Gia Lai năm {profile.foundedYear} đến những chuyến đi Trung thu, Tết và đọc sách trên khắp ba miền.
          </p>
        </div>
        <ul className="flex w-full items-start justify-center gap-3 max-md:px-0 md:gap-8">
          {polaroids.map((p, i) => (
            <li key={p.src} className={`polaroid w-[44%] max-w-[260px] bg-white p-2 pb-3 shadow-[0_18px_36px_rgba(0,0,0,0.4)] md:w-[260px] md:p-2.5 md:pb-3.5 ${i > 1 ? "max-md:hidden" : ""}`} style={{ "--r": `${p.rotate}deg`, "--i": i } as React.CSSProperties}>
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image src={p.src} alt={p.alt} fill sizes="260px" className="object-cover" />
              </div>
              <p className="mt-2 text-xs font-semibold text-navy md:mt-2.5 md:text-[13px]">{p.caption}</p>
            </li>
          ))}
        </ul>
      </div>
      <div aria-hidden className="absolute inset-x-0 bottom-[-1px] h-10 bg-paper [clip-path:polygon(0_100%,100%_100%,100%_0)] md:h-[72px]" />
    </section>
  )
}

export { AboutHero }
