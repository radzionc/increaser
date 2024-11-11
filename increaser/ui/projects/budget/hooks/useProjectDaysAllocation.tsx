import { useMemo } from 'react'
import { useCurrentProject } from '@increaser/ui/projects/CurrentProjectProvider'
import { range } from '@lib/utils/array/range'
import { sum } from '@lib/utils/array/sum'
import { useUser } from '@increaser/ui/user/state/user'
import { getWorkBudgetTotal } from '@increaser/entities-utils/workBudget/getWorkBudgetTotal'
import { useActiveProjects } from '../../hooks/useActiveProjects'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { D_IN_WEEK } from '@lib/utils/time'

export const useProjectDaysAllocation = () => {
  const activeProjects = useActiveProjects()

  const { workingDays } = useCurrentProject()

  const { workdayHours, weekendHours, weekends } = useUser()

  return useMemo(() => {
    const weekendsNumber = weekends.length
    const workdaysNumber = D_IN_WEEK - weekendsNumber
    if (workingDays === 'workdays') {
      return range(workdaysNumber).map(() => 1 / workdaysNumber)
    }

    const workBudgetTotal = getWorkBudgetTotal({
      workdayHours,
      weekendHours,
      weekends,
    })

    const plannedWorkdaysShare =
      (workdayHours * workdaysNumber) / workBudgetTotal
    const plannedWeekendsShare = 1 - plannedWorkdaysShare

    const totalBudget = Math.max(
      sum(activeProjects.map((project) => project.allocatedMinutesPerWeek)),
      convertDuration(workBudgetTotal, 'h', 'min'),
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
  }, [activeProjects, weekendHours, weekends, workdayHours, workingDays])
}
