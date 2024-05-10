import { Task } from '@increaser/entities/Task'
import { getRecord } from '@lib/utils/record/getRecord'
import { endOfDay } from 'date-fns'
import { DemoProject } from './projects'

type TaskDescription = {
  name: string
  projectId: DemoProject
}

const tasks: TaskDescription[] = [
  {
    name: 'Prepare for the sprint planning',
    projectId: DemoProject.Job,
  },
  {
    name: 'Record a new video',
    projectId: DemoProject.Content,
  },
  {
    name: 'Pay taxes',
    projectId: DemoProject.Business,
  },
]

export const getDemoTasks = (): Record<string, Task> => {
  const startedAt = Date.now()

  return getRecord(
    tasks.map(({ projectId, name }, order) => ({
      id: name,
      name,
      projectId,
      startedAt,
      isCompleted: false,
      deadlineAt: endOfDay(startedAt).getTime(),
      order,
    })),
    (task) => task.id,
  )
}
