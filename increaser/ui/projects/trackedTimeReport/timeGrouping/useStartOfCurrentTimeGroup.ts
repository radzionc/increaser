import { useMemo } from 'react'
import { getWeekStartedAt } from '@lib/utils/time/getWeekStartedAt'
import { startOfDay, startOfMonth, startOfYear } from 'date-fns'
import { match } from '@lib/utils/match'
import { useTimeGrouping } from './useTimeGrouping'

export const useStartOfCurrentTimeGroup = () => {
  const [group] = useTimeGrouping()

  return useMemo(() => {
    const now = new Date()

    return match(group, {
      day: () => startOfDay(now).getTime(),
      week: () => getWeekStartedAt(now.getTime()),
      month: () => startOfMonth(now).getTime(),
      year: () => startOfYear(now).getTime(),
    })
  }, [group])
}
