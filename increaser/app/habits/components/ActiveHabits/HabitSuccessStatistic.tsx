import { pluralize } from '@lib/utils/pluralize'
import { toPercents } from '@lib/utils/toPercents'
import { CheckSquareIcon } from '@lib/ui/icons/CheckSquareIcon'

import { habitDaysToShow } from './config'
import { HabitStatistic } from './HabitStatistic'

export interface HabitSuccessStatisticProps {
  rate: number
}

export const HabitSuccessStatistic = ({ rate }: HabitSuccessStatisticProps) => {
  return (
    <HabitStatistic
      value={toPercents(rate, 'round')}
      name="success"
      kind="regular"
      icon={<CheckSquareIcon />}
      explanation={`Last ${pluralize(habitDaysToShow, 'day')} success rate`}
    />
  )
}
