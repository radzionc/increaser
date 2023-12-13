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
export const defaultGoalToWakeUpAt = 7 * minInHour
export const defaultGoalToStartWorkAt = 9 * minInHour
export const defaultGoalToFinishWorkBy = 18 * minInHour
export const defaultGoalToGoToBedAt = 22 * minInHour

export interface Task {
  startedAt: number
  id: string
  name: string
  isCompleted: boolean
}

export const primaryGoals = ['workMore', 'workLess', 'awareness'] as const
export type PrimaryGoal = (typeof primaryGoals)[number]

export const dayMoments = [
  'goalToWakeUpAt',
  'goalToStartWorkAt',
  'goalToFinishWorkBy',
  'goalToGoToBedAt',
] as const
export type DayMoment = (typeof dayMoments)[number]

export type DayMoments = Record<DayMoment, number>

export type User = DayMoments & {
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

  isAnonymous: boolean

  appSumo?: AppSumo

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

export const userReadonlyFields = [
  'id',
  'email',
  'registrationDate',
  'freeTrialEnd',
  'appSumo',
  'paddle',
  'lastSyncedMonthEndedAt',
  'lastSyncedWeekEndedAt',
  'updatedAt',
  'subscription',
  'lifeTimeDeal',
] as const

export type UserReadonlyFields = (typeof userReadonlyFields)[number]

export type UserEditableFields = Exclude<keyof User, UserReadonlyFields>

export const userDefaultFields: Pick<
  User,
  | 'focusSounds'
  | 'sets'
  | 'tasks'
  | 'projects'
  | 'habits'
  | 'weekTimeAllocation'
  | 'primaryGoal'
  | 'goalToWakeUpAt'
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
  goalToWakeUpAt: defaultGoalToWakeUpAt,
  goalToStartWorkAt: defaultGoalToStartWorkAt,
  goalToFinishWorkBy: defaultGoalToFinishWorkBy,
  goalToGoToBedAt: defaultGoalToGoToBedAt,
}

export const dayMomentShortName: Record<DayMoment, string> = {
  goalToWakeUpAt: 'wake up',
  goalToStartWorkAt: 'start work',
  goalToFinishWorkBy: 'finish work',
  goalToGoToBedAt: 'go to bed',
}

export const dayMomentStepInMinutes = 30
