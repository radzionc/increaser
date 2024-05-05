import { useAssertUserState } from '@increaser/ui/user/UserStateContext'
import { useStartOfWeek } from '@lib/ui/hooks/useStartOfWeek'
import { useWeekday } from '@lib/ui/hooks/useWeekday'
import { ExpandableSelector } from '@lib/ui/select/ExpandableSelector'
import { range } from '@lib/utils/array/range'
import { WEEKDAYS } from '@lib/utils/time'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { useMemo } from 'react'
import { useTrackTime } from './TrackTimeProvider'

export const WeekdaySelector = () => {
  const { weekday, setState, currentSetIndex } = useTrackTime()
  const { lastSyncedMonthEndedAt, lastSyncedWeekEndedAt } = useAssertUserState()
  const currentWeekday = useWeekday()
  const weekStartedAt = useStartOfWeek()

  const options = useMemo(() => {
    const weekdays = range(currentWeekday + 1)

    const minStartedAt = Math.max(
      lastSyncedMonthEndedAt ?? 0,
      lastSyncedWeekEndedAt ?? 0,
    )

    return weekdays.filter((weekday) => {
      const dayStartedAt = weekStartedAt + convertDuration(weekday, 'd', 'ms')
      return dayStartedAt >= minStartedAt
    })
  }, [
    currentWeekday,
    lastSyncedMonthEndedAt,
    lastSyncedWeekEndedAt,
    weekStartedAt,
  ])

  return (
    <ExpandableSelector
      style={{ width: 142 }}
      isDisabled={currentSetIndex !== null}
      value={weekday}
      onChange={(weekday) => setState((state) => ({ ...state, weekday }))}
      options={options.toReversed()}
      getOptionKey={(option) => option.toString()}
      renderOption={(option) => {
        if (option === currentWeekday) {
          return 'Today'
        }
        if (option === currentWeekday - 1) {
          return 'Yesterday'
        }

        return WEEKDAYS[option]
      }}
    />
  )
}
