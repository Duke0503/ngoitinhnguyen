"use client"

import { useEffect, useRef, useState } from "react"

/** “500+” → { prefix: "", n: 500, suffix: "+" }; non-numeric values are shown as is. */
function split(value: string) {
  const m = value.match(/^(\D*)(\d[\d.,]*)(.*)$/)
  if (!m) return null
  const n = Number(m[2].replace(/[.,]/g, ""))
  return Number.isFinite(n) ? { prefix: m[1], n, suffix: m[3] } : null
}

/**
 * Counts up to `value` once when scrolled into view. The server renders the final figure, so the page is
 * correct without JS, for crawlers and for visitors who prefer reduced motion.
 */
function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [shown, setShown] = useState(value)

  useEffect(() => {
    const parts = split(value)
    const el = ref.current
    if (!parts || !el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    // Only start from zero when the figure is still below the fold, so nothing flashes on screen.
    if (el.getBoundingClientRect().top < window.innerHeight) return
    setShown(`${parts.prefix}0${parts.suffix}`)
    let frame = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - t, 3)
          setShown(`${parts.prefix}${Math.round(parts.n * eased)}${parts.suffix}`)
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.6 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [value, duration])

  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden>{shown}</span>
    </span>
  )
}

export { CountUp }
