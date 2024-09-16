import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { makeRecord } from '@lib/utils/record/makeRecord'
import { usePermission } from 'react-use'

const focusNotifications = ['sessionEnd', 'workDayEnd', 'eyeBreak']
export type FocusNotification = (typeof focusNotifications)[number]
export type FocusNotifications = Record<FocusNotification, boolean>

export const useFocusNotificationsHaveSound = () => {
  const permission = usePermission({ name: 'notifications' })
  const areEnabled = permission === 'granted'

  return useStateCorrector(
    usePersistentState<FocusNotifications>(
      PersistentStateKey.FocusNotifications,
      () => makeRecord(focusNotifications, () => areEnabled),
    ),
    (value) => {
      if (!areEnabled && Object.values(value).some((v) => v)) {
        return makeRecord(focusNotifications, () => false)
      }

      return value
    },
  )
}
