import type { FastifyInstance } from 'fastify'
import { knex } from '../../../database'
import * as zod from 'zod'
import { randomUUID } from 'node:crypto'

const transactionBodySchema = zod.object({
  title: zod.string(),
  amount: zod.number(),
  type: zod.enum(['credit', 'debit']),
})

export async function createTransaction(app: FastifyInstance) {
  app.post('/', async (req, reply) => {
    const { title, amount, type } = transactionBodySchema.parse(req.body)

    let sessionId = req.cookies.sessionId

    if (!sessionId) {
      sessionId = randomUUID()

      reply.cookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7days
      })
    }

    await knex('transactions').insert({
      id: randomUUID(),
      title,
      amount: type === 'credit' ? amount : amount * -1,
      session_id: sessionId,
    })

    return reply.status(201).send()
  })
}
