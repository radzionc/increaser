import { makeUseMemoCallback } from '@lib/ui/state/makeUseMemoCallback'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { groupItems } from '@lib/utils/array/groupItems'
import { omit } from '@lib/utils/record/omit'
import { recordFromKeys } from '@lib/utils/record/recordFromKeys'
import { toEntries } from '@lib/utils/record/toEntries'
import { withoutUndefinedFields } from '@lib/utils/record/withoutUndefinedFields'
import { useActiveProjects } from '@product/ui/projects/hooks/useActiveProjects'
import {
  usePersistentState,
  PersistentStateKey,
} from '@product/ui/state/persistentState'
import { useUncompleteTasks } from '@product/ui/tasks/useUncompleteTasks'
import { useMemo } from 'react'

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
      () => {
        return withoutUndefinedFields(
          recordFromKeys(
            Array.from(projectIds),
            (id) => tasksByProjectId[id]?.[0]?.id,
          ),
        )
      },
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
