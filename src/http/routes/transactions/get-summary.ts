import type { FastifyInstance } from 'fastify'
import { knex } from '../../../database'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

export async function getSummary(app: FastifyInstance) {
  app.get(
    '/summary',
    { preHandler: [checkSessionIdExists] },
    async (req, reply) => {
      const { sessionId } = req.cookies

      const summary = await knex('transactions')
        .where('session_id', sessionId)
        .sum('amount', { as: 'amount' })
        .first()

      return reply.status(200).send({ summary })
    }
  )
}
