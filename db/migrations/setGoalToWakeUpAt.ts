import { totalScan } from '@increaser/dynamodb/totalScan'
import { User, defaultGoalToStartWorkAt } from '@increaser/entities/User'
import { tableName } from '../tableName'
import { MIN_IN_HOUR } from '@increaser/utils/time'
import { updateUser } from '../user'
import { getPickParams } from '@increaser/dynamodb/getPickParams'

const migrate = async () => {
  const users = await totalScan<
    Pick<User, 'id' | 'goalToWakeUpAt' | 'goalToStartWorkAt'>
  >({
    TableName: tableName.users,
    ...getPickParams(['id', 'goalToWakeUpAt', 'goalToStartWorkAt']),
  })

  await Promise.all(
    users.map((user) => {
      return updateUser(user.id, {
        goalToWakeUpAt:
          (user.goalToStartWorkAt || defaultGoalToStartWorkAt) - MIN_IN_HOUR,
      })
    }),
  )
}

migrate()
