import { ComponentWithChildrenProps } from '@lib/ui/props'
import { GoalsTimelinContext } from './state/GoalsTimelineContext'
import { useMemo } from 'react'
import { useAssertUserState } from '../../user/UserStateContext'
import { fromDay, stringToDay } from '@lib/utils/time/Day'
import { getGoalDeadlineTimestamp } from '@increaser/entities-utils/goal/getGoalDeadlineTimestamp'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { getUserAgeAt } from '@increaser/entities-utils/user/getUserAgeAt'
import { addYears } from 'date-fns'
import { isRecordEmpty } from '@lib/utils/record/isRecordEmpty'
import { range } from '@lib/utils/array/range'

const maxLabelsCount = 10

export const GoalsTimelineProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const { goals, dob: potentialDob } = useAssertUserState()
  const dob = shouldBePresent(potentialDob)

  const [start, minEnd] = useMemo(() => {
    const dobDate = fromDay(stringToDay(dob))

    const userAge = getUserAgeAt({
      dob,
      at: Date.now(),
    })
    const start = addYears(dobDate, userAge).getTime()

    let end = addYears(dobDate, userAge + 3).getTime()
    if (!isRecordEmpty(goals)) {
      end = Math.max(
        end,
        addYears(
          dobDate,
          getUserAgeAt({
            dob,
            at: Math.max(
              ...Object.values(goals).map((goal) =>
                getGoalDeadlineTimestamp({
                  value: goal.deadlineAt,
                  dob,
                }),
              ),
            ),
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
