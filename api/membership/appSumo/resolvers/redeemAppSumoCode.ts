import { assertUserId } from '../../../auth/assertUserId'
import { updateUser } from '@increaser/db/user'
import { getAppSumoCodeById, updateAppSumoCode } from '@increaser/db/appSumo'
import { ApiResolver } from '../../../resolvers/ApiResolver'
import { ApiError } from '@increaser/api-interface/ApiError'

export const redeemAppSumoCode: ApiResolver<'redeemAppSumoCode'> = async ({
  input: { code },
  context,
}) => {
  const userId = assertUserId(context)

  const appSumoCode = await getAppSumoCodeById(code)
  if (!appSumoCode) {
    throw new ApiError('invalidInput', 'Provided AppSumo code does not exist')
  }

  if (appSumoCode.userId && appSumoCode.userId !== userId) {
    throw new ApiError(
      'invalidInput',
      'Provided AppSumo code is already redeemed',
    )
  }

  await updateAppSumoCode(code, { userId })
  await updateUser(userId, {
    lifeTimeDeal: {
      provider: 'appsumo',
    },
  })
}
