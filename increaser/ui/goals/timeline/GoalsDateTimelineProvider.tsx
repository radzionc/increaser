import { ComponentWithChildrenProps } from '@lib/ui/props'
import { GoalsTimelinContext } from './state/GoalsTimelineContext'
import { useMemo } from 'react'
import { useFilteredScheduledGoals } from '../filter/useFilteredScheduledGoals'
import { isEmpty } from '@lib/utils/array/isEmpty'
import { order } from '@lib/utils/array/order'
import { getGoalDeadlineTimestamp } from '@increaser/entities-utils/goal/getGoalDeadlineTimestamp'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { startOfYear, addYears, differenceInYears } from 'date-fns'
import { useUser } from '../../user/state/user'
import { range } from '@lib/utils/array/range'

const maxLabelsCount = 10

export const GoalsDateTimelineProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const goals = useFilteredScheduledGoals()
  const { dob } = useUser()

  const [start, minEnd] = useMemo(() => {
    const now = Date.now()
    let start = startOfYear(now).getTime()
    let end = addYears(start, 3).getTime()

    if (!isEmpty(goals)) {
      const orderedDeadlines = order(
        goals.map(({ deadlineAt }) =>
          getGoalDeadlineTimestamp({ deadlineAt, dob }),
        ),
        (deadline) => deadline,
        'asc',
      )
      const earliestDeadline = orderedDeadlines[0]
      if (earliestDeadline < start) {
        start = startOfYear(earliestDeadline).getTime()
      }

      const latestDeadline = getLastItem(orderedDeadlines)
      if (latestDeadline > end) {
        end = addYears(startOfYear(latestDeadline), 1).getTime()
      }
    }

    return [start, end]
  }, [dob, goals])

  const [step, count] = useMemo(() => {
    const yearsDiff = differenceInYears(minEnd, start) || 1
    const step = Math.ceil(yearsDiff / maxLabelsCount) || 1
    const count = Math.ceil(yearsDiff / step)
    return [step, count]
  }, [minEnd, start])

  const interval = useMemo(
    () => ({
      start,
      end: addYears(start, step * count).getTime(),
    }),
    [start, step, count],
  )

  const timeLabels = useMemo(() => {
    return range(count + 1).map((i) => addYears(start, i * step).getTime())
  }, [count, start, step])

  return (
    <GoalsTimelinContext.Provider
      value={{
        interval,
        timeLabels,
      }}
    >
      {children}
    </GoalsTimelinContext.Provider>
  )
}
