import { analytics } from '@increaser/app/analytics'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { getBlocks, getNextFocusDuration } from '@increaser/app/sets/Block'
import { getSetDuration } from '@increaser/entities-utils/set/getSetDuration'
import { useTodaySets } from '@increaser/app/sets/hooks/useTodaySets'
import { useBrowserNotifications } from '@lib/ui/hooks/useBrowserNotifcations'
import { PersistentStateKey } from '@increaser/ui/state/persistentState'
import { usePersistentState } from '@increaser/ui/state/persistentState'
import { MS_IN_MIN } from '@lib/utils/time'

import { useRouter } from 'next/router'
import { areNotificationsAllowed } from '@lib/ui/notifications/utils'
import { useAddSetMutation } from '@increaser/app/sets/hooks/useAddSetMutation'
import { AppPath } from '@increaser/ui/navigation/AppPath'
import {
  FocusDuration,
  defaultFocusDuration,
} from '@increaser/entities/FocusDuration'
import {
  CurrentSet,
  FocusContext,
  StartFocusParams,
  StopFocusParams,
} from '@increaser/ui/focus/FocusContext'
import { CurrentFocusGuard } from '@increaser/ui/focus/CurrentFocusProvider'
import { useUpdateTaskMutation } from '../../tasks/api/useUpdateTaskMutation'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { omit } from '@lib/utils/record/omit'

interface Props {
  children: ReactNode
}

export const FocusProvider = ({ children }: Props) => {
  const router = useRouter()

  const [focusDuration, setFocusDuration] =
    useState<FocusDuration>(defaultFocusDuration)

  const [hasTimerSoundNotification, setHasTimerSoundNotification] =
    usePersistentState<boolean>(
      PersistentStateKey.HasTimerSoundNotification,
      true,
    )

  const todaySets = useTodaySets()

  const [hasTimerBrowserNotification, setHasTimerBrowserNotification] =
    usePersistentState<boolean>(
      PersistentStateKey.HasTimerBrowserNotification,
      areNotificationsAllowed(),
    )

  const { permission } = useBrowserNotifications()

  useEffect(() => {
    if (permission && permission !== 'granted' && hasTimerBrowserNotification) {
      setHasTimerBrowserNotification(false)
    }
  }, [hasTimerBrowserNotification, permission, setHasTimerBrowserNotification])

  const [currentSet, setCurrentSet] = useState<CurrentSet | undefined>()

  const start = useCallback(
    ({ projectId, duration, taskId }: StartFocusParams) => {
      analytics.trackEvent('Start focus session', {
        duration: focusDuration,
      })
      setCurrentSet({ projectId, startedAt: Date.now(), taskId })
      if (duration) {
        setFocusDuration(duration as FocusDuration)
      }
      router.push(AppPath.Focus)
    },
    [focusDuration, router],
  )

  const updateStartTime = useCallback((startedAt: number) => {
    setCurrentSet((set) => (set ? { ...set, startedAt } : set))
  }, [])

  const updateProject = useCallback((projectId: string) => {
    setCurrentSet((set) => (set ? { ...set, projectId } : set))
  }, [])

  const { mutate: addSet } = useAddSetMutation()
  const { mutate: updateTask } = useUpdateTaskMutation()

  const cancel = useCallback(() => {
    setCurrentSet(undefined)
    router.push(AppPath.Home)
  }, [router])

  const { tasks } = useAssertUserState()

  useEffect(() => {
    if (!currentSet) return

    const task = Object.values(tasks).find(
      (task) => task.id === currentSet.taskId,
    )

    if (!task) return

    if (task.completedAt) {
      setCurrentSet(omit(currentSet, 'taskId'))
      updateTask({
        id: task.id,
        fields: {
          spentTime:
            (task.spentTime || 0) + (Date.now() - currentSet.startedAt),
        },
      })
    }
  }, [currentSet, tasks, updateTask])

  const stop = useCallback(
    (params: StopFocusParams = {}) => {
      if (!currentSet) return

      router.push(AppPath.Home)
      const set = {
        start: currentSet.startedAt,
        end: Date.now(),
        projectId: currentSet.projectId,
        ...params?.setOverride,
      }
      const blocks = getBlocks([...todaySets, set])

      addSet(set)

      const task = Object.values(tasks).find(
        (task) => task.id === currentSet.taskId,
      )

      if (task) {
        updateTask({
          id: task.id,
          fields: {
            spentTime: (task.spentTime || 0) + getSetDuration(set),
          },
        })
      }

      setCurrentSet(undefined)

      setFocusDuration(getNextFocusDuration(blocks))

      analytics.trackEvent('Finish focus session', {
        duration: Math.round(getSetDuration(set) / MS_IN_MIN),
      })
    },
    [addSet, currentSet, router, tasks, todaySets, updateTask],
  )

  return (
    <FocusContext.Provider
      value={{
        start,
        updateStartTime,
        updateProject,
        stop,
        cancel,
        currentSet,
        focusDuration,
        setFocusDuration,
        setHasTimerSoundNotification,
        hasTimerBrowserNotification,
        setHasTimerBrowserNotification,
        hasTimerSoundNotification,
      }}
    >
      {currentSet ? (
        <CurrentFocusGuard>{children}</CurrentFocusGuard>
      ) : (
        <>{children}</>
      )}
    </FocusContext.Provider>
  )
}
