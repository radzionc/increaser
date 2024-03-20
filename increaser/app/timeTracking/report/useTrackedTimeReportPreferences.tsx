import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import {
  usePersistentState,
  PersistentStateKey,
} from '../../state/persistentState'
import { timeFrames } from './TimeGrouping'
import { TrackedTimeReportState } from './TrackedTimeReportState'
import { useEffect } from 'react'

const defaultTimeGrouping = 'week'

export const useTrackedTimeReportPreferences = () => {
  const [state, setState] = usePersistentState<TrackedTimeReportState>(
    PersistentStateKey.TrackedTimeReportPreferences,
    {
      activeProjectId: null,
      timeGrouping: defaultTimeGrouping,
      includeCurrentPeriod: false,
      timeFrame: timeFrames[defaultTimeGrouping][0],
    },
  )

  const { projectsRecord } = useProjects()

  const hasWrongActiveProjectId =
    state.activeProjectId !== null && !projectsRecord[state.activeProjectId]

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
