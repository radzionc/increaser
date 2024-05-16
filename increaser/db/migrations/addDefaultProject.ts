import { totalScan } from '@lib/dynamodb/totalScan'
import { tableName } from '../tableName'
import { getPickParams } from '@lib/dynamodb/getPickParams'
import { User } from '@increaser/entities/User'
import { updateUser } from '../user'
import { otherProject } from '@increaser/entities/Project'

const addDefaultProject = async () => {
  const users = await totalScan<Pick<User, 'projects' | 'id'>>({
    TableName: tableName.users,
    ...getPickParams(['id', 'projects']),
  })

  await Promise.all(
    users.map((user) => {
      return updateUser(user.id, {
        projects: [...user.projects, otherProject],
      })
    }),
  )
}

addDefaultProject()
