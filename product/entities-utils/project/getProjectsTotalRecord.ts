import { Set } from '@product/entities/User'
import { getSetDuration } from '@product/entities-utils/set/getSetDuration'

export const getProjectsTotalRecord = (sets: Set[]) =>
  sets.reduce(
    (acc, set) => ({
      ...acc,
      [set.projectId]: (acc[set.projectId] || 0) + getSetDuration(set),
    }),
    {} as Record<string, number>,
  )
