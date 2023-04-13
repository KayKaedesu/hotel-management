import { z } from 'zod'
import { accountId as _accountId } from './accounts'

const firstName = z.string().min(3).max(50)
const lastName = z.string().min(3).max(50)
const telNum = z.string().length(10).startsWith('0')
const accountId = _accountId.nullable()

export { firstName, lastName, telNum }
export { id as customerId } from './base'
export { accountId }