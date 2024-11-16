import { getUser, updateUser } from '@increaser/db/user'
import { recordMap } from '@lib/utils/record/recordMap'

export const syncPrinciplesDependantFields = async (userId: string) => {
  const oldUser = await getUser(userId, ['principles', 'goals'])

  const ids = new Set(Object.values(oldUser.principles).map(({ id }) => id))

  const goals = recordMap(oldUser.goals, (goal) => ({
    ...goal,
    principles: goal.principles?.filter((id) => ids.has(id)),
  }))

  await updateUser(userId, {
    goals,
  })
}
