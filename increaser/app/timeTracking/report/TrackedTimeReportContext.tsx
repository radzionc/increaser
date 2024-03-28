import { createContextHook } from '@lib/ui/state/createContextHook'
import { Dispatch, SetStateAction, createContext } from 'react'
import { TimeFrame, TimeGrouping } from './TimeGrouping'

export type ProjectsTimeSeries = Record<string, number[]>

type TrackedTimeReportPreferences = {
  activeProjectId: string | null
  timeGrouping: TimeGrouping
  includeCurrentPeriod: boolean
  timeFrame: TimeFrame
}

type TrackedTimeReportProviderState = TrackedTimeReportPreferences & {
  setState: Dispatch<SetStateAction<TrackedTimeReportPreferences>>
  projectsTimeSeries: ProjectsTimeSeries
  firstTimeGroupStartedAt: number
  lastTimeGroupStartedAt: number
}

export const TrackedTimeReportContext = createContext<
  TrackedTimeReportProviderState | undefined
>(undefined)

export const useTrackedTimeReport = createContextHook(
  TrackedTimeReportContext,
  'useTrackedTimeReport',
)
