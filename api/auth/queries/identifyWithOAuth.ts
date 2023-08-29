import { getValidatedUser } from './getValidatedUser'
import { OperationContext } from '../../gql/OperationContext'
import { authorizeUser } from './authorizeUser'
import { QueryResolvers } from '../../gql/schema'

export const identifyWithOAuth: QueryResolvers['identifyWithOAuth'] = async (
  _,
  { input },
  { country }: OperationContext,
) => {
  const { name, email } = await getValidatedUser(input)

  return authorizeUser({ timeZone: input.timeZone, email, name, country })
}
