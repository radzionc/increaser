import { recordMap } from '@lib/utils/record/recordMap'
import { getUser, updateUser } from '@product/db/user'

export const syncVisionDependantFields = async (userId: string) => {
  const oldUser = await getUser(userId, ['vision', 'goals'])

  const ids = new Set(Object.values(oldUser.vision).map(({ id }) => id))

  const goals = recordMap(oldUser.goals, (goal) => ({
    ...goal,
    vision: goal.vision?.filter((id) => ids.has(id)),
  }))

  await updateUser(userId, {
    goals,
  })
}
