import {
  PersistentStateKey,
  usePersistentState,
} from '../../state/persistentState'
import { TrackedTimePreference } from './TrackedTimeContext'

export const useTrackedTimePreference = () => {
  return usePersistentState<TrackedTimePreference>(
    PersistentStateKey.TrackedTimeReportPreferences,
    {
      hideProjectNames: false,
    },
  )
}
