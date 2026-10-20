import { describe, expect, it, vi } from "vitest"

import type { RecruitmentRound } from "../domain/recruitment"
import { acceptsApplications } from "../domain/recruitment"
import { normalizePhone } from "@/shared/lib/phone"

import { isPlausibleBirthDate } from "./application-schema"
import { makeSubmitApplication } from "./submit-application"
import { makeSubscribeNotify } from "./subscribe-notify"

const TODAY = "2026-10-20"

const round: RecruitmentRound = {
  id: "member-2027",
  kind: "member",
  title: "Thành viên nhiệm kỳ 2027",
  state: "open",
  opensOn: "2026-10-01",
  closesOn: "2026-11-01",
  maxOptions: 2,
  options: [
    { value: "truyen-thong", label: "Truyền thông" },
    { value: "su-kien", label: "Sự kiện" },
    { value: "thiet-ke", label: "Thiết kế" },
  ],
  illustrative: false,
}

const valid = {
  roundId: "member-2027",
  fullName: "Nguyễn Thị Lan",
  birthDate: "2008-03-12",
  school: "THPT Nguyễn Thị Minh Khai",
  province: "TP. Hồ Chí Minh",
  phone: "0912 345 678",
  email: "lan@example.com",
  options: ["truyen-thong", "thiet-ke"],
  motivation: "Mình từng là một học sinh ở vùng xa nên hiểu rõ giá trị của một cuốn sách.",
  consent: true,
}

function setup(r: RecruitmentRound | null = round) {
  const gateway = { submit: vi.fn(async () => ({ id: "app-1" })) }
  const submit = makeSubmitApplication({ rounds: { roundById: async () => r }, gateway, today: () => TODAY })
  return { submit, gateway }
}

describe("normalizePhone", () => {
  it("accepts VN mobiles in common spellings and normalises them", () => {
    expect(normalizePhone("0912 345 678")).toBe("0912345678")
    expect(normalizePhone("+84 912.345.678")).toBe("0912345678")
    expect(normalizePhone("84912345678")).toBe("0912345678")
  })
  it("rejects landlines, short and non-numeric input", () => {
    for (const bad of ["02812345678", "091234567", "abc", "0112345678", ""]) expect(normalizePhone(bad)).toBeNull()
  })
})

describe("isPlausibleBirthDate", () => {
  it("rejects impossible, future and implausibly old dates", () => {
    expect(isPlausibleBirthDate("2008-03-12", TODAY)).toBe(true)
    expect(isPlausibleBirthDate("2008-02-30", TODAY)).toBe(false)
    expect(isPlausibleBirthDate("2030-01-01", TODAY)).toBe(false)
    expect(isPlausibleBirthDate("1950-01-01", TODAY)).toBe(false)
    expect(isPlausibleBirthDate("12/03/2008", TODAY)).toBe(false)
  })
})

describe("acceptsApplications", () => {
  it("needs an open round inside its window", () => {
    expect(acceptsApplications(round, TODAY)).toBe(true)
    expect(acceptsApplications(round, "2026-09-30")).toBe(false)
    expect(acceptsApplications(round, "2026-11-02")).toBe(false)
    expect(acceptsApplications({ ...round, state: "upcoming" }, TODAY)).toBe(false)
  })
})

describe("submitApplication", () => {
  it("passes a valid application to the gateway with a normalised phone", async () => {
    const { submit, gateway } = setup()
    expect(await submit(valid)).toEqual({ ok: true, email: "lan@example.com" })
    expect(gateway.submit).toHaveBeenCalledWith(expect.objectContaining({ roundId: "member-2027", phone: "0912345678", options: ["truyen-thong", "thiet-ke"] }))
  })

  it("refuses unknown, upcoming, closed or out-of-window rounds", async () => {
    expect(await setup(null).submit(valid)).toEqual({ ok: false, reason: "closed" })
    expect(await setup({ ...round, state: "upcoming" }).submit(valid)).toEqual({ ok: false, reason: "closed" })
    expect(await setup({ ...round, closesOn: "2026-10-19" }).submit(valid)).toEqual({ ok: false, reason: "closed" })
  })

  it("reports a message per invalid field and never reaches the gateway", async () => {
    const { submit, gateway } = setup()
    const r = await submit({ ...valid, fullName: "A", phone: "123", options: [], motivation: "ngắn", consent: false })
    expect(r.ok).toBe(false)
    if (!r.ok && r.reason === "invalid") expect(Object.keys(r.fieldErrors).sort()).toEqual(["consent", "fullName", "motivation", "options", "phone"])
    expect(gateway.submit).not.toHaveBeenCalled()
  })

  it("enforces the option limit and rejects options from outside the round", async () => {
    const { submit } = setup()
    expect((await submit({ ...valid, options: ["truyen-thong", "su-kien", "thiet-ke"] })).ok).toBe(false)
    expect((await submit({ ...valid, options: ["hau-can"] })).ok).toBe(false)
  })

  it("applies the round's eligible provinces", async () => {
    const { submit, gateway } = setup({ ...round, eligibleProvinces: ["Hà Nội"] })
    const r = await submit(valid)
    expect(r).toMatchObject({ ok: false, reason: "ineligible" })
    expect(gateway.submit).not.toHaveBeenCalled()
  })

  it("silently drops honeypot submissions", async () => {
    const { submit, gateway } = setup()
    expect((await submit({ ...valid, website: "http://spam" })).ok).toBe(true)
    expect(gateway.submit).not.toHaveBeenCalled()
  })
})

describe("subscribeNotify", () => {
  it("stores a valid address, rejects bad ones, drops honeypots", async () => {
    const gateway = { subscribe: vi.fn(async () => {}) }
    const subscribe = makeSubscribeNotify(gateway)
    expect(await subscribe({ email: "a@b.vn", consent: true })).toEqual({ ok: true })
    expect(gateway.subscribe).toHaveBeenCalledWith("a@b.vn")
    expect((await subscribe({ email: "khong", consent: true })).ok).toBe(false)
    expect((await subscribe({ email: "a@b.vn" })).ok).toBe(false)
    gateway.subscribe.mockClear()
    expect((await subscribe({ email: "a@b.vn", consent: true, website: "x" })).ok).toBe(true)
    expect(gateway.subscribe).not.toHaveBeenCalled()
  })
})
