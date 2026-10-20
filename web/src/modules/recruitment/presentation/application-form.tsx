"use client"

import * as React from "react"
import { Check, Send } from "lucide-react"
import { Controller, useForm } from "react-hook-form"

import { provinceLabels } from "@/shared/address/address"
import { todayIso } from "@/shared/lib/format"
import { zodResolver } from "@/shared/lib/zod-resolver"
import { Button } from "@/shared/ui/button"
import { Callout } from "@/shared/ui/callout"
import { Card, CardKicker } from "@/shared/ui/card"
import { Checkbox } from "@/shared/ui/checkbox"
import { ChipToggleGroup } from "@/shared/ui/chip-toggle-group"
import { Field } from "@/shared/ui/field"
import { Input } from "@/shared/ui/input"
import { NativeSelect } from "@/shared/ui/native-select"
import { Textarea } from "@/shared/ui/textarea"

import { makeApplicationSchema, type ApplicationFormFields, type ApplicationValues } from "../application/application-schema"
import type { RecruitmentRound } from "../domain/recruitment"
import { submitApplicationAction } from "../infrastructure/recruitment-actions"

const describedBy = (id: string, has: boolean) => (has ? `${id}-desc` : undefined)

function ApplicationForm({ round }: { round: RecruitmentRound }) {
  const [sentTo, setSentTo] = React.useState<string | null>(null)
  const {
    register,
    control,
    handleSubmit,
    setError,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ApplicationFormFields, unknown, ApplicationValues>({
    // Built per validation so the birth-date rule always compares against today's date, never a stale render.
    resolver: (values, ctx, opts) => zodResolver<ApplicationFormFields, ApplicationValues>(makeApplicationSchema(round, todayIso()))(values, ctx, opts),
    defaultValues: { roundId: round.id, fullName: "", birthDate: "", school: "", province: "", phone: "", email: "", options: [], motivation: "" },
  })

  const onSubmit = handleSubmit(async (v) => {
    clearErrors("root")
    const body = new FormData()
    body.set("roundId", round.id)
    for (const key of ["fullName", "birthDate", "school", "province", "phone", "email", "motivation"] as const) body.set(key, v[key])
    for (const o of v.options) body.append("options", o)
    body.set("consent", "true")
    body.set("website", v.website ?? "")
    try {
      const result = await submitApplicationAction(body)
      if (result.ok) setSentTo(v.email)
      else if (result.reason === "closed") setError("root", { message: "Đợt tuyển này đã đóng nên chưa nhận thêm đơn. Cảm ơn bạn đã quan tâm đến Ngòi." })
      else if (result.reason === "ineligible") setError("root", { message: result.message })
      else for (const [name, message] of Object.entries(result.fieldErrors)) setError(name as keyof ApplicationFormFields, { message })
    } catch {
      setError("root", { message: "Chưa gửi được. Bạn kiểm tra kết nối mạng rồi thử lại giúp mình nhé." })
    }
  })

  if (sentTo) {
    return (
      <section aria-labelledby="apply-done-title" className="flex flex-col gap-4 rounded-xl bg-night p-6 text-white md:p-8">
        <div className="flex items-start gap-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-full bg-leaf">
            <Check aria-hidden className="size-[18px]" strokeWidth={3} />
          </span>
          <h3 id="apply-done-title" className="font-head text-[22px] leading-snug font-semibold">
            Cảm ơn bạn đã gửi đơn!
          </h3>
        </div>
        <p className="text-[15px] leading-relaxed text-white/80">
          Chúng mình đã ghi nhận đơn ứng tuyển và sẽ liên hệ qua <strong className="text-white">{sentTo}</strong>. Ban nhân sự sẽ hẹn phỏng vấn nếu đợt tuyển có vòng này.
        </p>
        <Button
          variant="outline-light"
          size="sm"
          className="h-12 self-start"
          onClick={() => {
            reset()
            setSentTo(null)
          }}
        >
          Gửi đơn khác
        </Button>
      </section>
    )
  }

  return (
    <Card padding="none" className="bg-paper p-5 md:p-8">
      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4 md:gap-[18px]">
        <CardKicker>{round.title}</CardKicker>

        <Field label="Họ và tên" htmlFor="app-name" error={errors.fullName?.message}>
          <Input id="app-name" autoComplete="name" aria-invalid={!!errors.fullName} aria-describedby={describedBy("app-name", !!errors.fullName)} {...register("fullName")} />
        </Field>

        <div className="grid gap-4 md:grid-cols-2 md:gap-3.5">
          <Field label="Ngày sinh" htmlFor="app-birth" error={errors.birthDate?.message}>
            <Input id="app-birth" type="date" autoComplete="bday" min="1980-01-01" aria-invalid={!!errors.birthDate} aria-describedby={describedBy("app-birth", !!errors.birthDate)} {...register("birthDate")} />
          </Field>
          <Field label="Tỉnh / thành phố" htmlFor="app-province" error={errors.province?.message}>
            <NativeSelect id="app-province" aria-invalid={!!errors.province} aria-describedby={describedBy("app-province", !!errors.province)} {...register("province")}>
              <option value="">Chọn nơi bạn đang sống</option>
              {provinceLabels.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </NativeSelect>
          </Field>
        </div>

        <Field label="Trường đang theo học" htmlFor="app-school" error={errors.school?.message}>
          <Input id="app-school" autoComplete="organization" aria-invalid={!!errors.school} aria-describedby={describedBy("app-school", !!errors.school)} {...register("school")} />
        </Field>

        <div className="grid gap-4 md:grid-cols-2 md:gap-3.5">
          <Field label="Số điện thoại" htmlFor="app-phone" error={errors.phone?.message}>
            <Input id="app-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="09xx xxx xxx" aria-invalid={!!errors.phone} aria-describedby={describedBy("app-phone", !!errors.phone)} {...register("phone")} />
          </Field>
          <Field label="Email" htmlFor="app-email" error={errors.email?.message}>
            <Input id="app-email" type="email" autoComplete="email" placeholder="ban@email.com" aria-invalid={!!errors.email} aria-describedby={describedBy("app-email", !!errors.email)} {...register("email")} />
          </Field>
        </div>

        <div className="flex flex-col gap-2.5">
          <p id="app-options-label" className="text-sm font-semibold text-ink">
            Lựa chọn của bạn <span className="font-normal text-muted-ink">(chọn tối đa {round.maxOptions})</span>
          </p>
          <Controller
            name="options"
            control={control}
            render={({ field }) => (
              <ChipToggleGroup
                aria-labelledby="app-options-label"
                aria-invalid={!!errors.options}
                aria-describedby={describedBy("app-options", !!errors.options)}
                options={round.options}
                value={field.value}
                onValueChange={field.onChange}
                max={round.maxOptions}
              />
            )}
          />
          {errors.options && (
            <p id="app-options-desc" className="text-xs text-cta">
              {errors.options.message}
            </p>
          )}
        </div>

        <Field label="Vì sao bạn muốn đồng hành cùng Ngòi?" htmlFor="app-motivation" error={errors.motivation?.message}>
          <Textarea id="app-motivation" rows={4} aria-invalid={!!errors.motivation} aria-describedby={describedBy("app-motivation", !!errors.motivation)} {...register("motivation")} />
        </Field>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-start gap-3">
            <Controller
              name="consent"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="app-consent"
                  className="mt-0.5"
                  checked={field.value === true}
                  onCheckedChange={(c) => field.onChange(c === true ? true : undefined)}
                  aria-invalid={!!errors.consent}
                  aria-describedby={describedBy("app-consent", !!errors.consent)}
                />
              )}
            />
            <label htmlFor="app-consent" className="text-[13px] leading-normal text-muted-ink">
              Tôi đồng ý để Ngòi lưu thông tin của mình để xét tuyển. Thông tin chỉ ban nhân sự xem được và được xoá sau khi đợt tuyển kết thúc.
            </label>
          </div>
          {errors.consent && (
            <p id="app-consent-desc" className="pl-8 text-xs text-cta">
              {errors.consent.message}
            </p>
          )}
        </div>

        <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="app-website">Website</label>
          <input id="app-website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
        </div>

        {errors.root && <Callout tone="warning">{errors.root.message}</Callout>}

        <Button type="submit" fullWidth disabled={isSubmitting}>
          {isSubmitting ? "Đang gửi…" : "Nộp đơn"}
          {!isSubmitting && <Send aria-hidden />}
        </Button>
      </form>
    </Card>
  )
}

export { ApplicationForm }
