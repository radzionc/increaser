import { totalScan } from '@increaser/dynamodb/totalScan'
import {
  User,
  defaultFirstMealStartsAt,
  defaultLastMealStartsAt,
} from '@increaser/entities/User'
import { tableName } from '../tableName'
import { updateUser } from '../user'
import { getPickParams } from '@increaser/dynamodb/getPickParams'

const migrate = async () => {
  const users = await totalScan<Pick<User, 'id'>>({
    TableName: tableName.users,
    ...getPickParams(['id']),
  })

  await Promise.all(
    users.map((user) => {
      return updateUser(user.id, {
        firstMealStartsAt: defaultFirstMealStartsAt,
        lastMealStartsAt: defaultLastMealStartsAt,
      })
    }),
  )
}

migrate()
