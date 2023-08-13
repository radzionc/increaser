import type { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { DynamoDB } from 'aws-sdk'
import { defaultWeekTimeAllocation } from '../../weekTimeAllocation/WeekTimeAllocation'
import { documentClient } from '../../shared/db'
import { getUpdateParams } from '../../shared/db/getUpdateParams'
import { mergeParams } from '../../shared/db/mergeParams'
import { projectionExpression } from '../../shared/db/projectionExpression'
import { tableName } from '../../shared/db/tableName'
import { User } from '../User'
import { defaultFocusSounds } from '../../focus'

export const getUserItemParams = (id: string) => ({
  TableName: tableName.users,
  Key: { id },
})

const defaultUserProperties: Partial<User> = {
  focusSounds: defaultFocusSounds,
  sets: [],
  prevSets: [],
  tasks: [],
  projects: [],
  habits: {},
  weekTimeAllocation: defaultWeekTimeAllocation,
  primaryGoal: 'workMore',
  isAnonymous: true,
}

export function getUserByEmail<T extends (keyof User)[]>(
  email: string,
  attributes: T,
): Promise<Pick<User, T[number]> | null> {
  const recursiveProcess = async (
    lastEvaluatedKey?: DocumentClient.Key,
  ): Promise<Pick<User, T[number]> | null> => {
    const { Items, LastEvaluatedKey } = await documentClient
      .scan({
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
      .promise()

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

export async function getUserById<T extends (keyof User)[]>(
  id: string,
  attributes?: T,
): Promise<Pick<User, T[number]>> {
  const { Item } = await documentClient
    .get(mergeParams(getUserItemParams(id), projectionExpression(attributes)))
    .promise()

  if (!Item) {
    throw new Error(`User with id=${id} not found`)
  }

  return Item as Pick<User, T[number]>
}

export const putUser = (user: Partial<User>) =>
  documentClient
    .put({
      TableName: tableName.users,
      Item: { ...defaultUserProperties, ...user, updatedAt: Date.now() },
    })
    .promise()

export const deleteUser = (id: string) =>
  documentClient
    .delete({
      TableName: tableName.users,
      Key: {
        id,
      },
    })
    .promise()

export const updateUser = (id: string, params: Partial<User>) => {
  return documentClient
    .update({
      ...getUserItemParams(id),
      ...getUpdateParams({
        ...params,
        updatedAt: Date.now(),
      }),
    })
    .promise()
}

export const removeUserField = (id: string, field: keyof User) => {
  return documentClient
    .update({
      ...getUserItemParams(id),
      ...getUpdateParams({
        updatedAt: Date.now(),
      }),
      AttributeUpdates: {
        [field]: {
          Action: 'DELETE',
        },
      },
    })
    .promise()
}

export const getNumberOfUsers = async () => {
  const dynamo = new DynamoDB()
  const { Table } = await dynamo
    .describeTable({
      TableName: tableName.users,
    })
    .promise()

  if (!Table) {
    throw new Error(`Table ${tableName.users} not found`)
  }

  return Table.ItemCount
}
