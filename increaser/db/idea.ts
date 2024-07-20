import { GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb'
import { getUserItemParams } from './user'
import { dbDocClient } from '@lib/dynamodb/client'
import { Idea } from '@increaser/entities/Idea'

export const putIdea = async (userId: string, value: Idea) => {
  const command = new UpdateCommand({
    ...getUserItemParams(userId),
    UpdateExpression: `set ideas.#id = :value`,
    ExpressionAttributeValues: {
      ':value': value,
    },
    ExpressionAttributeNames: {
      '#id': value.id,
    },
  })

  return dbDocClient.send(command)
}

export const getIdea = async (userId: string, id: string) => {
  const command = new GetCommand({
    ...getUserItemParams(userId),
    ProjectionExpression: 'ideas.#id',
    ExpressionAttributeNames: {
      '#id': id,
    },
  })
  const { Item } = await dbDocClient.send(command)

  if (!Item) {
    throw new Error(`No user with id=${userId}`)
  }

  return Item.ideas[id] as Idea
}

export const updateIdea = async (
  userId: string,
  id: string,
  fields: Partial<Omit<Idea, 'id'>>,
) => {
  const value = await getIdea(userId, id)

  const newValue = {
    ...value,
    ...fields,
  }

  await putIdea(userId, newValue)

  return newValue
}

export const deleteIdea = async (userId: string, id: string) => {
  const comand = new UpdateCommand({
    ...getUserItemParams(userId),
    UpdateExpression: 'REMOVE ideas.#id',
    ExpressionAttributeNames: {
      '#id': id,
    },
  })
  return dbDocClient.send(comand)
}
