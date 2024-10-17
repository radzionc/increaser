import { ProjectGoal, ProjectWorkingDays } from '@increaser/entities/Project'

export type ProjectFormShape = {
  name: string
  color: number
  emoji: string
  budget: number | null
  workingDays: ProjectWorkingDays
  goal: ProjectGoal | null
}
