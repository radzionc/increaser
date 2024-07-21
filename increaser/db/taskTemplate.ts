import { GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb'
import { TaskTemplate } from '@increaser/entities/TaskTemplate'
import { getUserItemParams } from './user'
import { dbDocClient } from '@lib/dynamodb/client'

export const putTaskTemplate = async (
  userId: string,
  taskTemplate: TaskTemplate,
) => {
  const command = new UpdateCommand({
    ...getUserItemParams(userId),
    UpdateExpression: `set taskFactories.#id = :taskTemplate`,
    ExpressionAttributeValues: {
      ':taskTemplate': taskTemplate,
    },
    ExpressionAttributeNames: {
      '#id': taskTemplate.id,
    },
  })

  return dbDocClient.send(command)
}

export const getTaskTemplate = async (
  userId: string,
  taskTemplateId: string,
) => {
  const command = new GetCommand({
    ...getUserItemParams(userId),
    ProjectionExpression: 'taskFactories.#id',
    ExpressionAttributeNames: {
      '#id': taskTemplateId,
    },
  })
  const { Item } = await dbDocClient.send(command)

  if (!Item) {
    throw new Error(`No user with id=${userId}`)
  }

  return Item.taskFactories[taskTemplateId] as TaskTemplate
}

export const updateTaskTemplate = async (
  userId: string,
  taskTemplateId: string,
  fields: Partial<Omit<TaskTemplate, 'id'>>,
) => {
  const taskTemplate = await getTaskTemplate(userId, taskTemplateId)

  const newTaskTemplate = {
    ...taskTemplate,
    ...fields,
  }

  await putTaskTemplate(userId, newTaskTemplate)

  return newTaskTemplate
}

export const deleteTaskTemplate = async (
  userId: string,
  taskTemplateId: string,
) => {
  const comand = new UpdateCommand({
    ...getUserItemParams(userId),
    UpdateExpression: 'REMOVE taskFactories.#id',
    ExpressionAttributeNames: {
      '#id': taskTemplateId,
    },
  })
  return dbDocClient.send(comand)
}
