"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { Button } from "@/shared/ui/button"

import { subscribeNotifyAction } from "../infrastructure/recruitment-actions"

/** Email sign-up for the next round. Pressing the button is the consent, and the text says so. */
function NotifyForm() {
  const [state, setState] = React.useState<"idle" | "sending" | "done">("idle")
  const [error, setError] = React.useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const body = new FormData(e.currentTarget)
    body.set("consent", "true")
    setState("sending")
    setError(null)
    try {
      const result = await subscribeNotifyAction(body)
      if (result.ok) setState("done")
      else {
        setState("idle")
        setError(result.fieldErrors.email ?? "Chưa gửi được, bạn thử lại giúp mình nhé.")
      }
    } catch {
      setState("idle")
      setError("Chưa gửi được. Bạn kiểm tra kết nối mạng rồi thử lại giúp mình nhé.")
    }
  }

  if (state === "done") {
    return (
      <p role="status" className="flex items-start gap-2.5 text-[15px] leading-normal text-white">
        <Check aria-hidden className="mt-0.5 size-5 shrink-0 text-flame-gold" />
        Cảm ơn bạn! Ngòi sẽ gửi email khi đơn tuyển mở.
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-2.5">
      <div className="flex flex-col gap-2.5 sm:flex-row">
        <label htmlFor="notify-email" className="sr-only">
          Email của bạn
        </label>
        <input
          id="notify-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="Email của bạn"
          aria-invalid={!!error}
          aria-describedby={error ? "notify-error" : "notify-note"}
          className="h-12 min-w-0 shrink-0 rounded-full sm:flex-1 sm:shrink border border-white/25 bg-white/10 px-5 text-[15px] text-white outline-none placeholder:text-white/55 focus-visible:border-flame-gold focus-visible:ring-3 focus-visible:ring-flame-gold/30 aria-invalid:border-[#ff8a75]"
        />
        <input name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />
        <Button type="submit" variant="gold" disabled={state === "sending"}>
          {state === "sending" ? "Đang gửi…" : "Báo cho mình"}
        </Button>
      </div>
      {error ? (
        <p id="notify-error" role="alert" className="text-[13px] text-[#ffb3a3]">
          {error}
        </p>
      ) : (
        <p id="notify-note" className="text-xs text-white/60">
          Chúng mình chỉ gửi một email khi đơn tuyển mở.
        </p>
      )}
    </form>
  )
}

export { NotifyForm }
