import { CurrentSet } from 'focus/context/FocusContext'
import { createContext, useEffect } from 'react'
import { ComponentWithChildrenProps } from '@increaser/ui/props'
import { MS_IN_MIN } from '@increaser/utils/time'
import { useFocus } from 'focus/hooks/useFocus'
import { useProject } from 'projects/hooks/useProject'
import { useAssertUserState } from 'user/state/UserStateContext'
import { createContextHook } from '@increaser/ui/state/createContextHook'
import { useRouter } from 'next/router'
import { Path } from 'router/Path'
import { range } from '@increaser/utils/array/range'
import { showNotification } from '@increaser/ui/notifications/utils'
import { pluralize } from '@increaser/utils/pluralize'
import { attempt } from '@increaser/utils/attempt'
import { speak } from '@increaser/ui/notifications/utils/speak'
import { playSound } from '@increaser/ui/notifications/utils/playSound'

interface CurrentFocusState extends CurrentSet {}

export const CurrentFocusContext = createContext<CurrentFocusState | undefined>(
  undefined,
)

interface CurrentFocusProviderProps extends ComponentWithChildrenProps {
  value: CurrentSet
}

const remindersCount = 5
const startRemindersAfter = 30
const repeatRemindersEvery = 10
const remindMinBeforeWorkDayEnds = 5

export const CurrentFocusProvider = ({
  children,
  value,
}: CurrentFocusProviderProps) => {
  const {
    focusDuration,
    hasTimerSoundNotification,
    hasTimerBrowserNotification,
    currentSet,
    stop,
  } = useFocus()

  const { finishWorkAt } = useAssertUserState()

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
        attempt(() => playSound('audio/pristine-notificaiton.mp3'), undefined)
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
              attempt(
                () => playSound('audio/relax-notificaiton.mp3'),
                undefined,
              )
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

  return (
    <CurrentFocusContext.Provider value={value}>
      {children}
    </CurrentFocusContext.Provider>
  )
}

export const CurrentFocusGuard = ({ children }: ComponentWithChildrenProps) => {
  const { currentSet } = useFocus()

  const router = useRouter()

  useEffect(() => {
    if (!currentSet) {
      router.replace(Path.Home)
    }
  }, [currentSet, router])

  if (!currentSet) {
    return null
  }

  return (
    <CurrentFocusProvider value={currentSet}>{children}</CurrentFocusProvider>
  )
}

export const useCurrentFocus = createContextHook(
  CurrentFocusContext,
  'CurrentFocusContext',
)
