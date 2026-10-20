import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"

/** 1200px content column with the design's side gutters (20px mobile, 120px at 1440). */
function Container({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("mx-auto w-full max-w-[1200px]", className)} {...props} />
}

const sectionVariants = cva("w-full px-5 md:px-10 xl:px-0", {
  variants: {
    tone: {
      paper: "bg-paper text-ink",
      white: "bg-white text-ink",
      night: "bg-night text-white",
      navy: "bg-navy text-white",
    },
    spacing: {
      none: "",
      sm: "py-10 md:py-[72px]",
      md: "py-12 md:py-24",
      lg: "py-14 md:py-[104px]",
    },
    rule: {
      none: "",
      top: "border-t border-line",
    },
  },
  defaultVariants: { tone: "paper", spacing: "md", rule: "none" },
})

type SectionProps = React.ComponentProps<"section"> &
  VariantProps<typeof sectionVariants> & {
    containerClassName?: string
  }

/** Full-bleed page band with a background tone; content is constrained by `Container`. */
function Section({ tone, spacing, rule, className, containerClassName, children, ...props }: SectionProps) {
  return (
    <section className={cn(sectionVariants({ tone, spacing, rule }), className)} {...props}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  )
}

export { Section, Container, sectionVariants }
