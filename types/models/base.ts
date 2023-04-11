import { z } from 'zod'

const id = z.number().int()
const money = z.number().nonnegative()
const dateTime = z.coerce.date()

export { id, money, dateTime }
