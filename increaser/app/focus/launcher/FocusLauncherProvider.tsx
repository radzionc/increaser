import { ComponentWithChildrenProps } from '@lib/ui/props'
import { useState } from 'react'
import {
  FocusLauncherMutableState,
  FocusLauncherContext,
} from './state/FocusLauncherContext'

export const FocusLauncherProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const [state, setState] = useState<FocusLauncherMutableState>({
    projectId: null,
    taskId: null,
  })

  return (
    <FocusLauncherContext.Provider value={{ ...state, setState }}>
      {children}
    </FocusLauncherContext.Provider>
  )
}
