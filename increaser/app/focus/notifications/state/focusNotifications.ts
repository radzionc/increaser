import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'
import { useNotificationPermission } from '@lib/ui/notifications/hooks/useNotificationPermission'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { recordFromKeys } from '@lib/utils/record/recordFromKeys'
import { Minutes, Seconds } from '@lib/utils/time/types'

export const focusNotifications = ['sessionEnd', 'workDayEnd', 'eyeBreak']
export type FocusNotification = (typeof focusNotifications)[number]
export type FocusNotifications = Record<FocusNotification, boolean>

export const useFocusNotifications = () => {
  const permission = useNotificationPermission()
  const areEnabled = permission === 'granted'

  return useStateCorrector(
    usePersistentState<FocusNotifications>(
      PersistentStateKey.FocusNotifications,
      () => recordFromKeys(focusNotifications, () => areEnabled),
    ),
    (value) => {
      if (!areEnabled && Object.values(value).some((v) => v)) {
        return recordFromKeys(focusNotifications, () => false)
      }

      return value
    },
  )
}

export const focusNotificationEmoji: Record<FocusNotification, string> = {
  sessionEnd: '🏁',
  workDayEnd: '🔔',
  eyeBreak: '👁️',
}

export const focusNotificationName: Record<FocusNotification, string> = {
  sessionEnd: 'Session end',
  workDayEnd: 'Work day end',
  eyeBreak: 'Eye break',
}

export const workdayEndNotificationTime: Minutes = 5
export const eyeBreakNotificationInterval: Minutes = 20
export const eyeBreakDuration: Seconds = 20

export const focusNotificationDescription: Record<FocusNotification, string> = {
  sessionEnd:
    'Receive a notification when your current focus session has ended.',
  workDayEnd: `Get notified ${workdayEndNotificationTime} minutes before the end of your workday.`,
  eyeBreak: `Reminder to take a ${eyeBreakDuration}-second break for your eyes after every ${eyeBreakNotificationInterval} minutes of work.`,
}

export const focusNotificationText: Record<FocusNotification, string> = {
  sessionEnd: 'Great job! You’ve completed your session.',
  workDayEnd: `Workday ends in ${workdayEndNotificationTime} minutes. Wrap up!`,
  eyeBreak: `Take a ${eyeBreakDuration}-second eye break now.`,
}
