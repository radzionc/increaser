import { EntityWithSeconds } from '@increaser/entities/timeTracking'
import { updateAtIndex } from '@lib/utils/array/updateAtIndex'

type MergeTrackedDataPoint<T extends EntityWithSeconds> = {
  groups: T[]
  dataPoint: T
  areSameGroup: (a: T, b: T) => boolean
}

export const mergeTrackedDataPoint = <T extends EntityWithSeconds>({
  groups,
  dataPoint,
  areSameGroup,
}: MergeTrackedDataPoint<T>) => {
  const existingGroupIndex = groups.findIndex((item) =>
    areSameGroup(item, dataPoint),
  )
  if (existingGroupIndex > -1) {
    return updateAtIndex(groups, existingGroupIndex, (existingGroup) => ({
      ...existingGroup,
      seconds: existingGroup.seconds + dataPoint.seconds,
    }))
  } else {
    return [...groups, dataPoint]
  }
}
