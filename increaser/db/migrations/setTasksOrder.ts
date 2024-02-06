import { totalScan } from '@lib/dynamodb/totalScan'
import { tableName } from '../tableName'
import { updateUser } from '../user'
import { getPickParams } from '@lib/dynamodb/getPickParams'
import { User } from '@increaser/entities/User'
import { recordMap } from '@lib/utils/record/recordMap'

const migrate = async () => {
  const users = await totalScan<Pick<User, 'id' | 'tasks'>>({
    TableName: tableName.users,
    ...getPickParams(['id', 'tasks']),
  })

  await Promise.all(
    users.map(({ id, tasks }) => {
      return updateUser(id, {
        tasks: recordMap(tasks, (task, order) => ({
          ...task,
          order,
        })),
      })
    }),
  )
}

migrate()
