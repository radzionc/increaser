import { createContext } from 'react'
import { createContextHook } from '@increaser/ui/state/createContextHook'
import {
  UserState,
  UserStateQuery,
} from '@increaser/api-interface/client/graphql'
import { QueryApi } from 'api/useApi'

interface UserStateContextValue {
  state: UserStateQuery['userState'] | null
  updateState: (state: Partial<UserState>) => void
  pullRemoteState: () => void
  isLoading: boolean
  lastUpdatedAt: number
  updateRemoteState: QueryApi
}

export const UserStateContext = createContext<
  UserStateContextValue | undefined
>(undefined)

export const useUserState = createContextHook(
  UserStateContext,
  'UserStateContext',
)

export const useAssertUserState = () => {
  const { state } = useUserState()

  if (state === null) {
    throw new Error('UserState is not provided')
  }

  return state
}
