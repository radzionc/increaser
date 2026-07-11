import { ChildrenProp } from '@lib/ui/props'
import { shouldBeDefined } from '@lib/utils/assert/shouldBeDefined'
import { ApiError } from '@product/api-interface/ApiError'
import { ApiContext, CallApi } from '@product/api-ui/state/ApiContext'
import { callApi } from '@product/api-ui/utils/callApi'
import {
  userDefaultFields,
  userEntityRecordName,
  UserEntity,
} from '@product/entities/User'
import { useCallback } from 'react'

import { useAuthSession } from '../auth/hooks/useAuthSession'

const baseUrl =
  process.env.NEXT_PUBLIC_LOCAL_DB === 'true'
    ? ''
    : shouldBeDefined(process.env.NEXT_PUBLIC_API_URL)

export const ApiProvider = ({ children }: ChildrenProp) => {
  const [authSession, setAuthSession] = useAuthSession()
  const authToken = authSession?.token

  const call: CallApi = useCallback(
    async (method, input: any) => {
      if (process.env.NEXT_PUBLIC_LOCAL_DB === 'true') {
        const LOCAL_STORAGE_KEY = 'increaser_local_user_db'

        const getLocalUser = () => {
          const stored = localStorage.getItem(LOCAL_STORAGE_KEY)
          if (stored) {
            return JSON.parse(stored)
          }
          const defaultUser = {
            id: 'local-user-id',
            email: 'local-user@example.com',
            registrationDate: Date.now(),
            freeTrialEnd: Date.now() + 1000 * 60 * 60 * 24 * 365,
            lastSyncedMonthEndedAt: Date.now(),
            lastSyncedWeekEndedAt: Date.now(),
            lastVisitAt: Date.now(),
            viewedNewFeaturesAt: Date.now(),
            viewedHabitsAt: Date.now(),
            timeZone: input?.timeZone || 0,
            ...userDefaultFields,
          }
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultUser))
          return defaultUser
        }

        const saveLocalUser = (user: any) => {
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(user))
        }

        if (method === 'sendAuthLinkByEmail') {
          return undefined
        }

        if (
          method === 'authSessionWithEmail' ||
          method === 'authSessionWithOAuth'
        ) {
          const email = input.email || 'local-user@example.com'
          const session = {
            token: 'local-session-token',
            expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 365,
            isFirst: true,
          }
          const user = getLocalUser()
          user.email = email
          saveLocalUser(user)
          return session
        }

        if (method === 'user') {
          const user = getLocalUser()
          user.timeZone = input.timeZone
          saveLocalUser(user)
          return user
        }

        if (method === 'updateUser') {
          const user = getLocalUser()
          Object.assign(user, input)
          saveLocalUser(user)
          return undefined
        }

        if (method === 'createUserEntity') {
          const { value, entity } = input as { value: any; entity: UserEntity }
          const user = getLocalUser()
          const recordName = userEntityRecordName[entity]
          if (!user[recordName]) {
            user[recordName] = {}
          }
          user[recordName][value.id] = value
          saveLocalUser(user)
          return value
        }

        if (method === 'updateUserEntity') {
          const { entity, fields, id } = input as {
            entity: UserEntity
            fields: any
            id: string
          }
          const user = getLocalUser()
          const recordName = userEntityRecordName[entity]
          if (user[recordName] && user[recordName][id]) {
            user[recordName][id] = { ...user[recordName][id], ...fields }
          }
          saveLocalUser(user)
          return user[recordName][id]
        }

        if (method === 'updateUserEntities') {
          const { entity, updates } = input as {
            entity: UserEntity
            updates: { fields: any; id: string }[]
          }
          const user = getLocalUser()
          const recordName = userEntityRecordName[entity]
          const updated: any[] = []
          if (user[recordName]) {
            for (const update of updates) {
              const { id, fields } = update
              if (user[recordName][id]) {
                user[recordName][id] = { ...user[recordName][id], ...fields }
                updated.push(user[recordName][id])
              }
            }
          }
          saveLocalUser(user)
          return updated
        }

        if (method === 'deleteUserEntity') {
          const { entity, id } = input as { entity: UserEntity; id: string }
          const user = getLocalUser()
          const recordName = userEntityRecordName[entity]
          if (user[recordName]) {
            delete user[recordName][id]
          }
          saveLocalUser(user)
          return undefined
        }

        if (method === 'addSet') {
          const user = getLocalUser()
          user.sets.push(input)
          saveLocalUser(user)
          return undefined
        }

        if (method === 'addSets') {
          const user = getLocalUser()
          user.sets.push(...input)
          saveLocalUser(user)
          return input
        }

        if (method === 'updateSet') {
          const { old, new: newSet } = input as { old: any; new: any }
          const user = getLocalUser()
          const index = user.sets.findIndex(
            (s: any) => s.start === old.start && s.end === old.end,
          )
          if (index !== -1) {
            user.sets[index] = newSet
          }
          saveLocalUser(user)
          return undefined
        }

        if (method === 'deleteSet') {
          const user = getLocalUser()
          user.sets = user.sets.filter(
            (s: any) => !(s.start === input.start && s.end === input.end),
          )
          saveLocalUser(user)
          return undefined
        }

        if (method === 'scoreboard') {
          return {
            id: input.id,
            syncedAt: Date.now(),
            users: [],
          }
        }

        if (method === 'features') {
          return []
        }

        if (method === 'userProfile') {
          return null
        }

        if (method === 'getFileUploadUrl') {
          return { url: '', key: '' }
        }

        return undefined
      }

      try {
        const result = await callApi({
          baseUrl: baseUrl!,
          method,
          input,
          authToken,
        })

        return result
      } catch (err) {
        if (err instanceof ApiError && err.id === 'invalidAuthToken') {
          setAuthSession(null)
        }
        throw err
      }
    },
    [authToken, setAuthSession],
  )

  return <ApiContext.Provider value={{ call }}>{children}</ApiContext.Provider>
}
