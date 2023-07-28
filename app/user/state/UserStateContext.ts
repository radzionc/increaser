import { QueryMainApiParams } from 'api/hooks/useMainApi'
import { PrimaryGoal } from 'capacity/PrimaryGoal'
import { HabitResponse } from 'habits/Habit'
import { Membership } from 'membership'
import { ProjectResponse } from 'projects/Project'
import { createContext } from 'react'
import { Set } from 'sets/Set'
import { createContextHook } from 'shared/utils/createContextHook'
import { Task } from 'tasks/Task'
import { WeekTimeAllocation } from 'weekTimeAllocation/WeekTimeAllocation'

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
  membership?: Membership
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
}

interface UserState {
  state: UserStateView | null
  updateState: (state: Partial<UserStateView>) => void
  pullRemoteState: () => void
  isLoading: boolean
  lastUpdatedAt: number
  updateRemoteState: <T>(payload: QueryMainApiParams) => Promise<T>
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
