import { useMemo } from 'react'
import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { range } from '@lib/utils/array/range'
import { sum } from '@lib/utils/array/sum'
import { useProjects } from '@increaser/ui/projects/ProjectsProvider'
import { weekendsNumber, workdaysNumber } from '@lib/utils/time/workweek'
import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { getWorkBudgetTotal } from '@increaser/entities-utils/workBudget/getWorkBudgetTotal'

export const useProjectDaysAllocation = () => {
  const { activeProjects } = useProjects()

  const { workingDays } = useCurrentProject()

  const { workdayHours, weekendHours } = useAssertUserState()

  return useMemo(() => {
    if (workingDays === 'workdays') {
      return range(workdaysNumber).map(() => 1 / workdaysNumber)
    }

    const workBudgetTotal = getWorkBudgetTotal({
      workdayHours,
      weekendHours,
    })

    const plannedWorkdaysShare =
      (workdayHours * workdaysNumber) / workBudgetTotal
    const plannedWeekendsShare = 1 - plannedWorkdaysShare

    const totalBudget = sum(
      activeProjects.map((project) => project.allocatedMinutesPerWeek),
    )
    const workdaysProjectsBudget = sum(
      activeProjects
        .filter((project) => project.workingDays === 'workdays')
        .map((project) => project.allocatedMinutesPerWeek),
    )

    const workdaysProjectsShare = workdaysProjectsBudget / totalBudget

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
  }, [activeProjects, weekendHours, workdayHours, workingDays])
}
