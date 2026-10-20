import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"
import { Eyebrow } from "@/shared/ui/eyebrow"

const titleVariants = cva("font-head font-semibold text-balance", {
  variants: {
    size: {
      xl: "text-[38px] leading-[1.1] md:text-hero",
      lg: "text-[30px] leading-[1.18] md:text-h1",
      md: "text-[26px] leading-[1.2] md:text-h2",
      sm: "text-[24px] leading-[1.22] md:text-[30px]",
    },
    tone: {
      light: "text-navy",
      dark: "text-white",
    },
  },
  defaultVariants: { size: "lg", tone: "light" },
})

type SectionHeadingProps = Omit<React.ComponentProps<"div">, "title"> &
  VariantProps<typeof titleVariants> & {
    eyebrow?: React.ReactNode
    title: React.ReactNode
    description?: React.ReactNode
    /** Heading level for document outline; visual size is controlled by `size`. `id` goes on the heading (for aria-labelledby). */
    as?: "h1" | "h2" | "h3"
  }

function SectionHeading({
  eyebrow,
  title,
  description,
  size,
  tone,
  as: Heading = "h2",
  id,
  className,
  ...props
}: SectionHeadingProps) {
  const dark = tone === "dark"
  return (
    <div className={cn("flex flex-col gap-2.5 md:gap-3", className)} {...props}>
      {eyebrow && <Eyebrow tone={dark ? "gold" : "orange"}>{eyebrow}</Eyebrow>}
      <Heading id={id} className={titleVariants({ size, tone })}>
        {title}
      </Heading>
      {description && (
        <p
          className={cn(
            "max-w-[62ch] text-[15px] leading-relaxed md:text-[17px]",
            dark ? "text-white/80" : "text-muted-ink"
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}

export { SectionHeading, titleVariants }
