import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { useMemo } from 'react'
import { endOfDay, addDays } from 'date-fns'
import { getWeekday } from '@lib/utils/time/getWeekday'
import { range } from '@lib/utils/array/range'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { order } from '@lib/utils/array/order'
import { getWeekEndedAt } from '@lib/utils/time/getWeekEndedAt'
import { withoutDuplicates } from '@lib/utils/array/withoutDuplicates'

type TaskDeadlineOption = number | null | 'custom'

export const useTaskDeadlineOptions = (
  currentValue: number | null,
): TaskDeadlineOption[] => {
  const todayStartedAt = useStartOfDay()

  return useMemo(() => {
    const result: TaskDeadlineOption[] = [null, 'custom']

    const today = endOfDay(todayStartedAt).getTime()
    const tomorrow = addDays(today, 1).getTime()
    const currentWeekdayIndex = getWeekday(new Date(today))

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

    const thisWeekEndsAt = getWeekEndedAt(today)
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
