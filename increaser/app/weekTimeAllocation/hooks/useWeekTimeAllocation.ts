import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { useMemo } from 'react'
import { sum } from '@lib/utils/array/sum'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { getMinutesAllocatedToProjects } from '@increaser/app/weekTimeAllocation/helpers/getMinutesAllocatedToProjects'

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
