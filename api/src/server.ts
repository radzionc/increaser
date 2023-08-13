import { ApolloServer } from 'apollo-server'
// @ts-ignore
import dotenv from 'dotenv'

import { typeDefs } from './graphql/typeDefs'
import { resolvers } from './graphql/resolvers'
import { userIdFromToken } from './auth/userIdFromToken'

dotenv.config()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const authHeader = req.headers.authorization
    const userId = authHeader
      ? await userIdFromToken(authHeader.replace('Bearer ', ''))
      : undefined

    return {
      userId,
    }
  },
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
