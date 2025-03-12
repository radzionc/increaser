import { DeleteCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb'
import {
  getAttributeNameKey,
  getAttributeParams,
  getAttributeValueKey,
} from '@lib/dynamodb/attributes'
import { dbDocClient } from '@lib/dynamodb/client'
import { getPickParams } from '@lib/dynamodb/getPickParams'
import { makeGetItem } from '@lib/dynamodb/makeGetItem'
import { totalScan } from '@lib/dynamodb/totalScan'
import { updateItem } from '@lib/dynamodb/updateItem'
import { withoutDuplicates } from '@lib/utils/array/withoutDuplicates'
import { User } from '@product/entities/User'

import { tableName } from './tableName'

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
    fields,
  })
}

export function getUserByEmail<T extends (keyof User)[]>(
  email: string,
  attributes: T,
): Promise<Pick<User, T[number]> | null> {
  const command = new QueryCommand({
    TableName: tableName.users,
    IndexName: 'EmailIndex',
    KeyConditionExpression: `${getAttributeNameKey(
      'email',
    )} = ${getAttributeValueKey('email')}`,
    ...getAttributeParams({ email }),
    ...getPickParams(withoutDuplicates([...attributes, 'email'])),
  })

  return dbDocClient.send(command).then(({ Items }) => {
    if (Items?.length) {
      return Items[0] as Pick<User, T[number]>
    }
    return null
  })
}

export const deleteUser = (id: string) => {
  const command = new DeleteCommand(getUserItemParams(id))

  return dbDocClient.send(command)
}

export const putUser = (user: User) => {
  const command = new PutCommand({
    TableName: tableName.users,
    Item: user,
  })

  return dbDocClient.send(command)
}

export const getAllUsers = async <T extends (keyof User)[]>(attributes?: T) => {
  return totalScan<Pick<User, T[number]>>({
    TableName: tableName.users,
    ...getPickParams(attributes),
  })
}
