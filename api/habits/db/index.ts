import { getUserItemParams } from '../../users/db'
import { Habit } from '../Habit'
import { documentClient } from '../../shared/db'

export const putHabit = async (userId: string, habit: Habit) => {
  await documentClient
    .update({
      ...getUserItemParams(userId),
      UpdateExpression: `set habits.#id = :habit`,
      ExpressionAttributeValues: {
        ':habit': habit,
      },
      ExpressionAttributeNames: {
        '#id': habit.id,
      },
    })
    .promise()
}

export const getHabit = async (userId: string, habitId: string) => {
  const { Item } = await documentClient
    .get({
      ...getUserItemParams(userId),
      ProjectionExpression: 'habits.#id',
      ExpressionAttributeNames: {
        '#id': habitId,
      },
    })
    .promise()

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

  let newHabit = {
    ...habit,
    ...fields,
  }
  await putHabit(userId, newHabit)

  return newHabit
}

export const deleteHabit = async (userId: string, habitId: string) => {
  return documentClient
    .update({
      ...getUserItemParams(userId),
      UpdateExpression: 'REMOVE habits.#id',
      ExpressionAttributeNames: {
        '#id': habitId,
      },
    })
    .promise()
}
