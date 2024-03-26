import { EnhancedProject } from '@increaser/ui/projects/EnhancedProject'
import { createContextHook } from '@lib/ui/state/createContextHook'
import { Dispatch, SetStateAction, createContext } from 'react'
import { ProjectDay } from '@increaser/entities/timeTracking'

export type TrackedTimePreference = {
  shouldHideProjectNames: boolean
}

export type TimeTrackingProjectData = Pick<
  EnhancedProject,
  'hslaColor' | 'name' | 'weeks' | 'months' | 'id'
> & {
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
