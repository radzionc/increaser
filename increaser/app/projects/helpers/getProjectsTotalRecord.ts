import { getSetDuration } from '@increaser/entities-utils/set/getSetDuration'
import { Set } from '@increaser/app/sets/Set'

export const getProjectsTotalRecord = (sets: Set[]) =>
  sets.reduce(
    (acc, set) => ({
      ...acc,
      [set.projectId]: (acc[set.projectId] || 0) + getSetDuration(set),
    }),
    {} as Record<string, number>,
  )
