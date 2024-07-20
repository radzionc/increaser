import { OAuthProvider } from '@increaser/entities/OAuthProvider'
import { AuthSession } from '@increaser/entities/AuthSession'
import { Habit } from '@increaser/entities/Habit'
import {
  UserPerformanceRecord,
  UserProfile,
} from '@increaser/entities/PerformanceScoreboard'
import { Project } from '@increaser/entities/Project'
import { Subscription } from '@increaser/entities/Subscription'
import { Set, User, UserEditableFields } from '@increaser/entities/User'
import { ApiMethod } from './ApiMethod'
import { Task } from '@increaser/entities/Task'
import { ProductFeature } from '@increaser/entities/ProductFeature'
import { ProductFeatureResponse } from './ProductFeatureResponse'
import { Interval } from '@lib/utils/interval/Interval'
import { VisionAttribute } from '@increaser/entities/Vision'
import { Goal } from '@increaser/entities/Goal'
import { TaskFactory } from '@increaser/entities/TaskFactory'
import { Note } from '@increaser/entities/Note'

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

  createProject: ApiMethod<Project, Project>
  updateProject: ApiMethod<
    {
      id: string
      fields: Partial<Omit<Project, 'id'>>
    },
    Project
  >
  deleteProject: ApiMethod<{ id: string }, undefined>

  redeemAppSumoCode: ApiMethod<{ code: string }, undefined>

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
  trackHabit: ApiMethod<{ id: string; date: string; value: boolean }, undefined>

  addSet: ApiMethod<Set, undefined>
  updateSet: ApiMethod<{ old: Interval; new: Set }, undefined>
  deleteSet: ApiMethod<Interval, undefined>

  proposeFeature: ApiMethod<
    Omit<ProductFeature, 'isApproved' | 'status' | 'proposedBy' | 'upvotedBy'>,
    undefined
  >
  voteForFeature: ApiMethod<{ id: string }, undefined>
  features: ApiMethod<undefined, ProductFeatureResponse[]>

  userProfile: ApiMethod<{ id: string }, UserProfile | null>

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

  createNote: ApiMethod<Note, Note>
  updateNote: ApiMethod<
    {
      id: string
      fields: Partial<Omit<Note, 'id'>>
    },
    Note
  >
  deleteNote: ApiMethod<{ id: string }, undefined>

  getFileUploadUrl: ApiMethod<
    { contentType: string },
    {
      url: string
      key: string
    }
  >
}

export type ApiMethodName = keyof ApiInterface
