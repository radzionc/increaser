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
import { TimeRecord } from './TrackedTime'
import { VisionAttribute } from './Vision'
import { Goal } from './Goal'
import { Education } from './Education'
import { TaskFactory } from './TaskFactory'
import { Idea } from './Idea'
import { TaskTemplate } from './TaskTemplate'
import {
  defaultPrincipleCategories,
  PrincipleCategory,
} from './PrincipleCategory'
import { Principle } from './Principle'
import { toRecord } from '@lib/utils/record/toRecord'

export type Set = Interval & {
  projectId: string
  isEndEstimated?: boolean | null
}

interface AppSumo {
  code: string
}

export const maxWeeks = 24
export const maxMonths = 24

export type UserEntityType = {
  project: Project
  habit: Habit
  task: Task
  taskFactory: TaskFactory
  taskTemplate: TaskTemplate
  week: TimeRecord
  month: TimeRecord
  year: TimeRecord
  visionAttribute: VisionAttribute
  goal: Goal
  idea: Idea
  principleCategory: PrincipleCategory
  principle: Principle
}

export type UserEntity = keyof UserEntityType

export type UserEntityRecord<T extends UserEntity> = Record<
  string,
  UserEntityType[T]
>

export type UserEntityRecords = {
  projects: UserEntityRecord<'project'>
  habits: UserEntityRecord<'habit'>
  tasks: UserEntityRecord<'task'>
  taskFactories: UserEntityRecord<'taskFactory'>
  taskTemplates: UserEntityRecord<'taskTemplate'>
  weeks: UserEntityRecord<'week'>
  months: UserEntityRecord<'month'>
  years: UserEntityRecord<'year'>
  vision: UserEntityRecord<'visionAttribute'>
  goals: UserEntityRecord<'goal'>
  ideas: UserEntityRecord<'idea'>
  principleCategories: UserEntityRecord<'principleCategory'>
  principles: UserEntityRecord<'principle'>
}

export const userEntityRecordName: {
  [K in UserEntity]: keyof UserEntityRecords
} = {
  project: 'projects',
  habit: 'habits',
  task: 'tasks',
  taskFactory: 'taskFactories',
  taskTemplate: 'taskTemplates',
  week: 'weeks',
  month: 'months',
  year: 'years',
  visionAttribute: 'vision',
  goal: 'goals',
  idea: 'ideas',
  principleCategory: 'principleCategories',
  principle: 'principles',
} as const

export type User = DayMoments &
  WorkBudget &
  UserEntityRecords & {
    id: string
    email: string
    country?: CountryCode | null
    name?: string | null
    sets: Set[]
    registrationDate: number
    freeTrialEnd: number

    dob?: string | null

    isAnonymous: boolean

    appSumo?: AppSumo

    ignoreEmails?: boolean
    timeZone: number

    lastSyncedMonthEndedAt?: number
    lastSyncedWeekEndedAt?: number
    lastSyncedYear?: number

    focusSounds: FocusSound[]

    completedEducation: Education[]

    lastVisitAt: number

    viewedNewFeaturesAt?: number

    subscription?: Subscription
    lifeTimeDeal?: LifeTimeDeal

    accountDeletionEmailSentAt?: number
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
  | 'principleCategories'
  | 'principles'
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
  principleCategories: toRecord(defaultPrincipleCategories, (p) => p.id),
  principles: {},
  ...defaultWorkBudget,
  ...dayMomentsDefaultValues,
}
