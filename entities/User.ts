import { CountryCode } from '@increaser/utils/countries'
import { FocusSound, defaultFocusSounds } from './FocusSound'
import { Habit } from './Habit'
import { LifeTimeDeal } from './LifeTimeDeal'
import { Project } from './Project'
import { Subscription } from './Subscription'
import {
  WeekTimeAllocation,
  defaultWeekTimeAllocation,
} from './WeekTimeAllocation'

export interface Set {
  start: number
  end: number
  projectId: string
}

interface AppSumo {
  code: string
}

const minInHour = 60
export const defaultGoalToStartWorkAt = 9 * minInHour
export const defaultGoalToFinishWorkBy = 18 * minInHour
export const defaultGoalToGoToBedAt = 22 * minInHour

interface PaddleSubscription {
  cancellation_effective_date?: string
  next_bill_date?: string
  cancel_url: string
  checkout_id: string
  // from https://developer.paddle.com/reference/ZG9jOjI1MzU0MDI2-subscription-status-reference
  status: 'active' | 'past_due' | 'deleted'
  subscription_id: string
  subscription_plan_id: string
  update_url: string
}

export interface Task {
  startedAt: number
  id: string
  name: string
  isCompleted: boolean
}

export const primaryGoals = ['workMore', 'workLess', 'awareness'] as const

export type PrimaryGoal = (typeof primaryGoals)[number]

export type User = {
  primaryGoal: PrimaryGoal
  id: string
  email: string
  country?: CountryCode
  name?: string
  sets: Set[]
  registrationDate: number
  projects: Project[]
  habits: Record<string, Habit>
  tasks: Task[]
  freeTrialEnd: number

  weekTimeAllocation: WeekTimeAllocation
  goalToStartWorkAt: number
  goalToFinishWorkBy: number
  goalToGoToBedAt: number

  isAnonymous: boolean

  appSumo?: AppSumo

  paddle?: PaddleSubscription

  ignoreEmails?: boolean
  timeZone: number

  lastSyncedMonthEndedAt?: number
  lastSyncedWeekEndedAt?: number

  focusSounds: FocusSound[]

  updatedAt: number

  sumbittedHabitsAt?: number

  subscription?: Subscription
  lifeTimeDeal?: LifeTimeDeal
}

export const userDefaultFields: Pick<
  User,
  | 'focusSounds'
  | 'sets'
  | 'tasks'
  | 'projects'
  | 'habits'
  | 'weekTimeAllocation'
  | 'primaryGoal'
  | 'goalToStartWorkAt'
  | 'goalToFinishWorkBy'
  | 'goalToGoToBedAt'
  | 'isAnonymous'
> = {
  focusSounds: defaultFocusSounds,
  sets: [],
  tasks: [],
  projects: [],
  habits: {},
  weekTimeAllocation: defaultWeekTimeAllocation,
  primaryGoal: 'workMore',
  isAnonymous: true,
  goalToStartWorkAt: defaultGoalToStartWorkAt,
  goalToFinishWorkBy: defaultGoalToFinishWorkBy,
  goalToGoToBedAt: defaultGoalToGoToBedAt,
}
