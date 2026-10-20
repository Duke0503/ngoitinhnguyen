import { Fragment } from "react"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import { cn } from "@/shared/lib/utils"

type Crumb = { label: string; href?: string }

/** Last item is the current page (no link). `tone="dark"` for night heroes. */
function Breadcrumb({ items, tone = "light", className }: { items: Crumb[]; tone?: "light" | "dark"; className?: string }) {
  const dark = tone === "dark"
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-xs md:text-[13px]">
        {items.map((c, i) => {
          const last = i === items.length - 1
          return (
            <Fragment key={c.label}>
              {i > 0 && <ChevronRight aria-hidden className={cn("size-3.5", dark ? "text-white/40" : "text-muted-ink")} />}
              <li>
                {c.href && !last ? (
                  <Link href={c.href} className={cn("hover:underline", dark ? "text-white/60" : "text-muted-ink")}>
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current={last ? "page" : undefined} className={cn(last ? (dark ? "text-flame-gold" : "text-navy") : dark ? "text-white/60" : "text-muted-ink")}>
                    {c.label}
                  </span>
                )}
              </li>
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}

export { Breadcrumb, type Crumb }
