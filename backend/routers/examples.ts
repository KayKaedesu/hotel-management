import { Router } from 'express'
import {
  validateRequest,
  validateRequestQuery,
  TypedRequestBody,
  TypedRequestQuery,
} from 'zod-express-middleware'
import { z } from 'zod'

const testSchema = z.object({
  valueOne: z.string().min(3).max(40),
  valueTwo: z.boolean(),
})

const exampleRouter = Router()

// ? DOC: https://github.com/Aquila169/zod-express-middleware

// ตัวอย่าง json zod query parse ใช้ validateRequest
exampleRouter.get(
  '/one',
  // validateRequest ก่อนเข้้า function endpoint
  //ใช้แบบนี้
  validateRequest({
    body: testSchema,
  }),
  // ไม่ก็ใช้
  // validateRequestBody(testSchema),
  function (req: TypedRequestBody<typeof testSchema>, res) {
    // TypedRequestBody (Body, ): ใส่ type ให้ body, req.body.XXXX ขึ้นตัวช่วย
    res.json({ hello: 'yay' })
  }
)

const schema2 = z.object({
  valone: z.string(),
  valtwo: z.coerce.number(), // ! <-วิธี parse แบบเปิดใจไม่สน type
})

exampleRouter.get(
  '/two',
  validateRequestQuery(schema2),
  function (req: TypedRequestQuery<typeof schema2>, res) {
    res.json({ message: req.query.valone + req.query.valtwo })
  }
)

export default exampleRouter
