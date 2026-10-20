"use client"

import * as React from "react"
import { Send } from "lucide-react"
import { Controller, useForm } from "react-hook-form"

import { zodResolver } from "@/shared/lib/zod-resolver"
import { parseVnd } from "@/shared/lib/format"
import { Button } from "@/shared/ui/button"
import { Callout } from "@/shared/ui/callout"
import { Card, CardKicker } from "@/shared/ui/card"
import { Checkbox } from "@/shared/ui/checkbox"
import { Field } from "@/shared/ui/field"
import { FileDropzone } from "@/shared/ui/file-dropzone"
import { Input } from "@/shared/ui/input"
import { Textarea } from "@/shared/ui/textarea"

import { makeDonationSchema, type DonationFormFields, type DonationValues } from "../application/donation-schema"
import type { Fund } from "../domain/fund"
import { submitDonationAction } from "../infrastructure/submit-donation-action"

type ConfirmFormProps = {
  fund: Fund
  /** Reference code from the QR step; the form cannot be sent until it exists. */
  reference: string | null
  /** Amount chosen in the picker; fills the form until the donor edits it. */
  suggestedAmount: number | null
  onSubmitted: (result: { referenceCode: string; donorName: string }) => void
}

const describedBy = (id: string, has: boolean) => (has ? `${id}-desc` : undefined)

function ConfirmForm({ fund, reference, suggestedAmount, onSubmitted }: ConfirmFormProps) {
  const schema = React.useMemo(() => makeDonationSchema(fund.campaignCode), [fund.campaignCode])
  const {
    register,
    control,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<DonationFormFields, unknown, DonationValues>({
    resolver: zodResolver<DonationFormFields, DonationValues>(schema),
    defaultValues: { donorName: "", amount: suggestedAmount ?? undefined, email: "", message: "", isPublic: false, referenceCode: reference ?? "" },
  })

  // Keep the amount in step with the picker until the donor types their own figure.
  React.useEffect(() => {
    if (!dirtyFields.amount) setValue("amount", suggestedAmount ?? undefined)
  }, [suggestedAmount, dirtyFields.amount, setValue])

  React.useEffect(() => {
    setValue("referenceCode", reference ?? "")
  }, [reference, setValue])

  const onSubmit = handleSubmit(async (values) => {
    clearErrors("root")
    const body = new FormData()
    body.set("fundCode", fund.campaignCode)
    body.set("referenceCode", values.referenceCode)
    body.set("donorName", values.donorName)
    body.set("amount", String(values.amount))
    body.set("email", values.email ?? "")
    body.set("message", values.message ?? "")
    body.set("isPublic", String(values.isPublic))
    body.set("consent", "true")
    body.set("website", values.website ?? "")
    body.set("proof", values.proof)

    try {
      const result = await submitDonationAction(body)
      if (result.ok) {
        onSubmitted({ referenceCode: result.donation.referenceCode, donorName: values.donorName.trim() })
      } else if (result.reason === "closed") {
        setError("root", { message: "Quỹ này hiện không nhận thêm khoản ủng hộ. Cảm ơn tấm lòng của bạn." })
      } else {
        for (const [name, message] of Object.entries(result.fieldErrors)) setError(name as keyof DonationFormFields, { message })
      }
    } catch {
      setError("root", { message: "Chưa gửi được. Bạn kiểm tra kết nối mạng rồi thử lại giúp mình nhé." })
    }
  })

  return (
    <Card padding="none" className="p-5 md:p-7">
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4 md:gap-[18px]">
        <CardKicker>3 · Tôi đã chuyển khoản</CardKicker>

        <Field label="Họ và tên" htmlFor="donor-name" error={errors.donorName?.message}>
          <Input id="donor-name" autoComplete="name" aria-invalid={!!errors.donorName} aria-describedby={describedBy("donor-name", !!errors.donorName)} {...register("donorName")} />
        </Field>

        <div className="grid gap-4 md:grid-cols-2 md:gap-3">
          <Field label="Số tiền đã chuyển (đồng)" htmlFor="donor-amount" error={errors.amount?.message}>
            <Controller
              name="amount"
              control={control}
              render={({ field }) => (
                <Input
                  id="donor-amount"
                  inputMode="numeric"
                  autoComplete="off"
                  aria-invalid={!!errors.amount}
                  aria-describedby={describedBy("donor-amount", !!errors.amount)}
                  value={field.value ? new Intl.NumberFormat("vi-VN").format(field.value) : ""}
                  onChange={(e) => field.onChange(parseVnd(e.target.value))}
                  onBlur={field.onBlur}
                />
              )}
            />
          </Field>
          <Field label="Email" htmlFor="donor-email" optional error={errors.email?.message}>
            <Input id="donor-email" type="email" autoComplete="email" placeholder="ban@email.com" aria-invalid={!!errors.email} aria-describedby={describedBy("donor-email", !!errors.email)} {...register("email")} />
          </Field>
        </div>

        <Field label="Lời nhắn" htmlFor="donor-message" optional error={errors.message?.message}>
          <Textarea id="donor-message" rows={3} placeholder="Gửi các em và những người mình thương…" aria-invalid={!!errors.message} aria-describedby={describedBy("donor-message", !!errors.message)} {...register("message")} />
        </Field>

        <Field label="Ảnh minh chứng chuyển khoản" htmlFor="donor-proof" error={errors.proof?.message} hint="Chỉ ban tổ chức xem được ảnh này.">
          <Controller
            name="proof"
            control={control}
            render={({ field }) => (
              <FileDropzone
                id="donor-proof"
                file={field.value ?? null}
                onFileChange={(f) => field.onChange(f ?? undefined)}
                onError={(message) => setError("proof", { message })}
                aria-describedby="donor-proof-desc"
                hint="JPG, PNG, HEIC · tối đa 10MB"
              />
            )}
          />
        </Field>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-start gap-3">
            <Controller
              name="consent"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="donor-consent"
                  className="mt-0.5"
                  checked={field.value === true}
                  onCheckedChange={(c) => field.onChange(c === true ? true : undefined)}
                  aria-invalid={!!errors.consent}
                  aria-describedby={describedBy("donor-consent", !!errors.consent)}
                />
              )}
            />
            <label htmlFor="donor-consent" className="text-[13px] leading-normal text-muted-ink">
              Tôi đồng ý để Ngòi lưu thông tin nhằm xác nhận khoản ủng hộ và cấp giấy chứng nhận.
            </label>
          </div>
          {errors.consent && (
            <p id="donor-consent-desc" className="pl-8 text-xs text-cta">
              {errors.consent.message}
            </p>
          )}
        </div>

        {/* Honeypot: hidden from people and assistive tech; bots tend to fill it. */}
        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="donor-website">Website</label>
          <input id="donor-website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </div>

        {errors.root && <Callout tone="warning">{errors.root.message}</Callout>}
        {errors.referenceCode && <Callout tone="warning">{errors.referenceCode.message}</Callout>}

        <Button type="submit" fullWidth disabled={isSubmitting || !reference}>
          {isSubmitting ? "Đang gửi…" : "Gửi xác nhận"}
          {!isSubmitting && <Send aria-hidden />}
        </Button>
      </form>
    </Card>
  )
}

export { ConfirmForm }
