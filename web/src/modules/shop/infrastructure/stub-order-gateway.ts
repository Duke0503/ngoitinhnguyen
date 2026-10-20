import type { OrderGateway } from "../application/place-order"

/**
 * Placeholder until the Go API exists: accepts the order but PERSISTS NOTHING, so nobody can pay for it
 * and then be found. Swap for an HTTP client of `POST /v1/public/orders`.
 */
export const stubOrderGateway: OrderGateway = {
  async place() {},
}
