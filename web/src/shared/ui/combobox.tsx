"use client"

import * as React from "react"
import { Check, Search } from "lucide-react"

import { cn } from "@/shared/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/shared/ui/command"
import { fieldBase } from "@/shared/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover"

type ComboboxOption = {
  value: string
  label: string
  description?: string
  /** Extra text matched by the search (e.g. the label without accents). */
  keywords?: string
}

type ComboboxProps = {
  id: string
  options: ComboboxOption[]
  value: string | null
  onValueChange: (value: string | null) => void
  placeholder?: string
  searchPlaceholder?: string
  emptyText?: string
  /** Small note under the list, e.g. data source of the address list. */
  footnote?: React.ReactNode
  disabled?: boolean
  "aria-invalid"?: boolean
  "aria-describedby"?: string
}

/**
 * Searchable single select (e.g. Phường/Xã). Matching ignores Vietnamese
 * diacritics, so “an phu dong” finds “Phường An Phú Đông”.
 */
function Combobox({
  id,
  options,
  value,
  onValueChange,
  placeholder = "Chọn…",
  searchPlaceholder = "Tìm kiếm…",
  emptyText = "Không tìm thấy",
  footnote,
  disabled,
  ...aria
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const selected = options.find((o) => o.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild disabled={disabled}>
        <button
          id={id}
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-controls={`${id}-list`}
          className={cn(fieldBase, "flex h-12 items-center gap-2 text-left", open && "border-navy ring-3 ring-navy/12")}
          {...aria}
        >
          <Search aria-hidden className="size-4 shrink-0 text-muted-ink" />
          <span className={cn("truncate", selected ? "font-semibold text-ink" : "text-[#9a9daa]")}>
            {selected?.label ?? placeholder}
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-(--radix-popover-trigger-width) p-0">
        <Command filter={(itemValue, search) => (normalize(itemValue).includes(normalize(search)) ? 1 : 0)}>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList id={`${id}-list`}>
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup>
              {options.map((o) => (
                <CommandItem
                  key={o.value}
                  value={`${o.label} ${o.description ?? ""} ${o.keywords ?? ""}`}
                  onSelect={() => {
                    onValueChange(o.value === value ? null : o.value)
                    setOpen(false)
                  }}
                  className="flex items-start gap-2 py-2"
                >
                  <span className="flex flex-1 flex-col">
                    <span className="font-semibold text-navy">{o.label}</span>
                    {o.description && <span className="text-xs text-muted-ink">{o.description}</span>}
                  </span>
                  <Check aria-hidden className={cn("mt-0.5 size-4 text-navy", o.value === value ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          {footnote && <p className="border-t border-line px-3 py-2 text-xs text-muted-ink">{footnote}</p>}
        </Command>
      </PopoverContent>
    </Popover>
  )
}

/** Lowercase and strip Vietnamese diacritics (đ → d) for fuzzy matching. */
function normalize(s: string) {
  return s.normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/đ/gi, "d").toLowerCase()
}

export { Combobox, type ComboboxOption }
