import { match } from '@lib/utils/match'
import { convertDuration } from '@lib/utils/time/convertDuration'
import { subMonths, subYears } from 'date-fns'

import { TimeGrouping } from '../timeGrouping/TimeGrouping'

type SubtractPeriodInpu = {
  value: number
  period: TimeGrouping
  amount: number
}

export const subtractPeriod = ({
  value,
  period,
  amount,
}: SubtractPeriodInpu) => {
  return match(period, {
    day: () => value - convertDuration(amount, 'd', 'ms'),
    week: () => value - convertDuration(amount, 'w', 'ms'),
    month: () => subMonths(value, amount).getTime(),
    year: () => subYears(value, amount).getTime(),
  })
}
