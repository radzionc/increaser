import { makeUseMemoCallback } from '@lib/ui/state/makeUseMemoCallback'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { useActiveProjects } from '@product/ui/projects/hooks/useActiveProjects'
import {
  usePersistentState,
  PersistentStateKey,
} from '@product/ui/state/persistentState'
import { useMemo } from 'react'

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
