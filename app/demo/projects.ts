import { range, sum } from 'lodash'
import { Project, ProjectResponse, ProjectStatus } from '../projects/Project'
import { randomInRange } from '../shared/utils/randomInRange'
import { toWeek } from '../shared/utils/toWeek'
import {
  MS_IN_WEEK,
  S_IN_HOUR,
  MIN_IN_HOUR,
} from '@increaser/ui/shared/utils/time'

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
    color: 3,
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
  const hours = randomInRange(target - shift, target + shift)

  return range(weeksToDisplay).map((index) => {
    return {
      ...toWeek(now - index * MS_IN_WEEK),
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
}: ProjectDescription): ProjectResponse => {
  const weeks = generateWeeks(target)
  return {
    id,
    name: id,
    color,
    emoji,
    allocatedMinutesPerWeek: hasGoal ? target * MIN_IN_HOUR : 0,
    status: ProjectStatus.Active,
    weeks,
    total: sum(weeks.map((week) => week.seconds)),
    months: [],
  }
}

export const getDemoProjects = () => projectsDescription.map(toProject)
