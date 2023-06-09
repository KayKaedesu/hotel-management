import { z } from 'zod'

const id = z.coerce.number().int()
const money = z.coerce.number().nonnegative()
const dateTime = z.coerce.date()

export { id, money, dateTime }
