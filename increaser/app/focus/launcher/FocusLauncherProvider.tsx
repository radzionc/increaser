import { ComponentWithChildrenProps } from '@lib/ui/props'
import {
  FocusLauncherMutableState,
  FocusLauncherContext,
} from './state/FocusLauncherContext'
import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'

export const FocusLauncherProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const [state, setState] = usePersistentState<FocusLauncherMutableState>(
    PersistentStateKey.FocusLauncher,
    {
      projectId: null,
      taskId: null,
      startedAt: null,
      focusEntity: 'project',
    },
  )

  return (
    <FocusLauncherContext.Provider value={{ ...state, setState }}>
      {children}
    </FocusLauncherContext.Provider>
  )
}
