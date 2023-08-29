import { CurrentSet, FocusContext } from 'focus/context/FocusContext'
import {
  defaultFocusDuration,
  focusDurations,
  increaseFocusDuration,
} from 'focus/FocusDuration'
import { useEffect, useMemo, useState } from 'react'
import { ComponentWithChildrenProps } from '@increaser/ui/props'
import { MS_IN_MIN } from '@increaser/utils/time'

import { PreviewUserProject } from '../LandingUserStateProvider'
import { CurrentFocusContext } from 'focus/components/CurrentFocusProvider'
import { getLastItem } from '@increaser/utils/array/getLastItem'

export const LandingPageFocusProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const [focusDuration, setFocusDuration] = useState(defaultFocusDuration)

  const currentSet: CurrentSet = useMemo(() => {
    return {
      projectId: PreviewUserProject.Content,
      startedAt: Date.now() - (defaultFocusDuration - 0.08) * MS_IN_MIN,
    }
  }, [])

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

  return (
    <FocusContext.Provider
      value={{
        start: () => {},
        initialFocusDuration: defaultFocusDuration,
        updateStartTime: () => {},
        updateProject: () => {},
        stop: () => {},
        cancel: () => {},
        currentSet,
        focusDuration,
        setFocusDuration,
        setHasTimerSoundNotification: () => {},
        hasTimerBrowserNotification: false,
        setHasTimerBrowserNotification: () => {},
        hasTimerSoundNotification: false,
      }}
    >
      <CurrentFocusContext.Provider value={currentSet}>
        {children}
      </CurrentFocusContext.Provider>
    </FocusContext.Provider>
  )
}
