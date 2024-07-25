import { GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb'
import { getUserItemParams } from './user'
import { dbDocClient } from '@lib/dynamodb/client'
import {
  UserEntity,
  userEntityRecordName,
  UserEntityType,
} from '@increaser/entities/User'
import { EntityWithId } from '@lib/utils/entities/EntityWithId'

type PutUserEntityInput<T extends UserEntity> = {
  userId: string
  entity: T
  value: UserEntityType[T]
}

export const putUserEntity = async <T extends UserEntity>({
  userId,
  entity,
  value,
}: PutUserEntityInput<T>) => {
  const { id } = value as EntityWithId
  const command = new UpdateCommand({
    ...getUserItemParams(userId),
    UpdateExpression: `set #record.#id = :value`,
    ExpressionAttributeValues: {
      ':value': value,
    },
    ExpressionAttributeNames: {
      '#id': id,
      '#record': userEntityRecordName[entity],
    },
  })

  return dbDocClient.send(command)
}

type GetUserEntityInput<T extends UserEntity> = {
  userId: string
  entityId: string
  entity: T
}

export const getUserEntity = async <T extends UserEntity>({
  userId,
  entity,
  entityId,
}: GetUserEntityInput<T>) => {
  const recordName = userEntityRecordName[entity]
  const command = new GetCommand({
    ...getUserItemParams(userId),
    ProjectionExpression: '#record.#id',
    ExpressionAttributeNames: {
      '#id': entityId,
      '#record': recordName,
    },
  })
  const { Item } = await dbDocClient.send(command)

  if (!Item) {
    throw new Error(`No user with id=${userId}`)
  }

  return Item[recordName][entityId] as UserEntityType[T]
}

type UpdateUserEntityInput<T extends UserEntity> = {
  userId: string
  entityId: string
  entity: T
  fields: Partial<Omit<UserEntityType[T], 'id'>>
}

export const updateUserEntity = async <T extends UserEntity>({
  userId,
  entity,
  entityId,
  fields,
}: UpdateUserEntityInput<T>) => {
  const value = await getUserEntity({
    userId,
    entityId,
    entity,
  })

  const newValue: UserEntityType[T] = {
    ...value,
    ...fields,
  }

  await putUserEntity({
    userId,
    entity,
    value: newValue,
  })

  return newValue
}

type DeleteUserEntityInput<T extends UserEntity> = {
  entity: T
  userId: string
  entityId: string
}

export const deleteUserEntity = async <T extends UserEntity>({
  userId,
  entity,
  entityId,
}: DeleteUserEntityInput<T>) => {
  const comand = new UpdateCommand({
    ...getUserItemParams(userId),
    UpdateExpression: 'remove #record.#id',
    ExpressionAttributeNames: {
      '#id': entityId,
      '#record': userEntityRecordName[entity],
    },
  })

  return dbDocClient.send(comand)
}
