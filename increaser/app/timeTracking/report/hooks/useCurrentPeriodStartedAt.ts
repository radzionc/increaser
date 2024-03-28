import { useMemo } from 'react'
import { TimeGrouping } from '../TimeGrouping'
import { getWeekStartedAt } from '@lib/utils/time/getWeekStartedAt'
import { startOfDay, startOfMonth } from 'date-fns'
import { match } from '@lib/utils/match'

export const useCurrentPeriodStartedAt = (group: TimeGrouping) => {
  return useMemo(
    () =>
      match(group, {
        day: () => startOfDay(Date.now()).getTime(),
        week: () => getWeekStartedAt(Date.now()),
        month: () => startOfMonth(Date.now()).getTime(),
      }),
    [group],
  )
}
