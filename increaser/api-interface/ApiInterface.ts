import { OAuthProvider } from '@increaser/entities/OAuthProvider'
import { AuthSession } from '@increaser/entities/AuthSession'
import {
  UserPerformanceRecord,
  UserProfile,
} from '@increaser/entities/PerformanceScoreboard'
import { Subscription } from '@increaser/entities/Subscription'
import {
  Set,
  User,
  UserEditableFields,
  UserEntity,
} from '@increaser/entities/User'
import { ApiMethod } from './ApiMethod'
import { ProductFeature } from '@increaser/entities/ProductFeature'
import { ProductFeatureResponse } from './ProductFeatureResponse'
import { Interval } from '@lib/utils/interval/Interval'
import { Habit } from '@increaser/entities/Habit'
import { Project } from '@increaser/entities/Project'
import { Task } from '@increaser/entities/Task'
import { TaskFactory } from '@increaser/entities/TaskFactory'
import { TaskTemplate } from '@increaser/entities/TaskTemplate'
import { Goal } from '@increaser/entities/Goal'
import { Idea } from '@increaser/entities/Idea'
import { VisionAttribute } from '@increaser/entities/Vision'

export interface ApiInterface {
  authSessionWithEmail: ApiMethod<
    {
      code: string
      timeZone: number
    },
    AuthSession
  >

  authSessionWithOAuth: ApiMethod<
    {
      provider: OAuthProvider
      code: string
      redirectUri: string
      timeZone: number
    },
    AuthSession
  >

  user: ApiMethod<{ timeZone: number }, User>
  updateUser: ApiMethod<Partial<Pick<User, UserEditableFields>>, undefined>
  manageSubscription: ApiMethod<
    undefined,
    {
      updateUrl: string
      cancelUrl: string
    }
  >

  subscription: ApiMethod<{ id: string }, Subscription | undefined>

  scoreboard: ApiMethod<
    { id: string },
    {
      id: string
      syncedAt: number
      myPosition?: number
      users: Omit<UserPerformanceRecord, 'id'>[]
    }
  >

  sendAuthLinkByEmail: ApiMethod<{ email: string }, undefined>

  addSet: ApiMethod<Set, undefined>
  addSets: ApiMethod<Set[], undefined>
  updateSet: ApiMethod<{ old: Interval; new: Set }, undefined>
  deleteSet: ApiMethod<Interval, undefined>

  proposeFeature: ApiMethod<
    Omit<ProductFeature, 'isApproved' | 'status' | 'proposedBy' | 'upvotedBy'>,
    undefined
  >
  voteForFeature: ApiMethod<{ id: string }, undefined>
  features: ApiMethod<undefined, ProductFeatureResponse[]>

  userProfile: ApiMethod<{ id: string }, UserProfile | null>

  createUserEntity: ApiMethod<
    {
      value: any
      entity: UserEntity
    },
    any
  >
  updateUserEntity: ApiMethod<
    {
      entity: UserEntity
      fields: any
      id: string
    },
    any
  >
  deleteUserEntity: ApiMethod<
    {
      entity: UserEntity
      id: string
    },
    any
  >

  getFileUploadUrl: ApiMethod<
    { contentType: string },
    {
      url: string
      key: string
    }
  >

  // DEPRECATED
  createProject: ApiMethod<Project, Project>
  updateProject: ApiMethod<
    {
      id: string
      fields: Partial<Omit<Project, 'id'>>
    },
    Project
  >
  deleteProject: ApiMethod<{ id: string }, undefined>

  createTask: ApiMethod<Task, Task>
  updateTask: ApiMethod<
    {
      id: string
      fields: Partial<Omit<Task, 'id'>>
    },
    Task
  >
  deleteTask: ApiMethod<{ id: string }, undefined>

  createTaskFactory: ApiMethod<TaskFactory, TaskFactory>
  updateTaskFactory: ApiMethod<
    {
      id: string
      fields: Partial<Omit<TaskFactory, 'id'>>
    },
    TaskFactory
  >
  deleteTaskFactory: ApiMethod<{ id: string }, undefined>

  createTaskTemplate: ApiMethod<TaskTemplate, TaskTemplate>
  updateTaskTemplate: ApiMethod<
    {
      id: string
      fields: Partial<Omit<TaskTemplate, 'id'>>
    },
    TaskTemplate
  >
  deleteTaskTemplate: ApiMethod<{ id: string }, undefined>

  createHabit: ApiMethod<Omit<Habit, 'successes'>, Habit>
  updateHabit: ApiMethod<
    {
      id: string
      fields: Partial<
        Pick<
          Habit,
          'name' | 'color' | 'order' | 'emoji' | 'startedAt' | 'successes'
        >
      >
    },
    Habit
  >
  deleteHabit: ApiMethod<{ id: string }, undefined>

  createVisionAttribute: ApiMethod<VisionAttribute, VisionAttribute>
  updateVisionAttribute: ApiMethod<
    {
      id: string
      fields: Partial<Omit<VisionAttribute, 'id'>>
    },
    VisionAttribute
  >
  deleteVisionAttribute: ApiMethod<{ id: string }, undefined>

  createGoal: ApiMethod<Goal, Goal>
  updateGoal: ApiMethod<
    {
      id: string
      fields: Partial<Omit<Goal, 'id'>>
    },
    Goal
  >
  deleteGoal: ApiMethod<{ id: string }, undefined>

  createIdea: ApiMethod<Idea, Idea>
  updateIdea: ApiMethod<
    {
      id: string
      fields: Partial<Omit<Idea, 'id'>>
    },
    Idea
  >
  deleteIdea: ApiMethod<{ id: string }, undefined>
}

export type ApiMethodName = keyof ApiInterface
