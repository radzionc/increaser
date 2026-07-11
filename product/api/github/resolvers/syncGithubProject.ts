import { ApiError } from '@product/api-interface/ApiError'
import { getUser, updateUser } from '@product/db/user'
import * as userEntitiesDb from '@product/db/userEntity'
import { otherProjectId } from '@product/entities/Project'
import { Task, TaskStatus } from '@product/entities/Task'

import { assertUserId } from '../../auth/assertUserId'
import { ApiResolver } from '../../resolvers/ApiResolver'
import { githubGraphql } from '../client'

interface ProjectItemsResponse {
  user?: { projectV2: ProjectV2 | null } | null
  organization?: { projectV2: ProjectV2 | null } | null
}

interface ProjectV2 {
  id: string
  items: {
    nodes: {
      id: string
      fieldValues: {
        nodes: {
          name?: string
          field?: { name?: string }
        }[]
      }
      content: {
        __typename: string
        id: string
        number: number
        title: string
        body: string
        state: 'OPEN' | 'CLOSED'
        url: string
        repository: { nameWithOwner: string }
      } | null
    }[]
  }
}

const itemsQuery = `
  query($owner: String!, $number: Int!) {
    user(login: $owner) {
      projectV2(number: $number) {
        id
        items(first: 100) {
          nodes {
            id
            fieldValues(first: 20) {
              nodes {
                ... on ProjectV2ItemFieldSingleSelectValue {
                  name
                  field {
                    ... on ProjectV2SingleSelectField { name }
                  }
                }
              }
            }
            content {
              __typename
              ... on Issue {
                id
                number
                title
                body
                state
                url
                repository { nameWithOwner }
              }
            }
          }
        }
      }
    }
    organization(login: $owner) {
      projectV2(number: $number) {
        id
        items(first: 100) {
          nodes {
            id
            fieldValues(first: 20) {
              nodes {
                ... on ProjectV2ItemFieldSingleSelectValue {
                  name
                  field {
                    ... on ProjectV2SingleSelectField { name }
                  }
                }
              }
            }
            content {
              __typename
              ... on Issue {
                id
                number
                title
                body
                state
                url
                repository { nameWithOwner }
              }
            }
          }
        }
      }
    }
  }
`

const closeIssueMutation = `
  mutation($issueId: ID!) {
    closeIssue(input: { issueId: $issueId }) { issue { id } }
  }
`

const reopenIssueMutation = `
  mutation($issueId: ID!) {
    reopenIssue(input: { issueId: $issueId }) { issue { id } }
  }
`

const statusFieldNameToTaskStatus: Record<string, TaskStatus> = {
  backlog: 'backlog',
  todo: 'todo',
  'in progress': 'inProgress',
  done: 'done',
}

const getStatusFromFieldValues = (
  fieldValues: ProjectV2['items']['nodes'][number]['fieldValues'],
): TaskStatus | undefined => {
  const statusField = fieldValues.nodes.find(
    (value) => value.field?.name?.toLowerCase() === 'status',
  )

  if (!statusField?.name) {
    return undefined
  }

  return statusFieldNameToTaskStatus[statusField.name.toLowerCase()]
}

export const syncGithubProject: ApiResolver<'syncGithubProject'> = async ({
  context,
}) => {
  const userId = assertUserId(context)
  const user = await getUser(userId, [
    'githubToken',
    'githubProjectOwner',
    'githubProjectNumber',
    'tasks',
  ])

  const { githubToken, githubProjectOwner, githubProjectNumber, tasks } = user

  if (!githubToken || !githubProjectOwner || !githubProjectNumber) {
    throw new ApiError(
      'invalidInput',
      'Connect a GitHub token and select a project before syncing.',
    )
  }

  const data = await githubGraphql<ProjectItemsResponse>(
    githubToken,
    itemsQuery,
    { owner: githubProjectOwner, number: githubProjectNumber },
  )

  const project = data.user?.projectV2 ?? data.organization?.projectV2

  if (!project) {
    throw new ApiError(
      'invalidInput',
      `Project ${githubProjectOwner}/${githubProjectNumber} was not found or the token has no access to it.`,
    )
  }

  const tasksByGithubIssueId = new Map<string, [string, Task]>(
    Object.entries(tasks)
      .filter(([, task]) => task.githubIssueId)
      .map(([id, task]) => [task.githubIssueId as string, [id, task]]),
  )

  let imported = 0
  let updated = 0
  let pushed = 0

  for (const item of project.items.nodes) {
    const { content } = item
    if (!content || content.__typename !== 'Issue') {
      continue
    }

    const githubIsDone = content.state === 'CLOSED'
    const statusFromField = getStatusFromFieldValues(item.fieldValues)
    const existing = tasksByGithubIssueId.get(content.id)

    if (!existing) {
      const finalStatus: TaskStatus = githubIsDone
        ? 'done'
        : (statusFromField ?? 'todo')

      const newTask: Task = {
        id: crypto.randomUUID(),
        name: content.title,
        description: content.body ?? '',
        status: finalStatus,
        projectId: otherProjectId,
        order: Date.now(),
        startedAt: Date.now(),
        deadlineAt: null,
        deadlineOrder: Date.now(),
        links: [{ url: content.url, name: content.repository.nameWithOwner }],
        checklist: [],
        githubIssueId: content.id,
        githubIssueNumber: content.number,
        githubItemId: item.id,
        githubRepo: content.repository.nameWithOwner,
        githubLastSyncedStatus: finalStatus,
      }

      await userEntitiesDb.putUserEntity({
        userId,
        entity: 'task',
        value: newTask,
      })
      imported += 1
      continue
    }

    const [taskId, task] = existing
    const localIsDone = task.status === 'done'
    const lastSyncedIsDone = task.githubLastSyncedStatus === 'done'

    let effectiveGithubIsDone = githubIsDone

    if (localIsDone !== lastSyncedIsDone) {
      await githubGraphql(
        githubToken,
        localIsDone ? closeIssueMutation : reopenIssueMutation,
        { issueId: content.id },
      )
      effectiveGithubIsDone = localIsDone
      pushed += 1
    }

    const finalStatus: TaskStatus = effectiveGithubIsDone
      ? 'done'
      : (statusFromField ?? (task.status === 'done' ? 'todo' : task.status))

    const hasChanges =
      task.name !== content.title ||
      task.description !== (content.body ?? '') ||
      task.status !== finalStatus

    if (hasChanges) {
      await userEntitiesDb.updateUserEntity({
        userId,
        entity: 'task',
        entityId: taskId,
        fields: {
          name: content.title,
          description: content.body ?? '',
          status: finalStatus,
          githubLastSyncedStatus: finalStatus,
        },
      })
      updated += 1
    }
  }

  await updateUser(userId, { lastGithubSyncAt: Date.now() })

  return { imported, updated, pushed }
}
