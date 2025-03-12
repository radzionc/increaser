import { omit } from '@lib/utils/record/omit'
import { recordMap } from '@lib/utils/record/recordMap'
import { getUser, updateUser } from '@product/db/user'

export const syncTaskFactoriesDependantFields = async (userId: string) => {
  const oldUser = await getUser(userId, ['tasks', 'taskFactories', 'goals'])

  const ids = new Set(Object.values(oldUser.taskFactories).map(({ id }) => id))

  const tasks = recordMap(oldUser.tasks, (task) =>
    task.factoryId && ids.has(task.factoryId) ? omit(task, 'factoryId') : task,
  )

  const goals = recordMap(oldUser.goals, (goal) => ({
    ...goal,
    taskFactories: goal.taskFactories?.filter((id) => ids.has(id)),
  }))

  await updateUser(userId, {
    tasks,
    goals,
  })
}
