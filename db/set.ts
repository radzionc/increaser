import { UpdateCommand } from '@aws-sdk/lib-dynamodb'
import { Set } from '@increaser/entities/User'
import { getUserItemParams } from './user'
import { dbDocClient } from './dbClient'

export const putSet = async (userId: string, set: Set) => {
  const command = new UpdateCommand({
    ...getUserItemParams(userId),
    UpdateExpression: `set #listName = list_append(#listName, :mergeList)`,
    ExpressionAttributeValues: {
      ':mergeList': [set],
    },
    ExpressionAttributeNames: {
      '#listName': 'sets',
    },
  })

  await dbDocClient.send(command)
}
