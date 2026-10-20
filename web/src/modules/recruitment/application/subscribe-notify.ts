import { notifySchema } from "./application-schema"

/** Port: stub today; later stores the address and emails it when a round opens. */
export interface NotifyGateway {
  subscribe(email: string): Promise<void>
}

export type SubscribeResult = { ok: true } | { ok: false; fieldErrors: Record<string, string> }

export function makeSubscribeNotify(gateway: NotifyGateway) {
  return async function subscribeNotify(raw: unknown): Promise<SubscribeResult> {
    const parsed = notifySchema.safeParse(raw)
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {}
      for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0] ?? "form")] ??= issue.message
      return { ok: false, fieldErrors }
    }
    if (!parsed.data.website) await gateway.subscribe(parsed.data.email)
    return { ok: true }
  }
}
