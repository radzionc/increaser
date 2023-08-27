import { AWSLambda } from '@sentry/serverless'
import { ApolloServer } from '@apollo/server'
import {
  startServerAndCreateLambdaHandler,
  handlers,
  middleware,
} from '@as-integrations/aws-lambda'

import { typeDefs } from './gql/typeDefs'
import { resolvers } from './gql/resolvers'
import { OperationContext } from './gql/OperationContext'
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

const requestHandler = handlers.createAPIGatewayProxyEventRequestHandler()
const corsMiddleware: middleware.MiddlewareFn<
  typeof requestHandler
> = async () => {
  return (result) => {
    result.headers = {
      ...result.headers,
      'Access-Control-Allow-Origin': '*',
    }
    return Promise.resolve()
  }
}

const apolloHandler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventRequestHandler(),
  {
    middleware: [corsMiddleware],
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
