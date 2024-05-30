import { GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb'
import { getUserItemParams } from './user'
import { dbDocClient } from '@lib/dynamodb/client'
import { VisionAttribute } from '@increaser/entities/Vision'

export const putVisionAttribute = async (
  userId: string,
  value: VisionAttribute,
) => {
  const command = new UpdateCommand({
    ...getUserItemParams(userId),
    UpdateExpression: `set vision.#id = :value`,
    ExpressionAttributeValues: {
      ':value': value,
    },
    ExpressionAttributeNames: {
      '#id': value.id,
    },
  })

  return dbDocClient.send(command)
}

export const getVisionAttribute = async (userId: string, id: string) => {
  const command = new GetCommand({
    ...getUserItemParams(userId),
    ProjectionExpression: 'vision.#id',
    ExpressionAttributeNames: {
      '#id': id,
    },
  })
  const { Item } = await dbDocClient.send(command)

  if (!Item) {
    throw new Error(`No user with id=${userId}`)
  }

  return Item.vision[id] as VisionAttribute
}

export const updateVisionAttribute = async (
  userId: string,
  id: string,
  fields: Partial<Omit<VisionAttribute, 'id'>>,
) => {
  const value = await getVisionAttribute(userId, id)

  const newValue = {
    ...value,
    ...fields,
  }

  await putVisionAttribute(userId, newValue)

  return newValue
}

export const deleteVisionAttribute = async (userId: string, id: string) => {
  const comand = new UpdateCommand({
    ...getUserItemParams(userId),
    UpdateExpression: 'REMOVE vision.#id',
    ExpressionAttributeNames: {
      '#id': id,
    },
  })
  return dbDocClient.send(comand)
}
