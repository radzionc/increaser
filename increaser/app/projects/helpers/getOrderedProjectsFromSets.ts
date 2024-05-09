import { Set } from '@increaser/entities/User'
import { getProjectsTotalRecord } from './getProjectsTotalRecord'

export const getOrderedProjectsFromSets = (sets: Set[]) => {
  const projects = getProjectsTotalRecord(sets)
  return Object.entries(projects)
    .sort((a, b) => a[1] - b[1])
    .map(([key]) => key)
}
