import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'

type WorkTimeReportPreferences = {
  includeToday: boolean
}

export const useWorkTimeReportPreferences = () => {
  return usePersistentState<WorkTimeReportPreferences>(
    PersistentStateKey.WorkTimeReportPreferences,
    {
      includeToday: true,
    },
  )
}
