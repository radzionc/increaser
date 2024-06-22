import { GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb'
import { TaskFactory } from '@increaser/entities/TaskFactory'
import { getUserItemParams } from './user'
import { dbDocClient } from '@lib/dynamodb/client'

export const putTaskFactory = async (
  userId: string,
  taskFactory: TaskFactory,
) => {
  const command = new UpdateCommand({
    ...getUserItemParams(userId),
    UpdateExpression: `set taskFactories.#id = :taskFactory`,
    ExpressionAttributeValues: {
      ':taskFactory': taskFactory,
    },
    ExpressionAttributeNames: {
      '#id': taskFactory.id,
    },
  })

  return dbDocClient.send(command)
}

export const getTaskFactory = async (userId: string, taskFactoryId: string) => {
  const command = new GetCommand({
    ...getUserItemParams(userId),
    ProjectionExpression: 'taskFactories.#id',
    ExpressionAttributeNames: {
      '#id': taskFactoryId,
    },
  })
  const { Item } = await dbDocClient.send(command)

  if (!Item) {
    throw new Error(`No user with id=${userId}`)
  }

  return Item.taskFactories[taskFactoryId] as TaskFactory
}

export const updateTaskFactory = async (
  userId: string,
  taskFactoryId: string,
  fields: Partial<Omit<TaskFactory, 'id'>>,
) => {
  const taskFactory = await getTaskFactory(userId, taskFactoryId)

  const newTaskFactory = {
    ...taskFactory,
    ...fields,
  }

  await putTaskFactory(userId, newTaskFactory)

  return newTaskFactory
}

export const deleteTaskFactory = async (
  userId: string,
  taskFactoryId: string,
) => {
  const comand = new UpdateCommand({
    ...getUserItemParams(userId),
    UpdateExpression: 'REMOVE taskFactories.#id',
    ExpressionAttributeNames: {
      '#id': taskFactoryId,
    },
  })
  return dbDocClient.send(comand)
}
