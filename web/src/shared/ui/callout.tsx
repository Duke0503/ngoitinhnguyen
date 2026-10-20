import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Award, CircleCheck, Info, Lock, TriangleAlert, type LucideIcon } from "lucide-react"

import { cn } from "@/shared/lib/utils"

const calloutVariants = cva("flex items-start gap-2.5 rounded-lg px-3.5 py-3 text-[13px] leading-normal", {
  variants: {
    tone: {
      info: "bg-flame-gold/12 text-amber-ink [&_svg]:text-[#9a6a00]",
      success: "bg-leaf/10 text-leaf-ink [&_svg]:text-[#3f7a1f]",
      blossom: "bg-blossom/10 text-blossom-ink [&_svg]:text-[#b4386a]",
      navy: "bg-navy/5 text-navy",
      warning: "bg-cta/8 text-cta",
    },
  },
  defaultVariants: { tone: "info" },
})

const defaultIcons: Record<string, LucideIcon> = {
  info: Info,
  success: CircleCheck,
  blossom: Award,
  navy: Lock,
  warning: TriangleAlert,
}

type CalloutProps = React.ComponentProps<"div"> &
  VariantProps<typeof calloutVariants> & {
    icon?: LucideIcon
  }

function Callout({ tone = "info", icon, className, children, ...props }: CalloutProps) {
  const Icon = icon ?? defaultIcons[tone ?? "info"]
  return (
    <div role="note" className={cn(calloutVariants({ tone }), className)} {...props}>
      <Icon aria-hidden className="mt-px size-4 shrink-0" />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}

export { Callout }
