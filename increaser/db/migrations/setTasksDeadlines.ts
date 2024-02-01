import { totalScan } from '@lib/dynamodb/totalScan'
import { tableName } from '../tableName'
import { updateUser } from '../user'
import { getPickParams } from '@lib/dynamodb/getPickParams'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { inTimeZone } from '@lib/utils/time/inTimeZone'
import { endOfDay } from 'date-fns'
import { Task } from '@increaser/entities/Task'

type OldUser = {
  id: string
  tasks: Task[]
  timeZone: number
}

const migrate = async () => {
  const users = await totalScan<OldUser>({
    TableName: tableName.users,
    ...getPickParams(['id', 'tasks', 'timeZone']),
  })

  await Promise.all(
    users.map((user) => {
      if (user.tasks && !isEmpty(user.tasks)) {
        return updateUser(user.id, {
          tasks: user.tasks.map((task) => ({
            ...task,
            deadlineAt: inTimeZone(
              endOfDay(task.startedAt).getTime(),
              user.timeZone,
            ),
          })),
        })
      }
    }),
  )
}

migrate()
