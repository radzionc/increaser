import {
  usePersistentState,
  PersistentStateKey,
} from '../../../state/persistentState'
import { timeFrames } from '../TimeGrouping'
import { useTrackedTime } from './TrackedTimeContext'
import { useEffect } from 'react'
import { TrackedTimeReportPreferences } from './TrackedTimeReportContext'

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
