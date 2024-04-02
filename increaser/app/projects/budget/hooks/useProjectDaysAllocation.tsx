import { useMemo } from 'react'
import { useWeekTimeAllocation } from '../../../weekTimeAllocation/hooks/useWeekTimeAllocation'
import { useCurrentProject } from '../../components/ProjectView/CurrentProjectProvider'
import { range } from '@lib/utils/array/range'
import { weekendsNumber, workdaysNumber } from '@lib/utils/time/isWorkday'
import { sum } from '@lib/utils/array/sum'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'

export const useProjectDaysAllocation = () => {
  const { activeProjects } = useProjects()

  const { workingDays } = useCurrentProject()

  const { allocation, totalMinutes } = useWeekTimeAllocation()

  return useMemo(() => {
    if (workingDays === 'workdays') {
      return range(workdaysNumber).map(() => 1 / workdaysNumber)
    }

    const plannedWorkdaysShare =
      sum(allocation.slice(0, workdaysNumber)) / totalMinutes
    const plannedWeekendsShare =
      sum(allocation.slice(workdaysNumber)) / totalMinutes

    const totalBudget = sum(
      activeProjects.map((project) => project.allocatedMinutesPerWeek),
    )
    const workdaysProjectsBudget = sum(
      activeProjects
        .filter((project) => project.workingDays === 'workdays')
        .map((project) => project.allocatedMinutesPerWeek),
    )

    const workdaysProjectsShare = workdaysProjectsBudget / totalBudget
    console.log('workdaysProjectsShare', workdaysProjectsShare)

    const adjustedWorkdayShare = Math.max(
      0,
      plannedWorkdaysShare - workdaysProjectsShare,
    )
    const [realWorkdaysShare, realWeekendsShare] = [
      adjustedWorkdayShare,
      plannedWeekendsShare,
    ].map((share) => share / (adjustedWorkdayShare + plannedWeekendsShare))

    return [
      ...range(workdaysNumber).map(() => realWorkdaysShare / workdaysNumber),
      ...range(weekendsNumber).map(() => realWeekendsShare / weekendsNumber),
    ]
  }, [activeProjects, allocation, totalMinutes, workingDays])
}
