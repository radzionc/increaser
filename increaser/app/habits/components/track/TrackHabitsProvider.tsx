import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { ComponentWithChildrenProps } from '@lib/ui/props'
import { range } from '@lib/utils/array/range'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { startOfDay } from 'date-fns'
import { useMemo } from 'react'
import { HabitDay, TrackHabitsContext } from './state/TrackHabitsContext'
import { makeRecord } from '@lib/utils/record/makeRecord'
import { findBy } from '@lib/utils/array/findBy'
import { shouldBePresent } from '@lib/utils/assert/shouldBePresent'
import { useOrderedHabits } from '@increaser/ui/habits/hooks/useOrderedHabits'
import { toHabitDate } from '@increaser/entities-utils/habit/toHabitDate'

export const TrackHabitsProvider = ({
  children,
}: ComponentWithChildrenProps) => {
  const firstDayStartedAt = useStartOfDay()

  const habits = useOrderedHabits()
  const habitIds = useMemo(() => habits.map((habit) => habit.id), [habits])

  const lastDayStartedAt = useMemo(() => {
    const firstHabitStartedAt = Math.min(
      ...habits.map((habit) => habit.startedAt),
    )
    return startOfDay(convertDuration(firstHabitStartedAt, 's', 'ms')).getTime()
  }, [habits])

  const days: HabitDay[] = useMemo(() => {
    const daysNumber =
      convertDuration(firstDayStartedAt - lastDayStartedAt, 'ms', 'd') + 1

    return range(daysNumber).map((index) => {
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
  }, [firstDayStartedAt, habitIds, habits, lastDayStartedAt])

  return (
    <TrackHabitsContext.Provider value={{ days }}>
      {children}
    </TrackHabitsContext.Provider>
  )
}
