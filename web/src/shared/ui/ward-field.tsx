"use client"

import * as React from "react"

import { loadWards, searchKey, type Ward } from "@/shared/address/address"
import { Combobox, type ComboboxOption } from "@/shared/ui/combobox"

type WardFieldProps = {
  id: string
  provinceCode: string | null
  provinceLabel?: string
  value: string | null
  onValueChange: (wardCode: string | null) => void
  "aria-invalid"?: boolean
  "aria-describedby"?: string
}

/** Searchable phường/xã picker for a province: loads that province's wards on demand and matches without accents. */
function WardField({ id, provinceCode, provinceLabel, value, onValueChange, ...aria }: WardFieldProps) {
  const [loaded, setLoaded] = React.useState<{ code: string; wards: Ward[] } | null>(null)

  React.useEffect(() => {
    if (!provinceCode) return
    let cancelled = false
    loadWards(provinceCode).then((wards) => {
      if (!cancelled) setLoaded({ code: provinceCode, wards })
    })
    return () => {
      cancelled = true
    }
  }, [provinceCode])

  const ready = loaded !== null && loaded.code === provinceCode
  const options: ComboboxOption[] = React.useMemo(
    () => (ready ? loaded.wards.map((w) => ({ value: w.code, label: w.name, description: provinceLabel, keywords: searchKey(w.name) })) : []),
    [ready, loaded, provinceLabel]
  )

  return (
    <Combobox
      id={id}
      options={options}
      value={ready ? value : null}
      onValueChange={onValueChange}
      disabled={!provinceCode || !ready}
      placeholder={!provinceCode ? "Chọn tỉnh / thành phố trước" : ready ? "Tìm phường, xã…" : "Đang tải danh sách…"}
      searchPlaceholder="Gõ tên phường, xã (không cần dấu)"
      emptyText="Không tìm thấy phường, xã"
      footnote="Theo danh mục đơn vị hành chính mới (từ 01/07/2025)"
      {...aria}
    />
  )
}

export { WardField }
