import { OperationContext } from '../../../gql/OperationContext'
import { assertUserId } from '../../../auth/assertUserId'
import { ApiErrorCode } from '../../../errors/ApiErrorCode'
import { GraphQLError } from 'graphql'
import { MutationResolvers } from '../../../gql/schema'
import { updateUser } from '@increaser/db/user'
import { getAppSumoCodeById, updateAppSumoCode } from '@increaser/db/appSumo'

export const redeemAppSumoCode: MutationResolvers['redeemAppSumoCode'] = async (
  _,
  { input: { code } },
  context: OperationContext,
) => {
  const userId = assertUserId(context)

  const appSumoCode = await getAppSumoCodeById(code)
  if (!appSumoCode) {
    throw new GraphQLError('Provided AppSumo code does not exist', {
      extensions: {
        code: ApiErrorCode.BadInput,
      },
    })
  }

  if (appSumoCode.userId && appSumoCode.userId !== userId) {
    throw new GraphQLError('Provided AppSumo code is already redeemed', {
      extensions: {
        code: ApiErrorCode.BadInput,
      },
    })
  }

  await updateAppSumoCode(code, { userId })
  await updateUser(userId, { appSumo: { code } })

  return true
}
