import { Project, otherProject } from '@increaser/entities/Project'
import { recordFromItems } from '@lib/utils/record/recordFromItems'
import { convertDuration } from '@lib/utils/time/convertDuration'

export enum DemoProject {
  Job = 'Remote job',
  Business = 'Business',
  Content = 'Content creation',
  Planning = 'Planning',
  Finances = 'Finances',
}

type ProjectDescription = Pick<
  Project,
  'id' | 'color' | 'emoji' | 'goal' | 'allocatedMinutesPerWeek' | 'workingDays'
>

const projectsDescription: ProjectDescription[] = [
  {
    id: DemoProject.Job,
    color: 0,
    emoji: '👨‍💻',
    allocatedMinutesPerWeek: convertDuration(16, 'h', 'min'),
    goal: 'doLess',
    workingDays: 'workdays',
  },
  {
    id: DemoProject.Business,
    color: 7,
    emoji: '🤑',
    allocatedMinutesPerWeek: convertDuration(7, 'h', 'min'),
    goal: 'doMore',
    workingDays: 'everyday',
  },
  {
    id: DemoProject.Content,
    color: 10,
    emoji: '🎨',
    allocatedMinutesPerWeek: convertDuration(7, 'h', 'min'),
    goal: 'doMore',
    workingDays: 'everyday',
  },
  {
    id: DemoProject.Planning,
    color: 5,
    emoji: '📅',
    allocatedMinutesPerWeek: convertDuration(3, 'h', 'min'),
    workingDays: 'everyday',
  },
  {
    id: DemoProject.Finances,
    color: 0,
    emoji: '💰',
    allocatedMinutesPerWeek: 0,
    workingDays: 'everyday',
  },
]

export const getDemoProjects = () => {
  const projects = projectsDescription.map(
    (
      { id, color, emoji, allocatedMinutesPerWeek, goal, workingDays },
      index,
    ) => {
      const project: Project = {
        id,
        name: id,
        color,
        emoji,
        allocatedMinutesPerWeek,
        status: 'active',
        workingDays,
        goal,
        order: index,
      }
      return project
    },
  )
  return recordFromItems([...projects, otherProject], (project) => project.id)
}
