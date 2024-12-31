import type { FastifyInstance } from 'fastify'
import { knex } from '../../../database'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function getTransactions(app: FastifyInstance) {
  app.get('/', { preHandler: [checkSessionIdExists] }, async (req, reply) => {
    const { sessionId } = req.cookies

    const transactions = await knex('transactions')
      .where('session_id', sessionId)
      .select()

    return reply.status(200).send({ transactions })
  })
}
