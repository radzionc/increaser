import { Task, TaskChecklistItem } from '@increaser/entities/Task'
import { toRecord } from '@lib/utils/record/toRecord'
import { endOfDay } from 'date-fns'
import { DemoProject } from './projects'
import { getId } from '@increaser/entities-utils/shared/getId'
import { convertDuration } from '@lib/utils/time/convertDuration'

type TaskDescription = {
  name: string
  projectId: DemoProject
  isCompleted: boolean
  isOverdue?: boolean
  minutes?: number
  checklist?: TaskChecklistItem[]
}

// const tasks: TaskDescription[] = [
//   {
//     name: 'Prepare for the sprint planning',
//     projectId: DemoProject.Job,
//     isCompleted: true,
//     minutes: 80,
//   },
//   {
//     name: 'Review code for the new feature',
//     projectId: DemoProject.Job,
//     isCompleted: false,
//     isOverdue: true,
//     minutes: 26,
//   },
//   {
//     name: 'Submit expenses',
//     projectId: DemoProject.Job,
//     isCompleted: false,
//     isOverdue: true,
//   },
//   {
//     name: 'Launch the new marketing campaign',
//     projectId: DemoProject.Business,
//     isCompleted: true,
//     minutes: 48,
//   },
//   {
//     name: 'Edit and upload the latest YouTube video',
//     projectId: DemoProject.Content,
//     isCompleted: false,
//     minutes: 35,
//   },
//   {
//     name: 'Plan the next content series',
//     projectId: DemoProject.Content,
//     isCompleted: false,
//   },
//   {
//     name: 'Pay taxes',
//     projectId: DemoProject.Planning,
//     isCompleted: false,
//   },
// ]

const tasks: TaskDescription[] = [
  {
    name: 'Prepare for the sprint planning',
    projectId: DemoProject.Job,
    isCompleted: true,
    minutes: 80,
  },
  {
    name: 'Review code for the new feature',
    projectId: DemoProject.Job,
    isCompleted: true,
    minutes: 26,
  },
  {
    name: 'Launch the new marketing campaign',
    projectId: DemoProject.Business,
    isCompleted: true,
    minutes: 48,
  },
  {
    name: 'Edit and upload the latest YouTube video',
    projectId: DemoProject.Content,
    isCompleted: false,
    minutes: 35,
  },
  {
    name: 'Plan the next content series',
    projectId: DemoProject.Content,
    isCompleted: false,
  },
]

export const getDemoTasks = (): Record<string, Task> => {
  const startedAt = Date.now()

  return toRecord(
    tasks.map(
      (
        { projectId, name, isCompleted, minutes, isOverdue, checklist },
        order,
      ) => ({
        id: getId(),
        name,
        projectId,
        startedAt,
        status: 'todo',
        spentTime: minutes ? convertDuration(minutes, 'min', 'ms') : undefined,
        completedAt: isCompleted ? Date.now() : null,
        deadlineAt: isOverdue
          ? startedAt - convertDuration(1, 'd', 'ms')
          : endOfDay(startedAt).getTime(),
        order,
        checklist: checklist || [],
        links: [],
        description: '',
      }),
    ),
    (task) => task.id,
  )
}
