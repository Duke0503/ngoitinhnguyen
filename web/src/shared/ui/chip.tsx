import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"

const chipVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full font-semibold whitespace-nowrap [&_svg]:shrink-0",
  {
    variants: {
      tone: {
        neutral: "bg-navy/5 text-navy",
        navy: "bg-navy text-white",
        outline: "border border-field bg-white text-navy",
        success: "bg-leaf/15 text-leaf-ink",
        warning: "bg-flame-gold/15 text-amber-ink",
        blossom: "bg-blossom/15 text-blossom-ink",
        // On night backgrounds
        translucent: "bg-white/10 text-white/85",
        "success-dark": "bg-leaf/20 text-[#a8d98a]",
        "outline-dark": "border border-white/20 text-white",
      },
      size: {
        sm: "px-2.5 py-1 text-xs [&_svg]:size-3",
        md: "px-3 py-1.5 text-[13px] [&_svg]:size-3.5",
        lg: "px-4 py-2 text-sm [&_svg]:size-3.5",
      },
    },
    defaultVariants: { tone: "neutral", size: "md" },
  }
)

type ChipProps = React.ComponentProps<"span"> &
  VariantProps<typeof chipVariants> & {
    icon?: React.ReactNode
  }

function Chip({ className, tone, size, icon, children, ...props }: ChipProps) {
  return (
    <span data-slot="chip" className={cn(chipVariants({ tone, size }), className)} {...props}>
      {icon}
      {children}
    </span>
  )
}

export { Chip, chipVariants, type ChipProps }
