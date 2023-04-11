import { z } from 'zod'

const source = z.enum(['Bills', 'Bank', 'Credit'])

export { id as incomeId, money as amount, dateTime as receivedAt } from './base'
export { source }
