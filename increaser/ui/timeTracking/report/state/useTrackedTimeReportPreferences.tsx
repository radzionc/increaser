import {
  usePersistentState,
  PersistentStateKey,
} from '@increaser/ui/state/persistentState'
import { timeFrames } from '@increaser/ui/timeTracking/report/TimeGrouping'
import { useTrackedTime } from '@increaser/ui/timeTracking/report/state/TrackedTimeContext'
import { useEffect } from 'react'
import { TrackedTimeReportPreferences } from '@increaser/ui/timeTracking/report/state/TrackedTimeReportContext'

const defaultTimeGrouping = 'week'

export const useTrackedTimeReportPreferences = () => {
  const [state, setState] = usePersistentState<TrackedTimeReportPreferences>(
    PersistentStateKey.TrackedTimeReportPreferences,
    {
      activeProjectId: null,
      timeGrouping: defaultTimeGrouping,
      includeCurrentPeriod: false,
      timeFrame: timeFrames[defaultTimeGrouping][0],
    },
  )

  const { projects } = useTrackedTime()

  const hasWrongActiveProjectId =
    state.activeProjectId !== null && !projects[state.activeProjectId]

  useEffect(() => {
    if (hasWrongActiveProjectId) {
      setState((state) => ({ ...state, activeProjectId: null }))
    }
  }, [hasWrongActiveProjectId, setState])

  return [
    {
      ...state,
      activeProjectId: hasWrongActiveProjectId ? null : state.activeProjectId,
    },
    setState,
  ] as const
}
