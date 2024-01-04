import { analytics } from '@increaser/app/analytics'
import {
  CurrentSet,
  FocusContext,
  StartFocusParams,
  StopFocusParams,
} from '@increaser/app/focus/context/FocusContext'
import {
  FocusDuration,
  defaultFocusDuration,
  focusDurations,
  increaseFocusDuration,
} from '@increaser/app/focus/FocusDuration'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { getBlocks, getNextFocusDuration } from '@increaser/app/sets/Block'
import { getSetDuration } from '@increaser/app/sets/helpers/getSetDuration'
import { useTodaySets } from '@increaser/app/sets/hooks/useTodaySets'
import { useBrowserNotifications } from '@lib/ui/hooks/useBrowserNotifcations'
import { PersistentStateKey } from '@increaser/app/state/persistentState'
import { usePersistentState } from '@increaser/app/state/persistentState'
import { MS_IN_MIN } from '@lib/utils/time'

import { useFocusSoundsState } from './FocusSounds/useFocusSoundsState'
import { useRouter } from 'next/router'
import { CurrentFocusGuard } from './CurrentFocusProvider'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { areNotificationsAllowed } from '@lib/ui/notifications/utils'
import { useAddSetMutation } from '@increaser/app/sets/hooks/useAddSetMutation'
import { AppPath } from '@increaser/ui/navigation/AppPath'

interface Props {
  children: ReactNode
}

export const FocusProvider = ({ children }: Props) => {
  const router = useRouter()

  const [focusSoundsState] = useFocusSoundsState()
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
    ({ projectId, duration }: StartFocusParams) => {
      analytics.trackEvent('Start focus session', {
        duration: focusDuration,
      })
      setCurrentSet({ projectId, startedAt: Date.now() })
      if (duration) {
        setFocusDuration(duration as FocusDuration)
      }
      router.push(AppPath.Focus)
    },
    [focusDuration, router],
  )

  useEffect(() => {
    // TODO: move to ActiveFocusProvider
    if (!currentSet) return

    if (focusDuration >= getLastItem(focusDurations)) return

    const increaseDurationIn =
      currentSet.startedAt + focusDuration * MS_IN_MIN - Date.now()

    if (increaseDurationIn < 0) {
      setFocusDuration(increaseFocusDuration(focusDuration))
      return
    }

    const timeout = setTimeout(() => {
      setFocusDuration(increaseFocusDuration(focusDuration))
    }, increaseDurationIn)

    return () => clearTimeout(timeout)
  }, [currentSet, focusDuration, setFocusDuration])

  const updateStartTime = useCallback((startedAt: number) => {
    setCurrentSet((set) => (set ? { ...set, startedAt } : set))
  }, [])

  const updateProject = useCallback((projectId: string) => {
    setCurrentSet((set) => (set ? { ...set, projectId } : set))
  }, [])

  const { mutate: addSet } = useAddSetMutation()

  const cancel = useCallback(() => {
    setCurrentSet(undefined)
    router.push(AppPath.Home)
  }, [router])

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

      setCurrentSet(undefined)

      setFocusDuration(getNextFocusDuration(blocks))

      analytics.trackEvent('Finish focus session', {
        duration: Math.round(getSetDuration(set) / MS_IN_MIN),
        activeSoundUrl: focusSoundsState.activeSoundUrl,
      })
    },
    [addSet, currentSet, focusSoundsState.activeSoundUrl, todaySets, router],
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
