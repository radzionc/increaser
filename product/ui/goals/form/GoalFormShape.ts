import { GoalStatus, GoalTarget } from '@product/entities/Goal'

export type GoalFormShape = {
  name: string
  status: GoalStatus
  emoji: string
  deadlineAt: string | number | null
  plan: string
  target: GoalTarget | null
  taskFactories: string[]
  habits: string[]
  principles: string[]
  vision: string[]
}
