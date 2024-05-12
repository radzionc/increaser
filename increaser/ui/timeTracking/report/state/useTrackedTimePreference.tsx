import { TrackedTimePreference } from '@increaser/ui/timeTracking/report/state/TrackedTimeContext'
import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'

export const useTrackedTimePreference = () => {
  return usePersistentState<TrackedTimePreference>(
    PersistentStateKey.TrackedTimePreference,
    {
      shouldHideProjectNames: false,
    },
  )
}
