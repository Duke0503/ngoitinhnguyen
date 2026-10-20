"use server"

import { todayIso } from "@/shared/lib/format"

import { makeSubmitApplication, type SubmitApplicationResult } from "../application/submit-application"
import { makeSubscribeNotify, type SubscribeResult } from "../application/subscribe-notify"
import { makeRecruitmentQueries } from "../application/recruitment-queries"
import { seedRecruitmentRepository } from "./seed-recruitment-repository"
import { stubApplicationGateway, stubNotifyGateway } from "./stub-gateways"

const rounds = makeRecruitmentQueries(seedRecruitmentRepository)
const submitApplication = makeSubmitApplication({ rounds, gateway: stubApplicationGateway, today: () => todayIso() })
const subscribeNotify = makeSubscribeNotify(stubNotifyGateway)

const text = (v: FormDataEntryValue | null) => (typeof v === "string" ? v : undefined)

/** Driving adapter for the application form. Validation runs again inside the use case. */
export async function submitApplicationAction(formData: FormData): Promise<SubmitApplicationResult> {
  return submitApplication({
    roundId: text(formData.get("roundId")),
    fullName: text(formData.get("fullName")),
    birthDate: text(formData.get("birthDate")),
    school: text(formData.get("school")),
    province: text(formData.get("province")),
    phone: text(formData.get("phone")),
    email: text(formData.get("email")),
    options: formData.getAll("options").filter((v): v is string => typeof v === "string"),
    motivation: text(formData.get("motivation")),
    consent: formData.get("consent") === "true",
    website: text(formData.get("website")),
  })
}

export async function subscribeNotifyAction(formData: FormData): Promise<SubscribeResult> {
  return subscribeNotify({ email: text(formData.get("email")), consent: formData.get("consent") === "true", website: text(formData.get("website")) })
}
