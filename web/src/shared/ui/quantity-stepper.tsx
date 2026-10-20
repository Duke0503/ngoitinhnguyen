"use client"

import { Minus, Plus } from "lucide-react"

import { cn } from "@/shared/lib/utils"

type QuantityStepperProps = {
  value: number
  onValueChange: (value: number) => void
  min?: number
  max?: number
  /** Accessible name, e.g. the product name. */
  label: string
  className?: string
}

function QuantityStepper({ value, onValueChange, min = 0, max = 99, label, className }: QuantityStepperProps) {
  const btn =
    "grid size-11 place-items-center rounded-full text-navy outline-none transition-colors hover:bg-sand focus-visible:ring-3 focus-visible:ring-navy/20 disabled:text-[#c4bbae] disabled:hover:bg-transparent"
  return (
    <div role="group" aria-label={`Số lượng ${label}`} className={cn("inline-flex items-center rounded-full border border-field bg-white", className)}>
      <button type="button" className={btn} aria-label="Giảm" disabled={value <= min} onClick={() => onValueChange(Math.max(min, value - 1))}>
        <Minus aria-hidden className="size-[15px]" />
      </button>
      <output aria-live="polite" className="w-7 text-center text-[15px] font-bold text-navy tabular-nums">
        {value}
      </output>
      <button type="button" className={btn} aria-label="Tăng" disabled={value >= max} onClick={() => onValueChange(Math.min(max, value + 1))}>
        <Plus aria-hidden className="size-[15px]" />
      </button>
    </div>
  )
}

export { QuantityStepper }
