import * as React from "react"

import { cn } from "@/shared/lib/utils"

type SlantBandProps = React.ComponentProps<"section"> & {
  /** Brand gradient: night navy into flame, or the plain navy. */
  tone?: "flame" | "navy"
  containerClassName?: string
}

/**
 * Full-bleed band with diagonal top and bottom edges, filled with the brand gradient. Cards sit on it
 * like paper on a desk. The slant is 4vw tall (capped), so it stays subtle on phones.
 */
function SlantBand({ tone = "flame", className, containerClassName, children, ...props }: SlantBandProps) {
  return (
    <section
      className={cn(
        "relative w-full px-5 py-[calc(var(--slant)+48px)] text-white [--slant:clamp(28px,4.5vw,72px)] md:px-10 md:py-[calc(var(--slant)+64px)] xl:px-0",
        "[clip-path:polygon(0_var(--slant),100%_0,100%_calc(100%-var(--slant)),0_100%)]",
        tone === "flame" ? "bg-[linear-gradient(180deg,#0b1233_0%,#1f2a5c_45%,#7a2a3a_78%,#e5391f_100%)]" : "bg-navy",
        className
      )}
      {...props}
    >
      <div className={cn("mx-auto w-full max-w-[1200px]", containerClassName)}>{children}</div>
    </section>
  )
}

export { SlantBand }
