"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"

import { cn } from "@/shared/lib/utils"

type CopyFieldProps = {
  label: string
  value: string
  /** Text actually copied, if different from what is shown. */
  copyValue?: string
  copyable?: boolean
  emphasis?: "default" | "large" | "highlight"
  /** `dark` for night/navy backgrounds. */
  tone?: "light" | "dark"
  className?: string
}

/** Label + value row with a “Sao chép” button (bank account, transfer memo). */
function CopyField({ label, value, copyValue, copyable = true, emphasis = "default", tone = "light", className }: CopyFieldProps) {
  const dark = tone === "dark"
  const [copied, setCopied] = React.useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(copyValue ?? value)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      // Clipboard can be blocked (insecure context, permissions); the value stays selectable.
    }
  }

  return (
    <div className={cn("flex items-center gap-3 border-b py-3 last:border-b-0", dark ? "border-white/15" : "border-line", className)}>
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className={cn("text-xs", dark ? "text-white/60" : "text-muted-ink")}>{label}</span>
        <span
          className={cn(
            "font-bold break-words select-all",
            emphasis === "large" && cn("text-lg tracking-wide", dark ? "text-flame-gold" : "text-navy"),
            emphasis === "highlight" && cn("text-[15px]", dark ? "text-flame-gold" : "text-cta"),
            emphasis === "default" && cn("text-[15px]", dark ? "text-white" : "text-navy")
          )}
        >
          {value}
        </span>
      </div>
      {copyable && (
        <button
          type="button"
          onClick={copy}
          className={cn(
            "inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border px-3.5 text-xs font-semibold transition-colors outline-none focus-visible:ring-3 md:h-9",
            dark ? "border-white/30 text-white hover:bg-white/10 focus-visible:ring-white/30" : "border-field text-navy hover:bg-sand focus-visible:ring-navy/20"
          )}
        >
          {copied ? <Check aria-hidden className="size-3.5 text-leaf" /> : <Copy aria-hidden className="size-3.5" />}
          <span aria-live="polite">{copied ? "Đã chép" : "Sao chép"}</span>
        </button>
      )}
    </div>
  )
}

export { CopyField }
