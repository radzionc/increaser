import { GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb'
import { getUserItemParams } from './user'
import { dbDocClient } from '@lib/dynamodb/client'
import { Goal } from '@increaser/entities/Goal'

export const putGoal = async (userId: string, value: Goal) => {
  const command = new UpdateCommand({
    ...getUserItemParams(userId),
    UpdateExpression: `set goals.#id = :value`,
    ExpressionAttributeValues: {
      ':value': value,
    },
    ExpressionAttributeNames: {
      '#id': value.id,
    },
  })

  return dbDocClient.send(command)
}

export const getGoal = async (userId: string, id: string) => {
  const command = new GetCommand({
    ...getUserItemParams(userId),
    ProjectionExpression: 'goals.#id',
    ExpressionAttributeNames: {
      '#id': id,
    },
  })
  const { Item } = await dbDocClient.send(command)

  if (!Item) {
    throw new Error(`No user with id=${userId}`)
  }

  return Item.goals[id] as Goal
}

export const updateGoal = async (
  userId: string,
  id: string,
  fields: Partial<Omit<Goal, 'id'>>,
) => {
  const value = await getGoal(userId, id)

  const newValue = {
    ...value,
    ...fields,
  }

  await putGoal(userId, newValue)

  return newValue
}

export const deleteGoal = async (userId: string, id: string) => {
  const comand = new UpdateCommand({
    ...getUserItemParams(userId),
    UpdateExpression: 'REMOVE goals.#id',
    ExpressionAttributeNames: {
      '#id': id,
    },
  })
  return dbDocClient.send(comand)
}
