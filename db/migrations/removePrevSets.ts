import { totalScan } from '@increaser/dynamodb/totalScan'
import { User, Set } from '@increaser/entities/User'
import { tableName } from '../tableName'
import { updateUser } from '../user'

type OldUser = User & {
  prevSets: Set[]
}

const migrate = async () => {
  const users = await totalScan<OldUser>({
    TableName: tableName.users,
    FilterExpression: 'attribute_exists(prevSets)',
  })

  await Promise.all(
    users.map((user) => {
      return updateUser(user.id, {
        prevSets: undefined,
      } as Partial<User>)
    }),
  )
}

migrate()
