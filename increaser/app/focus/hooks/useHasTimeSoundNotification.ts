import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'
import { areNotificationsAllowed } from '@lib/ui/notifications/utils'

export const useHasTimerSoundNotification = () => {
  return usePersistentState<boolean>(
    PersistentStateKey.HasTimerSoundNotification,
    areNotificationsAllowed(),
  )
}
