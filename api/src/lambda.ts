import { ApolloServer } from 'apollo-server-lambda'
import { AWSLambda } from '@sentry/serverless'

import { typeDefs } from './graphql/typeDefs'
import { resolvers } from './graphql/resolvers'
import { userIdFromToken } from './auth/userIdFromToken'
import { OperationContext } from './graphql/OperationContext'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ event: { headers } }): Promise<OperationContext> => {
    let userId = null
    try {
      userId = await userIdFromToken(
        headers['Authorization'].replace('Bearer ', ''),
      )
    } catch {}

    return {
      userId,
      country: headers['CloudFront-Viewer-Country'] || null,
    }
  },
  formatError: ({ message, extensions }) => {
    return {
      message,
      extensions,
    }
  },
})

AWSLambda.init({
  dsn: process.env.SENTRY_KEY,
})

export const handler = AWSLambda.wrapHandler(server.createHandler())
