import { User } from '@increaser/entities/User'
import { dbDocClient } from './dbClient'
import { tableName } from './tableName'
import { projectionExpression } from './utils/projectionExpression'
import { getUpdateParams } from './utils/getUpdateParams'
import { GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb'

export const getUserItemParams = (id: string) => ({
  TableName: tableName.users,
  Key: {
    id,
  },
})

export async function getUserById<T extends (keyof User)[]>(
  id: string,
  attributes?: T,
): Promise<Pick<User, T[number]>> {
  const command = new GetCommand({
    ...getUserItemParams(id),
    ...projectionExpression(attributes),
  })
  const { Item } = await dbDocClient.send(command)

  if (!Item) {
    throw new Error(`User with id=${id} not found`)
  }

  return Item as Pick<User, T[number]>
}

export const updateUser = async (id: string, params: Partial<User>) => {
  const command = new UpdateCommand({
    ...getUserItemParams(id),
    ...getUpdateParams({
      ...params,
      updatedAt: Date.now(),
    }),
  })

  return dbDocClient.send(command)
}
