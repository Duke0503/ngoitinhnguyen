import * as React from "react"

import { cn } from "@/shared/lib/utils"

type MeterRowProps = {
  label: React.ReactNode
  value: React.ReactNode
  /** 0–1 share of the largest row; drives bar length. */
  ratio: number
  tone?: "navy" | "orange"
  className?: string
}

/** Label / value / thin bar row, used in financial report cards. */
function MeterRow({ label, value, ratio, tone = "navy", className }: MeterRowProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-baseline justify-between gap-4 text-[13px]">
        <span className="text-muted-ink">{label}</span>
        <span className="font-semibold text-ink tabular-nums">{value}</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-sand">
        <div
          className={cn("h-full rounded-full", tone === "navy" ? "bg-navy" : "bg-flame-orange")}
          style={{ width: `${Math.round(Math.min(1, Math.max(0, ratio)) * 100)}%` }}
        />
      </div>
    </div>
  )
}

export { MeterRow }
