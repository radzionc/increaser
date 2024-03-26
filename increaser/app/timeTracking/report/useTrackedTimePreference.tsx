import {
  PersistentStateKey,
  usePersistentState,
} from '../../state/persistentState'

export type TrackedTimePreference = {
  hideProjectNames: boolean
}

export const useTrackedTimePreference = () => {
  return usePersistentState<TrackedTimePreference>(
    PersistentStateKey.TrackedTimeReportPreferences,
    {
      hideProjectNames: false,
    },
  )
}
