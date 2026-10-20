// Numbered pagination helpers shared by the list pages (campaigns, news).

export const pageCount = (total: number, perPage: number) => Math.max(1, Math.ceil(total / perPage))

/** Page numbers to show: 1 2 … current±1 … last, with gaps marked by 0. */
export function pageWindow(current: number, last: number): number[] {
  const set = new Set([1, 2, current - 1, current, current + 1, last])
  const nums = [...set].filter((n) => n >= 1 && n <= last).sort((a, b) => a - b)
  return nums.flatMap((n, i) => (i > 0 && n - nums[i - 1] > 1 ? [0, n] : [n]))
}
