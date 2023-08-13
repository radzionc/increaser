import { OperationContext } from '../../graphql/OperationContext'
import { assertUserId } from '../assertUserId'
import { generateAuthData } from '../generateAuthData'
import * as usersDB from '../../users/db'
import { AuthenticationError, gql } from 'apollo-server-lambda'

export const identifyTypeDefs = gql`
  extend type Query {
    identify: IdentificationResult
  }
`

export const identify = async (_: any, __: any, context: OperationContext) => {
  const userId = assertUserId(context)

  const user = await usersDB.getUserById(userId, ['id', 'name', 'email'])

  if (!user) {
    throw new AuthenticationError('User does not exist')
  }

  return {
    ...user,
    ...generateAuthData(user.id),
  }
}
