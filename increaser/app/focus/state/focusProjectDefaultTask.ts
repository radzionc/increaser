import { useActiveProjects } from '@increaser/ui/projects/hooks/useActiveProjects'
import {
  usePersistentState,
  PersistentStateKey,
} from '@increaser/ui/state/persistentState'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { useFocusTasks } from '../tasks/useFocusTasks'
import { useMemo } from 'react'
import { makeUseMemoCallback } from '@lib/ui/state/makeUseMemoCallback'
import { toEntries } from '@lib/utils/record/toEntries'
import { omit } from '@lib/utils/record/omit'

const useCallback = makeUseMemoCallback()

export const useFocusProjectDefaultTask = () => {
  const activeProjects = useActiveProjects()

  const tasks = useFocusTasks()

  const taskIds = useMemo(() => new Set(tasks.map((task) => task.id)), [tasks])
  const projectIds = useMemo(
    () => new Set(activeProjects.map((project) => project.id)),
    [activeProjects],
  )

  return useStateCorrector(
    usePersistentState<Record<string, string>>(
      PersistentStateKey.FocusProjectDefaultTask,
      {},
    ),
    useCallback(
      (state) => {
        let result = state

        toEntries(result).forEach(({ key, value }) => {
          if (!projectIds.has(key) || !taskIds.has(value)) {
            result = omit(result, key)
          }
        })

        return result
      },
      [projectIds, taskIds],
    ),
  )
}
