import * as React from "react"

import { cn } from "@/shared/lib/utils"

type FieldProps = {
  label: React.ReactNode
  htmlFor: string
  /** Shows “(không bắt buộc)” next to the label. */
  optional?: boolean
  hint?: React.ReactNode
  error?: React.ReactNode
  className?: string
  children: React.ReactNode
}

/**
 * Label + control + hint/error. The control must use `id={htmlFor}` and, when
 * there is a hint or error, `aria-describedby={`${htmlFor}-desc`}`.
 */
function Field({ label, htmlFor, optional, hint, error, className, children }: FieldProps) {
  const desc = error ?? hint
  return (
    <div className={cn("flex flex-col gap-[7px]", className)}>
      <label htmlFor={htmlFor} className="flex items-baseline gap-1.5 text-sm font-semibold text-ink">
        {label}
        {optional && <span className="text-xs font-normal text-muted-ink">(không bắt buộc)</span>}
      </label>
      {children}
      {desc && (
        <p id={`${htmlFor}-desc`} className={cn("text-xs leading-normal", error ? "text-cta" : "text-muted-ink")}>
          {desc}
        </p>
      )}
    </div>
  )
}

export { Field }
