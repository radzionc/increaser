import { useActiveProjects } from '@increaser/ui/projects/hooks/useActiveProjects'
import {
  usePersistentState,
  PersistentStateKey,
} from '@increaser/ui/state/persistentState'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { findBy } from '@lib/utils/array/findBy'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { useFocusTasks } from '../../tasks/useFocusTasks'
import { useCallback } from 'react'

export type FocusLauncherState = {
  projectId: string | null
  taskId: string | null
}

export const useFocusLauncher = () => {
  const activeProjects = useActiveProjects()

  const tasks = useFocusTasks()

  const getInitialState = useCallback((): FocusLauncherState => {
    if (!isEmpty(tasks)) {
      const [task] = tasks

      return {
        projectId: task.projectId,
        taskId: task.id,
      }
    }

    return {
      projectId: activeProjects[0].id,
      taskId: null,
    }
  }, [activeProjects, tasks])

  return useStateCorrector(
    usePersistentState<FocusLauncherState>(
      PersistentStateKey.FocusLauncher,
      getInitialState,
    ),
    (state) => {
      if (state.projectId && !findBy(activeProjects, 'id', state.projectId)) {
        return getInitialState()
      }

      if (state.taskId) {
        const task = findBy(tasks, 'id', state.taskId)
        if (!task) {
          if (state.projectId) {
            const projectTasks = tasks.filter(
              (task) => task.projectId === state.projectId,
            )

            if (!isEmpty(projectTasks)) {
              return {
                ...state,
                taskId: projectTasks[0].id,
              }
            }
          }

          return {
            ...state,
            taskId: null,
          }
        }

        if (state.projectId && task.projectId !== state.projectId) {
          return {
            ...state,
            projectId: task.projectId,
          }
        }
      }

      return state
    },
  )
}
