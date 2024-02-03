import { totalScan } from '@lib/dynamodb/totalScan'
import { tableName } from '../tableName'
import { updateUser } from '../user'
import { getPickParams } from '@lib/dynamodb/getPickParams'
import { isEmpty } from '@lib/utils/array/isEmpty'

type OldTask = {
  startedAt: number
  deadlineAt: number
  id: string
  name: string
  isCompleted: boolean
}

type OldUser = {
  id: string
  tasks: OldTask[]
}

const migrate = async () => {
  const users = await totalScan<OldUser>({
    TableName: tableName.users,
    ...getPickParams(['id', 'tasks']),
  })

  await Promise.all(
    users.map(({ tasks, id }) => {
      if (!isEmpty(tasks)) {
        return updateUser(id, {
          tasks: tasks.map(({ isCompleted, ...task }) => ({
            ...task,
            completedAt: isCompleted ? task.deadlineAt : undefined,
          })),
        })
      }
    }),
  )
}

migrate()
