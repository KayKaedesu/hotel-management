import { z } from 'zod'

const firstName = z.string().min(3).max(50)
const lastName = z.string().min(3).max(50)
const telNum = z.string().length(10)
const salary = z.number().nonnegative()

export { firstName, lastName, telNum, salary }
export { accountId } from './accounts'
export { id as employeeId } from './base'
