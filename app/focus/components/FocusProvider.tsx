import { trackEvent } from 'analytics'
import {
  CurrentSet,
  FocusContext,
  StartFocusParams,
  StopFocusParams,
} from 'focus/context/FocusContext'
import {
  FocusDuration,
  defaultFocusDuration,
  focusDurations,
  increaseFocusDuration,
} from 'focus/FocusDuration'
import { ReactNode, useCallback, useEffect, useState } from 'react'
import { Path } from 'router/Path'
import { getBlocks, getNextFocusDuration } from 'sets/Block'
import { getSetDuration } from 'sets/helpers/getSetDuration'
import { useSetsManager } from 'sets/hooks/useSetsManager'
import { useTodaySets } from 'sets/hooks/useTodaySets'
import { useBrowserNotifications } from 'shared/hooks/useBrowserNotifcations'
import { getLast } from 'shared/utils/getLast'
import { isNotificationAllowed } from 'shared/utils/notification'
import { PersistentStorageKey } from 'state/persistentStorage'
import { usePersistentStorageValue } from 'state/persistentStorage'
import { MS_IN_MIN } from 'utils/time'

import { useFocusSoundsState } from './FocusSounds/useFocusSoundsState'
import { useRouter } from 'next/router'
import { CurrentFocusGuard } from './CurrentFocusProvider'

interface Props {
  children: ReactNode
}

export const FocusProvider = ({ children }: Props) => {
  const router = useRouter()

  const [focusSoundsState] = useFocusSoundsState()
  const [focusDuration, setFocusDuration] =
    useState<FocusDuration>(defaultFocusDuration)
  const [initialFocusDuration, setInitialFocusDuration] =
    useState(focusDuration)

  const [hasTimerSoundNotification, setHasTimerSoundNotification] =
    usePersistentStorageValue<boolean>(
      PersistentStorageKey.HasTimerSoundNotification,
      true,
    )

  const todaySets = useTodaySets()

  const [hasTimerBrowserNotification, setHasTimerBrowserNotification] =
    usePersistentStorageValue<boolean>(
      PersistentStorageKey.HasTimerBrowserNotification,
      isNotificationAllowed(),
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
      trackEvent('Start focus session', {
        duration: focusDuration,
      })
      setCurrentSet({ projectId, startedAt: Date.now() })
      if (duration) {
        setFocusDuration(duration as FocusDuration)
      }
      setInitialFocusDuration((duration as FocusDuration) || focusDuration)
      router.push(Path.Focus)
    },
    [focusDuration, router],
  )

  useEffect(() => {
    // TODO: move to ActiveFocusProvider
    if (!currentSet) return

    if (focusDuration >= getLast(focusDurations)) return

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

  const { create: createSet } = useSetsManager()

  const cancel = useCallback(() => {
    setCurrentSet(undefined)
    router.push(Path.Home)
  }, [router])

  const stop = useCallback(
    (params: StopFocusParams = {}) => {
      if (!currentSet) return

      router.push(Path.Home)
      const set = {
        start: currentSet.startedAt,
        end: Date.now(),
        projectId: currentSet.projectId,
        ...params?.setOverride,
      }
      const blocks = getBlocks([...todaySets, set])

      createSet(set)

      setCurrentSet(undefined)

      setFocusDuration(getNextFocusDuration(blocks))

      trackEvent('Finish focus session', {
        duration: Math.round(getSetDuration(set) / MS_IN_MIN),
        activeSoundUrl: focusSoundsState.activeSoundUrl,
      })
    },
    [createSet, currentSet, focusSoundsState.activeSoundUrl, todaySets, router],
  )

  return (
    <FocusContext.Provider
      value={{
        start,
        initialFocusDuration,
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
