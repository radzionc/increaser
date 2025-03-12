import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { findBy } from '@lib/utils/array/findBy'
import { useCallback, useMemo } from 'react'

import {
  PersistentStateKey,
  usePersistentState,
} from '../../../../state/persistentState'
import { useActiveProjects } from '../../../hooks/useActiveProjects'

export const useProjectFilter = () => {
  const activeProjects = useActiveProjects()

  return useStateCorrector(
    usePersistentState<string | null>(PersistentStateKey.ProjectFilter, null),
    useCallback(
      (projectId) => {
        if (projectId && !findBy(activeProjects, 'id', projectId)) {
          return null
        }

        return projectId
      },
      [activeProjects],
    ),
  )
}

export function useFilterByProject<T>(
  items: T[],
  getProjectId: (item: T) => string,
) {
  const [projectId] = useProjectFilter()

  return useMemo(() => {
    if (!projectId) {
      return items
    }

    return items.filter((item) => getProjectId(item) === projectId)
  }, [getProjectId, items, projectId])
}
