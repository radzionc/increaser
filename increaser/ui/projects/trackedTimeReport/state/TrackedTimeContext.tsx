import { createContextHook } from '@lib/ui/state/createContextHook'
import { createContext } from 'react'
import {
  ProjectDay,
  ProjectMonth,
  ProjectWeek,
  ProjectYear,
} from '@increaser/entities/timeTracking'
import { HSLA } from '@lib/ui/colors/HSLA'

export type TimeTrackingProjectData = {
  color: HSLA
  name: string
  emoji: string
  id: string
  weeks: ProjectWeek[]
  months: ProjectMonth[]
  years: ProjectYear[]
  days: ProjectDay[]
}

type TrackedTimeState = {
  projects: Record<string, TimeTrackingProjectData>
}

export const TrackedTimeContext = createContext<TrackedTimeState | undefined>(
  undefined,
)

export const useTrackedTime = createContextHook(
  TrackedTimeContext,
  'useTrackedTime',
)
