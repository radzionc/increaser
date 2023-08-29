import { getId } from '@increaser/entities-utils/shared/getId'
import { getSanitizedName } from '../../shared/helpers/getSanitizedName'
import { freeTrialDays } from '../../membership'
import { msInDay } from '../../shared/helpers/time'
import { generateAuthData } from '../generateAuthData'
import { getUserByEmail, putUser } from '@increaser/db/user'
import { userDefaultFields } from '@increaser/entities/User'

interface AuthorizeUserParams {
  email: string
  name?: string
  country?: string
  timeZone: number
}

export const authorizeUser = async ({
  email,
  name,
  country,
  timeZone,
}: AuthorizeUserParams) => {
  let user = await getUserByEmail(email, ['id', 'name', 'email'])

  const isFirstIdentification = !user
  if (!user) {
    user = {
      id: getId(),
      name: name ? getSanitizedName(name) : undefined,
      email,
    }

    const registrationDate = Date.now()

    await putUser({
      ...user,
      ...userDefaultFields,
      country,
      timeZone,
      freeTrialEnd: registrationDate + freeTrialDays * msInDay,
      registrationDate,
    })
  }

  const { token, tokenExpirationTime } = generateAuthData(user.id)

  return {
    email,
    firstIdentification: isFirstIdentification,
    token,
    tokenExpirationTime,
    name: user.name,
    id: user.id,
  } as const
}
