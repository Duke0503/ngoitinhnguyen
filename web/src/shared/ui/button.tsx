import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/shared/lib/utils"

// Brand buttons are pills. `primary` (CTA ember) is reserved for the single most
// important action in a section; `outline` is the secondary action on light
// backgrounds; `gold` / `outline-light` are the equivalents on night sections.
const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-transparent font-semibold whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/40 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[18px]",
  {
    variants: {
      variant: {
        primary: "bg-cta text-white hover:bg-cta-hover",
        outline: "border-navy border-[1.5px] bg-transparent text-navy hover:bg-navy/5",
        gold: "bg-flame-gold text-night hover:bg-[#f0a800] focus-visible:ring-flame-gold/50",
        "outline-light":
          "border-white/40 border-[1.5px] bg-transparent text-white hover:bg-white/10 focus-visible:ring-white/40",
        subtle: "border-field bg-white text-navy hover:bg-sand",
        ghost: "text-navy hover:bg-navy/5",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-6 text-[15px]",
        lg: "h-14 px-7 text-base",
        icon: "size-10",
        "icon-sm": "size-8 [&_svg:not([class*='size-'])]:size-4",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    fullWidth?: boolean
  }

function Button({
  className,
  variant,
  size,
  asChild = false,
  fullWidth = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      className={cn(buttonVariants({ variant, size }), fullWidth && "w-full", className)}
      {...props}
    />
  )
}

export { Button, buttonVariants, type ButtonProps }
