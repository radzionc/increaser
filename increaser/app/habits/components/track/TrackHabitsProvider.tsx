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
import { toHabitDate } from '@increaser/entities-utils/habit/toHabitDate'
import { useHabitTrackingDaysCount } from '@increaser/ui/habits/hooks/useHabitTrackingDaysCount'
import { useOrderedHabits } from '@increaser/ui/habits/hooks/useOrderedHabits'

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

  return (
    <TrackHabitsContext.Provider value={{ days }}>
      {children}
    </TrackHabitsContext.Provider>
  )
}
