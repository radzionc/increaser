import { CountryCode } from '@increaser/utils/countries'
import { PrimaryGoal } from 'capacity/PrimaryGoal'
import { HabitResponse } from 'habits/Habit'
import { ProjectResponse } from 'projects/Project'
import { createContext } from 'react'
import { Set } from 'sets/Set'
import { createContextHook } from '@increaser/ui/state/createContextHook'
import { WeekTimeAllocation } from 'weekTimeAllocation/WeekTimeAllocation'
import { Task } from '@increaser/entities/User'

export interface FocusSound {
  name: string
  url: string
  favourite?: boolean
}

export interface UserStateView {
  sets: Set[]
  prevSets: Set[]
  projects: ProjectResponse[]
  email: string
  id: string
  name: string
  freeTrialEnd: number
  registrationDate: number
  weekTimeAllocation: WeekTimeAllocation
  goalToStartWorkAt: number
  goalToFinishWorkBy: number
  goalToGoToBedAt: number
  habits: HabitResponse[]
  primaryGoal: PrimaryGoal
  focusSounds: FocusSound[]
  tasks: Task[]
  isAnonymous: boolean
  country: CountryCode
}

interface UserState {
  state: UserStateView | null
  updateState: (state: Partial<UserStateView>) => void
  pullRemoteState: () => void
  isLoading: boolean
  lastUpdatedAt: number
}

export const UserStateContext = createContext<UserState | undefined>(undefined)

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
