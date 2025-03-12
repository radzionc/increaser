import { pick } from '@lib/utils/record/pick'
import { recordMap } from '@lib/utils/record/recordMap'
import { getUser, updateUser } from '@product/db/user'
import { otherProject } from '@product/entities/Project'
import { TimeRecord } from '@product/entities/TrackedTime'

export const syncProjectsDependantFields = async (userId: string) => {
  const oldUser = await getUser(userId, [
    'projects',
    'sets',
    'tasks',
    'ideas',
    'weeks',
    'months',
    'years',
    'taskFactories',
    'taskTemplates',
  ])

  const projectIds = new Set(Object.keys(oldUser.projects))
  const sets = oldUser.sets.map((set) =>
    projectIds.has(set.projectId)
      ? set
      : { ...set, projectId: otherProject.id },
  )
  const tasks = recordMap(oldUser.tasks, (task) =>
    projectIds.has(task.projectId)
      ? task
      : { ...task, projectId: otherProject.id },
  )

  const ideas = recordMap(oldUser.ideas, (idea) =>
    projectIds.has(idea.projectId)
      ? idea
      : { ...idea, projectId: otherProject.id },
  )

  const taskFactories = recordMap(oldUser.taskFactories, (taskFactory) =>
    projectIds.has(taskFactory.projectId)
      ? taskFactory
      : {
          ...taskFactory,
          task: { ...taskFactory, projectId: otherProject.id },
        },
  )

  const taskTemplates = recordMap(oldUser.taskTemplates, (taskTemplate) =>
    projectIds.has(taskTemplate.projectId)
      ? taskTemplate
      : {
          ...taskTemplate,
          projectId: otherProject.id,
        },
  )

  const { weeks, months, years } = recordMap(
    pick(oldUser, ['weeks', 'months', 'years']),
    (trackedTime) =>
      recordMap(trackedTime, (timeRecord) => {
        const result: TimeRecord = {}
        Object.entries(timeRecord).forEach(([projectId, seconds]) => {
          const key = projectIds.has(projectId) ? projectId : otherProject.id
          result[key] = (result[key] || 0) + seconds
        })

        return result
      }),
  )

  await updateUser(userId, {
    sets,
    tasks,
    ideas,
    weeks,
    months,
    years,
    taskFactories,
    taskTemplates,
  })
}
