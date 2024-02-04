import { GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb'
import { Task } from '@increaser/entities/Task'
import { getUserItemParams } from './user'
import { dbDocClient } from '@lib/dynamodb/client'

export const putTask = async (userId: string, task: Task) => {
  const command = new UpdateCommand({
    ...getUserItemParams(userId),
    UpdateExpression: `set tasks.#id = :task`,
    ExpressionAttributeValues: {
      ':task': task,
    },
    ExpressionAttributeNames: {
      '#id': task.id,
    },
  })

  return dbDocClient.send(command)
}

export const getTask = async (userId: string, taskId: string) => {
  const command = new GetCommand({
    ...getUserItemParams(userId),
    ProjectionExpression: 'tasks.#id',
    ExpressionAttributeNames: {
      '#id': taskId,
    },
  })
  const { Item } = await dbDocClient.send(command)

  if (!Item) {
    throw new Error(`No user with id=${userId}`)
  }

  return Item.tasks[taskId] as Task
}

export const updateTask = async (
  userId: string,
  taskId: string,
  fields: Partial<Omit<Task, 'id'>>,
) => {
  const task = await getTask(userId, taskId)

  const newTask = {
    ...task,
    ...fields,
  }

  await putTask(userId, newTask)

  return newTask
}

export const deleteTask = async (userId: string, taskId: string) => {
  const comand = new UpdateCommand({
    ...getUserItemParams(userId),
    UpdateExpression: 'REMOVE tasks.#id',
    ExpressionAttributeNames: {
      '#id': taskId,
    },
  })
  return dbDocClient.send(comand)
}
