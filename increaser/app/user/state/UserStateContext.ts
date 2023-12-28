import { createContext } from 'react'
import { createContextHook } from '@lib/ui/state/createContextHook'
import { User } from '@increaser/entities/User'

interface UserStateContextValue {
  state: User | null
  updateState: (state: Partial<User>) => void
  pullRemoteState: () => void
  isLoading: boolean
  lastUpdatedAt: number
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
