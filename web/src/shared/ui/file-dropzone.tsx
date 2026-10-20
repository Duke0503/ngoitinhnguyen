"use client"

import * as React from "react"
import { ImageUp, X } from "lucide-react"

import { cn } from "@/shared/lib/utils"

type FileDropzoneProps = {
  id: string
  accept?: string
  /** Max size in bytes; larger files are rejected with `onError`. */
  maxSize?: number
  file: File | null
  onFileChange: (file: File | null) => void
  onError?: (message: string) => void
  title?: string
  hint?: string
  "aria-describedby"?: string
}

function FileDropzone({
  id,
  accept = "image/jpeg,image/png,image/webp,image/heic",
  maxSize = 10 * 1024 * 1024,
  file,
  onFileChange,
  onError,
  title = "Chọn ảnh hoặc kéo thả vào đây",
  hint = "JPG, PNG, HEIC · tối đa 10MB",
  ...aria
}: FileDropzoneProps) {
  const [dragging, setDragging] = React.useState(false)

  function take(f: File | undefined) {
    if (!f) return
    if (f.size > maxSize) {
      onError?.(`Ảnh vượt quá ${Math.round(maxSize / 1024 / 1024)}MB`)
      return
    }
    onFileChange(f)
  }

  if (file) {
    return (
      <div className="flex items-center gap-3 rounded-lg border border-field bg-white px-4 py-3">
        <ImageUp aria-hidden className="size-5 shrink-0 text-leaf" />
        <span className="min-w-0 flex-1 truncate text-sm font-semibold text-navy">{file.name}</span>
        <button
          type="button"
          onClick={() => onFileChange(null)}
          className="grid size-8 place-items-center rounded-full text-muted-ink hover:bg-sand focus-visible:ring-3 focus-visible:ring-navy/20 outline-none"
          aria-label="Bỏ ảnh đã chọn"
        >
          <X aria-hidden className="size-4" />
        </button>
      </div>
    )
  }

  return (
    <label
      htmlFor={id}
      onDragOver={(e) => {
        e.preventDefault()
        setDragging(true)
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragging(false)
        take(e.dataTransfer.files[0])
      }}
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-lg border-[1.5px] border-dashed bg-paper px-4 py-4 transition-colors has-focus-visible:ring-3 has-focus-visible:ring-navy/20 md:py-5",
        dragging ? "border-flame-orange bg-flame-gold/10" : "border-[#c9bba5] hover:border-flame-orange"
      )}
    >
      <ImageUp aria-hidden className="size-6 shrink-0 text-flame-orange" />
      <span className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold text-navy">{title}</span>
        <span className="text-xs text-muted-ink">{hint}</span>
      </span>
      <input id={id} type="file" accept={accept} className="sr-only" onChange={(e) => take(e.target.files?.[0])} {...aria} />
    </label>
  )
}

export { FileDropzone }
