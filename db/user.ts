import { User } from '@increaser/entities/User'
import { tableName } from './tableName'
import { DeleteCommand, PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb'
import { DescribeTableCommand } from '@aws-sdk/client-dynamodb'
import { shouldBeDefined } from '@increaser/utils/shouldBeDefined'
import {
  getAttributeNameKey,
  getAttributeParams,
  getAttributeValueKey,
} from '@increaser/dynamodb/attributes'
import { getPickParams } from '@increaser/dynamodb/getPickParams'
import { dbDocClient } from '@increaser/dynamodb/client'
import { updateItem } from '@increaser/dynamodb/updateItem'
import { makeGetItem } from '@increaser/dynamodb/makeGetItem'

export const getUserItemParams = (id: string) => ({
  TableName: tableName.users,
  Key: {
    id,
  },
})

export const getUser = makeGetItem<string, User>({
  tableName: tableName.users,
  getKey: (id: string) => ({ id }),
})

export const updateUser = async (id: string, fields: Partial<User>) => {
  return updateItem({
    tableName: tableName.users,
    key: { id },
    fields: {
      ...fields,
      updatedAt: Date.now(),
    },
  })
}

export function getUserByEmail<T extends (keyof User)[]>(
  email: string,
  attributes: T,
): Promise<Pick<User, T[number]> | null> {
  const recursiveProcess = async (
    lastEvaluatedKey?: any,
  ): Promise<Pick<User, T[number]> | null> => {
    const command = new ScanCommand({
      TableName: tableName.users,
      ExclusiveStartKey: lastEvaluatedKey,
      FilterExpression: `${getAttributeNameKey(
        'email',
      )} = ${getAttributeValueKey('email')}`,

      ...getAttributeParams({
        email,
      }),

      ...getPickParams([...attributes, 'email']),
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
