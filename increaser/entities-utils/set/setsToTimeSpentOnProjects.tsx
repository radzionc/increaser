import {
  TimeSpentOnProjects,
  unknownProjectKey,
} from '@increaser/entities/TrackedTime'
import { Set } from '@increaser/entities/User'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { getSetDuration } from './getSetDuration'

export const setsToTimeSpentOnProjects = (sets: Set[]): TimeSpentOnProjects => {
  const result: TimeSpentOnProjects = {}

  sets.forEach((set) => {
    const key = set.projectId ?? unknownProjectKey
    result[key] =
      (result[key] ?? 0) +
      Math.round(convertDuration(getSetDuration(set), 'ms', 's'))
  })

  return result
}
