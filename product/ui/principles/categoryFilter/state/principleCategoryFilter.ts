import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { useUser } from '@product/ui/user/state/user'
import { useCallback, useMemo } from 'react'

import {
  PersistentStateKey,
  usePersistentState,
} from '../../../state/persistentState'

export const usePrincipleCategoryFilter = () => {
  const { principleCategories } = useUser()

  return useStateCorrector(
    usePersistentState<string | null>(
      PersistentStateKey.PrincipleCategoryFilter,
      null,
    ),
    useCallback(
      (id) => {
        if (id && !(id in principleCategories)) {
          return null
        }

        return id
      },
      [principleCategories],
    ),
  )
}

export function useFilterByPrincipleCategory<T>(
  items: T[],
  getPrincipleCategoryId: (item: T) => string,
) {
  const [projectId] = usePrincipleCategoryFilter()

  return useMemo(() => {
    if (!projectId) {
      return items
    }

    return items.filter((item) => getPrincipleCategoryId(item) === projectId)
  }, [getPrincipleCategoryId, items, projectId])
}
