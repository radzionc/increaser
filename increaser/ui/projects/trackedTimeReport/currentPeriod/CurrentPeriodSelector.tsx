import { Switch } from '@lib/ui/inputs/Switch'
import { useIsCurrentPeriodIncluded } from './useIsCurrentPeriodIncluded'
import { TimeGrouping } from '../timeGrouping/TimeGrouping'
import { useTimeGrouping } from '../timeGrouping/useTimeGrouping'

const currentPeriodName: Record<TimeGrouping, string> = {
  day: 'today',
  week: 'this week',
  month: 'this month',
  year: 'this year',
}

export const CurrentPeriodSelector = () => {
  const [value, setValue] = useIsCurrentPeriodIncluded()
  const [timeGrouping] = useTimeGrouping()

  return (
    <Switch
      size="s"
      label={`Include ${currentPeriodName[timeGrouping]}`}
      value={value}
      onChange={setValue}
    />
  )
}
