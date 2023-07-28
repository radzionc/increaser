import { useProjects } from 'projects/hooks/useProjects'
import { useMemo } from 'react'
import { sum } from 'shared/utils/sum'
import { useAssertUserState } from 'user/state/UserStateContext'
import { getMinutesAllocatedToProjects } from 'weekTimeAllocation/helpers/getMinutesAllocatedToProjects'

export const useWeekTimeAllocation = () => {
  const { weekTimeAllocation } = useAssertUserState()

  const { allocatedProjects } = useProjects()

  const allocatedMinutes = useMemo(
    () => getMinutesAllocatedToProjects(allocatedProjects),
    [allocatedProjects],
  )

  const totalMinutes = useMemo(
    () => sum(weekTimeAllocation),
    [weekTimeAllocation],
  )

  return {
    allocation: weekTimeAllocation,
    totalMinutes,
    allocatedMinutes,
    freeMinutes: Math.max(totalMinutes - allocatedMinutes, 0),
  } as const
}
