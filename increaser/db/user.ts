import { User } from '@increaser/entities/User'
import { tableName } from './tableName'
import { DeleteCommand, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb'
import { DescribeTableCommand } from '@aws-sdk/client-dynamodb'
import { shouldBeDefined } from '@lib/utils/assert/shouldBeDefined'
import {
  getAttributeNameKey,
  getAttributeParams,
  getAttributeValueKey,
} from '@lib/dynamodb/attributes'
import { getPickParams } from '@lib/dynamodb/getPickParams'
import { dbDocClient } from '@lib/dynamodb/client'
import { updateItem } from '@lib/dynamodb/updateItem'
import { makeGetItem } from '@lib/dynamodb/makeGetItem'
import { withoutDuplicates } from '@lib/utils/array/withoutDuplicates'
import { totalScan } from '@lib/dynamodb/totalScan'

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

export const getNumberOfUsers = async () => {
  const command = new DescribeTableCommand({
    TableName: tableName.users,
  })

  const tableInfo = await dbDocClient.send(command)

  return shouldBeDefined(tableInfo.Table?.ItemCount)
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
