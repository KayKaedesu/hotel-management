import { z } from 'zod'

const username = z.string().min(3).max(50)
const password = z.string().length(60)
const accountType = z.enum(['Executive', 'Employee', 'Customer'])

export { username, password, accountType }
export { id as accountId } from './base.js'
