import { z } from 'zod'

const roomNum = z.string()

export { roomNum }
export { id as roomId } from './base.js'
export { roomTypeId } from './room_types.js'
