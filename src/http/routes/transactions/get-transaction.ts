import type { FastifyInstance } from 'fastify'
import { knex } from '../../../database'
import * as zod from 'zod'
import { checkSessionIdExists } from '../middlewares/check-session-id-exists'

const transactionsParamsSchema = zod.object({
  id: zod.string().uuid(),
})

export async function getTransaction(app: FastifyInstance) {
  app.get(
    '/:id',
    { preHandler: [checkSessionIdExists] },
    async (req, reply) => {
      const { id } = transactionsParamsSchema.parse(req.params)
      const { sessionId } = req.cookies

      const transaction = await knex('transactions')
        .where({ id, session_id: sessionId })
        .first()

      return reply.status(200).send({ transaction })
    }
  )
}
