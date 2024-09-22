import { ReactNode, useEffect, useState } from 'react'

import { FocusContext, FocusInterval } from '@increaser/ui/focus/FocusContext'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { DemoProject } from '@increaser/demo/projects'
import { useFocusIntervals } from '@increaser/app/focus/hooks/useFocusIntervals'

interface Props {
  children: ReactNode
}

export const DemoFocusProvider = ({ children }: Props) => {
  const [intervals, setIntervals] = useFocusIntervals()
  useEffect(() => {
    setIntervals([
      {
        start: Date.now() - convertDuration(45, 'min', 'ms'),
        projectId: DemoProject.Content,
        taskId: null,
        end: null,
      },
    ])
  }, [])

  if (!intervals) return null

  return (
    <FocusContext.Provider
      value={{
        start: () => {},
        pause: () => {},
        resume: () => {},
        reduceLastInterval: () => {},
        stop,
        cancel: () => {},
      }}
    >
      {children}
    </FocusContext.Provider>
  )
}
