import { ReactNode, useState } from 'react'

import { FocusDuration } from '@increaser/entities/FocusDuration'
import { FocusContext, FocusSession } from '@increaser/ui/focus/FocusContext'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { DemoProject } from '@increaser/demo/projects'
import { CurrentFocusGuard } from '@increaser/ui/focus/CurrentFocusProvider'

interface Props {
  children: ReactNode
}

export const DemoFocusProvider = ({ children }: Props) => {
  const [focusDuration, setFocusDuration] = useState<FocusDuration>(90)

  const [session] = useState<FocusSession>({
    intervals: [
      {
        start: Date.now() - convertDuration(45, 'min', 'ms'),
        projectId: DemoProject.Content,
        taskId: null,
        end: null,
      },
    ],
  })

  return (
    <FocusContext.Provider
      value={{
        start: () => {},
        pause: () => {},
        resume: () => {},
        updateProject: () => {},
        updateTask: () => {},
        stop,
        cancel: () => {},
        session,
        focusDuration,
        setFocusDuration,
      }}
    >
      <CurrentFocusGuard>{children}</CurrentFocusGuard>
    </FocusContext.Provider>
  )
}
