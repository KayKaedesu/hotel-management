import { z } from 'zod'

const name = z.string()

export { id as jobId, money as hourlyWage } from './base.js'
export { name }
