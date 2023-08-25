import { CurrentSet } from 'focus/context/FocusContext'
import { createContext, useEffect } from 'react'
import { ComponentWithChildrenProps } from '@increaser/ui/shared/props'
import { MS_IN_MIN } from '@increaser/utils/time'
import { useFocus } from 'focus/hooks/useFocus'
import { useProject } from 'projects/hooks/useProject'
import { tryToSay } from '@increaser/ui/notifications/utils/tryToSay'
import { useAssertUserState } from 'user/state/UserStateContext'
import { createContextHook } from '@increaser/ui/state/createContextHook'
import { useRouter } from 'next/router'
import { Path } from 'router/Path'
import { range } from '@increaser/utils/range'
import { showNotification } from '@increaser/ui/notifications/utils'
import { pluralize } from '@increaser/utils/pluralize'
import { tryToPlaySound } from '@increaser/ui/notifications/utils/tryToPlaySound'

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
      router.replace(Path.Landing)
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
