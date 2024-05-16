import { getSetDuration } from '@increaser/entities-utils/set/getSetDuration'
import { Set } from '@increaser/entities/User'
import { sum } from '@lib/utils/array/sum'
import { convertDuration } from '@lib/utils/time/convertDuration'

type GetProjectDoneMinutes = {
  sets: Set[]
  id?: string | null
}

export const getProjectDoneMinutes = ({
  sets,
  id,
}: GetProjectDoneMinutes): number => {
  const projectSets = sets.filter((set) => {
    if (!set.projectId && !id) {
      return true
    }

    return set.projectId === id
  })

  const total = sum(projectSets.map(getSetDuration))

  return convertDuration(total, 'ms', 'min')
}
