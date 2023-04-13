import { z } from 'zod'

const username = z.string().min(3).max(20)
const password = z.string().length(60)

export { username, password }
export { id as accountId } from './base.js'
