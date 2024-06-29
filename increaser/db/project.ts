import { GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb'
import { Project } from '@increaser/entities/Project'
import { getUserItemParams } from './user'
import { dbDocClient } from '@lib/dynamodb/client'

export const putProject = async (userId: string, project: Project) => {
  const command = new UpdateCommand({
    ...getUserItemParams(userId),
    UpdateExpression: `set projects.#id = :project`,
    ExpressionAttributeValues: {
      ':project': project,
    },
    ExpressionAttributeNames: {
      '#id': project.id,
    },
  })

  return dbDocClient.send(command)
}

export const getProject = async (userId: string, projectId: string) => {
  const command = new GetCommand({
    ...getUserItemParams(userId),
    ProjectionExpression: 'projects.#id',
    ExpressionAttributeNames: {
      '#id': projectId,
    },
  })
  const { Item } = await dbDocClient.send(command)

  if (!Item) {
    throw new Error(`No user with id=${userId}`)
  }

  return Item.projects[projectId] as Project
}

export const updateProject = async (
  userId: string,
  projectId: string,
  fields: Partial<Omit<Project, 'id'>>,
) => {
  const project = await getProject(userId, projectId)

  const newProject = {
    ...project,
    ...fields,
  }

  await putProject(userId, newProject)

  return newProject
}

export const deleteProject = async (userId: string, projectId: string) => {
  const comand = new UpdateCommand({
    ...getUserItemParams(userId),
    UpdateExpression: 'REMOVE projects.#id',
    ExpressionAttributeNames: {
      '#id': projectId,
    },
  })
  return dbDocClient.send(comand)
}
