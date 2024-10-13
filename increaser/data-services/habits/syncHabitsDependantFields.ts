import { getUser, updateUser } from '@increaser/db/user'
import { recordMap } from '@lib/utils/record/recordMap'

export const syncHabitsDependantFields = async (userId: string) => {
  const oldUser = await getUser(userId, ['habits', 'goals'])

  const ids = new Set(Object.values(oldUser.habits).map(({ id }) => id))

  const goals = recordMap(oldUser.goals, (goal) => ({
    ...goal,
    habits: goal.habits?.filter((id) => ids.has(id)),
  }))

  await updateUser(userId, {
    goals,
  })
}
