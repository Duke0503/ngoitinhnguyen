import * as React from "react"

import { formatVnd } from "@/shared/lib/format"

import type { PricedOrder } from "../domain/shop"

type OrderSummaryProps = {
  priced: PricedOrder | null
  promotionLabel?: string
  /** Units still needed for the promotion (0 when earned or none). */
  itemsToPromotion: number
  /** Amount the promotion takes off, for the “buy N more” hint. */
  promotionDiscount?: number
  /** The submit button, rendered inside the night card. */
  action?: React.ReactNode
  footnote?: React.ReactNode
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between gap-4 text-sm">
      <dt className="text-white/80">{label}</dt>
      <dd className={accent ? "font-semibold text-flame-gold tabular-nums" : "font-semibold text-white tabular-nums"}>{value}</dd>
    </div>
  )
}

/** Cart recap on a night card: lines, deal, delivery, total and the order button. */
function OrderSummary({ priced, promotionLabel, itemsToPromotion, promotionDiscount, action, footnote }: OrderSummaryProps) {
  return (
    <section aria-label="Đơn hàng" className="flex flex-col gap-3 rounded-xl bg-night p-5 text-white md:gap-3.5 md:p-7">
      <p className="text-xs font-bold tracking-[0.14em] text-white/65 uppercase">Đơn hàng</p>
      {priced ? (
        <dl className="flex flex-col gap-2.5">
          {priced.lines.map((l) => (
            <Row key={l.slug} label={`${l.name} × ${l.quantity}`} value={formatVnd(l.total)} />
          ))}
          {priced.discount > 0 && <Row label={promotionLabel ?? "Giảm giá"} value={`−${formatVnd(priced.discount)}`} accent />}
          <Row label="Giao tận tay / nhận tại sự kiện" value={priced.shipping === 0 ? "Miễn phí" : formatVnd(priced.shipping)} />
        </dl>
      ) : (
        <p className="text-sm text-white/65">Chưa có sản phẩm nào. Chọn số lượng ở danh sách bên cạnh.</p>
      )}
      {priced && itemsToPromotion > 0 && promotionDiscount && (
        <p className="text-[13px] text-flame-gold">
          Mua thêm {itemsToPromotion} sản phẩm để được giảm {formatVnd(promotionDiscount)}.
        </p>
      )}
      <div className="flex items-end justify-between border-t border-white/15 pt-3.5">
        <span className="text-[15px]">Tổng cộng</span>
        <span className="font-head text-[28px] leading-none font-semibold text-flame-gold tabular-nums md:text-[30px]">{formatVnd(priced?.total ?? 0)}</span>
      </div>
      {action}
      {footnote && <p className="text-xs leading-normal text-white/65">{footnote}</p>}
    </section>
  )
}

export { OrderSummary }
