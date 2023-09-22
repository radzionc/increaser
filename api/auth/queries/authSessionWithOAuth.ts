import { OperationContext } from '../../gql/OperationContext'
import { QueryResolvers } from '../../gql/schema'
import { authenticateWithOAuth } from '../utils/authenticateWithOAuth'
import { authorize } from '../utils/authorize'

export const authSessionWithOAuth: QueryResolvers<OperationContext>['authSessionWithOAuth'] =
  async (
    _,
    { input: { timeZone, provider, redirectUri, code } },
    { country },
  ) => {
    const result = await authenticateWithOAuth({
      provider,
      redirectUri,
      code,
    })

    return authorize({
      timeZone,
      country,
      ...result,
    })
  }
