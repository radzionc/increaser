import { ScanCommand } from '@aws-sdk/lib-dynamodb'
import { dbDocClient } from '../dbClient'
import { tableName } from '../tableName'
import { projectionExpression } from '../utils/projectionExpression'
import { User } from '@increaser/entities/User'
import { updateUser } from '../user'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const recursiveProcess = async (lastEvaluatedKey?: any) => {
  const command = new ScanCommand({
    ExclusiveStartKey: lastEvaluatedKey,
    TableName: tableName.users,
    ...projectionExpression(['id']),
  })
  const { Items, LastEvaluatedKey } = await dbDocClient.send(command)

  const users = Items as Pick<User, 'id'>[]

  await Promise.all(
    users.map(async ({ id }) => {
      await updateUser(id, {
        isAnonymous: true,
      })
    }),
  )
  if (LastEvaluatedKey) {
    await recursiveProcess(LastEvaluatedKey)
  }
}

recursiveProcess()
