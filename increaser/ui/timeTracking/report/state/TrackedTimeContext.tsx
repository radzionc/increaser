import { createContextHook } from '@lib/ui/state/createContextHook'
import { Dispatch, SetStateAction, createContext } from 'react'
import {
  ProjectDay,
  ProjectMonth,
  ProjectWeek,
} from '@increaser/entities/timeTracking'

export type TrackedTimePreference = {
  shouldHideProjectNames: boolean
}

export type TimeTrackingProjectData = {
  hslaColor: string
  name: string
  id: string
  weeks: ProjectWeek[]
  months: ProjectMonth[]
  days: ProjectDay[]
}

type TrackedTimeState = TrackedTimePreference & {
  setState: Dispatch<SetStateAction<TrackedTimePreference>>
  projects: Record<string, TimeTrackingProjectData>
}

export const TrackedTimeContext = createContext<TrackedTimeState | undefined>(
  undefined,
)

export const useTrackedTime = createContextHook(
  TrackedTimeContext,
  'useTrackedTime',
)
