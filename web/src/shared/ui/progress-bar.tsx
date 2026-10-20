import { cn } from "@/shared/lib/utils"

type ProgressBarProps = {
  value: number
  max: number
  label?: string
  size?: "sm" | "md"
  className?: string
}

/** Flame-gradient progress track for fundraising goals. */
function ProgressBar({ value, max, label, size = "md", className }: ProgressBarProps) {
  const pct = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-label={label}
      className={cn("w-full overflow-hidden rounded-full bg-line", size === "md" ? "h-2" : "h-1.5", className)}
    >
      <div className="h-full rounded-full bg-flame transition-[width]" style={{ width: `${pct}%` }} />
    </div>
  )
}

export { ProgressBar }
