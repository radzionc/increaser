import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { ChildrenProp } from '@lib/ui/props'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'
import { findBy } from '@lib/utils/array/findBy'
import { range } from '@lib/utils/array/range'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { recordFromKeys } from '@lib/utils/record/recordFromKeys'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { toHabitDate } from '@product/entities-utils/habit/toHabitDate'
import { useHabitTrackingDaysCount } from '@product/ui/habits/hooks/useHabitTrackingDaysCount'
import { useOrderedActiveHabits } from '@product/ui/habits/hooks/useOrderedActiveHabits'
import { startOfDay } from 'date-fns'
import { useCallback, useMemo, useState } from 'react'

import { HabitDay, TrackHabitsContext } from './state/TrackHabitsContext'

const daysToDisplay = 30

export const TrackHabitsProvider = ({ children }: ChildrenProp) => {
  const firstDayStartedAt = useStartOfDay()

  const daysCount = useHabitTrackingDaysCount()

  const habits = useOrderedActiveHabits()

  const days: HabitDay[] = useMemo(() => {
    const habitIds = habits.map(({ id }) => id)
    return range(daysCount)
      .slice(0, daysToDisplay)
      .map((index) => {
        const startedAt = firstDayStartedAt - convertDuration(index, 'd', 'ms')

        const completion = recordFromKeys(habitIds, (id) => {
          const habit = shouldBePresent(findBy(habits, 'id', id))
          const habitStartedAt = startOfDay(habit.startedAt).getTime()
          if (startedAt < habitStartedAt) {
            return null
          }

          const habitDate = toHabitDate(startedAt)
          return habit.successes.includes(habitDate)
        })

        return { startedAt, completion }
      })
  }, [daysCount, firstDayStartedAt, habits])

  const [activeDayStartedAt, setActiveDayStartedAt] = useStateCorrector(
    useState(firstDayStartedAt),
    useCallback(
      (value) => {
        if (days.some(({ startedAt }) => startedAt === value)) {
          return value
        }

        return firstDayStartedAt
      },
      [days, firstDayStartedAt],
    ),
  )

  return (
    <TrackHabitsContext.Provider
      value={{ days, activeDayStartedAt, setActiveDayStartedAt }}
    >
      {children}
    </TrackHabitsContext.Provider>
  )
}
