import { useTrackedTimeReport } from '../state/TrackedTimeReportContext'
import { TimeGrouping } from '../TimeGrouping'

import { Switch } from '@lib/ui/inputs/Switch'

const currentPeriodName: Record<TimeGrouping, string> = {
  day: 'today',
  week: 'this week',
  month: 'this month',
  year: 'this year',
}

export const IncludeCurrentPeriodSelector = () => {
  const { includeCurrentPeriod, setState, timeGrouping } =
    useTrackedTimeReport()

  return (
    <Switch
      size="s"
      label={`Include ${currentPeriodName[timeGrouping]}`}
      value={includeCurrentPeriod}
      onChange={(includeCurrentPeriod) =>
        setState((state) => ({
          ...state,
          includeCurrentPeriod,
        }))
      }
    />
  )
}
