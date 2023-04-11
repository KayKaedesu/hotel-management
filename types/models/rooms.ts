import { z } from 'zod'

const roomId = z.string().nonempty()

export { roomId }
export { roomTypeId } from './room_types'
