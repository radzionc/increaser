import { getUser, updateUser } from '@increaser/db/user'
import { otherProject } from '@increaser/entities/Project'
import { TimeRecord } from '@increaser/entities/TrackedTime'
import { pick } from '@lib/utils/record/pick'
import { recordMap } from '@lib/utils/record/recordMap'

export const syncProjectsDependantFields = async (userId: string) => {
  const oldUser = await getUser(userId, [
    'projects',
    'sets',
    'tasks',
    'weeks',
    'months',
    'taskFactories',
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

  const taskFactories = recordMap(oldUser.taskFactories, (taskFactory) =>
    projectIds.has(taskFactory.task.projectId)
      ? taskFactory
      : {
          ...taskFactory,
          task: { ...taskFactory.task, projectId: otherProject.id },
        },
  )

  const { weeks, months } = recordMap(
    pick(oldUser, ['weeks', 'months']),
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
    weeks,
    months,
    taskFactories,
  })
}
