// A fund is the bank account (and rules) that money for one campaign is sent to.
// Accounts change per campaign and sometimes per activity (BUSINESS.md §6.1), so
// the donation page always reads the fund; account numbers never live in components.

export type Fund = {
  campaignCode: string
  name: string
  bankName: string
  /** 6-digit NAPAS bank identification number used by VietQR (BIDV = 970418). */
  bankBin: string
  accountNumber: string
  accountOwner: string
  /** Suggested amounts in VND; donors can also enter any amount. */
  presets: number[]
  /** Smallest amount that earns a certificate, if the campaign offers one. */
  certificateFrom?: number
  /** Whether the fund currently accepts donations (set by finance, follows the campaign status). */
  open: boolean
}

import { isCode, makeCode } from "@/shared/lib/reference-code"

/** Reference code printed in the transfer memo and stored with the donation, e.g. `HT10-7K3Q`. */
export const makeReferenceCode = makeCode

export const isReferenceCode = isCode
