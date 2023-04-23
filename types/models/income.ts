import { z } from 'zod'

const source = z.enum(['Bills', 'Bank', 'Card'])

export {
  id as incomeId,
  money as amount,
  dateTime as receivedAt,
} from './base.js'
export { source }
