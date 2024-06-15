import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { range } from '@lib/utils/array/range'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { startOfDay } from 'date-fns'
import { useCallback, useMemo, useState } from 'react'
import { HabitDay, TrackHabitsContext } from './state/TrackHabitsContext'
import { makeRecord } from '@lib/utils/record/makeRecord'
import { findBy } from '@lib/utils/array/findBy'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { toHabitDate } from '@increaser/entities-utils/habit/toHabitDate'
import { useHabitTrackingDaysCount } from '@increaser/ui/habits/hooks/useHabitTrackingDaysCount'
import { useOrderedHabits } from '@increaser/ui/habits/hooks/useOrderedHabits'
import { useStateCorrector } from '@lib/ui/state/useStateCorrector'

export const TrackHabitsProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const firstDayStartedAt = useStartOfDay()

  const daysCount = useHabitTrackingDaysCount()

  const habits = useOrderedHabits()

  const days: HabitDay[] = useMemo(() => {
    const habitIds = habits.map(({ id }) => id)
    return range(daysCount).map((index) => {
      const startedAt = firstDayStartedAt - convertDuration(index, 'd', 'ms')

      const completion = makeRecord(habitIds, (id) => {
        const habit = shouldBePresent(findBy(habits, 'id', id))
        const habitStartedAt = startOfDay(
          convertDuration(habit.startedAt, 's', 'ms'),
        ).getTime()
        if (startedAt < habitStartedAt) {
          return null
        }

        const habitDate = toHabitDate(new Date(startedAt))
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
