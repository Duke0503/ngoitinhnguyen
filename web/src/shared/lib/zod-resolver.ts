import type { FieldErrors, FieldValues, Resolver } from "react-hook-form"
import type { z } from "zod"

/**
 * Minimal react-hook-form resolver for a zod schema (flat field names).
 * Used instead of @hookform/resolvers, whose optional peer tree conflicts with zod 4.
 */
export function zodResolver<TFieldValues extends FieldValues, TOutput = TFieldValues>(
  schema: z.ZodType<unknown>
): Resolver<TFieldValues, unknown, TOutput> {
  return async (values) => {
    const result = await schema.safeParseAsync(values)
    if (result.success) return { values: result.data as TOutput, errors: {} }

    const errors: Record<string, { type: string; message: string }> = {}
    for (const issue of result.error.issues) {
      const key = issue.path.join(".")
      if (!(key in errors)) errors[key] = { type: issue.code, message: issue.message }
    }
    return { values: {}, errors: errors as FieldErrors<TFieldValues> }
  }
}
