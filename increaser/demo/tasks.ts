import { Task, TaskChecklistItem, TaskStatus } from '@increaser/entities/Task'
import { toRecord } from '@lib/utils/record/toRecord'
import { endOfDay } from 'date-fns'
import { DemoProject } from './projects'
import { getId } from '@increaser/entities-utils/shared/getId'
import { convertDuration } from '@lib/utils/time/convertDuration'

type TaskDescription = {
  name: string
  projectId: DemoProject
  isCompleted: boolean
  minutes?: number
  checklist?: TaskChecklistItem[]
  status: TaskStatus
}

const tasks: TaskDescription[] = [
  {
    name: 'Prepare for the sprint planning',
    projectId: DemoProject.Job,
    isCompleted: true,
    minutes: 80,
    status: 'inProgress',
  },
  {
    name: 'Review code for the new feature',
    projectId: DemoProject.Job,
    isCompleted: true,
    minutes: 26,
    status: 'inProgress',
  },
  {
    name: 'Launch the new marketing campaign',
    projectId: DemoProject.Business,
    isCompleted: true,
    minutes: 48,
    status: 'todo',
  },
  {
    name: 'Edit and upload the latest YouTube video',
    projectId: DemoProject.Content,
    isCompleted: false,
    minutes: 35,
    status: 'todo',
  },
  {
    name: 'Plan the next content series',
    projectId: DemoProject.Content,
    isCompleted: false,
    status: 'todo',
  },
  {
    name: 'Set up the new development environment',
    projectId: DemoProject.Job,
    isCompleted: false,
    status: 'backlog',
  },
  {
    name: 'Research potential marketing strategies',
    projectId: DemoProject.Business,
    isCompleted: false,
    status: 'backlog',
  },
  {
    name: 'Create a content calendar for next month',
    projectId: DemoProject.Content,
    isCompleted: false,
    status: 'backlog',
  },
  {
    name: 'Brainstorm ideas for new business offerings',
    projectId: DemoProject.Business,
    isCompleted: false,
    status: 'backlog',
  },
  {
    name: 'Evaluate current project management tools',
    projectId: DemoProject.Planning,
    isCompleted: false,
    status: 'backlog',
  },
  {
    name: 'Draft initial budget for the upcoming project',
    projectId: DemoProject.Finances,
    isCompleted: false,
    status: 'backlog',
  },
  {
    name: 'Set up analytics for the new marketing campaign',
    projectId: DemoProject.Business,
    isCompleted: false,
    status: 'backlog',
  },
  {
    name: 'Plan the team-building event for next quarter',
    projectId: DemoProject.Job,
    isCompleted: false,
    status: 'backlog',
  },
  {
    name: 'Review and update project documentation',
    projectId: DemoProject.Planning,
    isCompleted: false,
    status: 'backlog',
  },
  {
    name: 'Outline content ideas for the next webinar',
    projectId: DemoProject.Content,
    isCompleted: false,
    status: 'backlog',
  },
  {
    name: 'Analyze financial performance for Q2',
    projectId: DemoProject.Finances,
    isCompleted: false,
    status: 'backlog',
  },
  {
    name: 'Research competitors in the industry',
    projectId: DemoProject.Business,
    isCompleted: false,
    status: 'backlog',
  },
  {
    name: 'Update the onboarding process for new hires',
    projectId: DemoProject.Job,
    isCompleted: false,
    status: 'backlog',
  },
  {
    name: 'Plan the next sprint',
    projectId: DemoProject.Planning,
    isCompleted: false,
    status: 'backlog',
  },
  // 10 done tasks with minutes
  {
    name: 'Complete the annual financial review',
    projectId: DemoProject.Finances,
    isCompleted: true,
    minutes: 120,
    status: 'done',
  },
  {
    name: 'Finalize the new project proposal',
    projectId: DemoProject.Planning,
    isCompleted: true,
    minutes: 90,
    status: 'done',
  },
  {
    name: 'Launch the updated website',
    projectId: DemoProject.Business,
    isCompleted: true,
    minutes: 60,
    status: 'done',
  },
  {
    name: 'Publish the latest blog post',
    projectId: DemoProject.Content,
    isCompleted: true,
    minutes: 45,
    status: 'done',
  },
  {
    name: 'Implement the new API endpoints',
    projectId: DemoProject.Job,
    isCompleted: true,
    minutes: 150,
    status: 'done',
  },
  {
    name: 'Record and edit the podcast episode',
    projectId: DemoProject.Content,
    isCompleted: true,
    minutes: 75,
    status: 'done',
  },
  {
    name: 'Update the client documentation',
    projectId: DemoProject.Job,
    isCompleted: true,
    minutes: 30,
    status: 'done',
  },
  {
    name: 'Submit the tax returns',
    projectId: DemoProject.Finances,
    isCompleted: true,
    minutes: 180,
    status: 'done',
  },
  {
    name: 'Organize the team meeting',
    projectId: DemoProject.Planning,
    isCompleted: true,
    minutes: 60,
    status: 'done',
  },
  {
    name: 'Create the marketing report',
    projectId: DemoProject.Business,
    isCompleted: true,
    minutes: 90,
    status: 'done',
  },
]

export const getDemoTasks = (): Record<string, Task> => {
  const startedAt = Date.now()

  return toRecord(
    tasks.map(
      (
        { projectId, name, isCompleted, minutes, checklist, status },
        order,
      ) => ({
        id: getId(),
        name,
        status,
        projectId,
        startedAt,
        spentTime: minutes ? convertDuration(minutes, 'min', 'ms') : undefined,
        completedAt: isCompleted ? Date.now() : null,
        deadlineAt: status === 'backlog' ? null : endOfDay(startedAt).getTime(),
        order,
        deadlineOrder: order,
        checklist: checklist || [],
        links: [],
        description: '',
      }),
    ),
    (task) => task.id,
  )
}
