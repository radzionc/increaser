import { ReactNode, useState } from 'react'

import { FocusDuration } from '@increaser/entities/FocusDuration'
import { FocusContext, FocusInterval } from '@increaser/ui/focus/FocusContext'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { DemoProject } from '@increaser/demo/projects'

interface Props {
  children: ReactNode
}

export const DemoFocusProvider = ({ children }: Props) => {
  const [focusDuration, setFocusDuration] = useState<FocusDuration>(90)

  const [intervals] = useState<FocusInterval[]>([
    {
      start: Date.now() - convertDuration(45, 'min', 'ms'),
      projectId: DemoProject.Content,
      taskId: null,
      end: null,
    },
  ])

  return (
    <FocusContext.Provider
      value={{
        start: () => {},
        pause: () => {},
        resume: () => {},
        reduceLastInterval: () => {},
        stop,
        cancel: () => {},
        intervals,
        focusDuration,
        setFocusDuration,
      }}
    >
      {children}
    </FocusContext.Provider>
  )
}
