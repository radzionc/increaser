import { createContextHook } from '@lib/ui/state/createContextHook'
import { Dispatch, SetStateAction, createContext } from 'react'
import {
  ProjectDay,
  ProjectMonth,
  ProjectWeek,
  ProjectYear,
} from '@increaser/entities/timeTracking'
import { HSLA } from '@lib/ui/colors/HSLA'

export type TrackedTimePreference = {
  shouldHideProjectNames: boolean
}

export type TimeTrackingProjectData = {
  hslaColor: HSLA
  name: string
  emoji: string
  color: number
  id: string
  weeks: ProjectWeek[]
  months: ProjectMonth[]
  years: ProjectYear[]
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
