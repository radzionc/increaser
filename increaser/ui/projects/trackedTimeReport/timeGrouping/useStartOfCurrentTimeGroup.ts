import { useMemo } from 'react'
import { startOfDay, startOfMonth, startOfYear } from 'date-fns'
import { match } from '@lib/utils/match'
import { useTimeGrouping } from './useTimeGrouping'
import { startOfISOWeek } from 'date-fns'

export const useStartOfCurrentTimeGroup = () => {
  const [group] = useTimeGrouping()

  return useMemo(() => {
    const now = new Date()

    return match(group, {
      day: () => startOfDay(now).getTime(),
      week: () => startOfISOWeek(now).getTime(),
      month: () => startOfMonth(now).getTime(),
      year: () => startOfYear(now).getTime(),
    })
  }, [group])
}
