// Order lifecycle (BUSINESS.md BR-45): new → paid → preparing → delivering → delivered, or cancelled.

export type OrderStatus = "new" | "paid" | "preparing" | "delivering" | "delivered" | "cancelled"

/** The happy path, in order; the timeline shows these. */
export const orderSteps: OrderStatus[] = ["new", "paid", "preparing", "delivering", "delivered"]

export const orderStatusLabel: Record<OrderStatus, string> = {
  new: "Đã đặt",
  paid: "Đã thanh toán",
  preparing: "Đang chuẩn bị",
  delivering: "Đang giao",
  delivered: "Đã giao",
  cancelled: "Đã huỷ",
}

const next: Record<OrderStatus, OrderStatus[]> = {
  new: ["paid", "cancelled"],
  paid: ["preparing", "cancelled"],
  preparing: ["delivering", "cancelled"],
  delivering: ["delivered", "cancelled"],
  delivered: [],
  cancelled: [],
}

export const canTransition = (from: OrderStatus, to: OrderStatus) => next[from].includes(to)

/** Index of a status on the happy path; -1 for cancelled. */
export const stepIndex = (s: OrderStatus) => orderSteps.indexOf(s)
