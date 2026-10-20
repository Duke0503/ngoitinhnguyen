import Image from "next/image"

import { cn } from "@/shared/lib/utils"
import { SnapRow } from "@/shared/ui/snap-row"

export type Print = {
  /** “Tháng 2 · Gia Lai, Hưng Yên, Hà Nội” */
  when: string
  title: string
  figure: string
  photo: { src: string; alt: string }
}

// Per-print tilt (desktop only; phones keep them straight) and washi tape colour/placement, so nothing repeats exactly.
const looks = [
  { tilt: "md:rotate-2", tape: "bg-flame-gold/70 rotate-[4deg] left-[38%]", lift: "md:mt-2" },
  { tilt: "", tape: "bg-flame-orange/70 -rotate-[6deg] left-[30%]", lift: "md:mt-5" },
  { tilt: "md:-rotate-2", tape: "bg-leaf/70 rotate-[8deg] left-[42%]", lift: "md:mt-3" },
  { tilt: "", tape: "bg-blossom/80 -rotate-[3deg] left-[34%]", lift: "md:mt-6" },
]

/** Four prints hung on a rope in calendar order. Ordinary elements, so the caption text stays upright and readable. */
function PinnedPrints({ prints }: { prints: Print[] }) {
  return (
    <div className="relative">
      <svg aria-hidden viewBox="0 0 1200 26" preserveAspectRatio="none" className="pointer-events-none absolute inset-x-0 top-5 hidden h-[26px] w-full md:block">
        <path d="M0 6 Q300 26 600 14 T1200 8" fill="none" stroke="#8c6d3f" strokeWidth="4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      </svg>
      <SnapRow aria-label="Các chương trình trong năm" gridClassName="md:grid md:grid-cols-4 md:gap-10 md:pt-6">
        {prints.map((p, i) => {
          const look = looks[i % looks.length]
          return (
            <figure key={p.title} className={cn("relative bg-white p-2.5 pb-4 shadow-[0_14px_26px_-10px_rgba(11,18,51,0.35)] transition-transform duration-300 md:hover:rotate-0 md:hover:-translate-y-1", look.tilt, look.lift)}>
              <span aria-hidden className={cn("absolute -top-3 h-6 w-[72px] rounded-[2px]", look.tape)} />
              <div className="relative aspect-[4/3] overflow-hidden md:h-[250px] md:aspect-auto">
                <Image src={p.photo.src} alt={p.photo.alt} fill sizes="(min-width: 1200px) 270px, 300px" className="object-cover" />
              </div>
              <figcaption className="flex flex-col gap-1 px-1.5 pt-3">
                <p className="text-xs font-bold tracking-[0.1em] text-orange-ink uppercase">{p.when}</p>
                <p className="font-head text-[21px] leading-tight font-medium text-navy italic md:text-2xl">{p.title}</p>
                <p className="text-sm font-semibold text-muted-ink">{p.figure}</p>
              </figcaption>
            </figure>
          )
        })}
      </SnapRow>
    </div>
  )
}

export { PinnedPrints }
