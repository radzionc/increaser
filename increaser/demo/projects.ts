import { Project, ProjectStatus } from '@increaser/entities/Project'
import { randomInRange } from '@lib/utils/randomInRange'
import { range } from '@lib/utils/array/range'
import { MIN_IN_HOUR, MS_IN_WEEK, S_IN_HOUR } from '@lib/utils/time'
import { toWeek } from '@lib/utils/time/Week'

export enum DemoProject {
  Job = 'Remote job',
  Business = 'Business',
  ProgrammingStudy = 'Learn code',
  Content = 'Content creation',
  Planning = 'Planning',
}

interface ProjectDescription extends Pick<Project, 'id' | 'color' | 'emoji'> {
  target: number
  hasGoal: boolean
}

const projectsDescription: ProjectDescription[] = [
  {
    id: DemoProject.Job,
    color: 0,
    emoji: '👨‍💻',
    target: 15,
    hasGoal: false,
  },
  {
    id: DemoProject.Business,
    color: 7,
    emoji: '🤑',
    target: 6,
    hasGoal: true,
  },
  {
    id: DemoProject.Content,
    color: 10,
    emoji: '📝',
    target: 4,
    hasGoal: true,
  },
  {
    id: DemoProject.ProgrammingStudy,
    color: 9,
    emoji: '🦄',
    target: 4,
    hasGoal: true,
  },
  {
    id: DemoProject.Planning,
    color: 5,
    emoji: '📅',
    target: 2,
    hasGoal: false,
  },
]

const weeksToDisplay = 4

const generateWeeks = (target: number) => {
  const now = Date.now()
  const shift = target * 0.1

  return range(weeksToDisplay).map((index) => {
    const hours = randomInRange(target - shift, target + shift)
    return {
      ...toWeek(now - (index + 1) * MS_IN_WEEK),
      seconds: hours * S_IN_HOUR,
    }
  })
}

const toProject = ({
  id,
  color,
  emoji,
  target,
  hasGoal,
}: ProjectDescription): Project => {
  const weeks = generateWeeks(target)
  return {
    id,
    name: id,
    color,
    emoji,
    allocatedMinutesPerWeek: hasGoal ? target * MIN_IN_HOUR : 0,
    status: ProjectStatus.Active,
    weeks,
    months: [],
    workingDays: 'everyday',
  }
}

export const getDemoProjects = () => projectsDescription.map(toProject)
