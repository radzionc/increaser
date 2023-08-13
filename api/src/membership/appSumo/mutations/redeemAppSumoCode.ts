import { OperationContext } from '../../../graphql/OperationContext'
import { assertUserId } from '../../../auth/assertUserId'
import * as appSumoCodesDb from '../db'
import * as usersDb from '../../../users/db'
import { UserInputError } from 'apollo-server-lambda'

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
    throw new UserInputError(`Code ${code} does not exist`)
  }

  if (appSumoCode.userId && appSumoCode.userId !== userId) {
    throw new UserInputError(`Code ${appSumoCode} is already redeemed`)
  }

  await appSumoCodesDb.updateAppSumoCode(code, { userId })
  await usersDb.updateUser(userId, { appSumo: { code } })
}
