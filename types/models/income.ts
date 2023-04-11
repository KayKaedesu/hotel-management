import { z } from 'zod'

const value = z.number().nonnegative()

export { value }
export { id as incomeId } from './base'
export { dateTime as date } from './base'
