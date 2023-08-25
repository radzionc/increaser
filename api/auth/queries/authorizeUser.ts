import * as usersDB from '../../users/db'
import { getId } from '@increaser/entities-utils/shared/getId'
import { getSanitizedName } from '../../shared/helpers/getSanitizedName'
import { freeTrialDays } from '../../membership'
import { msInDay } from '../../shared/helpers/time'
import { generateAuthData } from '../generateAuthData'
import {
  defaultGoalToStartWorkAt,
  defaultGoalToFinishWorkBy,
  defaultGoalToGoToBedAt,
} from '../../users/User'

interface AuthorizeUserParams {
  email: string
  name?: string
  country: string | null
  timeZone: number
}

export const authorizeUser = async ({
  email,
  name,
  country,
  timeZone,
}: AuthorizeUserParams) => {
  let user = email
    ? await usersDB.getUserByEmail(email, ['id', 'name', 'email'])
    : undefined

  const isFirstIdentification = !user
  if (!user) {
    user = {
      id: getId(),
      name: name ? getSanitizedName(name) : undefined,
      email,
    }

    const registrationDate = Date.now()

    await usersDB.putUser({
      ...user,
      country,
      timeZone,
      freeTrialEnd: registrationDate + freeTrialDays * msInDay,
      registrationDate,
      goalToStartWorkAt: defaultGoalToStartWorkAt,
      goalToFinishWorkBy: defaultGoalToFinishWorkBy,
      goalToGoToBedAt: defaultGoalToGoToBedAt,
    })
  }

  const authData = generateAuthData(user.id)

  return {
    ...user,
    firstIdentification: isFirstIdentification,
    ...authData,
  } as const
}
