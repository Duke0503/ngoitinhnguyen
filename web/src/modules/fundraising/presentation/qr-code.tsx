import QRCode from "qrcode"

import { cn } from "@/shared/lib/utils"

type QrCodeProps = {
  value: string
  /** Accessible description, e.g. “Mã VietQR chuyển 25.000đ”. */
  label: string
  className?: string
}

const QUIET_ZONE = 4 // modules of white around the code, as the QR spec requires for reliable scanning

/** Draws a QR code as one SVG path (no canvas, no <img>), so it prerenders and scales crisply. */
function QrCode({ value, label, className }: QrCodeProps) {
  const { modules } = QRCode.create(value, { errorCorrectionLevel: "M" })
  const size = modules.size
  let path = ""
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (modules.get(row, col)) path += `M${col + QUIET_ZONE} ${row + QUIET_ZONE}h1v1h-1z`
    }
  }
  const total = size + QUIET_ZONE * 2

  return (
    <svg viewBox={`0 0 ${total} ${total}`} role="img" aria-label={label} className={cn("block bg-white", className)} shapeRendering="crispEdges">
      <path d={path} fill="#1C1F2E" />
    </svg>
  )
}

export { QrCode }
