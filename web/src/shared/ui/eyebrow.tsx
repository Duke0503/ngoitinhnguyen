import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"

const eyebrowVariants = cva("inline-flex items-center gap-2.5 text-eyebrow font-semibold uppercase", {
  variants: {
    tone: {
      orange: "text-flame-orange",
      gold: "text-flame-gold",
      cta: "text-cta",
      muted: "text-muted-ink",
    },
  },
  defaultVariants: { tone: "orange" },
})

type EyebrowProps = React.ComponentProps<"p"> &
  VariantProps<typeof eyebrowVariants> & {
    /** `dash` → hero eyebrow, `dot` → “đang diễn ra” live marker. */
    marker?: "dash" | "dot"
  }

function Eyebrow({ className, tone, marker, children, ...props }: EyebrowProps) {
  return (
    <p className={cn(eyebrowVariants({ tone }), className)} {...props}>
      {marker === "dash" && <span aria-hidden className="h-0.5 w-7 bg-current" />}
      {marker === "dot" && <span aria-hidden className="size-2 rounded-full bg-current" />}
      {children}
    </p>
  )
}

export { Eyebrow, eyebrowVariants }
