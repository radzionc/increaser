import { User } from '@increaser/entities/User'
import { dbDocClient } from './dbClient'
import { tableName } from './tableName'
import { projectionExpression } from './utils/projectionExpression'
import { getUpdateParams } from './utils/getUpdateParams'
import {
  DeleteCommand,
  GetCommand,
  PutCommand,
  ScanCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb'
import { mergeParams } from './utils/mergeParams'
import { DescribeTableCommand } from '@aws-sdk/client-dynamodb'
import { shouldBeDefined } from '@increaser/utils/shouldBeDefined'

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

export function getUserByEmail<T extends (keyof User)[]>(
  email: string,
  attributes: T,
): Promise<Pick<User, T[number]> | null> {
  const recursiveProcess = async (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    lastEvaluatedKey?: any,
  ): Promise<Pick<User, T[number]> | null> => {
    const command = new ScanCommand({
      TableName: tableName.users,
      ExclusiveStartKey: lastEvaluatedKey,
      FilterExpression: '#email = :email',
      ExpressionAttributeValues: {
        ':email': email,
      },
      ...mergeParams(
        {
          ExpressionAttributeNames: {
            '#email': 'email',
          },
        },
        projectionExpression(attributes),
      ),
    })
    const { Items, LastEvaluatedKey } = await dbDocClient.send(command)

    if (Items?.length) {
      return Items[0] as Pick<User, T[number]>
    }

    if (LastEvaluatedKey) {
      return await recursiveProcess(LastEvaluatedKey)
    }

    return null
  }

  return recursiveProcess()
}

export const deleteUser = (id: string) => {
  const command = new DeleteCommand(getUserItemParams(id))

  return dbDocClient.send(command)
}

export const getNumberOfUsers = async () => {
  const command = new DescribeTableCommand({
    TableName: tableName.users,
  })

  const tableInfo = await dbDocClient.send(command)

  return shouldBeDefined(tableInfo.Table?.ItemCount)
}

export const putUser = (user: Omit<User, 'updatedAt'>) => {
  const command = new PutCommand({
    TableName: tableName.users,
    Item: {
      ...user,
      updatedAt: Date.now(),
    },
  })

  return dbDocClient.send(command)
}
