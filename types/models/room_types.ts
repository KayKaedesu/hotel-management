import { z } from 'zod'

const roomType = z.string()

export { id as roomTypeId, money as dailyCost } from './base.js'
export { roomType }
