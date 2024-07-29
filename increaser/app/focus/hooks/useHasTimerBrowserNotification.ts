import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'
import { useBrowserNotifications } from '@lib/ui/hooks/useBrowserNotifcations'
import { areNotificationsAllowed } from '@lib/ui/notifications/utils'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'

export const useHasTimerBrowserNotification = () => {
  const { permission } = useBrowserNotifications()

  return useStateCorrector(
    usePersistentState<boolean>(
      PersistentStateKey.HasTimerBrowserNotification,
      areNotificationsAllowed(),
    ),
    (value) => {
      if (permission && permission !== 'granted' && value) {
        return false
      }

      return value
    },
  )
}
