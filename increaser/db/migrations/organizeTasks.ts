import { totalScan } from '@lib/dynamodb/totalScan'
import { tableName } from '../tableName'
import { updateUser } from '../user'
import { getPickParams } from '@lib/dynamodb/getPickParams'
import { Task } from '@increaser/entities/Task'
import { getRecord } from '@lib/utils/record/getRecord'

type OldUser = {
  id: string
  tasks: Task[]
}

const migrate = async () => {
  const users = await totalScan<OldUser>({
    TableName: tableName.users,
    ...getPickParams(['id', 'tasks']),
  })

  await Promise.all(
    users.map(({ id, tasks }) => {
      return updateUser(id, {
        tasks: getRecord(tasks, (task) => task.id),
      })
    }),
  )
}

migrate()
