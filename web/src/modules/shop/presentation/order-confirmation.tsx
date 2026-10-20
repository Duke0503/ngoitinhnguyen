"use client"

import { Check } from "lucide-react"

import { formatVnd } from "@/shared/lib/format"
import { Button } from "@/shared/ui/button"
import { Card, CardKicker } from "@/shared/ui/card"
import { FactList } from "@/shared/ui/fact-list"
import { StatusTimeline } from "@/shared/ui/status-timeline"
import { VietQrCard, type Fund } from "@/modules/fundraising"

import type { PlacedOrder } from "../application/place-order"
import { orderStatusLabel, orderSteps, stepIndex } from "../domain/order"

type OrderConfirmationProps = {
  order: PlacedOrder
  /** The campaign's fund the transfer goes to; null if it is not available. */
  fund: Fund | null
  pickupLabel: string
  onOrderAgain: () => void
}

/** After an order is accepted: pay by transfer with the order code as the memo, then wait for confirmation. */
function OrderConfirmation({ order, fund, pickupLabel, onOrderAgain }: OrderConfirmationProps) {
  const a = order.address
  return (
    <div className="flex flex-col gap-5 md:gap-8">
      <section aria-labelledby="order-done-title" className="flex flex-col gap-4 rounded-xl bg-night p-6 text-white md:p-8">
        <div className="flex items-start gap-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-leaf">
            <Check aria-hidden className="size-[18px]" strokeWidth={3} />
          </span>
          <h2 id="order-done-title" tabIndex={-1} className="font-head text-[22px] leading-snug font-semibold outline-none md:text-[26px]">
            Đã ghi nhận đơn {order.code}
          </h2>
        </div>
        <p className="text-[15px] leading-relaxed text-white/80">
          Bạn chuyển khoản <strong className="text-flame-gold">{formatVnd(order.priced.total)}</strong> theo mã bên dưới, ghi đúng nội dung <strong className="text-white">{order.code}</strong>. Ban tổ chức sẽ đối soát và xác nhận đơn của bạn.
        </p>
      </section>

      <div className="grid gap-5 md:grid-cols-[1fr_380px] md:items-start md:gap-8">
        {fund ? (
          <VietQrCard fund={fund} amount={order.priced.total} reference={order.code} />
        ) : (
          <Card padding="md">
            <p className="text-[15px] text-ink">Ban tổ chức sẽ liên hệ với bạn qua số điện thoại để hướng dẫn thanh toán.</p>
          </Card>
        )}
        <Card padding="none" className="flex flex-col gap-4 p-5 md:p-6">
          <CardKicker>Đơn của bạn</CardKicker>
          <ul className="flex flex-col gap-1.5 text-sm">
            {order.priced.lines.map((l) => (
              <li key={l.slug} className="flex justify-between gap-3">
                <span>
                  {l.name} × {l.quantity}
                </span>
                <span className="font-semibold tabular-nums">{formatVnd(l.total)}</span>
              </li>
            ))}
            {order.priced.discount > 0 && (
              <li className="flex justify-between gap-3 text-leaf-ink">
                <span>Giảm giá</span>
                <span className="font-semibold tabular-nums">−{formatVnd(order.priced.discount)}</span>
              </li>
            )}
          </ul>
          <FactList
            facts={[
              { label: "Người nhận", value: `${order.recipientName} · ${order.phone}` },
              { label: order.method === "hand" ? "Giao tận tay" : "Nhận hàng", value: a ? `${a.street}, ${a.wardName}, ${a.provinceLabel}` : pickupLabel },
            ]}
            className="[&_dt]:md:w-[92px]"
          />
        </Card>
      </div>

      <div className="flex flex-col gap-4 rounded-xl border border-line bg-white p-5 md:p-7">
        <CardKicker>Trạng thái đơn hàng</CardKicker>
        <StatusTimeline
          current={stepIndex(order.status)}
          steps={orderSteps.map((s, i) => ({ label: orderStatusLabel[s], detail: i === 0 ? "Vừa xong" : undefined }))}
        />
        <p className="text-[13px] text-muted-ink">Bạn giữ lại mã {order.code} để hỏi ban tổ chức về đơn hàng.</p>
      </div>

      <div>
        <Button variant="outline" onClick={onOrderAgain}>
          Đặt thêm đơn khác
        </Button>
      </div>
    </div>
  )
}

export { OrderConfirmation }
