import { totalScan } from '@lib/dynamodb/totalScan'
import { tableName } from '../tableName'
import { getPickParams } from '@lib/dynamodb/getPickParams'
import { User } from '@increaser/entities/User'
import { syncProjectsDependantFields } from '@increaser/data-services/projects/syncProjectsDependantFields'

const updateProjectsStatus = async () => {
  const users = await totalScan<Pick<User, 'id'>>({
    TableName: tableName.users,
    ...getPickParams(['id']),
  })

  await Promise.all(users.map(({ id }) => syncProjectsDependantFields(id)))
}

updateProjectsStatus()
