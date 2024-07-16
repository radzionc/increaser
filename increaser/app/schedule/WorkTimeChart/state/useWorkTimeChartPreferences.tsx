import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'

type WorkTimeChartPreferences = {
  includeToday: boolean
}

export const useWorkTimeChartPreferences = () => {
  return usePersistentState<WorkTimeChartPreferences>(
    PersistentStateKey.WorkTimeChartPreferences,
    {
      includeToday: true,
    },
  )
}
