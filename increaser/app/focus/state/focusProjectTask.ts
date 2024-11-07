import { useActiveProjects } from '@increaser/ui/projects/hooks/useActiveProjects'
import {
  usePersistentState,
  PersistentStateKey,
} from '@increaser/ui/state/persistentState'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { useMemo } from 'react'
import { makeUseMemoCallback } from '@lib/ui/state/makeUseMemoCallback'
import { toEntries } from '@lib/utils/record/toEntries'
import { omit } from '@lib/utils/record/omit'
import { groupItems } from '@lib/utils/array/groupItems'
import { useUncompleteTasks } from '@increaser/ui/tasks/useUncompleteTasks'

const useCallback = makeUseMemoCallback()

export const useFocusProjectTask = () => {
  const activeProjects = useActiveProjects()

  const tasks = useUncompleteTasks()

  const projectIds = useMemo(
    () => new Set(activeProjects.map((project) => project.id)),
    [activeProjects],
  )

  const tasksByProjectId = useMemo(
    () => groupItems(tasks, (task) => task.projectId),
    [tasks],
  )

  return useStateCorrector(
    usePersistentState<Record<string, string>>(
      PersistentStateKey.FocusProjectTask,
      {},
    ),
    useCallback(
      (state) => {
        let result = state

        toEntries(result).forEach(({ key, value }) => {
          const tasks = tasksByProjectId[key] ?? []

          if (!projectIds.has(key) || !tasks.some(({ id }) => value === id)) {
            result = omit(result, key)
          }
        })

        return result
      },
      [projectIds, tasksByProjectId],
    ),
  )
}
