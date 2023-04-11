import { z } from 'zod'
import { id as roomTypeId } from './base'

const roomType = z.string()
const roomCost = z.number().positive()

export { roomType, roomCost, roomTypeId }
