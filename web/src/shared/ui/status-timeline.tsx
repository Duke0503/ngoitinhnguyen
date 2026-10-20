import { Check } from "lucide-react"

import { cn } from "@/shared/lib/utils"

type TimelineStep = { label: string; detail?: string }

type StatusTimelineProps = {
  steps: TimelineStep[]
  /** Index of the current (in-progress) step. Steps before it are done. */
  current: number
  className?: string
}

function Dot({ state }: { state: "done" | "current" | "todo" }) {
  return (
    <span
      className={cn(
        "relative z-10 grid size-5 shrink-0 place-items-center rounded-full md:size-[22px]",
        state === "done" && "bg-navy text-white",
        state === "current" && "bg-cta",
        state === "todo" && "border-2 border-field bg-white"
      )}
    >
      {state === "done" && <Check aria-hidden className="size-3" strokeWidth={3} />}
    </span>
  )
}

/** Order / application status. Horizontal from `md`, vertical on mobile. */
function StatusTimeline({ steps, current, className }: StatusTimelineProps) {
  const state = (i: number): "done" | "current" | "todo" => (i < current ? "done" : i === current ? "current" : "todo")
  return (
    <ol className={cn("flex flex-col gap-4 md:flex-row md:gap-0", className)}>
      {steps.map((s, i) => (
        <li key={s.label} className="flex items-center gap-3 md:flex-1 md:flex-col md:items-start md:gap-2.5" aria-current={i === current ? "step" : undefined}>
          <div className="flex items-center md:w-full">
            <Dot state={state(i)} />
            {i < steps.length - 1 && (
              <span aria-hidden className={cn("hidden h-0.5 flex-1 md:block", i < current ? "bg-navy" : "bg-[#e5dac9]")} />
            )}
          </div>
          <div className="flex flex-1 items-baseline justify-between gap-3 md:flex-col md:gap-1">
            <span className={cn("text-[15px]", i === current ? "font-bold text-navy" : i < current ? "font-semibold text-navy" : "font-medium text-muted-ink")}>
              {s.label}
            </span>
            <span className="text-xs text-muted-ink md:text-[13px]">{s.detail ?? "—"}</span>
          </div>
        </li>
      ))}
    </ol>
  )
}

export { StatusTimeline, type TimelineStep }
