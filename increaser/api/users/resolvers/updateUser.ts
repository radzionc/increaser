import { assertUserId } from '../../auth/assertUserId'
import * as usersDb from '@increaser/db/user'
import { ApiResolver } from '../../resolvers/ApiResolver'
import {
  scoreboardPeriods,
  scoreboardSensitiveUserFields,
} from '@increaser/entities/PerformanceScoreboard'
import { intersection } from '@lib/utils/array/intersection'
import { getScoreboard, updateScoreboard } from '@increaser/db/scoreboard'
import { findBy } from '@lib/utils/array/findBy'
import { getUserProfile } from '@increaser/entities-utils/scoreboard/getUserProfile'
import { userReadonlyFields } from '@increaser/entities/User'

export const updateUser: ApiResolver<'updateUser'> = async ({
  input,
  context,
}) => {
  const hasReadonlyField =
    intersection(Object.keys(input), [...userReadonlyFields]).length > 0
  if (hasReadonlyField) {
    throw new Error('You cannot update readonly fields')
  }

  const userId = assertUserId(context)

  await usersDb.updateUser(userId, input)

  if (intersection(Object.keys(input), scoreboardSensitiveUserFields).length) {
    const userFields = await usersDb.getUser(
      userId,
      scoreboardSensitiveUserFields,
    )
    await Promise.all(
      scoreboardPeriods.map(async (period) => {
        const scoreboard = await getScoreboard(period)
        const isInScoreboard = findBy(scoreboard.users, 'id', userId)
        if (!isInScoreboard) return

        const users = scoreboard.users.map((user) => {
          if (user.id !== userId) return user
          return {
            ...user,
            profile: getUserProfile(userFields),
          }
        })
        await updateScoreboard(period, { users })
      }),
    )
  }
}
