"use client"

import * as React from "react"
import { ArrowRight, MapPin, Truck } from "lucide-react"
import { Controller, useForm, useWatch } from "react-hook-form"

import { findProvince, provinceLabel, provinces } from "@/shared/address/address"
import { formatVnd } from "@/shared/lib/format"
import { zodResolver } from "@/shared/lib/zod-resolver"
import { Button } from "@/shared/ui/button"
import { Callout } from "@/shared/ui/callout"
import { Card, CardKicker } from "@/shared/ui/card"
import { Field } from "@/shared/ui/field"
import { Input } from "@/shared/ui/input"
import { NativeSelect } from "@/shared/ui/native-select"
import { SegmentedControl } from "@/shared/ui/segmented-control"
import { Textarea } from "@/shared/ui/textarea"
import { WardField } from "@/shared/ui/ward-field"
import type { Fund } from "@/modules/fundraising"

import { makeOrderSchema, type OrderFormFields, type OrderValues } from "../application/order-schema"
import type { PlacedOrder } from "../application/place-order"
import { handDeliveryAvailable, itemsToPromotion, priceOrder, type ShopConfig } from "../domain/shop"
import { placeOrderAction } from "../infrastructure/place-order-action"
import { OrderConfirmation } from "./order-confirmation"
import { OrderSummary } from "./order-summary"
import { ProductRow } from "./product-row"

type ShopFlowProps = {
  config: ShopConfig
  /** The campaign's fund, used for the payment QR after an order is placed. */
  fund: Fund | null
}

const describedBy = (id: string, has: boolean) => (has ? `${id}-desc` : undefined)

