import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'

import { fromDay, toDay } from '@lib/utils/time/Day'
import { endOfDay, addYears } from 'date-fns'
import { CalendarDayInput } from '@lib/ui/time/day/calendar/CalendarDayInput'
import { OnFinishOptionalValueProp } from '@lib/ui/props'

export const CustomTaskDeadlineInput = ({
  onFinish,
}: OnFinishOptionalValueProp<number>) => {
  const todayStartedAt = useStartOfDay()
  const endOfToday = endOfDay(todayStartedAt).getTime()
  const min = toDay(endOfToday)

  const max = toDay(addYears(endOfToday, 5).getTime())

  return (
    <CalendarDayInput
      min={min}
      max={max}
      value={null}
      onChange={(value) => {
        if (value) {
          onFinish(fromDay(value))
        } else {
          onFinish()
        }
      }}
    />
  )
}
