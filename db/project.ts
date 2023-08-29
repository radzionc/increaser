import { Project } from '@increaser/entities/Project'
import { getUserById, getUserItemParams, updateUser } from './user'
import { UpdateCommand } from '@aws-sdk/lib-dynamodb'
import { dbDocClient } from './dbClient'
import { shouldBeDefined } from '@increaser/utils/shouldBeDefined'

export const deleteProject = async (userId: string, projectId: string) => {
  const user = await getUserById(userId, ['projects'])
  if (!user) {
    throw new Error(`User with id ${userId} does not exist`)
  }

  const projects = user.projects.filter(({ id }) => id !== projectId)

  await updateUser(userId, { projects })
}

export const putProject = async (userId: string, project: Project) => {
  const command = new UpdateCommand({
    ...getUserItemParams(userId),
    UpdateExpression: `set #listName = list_append(#listName, :mergeList)`,
    ExpressionAttributeValues: {
      ':mergeList': [project],
    },
    ExpressionAttributeNames: {
      '#listName': 'projects',
    },
  })

  return dbDocClient.send(command)
}

export const updateProject = async (
  userId: string,
  projectId: string,
  fields: Partial<Omit<Project, 'id'>>,
) => {
  const user = await getUserById(userId, ['projects'])
  if (!user) {
    throw new Error(`User with id ${userId} does not exist`)
  }

  const projects = user.projects.map((project) => {
    if (project.id === projectId) {
      return {
        ...project,
        ...fields,
      }
    }

    return project
  })

  await updateUser(userId, { projects })

  return shouldBeDefined(projects.find(({ id }) => id === projectId))
}
