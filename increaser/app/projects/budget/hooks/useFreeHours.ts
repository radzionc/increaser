import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { sum } from '@lib/utils/array/sum'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useWeekTimeAllocation } from '../../../weekTimeAllocation/hooks/useWeekTimeAllocation'

export const useFreeHours = () => {
  const { activeProjects } = useProjects()

  const { totalMinutes } = useWeekTimeAllocation()

  const allocatedMinutes = sum(
    activeProjects.map((p) => p.allocatedMinutesPerWeek),
  )

  return convertDuration(totalMinutes - allocatedMinutes, 'min', 'h')
}
