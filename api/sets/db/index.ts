import { getUserItemParams } from '../../users/db'
import { Set } from '../../users/User'
import { documentClient } from '../../shared/db'

export const putSet = async (userId: string, set: Set) => {
  await documentClient
    .update({
      ...getUserItemParams(userId),
      UpdateExpression: `set #listName = list_append(#listName, :mergeList)`,
      ExpressionAttributeValues: {
        ':mergeList': [set],
      },
      ExpressionAttributeNames: {
        '#listName': 'sets',
      },
    })
    .promise()
}
