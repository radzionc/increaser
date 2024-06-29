import { ComponentWithChildrenProps } from '@lib/ui/props'
import {
  FocusLauncherMutableState,
  FocusLauncherContext,
} from './state/FocusLauncherContext'
import {
  PersistentStateKey,
  usePersistentState,
} from '@increaser/ui/state/persistentState'
import { useActiveProjects } from '@increaser/ui/projects/hooks/useActiveProjects'

export const FocusLauncherProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const projects = useActiveProjects()
  const [state, setState] = usePersistentState<FocusLauncherMutableState>(
    PersistentStateKey.FocusLauncher,
    {
      projectId: projects[0].id,
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
