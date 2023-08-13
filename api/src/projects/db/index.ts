import { getUserItemParams } from '../../users/db'
import { Project } from '../Project'
import { documentClient } from '../../shared/db'
import * as usersDb from '../../users/db'

export const putProject = async (userId: string, project: Project) => {
  await documentClient
    .update({
      ...getUserItemParams(userId),
      UpdateExpression: `set #listName = list_append(#listName, :mergeList)`,
      ExpressionAttributeValues: {
        ':mergeList': [project],
      },
      ExpressionAttributeNames: {
        '#listName': 'projects',
      },
    })
    .promise()
}

export const updateProject = async (
  userId: string,
  projectId: string,
  fields: Partial<Omit<Project, 'id'>>,
) => {
  const user = await usersDb.getUserById(userId, ['projects'])
  if (!user) {
    throw new Error(`User with id ${userId} does not exist`)
  }

  let newProject = null
  const projects = user.projects.map((project) => {
    if (project.id === projectId) {
      newProject = {
        ...project,
        ...fields,
      }
      return newProject
    }

    return project
  })

  await usersDb.updateUser(userId, { projects })

  return newProject
}

export const deleteProject = async (userId: string, projectId: string) => {
  const user = await usersDb.getUserById(userId, ['projects'])
  if (!user) {
    throw new Error(`User with id ${userId} does not exist`)
  }

  const projects = user.projects.filter(({ id }) => id !== projectId)

  await usersDb.updateUser(userId, { projects })
}
