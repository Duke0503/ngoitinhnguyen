"use client"

import * as React from "react"
import { Check, Send } from "lucide-react"
import { Controller, useForm } from "react-hook-form"

import { zodResolver } from "@/shared/lib/zod-resolver"
import { Button } from "@/shared/ui/button"
import { Callout } from "@/shared/ui/callout"
import { Card, CardKicker } from "@/shared/ui/card"
import { Field } from "@/shared/ui/field"
import { FileDropzone } from "@/shared/ui/file-dropzone"
import { Textarea } from "@/shared/ui/textarea"

import { makePaymentProofSchema } from "../application/payment-proof"
import { submitPaymentProofAction } from "../infrastructure/payment-proof-action"

type Fields = { orderCode: string; message?: string; proof?: File; website?: string }

/** After paying by transfer: a short message and the transfer screenshot, so finance can match the payment to the order. */
function PaymentProofForm({ campaignCode, orderCode }: { campaignCode: string; orderCode: string }) {
  const [sent, setSent] = React.useState(false)
  const {
    register,
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<Fields>({ resolver: zodResolver(makePaymentProofSchema(campaignCode)) as never, defaultValues: { orderCode, message: "", website: "" } })

  const onSubmit = handleSubmit(async (values) => {
    clearErrors("root")
    const body = new FormData()
    body.set("campaignCode", campaignCode)
    body.set("orderCode", values.orderCode)
    body.set("message", values.message ?? "")
    body.set("website", values.website ?? "")
    if (values.proof) body.set("proof", values.proof)
    try {
      const result = await submitPaymentProofAction(body)
      if (result.ok) setSent(true)
      else for (const [name, message] of Object.entries(result.fieldErrors)) setError(name as keyof Fields, { message })
    } catch {
      setError("root", { message: "Chưa gửi được. Bạn kiểm tra kết nối mạng rồi thử lại giúp mình nhé." })
    }
  })

  if (sent) {
    return (
      <Card tone="amber" padding="none" className="flex items-start gap-3 p-5 md:p-6" role="status">
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-leaf text-white">
          <Check aria-hidden className="size-[18px]" strokeWidth={3} />
        </span>
        <div className="flex flex-col gap-1">
          <p className="font-head text-xl font-semibold text-navy">Đã nhận minh chứng cho đơn {orderCode}</p>
          <p className="text-[15px] leading-relaxed text-muted-ink">Ban tổ chức sẽ đối soát và xác nhận đơn của bạn. Cảm ơn bạn đã đồng hành cùng Ngòi!</p>
        </div>
      </Card>
    )
  }

  return (
    <Card padding="none" className="p-5 md:p-7">
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4 md:gap-[18px]">
        <CardKicker>Tôi đã chuyển khoản</CardKicker>
        <p className="text-sm leading-relaxed text-muted-ink">Gửi kèm ảnh chụp màn hình giao dịch để ban tổ chức đối soát nhanh hơn. Lời nhắn là không bắt buộc.</p>

        <Field label="Lời nhắn" htmlFor="pay-message" optional error={errors.message?.message}>
          <Textarea id="pay-message" rows={3} placeholder="Gửi các em và những người mình thương…" aria-invalid={!!errors.message} {...register("message")} />
        </Field>

        <Field label="Ảnh minh chứng chuyển khoản" htmlFor="pay-proof" error={errors.proof?.message} hint="Chỉ ban tổ chức xem được ảnh này.">
          <Controller
            name="proof"
            control={control}
            render={({ field }) => <FileDropzone id="pay-proof" file={field.value ?? null} onFileChange={(f) => field.onChange(f ?? undefined)} onError={(message) => setError("proof", { message })} hint="JPG, PNG, HEIC · tối đa 10MB" />}
          />
        </Field>

        <input type="text" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" {...register("website")} />
        {errors.root && <Callout tone="warning">{errors.root.message}</Callout>}
        {errors.orderCode && <Callout tone="warning">{errors.orderCode.message}</Callout>}
        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Đang gửi…" : "Gửi minh chứng"}
          <Send aria-hidden />
        </Button>
      </form>
    </Card>
  )
}

export { PaymentProofForm }
