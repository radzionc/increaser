import { Interval } from '@lib/utils/interval/Interval'
import { AuthSession } from '@product/entities/AuthSession'
import { OAuthProvider } from '@product/entities/OAuthProvider'
import {
  UserPerformanceRecord,
  UserProfile,
} from '@product/entities/PerformanceScoreboard'
import { ProductFeature } from '@product/entities/ProductFeature'
import {
  Set,
  User,
  UserEditableFields,
  UserEntity,
} from '@product/entities/User'

import { ApiMethod } from './ApiMethod'
import { ProductFeatureResponse } from './ProductFeatureResponse'

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
  addSets: ApiMethod<Set[], Set[]>
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
  updateUserEntities: ApiMethod<
    {
      entity: UserEntity
      updates: {
        fields: any
        id: string
      }[]
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
}

export type ApiMethodName = keyof ApiInterface
