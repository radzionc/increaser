import { CountryCode } from '@lib/countries'
import { FocusSound, defaultFocusSounds } from './FocusSound'
import { Habit } from './Habit'
import { LifeTimeDeal } from './LifeTimeDeal'
import { Project } from './Project'
import { Subscription } from './Subscription'
import {
  WeekTimeAllocation,
  defaultWeekTimeAllocation,
} from './WeekTimeAllocation'
import { DayMoments, dayMomentsDefaultValues } from './DayMoments'

export interface Set {
  start: number
  end: number
  projectId: string
}

interface AppSumo {
  code: string
}

export interface Task {
  startedAt: number
  id: string
  name: string
  isCompleted: boolean
  deadlineAt: number
}

export type User = DayMoments & {
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

  finishedOnboardingAt?: number

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
  | 'isAnonymous'
  | 'wakeUpAt'
  | 'firstMealAt'
  | 'startWorkAt'
  | 'lastMealAt'
  | 'finishWorkAt'
  | 'goToBedAt'
> = {
  focusSounds: defaultFocusSounds,
  sets: [],
  tasks: [],
  projects: [],
  habits: {},
  weekTimeAllocation: defaultWeekTimeAllocation,
  isAnonymous: true,
  ...dayMomentsDefaultValues,
}
