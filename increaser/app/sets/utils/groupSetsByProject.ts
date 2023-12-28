import { Set } from '@increaser/app/sets/Set'

export const groupSetsByProject = (sets: Set[]) => {
  const groupedSets: Record<string, Set[]> = {}

  for (const set of sets) {
    if (!groupedSets[set.projectId]) {
      groupedSets[set.projectId] = []
    }

    groupedSets[set.projectId].push(set)
  }

  return groupedSets
}
