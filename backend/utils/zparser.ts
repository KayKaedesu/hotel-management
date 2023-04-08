import type { Request } from 'express'
import { AnyZodObject, ZodError, z } from 'zod'

export async function zParser<T extends AnyZodObject>(
  schema: T,
  req: Request
): Promise<z.infer<T>> {
  try {
    return schema.parseAsync(req)
  } catch (error) {
    if (error instanceof ZodError) {
      throw error
    }
    throw new Error(JSON.stringify(error))
  }
}
