import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { ChildrenProp } from '@lib/ui/props'
import { range } from '@lib/utils/array/range'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { startOfDay } from 'date-fns'
import { useCallback, useMemo, useState } from 'react'
import { HabitDay, TrackHabitsContext } from './state/TrackHabitsContext'
import { recordFromKeys } from '@lib/utils/record/recordFromKeys'
import { findBy } from '@lib/utils/array/findBy'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { toHabitDate } from '@increaser/entities-utils/habit/toHabitDate'
import { useHabitTrackingDaysCount } from '@increaser/ui/habits/hooks/useHabitTrackingDaysCount'
import { useOrderedActiveHabits } from '@increaser/ui/habits/hooks/useOrderedActiveHabits'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'

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
