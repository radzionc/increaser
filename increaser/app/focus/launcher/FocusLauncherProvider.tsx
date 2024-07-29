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
import { useTodayIncompleteTasks } from '@increaser/ui/tasks/hooks/useTodayIncompleteTasks'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'

export const FocusLauncherProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const activeProjects = useActiveProjects()
  const tasks = useTodayIncompleteTasks()

  const [state, setState] = useStateCorrector(
    usePersistentState<FocusLauncherMutableState>(
      PersistentStateKey.FocusLauncher,
      {
        projectId: activeProjects[0].id,
        taskId: null,
        startedAt: null,
        focusEntity: 'project',
      },
    ),
    (state) => {
      if (!activeProjects.find((project) => project.id === state.projectId)) {
        return {
          ...state,
          projectId: activeProjects[0].id,
          taskId: null,
        }
      }

      if (state.taskId && !tasks.find((task) => task.id === state.taskId)) {
        return {
          ...state,
          projectId: activeProjects[0].id,
          taskId: null,
        }
      }

      return state
    },
  )

  return (
    <FocusLauncherContext.Provider value={{ ...state, setState }}>
      {children}
    </FocusLauncherContext.Provider>
  )
}
