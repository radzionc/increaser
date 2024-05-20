import { ReactNode, useCallback, useState } from 'react'

import { FocusDuration } from '@increaser/entities/FocusDuration'
import { CurrentSet, FocusContext } from '@increaser/ui/focus/FocusContext'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { DemoProject } from '@increaser/demo/projects'
import { CurrentFocusGuard } from '@increaser/ui/focus/CurrentFocusProvider'

interface Props {
  children: ReactNode
}

export const DemoFocusProvider = ({ children }: Props) => {
  const [focusDuration, setFocusDuration] = useState<FocusDuration>(90)

  const [currentSet, setCurrentSet] = useState<CurrentSet>({
    startedAt: Date.now() - convertDuration(45, 'min', 'ms'),
    projectId: DemoProject.Content,
  })

  const updateStartTime = useCallback((startedAt: number) => {
    setCurrentSet((set) => (set ? { ...set, startedAt } : set))
  }, [])

  const updateProject = useCallback((projectId: string) => {
    setCurrentSet((set) => (set ? { ...set, projectId } : set))
  }, [])

  return (
    <FocusContext.Provider
      value={{
        start: () => {},
        updateStartTime,
        updateProject,
        updateTask: () => {},
        stop,
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
      <CurrentFocusGuard>{children}</CurrentFocusGuard>
    </FocusContext.Provider>
  )
}
