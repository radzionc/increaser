import { useMemo } from 'react'
import { TimeGrouping } from '../TimeGrouping'
import { getWeekStartedAt } from '@lib/utils/time/getWeekStartedAt'
import { startOfDay, startOfMonth } from 'date-fns'
import { match } from '@lib/utils/match'

export const useCurrentPeriodStartedAt = (group: TimeGrouping) => {
  return useMemo(() => {
    const now = new Date()

    return match(group, {
      day: () => startOfDay(now).getTime(),
      week: () => getWeekStartedAt(now.getTime()),
      month: () => startOfMonth(now).getTime(),
    })
  }, [group])
}
