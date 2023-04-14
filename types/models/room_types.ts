import { z } from 'zod'

const name = z.string()
const description = z.string()

export { id as roomTypeId, money as dailyCost } from './base.js'
export { name, description }
