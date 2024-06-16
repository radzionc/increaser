import { ComponentWithChildrenProps } from '@lib/ui/props'
import { GoalsTimelinContext } from './state/GoalsTimelineContext'
import { useMemo } from 'react'
import { useAssertUserState } from '../../user/UserStateContext'
import { fromDay, stringToDay } from '@lib/utils/time/Day'
import { getGoalDeadlineTimestamp } from '@increaser/entities-utils/goal/getGoalDeadlineTimestamp'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { getUserAgeAt } from '@increaser/entities-utils/user/getUserAgeAt'
import { addYears } from 'date-fns'
import { range } from '@lib/utils/array/range'
import { order } from '@lib/utils/array/order'
import { getLastItem } from '@lib/utils/array/getLastItem'
import { useActiveGoals } from '../hooks/useActiveGoals'
import { isEmpty } from '@lib/utils/array/isEmpty'

const maxLabelsCount = 10

export const GoalsTimelineProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const goals = useActiveGoals()
  const { dob: potentialDob } = useAssertUserState()
  const dob = shouldBePresent(potentialDob)

  const [start, minEnd] = useMemo(() => {
    const dobDate = fromDay(stringToDay(dob))

    const userAge = getUserAgeAt({
      dob,
      at: Date.now(),
    })
    let start = addYears(dobDate, userAge).getTime()

    let end = addYears(dobDate, userAge + 3).getTime()
    if (!isEmpty(goals)) {
      const orderedDeadlines = order(
        goals.map(({ deadlineAt }) =>
          getGoalDeadlineTimestamp({
            deadlineAt,
            dob,
          }),
        ),
        (v) => v,
        'asc',
      )
      start = Math.min(
        start,
        addYears(
          dobDate,
          getUserAgeAt({
            dob,
            at: orderedDeadlines[0],
          }) - 1,
        ).getTime(),
      )

      end = Math.max(
        end,
        addYears(
          dobDate,
          getUserAgeAt({
            dob,
            at: getLastItem(orderedDeadlines),
          }) + 1,
        ).getTime(),
      )
    }

    return [start, end]
  }, [dob, goals])

  const [step, count] = useMemo(() => {
    const startAge = getUserAgeAt({ dob, at: start })
    const endAge = getUserAgeAt({ dob, at: minEnd })

    const initialStepCount = endAge - startAge + 1

    const step = Math.ceil(initialStepCount / maxLabelsCount)

    return [step, Math.ceil(initialStepCount / step)]
  }, [dob, minEnd, start])

  const interval = useMemo(
    () => ({
      start,
      end: addYears(start, step * count).getTime(),
    }),
    [count, start, step],
  )

  const timeLabels = useMemo(() => {
    return range(count).map((i) => addYears(start, i * step).getTime())
  }, [count, start, step])

  return (
    <GoalsTimelinContext.Provider
      value={{
        dob,
        interval,
        timeLabels,
      }}
    >
      {children}
    </GoalsTimelinContext.Provider>
  )
}
