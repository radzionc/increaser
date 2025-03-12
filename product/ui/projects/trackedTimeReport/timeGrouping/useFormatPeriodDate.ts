import { match } from '@lib/utils/match'
import { formatWeek } from '@lib/utils/time/Week'
import { format } from 'date-fns'
import { useCallback } from 'react'

import { useTimeGrouping } from './state'

export const useFormatPeriodDate = () => {
  const timeGrouping = useTimeGrouping()

  return useCallback(
    (value: number) =>
      match(timeGrouping, {
        day: () => format(value, 'EEE d, MMM yyyy'),
        week: () => formatWeek(value),
        month: () => format(value, 'MMMM yyyy'),
        year: () => new Date(value).getFullYear().toString(),
      }),
    [timeGrouping],
  )
}
