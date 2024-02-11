import { totalScan } from '@lib/dynamodb/totalScan'
import { tableName } from '../tableName'
import { updateUser } from '../user'
import { getPickParams } from '@lib/dynamodb/getPickParams'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { Project } from '@increaser/entities/Project'

type OldUser = {
  id: string
  projects: Project[]
}

const migrate = async () => {
  const users = await totalScan<OldUser>({
    TableName: tableName.users,
    ...getPickParams(['id', 'projects']),
  })

  await Promise.all(
    users.map((user) => {
      if (!isEmpty(user.projects)) {
        return updateUser(user.id, {
          finishedOnboardingAt: Date.now(),
        })
      }
    }),
  )
}

migrate()
