import { useActiveProjects } from '@increaser/ui/projects/hooks/useActiveProjects'
import {
  usePersistentState,
  PersistentStateKey,
} from '@increaser/ui/state/persistentState'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { findBy } from '@lib/utils/array/findBy'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { useFocusTasks } from '../tasks/useFocusTasks'
import { useFocusProjectDefaultTask } from './focusProjectDefaultTask'
import { makeUseMemoCallback } from '@lib/ui/state/makeUseMemoCallback'
import { useMemo } from 'react'

export type FocusTarget = {
  projectId: string | null
  taskId: string | null
}

const useCallback = makeUseMemoCallback()

export const useFocusTarget = () => {
  const activeProjects = useActiveProjects()

  const tasks = useFocusTasks()

  const projectIds = useMemo(
    () => new Set(activeProjects.map((project) => project.id)),
    [activeProjects],
  )

  const getInitialState = useCallback((): FocusTarget => {
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

  const [projectDefaultTask] = useFocusProjectDefaultTask()

  return useStateCorrector(
    usePersistentState<FocusTarget>(
      PersistentStateKey.FocusLauncher,
      getInitialState,
    ),
    useCallback(
      (state) => {
        if (state.projectId && !projectIds.has(state.projectId)) {
          return getInitialState()
        }

        if (state.taskId) {
          const task = findBy(tasks, 'id', state.taskId)

          if (!task) {
            let taskId = null
            if (state.projectId) {
              taskId = projectDefaultTask[state.projectId] ?? null
            }

            return {
              ...state,
              taskId,
            }
          }

          if (task.projectId !== state.projectId) {
            if (state.projectId) {
              return {
                ...state,
                projectId: task.projectId,
              }
            } else {
              return {
                taskId: null,
                projectId: null,
              }
            }
          }
        }

        return state
      },
      [getInitialState, projectDefaultTask, projectIds, tasks],
    ),
  )
}
