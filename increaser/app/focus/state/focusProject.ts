import { useActiveProjects } from '@increaser/ui/projects/hooks/useActiveProjects'
import {
  usePersistentState,
  PersistentStateKey,
} from '@increaser/ui/state/persistentState'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { useMemo } from 'react'
import { makeUseMemoCallback } from '@lib/ui/state/makeUseMemoCallback'

const useCallback = makeUseMemoCallback()

export const useFocusProject = () => {
  const activeProjects = useActiveProjects()

  const projectIds = useMemo(
    () => new Set(activeProjects.map((project) => project.id)),
    [activeProjects],
  )

  const defaultProjectId = activeProjects[0].id

  return useStateCorrector(
    usePersistentState<string | null>(
      PersistentStateKey.FocusProject,
      defaultProjectId,
    ),
    useCallback(
      (state) => {
        let result = state

        if (state && !projectIds.has(state)) {
          result = defaultProjectId
        }

        return result
      },
      [defaultProjectId, projectIds],
    ),
  )
}
