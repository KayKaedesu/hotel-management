import { z } from 'zod'

const username = z.string().min(3).max(50)
const password = z.string()
const email = z.string().email().min(3).max(50)
const accountType = z.enum(['Executive', 'Employee', 'Customer'])

export { username, password, accountType, email }
export { id as accountId } from './base.js'
