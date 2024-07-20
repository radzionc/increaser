import { GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb'
import { getUserItemParams } from './user'
import { dbDocClient } from '@lib/dynamodb/client'
import { Note } from '@increaser/entities/Note'

export const putNote = async (userId: string, value: Note) => {
  const command = new UpdateCommand({
    ...getUserItemParams(userId),
    UpdateExpression: `set notes.#id = :value`,
    ExpressionAttributeValues: {
      ':value': value,
    },
    ExpressionAttributeNames: {
      '#id': value.id,
    },
  })

  return dbDocClient.send(command)
}

export const getNote = async (userId: string, id: string) => {
  const command = new GetCommand({
    ...getUserItemParams(userId),
    ProjectionExpression: 'notes.#id',
    ExpressionAttributeNames: {
      '#id': id,
    },
  })
  const { Item } = await dbDocClient.send(command)

  if (!Item) {
    throw new Error(`No user with id=${userId}`)
  }

  return Item.notes[id] as Note
}

export const updateNote = async (
  userId: string,
  id: string,
  fields: Partial<Omit<Note, 'id'>>,
) => {
  const value = await getNote(userId, id)

  const newValue = {
    ...value,
    ...fields,
  }

  await putNote(userId, newValue)

  return newValue
}

export const deleteNote = async (userId: string, id: string) => {
  const comand = new UpdateCommand({
    ...getUserItemParams(userId),
    UpdateExpression: 'REMOVE notes.#id',
    ExpressionAttributeNames: {
      '#id': id,
    },
  })
  return dbDocClient.send(comand)
}
