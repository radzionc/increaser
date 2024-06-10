import { ComponentWithChildrenProps } from '@lib/ui/props'
import { GoalsTimelinContext } from './state/GoalsTimelineContext'
import { useMemo } from 'react'
import { useAssertUserState } from '../../user/UserStateContext'
import { fromDay, stringToDay } from '@lib/utils/time/Day'
import { getGoalDeadlineTimestamp } from '@increaser/entities-utils/goal/getGoalDeadlineTimestamp'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { getUserAgeAt } from '@increaser/entities-utils/user/getUserAgeAt'
import { addYears } from 'date-fns'
import { Interval } from '@lib/utils/interval/Interval'
import { isRecordEmpty } from '@lib/utils/record/isRecordEmpty'

export const GoalsTimelineProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const { goals, dob: potentialDob } = useAssertUserState()
  const dob = shouldBePresent(potentialDob)

  const interval: Interval = useMemo(() => {
    const dobDate = fromDay(stringToDay(dob))

    const userAge = getUserAgeAt({
      dob,
      at: Date.now(),
    })
    const lastBirthday = addYears(dobDate, userAge).getTime()

    const minEnd = addYears(dobDate, userAge + 5).getTime()

    const end = isRecordEmpty(goals)
      ? minEnd
      : Math.max(
          minEnd,
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

    return {
      start: lastBirthday,
      end,
    }
  }, [dob, goals])

  return (
    <GoalsTimelinContext.Provider
      value={{
        dob,
        interval,
      }}
    >
      {children}
    </GoalsTimelinContext.Provider>
  )
}
