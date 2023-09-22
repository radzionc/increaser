import { OperationContext } from '../../gql/OperationContext'
import { QueryResolvers } from '../../gql/schema'
import { authenticateWithEmail } from '../utils/authenticateWithEmail'
import { authorize } from '../utils/authorize'

export const authSessionWithEmail: QueryResolvers<OperationContext>['authSessionWithEmail'] =
  async (_, { input: { code, timeZone } }, { country }) => {
    const result = await authenticateWithEmail({
      code,
    })

    return authorize({
      timeZone,
      country,
      ...result,
    })
  }
