import fastify from 'fastify'
import fastifyCookie from '@fastify/cookie'

import { env } from './env'
import { createTransaction } from './http/routes/transactions/create-transaction'
import { getTransactions } from './http/routes/transactions/get-transactions'
import { getTransaction } from './http/routes/transactions/get-transaction'
import { getSummary } from './http/routes/transactions/get-summary'

const app = fastify()

app.register(fastifyCookie)

const transactionsRoutes = async () => {
  await app.register(createTransaction)
  await app.register(getTransactions)
  await app.register(getTransaction)
  await app.register(getSummary)
}

app.register(transactionsRoutes, {
  prefix: 'transactions',
})

app.listen({ port: env.PORT }).then(() => {
  console.log('HTTP Server Running!')
})
