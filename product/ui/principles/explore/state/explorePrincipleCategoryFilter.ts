import { useMemo } from 'react'

import {
  PersistentStateKey,
  usePersistentState,
} from '../../../state/persistentState'

export const useExlorePrincipleCategoryFilter = () => {
  return usePersistentState<string | null>(
    PersistentStateKey.ExplorePrincipleCategoryFilter,
    null,
  )
}

export function useFilterByExplorePrincipleCategory<T>(
  items: T[],
  getPrincipleCategoryId: (item: T) => string,
) {
  const [categoryId] = useExlorePrincipleCategoryFilter()

  return useMemo(() => {
    if (!categoryId) {
      return items
    }

    return items.filter((item) => getPrincipleCategoryId(item) === categoryId)
  }, [categoryId, getPrincipleCategoryId, items])
}
