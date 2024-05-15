import { Project } from '@increaser/entities/Project'
import { randomInRange } from '@lib/utils/randomInRange'
import { range } from '@lib/utils/array/range'
import { toWeek } from '@lib/utils/time/Week'
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

const weeksToDisplay = 14

export const generateWeeks = (allocatedMinutesPerWeek: number) => {
  const now = Date.now()
  const shift = allocatedMinutesPerWeek * 0.1

  return range(weeksToDisplay).map((index) => {
    const value = randomInRange(
      allocatedMinutesPerWeek - shift,
      allocatedMinutesPerWeek + shift,
    )
    return {
      ...toWeek(now - convertDuration(index + 1, 'w', 'ms')),
      seconds: convertDuration(value, 'min', 's'),
    }
  })
}

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
