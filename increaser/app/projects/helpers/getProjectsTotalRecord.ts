import { getSetDuration } from '@increaser/entities-utils/set/getSetDuration'
import { Set } from '@increaser/entities/User'

export const getProjectsTotalRecord = (sets: Set[]) =>
  sets.reduce(
    (acc, set) => ({
      ...acc,
      [set.projectId]: (acc[set.projectId] || 0) + getSetDuration(set),
    }),
    {} as Record<string, number>,
  )
