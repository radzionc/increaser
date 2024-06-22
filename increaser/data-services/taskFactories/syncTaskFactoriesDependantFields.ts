import { getUser, updateUser } from '@increaser/db/user'
import { omit } from '@lib/utils/record/omit'
import { recordMap } from '@lib/utils/record/recordMap'

export const syncTaskFactoriesDependantFields = async (userId: string) => {
  const oldUser = await getUser(userId, ['tasks', 'taskFactories'])

  const ids = new Set(Object.values(oldUser.taskFactories).map(({ id }) => id))

  const tasks = recordMap(oldUser.tasks, (task) =>
    task.factoryId && ids.has(task.factoryId) ? omit(task, 'factoryId') : task,
  )

  await updateUser(userId, {
    tasks,
  })
}
