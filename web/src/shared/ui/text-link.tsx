import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/shared/lib/utils"

const textLinkVariants = cva(
  "group/link inline-flex items-center gap-2 font-semibold transition-colors outline-none focus-visible:underline",
  {
    variants: {
      tone: {
        navy: "text-navy hover:text-cta",
        cta: "text-cta hover:text-cta-hover",
        light: "text-white hover:text-flame-gold",
      },
      size: {
        sm: "text-sm",
        md: "text-[15px]",
      },
      underline: {
        true: "underline decoration-1 underline-offset-4",
        false: "",
      },
    },
    defaultVariants: { tone: "navy", size: "md", underline: false },
  }
)

type TextLinkProps = React.ComponentProps<typeof Link> &
  VariantProps<typeof textLinkVariants> & {
    /** `arrow` → “Xem tất cả →”, `external` → ↗, `none` for plain underline links. */
    icon?: "arrow" | "external" | "none"
    /** Decorative icon before the label (SVGs are block-level, so it must be a flex sibling, not inline in the label). */
    leading?: React.ReactNode
  }

function TextLink({ className, tone, size, underline, icon = "arrow", leading, children, ...props }: TextLinkProps) {
  const Icon = icon === "arrow" ? ArrowRight : icon === "external" ? ArrowUpRight : null
  return (
    <Link className={cn(textLinkVariants({ tone, size, underline }), className)} {...props}>
      {leading}
      <span>{children}</span>
      {Icon && (
        <Icon aria-hidden className="size-[18px] transition-transform group-hover/link:translate-x-0.5" />
      )}
    </Link>
  )
}

export { TextLink, textLinkVariants }
