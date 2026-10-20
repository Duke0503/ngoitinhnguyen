import * as React from "react"
import type { LucideIcon } from "lucide-react"

import { cn } from "@/shared/lib/utils"

/** Icon + text detail (date, place). */
function MetaItem({
  icon: Icon,
  children,
  tone = "light",
  className,
}: {
  icon: LucideIcon
  children: React.ReactNode
  tone?: "light" | "dark"
  className?: string
}) {
  return (
    <span
      className={cn(
        "inline-flex items-start gap-2 text-sm font-medium",
        tone === "light" ? "text-ink" : "text-white/85",
        className
      )}
    >
      <Icon aria-hidden className="mt-0.5 size-4 shrink-0 text-flame-orange" />
      <span>{children}</span>
    </span>
  )
}

/** “TAG • 21.09.2026” line above news titles. */
function MetaLine({ tag, date, className }: { tag: string; date: string; className?: string }) {
  return (
    <p className={cn("flex items-center gap-2.5 text-xs", className)}>
      <span className="font-bold tracking-[0.08em] text-flame-orange uppercase">{tag}</span>
      <span aria-hidden className="size-[3px] rounded-full bg-muted-ink" />
      <time className="text-muted-ink">{date}</time>
    </p>
  )
}

export { MetaItem, MetaLine }
