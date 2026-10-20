import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"

// Big serif figure + label, set like a printed annual report.
const statVariants = cva("flex flex-col", {
  variants: {
    size: {
      sm: "gap-0.5 [&_[data-value]]:text-[26px] [&_[data-label]]:text-xs",
      md: "gap-1 [&_[data-value]]:text-[30px] md:[&_[data-value]]:text-[36px] [&_[data-label]]:text-[13px]",
      lg: "gap-1.5 [&_[data-value]]:text-[44px] md:[&_[data-value]]:text-[64px] [&_[data-label]]:text-[14px] md:[&_[data-label]]:text-[15px]",
    },
    tone: {
      light: "[&_[data-value]]:text-navy [&_[data-label]]:text-muted-ink",
      dark: "[&_[data-value]]:text-flame-gold [&_[data-label]]:text-white/80",
    },
    divider: {
      none: "",
      left: "border-l pl-5 md:pl-7",
      top: "border-t pt-3 md:pt-4",
      /** Top rule in mobile grids, left rule in the desktop row. */
      responsive: "border-t pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-7",
    },
  },
  compoundVariants: [
    { tone: "dark", divider: ["left", "top", "responsive"], className: "border-white/15" },
    { tone: "light", divider: ["left", "top", "responsive"], className: "border-line" },
  ],
  defaultVariants: { size: "md", tone: "light", divider: "none" },
})

type StatProps = React.ComponentProps<"div"> &
  VariantProps<typeof statVariants> & {
    value: React.ReactNode
    label: React.ReactNode
  }

function Stat({ value, label, size, tone, divider, className, ...props }: StatProps) {
  return (
    <div className={cn(statVariants({ size, tone, divider }), className)} {...props}>
      <span data-value className="font-head leading-none font-medium tabular-nums">
        {value}
      </span>
      <span data-label className="leading-snug text-pretty">
        {label}
      </span>
    </div>
  )
}

export { Stat }
