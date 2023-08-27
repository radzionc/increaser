import { OperationContext } from '../../../gql/OperationContext'
import { assertUserId } from '../../../auth/assertUserId'
import * as appSumoCodesDb from '../db'
import * as usersDb from '../../../users/db'
import { ApiErrorCode } from '../../../errors/ApiErrorCode'
import { GraphQLError } from 'graphql'

interface Input {
  code: string
}

export const redeemAppSumoCode = async (
  _: any,
  { input: { code } }: { input: Input },
  context: OperationContext,
) => {
  const userId = assertUserId(context)

  const appSumoCode = await appSumoCodesDb.getAppSumoCodeById(code)
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

  await appSumoCodesDb.updateAppSumoCode(code, { userId })
  await usersDb.updateUser(userId, { appSumo: { code } })
}
