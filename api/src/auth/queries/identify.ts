import { OperationContext } from '../../graphql/OperationContext'
import { assertUserId } from '../assertUserId'
import { generateAuthData } from '../generateAuthData'
import * as usersDB from '../../users/db'
import gql from 'graphql-tag'

export const identifyTypeDefs = gql`
  extend type Query {
    identify: IdentificationResult
  }
`

export const identify = async (_: any, __: any, context: OperationContext) => {
  const userId = assertUserId(context)

  const user = await usersDB.getUserById(userId, ['id', 'name', 'email'])

  return {
    ...user,
    ...generateAuthData(user.id),
  }
}
