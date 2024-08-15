import { useProjectFilter } from './ProjectFilterProvider'

export function useFilterByProject<T>(
  items: T[],
  getProjectId: (item: T) => string,
) {
  const [projectId] = useProjectFilter()

  if (!projectId) {
    return items
  }

  return items.filter((item) => getProjectId(item) === projectId)
}
