import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { order } from '@lib/utils/array/order'
import { range } from '@lib/utils/array/range'
import { withoutDuplicates } from '@lib/utils/array/withoutDuplicates'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { getWeekday } from '@lib/utils/time/getWeekday'
import { endOfDay, addDays } from 'date-fns'
import { endOfISOWeek } from 'date-fns'
import { useMemo } from 'react'

export type TaskDeadlineOption = number | null | 'custom'

export const useTaskDeadlineOptions = (
  currentValue: number | null,
): TaskDeadlineOption[] => {
  const todayStartedAt = useStartOfDay()

  return useMemo(() => {
    const result: TaskDeadlineOption[] = [null, 'custom']

    const today = endOfDay(todayStartedAt).getTime()
    const tomorrow = addDays(today, 1).getTime()
    const currentWeekdayIndex = getWeekday(today)

    const lastDayIndex = convertDuration(1, 'w', 'd') - 1

    const suggestions: number[] = [today, tomorrow]
    if (currentValue) {
      suggestions.push(currentValue)
    }

    suggestions.push(
      ...range(lastDayIndex - currentWeekdayIndex).map((index) =>
        addDays(today, index + 1).getTime(),
      ),
    )

    const thisWeekEndsAt = endOfISOWeek(today).getTime()
    suggestions.push(
      addDays(thisWeekEndsAt, 5).getTime(),
      addDays(thisWeekEndsAt, 7).getTime(),
    )

    return [
      ...result,
      ...order(withoutDuplicates(suggestions), (v) => v, 'asc'),
    ]
  }, [currentValue, todayStartedAt])
}
