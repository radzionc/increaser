import {
  usePersistentState,
  PersistentStateKey,
} from '@increaser/ui/state/persistentState'
import { useTrackedTime } from '@increaser/ui/timeTracking/report/state/TrackedTimeContext'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { TimeGrouping } from '../TimeGrouping'

const defaultTimeGrouping = 'week'

type TrackedTimeReportPreferences = {
  activeProjectId: string | null
  timeGrouping: TimeGrouping
  includeCurrentPeriod: boolean
}

export const useTrackedTimeReportPreferences = () => {
  const { projects } = useTrackedTime()
  return useStateCorrector(
    usePersistentState<TrackedTimeReportPreferences>(
      PersistentStateKey.TrackedTimeReportPreferences,
      {
        activeProjectId: null,
        timeGrouping: defaultTimeGrouping,
        includeCurrentPeriod: false,
      },
    ),
    (state) => {
      const hasWrongActiveProjectId =
        state.activeProjectId !== null && !projects[state.activeProjectId]

      if (hasWrongActiveProjectId) {
        return {
          ...state,
          activeProjectId: null,
        }
      }
      return state
    },
  )
}
