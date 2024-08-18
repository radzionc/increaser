import { useMemo } from 'react'
import { useProjectFilter } from './ProjectFilterProvider'

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
