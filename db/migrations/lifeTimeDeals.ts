import { ScanCommand } from '@aws-sdk/lib-dynamodb'
import { dbDocClient } from '../dbClient'
import { tableName } from '../tableName'
import { projectionExpression } from '../utils/projectionExpression'
import { User } from '@increaser/entities/User'
import { updateUser } from '../user'

const recursiveProcess = async (lastEvaluatedKey?: any) => {
  const command = new ScanCommand({
    ExclusiveStartKey: lastEvaluatedKey,
    TableName: tableName.users,
    ...projectionExpression(['id', 'appSumo']),
    FilterExpression: 'attribute_exists(appSumo)',
  })
  const { Items, LastEvaluatedKey } = await dbDocClient.send(command)

  const users = Items as Pick<User, 'id' | 'appSumo'>[]

  await Promise.all(
    users.map(async (user) => {
      await updateUser(user.id, {
        lifeTimeDeal: {
          provider: 'appsumo',
        },
      })
    }),
  )
  if (LastEvaluatedKey) {
    await recursiveProcess(LastEvaluatedKey)
  }
}

recursiveProcess()
