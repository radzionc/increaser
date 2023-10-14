import { ScanCommand } from '@aws-sdk/lib-dynamodb'
import { dbDocClient } from '../dbClient'
import { tableName } from '../tableName'
import { projectionExpression } from '../utils/projectionExpression'
import { User } from '@increaser/entities/User'
import { removeUserField, updateUser } from '../user'

const recursiveProcess = async (lastEvaluatedKey?: any) => {
  const command = new ScanCommand({
    ExclusiveStartKey: lastEvaluatedKey,
    TableName: tableName.users,
    ...projectionExpression(['id', 'paddle']),
    FilterExpression: 'attribute_exists(paddle)',
  })
  const { Items, LastEvaluatedKey } = await dbDocClient.send(command)

  const users = Items as Pick<User, 'id' | 'paddle'>[]

  await Promise.all(
    users.map(async (user) => {
      if (user.paddle?.cancellation_effective_date) {
        const endsAt = new Date(
          user.paddle.cancellation_effective_date,
        ).getTime()

        if (endsAt > Date.now()) {
          await updateUser(user.id, {
            subscription: {
              provider: 'paddleClassic',
              id: user.paddle.subscription_id,
              planId: user.paddle.subscription_plan_id,
              status: 'canceled',
              endsAt,
            },
          })
        }
      }

      await removeUserField(user.id, 'paddle')
    }),
  )
  if (LastEvaluatedKey) {
    await recursiveProcess(LastEvaluatedKey)
  }
}

recursiveProcess()
