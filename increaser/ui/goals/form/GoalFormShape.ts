import { GoalStatus } from '@increaser/entities/Goal'

export type GoalFormShape = {
  name: string
  status: GoalStatus
  emoji: string
  deadlineAt: string | number | null
  plan: string
}
