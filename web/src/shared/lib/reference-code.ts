// Short human-readable codes such as `HT10-7K3Q`, used as the bank-transfer memo for donations and orders.
// No 0/O/1/I, so a code read aloud or from a screenshot is not mistaken.
const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
const SUFFIX_LENGTH = 4

/** `randomInt(n)` must return an integer in [0, n). Injected so the logic stays pure and testable. */
export function makeCode(prefix: string, randomInt: (maxExclusive: number) => number): string {
  let suffix = ""
  for (let i = 0; i < SUFFIX_LENGTH; i++) suffix += ALPHABET[randomInt(ALPHABET.length)]
  return `${prefix}-${suffix}`
}

export function isCode(code: string, prefix: string): boolean {
  return new RegExp(`^${prefix}-[${ALPHABET}]{${SUFFIX_LENGTH}}$`).test(code)
}

/** Browser/server-safe cryptographic random integer in [0, maxExclusive). */
export const cryptoRandomInt = (maxExclusive: number) => crypto.getRandomValues(new Uint32Array(1))[0] % maxExclusive
