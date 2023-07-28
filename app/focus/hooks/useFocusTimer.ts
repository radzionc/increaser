import { useProject } from 'projects/hooks/useProject'
import { useEffect } from 'react'
import { showNotification } from 'shared/utils/notification'
import { pluralize } from 'shared/utils/pluralize'
import { range } from 'shared/utils/range'
import { tryToPlaySound } from 'shared/utils/tryToPlaySound'
import { tryToSay } from 'shared/utils/tryToSay'
import { useAssertUserState } from 'user/state/UserStateContext'
import { MS_IN_MIN } from 'utils/time'

import { useFocus } from './useFocus'

const remindersCount = 5
const startRemindersAfter = 30
const repeatRemindersEvery = 10
const remindMinBeforeWorkDayEnds = 5

export const useFocusTimer = () => {
  const {
    focusDuration,
    hasTimerSoundNotification,
    hasTimerBrowserNotification,
    currentSet,
    stop,
  } = useFocus()

  const { goalToFinishWorkBy } = useAssertUserState()

  const startTime = currentSet?.startedAt as number
  const durationMs = (focusDuration as number) * MS_IN_MIN
  const endTime = startTime + durationMs

  const project = useProject(currentSet?.projectId as string)

  useEffect(() => {
    const now = Date.now()
    if (endTime < now) return

    if (!hasTimerBrowserNotification) return

    const onTimerFinish = async () => {
      showNotification(
        `✅ ${focusDuration}-min session ${project ? project.emoji : ''}`,
      )

      if (hasTimerSoundNotification) {
        tryToPlaySound('audio/pristine-notificaiton.mp3')
      }
    }

    const timeout = setTimeout(onTimerFinish, endTime - now)

    return () => {
      clearTimeout(timeout)
    }
  }, [
    endTime,
    focusDuration,
    hasTimerBrowserNotification,
    hasTimerSoundNotification,
    project,
    stop,
  ])

  useEffect(() => {
    const timeouts = range(remindersCount)
      .map(
        (reminderNumber) =>
          startRemindersAfter + (reminderNumber + 1) * repeatRemindersEvery,
      )
      .filter((minutes) => minutes > focusDuration)
      .map((minutes) => {
        return setTimeout(
          () => {
            if (hasTimerBrowserNotification) {
              showNotification(`✅ ${minutes} min of work. Give 👀 a break!`)
            }

            if (hasTimerSoundNotification) {
              tryToPlaySound('audio/relax-notificaiton.mp3')
            }
          },
          startTime + minutes * MS_IN_MIN - Date.now(),
        )
      })

    return () => {
      timeouts.forEach(clearTimeout)
    }
  }, [
    focusDuration,
    hasTimerBrowserNotification,
    hasTimerSoundNotification,
    startTime,
  ])

  useEffect(() => {
    const now = Date.now()
    const showMessageIn =
      now + (goalToFinishWorkBy - remindMinBeforeWorkDayEnds) * MS_IN_MIN
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
        tryToSay(
          `Your workday ends in ${pluralize(
            remindMinBeforeWorkDayEnds,
            'minute',
          )}`,
        )
      }
    }, showMessageIn - now)

    return () => {
      clearTimeout(timeout)
    }
  }, [
    goalToFinishWorkBy,
    hasTimerBrowserNotification,
    hasTimerSoundNotification,
  ])
}
