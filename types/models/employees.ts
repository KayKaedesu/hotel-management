import { z } from 'zod'

const firstName = z.string().min(3).max(50)
const lastName = z.string().min(3).max(50)
const telNum = z.string().length(10).startsWith('0')

export { id as employeeId } from './base'
export { firstName, lastName, telNum }
export { jobId } from './jobs'
export { accountId } from './accounts'

