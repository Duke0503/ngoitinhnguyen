import Image from "next/image"
import Link from "next/link"

import { routes } from "@/shared/config/routes"
import { Section } from "@/shared/layout/section"
import { Eyebrow } from "@/shared/ui/eyebrow"

import { waysToJoin } from "../domain/recruitment"

const looks = [
  { photo: { src: "/images/photos3/btc-hang.jpg", alt: "Thành viên ban tổ chức nhiệm kỳ 2026–2027" }, action: "Xem các ban", href: "#departments-title" },
  { photo: { src: "/images/photos2/ttyt26-island-cleanup-b.jpg", alt: "Tình nguyện viên dọn rác ven ấp đảo Thiềng Liềng" }, action: "Xem chương trình", href: routes.campaigns },
]

/** Two photo cards, equal height: how to join for a term, or for one programme. */
function WaysToJoin() {
  return (
    <Section tone="paper" spacing="lg" aria-labelledby="ways-join-title" containerClassName="flex flex-col items-center gap-8 md:gap-11">
      <div className="flex flex-col gap-3 max-md:self-start md:items-center md:text-center">
        <Eyebrow tone="orange">Hai cách đồng hành</Eyebrow>
        <h2 id="ways-join-title" className="font-head text-[28px] leading-[1.15] font-semibold text-navy md:text-[44px]">
          Chọn hành trình phù hợp với bạn
        </h2>
      </div>
      <ul className="grid w-full gap-4 md:grid-cols-2 md:gap-8">
        {waysToJoin.map((w, i) => {
          const look = looks[i] ?? looks[0]
          return (
            <li key={w.title} className="flex flex-col overflow-hidden rounded-lg bg-white shadow-[0_10px_26px_-10px_rgba(11,18,51,0.25)]">
              <div className="relative h-[170px] md:h-[240px]">
                <Image src={look.photo.src} alt={look.photo.alt} fill sizes="(min-width: 768px) 584px, 100vw" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5 md:gap-4 md:p-8">
                <h3 className="font-head text-[22px] font-semibold text-navy md:text-[28px]">{w.title}</h3>
                <p className="text-[15px] leading-relaxed text-muted-ink md:text-base">{w.description}</p>
                <dl className="flex flex-col max-md:hidden">
                  {w.facts.map((f) => (
                    <div key={f.label} className="flex gap-4 border-t border-line py-2.5">
                      <dt className="w-[120px] shrink-0 text-sm text-muted-ink">{f.label}</dt>
                      <dd className="text-sm font-semibold text-ink">{f.value}</dd>
                    </div>
                  ))}
                </dl>
                <Link href={look.href} className="mt-auto text-[15px] font-bold text-cta">
                  {look.action} &gt;&gt;&gt;
                </Link>
              </div>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}

export { WaysToJoin }
