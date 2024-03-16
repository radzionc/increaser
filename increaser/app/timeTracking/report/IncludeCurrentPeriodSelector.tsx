import { MinimalisticToggle } from '@lib/ui/inputs/MinimalisticToggle'
import { useTrackedTimeReport } from './TrackedTimeReportProvider'
import { TimeGrouping } from './TimeGrouping'

const currentPeriodName: Record<TimeGrouping, string> = {
  day: 'today',
  week: 'this week',
  month: 'this month',
}

export const IncludeCurrentPeriodSelector = () => {
  const { includeCurrentPeriod, setState, timeGrouping } =
    useTrackedTimeReport()
  return (
    <MinimalisticToggle
      value={includeCurrentPeriod}
      onChange={(includeCurrentPeriod) =>
        setState((state) => ({ ...state, includeCurrentPeriod }))
      }
      label={`include ${currentPeriodName[timeGrouping]}`}
    />
  )
}
