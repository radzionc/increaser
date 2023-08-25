import { pluralize } from '@increaser/utils/pluralize'
import { toPercents } from '@increaser/utils/toPercents'
import { CheckSquareIcon } from '@increaser/ui/ui/icons/CheckSquareIcon'

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
