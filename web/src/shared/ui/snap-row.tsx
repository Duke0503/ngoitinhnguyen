"use client"

import * as React from "react"
import { useEffect, useRef, useState } from "react"

import { cn } from "@/shared/lib/utils"

type SnapRowProps = {
  children: React.ReactNode
  /** Classes applied from the md breakpoint up, where the row becomes a normal grid. */
  gridClassName: string
  /** Classes for the dots, which only show on phones. */
  dotClassName?: string
  activeDotClassName?: string
  "aria-label": string
}

/**
 * Phones: a swipeable row with scroll-snap, a peek of the next card and dots; it advances by itself every 4.5s
 * until the visitor touches it, and never when they prefer reduced motion. md and up: the plain grid in
 * `gridClassName`. Children must be `<li>`s (each gets its snap and width classes).
 */
function SnapRow({ children, gridClassName, dotClassName = "bg-line", activeDotClassName = "bg-flame-orange", ...aria }: SnapRowProps) {
  const ref = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState(0)
  const items = React.Children.toArray(children)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      const first = el.children[0] as HTMLElement | undefined
      if (!first) return
      const step = first.offsetWidth + 14
      setActive(Math.max(0, Math.min(items.length - 1, Math.round(el.scrollLeft / step))))
    }
    el.addEventListener("scroll", onScroll, { passive: true })
    return () => el.removeEventListener("scroll", onScroll)
  }, [items.length])

  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let stopped = false
    let visible = false
    const stop = () => {
      stopped = true
    }
    el.addEventListener("pointerdown", stop, { once: true })
    el.addEventListener("wheel", stop, { once: true, passive: true })
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.6 })
    io.observe(el)
    const timer = window.setInterval(() => {
      if (stopped || !visible || window.matchMedia("(min-width: 768px)").matches) return
      const first = el.children[0] as HTMLElement | undefined
      if (!first) return
      const step = first.offsetWidth + 14
      const next = el.scrollLeft + step >= el.scrollWidth - el.clientWidth - 4 ? 0 : el.scrollLeft + step
      el.scrollTo({ left: next, behavior: "smooth" })
    }, 4500)
    return () => {
      window.clearInterval(timer)
      io.disconnect()
    }
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <ul
        ref={ref}
        {...aria}
        className={cn(
          "-mx-5 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-5 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:snap-none md:overflow-visible md:px-0 md:pb-0",
          gridClassName
        )}
      >
        {items.map((child, i) => (
          <li key={i} className="w-[300px] shrink-0 snap-start md:w-auto md:shrink">
            {child}
          </li>
        ))}
      </ul>
      <div aria-hidden className="flex items-center justify-center gap-2 md:hidden">
        {items.map((_, i) => (
          <span key={i} className={cn("h-2 rounded-full transition-all", i === active ? cn("w-5.5", activeDotClassName) : cn("w-2", dotClassName))} />
        ))}
      </div>
    </div>
  )
}

export { SnapRow }
