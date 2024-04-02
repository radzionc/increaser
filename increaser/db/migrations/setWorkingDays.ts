import { totalScan } from '@lib/dynamodb/totalScan'
import { tableName } from '../tableName'
import { getPickParams } from '@lib/dynamodb/getPickParams'
import { User } from '@increaser/entities/User'
import { updateUser } from '../user'

const setWorkingDays = async () => {
  const users = await totalScan<Pick<User, 'projects' | 'id'>>({
    TableName: tableName.users,
    ...getPickParams(['id', 'projects']),
    FilterExpression: 'attribute_exists(projects)',
  })

  await Promise.all(
    users.map((user) => {
      return updateUser(user.id, {
        projects: user.projects.map((project) => ({
          ...project,
          workingDays: 'everyday',
        })),
      })
    }),
  )
}

setWorkingDays()
