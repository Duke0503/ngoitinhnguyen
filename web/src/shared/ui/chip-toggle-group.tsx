"use client"

import { Check } from "lucide-react"
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui"

import { cn } from "@/shared/lib/utils"

type ChipOption = { value: string; label: string }

type ChipToggleGroupProps = {
  options: ChipOption[]
  value: string[]
  onValueChange: (value: string[]) => void
  /** Once reached, unselected chips are disabled. */
  max?: number
  "aria-label"?: string
  "aria-labelledby"?: string
  "aria-invalid"?: boolean
  "aria-describedby"?: string
  className?: string
}

/** Multi-select chips (departments, field teams). 40px tall for comfortable touch targets. */
function ChipToggleGroup({ options, value, onValueChange, max, className, ...aria }: ChipToggleGroupProps) {
  const full = max !== undefined && value.length >= max
  return (
    <ToggleGroupPrimitive.Root type="multiple" role="group" value={value} onValueChange={onValueChange} className={cn("flex flex-wrap gap-2", className)} {...aria}>
      {options.map((o) => {
        const on = value.includes(o.value)
        return (
          <ToggleGroupPrimitive.Item
            key={o.value}
            value={o.value}
            disabled={full && !on}
            className="inline-flex h-10 items-center gap-1.5 rounded-full border border-field bg-white px-4 text-sm font-medium text-navy transition-colors outline-none hover:border-navy/50 focus-visible:ring-3 focus-visible:ring-navy/20 disabled:cursor-not-allowed disabled:opacity-45 data-[state=on]:border-navy data-[state=on]:bg-navy data-[state=on]:text-white"
          >
            {on && <Check aria-hidden className="size-3.5" />}
            {o.label}
          </ToggleGroupPrimitive.Item>
        )
      })}
    </ToggleGroupPrimitive.Root>
  )
}

export { ChipToggleGroup, type ChipOption }
