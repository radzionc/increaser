import { useNotificationPermission } from '@lib/ui/notifications/hooks/useNotificationPermission'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { recordFromKeys } from '@lib/utils/record/recordFromKeys'
import {
  PersistentStateKey,
  usePersistentState,
} from '@product/ui/state/persistentState'

export const breakNotifications = ['breakEnd', 'breakExpired'] as const
export type BreakNotification = (typeof breakNotifications)[number]
export type BreakNotifications = Record<BreakNotification, boolean>

export const useBreakNotifications = () => {
  const permission = useNotificationPermission()
  const areEnabled = permission === 'granted'

  return useStateCorrector(
    usePersistentState<BreakNotifications>(
      PersistentStateKey.BreakNotifications,
      () => recordFromKeys(breakNotifications, () => areEnabled),
    ),
    (value) => {
      if (!areEnabled && Object.values(value).some((v) => v)) {
        return recordFromKeys(breakNotifications, () => false)
      }

      return value
    },
  )
}

export const breakNotificationEmoji: Record<BreakNotification, string> = {
  breakEnd: '⏰',
  breakExpired: '⚠️',
}

export const breakNotificationName: Record<BreakNotification, string> = {
  breakEnd: 'Break end',
  breakExpired: 'Break expired',
}

export const remindersCount = 5

export const breakNotificationDescription: Record<BreakNotification, string> = {
  breakEnd: 'Get notified when your break time is up.',
  breakExpired: `Receive reminders every minute for ${remindersCount} minutes if you exceed your break time.`,
}

export const breakNotificationText: Record<BreakNotification, string> = {
  breakEnd: 'Your break time is up! Time to get back to work.',
  breakExpired: 'Your break has expired. Please return to work.',
}
