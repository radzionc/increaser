import { GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb'
import { Habit } from '@increaser/entities/Habit'
import { getUserItemParams } from './user'
import { dbDocClient } from './dbClient'

export const putHabit = async (userId: string, habit: Habit) => {
  const command = new UpdateCommand({
    ...getUserItemParams(userId),
    UpdateExpression: `set habits.#id = :habit`,
    ExpressionAttributeValues: {
      ':habit': habit,
    },
    ExpressionAttributeNames: {
      '#id': habit.id,
    },
  })

  return dbDocClient.send(command)
}

export const getHabit = async (userId: string, habitId: string) => {
  const command = new GetCommand({
    ...getUserItemParams(userId),
    ProjectionExpression: 'habits.#id',
    ExpressionAttributeNames: {
      '#id': habitId,
    },
  })
  const { Item } = await dbDocClient.send(command)

  if (!Item) {
    throw new Error(`No user with id=${userId}`)
  }

  return Item.habits[habitId] as Habit
}

export const updateHabit = async (
  userId: string,
  habitId: string,
  fields: Partial<Omit<Habit, 'id'>>,
) => {
  const habit = await getHabit(userId, habitId)

  const newHabit = {
    ...habit,
    ...fields,
  }

  await putHabit(userId, newHabit)

  return newHabit
}

export const deleteHabit = async (userId: string, habitId: string) => {
  const comand = new UpdateCommand({
    ...getUserItemParams(userId),
    UpdateExpression: 'REMOVE habits.#id',
    ExpressionAttributeNames: {
      '#id': habitId,
    },
  })
  return dbDocClient.send(comand)
}
