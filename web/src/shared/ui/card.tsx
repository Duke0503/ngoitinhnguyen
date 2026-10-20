import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"

// Flat cards with a 1px line; shadows are reserved for floating UI (popovers).
const cardVariants = cva("rounded-xl", {
  variants: {
    tone: {
      white: "border border-line bg-white",
      paper: "border border-line bg-paper",
      night: "bg-night text-white",
      "night-glass": "border border-white/12 bg-white/5 text-white",
      amber: "bg-flame-gold/10",
    },
    padding: {
      none: "",
      sm: "p-4 md:p-5",
      md: "p-5 md:p-7",
      lg: "p-6 md:p-10",
    },
  },
  defaultVariants: { tone: "white", padding: "md" },
})

type CardProps = React.ComponentProps<"div"> & VariantProps<typeof cardVariants>

function Card({ className, tone, padding, ...props }: CardProps) {
  return <div data-slot="card" className={cn(cardVariants({ tone, padding }), className)} {...props} />
}

/** Small uppercase label at the top of a card (“BÁO CÁO TÀI CHÍNH”, “1 · SỐ TIỀN”). */
function CardKicker({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      className={cn("text-xs font-bold tracking-[0.14em] text-muted-ink uppercase", className)}
      {...props}
    />
  )
}

export { Card, CardKicker, cardVariants }