function ShopFlow({ config, fund }: ShopFlowProps) {
  const [placed, setPlaced] = React.useState<PlacedOrder | null>(null)

  const form = useForm<OrderFormFields, unknown, OrderValues>({
    resolver: zodResolver<OrderFormFields, OrderValues>(makeOrderSchema(config)),
    defaultValues: {
      campaignCode: config.campaignCode,
      lines: config.products.map((p) => ({ slug: p.slug, quantity: 0 })),
      recipientName: "",
      phone: "",
      method: "hand",
      provinceCode: "",
      wardCode: "",
      street: "",
      note: "",
    },
  })
  const { register, control, handleSubmit, setValue, setError, clearErrors, reset, formState } = form
  const { errors, isSubmitting } = formState

  const lines = useWatch({ control, name: "lines" })
  const method = useWatch({ control, name: "method" })
  const provinceCode = useWatch({ control, name: "provinceCode" })
  const priced = React.useMemo(() => {
    const r = priceOrder(config, lines)
    return r.ok ? r.order : null
  }, [config, lines])

  const province = provinceCode ? findProvince(provinceCode) : undefined
  const outOfArea = method === "hand" && province !== undefined && !handDeliveryAvailable(config, province.code)
  const deliveryNames = config.hand.provinceCodes.map((c) => findProvince(c)).filter((p) => p !== undefined).map(provinceLabel).join(", ")

  const onSubmit = handleSubmit(async (v) => {
    clearErrors("root")
    const body = new FormData()
    body.set("campaignCode", v.campaignCode)
    body.set("lines", JSON.stringify(v.lines.filter((l) => l.quantity > 0)))
    body.set("recipientName", v.recipientName)
    body.set("phone", v.phone)
    body.set("method", v.method)
    body.set("provinceCode", v.provinceCode ?? "")
    body.set("wardCode", v.wardCode ?? "")
    body.set("street", v.street ?? "")
    body.set("note", v.note ?? "")
    body.set("website", v.website ?? "")
    try {
      const result = await placeOrderAction(body)
      if (result.ok) {
        setPlaced(result.order)
        requestAnimationFrame(() => document.getElementById("order-done-title")?.focus())
      } else if (result.reason === "closed") {
        setError("root", { message: "Cửa hàng hiện không nhận thêm đơn. Cảm ơn tấm lòng của bạn." })
      } else if (result.reason === "out_of_area") {
        setError("provinceCode", { message: result.message })
      } else {
        for (const [name, message] of Object.entries(result.fieldErrors)) setError(name as keyof OrderFormFields, { message })
      }
    } catch {
      setError("root", { message: "Chưa gửi được. Bạn kiểm tra kết nối mạng rồi thử lại giúp mình nhé." })
    }
  })

  if (placed) {
    return (
      <OrderConfirmation
        order={placed}
        fund={fund}
        pickupLabel={config.pickup.label}
        onOrderAgain={() => {
          reset()
          setPlaced(null)
          window.scrollTo({ top: 0, behavior: "smooth" })
        }}
      />
    )
  }

  const linesError = errors.lines?.message ?? (errors.lines as { root?: { message?: string } } | undefined)?.root?.message

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-6 md:grid md:grid-cols-[1fr_520px] md:items-start md:gap-8">
      <div className="flex flex-col gap-3 md:gap-4">
        <ul className="flex flex-col gap-3 md:gap-4" aria-label="Sản phẩm">
          {config.products.map((p, i) => (
            <Controller
              key={p.slug}
              name={`lines.${i}.quantity`}
              control={control}
              render={({ field }) => <ProductRow product={p} quantity={field.value ?? 0} max={config.maxPerProduct} onQuantityChange={field.onChange} />}
            />
          ))}
        </ul>
        {linesError && <Callout tone="warning">{linesError}</Callout>}
        <p className="text-xs text-muted-ink italic">Ảnh và giá theo “Menu gây quỹ” của chương trình. Toàn bộ lợi nhuận vào quỹ chương trình.</p>
      </div>

      <div className="flex flex-col gap-5">
        <Card padding="none" className="flex flex-col gap-4 p-5 md:gap-[18px] md:p-7">
          <CardKicker>Thông tin nhận hàng</CardKicker>

          <div className="grid gap-4 md:grid-cols-2 md:gap-3">
            <Field label="Họ và tên người nhận" htmlFor="order-name" error={errors.recipientName?.message}>
              <Input id="order-name" autoComplete="name" aria-invalid={!!errors.recipientName} aria-describedby={describedBy("order-name", !!errors.recipientName)} {...register("recipientName")} />
            </Field>
            <Field label="Số điện thoại" htmlFor="order-phone" error={errors.phone?.message}>
              <Input id="order-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="09xx xxx xxx" aria-invalid={!!errors.phone} aria-describedby={describedBy("order-phone", !!errors.phone)} {...register("phone")} />
            </Field>
          </div>

          <div className="flex flex-col gap-[7px]">
            <p id="order-method-label" className="text-sm font-semibold text-ink">
              Cách nhận hàng
            </p>
            <Controller
              name="method"
              control={control}
              render={({ field }) => (
                <SegmentedControl
                  aria-label="Cách nhận hàng"
                  value={field.value}
                  onValueChange={(v) => field.onChange(v)}
                  options={[
                    { value: "hand", label: "Giao tận tay", description: "TNV giao · miễn phí" },
                    { value: "pickup", label: "Nhận tại sự kiện", description: "Không cần địa chỉ" },
                  ]}
                />
              )}
            />
          </div>

          {method === "hand" ? (
            <>
              <div className="grid gap-4 md:grid-cols-2 md:gap-3">
                <Field label="Tỉnh / Thành phố" htmlFor="order-province" error={errors.provinceCode?.message}>
                  <NativeSelect
                    id="order-province"
                    aria-invalid={!!errors.provinceCode}
                    aria-describedby={describedBy("order-province", !!errors.provinceCode)}
                    {...register("provinceCode", { onChange: () => setValue("wardCode", "", { shouldValidate: false }) })}
                  >
                    <option value="">Chọn tỉnh / thành phố</option>
                    {provinces.map((p) => (
                      <option key={p.code} value={p.code}>
                        {provinceLabel(p)}
                      </option>
                    ))}
                  </NativeSelect>
                </Field>
                <Field label="Phường / Xã" htmlFor="order-ward" error={errors.wardCode?.message}>
                  <Controller
                    name="wardCode"
                    control={control}
                    render={({ field }) => (
                      <WardField
                        id="order-ward"
                        provinceCode={provinceCode || null}
                        provinceLabel={province ? provinceLabel(province) : undefined}
                        value={field.value || null}
                        onValueChange={(v) => field.onChange(v ?? "")}
                        aria-invalid={!!errors.wardCode}
                        aria-describedby={describedBy("order-ward", !!errors.wardCode)}
                      />
                    )}
                  />
                </Field>
              </div>

              <Field label="Số nhà, tên đường" htmlFor="order-street" error={errors.street?.message}>
                <Input id="order-street" autoComplete="street-address" aria-invalid={!!errors.street} aria-describedby={describedBy("order-street", !!errors.street)} {...register("street")} />
              </Field>

              {province && !outOfArea && (
                <Callout tone="success" icon={Truck}>
                  Địa chỉ nằm trong khu vực tình nguyện viên giao tận tay.
                </Callout>
              )}
              {outOfArea && (
                <Callout tone="warning" icon={MapPin}>
                  Tình nguyện viên chỉ giao tận tay tại {deliveryNames}. Bạn có thể chọn “Nhận tại sự kiện”.
                </Callout>
              )}
            </>
          ) : (
            <Callout tone="info" icon={MapPin}>
              {config.pickup.label}. Ban tổ chức sẽ liên hệ qua số điện thoại để hẹn nhận hàng.
            </Callout>
          )}

          <Field label="Ghi chú cho người giao" htmlFor="order-note" optional error={errors.note?.message}>
            <Textarea id="order-note" rows={2} placeholder="Ví dụ: giao giờ hành chính giúp mình" aria-invalid={!!errors.note} aria-describedby={describedBy("order-note", !!errors.note)} {...register("note")} />
          </Field>

          <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
            <label htmlFor="order-website">Website</label>
            <input id="order-website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
          </div>
        </Card>

        <OrderSummary
          priced={priced}
          promotionLabel={config.promotion?.label}
          promotionDiscount={config.promotion?.discount}
          itemsToPromotion={priced ? itemsToPromotion(config, priced.itemCount) : 0}
          action={
            <>
              {errors.root && <Callout tone="warning">{errors.root.message}</Callout>}
              <Button type="submit" variant="primary" size="lg" fullWidth disabled={isSubmitting}>
                {isSubmitting ? "Đang gửi…" : "Đặt hàng & lấy mã VietQR"}
                {!isSubmitting && <ArrowRight aria-hidden />}
              </Button>
            </>
          }
          footnote={`Bạn sẽ nhận mã đơn (ví dụ ${config.campaignCode}-7K3Q) để chuyển khoản. Đặt hàng nghĩa là bạn đồng ý để Ngòi lưu thông tin nhận hàng.`}
        />
        {priced && <p className="sr-only">Tổng cộng {formatVnd(priced.total)}</p>}
      </div>
    </form>
  )
}

export { ShopFlow }
