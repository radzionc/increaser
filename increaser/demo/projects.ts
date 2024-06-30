import { Project, otherProject } from '@increaser/entities/Project'
import { getRecord } from '@lib/utils/record/getRecord'
import { convertDuration } from '@lib/utils/time/convertDuration'

export enum DemoProject {
  Job = 'Remote job',
  Business = 'Business',
  Content = 'Content creation',
  Planning = 'Planning',
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
]

export const getDemoProjects = () => {
  const projects = projectsDescription.map(
    ({ id, color, emoji, allocatedMinutesPerWeek, goal }, index) => {
      const project: Project = {
        id,
        name: id,
        color,
        emoji,
        allocatedMinutesPerWeek,
        status: 'active',
        workingDays: 'everyday',
        goal,
        order: projectsDescription.length - index,
      }
      return project
    },
  )
  return getRecord([otherProject, ...projects], (project) => project.id)
}
