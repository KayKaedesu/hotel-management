import { z } from 'zod'

const name = z.string()
const salary = z.number().nonnegative()

export { id as jobId } from './base'
export { name, salary }
