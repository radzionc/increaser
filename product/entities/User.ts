import { CountryCode } from '@lib/countries'
import { Interval } from '@lib/utils/interval/Interval'
import { recordFromItems } from '@lib/utils/record/recordFromItems'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { Minutes } from '@lib/utils/time/types'

import { Education } from './Education'
import { FocusSound, defaultFocusSounds } from './FocusSound'
import { Goal } from './Goal'
import { Habit } from './Habit'
import { Idea } from './Idea'
import { LifeTimeDeal } from './LifeTimeDeal'
import { Principle } from './Principle'
import {
  defaultPrincipleCategories,
  PrincipleCategory,
} from './PrincipleCategory'
import { Project, ProjectRelatedEntity, otherProject } from './Project'
import { Subscription } from './Subscription'
import { Task } from './Task'
import { TaskFactory } from './TaskFactory'
import { TaskTemplate } from './TaskTemplate'
import { TimeRecord } from './TrackedTime'
import { VisionAttribute } from './Vision'
import { WorkBudget, defaultWorkBudget } from './WorkBudget'

export type Set = Interval &
  ProjectRelatedEntity & {
    isEndEstimated?: boolean | null
    isActive?: boolean | null
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

type UserEntityRecords = {
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

export type User = WorkBudget &
  UserEntityRecords & {
    id: string
    email: string
    country?: CountryCode | null
    name?: string | null
    sets: Set[]
    registrationDate: number
    freeTrialEnd: number

    finishWorkAt: Minutes

    dob?: string | null

    isAnonymous: boolean

    ignoreEmails?: boolean
    timeZone: number

    lastSyncedMonthEndedAt?: number
    lastSyncedWeekEndedAt?: number
    lastSyncedYear?: number

    focusSounds: FocusSound[]

    completedEducation: Education[]

    lastVisitAt: number

    viewedNewFeaturesAt?: number
    completedTasksDeletedAt?: number

    viewedHabitsAt?: number

    subscription?: Subscription
    lifeTimeDeal?: LifeTimeDeal

    accountDeletionEmailSentAt?: number

    weekends: number[]
  }

export const defaultWeekends = [5, 6]

export const userReadonlyFields = [
  'id',
  'email',
  'registrationDate',
  'freeTrialEnd',
  'lastSyncedMonthEndedAt',
  'lastSyncedWeekEndedAt',
  'lastVisitAt',
  'subscription',
  'lifeTimeDeal',
] as const

type UserReadonlyFields = (typeof userReadonlyFields)[number]

export type UserEditableFields = Exclude<keyof User, UserReadonlyFields>

export const userDefaultFields: Pick<
  User,
  | 'focusSounds'
  | 'sets'
  | 'tasks'
  | 'projects'
  | 'habits'
  | 'isAnonymous'
  | 'finishWorkAt'
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
  | 'weekends'
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
  finishWorkAt: convertDuration(18, 'h', 'min'),
  principleCategories: recordFromItems(defaultPrincipleCategories, (p) => p.id),
  principles: {},
  weekends: defaultWeekends,
  ...defaultWorkBudget,
}
