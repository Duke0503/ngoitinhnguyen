"use client"

import * as React from "react"
import { Award } from "lucide-react"
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui"

import { formatVnd, parseVnd } from "@/shared/lib/format"
import { Callout } from "@/shared/ui/callout"
import { Card, CardKicker } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"

type AmountPickerProps = {
  presets: number[]
  /** Chosen amount in VND; null while a custom amount is empty. */
  value: number | null
  onValueChange: (value: number | null) => void
  certificateFrom?: number
}

const OTHER = "other"

function AmountPicker({ presets, value, onValueChange, certificateFrom }: AmountPickerProps) {
  const [custom, setCustom] = React.useState(false)
  const selected = custom ? OTHER : value !== null && presets.includes(value) ? String(value) : ""
  const customId = React.useId()

  const itemClass =
    "grid h-12 flex-1 place-items-center rounded-[10px] border border-field bg-white px-2 text-[15px] font-medium text-navy transition-colors outline-none hover:border-navy/50 focus-visible:ring-3 focus-visible:ring-navy/20 data-[state=on]:border-2 data-[state=on]:border-navy data-[state=on]:bg-navy/6 data-[state=on]:font-bold"

  return (
    <Card padding="none" className="flex flex-col gap-4 p-5 md:p-7">
      <CardKicker id={`${customId}-legend`}>1 · Số tiền ủng hộ</CardKicker>
      <ToggleGroupPrimitive.Root
        type="single"
        value={selected}
        onValueChange={(v) => {
          if (!v) return
          if (v === OTHER) {
            setCustom(true)
            onValueChange(null)
          } else {
            setCustom(false)
            onValueChange(Number(v))
          }
        }}
        aria-labelledby={`${customId}-legend`}
        className="grid grid-cols-3 gap-2.5 md:flex"
      >
        {presets.map((p) => (
          <ToggleGroupPrimitive.Item key={p} value={String(p)} className={itemClass}>
            {formatVnd(p)}
          </ToggleGroupPrimitive.Item>
        ))}
        <ToggleGroupPrimitive.Item value={OTHER} className={itemClass}>
          Số khác
        </ToggleGroupPrimitive.Item>
      </ToggleGroupPrimitive.Root>

      {custom && (
        <div className="flex flex-col gap-2">
          <label htmlFor={customId} className="text-sm font-semibold text-ink">
            Nhập số tiền (đồng)
          </label>
          <Input
            id={customId}
            inputMode="numeric"
            autoComplete="off"
            placeholder="Ví dụ: 30.000"
            value={value ? new Intl.NumberFormat("vi-VN").format(value) : ""}
            onChange={(e) => onValueChange(parseVnd(e.target.value) ?? null)}
            autoFocus
          />
        </div>
      )}

      {certificateFrom && (
        <Callout tone="blossom" icon={Award}>
          {value !== null && value >= certificateFrom
            ? `Từ ${formatVnd(certificateFrom)}: bạn nhận giấy chứng nhận online có mộc đỏ của ban tổ chức.`
            : `Góp từ ${formatVnd(certificateFrom)} để nhận giấy chứng nhận online có mộc đỏ của ban tổ chức.`}
        </Callout>
      )}
    </Card>
  )
}

export { AmountPicker }
