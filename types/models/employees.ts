import { z } from 'zod'

const firstName = z.string().min(3).max(50)
const lastName = z.string().min(3).max(50)
const telNum = z.string()

export { id as employeeId } from './base.js'
export { firstName, lastName, telNum }
export { jobId } from './jobs.js'
export { accountId } from './accounts.js'
