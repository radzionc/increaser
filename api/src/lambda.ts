import { AWSLambda } from '@sentry/serverless'
import { ApolloServer } from '@apollo/server'
import {
  startServerAndCreateLambdaHandler,
  handlers,
} from '@as-integrations/aws-lambda'

import { typeDefs } from './graphql/typeDefs'
import { resolvers } from './graphql/resolvers'
import { OperationContext } from './graphql/OperationContext'
import { userIdFromToken } from './auth/userIdFromToken'

AWSLambda.init({
  dsn: process.env.SENTRY_KEY,
})

const server = new ApolloServer<OperationContext>({
  typeDefs,
  resolvers,

  formatError: ({ message, extensions }) => {
    return {
      message,
      extensions,
    }
  },
})

const apolloHandler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler(),
  {
    context: async ({ event: { headers } }): Promise<OperationContext> => {
      let userId: string | null = null
      const authHeader = headers['Authorization']
      const token = authHeader ? authHeader.replace('Bearer ', '') : null
      if (token) {
        try {
          userId = await userIdFromToken(token)
        } catch (error) {}
      }

      return {
        userId,
        country: headers['CloudFront-Viewer-Country'] || null,
      }
    },
  },
)

export const handler = AWSLambda.wrapHandler(apolloHandler)
