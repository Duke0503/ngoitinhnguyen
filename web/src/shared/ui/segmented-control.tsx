"use client"

import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui"

import { cn } from "@/shared/lib/utils"

type SegmentedOption = { value: string; label: string; description?: string }

type SegmentedControlProps = {
  options: SegmentedOption[]
  value: string
  onValueChange: (value: string) => void
  "aria-label": string
  className?: string
}

/** Single-choice segmented control (Cách nhận hàng: Giao tận tay / Điểm hẹn / Chuyển phát). */
function SegmentedControl({ options, value, onValueChange, className, ...aria }: SegmentedControlProps) {
  return (
    <ToggleGroupPrimitive.Root
      type="single"
      value={value}
      onValueChange={(v) => v && onValueChange(v)}
      className={cn("flex w-full gap-1 rounded-[10px] bg-sand p-1", className)}
      {...aria}
    >
      {options.map((o) => (
        <ToggleGroupPrimitive.Item
          key={o.value}
          value={o.value}
          className="flex flex-1 flex-col items-center gap-0.5 rounded-lg px-2 py-2.5 text-center text-navy transition-colors outline-none hover:bg-white/60 focus-visible:ring-3 focus-visible:ring-navy/20 data-[state=on]:bg-white data-[state=on]:shadow-[0_1px_3px_rgb(31_42_92/0.12)] md:items-start md:px-3 md:text-left"
        >
          <span className="text-[13px] font-medium in-data-[state=on]:font-bold md:text-sm">{o.label}</span>
          {o.description && <span className="hidden text-xs text-muted-ink md:block">{o.description}</span>}
        </ToggleGroupPrimitive.Item>
      ))}
    </ToggleGroupPrimitive.Root>
  )
}

export { SegmentedControl, type SegmentedOption }
