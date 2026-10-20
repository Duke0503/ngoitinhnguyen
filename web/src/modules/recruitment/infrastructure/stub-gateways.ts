import type { ApplicationGateway } from "../application/submit-application"
import type { NotifyGateway } from "../application/subscribe-notify"

/**
 * Placeholders until the Go API exists: they accept the data but PERSIST NOTHING.
 * Swap for HTTP clients of `POST /v1/public/rounds/{slug}/applications` and a notify-list endpoint.
 */
export const stubApplicationGateway: ApplicationGateway = {
  async submit() {
    return { id: "stub" }
  },
}

export const stubNotifyGateway: NotifyGateway = {
  async subscribe() {},
}
