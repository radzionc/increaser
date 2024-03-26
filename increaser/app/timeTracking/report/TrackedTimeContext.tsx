import { EnhancedProject } from '@increaser/ui/projects/EnhancedProject'
import { createContextHook } from '@lib/ui/state/createContextHook'
import { Dispatch, SetStateAction, createContext } from 'react'
import { TrackedTimePreference } from './useTrackedTimePreference'
import { ProjectDay } from '@increaser/entities/timeTracking'

type TimeTrackingProjectData = Pick<
  EnhancedProject,
  'hslaColor' | 'name' | 'weeks' | 'months' | 'id' | 'emoji'
> & {
  days: ProjectDay[]
}

type TrackedTimeState = TrackedTimePreference & {
  setState: Dispatch<SetStateAction<TrackedTimePreference>>
  projects: Record<string, TimeTrackingProjectData>
}

const TrackedTimeContext = createContext<TrackedTimeState | undefined>(
  undefined,
)

export const useTrackedTime = createContextHook(
  TrackedTimeContext,
  'useTrackedTime',
)
