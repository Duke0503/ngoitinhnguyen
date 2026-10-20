import { Section } from "@/shared/layout/section"
import { Eyebrow } from "@/shared/ui/eyebrow"

import type { Pillar } from "../domain/organisation"

// Short gloss of each founding word for the dark card (the full description lives in the organisation data).
const gloss: Record<string, string> = {
  Viết: "lan toả những câu chuyện tử tế",
  Đọc: "ngày hội đọc sách, Trạm gửi tri thức",
  "Ghi nhớ": "tri ân người đi trước, lưu giữ hành trình",
}

export type Place = { province: string; places: string }

/** Vision statement, the three founding words and the provinces Ngòi has worked in (from the campaigns). */
function AboutVision({ pillars, places }: { pillars: Pillar[]; places: Place[] }) {
  return (
    <Section tone="paper" spacing="lg" aria-labelledby="vision-title" containerClassName="flex flex-col items-center gap-10 md:gap-14">
      <div className="flex max-w-[900px] flex-col items-center gap-5 md:text-center">
        <Eyebrow tone="orange" className="self-start md:self-center">
          Tầm nhìn
        </Eyebrow>
        <h2 id="vision-title" className="font-head text-[28px] leading-[1.18] font-semibold text-balance text-navy md:text-[48px] md:leading-[1.15]">
          Mỗi món quà đến đúng nơi, mỗi chuyến đi được ghi lại và kể lại.
        </h2>
      </div>
      <div className="grid w-full gap-8 rounded-[18px] bg-navy p-6 text-white md:grid-cols-[1fr_480px] md:items-center md:gap-16 md:p-14">
        <div className="flex flex-col gap-5">
          <h3 className="font-head text-2xl font-semibold md:text-4xl">Đi những chuyến rất cụ thể</h3>
          <p className="text-[15px] leading-relaxed text-white/90 md:text-[17px]">Mỗi chương trình có địa bàn, ngày giờ và kết quả riêng. Chúng mình cùng viết Viết — Đọc — Ghi nhớ.</p>
          <ul className="grid grid-cols-3 gap-2.5 md:grid-cols-1 md:gap-3">
            {pillars.map((p) => (
              <li key={p.word} className="flex flex-col gap-0.5 rounded-xl bg-white/8 px-3 py-3.5 md:flex-row md:items-baseline md:gap-3 md:rounded-none md:bg-transparent md:p-0">
                <span className="font-head text-xl font-semibold text-flame-gold md:text-2xl">{p.word}</span>
                <span className="text-[13px] leading-snug text-white/85 md:text-base">{gloss[p.word] ?? ""}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl bg-white p-5 text-ink md:p-7">
          <p className="text-xs font-bold tracking-[0.16em] text-orange-ink uppercase">Địa bàn hoạt động</p>
          <ul>
            {places.map((p, i) => (
              <li key={p.province} className={`flex flex-col gap-0.5 py-3 md:py-4 ${i < places.length - 1 ? "border-b border-line" : ""}`}>
                <span className="font-head text-lg font-semibold text-navy md:text-[22px]">{p.province}</span>
                <span className="text-[13px] text-muted-ink md:text-sm">{p.places}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}

export { AboutVision }
