import { getSetDuration } from 'sets/helpers/getSetDuration'
import { Set } from 'sets/Set'

export const getProjectsTotalRecord = (sets: Set[]) =>
  sets.reduce(
    (acc, set) => ({
      ...acc,
      [set.projectId]: (acc[set.projectId] || 0) + getSetDuration(set),
    }),
    {} as Record<string, number>,
  )
