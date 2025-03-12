import { useStartOfDay } from '@lib/ui/hooks/useStartOfDay'
import { OnFinishProp } from '@lib/ui/props'
import { CalendarDayInput } from '@lib/ui/time/day/calendar/CalendarDayInput'
import { fromDay, toDay } from '@lib/utils/time/Day'
import { endOfDay, addYears } from 'date-fns'

export const CustomTaskDeadlineInput = ({
  onFinish,
}: OnFinishProp<number, 'optional'>) => {
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
