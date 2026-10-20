import { Fragment } from "react"

import { cn } from "@/shared/lib/utils"

type StepsProps = {
  steps: string[]
  /** Zero-based index of the current step; earlier steps render as done. */
  current: number
  className?: string
}

/**
 * Flow progress indicator. Desktop: numbered dots joined by lines.
 * Mobile: three bars with labels underneath (as in the donate design).
 */
function Steps({ steps, current, className }: StepsProps) {
  return (
    <nav aria-label="Tiến trình" className={className}>
      <ol className="hidden items-center gap-2.5 md:flex">
        {steps.map((label, i) => {
          const reached = i <= current
          return (
            <Fragment key={label}>
              {i > 0 && <li aria-hidden className="h-px w-7 bg-field" />}
              <li className="flex items-center gap-2" aria-current={i === current ? "step" : undefined}>
                <span
                  className={cn(
                    "grid size-6 place-items-center rounded-full text-xs font-bold",
                    reached ? "bg-navy text-white" : "border border-field bg-white text-muted-ink"
                  )}
                >
                  {i + 1}
                </span>
                <span className={cn("text-[13px]", reached ? "text-navy" : "text-muted-ink", i === current ? "font-bold" : "font-medium")}>
                  {label}
                </span>
              </li>
            </Fragment>
          )
        })}
      </ol>
      <ol className="flex gap-1.5 md:hidden">
        {steps.map((label, i) => (
          <li key={label} className="flex flex-1 flex-col gap-1.5" aria-current={i === current ? "step" : undefined}>
            <span className={cn("h-1 rounded-full", i <= current ? "bg-navy" : "bg-[#e5dac9]")} />
            <span className={cn("text-xs", i <= current ? "font-bold text-navy" : "font-medium text-muted-ink")}>
              {label}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export { Steps }
