import { totalScan } from '@lib/dynamodb/totalScan'
import { tableName } from '../tableName'
import { getPickParams } from '@lib/dynamodb/getPickParams'
import { updateItem } from '@lib/dynamodb/updateItem'

type OldUser = {
  id: string
  primaryGoal: any
}

const removeOutdatedFields = async () => {
  const users = await totalScan<OldUser>({
    TableName: tableName.users,
    ...getPickParams(['id', 'primaryGoal']),
    FilterExpression: 'attribute_exists(primaryGoal)',
  })

  await Promise.all(
    users.map((user) => {
      return updateItem({
        tableName: tableName.users,
        key: { id: user.id },
        fields: {
          primaryGoal: undefined,
        },
      })
    }),
  )
}

removeOutdatedFields()
