import { CountryCode } from '@lib/countries'
import { FocusSound, defaultFocusSounds } from './FocusSound'
import { Habit } from './Habit'
import { LifeTimeDeal } from './LifeTimeDeal'
import { Project, otherProject } from './Project'
import { Subscription } from './Subscription'
import { WorkBudget, defaultWorkBudget } from './WorkBudget'
import { DayMoments, dayMomentsDefaultValues } from './DayMoments'
import { Task } from './Task'
import { Interval } from '@lib/utils/interval/Interval'
import { TrackedTime } from './TrackedTime'
import { Vision } from './Vision'
import { Goals } from './Goal'
import { Education } from './Education'
import { TaskFactory } from './TaskFactory'
import { Ideas } from './Idea'
import { TaskTemplates } from './TaskTemplate'

export type Set = Interval & {
  projectId: string
  isEndEstimated?: boolean | null
}

interface AppSumo {
  code: string
}

export const maxWeeks = 24
export const maxMonths = 24

export type User = DayMoments &
  WorkBudget & {
    id: string
    email: string
    country?: CountryCode
    name?: string
    sets: Set[]
    registrationDate: number
    projects: Record<string, Project>
    habits: Record<string, Habit>
    tasks: Record<string, Task>
    taskFactories: Record<string, TaskFactory>
    taskTemplates: TaskTemplates
    freeTrialEnd: number

    dob?: string | null

    isAnonymous: boolean

    appSumo?: AppSumo

    ignoreEmails?: boolean
    timeZone: number

    lastSyncedMonthEndedAt?: number
    lastSyncedWeekEndedAt?: number
    lastSyncedYear?: number

    weeks: TrackedTime
    months: TrackedTime
    years: TrackedTime

    focusSounds: FocusSound[]

    completedEducation: Education[]

    lastVisitAt: number

    viewedNewFeaturesAt?: number

    reviewedVisionAt?: number
    sumbittedHabitsAt?: number
    reviewedGoalsAt?: number
    organizedTasksAt?: number

    finishedOnboardingAt?: number

    subscription?: Subscription
    lifeTimeDeal?: LifeTimeDeal

    accountDeletionEmailSentAt?: number

    vision: Vision
    goals: Goals
    ideas: Ideas
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
  'lastVisitAt',
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
  | 'isAnonymous'
  | 'wakeUpAt'
  | 'firstMealAt'
  | 'startWorkAt'
  | 'lastMealAt'
  | 'finishWorkAt'
  | 'goToBedAt'
  | 'workdayHours'
  | 'weekendHours'
  | 'weeks'
  | 'months'
  | 'years'
  | 'vision'
  | 'goals'
  | 'ideas'
  | 'completedEducation'
  | 'taskFactories'
  | 'taskTemplates'
> = {
  focusSounds: defaultFocusSounds,
  sets: [],
  tasks: {},
  projects: {
    [otherProject.id]: otherProject,
  },
  habits: {},
  isAnonymous: true,
  weeks: {},
  months: {},
  years: {},
  vision: {},
  goals: {},
  ideas: {},
  completedEducation: [],
  taskFactories: {},
  taskTemplates: {},
  ...defaultWorkBudget,
  ...dayMomentsDefaultValues,
}
