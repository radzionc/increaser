import { useActiveProjects } from '@increaser/ui/projects/hooks/useActiveProjects'
import {
  usePersistentState,
  PersistentStateKey,
} from '@increaser/ui/state/persistentState'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { findBy } from '@lib/utils/array/findBy'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { useFocusTasks } from '../../tasks/useFocusTasks'

export const focusEntities = ['project', 'task'] as const
export type FocusEntity = (typeof focusEntities)[number]

export type FocusLauncherState = {
  projectId: string
  taskId: string | null
  startedAt: number | null
  focusEntity: FocusEntity
}

export const useFocusLauncher = () => {
  const activeProjects = useActiveProjects()

  const tasks = useFocusTasks()

  return useStateCorrector(
    usePersistentState<FocusLauncherState>(PersistentStateKey.FocusLauncher, {
      projectId: activeProjects[0].id,
      taskId: null,
      startedAt: null,
      focusEntity: 'project',
    }),
    (state) => {
      const hasWrongProject = !findBy(activeProjects, 'id', state.projectId)

      if (state.focusEntity === 'project') {
        if (hasWrongProject) {
          return {
            ...state,
            projectId: activeProjects[0].id,
            taskId: null,
          }
        }
      } else {
        if (hasWrongProject) {
          const task = findBy(tasks, 'id', state.taskId)
          if (task) {
            return {
              ...state,
              projectId: task.projectId,
              taskId: task.id,
            }
          }

          if (!isEmpty(tasks)) {
            const [task] = tasks

            return {
              ...state,
              projectId: task.projectId,
              taskId: task.id,
            }
          }
        }

        const hasWrongTask = !findBy(tasks, 'id', state.taskId)
        if (hasWrongTask) {
          if (!isEmpty(tasks)) {
            const [task] = tasks

            return {
              ...state,
              projectId: task.projectId,
              taskId: task.id,
            }
          }
        }
      }

      return state
    },
  )
}
