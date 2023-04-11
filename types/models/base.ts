import { z } from 'zod'

const id = z.number().int()
const dateTime = z.coerce.date()

export { id, dateTime }
