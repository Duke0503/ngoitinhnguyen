"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronDown } from "lucide-react"

import { cn } from "@/shared/lib/utils"

export type Season = {
  tag: string
  when: string
  title: string
  description: string
  figure: string
  href: string
  photo: { src: string; alt: string }
}

/**
 * Four photo panels, one open at a time. Desktop: a row where the open panel takes most of the width and the others
 * shrink to a strip with a vertical title. Phones: an accordion, collapsed rows show a thumbnail. Opens on hover,
 * focus or tap; the first panel counts as open until the visitor chooses another.
 */
function SeasonPanels({ seasons, initial = 1 }: { seasons: Season[]; initial?: number }) {
  const [open, setOpen] = useState(initial)
  return (
    <ul className="flex flex-col gap-2.5 md:h-[480px] md:flex-row md:gap-3">
      {seasons.map((s, i) => {
        const active = i === open
        return (
          <li
            key={s.title}
            data-active={active}
            onMouseEnter={() => setOpen(i)}
            onFocus={() => setOpen(i)}
            className={cn(
              "group/panel relative overflow-hidden rounded-[14px] transition-[flex-grow,height] duration-500 ease-out motion-reduce:transition-none",
              "max-md:border max-md:border-line max-md:bg-white md:basis-0",
              active ? "h-[300px] md:h-auto md:grow-[3.6]" : "h-[76px] md:h-auto md:grow"
            )}
          >
            <div className={cn("absolute inset-y-0 left-0 overflow-hidden transition-[width] duration-500 motion-reduce:transition-none", active ? "w-full" : "w-[76px] md:w-full")}>
              <Image src={s.photo.src} alt={active ? s.photo.alt : ""} fill sizes="(min-width: 768px) 640px, 350px" className="object-cover" />
              <span aria-hidden className={cn("absolute inset-0 bg-gradient-to-b from-transparent transition-opacity duration-500", active ? "via-night/30 to-night/95" : "to-night/75 max-md:hidden")} />
            </div>

            <button
              type="button"
              aria-expanded={active}
              aria-label={`${s.title}, ${s.when}`}
              onClick={() => setOpen(i)}
              className="absolute inset-0 z-10 cursor-pointer text-left outline-none focus-visible:ring-3 focus-visible:ring-flame-gold md:cursor-default"
            />

            <span className="pointer-events-none absolute top-3.5 left-3.5 z-20 rounded-[4px] bg-flame-gold px-2.5 py-1 text-xs font-extrabold tracking-wide text-night max-md:data-[hide=true]:hidden md:top-5 md:left-5" data-hide={!active}>
              {String(i + 1).padStart(2, "0")}
            </span>

            {/* Collapsed: phone row text */}
            <div className={cn("pointer-events-none absolute inset-y-0 right-4 left-[90px] z-20 flex items-center justify-between gap-3 md:hidden", active && "hidden")}>
              <div className="flex flex-col gap-0.5">
                <span className="text-xs font-bold tracking-[0.12em] text-orange-ink uppercase">{s.tag}</span>
                <span className="font-head text-[19px] leading-tight font-semibold text-navy">{s.title}</span>
              </div>
              <ChevronDown aria-hidden className="size-5 shrink-0 text-navy" />
            </div>

            {/* Collapsed: desktop vertical title */}
            <span aria-hidden className={cn("pointer-events-none absolute bottom-5 left-5 z-20 hidden font-head text-[22px] font-semibold whitespace-nowrap text-white [writing-mode:vertical-rl] [transform:rotate(180deg)] max-md:hidden", !active && "md:block")}>
              {s.title}
            </span>

            {/* Open: caption */}
            <div className={cn("absolute inset-x-[18px] bottom-4 z-20 flex flex-col gap-1.5 text-white transition-opacity duration-300 md:inset-x-8 md:bottom-8 md:gap-2.5", active ? "opacity-100 delay-150" : "pointer-events-none opacity-0 max-md:hidden")}>
              <p className="text-xs font-bold tracking-[0.14em] text-flame-gold uppercase [text-shadow:0_1px_8px_rgba(0,0,0,0.6)]">
                {s.tag} · {s.when}
              </p>
              <h3 className="font-head text-[26px] leading-tight font-semibold md:text-[38px]">{s.title}</h3>
              <p className="max-w-[520px] text-sm leading-normal text-white/90 md:text-base md:leading-relaxed">{s.description}</p>
              <div className="relative z-30 flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 max-md:hidden">
                <span className="rounded-full bg-white/15 px-3.5 py-1.5 text-[13px] font-bold">{s.figure}</span>
                <Link href={s.href} tabIndex={active ? 0 : -1} className="inline-flex items-center gap-2 font-semibold underline underline-offset-4">
                  Xem chương trình
                  <ArrowRight aria-hidden className="size-[18px]" />
                </Link>
              </div>
              <Link href={s.href} tabIndex={active ? 0 : -1} className="relative z-30 inline-flex items-center gap-2 pt-1 text-sm font-semibold underline underline-offset-4 md:hidden">
                Xem chương trình
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export { SeasonPanels }
