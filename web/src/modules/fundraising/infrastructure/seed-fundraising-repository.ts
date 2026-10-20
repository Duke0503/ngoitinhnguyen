import type { FundraisingRepository } from "../application/fundraising-queries"
import type { Fund } from "../domain/fund"
import { total, type DonorEntry, type FinancialReport, type FundProgress, type FundSummary } from "../domain/fundraising"

// No confirmed ledger exists yet: these figures are placeholders and are
// rendered with a “minh hoạ” label (DESIGN-BRIEF §4 copy rules).
const progress: FundProgress[] = [
  { campaignCode: "HT10", raised: 3_120_000, goal: 3_875_000, donorCount: 86, certificateFrom: 25_000, illustrative: true },
]

const report: FinancialReport = {
  campaignTitle: "Trung Thu Yêu Thương 2026: Đèn Trăng 2",
  status: "published",
  illustrative: true,
  income: [
    { label: "Chuyển khoản cá nhân", amount: 7_200_000 },
    { label: "Nhà tài trợ", amount: 4_000_000 },
    { label: "Bán sản phẩm", amount: 2_100_000 },
    { label: "Hiện vật quy đổi", amount: 1_300_000 },
  ],
  expenses: [
    { label: "Quà & lồng đèn", amount: 8_400_000 },
    { label: "Học bổng", amount: 2_500_000 },
    { label: "Di chuyển ra đảo", amount: 1_800_000 },
    { label: "Tổ chức & phát sinh", amount: 1_250_000 },
  ],
}

// Account and memo rules from the HT10 fundraising post (oms0mhgo): BIDV 8883309229, TRUONG THI MY TUYET.
// Open until finance closes it; the page never reads bank details from anywhere else.
const funds: Fund[] = [
  {
    campaignCode: "HT10",
    name: "Quỹ Hoa Tháng 10",
    bankName: "BIDV",
    bankBin: "970418",
    accountNumber: "8883309229",
    accountOwner: "TRUONG THI MY TUYET",
    presets: [25_000, 50_000, 100_000, 200_000],
    certificateFrom: 25_000,
    open: true,
  },
]

const donors: Record<string, DonorEntry[]> = {
  TTYT26: [
    { name: "Nguyễn Minh Anh", anonymous: false, message: "Chúc các em một mùa trăng thật vui!", amount: 200_000 },
    { name: "", anonymous: true, amount: 500_000 },
    { name: "Trần Gia Bảo", anonymous: false, message: "Gửi các em ở Thiềng Liềng", amount: 100_000 },
    { name: "Lê Thu Hà", anonymous: false, message: "Cố lên nhà Ngòi", amount: 50_000 },
  ],
}

const summaries: FundSummary[] = [
  { campaignCode: "TTYT26", raised: total(report.income), donorCount: 214, illustrative: true },
]

export const seedFundraisingRepository: FundraisingRepository = {
  async fundFor(code) {
    return funds.find((f) => f.campaignCode === code) ?? null
  },
  async progressFor(code) {
    return progress.find((p) => p.campaignCode === code) ?? null
  },
  async summaryFor(code) {
    return summaries.find((x) => x.campaignCode === code) ?? null
  },
  async donorsFor(code) {
    return donors[code] ?? []
  },
  async featuredReport() {
    return report
  },
}
