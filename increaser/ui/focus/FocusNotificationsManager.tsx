import { createContext, useEffect } from 'react'
import { MS_IN_MIN } from '@lib/utils/time'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { showNotification } from '@lib/ui/notifications/utils'
import { pluralize } from '@lib/utils/pluralize'
import { attempt } from '@lib/utils/attempt'
import { speak } from '@lib/ui/notifications/utils/speak'
import { playSound } from '@lib/ui/notifications/utils/playSound'
import { FocusSession, useFocus } from './FocusContext'
import { useHasTimerBrowserNotification } from './hooks/useHasTimerBrowserNotification'
import { useFocusedDuration } from './hooks/useFocusedDuration'
import { useIsFocusPaused } from './utils/useIsFocusPaused'
import { useHasTimerSoundNotification } from './hooks/useHasTimerSoundNotification'

const CurrentFocusContext = createContext<FocusSession | undefined>(undefined)

// const remindAboutEyesEvery = 20
const remindMinBeforeWorkDayEnds = 5

export const FocusNotificationsManager = () => {
  const [hasTimerSoundNotification] = useHasTimerSoundNotification()
  const [hasTimerBrowserNotification] = useHasTimerBrowserNotification()
  const { focusDuration } = useFocus()

  const { finishWorkAt } = useAssertUserState()

  const isPaused = useIsFocusPaused()
  const workedDuration = useFocusedDuration()

  const durationMs = (focusDuration as number) * MS_IN_MIN

  useEffect(() => {
    if (isPaused) return

    const notifyIn = durationMs - workedDuration
    if (notifyIn < 0) return

    const onTimerFinish = async () => {
      if (hasTimerBrowserNotification) {
        showNotification(
          `✅ ${focusDuration}-min session is over. Time to relax!`,
        )
      }

      if (hasTimerSoundNotification) {
        attempt(() => playSound('audio/pristine-notificaiton.mp3'), undefined)
      }
    }

    const timeout = setTimeout(onTimerFinish, notifyIn)

    return () => {
      clearTimeout(timeout)
    }
  }, [
    durationMs,
    focusDuration,
    hasTimerBrowserNotification,
    hasTimerSoundNotification,
    isPaused,
    workedDuration,
  ])

  // useEffect(() => {
  //   if (isPaused) return

  //   const timeouts = range(remindersCount)
  //     .map(
  //       (reminderNumber) =>
  //         startRemindersAfter + (reminderNumber + 1) * repeatRemindersEvery,
  //     )
  //     .filter((minutes) => minutes > focusDuration)
  //     .map((minutes) => {
  //       return setTimeout(
  //         () => {
  //           if (hasTimerBrowserNotification) {
  //             showNotification(`✅ ${minutes} min of work. Give 👀 a break!`)
  //           }

  //           if (hasTimerSoundNotification) {
  //             attempt(
  //               () => playSound('audio/relax-notificaiton.mp3'),
  //               undefined,
  //             )
  //           }
  //         },
  //         startTime + minutes * MS_IN_MIN - Date.now(),
  //       )
  //     })

  //   return () => {
  //     timeouts.forEach(clearTimeout)
  //   }
  // }, [])

  useEffect(() => {
    const now = Date.now()
    const showMessageIn =
      now + (finishWorkAt - remindMinBeforeWorkDayEnds) * MS_IN_MIN
    if (showMessageIn < now) return

    const timeout = setTimeout(() => {
      if (hasTimerBrowserNotification) {
        showNotification(
          `🍿 workday ends in ${pluralize(
            remindMinBeforeWorkDayEnds,
            'minute',
          )}`,
        )
      }

      if (hasTimerSoundNotification) {
        attempt(
          () =>
            speak(
              `Your workday ends in ${pluralize(
                remindMinBeforeWorkDayEnds,
                'minute',
              )}`,
            ),
          undefined,
        )
      }
    }, showMessageIn - now)

    return () => {
      clearTimeout(timeout)
    }
  }, [finishWorkAt, hasTimerBrowserNotification, hasTimerSoundNotification])

  return null
}
