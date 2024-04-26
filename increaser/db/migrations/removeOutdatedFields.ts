import { totalScan } from '@lib/dynamodb/totalScan'
import { tableName } from '../tableName'
import { getPickParams } from '@lib/dynamodb/getPickParams'
import { updateItem } from '@lib/dynamodb/updateItem'

const field = 'weekTimeAllocation' as const

type OldUser = {
  id: string
  [field]: any
}

const removeOutdatedFields = async () => {
  const users = await totalScan<OldUser>({
    TableName: tableName.users,
    ...getPickParams(['id', field]),
    FilterExpression: `attribute_exists(${field})`,
  })

  await Promise.all(
    users.map((user) => {
      return updateItem({
        tableName: tableName.users,
        key: { id: user.id },
        fields: {
          [field]: undefined,
        },
      })
    }),
  )
}

removeOutdatedFields()
