import { Project } from '@increaser/entities/Project'
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

const toProject = ({
  id,
  color,
  emoji,
  allocatedMinutesPerWeek,
  goal,
}: ProjectDescription): Project => {
  return {
    id,
    name: id,
    color,
    emoji,
    allocatedMinutesPerWeek,
    status: 'active',
    workingDays: 'everyday',
    goal,
  }
}

export const getDemoProjects = () => projectsDescription.map(toProject)
